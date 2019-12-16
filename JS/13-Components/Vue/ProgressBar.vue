<template>
    <div class="progress-bar">
        <div class="inner" ref="progress" style="width: 0"
             :style="{'width': progressValue + '%', 'background': color, transition: 'all ' + time + 'ms'}"></div>
    </div>
</template>
<script>
  export default{
    data () {
      return {
        progressValue: 0
      }
    },
    mounted () {
      this.progressValue = this.progress
    },
    props: {
      progress: [Number, String],
      color: {
        type: String,
        default: ''
      },
      time: {
        type: [String, Number],
        default: 1500
      }
    },
    watch: {
      progress: function (value) {
        this.progressValue = value
      }
    }
  }
</script>
<style lang='scss' scoped>
  @import "../assets/css/mixin";
  .progress-bar{
    height: getRem(10);
    border-radius: getRem(10);
    background: rgba(#fff, 0.5);
    position: relative;
    overflow: hidden;
    .inner{
      height: 100%;
      background: white;
    }
  }
</style>
