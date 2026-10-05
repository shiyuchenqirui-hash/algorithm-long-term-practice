# 算法练习进展

> 最近更新：2026-09-30
>
> 本文件仅记录技术练习状态；个人日程不纳入公开进度。

## 阶段结论

- 已经接触哈希表、滑动窗口、链表双指针、栈、回溯等基础母题，但覆盖仍不完整。
- 后续应继续补齐高频母题，不扩大为大量随机刷题。
- 练习代码统一使用 TypeScript。

## 已完成练习

| 题目 | 类型 | 练习记录 | 当前判断 |
| --- | --- | --- | --- |
| [1. 两数之和](https://leetcode.cn/problems/two-sum/) | 哈希表 | 2 次：09-08、09-09 | 已复习两次，后续避免近期重复 |
| [20. 有效的括号](https://leetcode.cn/problems/valid-parentheses/) | 栈 | 2 次：09-08、09-09 | 已复习两次，后续避免近期重复 |
| [3. 无重复字符的最长子串](https://leetcode.cn/problems/longest-substring-without-repeating-characters/) | 滑动窗口 | 2 次：09-08、09-09 | 已理解 Map 记录最近位置的窗口移动方式 |
| [19. 删除链表的倒数第 N 个结点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/) | 快慢指针、链表 | 2 次：09-08、09-09 | 已完成两次，注意虚拟头结点和指针间距 |
| [876. 链表的中间结点](https://leetcode.cn/problems/middle-of-the-linked-list/) | 快慢指针 | 已练习 | 用于掌握快慢指针基本节奏 |
| [141. 环形链表](https://leetcode.cn/problems/linked-list-cycle/) | 快慢指针 | 已练习 | 用于掌握追及模型 |
| [22. 括号生成](https://leetcode.cn/problems/generate-parentheses/) | 回溯、剪枝 | 1 次：09-09 | 已完成第一遍；回溯基础题尚需按顺序补齐 |

## 待练习母题

### 算法题

| 建议顺序 | 题目 | 难度 | 主要目的 | 状态 |
| --- | --- | --- | --- | --- |
| 1 | [78. 子集](https://leetcode.cn/problems/subsets/) | 中等 | 回溯中的“选 / 不选”决策树 | 待练习 |
| 2 | [77. 组合](https://leetcode.cn/problems/combinations/) | 中等 | 起始下标与基础剪枝 | 待练习 |
| 3 | [46. 全排列](https://leetcode.cn/problems/permutations/) | 中等 | `used` 状态与撤销选择 | 待练习 |
| 4 | [704. 二分查找](https://leetcode.cn/problems/binary-search/) | 简单 | 建立稳定的二分边界模板 | 待练习 |
| 5 | [206. 反转链表](https://leetcode.cn/problems/reverse-linked-list/) | 简单 | 补齐链表最重要的指针操作 | 待练习 |
| 6 | [21. 合并两个有序链表](https://leetcode.cn/problems/merge-two-sorted-lists/) | 简单 | 链表归并与虚拟头结点 | 待练习 |
| 7 | [104. 二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/) | 简单 | 建立树的递归思维 | 待练习 |
| 8 | [102. 二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/) | 中等 | BFS 队列与逐层处理 | 待练习 |
| 9 | [200. 岛屿数量](https://leetcode.cn/problems/number-of-islands/) | 中等 | 网格 DFS / BFS 与泛洪思想 | 待练习，后续重点补充 |
| 10 | [15. 三数之和](https://leetcode.cn/problems/3sum/) | 中等 | 排序与双指针 | 待练习 |
| 11 | [560. 和为 K 的子数组](https://leetcode.cn/problems/subarray-sum-equals-k/) | 中等 | 前缀和与哈希表 | 待练习 |
| 12 | [56. 合并区间](https://leetcode.cn/problems/merge-intervals/) | 中等 | 排序后的区间合并 | 待练习 |
| 13 | [198. 打家劫舍](https://leetcode.cn/problems/house-robber/) | 中等 | 一维动态规划入门 | 待练习 |
| 14 | [215. 数组中的第 K 个最大元素](https://leetcode.cn/problems/kth-largest-element-in-an-array/) | 中等 | 堆或快速选择 | 待练习 |
| 15 | [146. LRU 缓存](https://leetcode.cn/problems/lru-cache/) | 中等 | 哈希表与双向链表 | 待独立手写 |

### 前端手写题

| 主题 | 需要掌握的内容 | 状态 |
| --- | --- | --- |
| Promise 并发控制 | 最大并发数、输入顺序、失败策略、队列结束判断 | 待独立手写 |
| Promise.all | 结果顺序、空数组、任一失败立即 reject | 待独立手写 |
| 超时、重试和取消 | `Promise.race`、重试条件、`AbortController` | 待独立手写 |
| 防抖与节流 | 参数、`this`、返回值、立即执行等边界 | 待独立手写 |
| EventEmitter | `on`、`off`、`once`、`emit` | 待独立手写 |
| 深拷贝 | 循环引用和常见内建类型的边界 | 待独立手写 |
| 数组扁平化 | 递归与迭代实现 | 待独立手写 |
| 树与扁平数组互转 | Map 建索引、父子关系组装 | 待独立手写 |

## 下次恢复入口

下一次练习建议：

1. `78. 子集`：先建立标准回溯骨架。
2. `77. 组合`：在子集基础上理解起始下标和剪枝。

后续继续：`46. 全排列`，再回看已经练过一次的 `22. 括号生成`。这一组形成完整顺序：

```text
子集 -> 组合 -> 全排列 -> 括号生成
```


## 每次练习后的最小更新格式

以后无论在哪个 Web 端或工具中练习，只需要带回类似下面的结论：

```text
日期：YYYY-MM-DD
题目：题号 + 题名
结果：独立完成 / 看提示完成 / 看答案完成
卡点：一句话
下次：复习 / 暂不重复 / 继续同专题
```

更新本文件时：

1. 修改“最近更新”。
2. 更新对应题目的次数、日期和当前判断。
3. 必要时调整“下次恢复入口”。
4. 不记录个人求职状态、日程或私人资料链接。
