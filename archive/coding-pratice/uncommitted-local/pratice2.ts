/**
 * 每个任务接收 AbortSignal。
 *
 * 任务如果支持取消，应监听 signal。
 * 例如 fetch(url, { signal }) 原生支持 AbortSignal。
 */
type Task<T> = (signal: AbortSignal) => Promise<T>;

/**
 * 类似 Promise.allSettled 的返回结果。
 */
type TaskResult<T> =
  | {
      status: "fulfilled";
      value: T;
    }
  | {
      status: "rejected";
      reason: unknown;
    };

interface SchedulerOptions {
  /** 最大并发数 */
  concurrency: number;

  /**
   * 失败后的额外重试次数。
   *
   * retries = 0：总共执行 1 次
   * retries = 2：总共最多执行 3 次
   */
  retries?: number;

  /** 单次执行的超时时间 */
  timeoutMs?: number;

  /** 两次重试之间的等待时间 */
  retryDelayMs?: number;

  /**
   * true：
   * 任一任务经过重试后仍失败，立即终止整个调度器。
   *
   * false：
   * 单个任务失败不影响其他任务，最后收集全部结果。
   */
  failFast?: boolean;

  /** 外部取消信号 */
  signal?: AbortSignal;
}

/**
 * 单次任务执行超时错误。
 */
class TimeoutError extends Error {
  constructor(timeoutMs: number) {
    super(`Task timed out after ${timeoutMs}ms`);
    this.name = "TimeoutError";
  }
}

/**
 * 调度器取消错误。
 */
class TaskAbortError extends Error {
  constructor(public readonly reason?: unknown) {
    super("Task execution was aborted");
    this.name = "AbortError";
  }
}

/**
 * 把 AbortSignal 的 reason 转成统一的 Error。
 */
function createAbortError(reason?: unknown): Error {
  if (reason instanceof Error && reason.name === "AbortError") {
    return reason;
  }

  return new TaskAbortError(reason);
}

/**
 * 支持取消的 sleep。
 *
 * 用于重试之间的等待。如果等待过程中调度器被取消，
 * Promise 会立即 reject，而不是继续等到定时器结束。
 */
function sleep(ms: number, signal: AbortSignal): Promise<void> {
  if (signal.aborted) {
    return Promise.reject(createAbortError(signal.reason));
  }

  if (ms <= 0) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => {
      cleanup();
      resolve();
    }, ms);

    const handleAbort = () => {
      cleanup();
      reject(createAbortError(signal.reason));
    };

    function cleanup() {
      clearTimeout(timer);
      signal.removeEventListener("abort", handleAbort);
    }

    signal.addEventListener("abort", handleAbort, { once: true });
  });
}

/**
 * 执行一次任务，并提供：
 *
 * 1. 单次执行超时
 * 2. 外部取消
 * 3. 清理 timer 和事件监听器
 */
function runOnce<T>(
  task: Task<T>,
  timeoutMs: number | undefined,
  parentSignal: AbortSignal,
): Promise<T> {
  if (parentSignal.aborted) {
    return Promise.reject(createAbortError(parentSignal.reason));
  }

  /*
   * 每次尝试都创建独立的 AbortController。
   *
   * 这样一次任务超时后，可以只取消这一次执行，
   * 而不需要取消整个调度器。
   */
  const attemptController = new AbortController();
  const attemptSignal = attemptController.signal;

  return new Promise<T>((resolve, reject) => {
    let settled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    /**
     * 外部调度器取消时，同步取消当前这次任务。
     */
    const handleParentAbort = () => {
      attemptController.abort(parentSignal.reason);
    };

    /**
     * 当前这次任务被取消。
     *
     * 可能是：
     * 1. 单次执行超时
     * 2. 外部调用了 abort()
     * 3. failFast 触发了整体取消
     */
    const handleAttemptAbort = () => {
      const reason = attemptSignal.reason;

      if (reason instanceof TimeoutError) {
        finishReject(reason);
      } else {
        finishReject(createAbortError(reason));
      }
    };

    function cleanup() {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }

      parentSignal.removeEventListener("abort", handleParentAbort);
      attemptSignal.removeEventListener("abort", handleAttemptAbort);
    }

    function finishResolve(value: T) {
      if (settled) return;

      settled = true;
      cleanup();
      resolve(value);
    }

    function finishReject(reason: unknown) {
      if (settled) return;

      settled = true;
      cleanup();
      reject(reason);
    }

    parentSignal.addEventListener("abort", handleParentAbort, {
      once: true,
    });

    attemptSignal.addEventListener("abort", handleAttemptAbort, {
      once: true,
    });

    /**
     * 设置单次执行超时。
     */
    if (timeoutMs !== undefined) {
      timeoutId = setTimeout(() => {
        attemptController.abort(new TimeoutError(timeoutMs));
      }, timeoutMs);
    }

    /**
     * Promise.resolve().then(...) 可以捕获任务同步抛出的异常。
     *
     * 如果直接写 task(attemptSignal).then(...)，
     * 那么 task() 同步 throw 时可能逃出当前控制流程。
     */
    Promise.resolve()
      .then(() => task(attemptSignal))
      .then(finishResolve, finishReject);
  });
}

/**
 * 执行单个任务，并在失败后重试。
 */
async function runWithRetry<T>(
  task: Task<T>,
  options: {
    retries: number;
    timeoutMs?: number;
    retryDelayMs: number;
    signal: AbortSignal;
  },
): Promise<T> {
  const { retries, timeoutMs, retryDelayMs, signal } = options;

  /*
   * attempt 从 0 开始。
   *
   * retries = 2 时：
   * attempt = 0：首次执行
   * attempt = 1：第一次重试
   * attempt = 2：第二次重试
   */
  for (let attempt = 0; attempt <= retries; attempt++) {
    if (signal.aborted) {
      throw createAbortError(signal.reason);
    }

    try {
      return await runOnce(task, timeoutMs, signal);
    } catch (error) {
      /*
       * 如果整个调度器已取消，不应该继续重试。
       */
      if (signal.aborted) {
        throw createAbortError(signal.reason);
      }

      /*
       * 已经用完重试次数，抛出最后一次错误。
       */
      if (attempt === retries) {
        throw error;
      }

      /*
       * 等待后进入下一次重试。
       */
      await sleep(retryDelayMs, signal);
    }
  }

  /*
   * 正常情况下永远不会执行到这里。
   * 保留是为了让 TypeScript 确认函数一定有返回或抛错。
   */
  throw new Error("Unexpected retry state");
}

/**
 * 异步任务调度器。
 */
async function schedule<T>(
  tasks: Task<T>[],
  options: SchedulerOptions,
): Promise<TaskResult<T>[]> {
  const {
    concurrency,
    retries = 0,
    timeoutMs,
    retryDelayMs = 0,
    failFast = false,
    signal: externalSignal,
  } = options;

  /**
   * 参数检查。
   */
  if (!Number.isInteger(concurrency) || concurrency <= 0) {
    throw new RangeError("concurrency must be a positive integer");
  }

  if (!Number.isInteger(retries) || retries < 0) {
    throw new RangeError("retries must be a non-negative integer");
  }

  if (timeoutMs !== undefined && timeoutMs <= 0) {
    throw new RangeError("timeoutMs must be greater than 0");
  }

  if (retryDelayMs < 0) {
    throw new RangeError("retryDelayMs must be non-negative");
  }

  if (tasks.length === 0) {
    return [];
  }

  /**
   * 调度器内部的 AbortController。
   *
   * 它同时负责：
   * 1. 接收外部取消
   * 2. failFast 时取消其他任务
   */
  const schedulerController = new AbortController();
  const schedulerSignal = schedulerController.signal;

  /**
   * 外部 signal 取消时，传递给内部 controller。
   */
  const handleExternalAbort = () => {
    schedulerController.abort(externalSignal?.reason);
  };

  if (externalSignal?.aborted) {
    schedulerController.abort(externalSignal.reason);
  } else {
    externalSignal?.addEventListener("abort", handleExternalAbort, {
      once: true,
    });
  }

  /**
   * 预先创建固定长度数组。
   *
   * 任务无论按照什么顺序完成，都写回原始 index，
   * 因此最终结果顺序和输入顺序一致。
   */
  const results: TaskResult<T>[] = new Array(tasks.length);

  /**
   * 下一个尚未领取的任务下标。
   *
   * JavaScript 在执行 nextIndex++ 时不会被其他异步代码插入，
   * 所以多个 worker 可以安全地共享这个变量。
   */
  let nextIndex = 0;

  /**
   * 保存 failFast 模式下第一个真正的任务错误。
   */
  let hasFirstFailure = false;
  let firstFailure: unknown;

  async function worker(): Promise<void> {
    while (true) {
      /**
       * 已取消时，不再领取排队中的任务。
       */
      if (schedulerSignal.aborted) {
        throw createAbortError(schedulerSignal.reason);
      }

      /**
       * 当前 worker 领取一个任务。
       *
       * 必须先领取 index，再进行 await；
       * 否则多个 worker 可能处理同一个任务。
       */
      const currentIndex = nextIndex;
      nextIndex += 1;

      /**
       * 没有剩余任务，当前 worker 执行完毕。
       */
      if (currentIndex >= tasks.length) {
        return;
      }

      try {
        const value = await runWithRetry(tasks[currentIndex], {
          retries,
          timeoutMs,
          retryDelayMs,
          signal: schedulerSignal,
        });

        results[currentIndex] = {
          status: "fulfilled",
          value,
        };
      } catch (error) {
        /**
         * 如果是外部取消，直接终止 worker。
         *
         * 这种情况下 schedule 整体 reject，
         * 不会返回一个残缺的 results 数组。
         */
        if (schedulerSignal.aborted) {
          throw createAbortError(schedulerSignal.reason);
        }

        results[currentIndex] = {
          status: "rejected",
          reason: error,
        };

        if (failFast) {
          /**
           * 只记录第一个失败原因。
           */
          if (!hasFirstFailure) {
            hasFirstFailure = true;
            firstFailure = error;

            /**
             * 通知其他 worker 停止领取任务，
             * 同时取消正在运行的任务。
             */
            schedulerController.abort(error);
          }

          throw firstFailure;
        }
      }
    }
  }

  /**
   * 任务少于 concurrency 时，不需要创建多余 worker。
   *
   * 每个 worker 同一时刻只执行一个任务，
   * 因此 worker 数量就是最大并发数。
   */
  const workerCount = Math.min(concurrency, tasks.length);

  const workers = Array.from(
    { length: workerCount },
    () => worker(),
  );

  try {
    /**
     * 所有 worker 都 return，代表：
     *
     * 1. 所有排队任务都已被领取
     * 2. 所有已领取任务都已结束
     * 3. 整个任务队列执行完毕
     */
    await Promise.all(workers);

    return results;
  } catch (error) {
    /**
     * failFast 时优先抛出第一个任务本身的错误，
     * 而不是其他 worker 随后产生的取消错误。
     */
    if (hasFirstFailure) {
      throw firstFailure;
    }

    throw error;
  } finally {
    externalSignal?.removeEventListener(
      "abort",
      handleExternalAbort,
    );
  }
}