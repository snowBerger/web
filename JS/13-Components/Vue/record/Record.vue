<template>
  <div class="survey-contain">
    <icx-scroller :data="questionList" ref="surveyScroller" :bounce="false">
      <div class="question-slide" :class="'slide-' + index" v-for="(question, index) in questionList"
           v-show="index === 0 || question.display"  :style="{minHeight: index === activeIndex ? windowHeight - 40 + 'px' : ''}">
        <div class="survey-question r1b" :class="{'part-line': index !== activeIndex}">
          <!--<div class="question-number">{{index + 1}}/{{questionList.length}}</div>-->
          <question-top :question-name="question.name"></question-top>
          <div class="question-main" :class="{'question-main-self': question.type !== questionTypes.SINGLE && question.type !== questionTypes.MULTI && question.type !== questionTypes.TEXT}">
            <div class="question-body">
              <question-select @slideToNext="slideToNext" :module-type="moduleType" :question="question" :answer="getAnswerByPosition(question.position)" v-if="question.type === questionTypes.SINGLE || question.type === questionTypes.MULTI"></question-select>
              <question-text @slideToNext="slideToNext" :module-type="moduleType" :question="question" :answer="getAnswerByPosition(question.position)" v-if="question.type === questionTypes.TEXT"></question-text>
              <question-percent @slideToNext="slideToNext" :module-type="moduleType" :question="question" :answer="getAnswerByPosition(question.position)" :active-index="activeIndex" v-if="question.type === questionTypes.PERCENT"></question-percent>
              <question-percent-bar @slideToNext="slideToNext" :module-type="moduleType" :question="question" :answer="getAnswerByPosition(question.position)" :active-index="activeIndex" v-if="question.type === questionTypes.PERCENT_BAR"></question-percent-bar>
              <question-sleep @slideToNext="slideToNext" :module-type="moduleType" :question="question" :answer="getAnswerByPosition(question.position)" v-if="question.type === questionTypes.SLEEP"></question-sleep>
            </div>
          </div>
        </div>
      </div>
    </icx-scroller>
    <loading></loading>
  </div>
</template>

<script>
  import IcxScroller from '../../components/IcxScroller'
  import QuestionSleep from './QuestionSleep'
  import QuestionTop from './QuestionTop'
  import QuestionSelect from './QuestionSelect'
  import QuestionText from './QuestionText'
  import QuestionPercent from './QuestionPercent'
  import QuestionPercentBar from './QuestionPercentBar'
  import { QUESTION_TYPE } from './common'
  import { isNullObj } from '../../icx/utils'
  import { submitRecord } from '../../service/service'
  import pageMix from '../../mixins/page'
  import Loading from '../../components/Loading'
  import icx from '../../icx'
  import { mapMutations } from 'vuex'
  import { GO_PAGE } from '../../store/mutation-types'

  export default {
    mixins: [ pageMix ],
    data () {
      return {
        questionTypes: QUESTION_TYPE,
        windowHeight: document.body.clientHeight,
        activeIndex: 0
      }
    },
    props: {
      moduleType: {
        type: String,
        required: true,
        default: ''
      },
      questionList: {
        type: Array,
        default: () => []
      }
    },
    components: { Loading, IcxScroller, QuestionTop, QuestionSelect, QuestionText, QuestionPercent, QuestionPercentBar, QuestionSleep },
    computed: {
      answerList () {
        return this.$store.getters[this.moduleType + 'Answers']
      },
      surveyScroller () {
        return this.$refs.surveyScroller
      }
    },
    mounted () {},
    methods: {
      ...mapMutations({
        GO_PAGE
      }),
      startLoadingPage () {
        this.initSurvey()
        this.loadingSuccess()
      },
      initSurvey () {
        this.questionList.forEach((question, index) => {
          this.$set(question, 'enableNext', question.isRequired ? 0 : 1)
          this.$set(question, 'buttonText', index === this.questionList.length - 1 ? '记好了' : this.getButtonText(question))
          let _answer = this.getAnswerByPosition(question.position)
          this.$set(question, 'display', this.isAnswerNoEmpty(_answer, question))
        })
        let elem = document.querySelector('.survey-contain')
        let that = this
        elem.addEventListener('touchmove', function (e) {
          that.textAreaBlur()
        })
        let _textElems = document.querySelectorAll('.question-body textarea')
        for (let i = 0, l = _textElems.length; i < l; i++) {
          _textElems[i].addEventListener('touchstart', function (e) {
            e.stopPropagation()
          })
        }
      },
      getButtonText (question) {
        let _text = ''
        let _type = +question.type
        switch (_type) {
          case QUESTION_TYPE.SINGLE:
            question.optionList.forEach(item => {
              if (item.isExpended) {
                _text = '下一题'
              }
            })
            break
          case QUESTION_TYPE.TEXT:
          case QUESTION_TYPE.PERCENT:
            _text = '下一题'
            break
          case QUESTION_TYPE.MULTI:
            _text = '选好了，下一题'
            break
          default:
            _text = '下一题'
            break
        }
        return _text
      },
      isAnswerNoEmpty (answer, question) {
        if (!answer) return false
        if ((question.type == QUESTION_TYPE.SINGLE || question.type == QUESTION_TYPE.MULTI) && isNullObj(answer.selectAnswer) || (question.type == QUESTION_TYPE.TEXT || question.type == QUESTION_TYPE.PERCENT || question.type == QUESTION_TYPE.PERCENT_BAR) && (isNullObj(answer.textAnswer) || answer.textAnswer['01'] == '')) {
          return 0
        }
        return 1
      },
      getAnswerByPosition (position) {
        return this.answerList[position] || {selectAnswer: {}, textAnswer: {}, stayLength: 0}
      },
      textAreaBlur () {
        let _textArr = document.querySelectorAll('.survey-contain .question-slide textarea')
        for (let i = 0, l = _textArr.length; i < l; i++) {
          _textArr[i].blur()
        }
      },
      slideToNext (index) {
        this.textAreaBlur()
        let _nextIndex = index + 1
        if (_nextIndex < this.questionList.length) {
          this.activeIndex = _nextIndex
          this.questionList[_nextIndex].display = 1
          // 隐藏后续所有问题
          this.questionList.forEach((item, number) => {
            if (number > _nextIndex) {
              item.display = 0
            }
          })
          this.$nextTick(function () {
            this.surveyScroller.refresh()
            let elem = document.querySelector('.slide-' + _nextIndex)
            this.surveyScroller.scrollToElement(elem, 200, 0, -40)
          })
        } else {
          this.submit()
        }
      },
      // 提交记录
      async submit () {
        if (this.moduleType) {
          let _answer = []
          for (let [key, value] of Object.entries(this.answerList)) {
            _answer.push(Object.assign({}, {position: key}, {
              selectAnswer: JSON.stringify(value.selectAnswer),
              textAnswer: JSON.stringify(value.textAnswer),
              stayLength: 0
            }))
          }
          const response = await submitRecord(this.moduleType, this.personInfo.personId, _answer)
          icx.toast('', '记录完成！', 'middle', 1000)
          if (this.isApiResponseOk(response)) {
            this.GO_PAGE(this.moduleType + '/records')
          } else {
            console.log('submit failed.')
            // icx.toast('', '记录出错！', 'middle', 1000)
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  $activeColor: #00BADB;

  .survey-contain {
    position: relative;
    height: 100%;
    overflow: hidden;
    background: #E6EBF0;
    .question-slide {
      position: relative;
      height: auto;
      padding: 0 .2rem;
      .survey-question {
        height: 100%;
        .question-number {
          line-height: 1rem;
          text-align: center;
          font-size: .28rem;
          color: #A8A8A8;
        }
        .question-main {
          width: 5.3rem;
          margin: 0 auto;
          .question-body {
            margin-bottom: .4rem;
          }
        }
        .question-main-self {
          width: 100%;
        }
      }
      .survey-question.part-line {
        border-bottom: .025rem solid #D8D8D8;
      }
    }
  }
</style>
