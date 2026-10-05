// 快排 - 递归
function quickSort(arr) {
    if (arr.length < 2) {
        return arr
    }
    const left = [], right = [], flag = arr[0]
    for (let i = 1, len = arr.length; i < len; i++) {
        if (arr[i] <= flag) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat([flag]).concat(quickSort(right))
}

const arr1 = [2, 31, 53, 1123421, 32123, 1, 2, 4]
console.log(quickSort(arr1))

// 快排 - 非递归
function quick(arr, left = 0, right = arr.length - 1) {
    var list = [[left, right]]; // 模拟栈
    while (list.length > 0) {
        var now = list.pop()
        if (now[0] >= now[1]) continue; // 队列不断清空的条件
        var i = now[0], j = now[1], flag = i; // 首次 i为0，j为length-1，flag为0
        while (i < j) {
            while (arr[j] >= arr[flag] && j > flag) j--; // 从右向左找到第一个比arr[flag]小的值
            if (i >= j) break;
            while (arr[i] <= arr[flag] && i < j) i++;  // 从左向右找到第一个比arr[flag]大的值
            var temp = arr[flag]; // 首次时，是arr[0]
            arr[flag] = arr[j]; // 首次时，arr[0]置换为第一个比它小的值
            arr[j] = arr[i]; // 首次时，右侧第一个小值，置换为第一个大值
            arr[i] = temp; // 首次时，第一个大值置换为arr[0]的值，此时它左侧都比它小，右侧j之后，都是比arr[0]大的值；
            flag = i	// flag
        }
        list.push([now[0], flag - 1]); // 左侧一定都比基准值arr[i]小
        list.push([flag + 1, now[1]]); // 右侧含有比基准值大的，也含有尚未检测到的
    }
    return arr
}
const arr2 = [2, 31, 53, 1123421, 32123, 1, 2, 4]
console.log(quick(arr2))
