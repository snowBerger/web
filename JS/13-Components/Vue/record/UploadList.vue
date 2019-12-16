<template>
  <div class="treatmentList">
    <div class="item">
      <div class="item-inner">
        <div class="item-title">
          <div class="title-left">
            <i :style="{backgroundImage: 'url(' + item.icon + ')'}"  ></i>
            <h3>{{ item.title }}</h3>
          </div>
          <div class="title-right">
            <span class="right-tips">{{imgListLength}}P</span>
          </div>
        </div>
        <div class="item-bottom">
          <div class="add-img-item">
            <a class="file-upload" href="javascript:;">
              <i></i>
              <input @change="uploadAction($event)" type="file"  name="photo" accept="image/jpg,image/jpeg,image/png"  placeholder="上传图片"/>
            </a>
          </div>
          <ul class="treatmentImageList">
            <li class="img-item" v-for="(itemImg, index) in imgList" >
              <i @click="deleteImg(index)" class="img-item-delete">×</i>
              <img :src="itemImg.url" />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <confirm class="icx-confirm" v-model="showConfirm"
             :title="title"
             @on-confirm="onConfirm">
      <p style="text-align:center;">确定删除该图片？</p>
    </confirm>
  </div>
</template>

<script>
  import icx from '../../icx/index'
  import { mapMutations } from 'vuex'
  import { Confirm } from 'vux'
  import * as CONST from '../../icx/const'
  import { CHANGE_IMG_SAVE, CHANGE_UPLOADIMG_LIST, CHANGE_SUBMIT_STATE, CHANGE_LOADING_STATE } from '../../store/mutation-types'
  export default {
    data () {
      return {
        imgList: [],
        imgListLength: 0,
        deleteIndex: '',
        showConfirm: false,
        title: '温馨提示'
      }
    },
    props: {
      item: {
        type: Object,
        default: {}
      }
    },
    watch: {
      '$route' (to, from) {
        if (to.name == 'treatmentUpload') {
          if (this.$store.state.treatment.uploadImgList[this.item.id]) {
            this.imgList = this.$store.state.treatment.uploadImgList[this.item.id].pictures
          }
          if (this.imgList) {
            this.imgListLength = this.imgList.length
          }
        }
      }
    },
    methods: {
      deleteImg (index) {
        this.showConfirm = true
        this.deleteIndex = index
      },
      // 确认删除图片
      onConfirm () {
        this.$nextTick(function () {
          this.imgList.splice(this.deleteIndex, 1)
          this.imgListLength = this.imgList.length
          if (this.$store.state.treatment.uploadImgList[this.item.id]) {
            this.$store.state.treatment.uploadImgList[this.item.id].pictures = this.imgList
            let _changeData = this.$store.state.treatment.uploadImgList[this.item.id].pictures
            this.CHANGE_UPLOADIMG_LIST(_changeData)
          }
        })
      },
      uploadAction (e) {
        if (e.target.files.length === 0) return
        icx.uploadImage(e.target.files[0], 'file', 'https://mainapi.icarbonx.com/health/meumApp/seeDoctor/uploadFile', {type: 1}, (res) => {
          const data = JSON.parse(res.currentTarget.response).data
          this.CHANGE_IMG_SAVE(data)
          this.CHANGE_SUBMIT_STATE({'showHintToast': false})
          this.$store.commit('goPage', { name: 'treatmentUploadSave', params: { medicalType: this.item.id } })
        }, (rst) => {
          this.CHANGE_LOADING_STATE({
            state: CONST.INT_LOADING
          })
        })
      },
      ...mapMutations({
        CHANGE_IMG_SAVE,
        CHANGE_UPLOADIMG_LIST,
        CHANGE_SUBMIT_STATE,
        CHANGE_LOADING_STATE
      })
    },
    components: {
      Confirm
    }
  }
</script>

<style  lang="scss"  scoped>
  @import "../../assets/css/mixin";

  .treatmentList{
    margin-top: getRem(20);
    padding: 0 getRem(30);
    box-sizing: border-box;
    .item{
      .item-inner{
        padding: 0.3rem 0px 0.3rem 0.3rem;
        position: relative;
        background: #fff;
        border-radius: 0.08rem;
        transition: all 0.3s;
        .item-title{
          display: flex;
          position: relative;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.16rem;
          .title-left{
            align-items: center;
            display: flex;
            i{
              width: 0.4rem;
              height: 0.4rem;
              background-size: cover;
              display: inline-block;
              margin-right: 0.08rem;
              background-size: 100% 100%;
            }
            h3{
              width: 2.5rem;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              font-weight: normal;
              font-size: 0.32rem;
              color: #34353B;
            }
          }
          .title-right{
            .right-tips{
              margin-right: 0.3rem;
              color: #7A7D80;
              font-size: 0.24rem;
            }
          }
        }
        .item-bottom{
          margin-top: .28rem;
          display: flex;
          overflow-x: scroll;
          overflow-y: hidden;
          flex-direction: row;
          .add-img-item{
            margin-right: getRem(8);
            i{
              color: #68748C;
              position: relative;
              top:getRem(-16);
              width:getRem(32);
              height:getRem(32);
              @include bis('../treatment/images/add.png')
            }
            i:after{
              content: '上传照片';
              position: absolute;
              text-align: center;
              left:50%;
              bottom:getRem(-50);
              display: block;
              font-size: getRem(24);
              margin-left: getRem(-50);
              color: #68748C;
              width:getRem(100);
            }
            @media screen  and (max-width: 320px) {
              i:after{
                width:getRem(120);
              }
            }
            .file-upload{
              display: flex;
              background: #F2F2F2;
              justify-content: center;
              align-items: center;
              @include wh(getRem(180), getRem(180));
              input {
                position: absolute;
                font-size: 100px;
                right: 0;
                top: 0;
                opacity: 0;
                filter: alpha(opacity=0);
                cursor: pointer;
              }
            }
          }
          .treatmentImageList{
            display: flex;
            overflow-x: scroll;
            overflow-y: hidden;
            flex-direction: row;
            li {
              margin-right: getRem(8);
              @include wh(getRem(180), getRem(180));
              position: relative;
              .img-item-delete{
                opacity: 0.5;
                background: #040404;
                width: getRem(36);
                height: getRem(36);
                font-size: getRem(40);
                color: #ffffff;
                border-radius: 50%;
                position: absolute;
                right:getRem(8);
                top:getRem(8);
                text-align: center;
                line-height:getRem(36);
              }
              img{
                @include wh(getRem(180), getRem(180));
              }
            }
          }
        }
      }
    }
  }
</style>
