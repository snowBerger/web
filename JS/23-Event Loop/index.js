func1 = async () => {
  console.log('func1')
  await func2()
  console.log('end func1')
}

func2 = async () => {
  console.log('func2')
  setTimeout(() => {
    console.log('func2 timeout')
  })
  console.log('end func2')
}

console.log('test')

func1()

setTimeout(() => {
  console.log('timeout')
})

console.log('end')


// test
// func1
// func2
// end func2
// end
// end func1
// func2 timeout
// timeout
