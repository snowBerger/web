<template>
  <div class="icx-card2">
    <div class="card-title" v-if="titleText">
      <slot name="icon"></slot>
      <span class="iconfont" :class="titleIcon" :style="{color: cardColor}" v-if="titleIcon"></span>
      <span class="title-text" v-text="titleText" :style="{color: titleColor}"></span>
    </div>
    <div class="card-content">
      <slot></slot>
    </div>
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
        default: '#FF9580'
      },
      titleColor: {
        type: String,
        default: '#000'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .icx-card2 {
    border-radius: .12rem;
    overflow: hidden;
    background: #fff;
    padding: .4rem .3rem;
    .card-title {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: .3rem;
      .iconfont {
        font-size: .52rem;
        line-height: .52rem;
        margin: 0 .1rem;
      }
      .title-text {
        font-size: .38rem;
        line-height: .38rem;
      }
    }
    .card-content {
      background: #fff;
    }
  }
</style>
