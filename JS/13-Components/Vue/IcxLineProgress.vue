<template>
  <div class="line-progress">
    <div class="line-content">
      <div class="line-bg" :style="{width: diameter / 100 + 'rem', height: lineWidth / 100 + 'rem', background: bgStrokeStyle, borderRadius: borderRadius / 100 + 'rem'}"></div>
      <div class="line" :style="{width: tmpDistance / 100 + 'rem', height: lineWidth / 100 + 'rem', background: strokeStyle, borderRadius: borderRadius / 100 + 'rem',
                               marginTop: -lineWidth / 100 + 'rem'}"></div>
    </div>
    <div class="line-text" v-if="hasText">
      <span class="progress-text" v-text="Math.round(tmpDistance / diameter * 100)" :style="{fontSize: fontSize / 100 + 'rem', lineHeight: fontSize / 100 + 'rem', color: strokeStyle}"></span>
      <span class="progress-unit" v-text="unit" :style="{fontSize: unitFontSize / 100 + 'rem', lineHeight: unitFontSize / 100 + 'rem', color: strokeStyle}"></span>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        startDistance: 0,
        tmpDistance: 0
      }
    },
    props: {
      // 线条长度
      diameter: {
        type: Number,
        default: 200,
        validator: value => value > 0
      },
      // 线条宽度
      lineWidth: {
        type: Number,
        default: 8,
        validator: value => value > 0
      },
      // 进度值
      percent: {
        type: Number,
        default: 0.6
      },
      // 线条颜色
      strokeStyle: {
        type: String,
        default: '#00BAD8'
      },
      // 背景色
      bgStrokeStyle: {
        type: String,
        default: '#EDEFF0'
      },
      fontSize: {
        type: Number,
        default: 80
      },
      // 是否有进度数值
      hasText: {
        type: Boolean,
        default: true
      },
      // 单位
      unit: {
        type: String,
        default: '%'
      },
      unitFontSize: {
        type: Number,
        default: 32
      },
      borderRadius: {
        type: Number,
        default: 100
      }
    },
    computed: {
      // 偏移量
      xDistance () {
        return this.diameter * 0.01
      },
      // 进度条长度
      endDistance () {
        return this.diameter * this.percent
      }
    },
    mounted () {
      this.tmpDistance = this.startDistance
      // 绘制进度条
      this.rander()
    },
    methods: {
      // 渲染函数
      rander () {
        if (this.tmpDistance >= this.endDistance) {
          this.$emit('finish')
          return
        } else if (this.tmpDistance + this.xDistance > this.endDistance) {
          this.tmpDistance = this.endDistance
        } else {
          this.tmpDistance += this.xDistance
        }
        requestAnimationFrame(this.rander)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .line-progress {
    display: flex;
    flex-direction: row;
    align-items: center;
    .line-content {
      margin-top: .1rem;
      position: relative;
      .line {
        position: absolute;
      }
    }
    .line-text {
      margin-left: .32rem;
      display: flex;
      align-items: baseline;
      .progress-text {
        font-weight: 300;
      }
      .progress-unit {
        margin-left: .03rem;
      }
    }
  }
</style>
