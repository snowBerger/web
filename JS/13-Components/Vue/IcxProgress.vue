<template>
  <div class="circle-progress" :style="{width: diameter / 100 + 'rem', height: diameter / 100 + 'rem'}">
    <canvas :id="'progress-bg-' + circleId" class="bg-circle">
      当前浏览器不支持Canvas组件，请更换浏览器重试
    </canvas>
    <canvas :id="'progress-circle-' + circleId" class="progress-circle">
      当前浏览器不支持Canvas组件，请更换浏览器重试
    </canvas>
  </div>
</template>
<script>
  import { getUUID } from '../icx/utils'

  export default {
    data () {
      return {
        ctx: null,
        ctxBG: null,
        ratio: 1,
        scale: 100,
        lackPercent: 0.5,  // 圆弧缺失部分占比
        xAngle: 6 * (Math.PI / 180),  // 偏移角度量
        tmpAngle: (0.5 + this.lackPercent / 2) * Math.PI,
        finishProgress: false
      }
    },
    props: {
      // 元素尺寸
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
        validator: value => value >= 0
      },
      // 线条颜色
      strokeStyle: {
        type: String,
        default: '#00BAD8'
      },
      // 背景色
      bgStrokeStyle: {
        type: String,
        default: '#F0F1F2'
      },
      fontSize: {
        type: Number,
        default: 80
      },
      // 单位
      unit: {
        type: String,
        default: '%'
      },
      unitFontSize: {
        type: Number,
        default: 28
      },
      unitColor: {
        type: String,
        default: '#7A7D80'
      },
      lineCap: {
        type: String,
        default: 'round'
      }
    },
    computed: {
      // 随机Id
      circleId () {
        return getUUID(4, 16)
      },
      // 元素中心
      r () {
        return this.diameter / 2
      },
      // 圆半径
      cR () {
        return this.r - this.lineWidth / 2
      },
      // 开始弧度
      startAngle () {
        return (0.5 + this.lackPercent / 2) * Math.PI   // 开始弧度
      },
      // 结束弧度
      endAngle () {
        return this.startAngle + (2 - this.lackPercent) * Math.PI * this.percent
      }
    },
    mounted () {
      if (this.percent && this.percent >= 0) {
        this.startProgress()
      }
    },
    watch: {
      percent (nVal, oVal) {
        if (nVal && nVal !== oVal) {
          this.startProgress()
        }
      }
    },
    methods: {
      startProgress () {
        // 绘制背景圆弧
        this.drawBackgroundCircle()
        // 绘制进度
        this.drawProgressCircle()
      },
      // 绘制背景圆弧
      drawBackgroundCircle () {
        let canvasBG = document.getElementById('progress-bg-' + this.circleId)
        this.ctxBG = canvasBG.getContext('2d')
        this.ratio = this.getPixelRatio(this.ctxBG)
        canvasBG.style.width = this.diameter / this.scale + 'rem'
        canvasBG.style.height = this.diameter / this.scale + 'rem'
        canvasBG.width = this.diameter * this.ratio
        canvasBG.height = this.diameter * this.ratio
        this.ctxBG.scale(this.ratio, this.ratio)
        this.ctxBG.beginPath()
        this.ctxBG.arc(this.r, this.r, this.cR, this.startAngle, (0.5 - this.lackPercent / 2) * Math.PI)
        this.ctxBG.lineWidth = this.lineWidth * 0.5
        this.ctxBG.lineCap = this.lineCap
        this.ctxBG.strokeStyle = this.bgStrokeStyle

        // 写单位
        this.ctxBG.fillStyle = this.unitColor
        this.ctxBG.font = this.unitFontSize + 'px Microsoft Yahei'
        this.ctxBG.textAlign = 'center'
        this.ctxBG.fillText(this.unit, this.r, this.r * 2 - this.unitFontSize / 2)
        this.ctxBG.stroke()
      },
      // 渲染函数
      rander () {
        if (this.tmpAngle >= this.endAngle) {
          return
        } else if (this.tmpAngle + this.xAngle > this.endAngle) {
          this.tmpAngle = this.endAngle
        } else {
          this.tmpAngle += this.xAngle
        }
        this.ctx.clearRect(0, 0, this.diameter, this.diameter)

        // 画圈
        this.ctx.beginPath()
        this.ctx.lineWidth = this.lineWidth
        this.ctx.strokeStyle = this.strokeStyle
        this.ctx.lineCap = this.lineCap
        this.ctx.arc(this.r, this.r, this.cR, this.startAngle, this.tmpAngle)
        this.ctx.stroke()
        this.ctx.closePath()
        // 写字
        this.ctx.fillStyle = this.strokeStyle
        this.ctx.font = '300 ' + this.fontSize + 'px Microsoft Yahei'
        this.ctx.textAlign = 'center'
        this.ctx.fillText(Math.round((this.tmpAngle - this.startAngle) / (this.endAngle - this.startAngle) * this.percent * 100), this.r, this.r + this.fontSize / 3)

        requestAnimationFrame(this.rander)
      },
      drawProgressCircle () {
        this.tmpAngle = this.startAngle
        let canvas = document.getElementById('progress-circle-' + this.circleId)
        this.ctx = canvas.getContext('2d')
        this.ratio = this.getPixelRatio(this.ctx)
        canvas.style.width = this.diameter / this.scale + 'rem'
        canvas.style.height = this.diameter / this.scale + 'rem'
        canvas.width = this.diameter * this.ratio
        canvas.height = this.diameter * this.ratio
        this.ctx.scale(this.ratio, this.ratio)
        this.rander()
      },
      // polyfill 提供了这个方法用来获取设备的 pixel ratio
      getPixelRatio (context) {
        let backingStore = context.backingStorePixelRatio ||
          context.webkitBackingStorePixelRatio ||
          context.mozBackingStorePixelRatio ||
          context.msBackingStorePixelRatio ||
          context.oBackingStorePixelRatio ||
          context.backingStorePixelRatio || 1
        return (window.devicePixelRatio || 1) / backingStore
      }
    }
  }
</script>
<style lang="scss" scoped>
  .circle-progress {
    position: relative;
    .bg-circle,
    .progress-circle {
      position: absolute;
      margin: 0 auto;
      display: block;
    }
  }
</style>
