// 手写call, apply, bind
// call/apply：核心是通过this取到源函数，然后赋值给obj作为属性来执行，注意边界处理

Function.prototype.myCall = function (obj, ...args) {
    obj = obj ? Object(obj) : window
    const key = Symbol(obj)
    obj[key] = this

    let res
    if (args.length) {
        res = obj[key](...args)
    } else {
        res = obj[key]()
    }
    delete obj[key]
    return res
}

Function.prototype.myApply = function (obj, args) {
    obj = obj ? Object(obj) : window
    const key = Symbol(obj)
    obj[key] = this

    let res
    if (args.length) {
        res = obj[key](...args)
    } else {
        res = obj[key]()
    }
    delete obj[key]
    return res
}

// this怎么绑定上去的；参数预设
Function.prototype.myBind = function (obj, ...args) {
    obj = obj ? Object(obj) : window
    const key = Symbol(obj)
    obj[key] = this
    return function (...params) {
        obj[key](...[...args, ...params])
    }
}

// 以下为验证代码
const fun = function (a, b, c) {
    console.log(a, b, c, this.a);
    return this.a;
}
obj = { a: 123 }
console.log(fun.myCall(obj, 1, 2, 3))
console.log(fun.myApply(obj, [1, 2, 3]))
console.log(fun.myBind(obj,1)(2,3))
