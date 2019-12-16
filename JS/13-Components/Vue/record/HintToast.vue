<template>
  <div class="hint-toast" v-show="showHint">
    <i class="hint-icon_toast"></i>
    <p class="hint-toast__content">{{hintTitle}}</p>
  </div>
</template>

<script>
  export default{
    data () {
      return {
        show: true
      }
    },
    props: {
      showHint: {
        type: Boolean,
        default: false
      },
      hintTitle: {
        type: String,
        default: ''
      },
      hintTime: {
        type: Number,
        default: 500
      }
    },
    watch: {
      showHint (val) {
        if (val) {
          clearTimeout(this.timeout)
          this.timeout = setTimeout(() => {
            this.$emit('hide', false)
          }, this.hintTime)
        }
      }
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/mixin";

  .hint-toast{
    width:getRem(320);
    height: getRem(320);
    position: fixed;
    z-index: 5001;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0,0,0,0.70);
    text-align: center;
    border-radius: getRem(20);
    color: #FFFFFF;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    .hint-icon_toast{
      width:getRem(120);
      height:getRem(120);
      display: block;
      @include bis('../../assets/images/hint-succeed.png');
    }
    .hint-toast__content{
      font-size: getRem(28);
      color: #FFFFFF;
      margin-top: getRem(20);
    }
  }
</style>
