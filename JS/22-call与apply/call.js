// call() 方法在使用一个指定this值和若干个指定参数值等前提下调用某个函数或方法

// var foo = {
//   value: 1
// }

// function bar () {
//   value = 2
//   console.log(this.value)
// }

// bar.call(foo)   // 1

// 1. call改变了this指向
// 2. bar函数执行了

//---------
// 1. foo.fn = bar
// 2. foo.fn()
// 3. delete foo.fn
//---------

Function.prototype.call2 = function (context) {
  var context = context || window
  context.fn = this

  var args = []
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push(`arguments[${i}]`)
  }

  var result = eval(`context.fn(${args})`)

  delete context.fn
  return result
}