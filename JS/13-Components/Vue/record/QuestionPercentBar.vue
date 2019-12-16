<template>
  <div class="question-percent-bar">
    <div class="content">
      <div class="item" v-for="(option, index) in question.optionList">
        <div class="question-desc">{{option.title}}</div>
        <div class="item-content">
          <span class="rang-value">{{value}} 分钟</span>
          <range class="slider vue-slider-sports" v-model="value"
                 :ref="'slide-' + index"
                 :tooltip="tooltip"
                 :height="height"
                 :dotSize="dotSize"
                 :bgStyle="bgStyle"
                 :sliderStyle="sliderStyle"
                 :processStyle="processStyle"
                 :min="min"
                 :max="max"></range>
        </div>
        <div class="content">
          <span v-text="option.start.text"></span>
          <span v-text="option.end.text"></span>
        </div>
      </div>
    </div>
    <div class="question-button btn-enable" v-if="question.buttonText" v-text="question.buttonText" @click="nextQuestion()"></div>
  </div>
</template>

<script>
  import Range from '../../components/Range'
  import { mapMutations } from 'vuex'
  import { SAVE_SURVEY_ANSWER } from '../../store/mutation-types'

  export default{
    data () {
      return {
        value: 100,
        min: 0,
        max: 200,
        interval: 10,
        height: 1,
        dotSize: 18,
        tooltip: '',
        bgStyle: {
          'backgroundColor': '#ABAEB1',
          'boxShadow': 'none'
        },
        sliderStyle: {
          'backgroundColor': '#00BADB',
          'boxShadow': '0px 0px 6px 2px rgba(0,186,219,.45)'
        },
        processStyle: {
          'backgroundColor': '#ABAEB1'
        }
      }
    },
    props: {
      moduleType: {
        type: String,
        required: true,
        default: ''
      },
      question: {
        type: Object,
        default: () => {}
      },
      answer: {
        type: Object,
        default: () => {}
      },
      activeIndex: {
        type: Number,
        default: 0
      }
    },
    components: { Range },
    watch: {
      activeIndex (nVal, oVal) {
        if (nVal === +this.question.position - 1) {
          this.initComponent()
        }
      }
    },
    methods: {
      ...mapMutations({
        SAVE_SURVEY_ANSWER
      }),
      initComponent () {
        this.question.optionList.forEach((item, index) => {
          this.$refs['slide-' + index][0].refresh()
        })
      },
      nextQuestion () {
        this.question.optionList.forEach((item, index) => {
          this.answer.textAnswer[item.position] = this.value + ''
        })
        this.SAVE_SURVEY_ANSWER({
          moduleType: this.moduleType,
          position: this.question.position,
          data: this.answer
        })
        this.$emit('slideToNext', +this.question.position - 1)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .question-percent-bar {
    width: 6.4rem;
    margin: 0 auto;
    .content {
      margin-top: .35rem;
      .item:last-child {
        margin-bottom: 0;
      }
      .item {
        background: #ffffff;
        border-radius: 12px;
        padding: .3rem;
        margin-bottom: 40px;
        .question-desc{
          color: #00BADB;
          margin-bottom: .75rem;
        }
        .item-content{
          display: flex;
          justify-content: center;
          position: relative;
          .rang-value{
            color: #34353B;
            font-size:.28rem;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            margin-top: -.5rem;
          }
          .slider{
            flex:1;
          }
        }
        .content{
          margin-top: .38rem;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          & > span {
            font-size: .24rem;
            color: #7A7D80;
          }
        }
      }
    }
    .question-button {
      height: .9rem;
      margin-top: .4rem;
      line-height: .9rem;
      text-align: center;
      background: #D5DBDF;
      color: #FFFFFF;
      font-size: .36rem;
      border-radius: .12rem;
    }
    .question-button.btn-enable {
      background: #00BADB;
    }
  }
</style>
