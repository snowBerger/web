// Function.prototype.apply2 = function (context, arr) {
//   var context = context || window
//   context.fn = this

//   var result
//   if (!arr) result = context.fn()
//   else {
//     var args = []

//     for (var i = 0, l = args.length; i < l; i++) {
//       args.push(`arr[${i}]`)
//     }
//     result = eval(`context.fn(${args})`)
//   }

//   delete context.fn
//   return result
// }


Function.prototype.myApply = function (context, args) {
  context = context || window
  context.fn = this

  context.fn(...args)

  delete context.fn
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

o.fn(4, 5, 6)                      // o 4 5 6
o.fn.apply(test, [4, 5, 6])        // test 4 5 6
o.fn.myApply(test, [4, 5, 6])      // test 4 5 6
