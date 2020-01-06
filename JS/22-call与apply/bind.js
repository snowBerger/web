// bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，
// 之后的一序列参数将会在传递的实参前传入作为它的参数。(来自于 MDN )

// var foo = {
//   value: 1
// }

// function bar() {
//   value = 2 
//   console.log(this.value)
// }

// var bindFoo = bar.bind(foo)

// bindFoo()   // 1



// Function.prototype.bind2 = function (context) {

//   if (typeof this !== "function") {
//     throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
//   }

//   var self = this;
//   var args = Array.prototype.slice.call(arguments, 1);
//   var fNOP = function () {};

//   var fbound = function () {
//       self.apply(this instanceof self ? this : context, args.concat(Array.prototype.slice.call(arguments)));
//   }

//   fNOP.prototype = this.prototype;
//   fbound.prototype = new fNOP();

//   return fbound;

// }


// Function.prototype.bind2 = function (context) {
//   var that = this
//   var args = arguments.slice(1)

//   return function (arguments) {
//     that.apply(context, args.concat(arguments))
//   }
// }


Function.prototype.myBind = function (context) {
  let args = [...arguments].slice(1)

  return (...args2) => {
    let res
    context = context || window
    context.fn = this

    res = context.fn(...[...args, ...args2])

    delete context.fn
    
    return res
  }
}

let test = {
  name: 'test'
}

let o = {
  name: 'o',
  fn: function() {
    console.log(this.name, ...arguments)
  }
}

let b = o.fn.bind(test, 7, 8)
b()                                // test 7 8
b(9, 10)                           // test 7 8 9 10

let c = o.fn.myBind(test, 7, 8)                  
c()                                // test 7 8
c(9, 10)                           // test 7 8 9 10
