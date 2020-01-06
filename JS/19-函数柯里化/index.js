// 如何实现 add(1)(2)(3)=6

// function add(a) {
//   return function(b) {
//     return function(c) {
//       return a + b + c
//     }
//   }
// }

// add(1)(2)(3)


function add () {
  const args = [...arguments]
  console.log(args)
  let fn = function () {
    const fn_args = [...arguments]
    console.log(fn_args)
    return add.apply(this, [...args, ...fn_args])
  }

  fn.toString = function () {
    return args.reduce((a, b) => a + b)
  }

  return fn
}


add(1)(2, 3)(4)