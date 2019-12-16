<template>
  <div class="question-text">
    <div class="question-content question-input">
      <textarea v-model="textAnswer" @input="textInput" placeholder="请填写..." />
    </div>
    <div class="question-button" :class="{'btn-enable': !question.isRequired || question.enableNext}" v-if="question.buttonText" v-text="question.buttonText" @click="(!question.isRequired || question.enableNext) && nextQuestion()"></div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import { SAVE_SURVEY_ANSWER } from '../../store/mutation-types'
  import { trimSpace } from '../../icx/utils'

  export default{
    data () {
      return {
        textAnswer: ''
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
      }
    },
    methods: {
      ...mapMutations({
        SAVE_SURVEY_ANSWER
      }),
      textInput () {
        let _text = trimSpace(this.textAnswer)
        if (_text.length > 0) {
          this.textAnswer = _text.substring(0, 200)
          this.answer.textAnswer['01'] = this.textAnswer
          this.question.enableNext = 1
        } else {
          delete this.answer.textAnswer['01']
          if (this.question.isRequired) {
            this.question.enableNext = 0
          }
        }
      },
      nextQuestion () {
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

  .question-text {
    .question-content {
      width: 100%;
      background: #fff;
      border-radius: .2rem;
      font-size: .28rem;
      color: $activeColor;
      overflow: hidden;
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
    .question-content.question-input {
      & > input,
      & > textarea {
        height: 2.3rem;
        color: #666666;
        padding: .2rem;
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
