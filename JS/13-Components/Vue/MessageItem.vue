<template>
  <div class="clearfix" v-if="id && id !== ''">
    <div class="message" :class="{'me': isSend, 'you': !isSend, 'disabled': !isMsgCanOperate}">
      <div class="ms-time ms-tips" v-if="type == CONST.INT_MSGTYPE_TIPS"><div class="time-cont">{{ content }}</div></div>
      <div class="ms-time" v-if="isShowTimer && type !== CONST.INT_MSGTYPE_TIPS"><div class="time-cont">{{ msgTime }}</div></div>
      <div class="avatar" v-if="type !== CONST.INT_MSGTYPE_TIPS"><img :src="avatar" :alt="!isSend ? '觅我': '我'" :title="!isSend ? '觅我': '我'"/></div>
      <div class="ms-content" ref="message" v-if="type !== CONST.INT_MSGTYPE_TIPS"">
        <div class="ms-bubble" :class="{'bubble-default left': !isSend, 'bubble-primary right': isSend}">
          <div class="bubble-cont" v-if="type == CONST.INT_MSGTYPE_TEXT">
            <div class="plain">
              <pre class="msg-plain">{{ content }}</pre>
              <span class="msg-img msg-senting" v-if="status === CONST.INT_MSG_STATUS_SENDING"></span>
              <i class="iconfont icon-tanhao" v-if="status === CONST.INT_MSG_STATUS_ERROR"></i>
            </div>
          </div>
          <div class="bubble-cont" v-if="type == CONST.INT_MSGTYPE_IMAGE">
            <div class="picture">
              <img :src="msgImg"/>
            </div>
          </div>
          <div class="bubble-cont" v-if="type == CONST.INT_MSGTYPE_VOICE">
            <div class="voice" ref="voice" @click="voiceClick(id)">
              <i class="iconfont icon-voice" :class="{playing : content.playing}" v-if="content.playing"></i>
              <i class="iconfont icon-voice voice-static" v-if="!content.playing"></i>
              <span class="duration">{{content.length | formatlength }}''</span>
              <span class="msg-img msg-senting" v-if="status === CONST.INT_MSG_STATUS_SENDING"></span>
              <i class="iconfont icon-tanhao" v-if="status === CONST.INT_MSG_STATUS_ERROR"></i>
            </div>
          </div>
          <div class="bubble-cont dark" v-if="type == CONST.INT_MSGTYPE_FOOD_CONFIRM">
            <div class="plain check">
              <pre class="msg-plain">主人，这顿饭是你的：</pre>
            </div>
            <ul class="check-list">
              <li v-if="content.meal == null || check.value === content.meal" v-for="check in mealCheckItems" @click="confirmMeal(check.value)"
                  :class="{'checked': content.meal && check.value === content.meal}">{{ check.name }}</li>
            </ul>
          </div>
          <div class="bubble-cont" v-if="type == CONST.INT_MSGTYPE_LINK">
            <div class="survey">
              <h3>{{ content.title }}</h3>
              <router-link :to="content.link" class="survey-detail">
                <img :src="content.image"/>
                <span>{{ content.brief }}</span>
              </router-link>
            </div>
          </div>
          <div class="bubble-cont" v-if="type == CONST.INT_MSGTYPE_FOOD_RECORD">
            <div class="mix">
              <div class="top-box">
                <h2 class="b-title r1b">营养列表</h2>
                <div class="b-bd" @click="showAllDietLists()">
                  <radial-progress-bar :key="nutrition.id" :startColor="mixCircleColor" :stopColor="mixCircleColor" v-for="nutrition in getNutritionItems"
                                       v-if="nutrition.name === 'calorieContent'"
                                       :strokeWidth="mixCircleWidth" :innerStrokeColor="mixInnerStrokeColor"
                                       :diameter="mixDiameter" :animateSpeed="amineTimer" class="left-circle"
                                       :completed-steps="calorie.currentCalorie"
                                       :total-steps="calorie.totalCalorie">
                    <p>{{ parseInt(animeCurrentCalorie) }}</p>
                    <p>{{ nutrition.unit }}</p>
                  </radial-progress-bar>
                  <ul class="nutrition-list" ref="nutritionList">
                    <li v-for="(nutrition, index) in getFilterNutritionItems" :key="nutrition.name"
                        v-if="getFilterNutritionItems && nutrition.name !== 'calorieContent'">
                      <span class="n-name">{{nutrition.desc}}</span>
                      <progress-bar :time="amineTimer" :progress="getProgress(nutrition)" class="n-progress"></progress-bar>
                    </li>
                  </ul>
                  <i class="iconfont icon-direction-right"></i>
                  <div>
                    <x-dialog v-model="showNutritionList" class="">
                      <div class="bubble-cont" v-if="type == CONST.INT_MSGTYPE_FOOD_RECORD">
                        <div class="mix">
                          <div class="top-box">
                            <h2 class="b-title r1b">我的今日营养清单</h2>
                            <div class="b-titleme">
                              <span class="n-name special-left">摄入营养素</span>
                              <span class="n-name special-right">占推荐摄入比例</span>
                            </div>
                            <div class="b-bd">
                              <ul class="nutrition-list" ref="nutritionList">
                                <li v-for="(nutrition, index) in getNutritionItems" :key="nutrition.name"
                                    v-if="getNutritionItems && nutrition.name !== 'calorieContent'">
                                  <span class="n-name">{{nutrition.desc}}</span>
                                  <progress-bar :time="amineTimer" :progress="getProgress(nutrition)" class="n-progress"></progress-bar>
                                  <span class="n-name left">{{getProgressToFixed(nutrition)}}%</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div @click=" showNutritionList=false">
                        <span class="vux-close"> <i class="iconfont icon-remove"></i></span>
                      </div>
                    </x-dialog>
                  </div>
                </div>
              </div>
              <div class="bottom-food">
                <ul>
                  <li v-for="(food, index) in content.items" :key="index">
                    <div class="f-name r1b ellipsis" @click="showDietPicker(food.uuid, index, food.name, $event)">{{food.name}}</div>
                    <div class="f-b">
                      <span class="f-w" @click="showWeightPicker(food.uuid, index, food.weight, $event)">{{food.weight}}</span>
                      <span class="f-u">克</span>
                      <span class="iconfont icon-delete" v-if="isMsgCanOperate" @click="deleteFood(food.uuid, index)"></span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import * as msg from '../icx/const'
  import RadialProgressBar from 'vue-radial-progress'
  import { mapMutations } from 'vuex'
  import { XDialog, Scroller } from 'vux'
  import ProgressBar from './ProgressBar'
  import anime from 'animejs'
  import { DateUtils } from '../icx/utils'
  import { SET_DIET_PICKER_DATA, DELETE_DIET_FOOD, SET_WEIGHT_PICKER_DATA, PLAY_VOICE, SET_CONFIRM_MEAL_DATA } from '../store/mutation-types'

  export default{
    data () {
      return {
        showNutritionList: false,
        mixCircleWidth: 4,
        mixInnerStrokeColor: 'white',
        // mixInnerStrokeColor: '#ffde00',
        mixCircleColor: '#fa5a14',
        mixDiameter: 60,
        CONST: msg,
        scroller: null,
        amineTimer: 1500,
        animeCurrentCalorie: 0,
        mealCheckItems: [
          {
            name: '早餐',
            value: 'Breakfast'
          },
          {
            name: '中餐',
            value: 'Lunch'
          },
          {
            name: '晚餐',
            value: 'Dinner'
          },
          {
            name: '加餐',
            value: 'Snack'
          }
        ]
      }
    },
    props: {
      id: '',
      type: {
        type: [Number, String],
        default: ''
      },
      avatar: {
        type: [String],
        default: '/static/default_share.png'
      },
      isMsgCanOperate: {
        type: [Boolean, Function],
        default: false
      },
      sender: {
        type: [String],
        default: msg.SENDER_MEUM
      },
      status: {
        type: [Number, String],
        default: msg.INT_MSG_STATUS_OK
      },
      timestamp: {
        type: [Number, String, Object],
        default: new Date().getTime()
      },
      isShowTimer: {
        type: [Boolean],
        default: true
      },
      content: {
        type: [String, Object]
      }
    },
    methods: {
      ...mapMutations([
        SET_DIET_PICKER_DATA, DELETE_DIET_FOOD, SET_WEIGHT_PICKER_DATA, PLAY_VOICE, SET_CONFIRM_MEAL_DATA
      ]),
      showAllDietLists () {
        // this.showNutritionList = true
        this.$emit('showAllDietLists', this.getNutritionItems)
        // console.log(this.getNutritionItems)
      },
      voiceClick (id) {
        this.PLAY_VOICE(id)
        this.$emit('voiceClick')
      },
      getUnit (unit) {
        if (unit === 'g') {
          return '克'
        }
      },
      setVoiceWidth () {
        // 设置声音长度
        if (this.type === msg.INT_MSGTYPE_VOICE) {
          const length = (this.content.length / 1000).toFixed(1)
          const rate = length / 60
          const totalLength = this.$refs.message.clientWidth - 130
          this.$refs.voice.style.width = ((totalLength * (rate > 1 ? 1 : rate)) + 85) + 'px'
        }
      },
      deleteFood (uuid, foodIndex) {
        if (this.isMsgCanOperate) {
          this.DELETE_DIET_FOOD({messageId: this.id, recordId: this.content.recordId, itemId: uuid, foodIndex})
          this.$emit('deleteFood')
        }
      },
      showWeightPicker (uuid, foodIndex, weight, $event) {
        if (this.isMsgCanOperate) {
          this.SET_WEIGHT_PICKER_DATA({
            messageId: this.id,
            recordId: this.content.recordId,
            itemId: uuid,
            foodIndex,
            weight,
            event: $event
          })
          this.$emit('showWeightPicker')
        }
      },
      showDietPicker (uuid, foodIndex, foodName, $event) {
        if (this.isMsgCanOperate) {
          this.SET_DIET_PICKER_DATA({
            messageId: this.id,
            recordId: this.content.recordId,
            itemId: uuid,
            foodIndex,
            foodName,
            event: $event
          })
          this.$emit('showDietPicker')
        }
      },
      confirmMeal (value) {
        if (!this.content.confirmed) {
          this.SET_CONFIRM_MEAL_DATA({messageId: this.id, recordId: this.content.recordId, meal: value})
          this.$emit('confirmMeal')
        }
      },
      getProgress (nutrition) {
        const p = (nutrition.value / nutrition.reference) * 100
        return p > 100 ? 100 : p
      },
      getProgressToFixed (nutrition) {
        const p = (nutrition.value / nutrition.reference) * 100
        return p > 100 ? 100 : p.toFixed(2)
      },
      sortFun (item1, item2, which) {
        let names
        if (which) {
          names = ['carbohydrate', 'protein', 'FatContent', 'cholesterol', 'dietaryFiber', 'vitaminA', 'vitaminE', 'vitaminB1', 'vitaminB2', 'vitaminC', 'niacin', 'na', 'ca', 'fe']
        } else {
          names = ['carbohydrate', 'FatContent', 'protein', 'na']
        }
        let name1 = item1['name']
        let index1 = names.indexOf(name1)
        let name2 = item2['name']
        let index2 = names.indexOf(name2)
        return index1 - index2
      }
    },
    mounted () {
      this.setVoiceWidth()
      if (this.type === msg.INT_MSGTYPE_FOOD_RECORD) {
        this.animeCurrentCalorie = this.calorie.currentCalorie
      }
    },
    computed: {
      calorie () {
        let totalCalorie = null
        let currentCalorie = null
        if (this.getNutritionItems.length > 0) {
          this.getNutritionItems.forEach(function (item) {
            if (item.name === 'calorieContent') {
              currentCalorie = item.value
              totalCalorie = item.reference
              if (currentCalorie > totalCalorie) {
                totalCalorie = currentCalorie
              }
            }
          })
        } else {
          totalCalorie = 100
          currentCalorie = 100
        }

        return {
          totalCalorie,
          currentCalorie
        }
      },
      canOperate () {
        if (this.isMsgCanOperate instanceof Boolean) {
          return this.isMsgCanOperate
        } else if (typeof this.isMsgCanOperate === 'function') {
          return this.isMsgCanOperate()
        } else {
          return false
        }
      },
      isSend () {
        return this.sender !== msg.SENDER_MEUM
      },
      getPickerValue () {
        return this.$store.state.picker.value
      },
      getFilterNutritionItems () {
//        alert(JSON.stringify(this.content.nutrition))
        const _self = this
        let result = this.content.nutrition.filter(function (el) {
          if (el.name === 'calorieContent' || el.name === 'protein' || el.name === 'FatContent' || el.name === 'carbohydrate' || el.name === 'na') {
            return el
          }
        })
        return result.sort((item1, item2) => {
          return _self.sortFun(item1, item2)
        })
      },
      getNutritionItems () {
        const _self = this
        if (this.type === msg.INT_MSGTYPE_FOOD_RECORD) {
//          this.content.nutrition.sort(function (a, b) {
//            return b.value - a.value
//          })
          return this.content.nutrition.sort((item1, item2) => {
            return _self.sortFun(item1, item2, true)
          })
        }
        return []
      },
      msgTime () {
        return DateUtils.formatMessageDateToFriendly(new Date(this.timestamp))
      }
    },
    watch: {
      'calorie.currentCalorie': function (newVal, oldVal) {
        const animeObj = {
          to: oldVal
        }
        const _self = this
        anime({
          targets: animeObj,
          to: newVal,
          round: 20,
          duration: _self.amineTimer,
          easing: 'linear',
          update: function () {
            _self.animeCurrentCalorie = parseInt(animeObj.to).toFixed(0)
          }
        })
      }
    },
    components: {
      RadialProgressBar,
      ProgressBar,
      XDialog,
      Scroller
    },
    filters: {
      formatlength (value) {
        return Math.round(value / 1000)
      }
    }
  }
</script>
<style lang='scss'>
  @import "../assets/css/mixin";
  $fontColor:#3a3a3a;

  .clearfix:after {
    content: " ";
    visibility: hidden;
    display: block;
    height: 0;
    clear: both;
  }
  svg {
    circle:last-child {
      stroke: rgba(254,166,106,1) !important;
    }
  }
  .message{
    color: $fontColor;
    width: 100%;
    margin-bottom: getRem(15);
    margin-top: getRem(15);
    float: left;
    overflow: hidden;
    .msg-img{
      background: url('../assets/images/msg-all.png');
    }
    &.disabled{
      .check-list{
        li{
        }
      }
      .bottom-food{
        li{
          background: #dfdfdf !important;
        }
      }
    }
    &.me {
      float: right;
      text-align: right;
      clear: right;
      .avatar {
        float: right;
      }
      .bubble-cont{
        .voice{
          flex-direction: row-reverse;
          .icon-yuyin1{
            color: #fff;
            transform: rotate(180deg);
          }
          .icon-voice{
            float: right;
            &.playing{
              background: url("../assets/images/voice-play-me.gif") no-repeat center center/ cover;
            }
          }
        }
        .icon-tanhao{
          left: 0;
          right: auto;
          transform: translate(-100%, -50%);
          margin-right: 0;
          margin-left: getRem(-20);
        }
        .msg-senting{
          left: getRem(30);
          right: auto;
        }
      }
      .voice{
        .duration{
          color: #fff;
        }
      }
      .ms-time{
        .time-cont{
          overflow: hidden;
        }
      }
    }
    .ms-time {
      text-align: center;
      margin: getRem(20) auto;
      max-width: 50%;
      .time-cont{
        display: inline-block;
        font-size: 12px;
        padding: getRem(2) getRem(24);
        color: #fff;
        background: #CCCCCC;
        border-radius: 10px;
        overflow: hidden;
      }
      &.ms-tips{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        max-width: unset;
        &:before, &:after{
          content: ' ';
          background: #CCCCCC;
          width: getRem(100);
          margin: getRem(10);
          height: getRem(2);
        }
      }
    }
    .avatar {
      width: getRem(60);
      height: getRem(60);
      border-radius: 50%;
      float: left;
      background: #fff;
      overflow: hidden;
      cursor: pointer;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .ms-content {
      overflow: hidden;
    }
    .ms-bubble {
      min-height: 1em;
      display: inline-block;
      vertical-align: top;
      position: relative;
      text-align: left;
      font-size: getRem(24);
      border-radius: getRem(20);
      margin: 0 10px;
      &.bubble-default {
        background-color: #fff;
      }
      &.bubble-primary {
        background-color: #00BADB;
        &.right{
          width:getRem(160);
        }
      }
    }
    .bubble-cont {
      word-wrap: break-word;
      word-break: break-all;
      min-height: getRem(25);
      .msg-senting{
        background-position: getRem(-270) getRem(-0);
        background-size: getRem(362) auto;
        width: getRem(44);
        height: getRem(44);
        position: absolute;
        right: getRem(30);
        animation: msgSentAnimation 2.5s linear infinite;
      }
      @keyframes msgSentAnimation {
        from {-webkit-transform: rotate(0deg);}
        to {-webkit-transform: rotate(360deg);}
      }
      .icon-tanhao{
        position: absolute;
        margin-right: getRem(-20);
        right: 0;
        top: 50%;
        line-height: getRem(44);
        transform: translate(100%, -50%);
        font-size: getRem(44);
        color: #F33F40;
      }
      &.dark{
        background: #E6EBF0;
      }
      .plain {
        max-width: getRem(490);
        padding: getRem(20) getRem(20);
        min-width: getRem(70);
        pre {
          margin: 0;
          font-size: getRem(30);
          font-family: inherit;
          white-space: pre-wrap;
          word-break: normal;
        }
      }
      .voice {
        max-width: 100%;
        padding: getRem(22) getRem(20) getRem(22) getRem(40);
        // min-width: getRem(130);
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .icon-yuyin1{
          font-size: getRem(30);
          color: #A2A2A2;
          opacity: 0;
          overflow: hidden;
          &.playing{
            opacity: 1;
            animation: voicePlay 1s infinite forwards;
          }
        }
        .icon-voice{
          &.voice-static{
            background: url("../assets/images/voice.png") no-repeat center center/ cover;
            background-size: getRem(22) getRem(31);
          }
          &.playing{
            background: url("../assets/images/voice-play-you.gif") no-repeat;
          }
          float: left;
          @include wh(getRem(22), getRem(30));
        }
        @-webkit-keyframes voicePlay {
          0% {
            width: 6px;
          }
          50% {
            width: 10px;
          }
          100% {
            width: 16px;
          }
        }
        @keyframes voicePlay {
          0% {
            width: 6px;
          }
          50% {
            width: 10px;
          }
          100% {
            width: 16px;
          }
        }
        .duration{
          font-size: getRem(30);
        }
      }
      .check{
        border-radius: getRem(20);
        background: #fff;
        display: inline-block;
      }
      .check-list {
        background: #E6EBF0;
        margin-top: getRem(10);
        overflow: hidden;
        li{
          border-radius: getRem(20);
          text-align: center;
          width: getRem(340);
          background: #fff;
          font-size: getRem(30);
          color: #00b7ee;
          margin-bottom: getRem(10);
          padding: getRem(20) getRem(20);
          transition: all 0.3s;
          &.checked{
            background: #dfdfdf;
          }
        }
      }
      .survey{
        width: getRem(500);
        padding: getRem(30) getRem(30);
        overflow: hidden;
        transition: all 0.3s;
        &:active{
          background: #f7f7f7;
        }
        h3{
          line-height: getRem(30);
          font-size: getRem(30);
          font-weight: normal;
          margin-bottom: getRem(30);
        }
        .survey-detail{
          display: flex;
          align-items: flex-start;
          overflow: hidden;
          img{
            flex-shrink: 0;
            @include wh(getRem(100), getRem(100));
          }
          span{
            font-size: getRem(24);
            color: rgba($fontColor, 0.7);
            margin-left: getRem(20);
          }
        }
      }
      .mix{
        width: getRem(550);
        .top-box{
          background: #00BADB;
          padding: 0 getRem(30);
          border-radius: getRem(20);
          .b-title{
            text-align: center;
            height: getRem(60);
            line-height: getRem(60);
            font-size: getRem(30);
            color: #fff;
            font-weight: normal;
            border-bottom: 1px solid rgba(#fff, 0.4);
          }
          .left-circle{
            background: white;
           // background: #ffde00;
            border-radius: 50%;
            p{
              color: rgba(254,166,106,1);
            }
            p:first-child{
              line-height: getRem(30);
              font-size: getRem(30);
            }
            p:last-child{
              line-height: getRem(30);
              font-size: getRem(24);
            }
          }
          .b-bd{
            display: flex;
            padding: getRem(30) 0;
            justify-content: flex-start;
            align-items: flex-start;
            i.icon-direction-right{
              align-self:center;
              width:getRem(27);
              font-size: getRem(40);
              color: rgba(#fff, 0.5);
            }
            .nutrition-list{
              height: getRem(125);
              overflow: auto;
              width: 100%;
              //margin-left: getRem(30);
              margin-right: getRem(-2);
              span{
                color: #fff;
              }
              li{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .n-name{
                  width: 1.2rem;
                  font-size: getRem(22);
                  text-align: right;
                  flex-shrink: 0;
                  margin-right: getRem(20);
                }
                .n-progress{
                  flex-shrink: 1;
                  width: calc(100% - 1.2rem);
                  height: getRem(10);
                  border-radius: getRem(20);
                  background: rgba(#fff, 0.5);
                  span{
                    // background: #ffde00;
                    height: getRem(10);
                    transition: all 0.5s;
                  }
                }
              }
            }
          }
        }
        .bottom-food{
          padding: getRem(30) 0;
          li{
            padding: 0 getRem(20) 0 getRem(30);
            display: flex;
            align-items: center;
            height: getRem(90);
            line-height: getRem(90);
            transition: all 0.3s;
            &:active{
              background: #f7f7f7;
            }
            .f-name{
              width: 50%;
              height: 100%;
              flex-shrink: 0;
              margin-right: getRem(30);
              border-right: 1px solid rgba(#3a3a3a, 0.1);
              color: rgba(#3a3a3a, 0.7);
              font-size: getRem(28);
            }
            .f-b{
              width: 50%;
              display: flex;
              .f-w{
                width: 50%;
                font-size: getRem(30);
                color: rgba(0,186,219,1);
              }
              .f-u{
                text-align: right;
                width: 25%;
                font-size: getRem(28);
                color: rgba(#3a3a3a, 0.7);
              }
              .icon-delete{
                width: 25%;
                text-align: right;
                color: #EEEEEE;
                font-size: getRem(32);
                transition: all 0.3s;
                :active{
                  color: #EdEdEd;
                }
              }
            }
          }
        }
      }
    }
  }
  .list-enter-active, .list-leave-active {
    transition: all 0.5s !important;
  }
  .list-enter, .list-leave-active {
    opacity: 0;
    transform: translateY(-50px);
  }
</style>
