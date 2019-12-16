// myPromise

function myPromise(executor) {
  let _this = this
  _this.status = 'pending'
  _this.value = undefined
  _this.reason = undefined
  _this.onResolvedCallbacks = []
  _this.onRejectedCallbacks = []

  function resolve(value) {
    if (_this.status === 'pending') {
      _this.value = value
      _this.status = 'resolved'
      _this.onResolvedCallbacks.forEach(fn => fn())
    }
  }

  function reject(reason) {
    if (_this.status === 'pending') {
      _this.reason = reason
      _this.status = 'rejected'
      _this.onRejectedCallbacks.forEach(fn => fn())
    }
  }

  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('repeat reference'))
  }
  let called
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then
      if (typeof then === 'function') {
        then.call(x, function (y) {
          if (called) return
          called = true
          resolvePromise(promise2, y, resolve, reject)
        }, function (err) {
          if (called) return
          called = true
          reject(err)
        })
      } else {
        resolve(x)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}

myPromise.prototype.then = function (onFulfilled, onRejected) {
  let _this = this
  let _promise2

  // 成功和失败默认赋值
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => {
    value
  }
  onRejected = typeof onRejected === 'function' ? onRejected : err => {
    throw err
  }

  if (_this.status === 'resolved') {
    _promise2 = new myPromise(function (resolve, reject) {
      setTimeout(() => {
        try {
          let x = onFulfilled(_this.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    })
  }
  if (_this.status === 'rejected') {
    _promise2 = new myPromise(function (resolve, reject) {
      setTimeout(() => {
        try {
          let x = onRejected(_this.reason)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    })
  }
  if (_this.status === 'pending') {
    _promise2 = new myPromise(function (resolve, reject) {
      _this.onResolvedCallbacks.push(function () {
        setTimeout(() => {
          try {
            let x = onFulfilled(_this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
      _this.onRejectedCallbacks.push(function () {
        setTimeout(() => {
          try {
            let x = onRejected(_this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
    })
  }

  return _promise2
}

module.exports = myPromise