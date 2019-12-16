<template>
  <div class="question-top">
    <div class="top-content">
      <div class="question-name" v-text="questionName"></div>
    </div>
  </div>
</template>

<script>
  export default{
    data () {
      return {}
    },
    props: {
      questionName: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .question-top {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: .4rem 0;
    .top-content {
      position: relative;
      max-width: 5.3rem;
      background: #FFFFFF;
      border-radius: .2rem;
      padding: .2rem;
      font-size: .28rem;
      color: #34353B;
      line-height: .36rem;
    }
  }
  .question-top::before {
    content: '';
    display: inline-block;
    margin: 0 .3rem 0 0;
    width: .6rem;
    height: .6rem;
    border-radius: 50%;
    background: url('../../assets/images/survey-meum-head.png');
    background-size: 100% 100%;
  }
</style>
