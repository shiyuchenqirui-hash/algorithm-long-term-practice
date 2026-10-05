// 把数组中非零的元素挪到数组的左边

// 验证代码
const arr = [1, 0, 2, 0, 3, 1, 0]
// console.log(solution1(arr))
console.log(solution2(arr))

// 如果允许辅助空间，那么可以直接用两个数组来承接
function solution1(arr) {
    let arr1 = [], arr2 = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== 0) {
            arr1.push(arr[i])
        } else {
            arr2.push(arr[i])
        }
    }
    return arr1.concat(arr2)
}
