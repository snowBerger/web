function func() {
  let name = 'test'

  return function () {
    console.log(name)
  }
}

const func2 = func()
func2() // test