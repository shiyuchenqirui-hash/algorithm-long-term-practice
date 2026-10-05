// 分治 - sum函数
function sum(array) {
    if (array.length === 0) {
        return 0
    }
    return array[0] + sum(array.slice(1))
}

const arr = [2, 3, 4]
console.log(sum(arr))

// 分治 - 列表包含的元素数
function getLen(arr) {
    if (arr.length === 0) {
        return 0
    }
    return 1 + getLen(arr.slice(1))
}
console.log(getLen(arr))

// 分治 - 找出列表中最大的数字
function getMax(arr) {
    if(arr.length===1){
        return arr[0]
    }
    const temp = getMax(arr.slice(1))
    if(arr[0]>temp){
        return arr[0]
    }else{
        return temp
    }
}
console.log(getMax(arr))
