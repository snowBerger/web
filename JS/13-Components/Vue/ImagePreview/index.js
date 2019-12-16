import PreviewComponent from './preview.vue'
let $vm
export default {
  install (Vue) {
    let Preview = Vue.extend(PreviewComponent)
    if (!$vm) {
      $vm = new Preview({el: document.createElement('div')})
      document.body.appendChild($vm.$el)
    }
    // listenCall 会回传photoswipe对象
    const preview = {
      open (index, list, params, listenCall) {
        $vm.open(index, list, params, listenCall)
      },
      close () {
        $vm.close()
      }
    }
    Vue.$preview = preview
    Vue.mixin({
      created: function () {
        this.$preview = Vue.$preview
      }
    })
  }
}
