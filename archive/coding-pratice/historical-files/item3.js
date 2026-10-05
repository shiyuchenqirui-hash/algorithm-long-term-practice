// 给定数组 nums = [-3, -1, -2, 0, 2,3]，和 target = 0，给出所有组合的情况

const nums = [-3, -1, -2, -2, 0, 3, 2, 2, 3]
const target = 0
function deal(arr, target) {
    const obj = {}
    const result = []
    for (let i = 0, len = arr.length; i < len; i++) {
        const origin = arr[i]
        const temp = target - origin
        if (obj.hasOwnProperty(temp) && obj[temp] >= 1) {
            result.push([temp, origin])
            obj[temp] = obj[temp] - 1
        } else if (!obj.hasOwnProperty(temp) || obj[temp] == 0) {
            obj[origin] = obj.hasOwnProperty(origin) ? obj[origin] + 1 : 1
        }
    }
    return result
}

deal(nums, target)