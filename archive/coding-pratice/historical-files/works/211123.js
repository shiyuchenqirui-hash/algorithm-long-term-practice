// 2021.11.23 知乎二面
// 顺时针90度反转矩阵
// 1 2 3 4
// 5 6 7 8
// 9 10 11 12
// 13 14 15 16
// 翻转为
// 13 9 5 1
// 14 10 6 2
// 15 11 7 3
// 16 12 8 4

// 构建数据
const array = new Array(4); // 4行
for (let i = 0; i < array.length; i++) {
  array[i] = new Array(4);
}
array[0] = [1, 2, 3, 4];
array[1] = [5, 6, 7, 8];
array[2] = [9, 10, 11, 12];
array[3] = [13, 14, 15, 16];

// 顺时针90度旋转 第一行是最后一列
function solution(array) {
  const row = array[0].length;
  const column = array.length;
  const res = new Array(column);
  for (let r = 0; r < row; r++) {
    res[r] = new Array(row);
  }
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[0].length; j++) {
      // i,j
      res[j][column - 1 - i] = array[i][j];
    }
  }
  return res;
}
console.log(solution(array));
