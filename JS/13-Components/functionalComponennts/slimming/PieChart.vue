<template>
  <div class='pie-chart' :style="{width: width / 100 + 'rem', height: height / 100 + 'rem'}">
    <div :id="pieId" style="width: 100%;height: 100%;"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import { getUUID } from '../../icx/utils'

  // 饼图配置
  const pieOptions = {
    series: [{
      type: 'pie',
      selectedMode: 'single',
      selectedOffset: 5,
      hoverAnimation: false,
      radius: ['13%', '50%'],
      center: ['50%', '50%'],
      data: [],
      label: {
        normal: {
          formatter: '{a|\n{b}\n{d}%\n}',
          rich: {
            a: {
              color: '#7A7D80',
              lineHeight: 18,
              align: 'left'
            }
          }
        }
      },
      labelLine: {
        normal: {
          lineStyle: {
            color: '#7A7D80'
          },
          smooth: 0,
          length: 10,
          length2: 20
        }
      }
    }]
  }

  export default {
    data () {
      return {
        pieChart: null,
        options: pieOptions
      }
    },
    props: {
      width: {
        type: Number,
        default: 600
      },
      height: {
        type: Number,
        default: 400
      },
      pieColors: {
        type: Array,
        default: () => []
      },
      pieData: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      pieId () {
        return 'pie-chart-' + getUUID(4, 16)
      }
    },
    watch: {
      pieData (nVal, oVal) {
        this.initPie()
      }
    },
    mounted () {
      this.initPie()
    },
    methods: {
      // 创建饼图
      initPie () {
        if (!this.pieData || this.pieData.length === 0) return
        if (this.pieChart) return
        this.pieChart = echarts.init(document.getElementById(this.pieId))
        let _tmpColors = [...this.pieColors]
        // let _length = this.pieData.length - 1
        let _pieData = this.pieData.map((item, index) => {
          return {
            value: item.value * 100,
            name: item.name,
            itemStyle: {
              normal: {
                color: _tmpColors[index]
              },
              emphasis: {
                color: _tmpColors[index]
              }
            }
            // selected: index === _length ? true : null
          }
        })
        this.options.series[0].data = _pieData
        this.pieChart.setOption(this.options)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .pie-chart {
    margin: 0 auto;
  }
</style>
