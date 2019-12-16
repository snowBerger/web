<template>
  <div id="slimming-report" class="report-pager">
    <div class="report-main" v-if="!emptyReportData">
      <slimming-top class-name="top" :img="currentPersonInfo.img" :text="reportDesc" :top-img="topImg"></slimming-top>
      <card class-name="tags" icon="icon-icon-biaoqiantezhic" title="标签特质" :self-content="true" v-if="pageData.tagList.length">
        <ul class="tags-list">
          <li v-for="(item, index) in pageData.tagList">
            <router-link :to="{ name: 'slimmingDetail', params: { id: item.id } }" tag="div" class="li-content">
              <tag-item :item="item"></tag-item>
            </router-link>
          </li>
        </ul>
      </card>
      <card class-name="percent-self" icon="icon-icon-yinshisherubili" title="我目前的饮食摄入比例" v-if="pageData.pieData.length">
        <span class="iconfont icon-info" slot="tips" title="根据饮食记录的数据计算得出" v-tippy="{ trigger: 'click' }"></span>
        <div class="percent-title">
          <span>碳:脂:蛋 </span>
          <span v-text="pageData.intakeRatio"></span>
        </div>
        <pie-chart :pieColors="pieColors" :pieData="pageData.pieData"></pie-chart>
      </card>
      <card class-name="percent-standard" title="我的最佳饮食摄入比例" v-if="pageData.pieData2.length">
        <span class="iconfont icon-info" slot="tips" title="根据基因检测的结果分析得出" v-tippy="{ trigger: 'click' }"></span>
        <div class="percent-title">
          <span>碳:脂:蛋 </span>
          <span v-text="pageData.geneRatio"></span>
        </div>
        <pie-chart :pieColors="pieColors2" :pieData="pageData.pieData2"></pie-chart>
      </card>
      <div class="tips slimming-card" v-if="pageData.food">
        <div class="card-title"><span>小贴士</span></div>
        <div class="food-list">
          <div class="list-top">
            <div class="list-title">
              <span class="iconfont icon-icon-shiwuqingdanco"></span>
              <span>食物清单</span>
            </div>
            <div class="list-desc" v-text="pageData.tips"></div>
          </div>
          <ul class="list-content">
            <li v-if="pageData.food.vegetablesList">
              <div class="li-type">蔬菜：</div>
              <ul class="li-list">
                <li v-for="item in pageData.food.vegetablesList" :title="getFoodById(item).text" v-tippy="{ trigger: 'click' }"><food-item :food="getFoodById(item)"></food-item></li>
              </ul>
            </li>
            <li v-if="pageData.food.fruitList">
              <div class="li-type">水果：</div>
              <ul class="li-list">
                <li v-for="item in pageData.food.fruitList" :title="getFoodById(item).text" v-tippy="{ trigger: 'click' }"><food-item :food="getFoodById(item)"></food-item></li>
              </ul>
            </li>
            <li v-if="pageData.food.meatList">
              <div class="li-type">肉类：</div>
              <ul class="li-list">
                <li v-for="item in pageData.food.meatList" :title="getFoodById(item).text" v-tippy="{ trigger: 'click' }"><food-item :food="getFoodById(item)"></food-item></li>
              </ul>
            </li>
            <li v-if="pageData.food.otherList">
              <div class="li-type">其他：</div>
              <ul class="li-list">
                <li v-for="item in pageData.food.otherList" :title="getFoodById(item).text" v-tippy="{ trigger: 'click' }"><food-item :food="getFoodById(item)"></food-item></li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="advice">
          <div class="list-top">
            <div class="list-title">
              <span class="iconfont icon-icon-caiputuijianco"></span>
              <span>菜谱推荐</span>
            </div>
            <div class="list-desc">基于你的情况，为你推荐以下菜式，不仅好吃还能让你瘦下来。</div>
          </div>
          <div class="list-content" v-if="pageData.dishList.length">
            <div class="advice-contain">
              <div class="title">菜谱推荐</div>
              <div class="split">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div class="dish-list">
                <swiper auto height="3.8rem" dots-position="center" dots-class="dots-class">
                  <swiper-item v-for="(dishes, index) in pageData.dishList" :key="index">
                    <ul class="dishes">
                      <li v-for="dish in dishes"><span v-text="dish"></span></li>
                    </ul>
                  </swiper-item>
                </swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="help slimming-card" v-if="pageData.food">
        <div class="card-title"><span>减肥秘籍</span></div>
        <div>
          <p v-text="help"></p>
          <p style="margin-top: .2rem;">控制碳水、保持运动、良好睡眠，是科学减肥的三大诀窍！</p>
        </div>
      </div>
      <!--<div class="report-flag" @click="goToSurvey">
        <span class="iconfont icon-add"></span>
      </div>-->
    </div>
    <div class="report-update" v-if="emptyReportData">
      <div class="update-top">
        <div class="update-wait"></div>
        <div class="light"></div>
      </div>
      <div class="update-desc">报告正在生成中，请稍后</div>
    </div>
    <router-view></router-view>
    <loading></loading>
  </div>
</template>

<script>
  import pageMix from '../../mixins/page'
  import SlimmingTop from './SlimmingTop'
  import Card from './Card'
  import TagItem from './TagItem'
  import PieChart from './PieChart'
  import FoodItem from './FoodItem'
  import Loading from '../../components/Loading'
  import { Swiper, SwiperItem } from 'vux'
  import { getSlimmingData } from '../../service/service'
  import { reportQuery, foodList, getLevelByScore } from './common'
  import { mapMutations } from 'vuex'
  import { CHANGE_CURRENT_PERSON_ID } from '../../store/mutation-types'

  export default {
    mixins: [ pageMix ],
    data () {
      return {
        topImg: require('./images/slimming-top.png'),
        reportDesc: '我们的身材与脂肪、蛋白质、碳水化合物摄入比例密切相关，每个人的最佳摄入比例并不相同。我们通过基因及代谢检测，让你知晓三大营养素的摄入状况及最佳比例，让你吃着也能瘦下来。',
        pieColors: ['#BEC7D2', '#ABB5C2', '#E0E8F0'],
        pieColors2: ['#29C9B9', '#18A8A8', '#50E3E2'],
        help: '科学减肥，既要控制卡路里摄入，也要优化进食的营养比例。以碳水化合物为主的饮食习惯，不但会大大增加卡路里摄入，还会带来血糖的剧烈波动，造成胰岛素敏感性下降等健康问题。因此，越来越多人开始尝试低碳水饮食、低GI（血糖指数）饮食，甚至生酮饮食（高脂肪比、低碳水比饮食）。',
        dotsClass: '',
        emptyReportData: false,
        pageData: {
          tagList: [],
          pieData: [],
          pieData2: [],
          dishList: [],
          food: null
        }
      }
    },
    components: { SlimmingTop, Card, TagItem, PieChart, FoodItem, Swiper, SwiperItem, Loading },
    beforeRouteLeave (to, from, next) {
      let _child = document.querySelector('.tippy-popper')
      _child && document.body.removeChild(_child)
      next()
    },
    methods: {
      async startLoadingPage () {
        const response = await getSlimmingData(this.currentPersonId || this.currentPersonId, reportQuery.productPlan, reportQuery.reportType)
        if (this.isApiResponseOk(response)) {
          this.initPageData(response.data)
          let _reportElem = document.getElementById('slimming-report')
          let _slef = this
          _reportElem.addEventListener('touchmove', function (e) {
            _slef.tipsHidden()
          })
        }
        this.loadingSuccess()
      },
      initPageData (data) {
        if (data.items.length <= 0) {
          this.emptyReportData = true
          return
        }
        this.pageData = Object.assign(this.pageData, { food: data.food, geneRatio: data.geneRatio, intakeRatio: data.intakeRatio, tips: data.tips })
        data.items && data.items.forEach((item, index) => {
          switch (item.id) {
            case 'O226':
              this.pageData.tagList.push({
                id: item.id,
                name: '脂肪',
                score: item.score,
                level: getLevelByScore(item.score)
              })
              break
            case 'O227':
              this.pageData.tagList.push({
                id: item.id,
                name: '碳水化合物',
                score: item.score,
                level: getLevelByScore(item.score)
              })
              break
            case 'O228':
              this.pageData.tagList.push({
                id: item.id,
                name: '蛋白质',
                score: item.score,
                level: getLevelByScore(item.score)
              })
              break
            case 'O220':
              this.pageData.pieData2.push({
                id: item.id,
                name: '脂肪',
                value: item.score
              })
              break
            case 'O221':
              this.pageData.pieData2.push({
                id: item.id,
                name: '碳水化合物',
                value: item.score
              })
              break
            case 'O222':
              this.pageData.pieData2.push({
                id: item.id,
                name: '蛋白质',
                value: item.score
              })
              break
            case 'O223':
              this.pageData.pieData.push({
                id: item.id,
                name: '脂肪',
                value: item.score
              })
              break
            case 'O224':
              this.pageData.pieData.push({
                id: item.id,
                name: '碳水化合物',
                value: item.score
              })
              break
            case 'O225':
              this.pageData.pieData.push({
                id: item.id,
                name: '蛋白质',
                value: item.score
              })
              break
          }
        })
        data.food && data.food.dishesList && data.food.dishesList.forEach((item, index) => {
          let _index = Math.floor(index / 4)
          this.pageData.dishList[_index] = this.pageData.dishList[_index] || []
          this.pageData.dishList[_index].push(item)
        })
      },
      getFoodById (id) {
        if (!id) return {}
        let _tmpArr = foodList.find(item => item.id === id)
        return _tmpArr || {}
      },
      tipsHidden () {
        let _tipsElem = document.querySelectorAll('.tippy-popper')
        for (let i = 0, l = _tipsElem.length; i < l; i++) {
          if (_tipsElem[i]) {
            _tipsElem[i].style.visibility = 'hidden'
          }
        }
      },
      goToSurvey () {
        window.location.replace('https://main.icarbonx.com/survey/257?personId=' + this.currentPersonId + '&cb=' + encodeURIComponent(window.location.href))
      },
      ...mapMutations({
        CHANGE_CURRENT_PERSON_ID
      })
    }
  }
</script>

<style lang="scss">
  $fontColor: #7A7D80;
  $fontColor2: #34353B;

  #slimming-report {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .report-main {
      .top {
        margin: .3rem 0 .2rem;
      }
      .tags {
        background: #E6EBF0;
      }
      .percent-self {
        margin-bottom: .02rem;
        border-radius: .08rem .08rem 0 0;
      }
      .percent-standard {
        margin-top: .02rem;
        border-radius: 0 0 .08rem .08rem;
        & > div:first-child {
          padding-left: .4rem;
        }
      }
      .percent-self,
      .percent-standard {
        & > div:first-child {
          padding: .1rem 0;
        }
        .iconfont {
          padding: .2rem;
          color: #239FAB;
        }
        .percent-title {
          padding-top: .3rem;
          text-align: center;
          & > span {
            font-size: .32rem;
            color: $fontColor;
            line-height: .32rem;
          }
          & > span:last-child {
            color: #161700;
            letter-spacing: .1rem;
            margin-left: .1rem;
          }
        }
        .card-content {
          padding: 0;
        }
      }
      .slimming-card {
        border-radius: .08rem;
        margin: .2rem 0;
        overflow: hidden;
        & > .card-title {
          padding: .34rem 0;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          background: #fff;
          &:before,
          &:after {
            content: '';
            width: .8rem;
            height: .03rem;
            background: rgba(#8FA8AD, .5);
          }
          & > span {
            margin: 0 .2rem;
            font-size: .32rem;
            color: $fontColor2;
            line-height: .32rem;
          }
        }
      }
      .tips {
        .food-list,
        .advice {
          background: #E6EBF0;
          .list-top {
            padding: 0 .2rem;
            background: #fff;
            .list-title {
              display: flex;
              align-items: center;
              padding: .1rem 0 .45rem;
              background: #fff;
              & > span {
                font-size: .3rem;
                line-height: .3rem;
                color: $fontColor2;
              }
              & > span:first-child {
                font-size: .4rem;
                line-height: .4rem;
                color: #00BADB;
                margin-right: .1rem;
              }
            }
            .list-desc {
              padding: 0 .1rem .2rem .5rem;
              font-size: .28rem;
              color: $fontColor;
              line-height: .4rem;
            }
          }
          .list-content {
            & > li {
              background: #fff;
              padding: .3rem .05rem 0;
              margin-bottom: .02rem;
              & > .li-type {
                margin-left: .25rem;
                line-height: .28rem;
              }
              & > .li-list {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                align-items: center;
                & > li {
                  margin: .3rem .25rem .4rem;
                }
              }
            }
          }
        }
        .advice {
          padding-bottom: .4rem;
          background: #fff;
          .list-top {
            padding-top: .3rem;
          }
          .list-content {
            width: 5.3rem;
            height: 6.5rem;
            background: #E6EBF0;
            margin: .4rem auto 0;
            display: flex;
            align-items: center;
            justify-content: center;
            .advice-contain {
              width: 4.8rem;
              height: 5.9rem;
              background: #F6F6F6;
              .title {
                width: 2.5rem;
                height: .5rem;
                margin: .5rem auto .47rem;
                text-align: center;
                line-height: .5rem;
                font-size: .28rem;
                color: #fff;
                background: url(./images/icon-dish-title.png) 0 0 no-repeat;
                background-size: 100% 100%;
              }
              .split {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                & > span:first-child,
                & > span:last-child {
                  width: 1.38rem;
                  height: 0;
                  border: .02rem dashed #80A6AC;
                }
                & > span:nth-child(2) {
                  width: 1rem;
                  height: .5rem;
                  background: url(./images/icon-dish.png) 0 0 no-repeat;
                  background-size: 100% 100%;
                }
              }
              .dish-list {
                width: 2.7rem;
                margin: 0 auto;
                .vux-slider {
                  .dishes {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    & > li {
                      width: 100%;
                      margin: .15rem 0;
                      display: flex;
                      flex-direction: row;
                      align-items: center;
                      justify-content: space-between;
                      font-size: .28rem;
                      color: $fontColor2;
                      letter-spacing: .07rem;
                    }
                    & > li::before,
                    & > li::after {
                      content: '';
                      width: .3rem;
                      height: 0;
                      border-bottom: .03rem solid rgba(#8FA8AD, .5);
                    }
                  }
                  .dots-class {
                    & > a > i {
                      width: .16rem;
                      height: .16rem;
                      border-radius: 50%;
                      background-color: #D8D8D8 !important;
                    }
                    & > a > i.active {
                      background-color: #8FA8AD !important;
                    }
                  }
                }
              }
            }
          }
        }
      }
      .help {
        background: #fff;
        & > div:last-child {
          padding: 0 .3rem .4rem;
          p {
            font-size: .28rem;
            color: $fontColor;
            line-height: .4rem;
          }
        }
      }
      .report-flag {
        position: fixed;
        right: .3rem;
        bottom: .3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
        background: #1C1C1F;
        z-index: 1;
        & > span {
          font-size: .5rem;
          color: #fff;
          z-index: 1;
        }
      }
      .report-flag:after {
        content: '';
        display: inline-block;
        width: .6rem;
        height: .6rem;
        background: #1C1C1F;
        border-radius: 50%;
        position: absolute;
        bottom: 0;
        right: .3rem;
        -webkit-filter: blur(.1rem);
        -moz-filter: blur(.1rem);
        -ms-filter: blur(.1rem);
        filter: blur(.1rem);
      }
    }
    .report-update {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: .4rem .5rem;
      margin-top: 1.8rem;
      .update-top {
        width: 3rem;
        height: 3rem;
        margin-top: 1.4rem;
        background: rgba(#FF4B61, .14);
        .update-img,
        .update-wait {
          width: 3rem;
          height: 3rem;
          position: absolute;
          z-index: 1;
        }
        .update-wait {
          background: url(../../assets/images/report-update-wait.png) 0 0 no-repeat;
          background-size: 100% 100%;
        }
        .light {
          position: absolute;
          width: 6.51rem;
          height: 3.47rem;
          background: url(../../assets/images/report-update-light.png) 0 0 no-repeat;
          background-size: 100% 100%;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
        }
      }
      .update-desc {
        width: 6.3rem;
        margin-top: .47rem;
        text-align: center;
        font-size: .32rem;
        font-weight: 600;
        color: #34353B;
        line-height: .52rem;
      }
    }
  }
</style>
