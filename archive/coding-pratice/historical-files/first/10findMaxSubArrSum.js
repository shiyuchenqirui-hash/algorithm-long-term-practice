// 题目：
// 输入一个整型数组，数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值。
// 最基本要求：暴力寻找
// Bonus: 要求时间复杂度为O(n)。
// 示例1:
// 输入: nums = [-2,1,-3,4,-1,2,1,-5,4]
// 输出: 6
// 解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。

{
    // 验证代码
    const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
    console.log(solution(arr))

    // 动归 递推公式 dp[i] =  dp[i-1] + i || i ； dp[i]表示以第i项为结尾的最大值
    function solution(arr) {
        let sum = arr[0], max = arr[0]
        for (let i = 1; i < arr.length; i++) {
            const temp = arr[i]
            if (sum + temp < temp) {
                sum = temp
            } else {
                sum = sum + temp
            }
            max = sum > max ? sum : max
        }
        return max
    }
}

// 1 2