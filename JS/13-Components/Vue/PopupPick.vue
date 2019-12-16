<template>
  <div class="popup-pick">
    <popup v-model="isShow" @on-hide="onPopupHide" @on-show="onShow">
      <picker :data="data" v-model="pickerValue" @on-change="onChange"></picker>
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
        pickerValue: []
      }
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
      }
    },
    props: {
      value: Array,
      show: false,
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
      onShow: {
        type: Function,
        required: false,
        default: () => {}
      },
      onChange: {
        type: Function,
        required: false,
        default: () => {}
      },
      onHide: {
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
  @import "../assets/css/mixin";
  .popup-pick{
    .bottom-button{
      display: flex;
      justify-content: space-between;
      align-items: center;
      pointer-events: auto;
      height: getRem(98);
      position: relative;
      box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
      .button{
        color: #00b7ee;
        width: 100%;
        pointer-events: auto;
        height: 100%;
        background: #f8f8f8;
        font-size: getRem(36);
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.3s;
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
