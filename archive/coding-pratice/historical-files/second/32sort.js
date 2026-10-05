const array = [2, 31, 4, 5, 1254, 12]

// 冒泡排序 外层循环用于逐个确定末尾极大值
function bubbleSort(arr) {
    arr = [...arr]
    for (let i = arr.length; i >= 2; i--) {
        for (let j = 0; j <= i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j + 1]
                arr[j + 1] = arr[j]
                arr[j] = temp
            }
        }
    }
    return arr
}

// 选择排序 外层循环用于逐个确定最左侧极小值
function selectionSort(arr) {
    arr = [...arr]
    let index
    for (let i = 0; i < arr.length; i++) {
        index = i
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[index]) {
                index = j
            }
        }
        const temp = arr[i]
        arr[i] = arr[index]
        arr[index] = temp
    }
    return arr
}

// 插入排序
function insertSort(arr){
    arr = [...arr]
    for(let i=1;i<arr.length;i++){
        let temp = arr[i],index=i
        for(let j=i;j>0;j--){ // 此处可以替换成while循环
            if(arr[j]<arr[j-1]){
                arr[j]=arr[j-1]
                index=j-1
            }else{
                break
            }
        }
        arr[index] = temp
    }
    return arr
}

// 冒泡、选择、插入，都是双重循环

// 验证代码
console.log(bubbleSort(array))
console.log(selectionSort(array))
console.log(insertSort(array))