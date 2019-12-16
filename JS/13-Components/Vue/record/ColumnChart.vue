<template>
  <div class="columnar-chart">
    <div class="title">
      <span class="title-desc">{{columnChartData.title}}</span>
      <span class="title-time">{{columnChartData.titleValue}}</span>
    </div>
    <div class="table-wrap">
      <div class="table-left">
        <span v-for="(item, index) in columnChartData.yAxisList" :style="{top: index === 1 ? columnChartData.acrossPosition - 3 + '%' : ''}">{{item}}</span>
      </div>
      <div class="table-content">
        <div class="across-line r1b" :style="{top: columnChartData.acrossPosition + '%'}"></div>
        <div class="table-line-box" v-for="(item, index) in columnChartData.xAxisList" >
          <div class="table-line" >
            <div class="line-bold" ref="lineBold" :style="{'height': Math.round(item.value / columnChartData.fullMark * 100) + '%', 'background': index % 2 === 0 ? columnChartData.bgcolor : columnChartData.bgColor2}"></div>
          </div>
          <div class="date">{{+item.key === today ? '今天' : item.key}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default{
    data () {
      return {
        today: new Date().getDate()
      }
    },
    props: {
      columnChartData: {
        type: Object,
        default: () => {}
      }
    },
    mounted () {}
  }
</script>

<style lang="scss" scoped>
  .columnar-chart{
    background: #02163D;
    padding: 0 .4rem .4rem;
    .title{
      font-size: .24rem;
      text-align: center;
      padding: .28rem 0;
      & > span{
        color: #FFFFFF;
      }
      .title-time{
        color: #00BADB;
      }
    }
    .table-wrap{
      height:3.4rem;
      display: flex;
      flex-direction: row;
      justify-content: center;
      .table-left{
        position: relative;
        height: 2.8rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        & > span {
          color: #ffffff;
          font-size: .22rem;
          line-height: .26rem;
        }
        & > span:nth-child(2) {
          position: absolute;
        }
      }
      .table-content{
        width: 4.9rem;
        height:2.8rem;
        padding: 0 .4rem;
        margin-left: .2rem;
        position: relative;
        display: flex;
        justify-content: space-between;
        flex:1;
        .across-line{
          position: absolute;
          width: 100%;
          border: 1px dashed #FFFFFF;
          opacity: 0.5;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1;
        }
        .table-line-box{
          position: relative;
          .date{
            position: relative;
            transform:translate(-50%,.2rem);
            color: #ffffff;
          }
          .table-line{
            height:2.8rem;
            width:.02rem;
            background: rgba(255, 255, 255, .2);
            border-radius: .12rem;
            position: relative;
            .line-bold{
              height:1rem;
              width:.12rem;
              background: #00BADB;
              border-radius: .12rem;
              position: absolute;
              left:-0.05rem;
              bottom:0;
              animation: reverse progress-bar-stripes 0.40s linear infinite, heightAnimation 0.5s;
            }
            @keyframes heightAnimation{
              0% { height: 0; }
            }
          }
        }
      }
    }
  }
</style>
