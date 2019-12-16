<template>
  <div class="question-percent">
    <div class="question-content">
      <div class="emoji-item" v-for="(option, index) in question.optionList">
        <div class="emoji-content">
          <div class="emoji-l">
            <div class="emoji-img" :class="option.start.icon"></div>
            <span v-text="option.start.text"></span>
          </div>
          <range class="emoji-slider" v-model="answer.textAnswer[option.position]"
                 :ref="'slide-' + index"
                 :tooltip="tooltip"
                 :height="height"
                 :dotSize="dotSize"
                 :bgStyle="bgStyle"
                 :sliderStyle="sliderStyle"
                 :processStyle="processStyle"
                 :min="min"
                 :max="max">
          </range>
          <div class="emoji-r">
            <div class="emoji-img margin-34" :class="option.end.icon"></div>
            <span v-text="option.end.text"></span>
          </div>
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
        tooltip: '',
        height: 3,
        dotSize: 18,
        bgStyle: {
          'backgroundColor': '#979A9C',
          'boxShadow': 'none'
        },
        sliderStyle: {
          'backgroundColor': '#fff',
          'borderColor': '#fff',
          'boxShadow': 'none'
        },
        processStyle: {
          'backgroundColor': '#00BADB'
        },
        min: 0,
        max: 100
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
          this.answer.textAnswer[item.position] = '50'
        })
      },
      nextQuestion () {
        for (let [key, value] of Object.entries(this.answer.textAnswer)) {
          this.answer.textAnswer[key] = value + ''
        }
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
  @import "../../assets/css/mixin";
  $activeColor: #00BADB;

  .question-percent {
    width: 6.4rem;
    margin: 0 auto;
    .question-content {
      margin-top: .35rem;
      .emoji-item:last-child {
        margin-bottom: 0;
      }
      .emoji-item {
        margin-bottom: .57rem;
        .emoji-content{
          display: flex;
          justify-content: center;
          .emoji-l,
          .emoji-r {
            width: 1.2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            .emoji-img{
              width:.8rem;
              height: .8rem;
              margin-bottom: .1rem;
            }
          }
          .emoji-l {
            margin-right: .34rem;
          }
          .emoji-r {
            margin-left: .34rem;
          }
          /*身体疲倦*/
          .emoji-img.tired{
            @include bis('../../assets/images/tired.png');
          }
          /*精力充沛*/
          .emoji-img.vitality{
            @include bis('../../assets/images/vitality.png');
          }
          /*忧伤难过*/
          .emoji-img.sad{
            @include bis('../../assets/images/sad.png');
          }
          /*愉快开心*/
          .emoji-img.pleasant{
            @include bis('../../assets/images/pleasant.png');
          }
          /*紧张*/
          .emoji-img.nerious{
            @include bis('../../assets/images/nerious.png');
          }
          /*平静*/
          .emoji-img.gentle{
            @include bis('../../assets/images/gentle.png');
          }
          /*郁闷*/
          .emoji-img.depressed{
            @include bis('../../assets/images/depressed.png');
          }
          /*舒畅*/
          .emoji-img.relax{
            @include bis('../../assets/images/relax.png');
          }
          /*困惑*/
          .emoji-img.puzzled{
            @include bis('../../assets/images/puzzled.png');
          }
          /*明朗*/
          .emoji-img.clear{
            @include bis('../../assets/images/clear.png');
          }
          .emoji-slider{
            flex:1;
            position: relative;
            top:.2rem;
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
      background: $activeColor;
    }
  }
</style>
