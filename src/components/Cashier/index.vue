<template>
  <div id="cashier">
    <Header :text="'收银台'" :handle="true" @back="back"></Header>
    <div class="container overflow">
      <section class="info">
        <div class="line clearfix">
          <span class="left">收银流水号</span>
          <span class="right">{{pay.title}}</span>
        </div>
        <div class="line clearfix">
          <span class="left">需支付</span>
          <span class="right price">{{pay.payOnlineTotalValue}}元</span>
        </div>
      </section>
      <section class="way mt20">
        <div class="line wallet">
          <span class="left way_icon wallet">{{pay.walletsTitle}}</span>
          <span class="right"><span v-show="pay.payWalletValue">-</span>{{pay.payWalletValue}}</span>
        </div>
        <div class="line" v-for="item in pay.payWay" @click="toSelectPayWay(item)">
          <span class="left way_icon" :class="item.code == 'alipay' ? 'alipay' : 'wechat'">{{item.name}}</span>
          <span class="right">
            <div class="checkbox-label">
                <input type="checkbox" readonly class="checkbox-core" :checked="selectPayWay.id == item.id ? true : false">
                <span class="checkbox-view"></span>
            </div>
          </span>
        </div>
        <div id = "aliPay" style="display: none"></div>
        <!--<div class="line" @click="way = 1">
          <span class="left way_icon alipay">支付宝</span>
          <span class="right">
            <label class="checkbox-label">
                <input type="checkbox" class="checkbox-core" :checked="way == 1 ? true : false">
                <span class="checkbox-view"></span>
              </label>
          </span>
        </div>
        <div class="line" @click="way = 2">
          <span class="left way_icon wechat">微信</span>
          <span class="right">
            <label class="checkbox-label">
                <input type="checkbox" class="checkbox-core" :checked="way == 2 ? true : false">
                <span class="checkbox-view"></span>
              </label>
          </span>
        </div>-->
      </section>

      <section class="btn">
        <mt-button @click.native="submitPay">确认支付</mt-button>
      </section>

    </div>
  </div>
</template>
<script>
  import InputDialog from '../Dialogs/InputDialog/index.js'
  export default {
    name: 'Cashier',
    data() {
      return {
        orderId: '',
        orderNo: '',
        pay: {},
        selectPayWay: {}
      }
    },
    methods: {
      toSelectPayWay(item) {
        if (this.pay.payOnlineValue <= 0) {
          this.$utils.toast('无需线上支付');
          return;
        }
        this.selectPayWay = item;
      },
      back() {
        let _this = this;
        InputDialog.confirm('<div class="cashier-back-tip"><div>您尚未完成订单支付，</div><div>是否放弃支付？</div></div>', '', {
          confirmButtonText: '继续支付',
          cancelButtonText: '放弃',
          callback (action) {
            if (action !== 'confirm') {
              _this.$router.replace('/order_List');
            }
          }
        })
      },
      submitPay () {
        if (!this.pay || !this.pay.title) {
          this.$utils.toast('数据异常');
          return;
        }
        if (this.pay.payOnlineValue <= 0) { //直接钱包支付
          this.$api.orderWalletPaid({
            "orderId": this.orderId,
            "payCntType": this.pay.payCntType,
            "payWalletValue": this.pay.payWalletValue
          }).then((rets) => {
            if (rets['orderId']) {
              this.$router.replace('/pay_success/' + rets['paid'])
            }
          })
        } else { //第三方支付
          if (!this.selectPayWay || !this.selectPayWay.code) {
            this.$utils.toast('请选择支付方式');
            return;
          }

          if (this.pay.payWalletValue <= 0) { //全部第三方支付
            if (this.selectPayWay.code === 'alipay') { //支付宝
              this.$api.paymentAlipay({
                orderNumber: this.orderNo
              }).then((rets) => {
                let x = rets.html;
                let temp = document.getElementById("aliPay");
                temp.innerHTML = x
                eval(document.forms['alipaysubmit'].submit())
              })
            } else if (this.selectPayWay.code === 'weChat') { //微信
              this.$api.paymentWeChat({
                orderNumber: this.orderNo
              }).then((rets) => {
                let x = rets.html.replace('<script>', '').replace('<\/script>', '');
                eval(x)
              })
            }
          } else { //混合支付

          }
        }
        // this.$router.push('/order_success')
      }
    },
    activated () {
      this.orderId = this.$route.params['orderId'];
      this.orderNo = this.$route.params['orderNo'];
      this.$api.paymentWay({
        "orderId" : this.orderId
      }).then((rets) => {
        this.pay = rets;
      });
    }
  }
</script>
<style lang="scss">
.cashier-back-tip {
  padding-top: 90px;
  padding-bottom: 70px;
  color: #434343;
  font-size: 32px; /*px*/
}

#cashier .btn {
  width: 100%;
  position: absolute;
  bottom: 60px;
  text-align: center;
  padding-left: 75px;
  padding-right: 75px;
  box-sizing: border-box;
}
#cashier .btn .mint-button--default {
  width: 100%;
  height: 78px;
  line-height: 78px;
}
#cashier .btn .mint-button--default .mint-button-text{
  font-size: 32px; /*px*/
  color: #ffffff;
}
#cashier .way .line {
  height: 128px;
  line-height: 128px;
  box-sizing: border-box;
  padding-left: 34px;
  padding-right: 34px;
  font-size: 30px;
  color: #434343;
  display: block;
  background: #ffffff;
  border-top: 1px solid $border; /*no*/
}
#cashier .way .line:first-child {
  border-top: none;
}
#cashier .way .line.wallet {
  background: #F3F4F7;
}

#cashier .way .line .way_icon {
  padding-left: 88px;
}
#cashier .way .line .way_icon.wallet {
  background: url("../../../static/image/way/wallet.png") no-repeat center left;
  background-size: 60px 60px;
}
#cashier .way .line .way_icon.alipay {
  background: url("../../../static/image/way/alipay.png") no-repeat center left;
  background-size: 60px 60px;
}
#cashier .way .line .way_icon.wechat {
  background: url("../../../static/image/way/wechat.png") no-repeat center left;
  background-size: 60px 60px;
}

#cashier .info .line {
  height: 98px;
  line-height: 98px;
  box-sizing: border-box;
  padding-left: 34px;
  padding-right: 34px;
  font-size: 30px;
  color: #434343;
  display: block;
  background: #ffffff;
  border-top: 1px solid $border; /*no*/
}
#cashier .info .line:first-child {
  border-top: none;
}
#cashier .line .left {
  float: left;
}
#cashier .line .right {
  float: right;
}

#cashier .info .price {
  color: #ff0000;
}
</style>
