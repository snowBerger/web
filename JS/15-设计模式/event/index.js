let event = {
  list: {},
  on(key, fn) {
    if (!this.list[key]) {
      this.list[key] = []
    }
    this.list[key].push(fn)
  },
  emit() {
    let key = [].shift.call(arguments)
    let fns = this.list[key]

    if (!fns || fns.length === 0) {
      return false
    }
    fns.forEach(fn => {
      fn.apply(this, arguments)
    })
  },
  remove(key, fn) {
    let fns = this.list[key]

    if (!fns) return false

    if (!fn) {
      fns && (fns.length = 0)
    } else {
      const index = fns.findIndex(cb => cb === fn)
      fns.splice(index, 1)
    }
  }
}

// eg
function cat() {
  console.log('一起喵喵喵')
}

function dog() {
  console.log('一起汪汪汪')
}

event.on('pet', data => {
  console.log('receive: ' + data)
})
event.on('pet', cat)
event.on('pet', dog)

// 取消 dog 订阅
event.remove('pet', dog)

event.emit('pet', ['二哈', '波斯猫'])
