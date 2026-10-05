// 对象的深拷贝
const ins = {
    a: 1,
    b: { c: 2 },
    c: [1, { a: 1 }]
}
console.log(copy(ins))

function copy(o) {
    const typeO = typeof o
    if (["string", "number", "boolean", "symbol", "undefined"].includes(typeO) || o === null) {
        return o
    }
    let res = {}
    // 数组
    if (o instanceof Array) {
        res = []
        for (let item of o) {
            res.push(copy(item))
        }
    } else if (o instanceof Object) {
        for (let item of Object.keys(o)) {
            res[item] = copy(o[item])
        }
    }
    return res
}
