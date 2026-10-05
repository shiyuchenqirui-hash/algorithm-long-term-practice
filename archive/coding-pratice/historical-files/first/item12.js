// 二分查找
const arr = [1, 2, 3, 4, 5]
function binary_search(arr, aim) {
    let low = 0, max = arr.length - 1
    while (low <= max) {
        console.log(low, max)
        const middle = Math.floor((low + max) / 2)
        const guess = arr[middle]
        if (guess === aim) {
            return middle
        } else if (guess < aim) {
            low = middle + 1
        } else {
            max = middle - 1
        }
    }
    return undefined
}

console.log(binary_search(arr, 1))