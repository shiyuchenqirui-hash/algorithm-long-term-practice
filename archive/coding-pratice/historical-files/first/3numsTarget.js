// 给定数组 array = [-3,-1,-2,0,2,3]，和 target = 0，给出所有组合的情况
// 备注：两数之和问题

function solution(array, target) {
    const res = [], map = new Map()
    for (let item of array) {
        const temp = target - item // 补位数字
        if (map.has(temp)) {
            res.push([temp, item])
            map.delete(temp)
        } else {
            map.set(item, 1)
        }
    }
    return res
}

// 验证代码
const array = [-3, -1, -2, -2, 0, 3, 2, 2, 3]
const target = 0
console.log(solution(array, target))

// 1 2 