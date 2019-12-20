const throttle1 = (func, wait, ...args) => {
  let pre = 0
  return function () {
    const that = this
    let now = Date.now()

    if (now - pre >= wait) {
      func.apply(that, args)
      pre = now
    }
  }
}

const throttle2 = (func, wait, ...args) => {
  let timeout

  return function () {
    const that = this
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(that, args)
      }, wait)
    }
  }
}

/**
 * 
 * @param {*} func 
 * @param {*} wait 
 * @param {*} type 1: 时间戳；2:定时器
 */
export default function throttle(func, wait, type) {
  let previous = 0
  let timeout

  return function () {
    const that = this
    const args = arguments

    if (type === 1) {
      let now = Date.now()
      if (now - previous >= wait) {
        func.apply(that, args)
        previous = now
      }
    } else {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null
          func.apply(that, args)
        }, wait)
      }
    }
  }
}