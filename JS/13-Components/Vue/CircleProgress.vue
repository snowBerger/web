<template>
  <div class="circle-progress">
    <canvas :id="'progress-bg-' + circleId" style="display: none">
      当前浏览器不支持Canvas组件，请更换浏览器重试
    </canvas>
    <canvas :id="'progress-circle-' + circleId" class="progress-circle">
      当前浏览器不支持Canvas组件，请更换浏览器重试
    </canvas>
    <div class="progress-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  import { getUUID } from '../icx/utils'

  export default {
    data () {
      return {
        ctx: null,
        bgImage: null,
        newFill: null,
        ratio: 1,
        steps: 10,
        scale: 100,
        startAngle: 1.5 * Math.PI,  // 开始弧度
        xAngle: 6 * (Math.PI / 180),  // 偏移角度量
        tmpAngle: 1.5 * Math.PI
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
        default: 10,
        validator: value => value > 0
      },
      // 进度值
      percent: {
        type: Number,
        default: 60
      },
      // 线条颜色
      strokeStyle: {
        type: String,
        default: 'rgba(0, 0, 255, .5)'
      },
      // 背景地址
      bgImg: {
        type: String,
        default: 'http://icxpic-10023060.file.myqcloud.com/report/v1/scoreBgImg.png'
      },
      // 背景色
      bgStrokeStyle: {
        type: String,
        default: 'rgba(0, 0, 0, .05)'
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
      maxPercent () {
        return this.percent > 0.94 ? 0.94 : this.percent
      },
      // 结束弧度
      endAngle () {
        return this.startAngle + 2 * Math.PI * this.maxPercent
      }
    },
    mounted () {
      let canvas = document.getElementById('progress-circle-' + this.circleId)
      this.ctx = canvas.getContext('2d')
      this.ratio = this.getPixelRatio(this.ctx)
      canvas.style.width = this.diameter / this.scale + 'rem'
      canvas.style.height = this.diameter / this.scale + 'rem'
      canvas.width = this.diameter * this.ratio
      canvas.height = this.diameter * this.ratio
      this.ctx.scale(this.ratio, this.ratio)
      this.bgImage = new Image()
      this.bgImage.src = this.bgImg
      this.drawCircle()
      this.bgImage.onload = () => {
        this.setImageFill()
      }
    },
    methods: {
      // 绘制圆环
      drawCircle () {
        this.ctx.beginPath()
        this.ctx.arc(this.r, this.r, this.cR, 0, Math.PI * 2)
        this.ctx.lineWidth = this.lineWidth
        this.ctx.strokeStyle = this.bgStrokeStyle
        this.ctx.stroke()
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
        // this.ctx.clearRect(0, 0, this.diameter, this.diameter)

        // 画圈
        this.ctx.beginPath()
        this.ctx.lineWidth = this.lineWidth
        this.ctx.strokeStyle = this.newFill
        this.ctx.lineCap = this.lineCap
        this.ctx.arc(this.r, this.r, this.cR, this.startAngle, this.tmpAngle)
        this.ctx.stroke()
        this.ctx.closePath()

        requestAnimationFrame(this.rander)
      },
      setImageFill () {
        // 背景图
        let bg = document.getElementById('progress-bg-' + this.circleId)
        bg.width = this.diameter
        bg.height = this.diameter
        bg.getContext('2d').drawImage(this.bgImage, 0, 0, this.diameter, this.diameter)
        this.newFill = this.ctx.createPattern(bg, 'no-repeat')
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
    .progress-circle {
      margin: 0 auto;
      display: block;
    }
    .progress-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
  }
</style>
