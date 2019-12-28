Function.prototype.apply = function (context, arr) {
  var context = context || window
  context.fn = this

  var result
  if (!arr) result = context.fn()
  else {
    var args = []

    for (var i = 0, l = args.length; i < l; i++) {
      args.push(`arr[${i}]`)
    }
    result = eval(`context.fn(${args})`)
  }

  delete context.fn
  return result
}