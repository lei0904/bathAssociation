<template>
  <div class="leave-message" v-show="show" @click.stop.prevent="show=false">
    <div class="leave-message-wrapper" @click.stop.prevent="">
      <section class="">
        <div class="lm-input-wrapper">
          <div class="input">
            <input type="text" maxlength="30" class="input-core" placeholder="去留言" @focus="inputFocus = true" v-model="message" v-focus="inputFocus">
            <i class="clear" @click.stop.prevent="message = ''" v-show="message && inputFocus"></i>
          </div>
          <button class="confirm" @click.stop.prevent="confirm">确定</button>
        </div>
        <div class="lm-history-wrapper" v-if="list && list.length > 0">
          <div class="item" v-for="item in list" @click="appendMessage(item)">{{item}}</div>
          <!--<div class="item" @click="appendMessage('剁大块')">剁大块</div>-->
          <!--<div class="item" @click="appendMessage('清洗一下')">清洗一下</div>-->
          <!--<div class="item disable" @click="appendMessage('包装美')">包装美</div>-->
        </div>
      </section>
    </div>
  </div>
</template>

<style type="scss">
  .leave-message {
    position: fixed;
    z-index: 999;
    overflow: hidden;
    background: transparent;
    height: 100vh;
    width: 100%;
    top: 0;
  }
  .leave-message-wrapper {
    /*min-height: 124px;*/
    width: 100%;
    position: fixed;
    bottom: 0;
    background: rgba(220, 220, 220, 0.9);
    z-index: 1000;
    box-sizing: border-box;
    padding: 30px 26px 34px 26px;
  }
  .leave-message-wrapper .lm-input-wrapper {
    position: relative;
    min-height: 60px;
  }

  .leave-message-wrapper .lm-input-wrapper .input {
    position: absolute;
    right: 136px;
    left: 0;
  }
  .leave-message-wrapper .lm-input-wrapper .input-core {
    height: 60px;
    background: #fcfcfc;
    border: none;
    outline: none;
    border-radius: 8px;
    padding: 0 28px;
    font-size: 28px; /*px*/
    color: #434343;
    width: 100%;
    box-sizing: border-box;
  }
  .leave-message-wrapper .lm-input-wrapper .confirm {
    height: 60px;
    width: 122px;
    text-align: center;
    background: #009983;
    border: none;
    border-radius: 8px;
    font-size: 28px; /*px*/
    color: #ffffff;
    position: absolute;
    right: 0;
  }
  .leave-message-wrapper .lm-input-wrapper .input .clear {
    width: 44px;
    height: 44px;
    background: url("../../../../static/image/input-clear.png") no-repeat;
    background-size: 100% 100%;
    display: inline-block;
    position: absolute;
    top: 8px;
    right: 14px;
  }

  .leave-message-wrapper .lm-history-wrapper {
    margin-top: 16px;
    display: block;
    position: relative;
    bottom: 0;
  }
  .leave-message-wrapper .lm-history-wrapper .item {
    margin-top: 12px;
    float: left;
    min-width: 130px;
    color: #009983;
    font-size: 28px; /*px*/
    text-align: center;
    background: #fcfcfc;
    border: 1px solid #009983; /*no*/
    border-radius: 48px;
    height: 48px;
    line-height: 48px;
    margin-left: 24px;
    box-sizing: border-box;
    padding-left: 30px;
    padding-right: 30px;
  }
  .leave-message-wrapper .lm-history-wrapper .item.disable {
    border: none;
    color: #959595;
  }
  .leave-message-wrapper .lm-history-wrapper .item:first-child {
    margin-left: 0px;
  }
</style>

<script type="text/babel">
  import {mapActions} from 'vuex'

  export default {
    data() {
      return {
        target: null,
        message: '',
        list: [],
        show: false,
        inputFocus: false
      };
    },
    directives: {
      focus: {
        update: function (el, {value}) {
          if (value) {
            el.focus()
          }
        }
      }
    },
    methods: {
      ...mapActions([
        'updateMsg'
      ]),
      appendMessage (value) {
        this.message = value;
      },
      doOpen (message) {
        this.show = true;
        if (message) {
          this.message = message
        }
        this.inputFocus = true
      },
      setTarget(target) {
         this.target = target;
         return this;
      },
      open(message) {
        if (!this.target['_fast_message_']) {
          this.$api.productFastMessage({
            productId: this.target['id']
          }).then((rets) => {
            this.list = rets;
            this.target['_fast_message_'] = rets;
            this.doOpen(message);
          })
        } else {
          this.list = this.target['_fast_message_'];
          this.doOpen(message);
        }
      },
      close() {
        this.show = false;
      },
      confirm() {
        this.close();
        this.updateMsg({
          msg: this.message,
          item: this.target
        }).then(() => {
          this.message =  ''
        })
      }
    }
  };
</script>
