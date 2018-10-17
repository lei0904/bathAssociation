<template>
  <div class="mint-msgbox-wrapper input-dialog-wrapper">
    <transition name="msgbox-bounce">
      <div class="mint-msgbox" v-show="value">
        <div class="mint-msgbox-header" v-if="title !== ''">
          <div class="mint-msgbox-title">{{ title }}</div>
        </div>
        <div class="mint-msgbox-content" v-if="message !== ''">
          <div class="mint-msgbox-message" v-html="message"></div>
          <div class="mint-msgbox-input" v-if="showInput">
            <input v-model="inputValue" :placeholder="inputPlaceholder" ref="input">
            <div class="mint-msgbox-errormsg" :style="{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }">{{ editorErrorMessage }}</div>
          </div>
          <div class="mint-msgbox-input" v-if="showNumberInput">
            <div class="number-input-wrapper">
              <a class="number-input-sub" @click="numberSub"></a>
              <input v-model="inputValue" :placeholder="inputPlaceholder" type="number" ref="numberInput" class="number-input-core">
              <a class="number-input-add" @click="numberAdd"></a>
            </div>
          </div>

          <div class="mint-msgbox-textarea" v-if="showTextArea">
            <div class="mint-msgbox-textarea-wrapper">
              <textarea class="mint-msgbox-textarea-core" v-model="inputValue"></textarea>
              <div class="tip">{{curTextAreaLength}}/30</div>
            </div>
          </div>
        </div>
        <div class="mint-msgbox-btns">
          <button :class="[ cancelButtonClasses ]" v-show="showCancelButton" @click="handleAction('cancel')">{{ cancelButtonText }}</button>
          <button :class="[ confirmButtonClasses ]" v-show="showConfirmButton" @click="handleAction('confirm')">{{ confirmButtonText }}</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style type="scss">
  .mint-msgbox-wrapper.input-dialog-wrapper .mint-msgbox-textarea{
    width: 100%;
    padding: 30px;
    box-sizing: border-box;
  }
  .mint-msgbox-wrapper.input-dialog-wrapper .mint-msgbox-textarea-wrapper {
    height: 230px;
    width: 100%;
    background: #F3F4F7;
    border-radius: 3px;
  }
  .mint-msgbox-wrapper.input-dialog-wrapper .tip {
    text-align: right;
    font-size: 24px;
    color: #434343;
    padding-right: 15px;
    height: 60px;
    line-height: 60px;
  }
  .mint-msgbox-wrapper.input-dialog-wrapper .mint-msgbox-textarea-core {
    height: 170px;
    width: 100%;
    color: #434343;
    font-size: 26px; /*px*/
    border: none;
    outline: none;
    background: #F3F4F7;
    padding: 30px;
    box-sizing: border-box;
  }
  .mint-msgbox-wrapper.input-dialog-wrapper .mint-msgbox-header {
    height: 98px;
    line-height: 98px;
    padding: 0;
    background: #fcfcfc;
  }
  .mint-msgbox-wrapper.input-dialog-wrapper .mint-msgbox-header .mint-msgbox-title {
    font-size: 32px; /*px*/
    color: #434343;
    font-weight: normal;
  }

  .mint-msgbox-wrapper.input-dialog-wrapper .mint-msgbox-btns {
    height: 98px;
  }
  .mint-msgbox-wrapper.input-dialog-wrapper .mint-msgbox-btns .mint-msgbox-btn {
    height: 98px;
    background: #fcfcfc;
    font-size: 32px; /*px*/
    color: #434343;
  }
  .mint-msgbox-wrapper.input-dialog-wrapper .mint-msgbox-btns .mint-msgbox-btn.mint-msgbox-confirm  {
    color: #3eb049;
  }
  .mint-msgbox-wrapper.input-dialog-wrapper .mint-msgbox-btns .mint-msgbox-btn.mint-msgbox-cancel  {
    border: none;
    position: relative;
  }
  .mint-msgbox-wrapper.input-dialog-wrapper .mint-msgbox-btns .mint-msgbox-btn.mint-msgbox-cancel:after  {
    content: ' ';
    display: block;
    width: 1px; /*no*/
    height: 60px;
    background: #dcdcdc;
    position: absolute;
    right: 0;
    top: 19px;
  }
  .mint-msgbox-wrapper.input-dialog-wrapper .mint-msgbox-content {
    padding: 0;
    min-height: auto;
  }
  .mint-msgbox-wrapper.input-dialog-wrapper .mint-msgbox {
    width: 600px;
    border-radius: 5px;
  }
  .mint-msgbox-wrapper.input-dialog-wrapper .mint-msgbox-content .mint-msgbox-input {
    padding: 0;
  }
  .number-input-wrapper {
    height: 74px;
    margin: 126px 86px 104px;
    position: relative;
    border: 1px solid #dcdcdc; /*no*/
  }
  .number-input-wrapper .number-input-sub {
    height: 74px;
    width: 74px;
    display: block;
    position: absolute;
    left: 0;
    background: url("../../../../static/image/input_sub.png") no-repeat center center;
    background-size: 32px 32px;
    border-right: 1px solid #dcdcdc; /*no*/
    box-sizing: border-box;
  }
  .number-input-wrapper .number-input-add {
    height: 74px;
    width: 74px;
    display: block;
    position: absolute;
    right: 0;
    background: url("../../../../static/image/input_add.png") no-repeat center center;
    background-size: 32px 32px;
    border-left:1px solid #dcdcdc; /*no*/
    box-sizing: border-box;
  }
  .number-input-wrapper .number-input-core {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 74px;
    right: 74px;
    padding: 0;
    width: 280px;
    border: none;
    border-radius: 0;
    text-align: center;
    font-size: 36px; /*px*/
    color: #434343;
    background: #fbfbfb;
  }
  .mint-msgbox-wrapper.input-dialog-wrapper .mint-msgbox-btns .mint-msgbox-btn.mint-msgbox-cancel.text-area,
  .mint-msgbox-wrapper.input-dialog-wrapper .mint-msgbox-btns .mint-msgbox-btn.mint-msgbox-confirm.text-area {
    /*height: 120px;*/
    background: #ffffff;
  }
  .mint-msgbox-wrapper.input-dialog-wrapper .mint-msgbox-btns .mint-msgbox-btn.mint-msgbox-confirm.text-area {
    color: #169883;
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
      },
      showClose: {
        type: Boolean,
        default: true
      },
      lockScroll: {
        type: Boolean,
        default: false
      },
      closeOnClickModal: {
        default: true
      },
      closeOnPressEscape: {
        default: true
      },
      inputType: {
        type: String,
        default: 'text'
      }
    },

    computed: {
      confirmButtonClasses() {
        let classes = 'mint-msgbox-btn mint-msgbox-confirm ' + this.confirmButtonClass;
        if (this.confirmButtonHighlight) {
          classes += ' mint-msgbox-confirm-highlight';
        }
        return classes;
      },
      cancelButtonClasses() {
        let classes = 'mint-msgbox-btn mint-msgbox-cancel ' + this.cancelButtonClass;
        if (this.cancelButtonHighlight) {
          classes += ' mint-msgbox-cancel-highlight';
        }
        return classes;
      }
    },

    methods: {
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

      handleAction(action) {
        if(this.$type === 'textArea' && action === 'confirm') {
          let cb = this.callback;
          this.value = false;
          cb(action, this.inputValue);
          return;
        }

        if ((this.$type === 'prompt' || this.$type === 'numberInput') && action === 'confirm' && !this.validate()) {
          return;
        }
        var callback = this.callback;
        this.value = false;
        callback(action);
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

    watch: {
      inputValue(v, v2) {
        if (this.$type === 'textArea') {
          this.curTextAreaLength = (v + '').length;
          if (this.curTextAreaLength > 30) {
            this.inputValue = v2 || '';
          }
          return;
        }
        if (this.$type === 'prompt' || this.$type === 'numberInput') {
          this.validate();
        }
      },

      value(val) {
        this.handleInputType(this.inputType);
        if (val && (this.$type === 'prompt' || this.$type === 'numberInput')) {
          setTimeout(() => {
            if (this.$refs.input) {
              this.$refs.input.focus();
            }
          }, 500);
        }
      },

      inputType(val) {
        this.handleInputType(val);
      }
    },

    data() {
      return {
        title: '',
        message: '',
        type: '',
        showInput: false,
        showNumberInput: false,
        showTextArea: false,
        inputValue: null,
        inputPlaceholder: '',
        inputPattern: null,
        inputValidator: null,
        inputErrorMessage: '',
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: CONFIRM_TEXT,
        cancelButtonText: CANCEL_TEXT,
        confirmButtonClass: '',
        confirmButtonDisabled: false,
        cancelButtonClass: '',
        editorErrorMessage: null,
        callback: null,
        curTextAreaLength: 0
      };
    }
  };
</script>
