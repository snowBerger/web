import debounce from './debounce'

search.onChange = debounce((value) => {
  console.log(value)
}, 600)

btn.onclick = debounce(() => {
  console.log('test click')
}, 1000)

