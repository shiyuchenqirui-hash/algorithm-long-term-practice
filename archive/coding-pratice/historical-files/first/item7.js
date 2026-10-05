// 函数柯里化的代码实现（柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术）
// 参考：https://segmentfault.com/a/1190000018180159

/**
 * @Des: 参数定长函数柯里化
 * @param {*} fn 原始函数
 * @param {*} len 原始函数参数长度
 * @param {array} args 已传入的参数
 * @return {*} 柯里化后的函数
 */
function curry(fn, len = fn.length, ...args) {
    return function (...params) {
        const _args = [...args, ...params];
        if (_args.length >= len) {
            return fn(..._args);
        } else {
            return curry(fn, len, ..._args)
        }
    }
}

// 以下为参数定长函数柯里化验证代码
const fun = (a, b, c) => {
    console.log(a, b, c)
    return a * b + c
}
console.log(curry(fun)(1)(2)(3))

// -------

// 参数不定长函数柯里化
//  所以如果要支持参数不定长的场景，已经柯里化的函数在执行完毕时不能返回一个值，只能返回一个函数；同时要让JS引擎在解析得到的这个结果时，能求出我们预期的值。

/**
 * @Des: 参数定长函数柯里化（重写了toString和valueOf）
 * @param {*} fn 原始函数
 * @param {array} args 已传入的参数
 * @return {*} 柯里化后的函数
 */
function uncertainCurry(fn, ...args) {
    const _curry = function (...params) {
        const argus = [...args, ...params]
        return uncertainCurry(fn, ...argus)
    }
    _curry.toString = _curry.valueOf = function () {
        return fn.apply(null, args)
    }

    return _curry
}

function uncertainFn(...args) {
    console.log(...args)
    return args
}
const uncertainFnCurry = uncertainCurry(uncertainFn)
console.log(uncertainFnCurry(1)(2)(3).valueOf())
