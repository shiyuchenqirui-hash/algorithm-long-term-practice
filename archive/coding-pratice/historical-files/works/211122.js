// 2021.11.23 魔门塔一面算法题（仅此一道）
// n*m的棋盘，黑白棋子（黑1 白0），上下左右有同颜色的棋子认定为相连，判断最大相连的黑色棋子是多少颗
// 解法：树的层次遍历

// n 10,m 5 构建数据
const array = new Array(10)
for (let item of array) {
    array[item] = new Array(5)
}
for (let i = 0; i < array.length; i++) {
    const temp = array[i]
    for (let j = 0; j < temp.length; j++) {
        array[i][j] = Math.random() > 0.5 ? 1 : 0
    }
}
console.log(array)

function solution(array) {
    let max = 0
    let hasDealList = []
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            if (!arrayHas(hasDealList, [i, j])) { // 避免大量重复计算
                const temp = dealNode(i, j)
                max = max > temp ? max : temp
            }
        }
    }
    // 以单个节点为中心，寻找连续区域
    function dealNode(i, j) {
        if (array[i][j] === 1) {
            let tempMax = 1
            let tempQueue = [[i, j]]
            while (tempQueue.length) {
                const [i, j] = tempQueue.shift() // 中心节点
                // 上
                if (j - 1 >= 0) {
                    if (array[i][j - 1] === 1 && !arrayHas(hasDealList, [i, j - 1])) {
                        tempQueue.push([i, j - 1])
                        hasDealList.push([i, j - 1])
                        tempMax++
                    }
                }
                // 下
                if (j + 1 < array[0].length) {
                    if (array[i][j + 1] === 1 && !arrayHas(hasDealList, [i, j + 1])) {
                        tempQueue.push([i, j + 1])
                        hasDealList.push([i, j + 1])
                        tempMax++
                    }
                }
                // 左
                if (i - 1 >= 0) {
                    if (array[i - 1][j] === 1 && !arrayHas(hasDealList, [i - 1, j])) {
                        tempQueue.push([i, j - 1])
                        hasDealList.push([i, j - 1])
                        tempMax++
                    }
                }
                // 右
                if (i + 1 < array.length) {
                    if (array[i + 1][j] === 1 && !arrayHas(hasDealList, [i, j])) {
                        tempQueue.push([i, j + 1])
                        hasDealList.push([i, j + 1])
                        tempMax++
                    }
                }
            }
            return tempMax
        } else {
            return 0
        }
    }
    function arrayHas(array, item) {
        let flag = false
        for (let item of array) {
            if (JSON.stringify(item) === JSON.stringify(array[item])) {
                flag = true
                break
            }
        }
        return flag
    }
    return max
}
console.log("处理结果：", solution(array))