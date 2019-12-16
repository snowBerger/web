<template>
  <div class="question-sleep">
    <div class="question-content">
      <icx-clock ref="sleep" start-time="23:00" end-time="08:30"></icx-clock>
    </div>
    <div class="question-button btn-enable" v-text="question.buttonText" @click="nextQuestion()"></div>
  </div>
</template>

<script>
  import IcxClock from '../../components/IcxClock'
  import { mapMutations } from 'vuex'
  import { SAVE_SURVEY_ANSWER } from '../../store/mutation-types'

  export default{
    data () {
      return {}
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
      }
    },
    components: { IcxClock },
    computed: {
      sleep () {
        return this.$refs.sleep
      }
    },
    methods: {
      ...mapMutations({
        SAVE_SURVEY_ANSWER
      }),
      nextQuestion () {
        let _range = this.sleep.range.split(':')
        this.answer.textAnswer = {
          '00': this.sleep.start.time + ':00',
          '01': this.sleep.end.time + ':00',
          '02': _range[0] * 60 + +_range[1] + ''
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
  $activeColor: #00BADB;

  .question-sleep {
    width: 6.9rem;
    margin: 0 auto;
    .question-content {
      border-radius: .2rem;
      font-size: .28rem;
      color: $activeColor;
      & > input,
      & > textarea {
        width: 100%;
        border: none;
        color: #666666;
      }
      & > textarea {
        resize: none;
      }
      & > input::-webkit-input-placeholder,
      & > textarea::-webkit-input-placeholder {
        color:#D8D8D8;
      }
      & > input::-moz-placeholder,
      & > textarea::-moz-placeholder {
        color:#D8D8D8;
      }
      & > input:-moz-placeholder,
      & > textarea:-moz-placeholder {
        color:#D8D8D8;
      }
    }
    .question-button {
      width: 6.4rem;
      height: .9rem;
      margin: .4rem auto 0;
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
