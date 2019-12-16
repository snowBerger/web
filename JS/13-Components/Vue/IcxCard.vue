<template>
  <div class="icx-card">
    <div class="card-title" :style="{background: cardColor}" v-if="titleText">
      <span class="title-icon" :style="{background: fontColor}">
        <slot name="icon"></slot>
        <span class="iconfont" :class="titleIcon" :style="{color: cardColor}" v-if="titleIcon"></span>
      </span>
      <span class="title-text" v-text="titleText" :style="{color: fontColor}"></span>
    </div>
    <div class="card-content" v-if="!selfContent">
      <slot>
        ICX-Card Card text
      </slot>
    </div>
    <slot name="self"></slot>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    props: {
      titleIcon: {
        type: String,
        default: ''
      },
      titleText: {
        type: String,
        default: ''
      },
      cardColor: {
        type: String,
        default: '#00BADB'
      },
      fontColor: {
        type: String,
        default: '#FFF'
      },
      selfContent: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .icx-card {
    border-radius: .08rem;
    overflow: hidden;
    .card-title {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: .8rem;
      font-size: .4rem;
      line-height: .4rem;
      .title-icon {
        width: .56rem;
        height: .56rem;
        margin: 0 .08rem 0 .2rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        .iconfont {
          font-size: .4rem;
        }
      }
      .title-text {
        font-size: .32rem;
      }
    }
    .card-content {
      padding: .3rem;
      background: #fff;
    }
  }
</style>
