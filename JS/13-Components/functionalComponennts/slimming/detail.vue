<template>
  <div class="detail report-pager">
    <loading></loading>
    <div v-show="finishLoad">
      <card class-name="desc" icon="iconfont icon-icon-tanshuihuahewu" :title="pageData.name">
        <div class="card-desc" v-text="pageData.simpleDesc"></div>
        <div class="card-text" v-text="pageData.desc"></div>
      </card>
      <card class-name="content" :title="'你摄入的' + pageData.name + '情况'">
        <div class="power-flag">
          <span class="iconfont icon-flag_L" style="color: #2DD6D6"></span>
          <span class="iconfont icon-flag_R" style="color: #26B6B6"></span>
        </div>
        <div class="level-progress">
          <level-progress :level="currentLevel"></level-progress>
        </div>
        <div class="desc">
          <span>解读：</span>
          <span v-text="pageData.levelDesc"></span>
        </div>
      </card>
      <!-- <div class="chart">
        <div class="chart-title">变化趋势</div>
        <div id="slimming-chart"></div>
      </div> -->
    </div>
  </div>
</template>
<script>
  import Card from './Card'
  import LevelProgress from './LevelProgress'
  import Loading from '../../components/Loading'
  import pageMix from '../../mixins/page'
  import Highcharts from 'highcharts'
  import { chartOptions, reportQuery, levelArray, getLevelByScore } from './common'
  import { getSlimmingDetail } from '../../service/service'
  import * as CONST from '../../icx/const'

  export default {
    mixins: [ pageMix ],
    data () {
      return {
        levelArray: levelArray,
        finishLoad: false,
        pageData: {
          detailChart: null,
          chartOptions: chartOptions,
          levelDistributions: [],
          tends: []
        }
      }
    },
    components: { Card, LevelProgress, Loading },
    computed: {
      currentLevel () {
        if (+this.pageData.level === 1) {
          return 3
        } else if (+this.pageData.level === 2) {
          return 2
        } else {
          return 1
        }
      }
    },
    mounted () {
      this.initPage()
    },
    methods: {
      async initPage () {
        this.CHANGE_LOADING_STATE({ state: CONST.INT_LOADING })
        const _response = await getSlimmingDetail(this.currentPersonId, this.$route.params.id, reportQuery.productPlan, reportQuery.reportType)
        if (this.isApiResponseOk(_response)) {
          this.pageData = Object.assign({}, _response.data)
          // this.displayChart(0)
          this.loadingSuccess()
          this.finishLoad = true
        } else {
          this.loadingSuccess()
          this.finishLoad = true
        }
      },
      // 初始化趋势图配置
      initChartOptions () {
        chartOptions.chart.backgroundColor = '#2DD6D6'
        chartOptions.xAxis.lineColor = '#fff'
        chartOptions.yAxis.gridLineColor = 'rgba(0, 0, 0, .1)'
        chartOptions.plotOptions.series.fillColor = {
          linearGradient: [0, 0, 0, 200],
          stops: [[0, 'rgba(24, 168, 168, 1.0)'], [1, 'rgba(24, 168, 168, 0.0)']]
        }
        chartOptions.plotOptions.series.marker.fillColor = '#fff'
        chartOptions.tooltip.style = { 'color': '#22BEBE' }
      },
      // 创建图表
      initChart () {
        if (!this.pageData.tends || this.pageData.tends.length === 0) return
        if (this.detailChart) return
        this.initChartOptions()
        this.detailChart = new Highcharts.Chart('slimming-chart', chartOptions)
        let _chartData = this.pageData.tends.reverse().map(item => {
          return {
            y: levelArray[getLevelByScore(item.score) - 1].level - 0.5,
            text: levelArray[getLevelByScore(item.score) - 1].text,
            name: (new Date(item.sampleDate).getMonth() + 1) + '月' + new Date(item.sampleDate).getDate()
          }
        })
        if (_chartData.length > 5) {
          this.detailChart.series[1].setData(_chartData.slice(-5))
        } else {
          this.detailChart.series[1].setData(_chartData)
        }
        let that = this
        setTimeout(function () {
          let _chtData = that.detailChart.series[1].data
          that.detailChart.tooltip.refresh(_chtData[_chtData.length - 1])
        }, 800)
      },
      displayChart (y) {
        if (this.detailChart) return
        let _dtlChart = document.getElementById('slimming-chart')
        if (_dtlChart) {
          let offTop = _dtlChart.offsetTop
          let cHeight = document.body.clientHeight
          let viewY = offTop - cHeight
          if (Math.abs(y) > viewY) {
            this.initChart()
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  $fontColor: #7A7D80;

  .detail {
    position: absolute;
    .card-desc {
      font-size: .28rem;
      color: $fontColor;
    }
    .card-text {
      margin-top: .2rem;
      font-size: .24rem;
      color: $fontColor;
    }
    .desc {
      .card-content {
        padding: .1rem .3rem .4rem;
      }
    }
    .content {
      position: relative;
      .power-flag {
        display: flex;
        width: .46rem;
        height: .46rem;
        position: absolute;
        top: 0;
        right: .3rem;
        z-index: 1;
        & > span {
          font-size: .38rem;
          line-height: .38rem;
        }
        & > span:first-child {
          width: .14rem;
        }
      }
      .level-progress {
        width: 6.3rem;
        margin: .5rem 0 .26rem 0;
      }
      .desc {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin: .8rem 0 0;
        & > span {
          font-size: .28rem;
          color: $fontColor;
          line-height: .4rem;
        }
      }
    }
    // .chart {
    //   background: #2DD6D6;
    //   border-radius: .08rem;
    //   margin: .2rem 0;
    //   .chart-title {
    //     font-size: .28rem;
    //     color: #FFFFFF;
    //     line-height: .28rem;
    //     padding: .3rem;
    //   }
    // }
  }
</style>
