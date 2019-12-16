<template>
  <button class="icx-button send-vcode" :class="{'no-fill': !active, active: active}" @click="sendPhoneVcode">
    {{countDownText}}
  </button>
</template>

<script>
  import { senVcode } from '../service/service'
  import icx from '../icx'

  export default {
    data () {
      return {
        active: false,
        countDownText: '获取验证码',
        countDownTime: 60,
        sendVertifyTime: null
      }
    },
    props: {
      phoneNumber: {
        type: String,
        default: ''
      }
    },
    methods: {
      countDown () {
        let that = this
        if (that.countDownTime > 0) {
          clearTimeout(that.sendVertifyTime)
          that.active = true
          that.countDownTime--
          that.countDownText = '重发 ( ' + that.countDownTime + 's )'
          that.sendVertifyTime = setTimeout(that.countDown, 1000)
        } else {
          clearTimeout(that.sendVertifyTime)
          that.countDownTime = 60
          that.active = false
          that.countDownText = '获取验证码'
        }
      },
      async sendPhoneVcode () {
        if (this.active) return

        if (!this.phoneNumber) {
          icx.alert('请输入手机号')
          return
        }
        await senVcode(this.phoneNumber)
        this.countDown()
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import "../assets/css/mixin";
  .send-vcode {
    margin-right: 0;
    margin-left: 0;
    background: #fff;
    color: rgba(119, 119, 119, .6);
    height: .8rem;
    font-size: .26rem;
  }
</style>
