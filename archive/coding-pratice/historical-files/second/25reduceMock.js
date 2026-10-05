// 实现isArray
function myIsArray(arr) {
    return Object.prototype.toString.call(arr) === "[Object Array]"
}
// 验证代码
console.log(myIsArray([]))

// 模拟reduce方法 ： array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
// reduce方法接收一个函数作为累加器（accumulator），数组中的每个值（从左到右）开始缩减，最终为一个值。
Array.prototype.myReduce = function (fun, initialValue) {
    let total = initialValue
    for (let i = 0, len = this.length; i < len; i++) {
        const temp = this[i]
        total = fun(total, temp, i, this)
    }
    return total
}
// 验证代码
const items = [10, 120, 1000];
const reducer = function add(sumSoFar, item) {
    sumSoFar.sum = sumSoFar.sum + item;
    return sumSoFar;
};
const total = items.myReduce(reducer, { sum: 0 });
console.log(total); // {sum:1130}