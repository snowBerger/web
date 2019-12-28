const add = function(a, b) {
  return a + b
}

const addPlus = function(a) {
  return function (b) {
    return a + b
  }
}

const addPlus1 = addPlus(1)
console.log(addPlus1(2))
console.log(addPlus1(20))