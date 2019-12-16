<template>
  <div class="text-field">
    <span class="iconfont" :class="getLeftIcon" v-if="!!getLeftIcon"></span>
    <input ref="input" :class="classes" :value="value" @input="onChange"/>
  </div>
</template>
<script>
import cx from 'classnames'
import mField from '../mixins/field'

export default {
  mixins: [mField],
  props: {
    prefixCls: {
      type: String,
      default: 'icx-input-text'
    },
    leftIcon: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    classes () {
      return cx({
        [this.className]: !!this.className,
        [`${this.prefixCls}-${this.status}`]: !!this.status,
        [`${this.prefixCls}-${this.size}`]: !!this.size,
        [this.prefixCls]: 1
      })
    },
    getLeftIcon () {
      if (this.leftIcon) {
        return 'icon-' + this.leftIcon
      }

      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .text-field{
    span.iconfont ~ input{
      padding-left: .8rem;
    }
  }
  .icx-input-text {
    width: 6.04rem;
    height: .808rem;
    border-radius: .06px;
    font-size: 0.26rem;
    border: 0px;
    padding: 0 0.2rem;
    background: rgba(143, 160, 170, 0.5);
    color: rgba(255, 255, 255, 0.5);
  }
</style>
