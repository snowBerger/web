<template>
  <div class="icx-steps">
    <ul class="steps-content" :style="{borderRadius: borderRadius / 100 + 'rem'}">
      <li class="step-item" v-for="step in currentArr" :style="{width: stepWidth / 100 + 'rem', height: stepHeight / 100 + 'rem',
                                                                background: step, marginLeft: stepBetween / 100 + 'rem'}"></li>
    </ul>
    <span class="steps-text" v-if="stepsText" v-text="stepsText" :style="{fontSize: textFontSize / 100 + 'rem', lineHeight: textFontSize / 100 + 'rem', color: activeColor}"></span>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        stepsArray: ['#F2F2F2', '#E6EBF0'],
        currentArr: []
      }
    },
    props: {
      activeColor: {
        type: String,
        default: '#FBBB00'
      },
      // step宽度
      stepWidth: {
        type: Number,
        default: 150,
        validator: value => value > 0
      },
      // step高度
      stepHeight: {
        type: Number,
        default: 12,
        validator: value => value > 0
      },
      stepsLevel: {
        type: Number,
        default: 1,
        validator: value => value > 0
      },
      borderRadius: {
        type: Number,
        default: 100
      },
      // step 间距
      stepBetween: {
        type: Number,
        default: 4
      },
      stepsText: {
        type: String,
        default: ''
      },
      textFontSize: {
        type: Number,
        default: 80
      }
    },
    mounted () {
      this.currentArr = [...this.stepsArray]
      this.currentArr.splice(this.currentArr.length + 1 - this.stepsLevel, 0, this.activeColor)
    }
  }
</script>
<style lang="scss" scoped>
  .icx-steps {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #fff;
    .steps-content {
      display: flex;
      flex-direction: row;
      overflow: hidden;
      margin-top: .1rem;
      & > li:first-child {
        margin-left: 0 !important;
      }
    }
    .steps-text {
      margin-left: .32rem;
      font-weight: 300;
    }
  }
</style>
