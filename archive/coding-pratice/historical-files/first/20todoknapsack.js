// 01背包问题
let weight = [4, 5, 6, 2, 2]
let value = [6, 4, 5, 3, 6]

// （动态规划）先容量后物品
{
    function solution(weight, value, size) {
        const dp = [], amount = weight.length
        // 循环求值
        for (let w = 0; w <= size; w++) { // 重量 
            dp[w] = []
            for (let j = 0; j <= amount; j++) { // 物品 -- 也可以通过
                // i-size,j-物品
                if (w === 0 || j === 0) {
                    dp[w][j] = 0
                    continue
                }
                if (w < weight[j-1]) { // 当前物品放不进去
                    dp[w][j] = dp[w][j - 1] || 0
                    continue
                }
                // 放不放这个物品，取其最大值
                dp[w][j] = Math.max((dp[w - weight[j-1]][j - 1] || 0) + value[j-1], (dp[w][j - 1] || 0))
            }
        }
        return dp
    }
    console.log(solution(weight, value, 10))
}

// （动态规划） 先物品后容量
{
    function solution(weight, value, size) {
        const dp = [], amount = weight.length
        // 初始化辅助数组
        for (let p = 0; p <= amount; p++) {
            dp[p] = []
        }
        for (let p = 0; p <= amount; p++) {
            for (let w = 0; w <= size; w++) {
                if (p === 0 || w === 0) {
                    dp[p][w] = 0
                    continue
                }
                if (weight[p] > w) {
                    dp[p][w] = dp[p - 1][w] || 0
                    continue
                }
                dp[p][w] = Math.max((dp[p-1][w] || 0),(dp[p-1][w-weight[p-1]] || 0)+value[p-1])
            }
        }
        console.log(dp)
        return {max: dp[amount][size] }
    }
    console.log(solution(weight, value, 10))
}

//（递归）
{
    function solution() {

    }
    // console.log(solution(weight, value, 10))
}

//（贪婪）
{
    function solution() {

    }
    // console.log(solution(weight, value, 10))
}