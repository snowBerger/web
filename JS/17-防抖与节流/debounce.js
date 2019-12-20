// debounce（防抖），简单来说就是防止抖动。
// 当持续触发事件时，debounce 会合并事件且不会去触发事件，当一定时间内没有触发再这个事件时，才真正去触发事件。

const debounce1 = (func, wait, ...args) => {
  let timeout

  return function () {
    let that = this
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(that, args)
    }, wait)
  }
}

const debounce2 = (func, wait, ...args) => {
  let timeout

  return function () {
    let that = this
    if (timeout) clearTimeout(timeout)
    let callNow = !timeout

    timeout = setTimeout(() => {
      timeout = null
    }, wait)

    if (callNow) func.apply(that, args)
  }
}

export default function debounce(func, wait, immediate) {
  let timeout;

  return function () {
    let that = this
    let args = arguments

    if (timeout) clearTimeout(timeout)
    if (immediate) {
      let callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)

      if (callNow) func.apply(that, args)
    } else {
      timeout = setTimeout(() => {
        func.apply(that, args)
      }, wait)
    }
  }
}