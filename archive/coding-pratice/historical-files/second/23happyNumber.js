// 快乐数（力扣题）该数的各位平方和 如果最终和为1 则为快乐数

function solution(num) {
    // 边界条件
    if (!Number.isInteger(num)) {
        return false
    }
    let res = false, map = new Map()
    while (true) {
        let sum = 0
        while (num > 0) {
            sum += (num % 10) ** 2
            num = ~~(num / 10)
        }
        res = sum === 1 ? true : false
        if (sum === 1 || map.has(sum) && map.get(sum) >= 1) {
            break
        } else {
            num = sum
            map.set(sum, 1)
        }
    }
    return res
}

// 验证代码
console.log(solution(7), solution(2))