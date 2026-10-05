// 自己实现一个promise | promise的API
// 核心要实现：异步 .then 链式调用 状态变化(pending,rejected,fulfilled) all,race,resolve,reject
function MyPromise(exector) {
  var _this = this
  this.status = 'pending'
  this.value = undefined
  this.resolveList = []
  this.rejectList = []

  try {
      exector(resolve, reject)
  } catch (e) {
      reject(e)
  }

  function resolve(value) {
      if (_this.status === 'pending') {
          _this.status = 'fulfilled'
          _this.value = value
          _this.resolveList.forEach(item => {
              item(_this.value)
              _this.resolveList.shift()
          })
      }
  }

  function reject(value) {
      if (_this.status === 'pending') {
          _this.status = 'rejected'
          _this.value = value
          _this.rejectList.forEach(item => {
              item(_this.value)
              _this.rejectList.shift()
          })
      }
  }
}

MyPromise.prototype.then = function (resolveCallback, rejectCallback) {
  var _this = this
  if (this.status === 'fulfilled') {
      return new MyPromise((resolve, reject) => {
          var result = resolveCallback(_this.value)
          if (result instanceof MyPromise) {
              result.then(resolve, reject)
          } else {
              resolve(result)
          }
      })
  }

  if (this.status === 'rejected') {
      return new MyPromise((resolve, reject) => {
          var result = rejectCallback(_this.value)
          if (result instanceof MyPromise) {
              result.then(resolve, reject)
          } else {
              reject(result)
          }
      })
  }

  if (this.status === 'pending') {
      return new MyPromise((resolve, reject) => {
          _this.resolveList.push(function () {
              var result = resolveCallback(_this.value)
              if (result instanceof MyPromise) {
                  result.then(resolve, reject)
              } else {
                  resolve(result)
              }
          })

          _this.rejectList.push(function () {
              var result = rejectCallback(_this.value)
              if (result instanceof MyPromise) {
                  result.then(resolve, reject)
              } else {
                  reject(result)
              }

          })

      })
  }
}

//  以下为验证链式调用代码
{
  new MyPromise((resolve, reject) => {
      resolve(777)
  }).then((data) => {
      console.log('resolve1:' + data)
      return 888
  }).then((data) => {
      console.log('resolve2:' + data)
  })
  //resolve1: 777
  //resolve2: 888

  new MyPromise((resolve, reject) => {
      resolve(666)
  }).then((data) => {
      console.log('resolve1:' + data)
      return new MyPromise((resolve, reject) => {
          setTimeout(() => {
              resolve(999)
          }, 2000);
      })
  }).then((data) => {
      console.log('resolve2:' + data)
  })
  //resolve1: 666
  //resolve2: 999
}

// 模拟Promise.all
MyPromise.all = function (iterable) {
  return new MyPromise((resolve, reject) => {
      let result = []
      for (const item of iterable) {
          item.then(data => {
              result.push(data)
          }, reason => {
              result = reason
              return
          })
      }

      resolve(result)
  })
}

//下面是测试Promise.all测试用例
{
  let p1 = new MyPromise((resolve, reject) => {
      resolve(666)
  })
  let p2 = new MyPromise((resolve, reject) => {
      resolve(888)
  })
  let p3 = new MyPromise((resolve, reject) => {
      resolve(999)
  })
  let p6 = new MyPromise((resolve, reject) => {
      reject(222)
  })
  let p4 = MyPromise.all([p1, p2, p3])

  p4.then(data => {
      console.log(data)
  })
  //[666, 888, 999]
  let p7 = MyPromise.all([p1, p3, p6])
  p7.then(data => {
      console.log(data)
  })
  //222
}

// 模拟Promise.race
MyPromise.race = function (iterable) {
  return new MyPromise((resolve, reject) => {
      for (const item of iterable) {
          item.then(data => {
              resolve(data)
          }, reason => {
              reject(reson)
          })
      }
  })
}
//下面是测试Promise.race测试用例
{
  const p1 = new MyPromise(function (resolve, reject) {
      setTimeout(resolve, 500, 'one');
  });

  const p2 = new MyPromise(function (resolve, reject) {
      setTimeout(resolve, 100, 'two');
  });

  MyPromise.race([p1, p2]).then(function (value) {
      console.log(value);
      // Both resolve, but promise2 is faster
  });
  //two
}

//  模拟Promise.resolve
MyPromise.resolve = function (data) {
  return new MyPromise((resolve, reject) => {
      resolve(data)
  })
}
// 测试用例
{
  const p1 = MyPromise.resolve(123);
  p1.then(function (value) {
      console.log("resolve:", value);
  });
  //123
}

// 模拟Promise.reject
MyPromise.reject = function (data) {
  return new MyPromise((resolve, reject) => {
      reject(data)
  })
}
{
  // 测试用例
  const p1 = MyPromise.reject(123);
  p1.then(null, function (value) {
      console.log("reject:", value);
  });
  //123
}

// 尚未实现finally，catch。