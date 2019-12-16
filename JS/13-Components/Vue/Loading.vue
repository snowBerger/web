<template>
  <transition name="loading-fade">
    <div ref="loadingEl" class="icx-loading" v-show='loadingParam.state != CONST.INT_LOADING_SUCCESS'>
      <i class="iconfont" :class="{'icon-loading': loadingParam.state == CONST.INT_LOADING, 'icon-shibai1': loadingParam.state == CONST.INT_LOADING_FAIL}"></i>
      <p class="loading-text">
        {{loadingParam.loadingText || (loadingParam.state == CONST.INT_LOADING ? CONST.STRING_LOADING_TEXT :
        loadingParam.state == CONST.INT_LOADING_FAIL ? CONST.STRING_LOADING_FAIL_TEXT : loadingParam.loadingText)}}
      </p>
      <button v-if="loadingParam.state != CONST.INT_LOADING_SUCCESS && loadingParam.state != CONST.INT_LOADING" @click="loadingParam.buttonClick"
      class="icx-button reloading" :class="loadingParam.buttonClass">{{loadingParam.buttonText || CONST.STRING_LOADING_AGAIN}}</button>
    </div>
  </transition>
</template>

<script>
  import * as CONST from '../icx/const'

  export default {
    data () {
      return {
        CONST: CONST
      }
    },
    computed: {
      loadingParam () {
        return this.$store.state.loadingParam
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import "../assets/css/mixin";
  .loading-fade-enter-active, .loading-fade-leave-active {
    transition: opacity .5s
  }
  .loading-fade-enter, .loading-fade-leave-active {
    opacity: 0
  }
  .icx-loading{
    position: fixed;
    width: 100%;
    height: 100%;
    background: #fff;
    z-index: 1000;
    justify-content: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    color: rgba(58,58,58, 0.6);
    top: 0;
    left: 0;
    .iconfont{
      font-size: .5rem;
      color: #585858;
    }
    .icon-loading{
      width: .54rem;
      height: .54rem;
      background: url(../assets/images/icon_loading.png) no-repeat center center/contain;
      transform-origin: center center;
      animation: rotate 2s linear infinite;
    }
    .loading-text{
      color: rgba(#585858, 0.7);
      font-size: 0.28rem;
    }
    button.icx-button{
      background: #00B0B9;
      border-radius: 0.06rem;
      font-size: 0.28rem;
      color: #fff;
      width: auto;
      border: none;
      height: .6rem;
      transition: all 0.3s;
      line-height: .6rem;
      padding: 0 0.2rem;
      margin-top: 0.1rem;
      &:active{
        background: #049DB9;
      }
    }
    @-webkit-keyframes rotate{
      0%{ -webkit-transform:rotate(0deg);}
      100%{-webkit-transform:rotate(360deg);}
    }
    @keyframes rotate{
      0%{ transform:rotate(0deg);}
      100%{transform:rotate(360deg);}
    }
  }
</style>
