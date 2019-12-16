let Promise = require('./Promise')

let res = new Promise((resolve, reject) => {
  resolve('test')
})
res.then(data => {
  console.log('success ' + data)
}, err => {
  console.log('failed ' + err)
})


let res2 = new Promise((resolve, reject) => {
  reject('test2')
})
res2.then(data => {
  console.log('success ' + data)
}, err => {
  console.log('err ' + err)
})

let res3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(200)
  }, 1000)
})
res3.then(data => {
  console.log('success ' + data)
}, err => {
  console.log('failed ' + err)
})