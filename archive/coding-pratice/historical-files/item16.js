// 图的广度优先遍历-查找最短路径
function find(obj, start, aim) {
    let res = "未找到"
    const queue = [{ value: start, path: start }]
    const searched = []
    while (queue.length) {
        const temp = queue.shift()
        if (searched.includes(temp.value)) {
            continue
        }
        if (temp.value === aim) {
            res = temp.path
            break
        } else if(obj.hasOwnProperty(temp.value)) {
            searched.push(temp.value)
            for(let item of obj[temp.value]){
                queue.push({
                    value:item,
                    path:temp.path + "." + item
                })
            }
        }
    }
    return res
}

const obj = {}
obj[1] = [2, 3]
obj[2] = [4, 1]
obj[3] = [1, 5]
obj[4] = [2, 3]
obj[5] = [3]
console.log(find(obj, 1,9))