<template>
  <div class="vartical-bar">
    <div v-if="barChartData.dataList.length">
      <div class="top">
        <span class="top-desc">运动项目</span>
        <span class="top-icon">
        <span class="cal" v-if="barChartData.unit == 'cal'"></span>
        <span class="time" v-if="barChartData.unit == 'h'"></span>
        <span>{{barChartData.varticalBarTitle}}</span>
      </span>
      </div>
      <div class="vartical-wrap" >
        <div class="item" v-for="item in barChartData.dataList" v-if="item.value && item.key !== '15'">
          <div class="item-title">{{item.key}}</div>
          <div class="item-bar-box">
            <div class="item-bar">
              <span :style="{'width': item.progress + '%', 'background': barChartData.bgColor}"></span>
            </div>
            <span class="calorie" :style="{'color': barChartData.bgColor}" v-if="barChartData.unit == 'h'">
            {{Math.floor(item.value / 60) + 'h ' + item.value % 60 + '′'}}
          </span>
            <span class="calorie" :style="{'color': barChartData.bgColor}" v-if="barChartData.unit == 'cal'">
            {{item.value}}
          </span>
          </div>
        </div>
      </div>
    </div>
    <div class="no-records" v-else>你还没有相关数据</div>
  </div>
</template>

<script>
  export default{
    data () {
      return {}
    },
    props: {
      barChartData: {
        type: [Object, String],
        default: ''
      }
    },
    updated () {
      this.initComponent()
    },
    methods: {
      initComponent () {
        if (this.barChartData) {
          this.barChartData.dataList.forEach((item, index) => {
            let _self = this
            _self.$set(item, 'progress', _self.getProgress(item.value))
            if (_self.barChartData.chartType == 'sports') {
              if (item.key == '01') {
                item.key = '散步'
              } else if (item.key == '02') {
                item.key = '跑步'
              } else if (item.key == '03') {
                item.key = '骑行'
              } else if (item.key == '04') {
                item.key = '游泳'
              } else if (item.key == '05') {
                item.key = '瑜伽'
              } else if (item.key == '06') {
                item.key = '羽毛球'
              } else if (item.key == '07') {
                item.key = '篮球'
              } else if (item.key == '08') {
                item.key = '足球'
              } else if (item.key == '09') {
                item.key = '打高尔夫'
              } else if (item.key == '10') {
                item.key = '无器械'
              } else if (item.key == '11') {
                item.key = '小器械'
              } else if (item.key == '12') {
                item.key = '力量训练'
              } else if (item.key == '13') {
                item.key = '有氧训练'
              } else if (item.key == '14') {
                item.key = '普拉提'
              }
            }
          })
        }
      },
      getProgress (val) {
        let _val = val
        if (this.barChartData.unit == 'h') {
          _val = Math.floor((val / 60) * 100) / 100
        }
        const p = Math.ceil((_val / this.barChartData.fullMark) * 100)
        return p > 100 ? 100 : p
      }
    }
  }
</script>

<style lang="scss" scoped>
  .vartical-bar{
    background: #fff;
    border-bottom-right-radius:.12em;
    border-bottom-left-radius:.12em;
    .no-records {
      height: 5rem;
      text-align: center;
      line-height: 4rem;
      font-size: .28rem;
      color: rgba(#7E7E7E, .64);
    }
    .top{
      height: .8rem;
      line-height:.8rem;
      text-align: left;
      font-size: .28rem;
      color: #34353B;
      background: #fff;
      padding: 0 .3rem;
      display: flex;
      justify-content: space-between;
      margin-top: .5rem;
      .top-desc{
        color: #7A7D80;
      }
      .top-icon{
        color: #7A7D80;
        display: flex;
        flex-direction: row;
        align-items: center;
        & > span {
          margin-left: .05rem;
          font-size: .24rem;
        }
        .cal{
          width:.24rem;
          height:.24rem;
          background: url("../../assets/images/icon-cal.png") no-repeat;
          background-size: 100% 100%;
        }
        .time{
          display: inline-block;
          width:.24rem;
          height:.24rem;
          background: url("../../assets/images/icon-time.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .vartical-wrap{
      padding:.1rem .3rem .46rem;
      .item{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: .22rem;
        .item-title{
          max-width:2rem;
          font-size:.28rem;
          text-align: left;
          color: #34353B;
        }
        .item-bar-box{
          width: 4.8rem;
          height:.12rem;
          margin-left: .3rem;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          .item-bar{
            width: 4rem;
            height: .12rem;
            & > span {
              display: block;
              height: 100%;
              background: #00BADB;
              border-radius: .15rem;
              animation: reverse progress-bar-stripes 0.4s linear infinite, widthAnimation 0.5s;
            }
          }
          .calorie{
            min-width:.8rem;
            text-align: right;
            font-size: .22rem;
            color: #00BADB;
          }
        }
        @keyframes widthAnimation{
          0% { width: 0; }
        }
      }
    }
  }
</style>
