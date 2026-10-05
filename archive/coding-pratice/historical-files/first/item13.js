// 选择排序
function selectionSort(arr) {
    function selectionSmall(arr){
        let index = 0
        let small = arr[0]
        for(let i=0,len=arr.length;i<len;i++){
            if(arr[i]<small){
                index = i
                small = arr[i]
            }
        }
        return index
    }
    const res = []
    while(arr.length){
        const index = selectionSmall(arr)
        res.push(...arr.splice(index,1))
    }
    return res
}

const arr = [1, 4, 2, 3, 5]
console.log(selectionSort(arr))