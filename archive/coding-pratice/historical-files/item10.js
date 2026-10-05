// 题目：
// 输入一个整型数组，数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值。
// 最基本要求：暴力寻找
// Bonus: 要求时间复杂度为O(n)。
// 示例1:
// 输入: nums = [-2,1,-3,4,-1,2,1,-5,4]
// 输出: 6
// 解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
function findMaxSubArrSum(array) {
    let max = array[0];
    let sum = array[0];
    for (let i = 1; i < array.length; i++) {
        if (sum + array[i] > array[i]) {
            sum = sum + array[i];
        } else {
            sum = array[i];
        }
        if (sum > max) {
            max = sum;
        }
    }
    return max;
}