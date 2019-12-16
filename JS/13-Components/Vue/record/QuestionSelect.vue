<template>
  <div class="question-select">
    <div class="question-content">
      <div class="question-item" :class="{'active': option.active, 'expend': option.isExpended}" v-for="(option, index) in question.optionList" @click="!option.isExpended && selectOption(option, index)">
        <div class="item-content">{{option.option}}</div>
        <div class="item-expend" v-if="option.isExpended">
          <textarea :placeholder="option.expendedText || '请填写...'" @input="textInput(option, index)" v-model="answer.textAnswer[option.position]"/>
        </div>
        <span class="item-button" v-if="option.isExpended && answer.textAnswer[option.position]" @click="answer.textAnswer[option.position] && clearOption(option, index)"></span>
      </div>
    </div>
    <div class="question-button" :class="{'btn-enable': question.enableNext}" v-if="question.buttonText" v-text="question.buttonText" @click="question.enableNext && nextQuestion()"></div>
  </div>
</template>

<script>
  import { QUESTION_TYPE } from './common'
  import { mapMutations } from 'vuex'
  import { SAVE_SURVEY_ANSWER } from '../../store/mutation-types'
  import { isNullObj, trimSpace } from '../../icx/utils'

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
    computed: {
      currentIndex () {
        return +this.question.position - 1
      }
    },
    mounted () {
      this.initOptionList()
    },
    methods: {
      ...mapMutations({
        SAVE_SURVEY_ANSWER
      }),
      initOptionList () {
        this.question.optionList.forEach(option => {
          this.$set(option, 'active', 0)
        })
      },
      textInput (option, index) {
        let _text = trimSpace(this.answer.textAnswer[option.position])
        if (_text.length > 0) {
          this.answer.textAnswer[option.position] = _text.substring(0, 200)
          if (!(option.position in this.answer.selectAnswer)) {
            this.selectOption(option, index)
          }
        } else {
          delete this.answer.textAnswer[option.position]
          delete this.answer.selectAnswer[option.position]
          this.updateQuestionState(option, index)
        }
      },
      clearOption (option, index) {
        delete this.answer.selectAnswer[option.position]
        delete this.answer.textAnswer[option.position]
        this.updateQuestionState(option, index)
        if (this.question.type === QUESTION_TYPE.SINGLE) {
          this.prevQuestion()
        }
      },
      selectOption (option, index) {
        // 多选题，toogle选中取消
        if (option.position in this.answer.selectAnswer) {
          if (option.isExpended || this.question.type === QUESTION_TYPE.MULTI) {
            delete this.answer.selectAnswer[option.position]
            delete this.answer.textAnswer[option.position]
            // $scope.textarea.blur()
          }
        } else {
          if (this.question.type === QUESTION_TYPE.SINGLE) {
            this.answer.selectAnswer = {}
            if (!option.isExpended) {
              this.answer.textAnswer = {}
            }
            this.initOptionList()
          } else if (this.question.type === QUESTION_TYPE.MULTI) {
            // 增加互斥判断
            if (this.question.optionList && this.question.optionList.length > 0) {
              // 如果当前选择的是互斥的，就把其他选项都置空
              if (option.exclusiveState) {
                this.answer.selectAnswer = {}
                this.answer.textAnswer = {}
                this.initOptionList()
              } else {
                // 如果已选中互斥项，则删除互斥项
                this.question.optionList.forEach(item => {
                  if (item.exclusiveState) {
                    item.active = 0
                    delete this.answer.selectAnswer[item.position]
                    delete this.answer.textAnswer[item.position]
                  }
                })
              }
            }
          }
          this.answer.selectAnswer[option.position] = ''
        }
        // 如果是单选，并且不能填空就直接下一题，否则要看是不是可以填空
        if (this.question.type === QUESTION_TYPE.SINGLE && !option.isExpended) {
          this.nextQuestion()
        } else if (option.isExpended) {
          // 聚焦输入框
          // $scope.textarea.focus()
        }
        this.updateQuestionState(option, index)
      },
      // 更新答案
      saveAnswer () {
        this.SAVE_SURVEY_ANSWER({
          moduleType: this.moduleType,
          position: this.question.position,
          data: this.answer
        })
      },
      prevQuestion () {
        this.saveAnswer()
        this.$emit('slideToNext', this.currentIndex - 1)
      },
      nextQuestion () {
        this.saveAnswer()
        this.$emit('slideToNext', this.currentIndex)
      },
      updateQuestionState (option, index) {
        this.updateOptionState(option, index)
        this.updateButtonState()
      },
      updateButtonState () {
        let _selectAnswer = this.answer.selectAnswer
        let _textAnswer = this.answer.textAnswer
        if (isNullObj(_selectAnswer)) {
          this.question.enableNext = 0
          return
        }
        if (!isNullObj(_textAnswer)) {
          for (let text in _textAnswer) {
            if (_textAnswer[text] == '') {
              this.question.enableNext = 0
              return
            }
          }
        }
        this.question.enableNext = 1
      },
      // 是否选中
      updateOptionState (option, index) {
        let _active = 0
        if (!option.isExpended && this.answer.selectAnswer[option.position] != null) {
          _active = 1
        }
        if (option.isExpended && this.answer.textAnswer[option.position]) {
          _active = 1
        }
        this.question.optionList[index].active = _active
      }
    }
  }
</script>

<style lang="scss" scoped>
  $activeColor: #00BADB;

  .question-select {
    .question-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: .9rem;
      color: #4A4A4A;
      .question-item.active::before {
        content: '';
        display: inline-block;
        width: .28rem;
        height: .28rem;
        position: absolute;
        top: -.02rem;
        left: -.02rem;
        background: url('../../assets/images/icon-matrix-select-x2.png');
        background-size: 100% 100%;
        @media (-webkit-device-pixel-ratio: 3) {
          background: url('../../assets/images/icon-matrix-select-x3.png');
          background-size: 100% 100%;
        }
      }
      .question-item {
        position: relative;
        width: 100%;
        padding: .2rem;
        margin: 0 0 .2rem;
        line-height: .36rem;
        font-size: .28rem;
        background: #fff;
        border-radius: .2rem;
        box-sizing: border-box;
        text-align: center;
        border: .04rem solid transparent;
        .item-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: $activeColor;
        }
      }
      .question-item:last-child {
        margin-bottom: 0;
      }
      .question-item.active {
        border: .04rem solid $activeColor;
      }
      .question-item.expend {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .item-content {
          max-width: .6rem;
        }
        .item-expend {
          width: 3.3rem;
          height: 1rem;
          margin: 0 .25rem;
          & > textarea {
            width: 100%;
            height: 100%;
            line-height: .48rem;
            border: none;
            resize: none;
            color: #666666;
          }
          & > textarea::-webkit-input-placeholder {
            color:#D8D8D8;
          }
          & > textarea::-moz-placeholder {
            color:#D8D8D8;
          }
          & > textarea:-moz-placeholder {
            color:#D8D8D8;
          }
        }
        .item-button {
          width: .44rem;
          height: .44rem;
          background: url('../../assets/images/icon-select-expend-x2.png') 0 0 no-repeat;
          background-size: 100% 100%;
          @media (-webkit-device-pixel-ratio: 3) {
            background: url('../../assets/images/icon-select-expend-x3.png') 0 0 no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
    .question-button {
      height: .9rem;
      line-height: .9rem;
      text-align: center;
      margin-top: .4rem;
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
