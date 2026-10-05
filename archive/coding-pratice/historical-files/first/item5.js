// 数字千分符 正则/非正则两种
const str = "1234567.123"

// 正则解法，$1在有对应捕获组的时候才生效
function deal1(str) {
    return str.replace(/(\d)(?=(\d{3})+(\.|$))/g, "$1,")
}
console.log(deal1(str))

// 非正则解法
function deal2(str) {
    const temp = str.split(".")
    let arr = temp[0].split("")
    let tail = temp.length === 2 ? `.${temp[1]}` : ""
    
    const res = []
    let count = 0
    while (arr.length) {
        res.unshift(arr.pop())
        if (++count === 3) {
            count = 0
            res.unshift(",")
        }
    }
    return res.join("") + tail
}
console.log(deal2(str))