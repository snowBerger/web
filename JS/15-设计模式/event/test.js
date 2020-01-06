let event = {
  list: {},

  on(key, fn) {
    if (!this.list[key]) this.list[key] = []
    this.list[key].push(fn)
  },

  emmit() {
    let [key, ...args] = [...arguments]
    let fns = this.list[key]

    if (!fns || !fns.length) return false
    fns.forEach(fn => {
      fn.apply(this, args)
    })
  },

  remove(key, fn) {
    let fns = this.list[key]

    if (!fns || !fns.length) return false

    if(!fn) {
      fns && (fns.length = 0)
    } else {
      const index = fns.findIndex(func => func === fn)
      fns.splice(index, 1)
    }
  }
}


function name () {
  console.log('name')
}

function age () {
  console.log(28)
}

event.on('info', name)
event.on('info', age)
event.emmit('info', ['哈哈哈', '啦啦啦'])

event.remove('info', age)
event.emmit('info')

