<template>
  <div class="pick">
    <div v-text="inputTitle" @click="isShow=true" class="pick-input" ></div>
    <popup v-model="isShow" :show-mask="false" :is-transparent="false" position="bottom" @on-hide="onPopupHide" @on-show="onShow">
      <picker :data="data" :fixed-columns="2"  v-model="pickerValue" @on-change="onChange"></picker>
      <div class="bottom-button">
        <div class="button confirm-button" ref="button" v-if="confirmButton" @click="onConfirm">{{ confirmBtn.name }}</div>
        <div class="button cancel-button r1b" ref="button" v-if="cancelButton" @click="onCancel">{{ cancelBtn.name }}</div>
      </div>
    </popup>
  </div>
</template>
<script>
  import { Popup, Picker } from 'vux'
  export default{
    data () {
      return {
        isShow: false,
        inputTitle: '',
        pickerValue: []
      }
    },
    mounted () {
      this.inputTitle = this.defaultValue
    },
    computed: {
      confirmBtn: function () {
        if (this.confirmButton instanceof Boolean) {
          return this.confirmButton
        } else {
          return Object.assign({}, {
            name: '确定',
            type: 'ok'
          }, this.confirmButton)
        }
      },
      cancelBtn: function () {
        if (this.cancelButton instanceof Boolean) {
          return this.cancelButton
        } else {
          return Object.assign({}, {
            name: '取消',
            type: 'cancel'
          }, this.cancelButton)
        }
      }
    },
    methods: {
      onConfirm (ev) {
        this.inputTitle = this.value[0]
        this.pickerValue = this.value
        this.isShow = false
        this.$emit('onConfirm')
      },
      onCancel (ev) {
        this.isShow = false
        this.$emit('onCancel')
      },
      onPopupHide: function () {
        this.isShow = false
        this.onHide()
      },
      onShow () {
        this.$emit('onShow')
      },
      onHide () {
        this.$emit('onHide')
      }
    },
    props: {
      value: Array,
      show: false,
      defaultValue: String,
      confirmButton: {
        type: [ Object, Boolean ],
        required: false
      },
      cancelButton: {
        type: [ Object, Boolean ],
        required: false
      },
      data: {
        type: Array,
        default: []
      },
      onChange: {
        type: Function,
        required: false,
        default: () => {}
      }
    },
    watch: {
      show: function (value) {
        this.isShow = value
      },
      value: function (value) {
        this.pickerValue = value
      },
      pickerValue: function (value) {
        this.$emit('input', value)
      }
    },
    components: {
      Popup,
      Picker
    }
  }
</script>
<style lang='scss' scoped>
  @import "../../assets/css/mixin";
  .pick{
    .vux-popup-dialog{
      width:100%;
      height:100%!important;
      box-sizing: border-box;
      z-index: 999!important;
      background: rgba(0, 0, 0, 0.5)!important;
      opacity: 1;
      tap-highlight-color: rgba(0, 0, 0, 0);
      overflow: hidden;
      transition: opacity 400ms, height 400ms;
    }
    .pick-input{
      height: 100%;
      background: #1f2e4e;
      border-radius: 0.08rem;
      color: #ffffff;
      opacity: .25;
      font-size: getRem(26);
      position: relative;
      vertical-align:middle
    }
    .pick-input.inputOpacity{
      opacity: 1;
    }
    .bottom-button{
      display: flex;
      justify-content: space-between;
      align-items: center;
      pointer-events: auto;
      height: getRem(100);
      position: relative;
      box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
      margin-top: getRem(20);
      position: absolute;
      bottom:getRem(30);
      width: 92%;
      left: 50%;
      margin-left: -46%;
      .button{
        color: #ffffff;
        width: 100%;
        pointer-events: auto;
        height: 100%;
        background: #00BADB;
        font-size: getRem(32);
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.3s;
        border-radius: 0.12rem;
        &:active{
          background: #f1f1f1;
        }
      }
      button + button{
        border-left: 1px solid #f2f2f2;
      }
    }
  }
</style>
<style lang="scss">
  .pick{
    .vux-popup-dialog{
      .vux-picker{
        background: #fff;
        border-radius: 0.12rem;
        bottom:1.5rem;
        position: absolute;
        width: 92%;
        left: 50%;
        margin-left: -46%;
        .scroller-component{
          width:98%;
          margin: 0 auto;
          .scroller-mask{
            border-radius: 0.12rem;
          }
          .scroller-content{
            overflow-x: hidden;
            z-index:1;
          }
          .scroller-indicator{
            background-image: linear-gradient(to left, #fff, #929292, #fff), linear-gradient(to left, #fff, #929292, #fff)!important;
            font-size: .32rem!important;
          }
        }
      }
    }
  }
</style>
