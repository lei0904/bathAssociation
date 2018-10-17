<template>
  <div class="mint-msgbox-wrapper share-dialog-wrapper">
    <transition name="msgbox-bounce">
      <div class="mint-msgbox" v-show="value">
        <div class="mint-msgbox-header">
          <span class="share-title">分享到</span>
          <span class="copy-link">复制网址</span>
        </div>
        <div class="mint-msgbox-content">
          <div class="share-list clearfix">
            <div class="share-item" @click="toShare('wx')">
              <img src="../../../../static/image/share/wx.png">
              <span class="txt">微信好友</span>
            </div>
            <div class="share-item" @click="toShare('pyq')">
              <img src="../../../../static/image/share/pyq.png">
              <span class="txt">朋友圈</span>
            </div>
            <div class="share-item" @click="toShare('qq')">
              <img src="../../../../static/image/share/qq.png">
              <span class="txt">QQ好友</span>
            </div>
            <div class="share-item" @click="toShare('kj')">
              <img src="../../../../static/image/share/kj.png">
              <span class="txt">QQ空间</span>
            </div>
          </div>
        </div>
        <div class="mint-msgbox-btns" @click="cancel">
          <button>取消</button>
        </div>
      </div>
    </transition>
  </div>
</template>
<style type="scss">
  .mint-msgbox-wrapper.share-dialog-wrapper .mint-msgbox {
    width: auto;
    left: 40px;
    right: 40px;
    -webkit-transform: translate3d(0%, 0%, 0);
   transform: translate3d(0%, 0%, 0);
    margin-top: -260px;
    background: #f8f8f8;
  }
  .mint-msgbox-wrapper.share-dialog-wrapper .mint-msgbox .mint-msgbox-content {
    /*height: 248px;*/
    padding: 45px 0 45px;
  }
  .mint-msgbox-wrapper.share-dialog-wrapper .share-list {
    width: 100%;
    padding-left: 55px;
    padding-right: 55px;
    box-sizing: border-box;
  }
  .mint-msgbox-wrapper.share-dialog-wrapper .share-item {
    float: left;
    width: 25%;
    position: relative;
    height: 150px;
  }
  .mint-msgbox-wrapper.share-dialog-wrapper .share-item:first-child {
    /*margin-left: 55px;*/
  }
  .mint-msgbox-wrapper.share-dialog-wrapper .share-item img {
    width: 106px;
    height: 106px;
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -53px;
  }
  .mint-msgbox-wrapper.share-dialog-wrapper .share-item .txt {
    color: #959595;
    font-size: 28px; /*px*/
    display: block;
    text-align: center;
    padding-top: 18px;
    position: absolute;
    width: 100%;
    bottom: 0;
  }
  .mint-msgbox-wrapper.share-dialog-wrapper .mint-msgbox-header {
    height: 94px;
    line-height: 94px;
    padding: 0;
    margin-left: 48px;
    margin-right: 48px;
    border-bottom: 1px solid #dcdcdc; /*no*/
    box-sizing: border-box;
    color: #434343;
    font-size: 32px; /*px*/
  }
  .mint-msgbox-wrapper.share-dialog-wrapper .mint-msgbox-header .copy-link {
    float: right;
    background: url("../../../../static/image/copy-icon.png") no-repeat center right;
    background-size: 32px 33px;
    padding-right: 50px;
    font-size: 28px; /*px*/
  }
  .mint-msgbox-wrapper.share-dialog-wrapper .mint-msgbox-btns {
    height: 98px;
    line-height: 98px;
    text-align: center;
    display: block;
    font-size: 28px; /*px*/
    color: #009983;
  }
  .mint-msgbox-wrapper.share-dialog-wrapper .mint-msgbox-btns button {
    width: 100%;
    height: 100%;
    font-size: 28px; /*px*/
    color: #009983;
  }
</style>
<script type="text/babel">
  let CONFIRM_TEXT = '确定';
  let CANCEL_TEXT = '取消';

  import Popup from 'mint-ui/src/utils/popup';

  export default {
    mixins: [ Popup ],

    props: {
      modal: {
        default: true
      }
    },


    methods: {
      toShare(t) {
        console.log(t);
      },
      numberSub() {
        if (this.inputValue <= 0) {
          this.inputValue = 0;
        } else {
          this.inputValue--
        }
      },
      numberAdd() {
        this.inputValue++
      },
      doClose() {
        this.value = false;
        this._closing = true;

        this.onClose && this.onClose();

        setTimeout(() => {
          if (this.modal && this.bodyOverflow !== 'hidden') {
            document.body.style.overflow = this.bodyOverflow;
            document.body.style.paddingRight = this.bodyPaddingRight;
          }
          this.bodyOverflow = null;
          this.bodyPaddingRight = null;
        }, 200);
        this.opened = false;

        if (!this.transition) {
          this.doAfterClose();
        }
      },

      cancel() {
        this.value = false;
      },

      validate() {
        if (this.$type === 'prompt' || this.$type === 'numberInput') {
          var inputPattern = this.inputPattern;
          if (inputPattern && !inputPattern.test(this.inputValue || '')) {
            this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!';
            if (this.$type === 'numberInput') {
              this.$refs.numberInput.classList.add('invalid');
            } else {
              this.$refs.input.classList.add('invalid');
            }
            return false;
          }
          var inputValidator = this.inputValidator;
          if (typeof inputValidator === 'function') {
            var validateResult = inputValidator(this.inputValue);
            if (validateResult === false) {
              this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!';
              if (this.$type === 'numberInput') {
                this.$refs.numberInput.classList.add('invalid');
              } else {
                this.$refs.input.classList.add('invalid');
              }
              return false;
            }
            if (typeof validateResult === 'string') {
              this.editorErrorMessage = validateResult;
              return false;
            }
          }
        }
        this.editorErrorMessage = '';
        if (this.$type === 'numberInput') {
          this.$refs['numberInput'] && this.$refs['numberInput'].classList.remove('invalid');
        } else {
          this.$refs['input'] &&  this.$refs.input.classList.remove('invalid');
        }
        return true;
      },

      handleInputType(val) {
        if (val === 'range' || !this.$refs.input) return;
        this.$refs.input.type = val;
      }
    },

  };
</script>
