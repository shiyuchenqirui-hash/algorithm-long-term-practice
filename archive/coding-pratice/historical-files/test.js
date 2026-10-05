function buildBoard(n, m) {
  const board = [];
  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j < m; j++) {
      // 随机生成黑白棋子，黑色为1，白色为0
      const chess = Math.round(Math.random());
      row.push(chess);
    }
    board.push(row);
  }
  return board;
}

function findMaxConnectedBlack(board) {
  const n = board.length;
  const m = board[0].length;
  let maxCount = 0;

  function dfs(i, j) {
    if (i < 0 || i >= n || j < 0 || j >= m || board[i][j] !== 1) {
      return 0;
    }

    board[i][j] = -1; // 标记已访问过的黑色棋子

    let count = 1; // 计数器初始化为1，表示当前位置的黑色棋子
    // 检查上下左右四个方向
    count += dfs(i - 1, j); // 上方
    count += dfs(i + 1, j); // 下方
    count += dfs(i, j - 1); // 左方
    count += dfs(i, j + 1); // 右方

    return count;
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (board[i][j] === 1) {
        const count = dfs(i, j);
        maxCount = Math.max(maxCount, count);
      }
    }
  }

  return maxCount;
}

const board = buildBoard(5, 5);
console.log(board); // 输出构建的棋盘数据

const maxCount = findMaxConnectedBlack(board);
console.log(`最大相连黑色棋子数量：${maxCount}`);
