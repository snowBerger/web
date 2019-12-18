export const isObject = (o) => {
  return Object.prototype.toString.call(o) === '[object, Object]'
}

export const createData = (deep, breadth) => {
  var data = {}
  var temp = data

  for (let i = 0; i < deep; i++) {
    temp = temp['data'] = {}
    for (let j = 0; j < breadth; j++) {
      temp[j] = j
    }
  }

  return data
}

const find = (arr, item) => {
  for (let i = 0, l = arr.length; i < l; i++) {
    if (arr[i].source === item) {
      return arr[i]
    }
  }

  return null
}
