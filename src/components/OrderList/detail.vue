<template>
  <div id="order_detail">
    <Header :text="'订单详情'"></Header>
    <div class="head">
      <span class="left">订单号：{{detail.orderNo}}</span>
      <span class="right">交货码：<span>{{detail.inspectCode}}</span></span>
    </div>
    <div class="step">
      <span class="item"
            :class="{'focus_on':item.activity, 'focus':item.enabled}"
            v-for="item in detail.purchaseStatusNodes">
        <span class="text">{{item.statusTitle}}</span>
      </span>

    </div>
    <div class="info">
      <div class="info_text">
        <span class="title space">配&nbsp&nbsp送&nbsp&nbsp方：</span>
        <span class="content">{{detail.distributionTitle}}</span>
      </div>
      <div class="info_text">
        <span class="title">配送人员：</span>
        <span class="content">{{detail.merName}}<span class="ext">{{detail.merAccount}}</span></span>
      </div>
      <div class="info_text">
        <span class="title">配送时间：</span>
        <span class="content">{{detail.estimateMessage}}</span>
      </div>
      <div class="info_button clearfix">
        <mt-button
          v-for="items in detail.buyerButton"
          :key = "items.code"
          size="small"
          :type="items.code == 'BuyerCancelOrder'?'default':'primary'"
          @click.native="buttonClick(items.code , detail.id , detail.orderNo)">{{items.title}}</mt-button>
      </div>
    </div>
    <div class="main">
      <div class="item" v-for="product in detail.productList">
        <!--<div class="title">-->
          <!--<span><i></i>{{product.storeName}}</span>-->
          <!--<i class="right_icon"></i>-->
        <!--</div>-->
        <div class="content clearfix">
          <img :src="product.productImgUrl">
          <div class="right_main">
            <div class="right_main_title">{{product.productTitle}}</div>
            <div class="right_main_price">{{product.productPriceUnit}}<i class="cu" v-show="product.promotionId"></i></div>
            <div class="right_main_box">
              <div class="box_title_1">
                <span>X{{product.productCount}} {{product.orderSumPrice}}元</span>
                <span v-show="product.promotionId">X{{product.productCount}} {{product.oldOrderSumPrice}}元</span>
              </div>
              <div class="box_button">
                <mt-button size="small" type="primary" @click.native="toTrace(product.id,product.productId,product.productImgUrl)">追溯</mt-button>
              </div>
            </div>
          </div>
        </div>
        <div class="icon" v-if="detail.merMsg"></div>
        <div class="message" v-if="detail.merMsg">
          <span>我的留言：</span>
          {{detail.merMsg}}
        </div>
      </div>
    </div>
    <!--<div class="more">查看其余23件商品<i></i></div>-->
    <div class="should_pay">
      <div class="text clearfix">
        <span class="first_line">应付</span>
        <span class="first_line_ext">{{detail.orderSumPrice}}元</span>
      </div>
      <div class="text clearfix">
        <span>贷款</span>
        <span>{{detail.productTotalPrice}}元</span>
      </div>
      <div class="text clearfix">
        <span>优惠券</span>
        <span>-{{detail.coupons}}元</span>
      </div>
      <div class="text clearfix">
        <span>实际差额</span>
        <span>-{{detail.productTotalPriceDiff}}元</span>
      </div>
      <div class="text clearfix">
        <span>减免退</span>
        <span>-{{detail.jmtPrice}}元</span>
      </div>
    </div>
    <div class="real_pay">
      <div class="text clearfix">
        <span class="first_line">实付</span>
        <span class="first_line_ext">{{detail.merFactPaidTotalPrice}}元</span>
      </div>
      <div class="text clearfix">
        <span>支付宝</span>
        <span>{{detail.aliPay}}元</span>
      </div>
      <div class="text clearfix">
        <span>微信</span>
        <span>{{detail.weChat}}元</span>
      </div>
      <div class="text clearfix">
        <span>退款</span>
        <span>{{detail.refundPrice}}元</span>
      </div>
    </div>
    <div class="balance">
      <span>使用上次结余</span>
      <span>{{detail.factWalletTotle}}元</span>
    </div>
    <div class="un_pay">
      <span>未付</span>
      <span>{{detail.bePayPrice}}元</span>
    </div>
    <div class="arrears">
      <span>本次欠款（计入钱包）</span>
      <span>{{detail.productTotalPriceDiff}}元</span>
    </div>
    <div class="payment">
      <span>支付方式</span>
      <span>{{detail.payType == '1' ? '货到付款':'预先支付'}}</span>
    </div>
    <div class="origin clearfix">
      <div>{{detail.wholeSaleMarketTitle}}</div>
      <div>下单时间：{{detail.placeOrderTime}}</div>
      <div>{{detail.source | source}}</div>
    </div>
    <div class="address clearfix">
      <div>收货人：{{detail.receiver}} <span class="ext">{{detail.receiverPhone}}</span></div>
      <div>收货地址：{{detail.receiverAddress}}</div>
    </div>
    <div class="bottom_ext"
         v-show="detail.purchaseStatus == '3' && detail.purchaseStatus == '4'">
      <i></i>如需修改配送地址，请联系客服
    </div>
    <!--<div class="bottom_box clearfix" v-if="detail.purchaseStatus == '1'">-->
      <!--<div class="cancel w50" @click="openCancel(detail.id)">取消订单</div>-->
      <!--<div class="confirm w50" @click="checkedReceive(detail.id,detail.orderNo)">确认收货</div>-->
    <!--</div>-->
    <div class="bottom_box clearfix" v-if="detail.purchaseStatus == '3' || detail.purchaseStatus == '4'">
      <div class="confirm" @click="checkedReceive(detail.id,detail.orderNo)">确认收货</div>
    </div>
    <div class="bottom_box clearfix" v-if="detail.purchaseStatus == '1'">
      <div class="cancel" @click="openCancel(detail.id)">取消订单</div>
    </div>
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
  </div>
</template>
<script>
  import MessageDialog from '../Dialogs/MessageDialog/index.js'
  import {mapActions, mapState, mapGetters} from 'vuex'
  export default {
    name: 'OrderDetail',
    data() {
      return {
        detail:{},
        sheetVisible:false,
        actions: [],
        id:''
      };
    },
    mounted() {
      this.actions = [{
        name: '订错货了',
        method: this.orderCancel('订错货了')
      }, {
        name: '不想要了',
        method: this.orderCancel('不想要了')
      }];
    },
    methods:{
      ...mapActions([
        'loadShopCart'
      ]),
      checkedReceive(id,No){
        let _this = this;
        this.$api.checkedReceive({
          "orderId": id
        }).then((rets) => {
         if (rets.type === 0){
           MessageDialog.confirm('', {
             title: '',
             message:'您以支付本订单，<br>请确认收货后在点击确认收货',
             confirmButtonText:'确认收货'
           }).then(action => {
             _this.confirmReceive(id);
           });
         }else{
          MessageDialog.confirm('', {
            title: '',
            message:'您还有未支付钱款，<br>是否去支付？',
            confirmButtonText:'去支付'
          }).then(action => {
            this.$router.push('/cashier/' + id + '/' + No )
          });
         }
        })

      },
      openCancel:function (id) {
        this.id = id;
        this.sheetVisible = true;
      },
      confirmReceive(id){
        let _this = this;
        this.$api.confirmReceive({
          "orderId": id,
        }).then((rets) => {
            if (rets.success){
              _this.$router.back()
            }
        })
      },
      orderCancel(reason){
        let _this = this;
        return function () {
          _this.$api.orderCancel({
            "orderId": _this.id,
            "reason":reason
          }).then((rets) => {
            console.log(rets)
          })
        }

      },
      toTrace:function (id,productId,img) {
        sessionStorage.setItem("trackId",id);
        sessionStorage.setItem("productId",productId);
        sessionStorage.setItem("productIdImg",img);
        this.$router.push("/trace")
      },
      toExpress:function () {
        this.$router.push("/express")
      },
      getDetail(id){
        let _this = this;
        this.$api.getDetail({
          "orderId": id,
        }).then((rets) => {
          _this.detail = rets;
        })
      },
      buttonClick(code , id , orderNo){
        if (code === 'BuyerOrderTrack'){//BuyerOrderTrack : 订单跟踪
          sessionStorage.setItem("orderId",id);
          this.$router.push("/express")
        }else if(code === "BuyerCancelOrder"){//BuyerCancelOrder : 取消订单
          this.id = id;
          this.sheetVisible = true
        }else if(code === "BuyerPay"){//BuyerPay : 支付
          this.$router.push('/cashier/' + id + '/' + orderNo )
        }else if(code === "BuyerReceiveGoods"){//BuyerReceiveGoods : 确认收货
          this.checkedReceive(id,orderNo)
        }else if(code === "BuyerComment"){//BuyerComment : 评价
          sessionStorage.setItem("orderId",id);
          this.$router.push("/evaluate")
        }else if(code === "BuyerAgain"){//BuyerAgain : 再来一单
          let _this = this;
          _this.$api.carAgain({
            "orderId": id
          }).then((rets) => {
            if(rets.success){
              _this.loadShopCart();
              sessionStorage.setItem('navSelected','shopping_cart');
              _this.$router.push('/nav')
            }
          })
        }
      }
    },
    activated(){
      this.id = sessionStorage.getItem("orderId");
      this.getDetail(this.id)
    },
    filters: {
      source: function (value) {
        if (value === 0){
          return "线上订单"
        }
        else if(value === 1){
          return "线下订单"
        }
        else if(value === 2){
          return "现场订单"
        }
        else if(value === 3){
          return "e批小店"
        }
        else{
          return value
        }
      }
    }
  }
</script>
<style lang="scss">
  .clearfix:after {
    content: "\0020";
    display: block;
    height: 0;
    clear: both;
  }
  .clearfix {
    zoom: 1;
  }
  #order_detail{
    background: #efefef;
    width: 100%;
    height: 100vh;
    overflow: auto;
    .header{
      position: fixed;
      width: 100%;
    }
    .head{
      margin-top: 90px;
      height: 80px;
      line-height: 80px;
      color: #313131;
      .left{
        font-size: 32px;/*px*/
        float: left;
        margin-left: 34px;
      }
      .right{
        font-size: 28px;
        float: right;
        margin-right: 34px;
        span{
          color: #3eb049;
        }
      }
    }
    .step{
      height: 138px;
      width: 695px;
      background: #fff;
      padding: 62px 0 0 55px;
      .item{
        display: inline-block;
        background: url(../../../static/image/focus_2.png) no-repeat center / 100% 100%;
        width: 25px;
        height: 25px;
        margin-right: 120px;
        position: relative;
        .text{
          position: absolute;
          display: inline-block;
          width: 150px;
          text-align: center;
          bottom: -60px;
          left:-75px;
          font-size: 28px;/*px*/
          color: #aaaaaa;
        }
        .text:first-child{
          left:-55px;
        }
      }
      .focus{
        display: inline-block;
        background: url(../../../static/image/focus_0.png) no-repeat center / 100% 100%;
        width: 25px;
        height: 25px;
        margin-right: 120px;
        position: relative;
        .text{
          position: absolute;
          display: inline-block;
          width: 150px;
          text-align: center;
          bottom: -60px;
          left:-75px;
          font-size: 28px;/*px*/
          color: #313131;
        }
      }
      .focus_on{
        display: inline-block;
        background: url(../../../static/image/focus_1.png) no-repeat center / 100% 100%;
        width: 45px;
        height: 45px;
        margin:-10px 110px -10px -10px;
        position: relative;
        top:-10px;
        .text{
          bottom: -50px;
          color: #313131;
        }
      }
      .item:after{
        content:'';
        width: 130px;
        height: 4px;
        background: #dcdcdc;
        display: inline-block;
        margin-left: 25px;
        vertical-align: middle;
      }
      .focus:after{
        background: #41a849;
      }
      .focus_on:after{
        margin-left: 35px;
        top:10px;
        position: relative;
        background: #dcdcdc;
      }
      .item:last-child{
        margin-right: 0 !important;
      }
      .item:last-child:after{
        width: 0 !important;
      }
    }
    .info{
      height: 260px;
      background: #fff;
      padding: 40px 34px 0;
      margin-top: 20px;
      .info_text{
        font-size: 30px;/*px*/
        line-height: 30px;
        color: #959595;
        margin-bottom: 40px;
        .title{
          text-align: center;
          width: 150px;
          margin-right: 10px;
        }
        .content{
          color: #434343;
          .ext{
            margin-left: 44px;
            color: #5f749f;
          }
        }
      }
      .info_button{
        margin-top: -30px;
        width: 682px;
        button{
          float: right;
          min-width: 158px;
          height: 62px;
          background: #fff;
          margin-right: 20px;
          .mint-button-text{
            font-size: 26px;/*px*/
            color: #535353;
          }
        }
        .mint-button--primary{
          background: #3eb049;
          .mint-button-text{
            color: #fff;
          }
        }
      }
    }
    .main{
      margin-top: 20px;
      background: #ffffff;
      .title{
        height: 86px;
        padding: 0 34px;
        line-height: 86px;
        border-bottom: 1px solid #efefef;/*no*/
        span{
          font-size: 32px;/*px*/
          i{
            width: 37px;
            height: 34px;
            display: inline-block;
            background: url(../../../static/image/store_icon.png) no-repeat center / 100% 100%;
            vertical-align: text-bottom;
            margin-right: 18px;
          }
        }
        .right_icon{
          width: 13px;
          height: 23px;
          display: inline-block;
          vertical-align: middle;
          background: url(../../../static/image/right_icon.png) no-repeat center / 100% 100%;
          float: right;
          margin-top: 31px;
        }
      }
      .content{
        padding: 36px 34px 16px;
        img{
          width: 146px;
          height: 146px;
          float: left;
        }
        .right_main{
          margin-left: 24px;
          float: left;
          width: 510px;
          .right_main_title{
            font-size: 32px;/*px*/
            color: #313131;
          }
          .right_main_price{
            margin-top: 16px;
            font-size: 30px;/*px*/
            color: #ff0000;
            .cu{
              display: inline-block;
              width: 30px;
              height: 30px;
              background: url(../../../static/image/cu.png) no-repeat center / 100% 100%;
              margin-left: 30px;
              vertical-align: middle;
            }
          }
          .right_main_box{
            margin-top: 20px;
            .box_title_1{
              width: 50%;
              float: left;
              span{
                font-size: 26px;/*px*/
                color: #959595;
                text-decoration: line-through;
                margin-bottom: 13px;
                display: block;
                height: 25px;
              }
              span:first-child{
                color: #313131;
                text-decoration: none;
              }
            }
            .box_button{
              width: 50%;
              float: left;
              button{
                width: 158px;
                height: 62px;
                line-height: 62px;
                float: right;
                background: #fff;
                .mint-button-text{
                  color: #3eb049;
                }
              }
            }
          }
        }
      }
      .icon{
        height: 20px;
        background: url(../../../static/image/top_arrow.png) no-repeat 34px 7px / 24px 14px;
      }
      .message{
        font-size: 26px;/*px*/
        line-height: 54px;
        background: #f3f4f7;
        padding: 12px 34px 18px;
        span{
          color: #959595;
        }
      }
    }
    .more{
      height: 82px;
      text-align: center;
      background: #fff;
      line-height: 82px;
      margin-top: 20px;
      i{
        display: inline-block;
        width: 15px;
        height: 9px;
        margin-left: 18px;
        background: url(../../../static/image/more_icon.png) no-repeat center / 100% 100%;
        vertical-align: middle;
      }
    }
    .should_pay{
      margin-top: 20px;
      padding-top: 40px;
      background: #ffffff;
      border-bottom: 1px solid #efefef;/*no*/
      .text{
        font-size: 30px;/*px*/
        color: #959595;
        margin-bottom: 40px;
        padding: 0 34px;
        width: 682px;
        span{
          float: right;
        }
        span:first-child{
          float: left;
        }
        .first_line{
          color: #313131;
        }
        .first_line_ext{
          color: #ff0000;
        }
      }
    }
    .real_pay{
      padding-top: 40px;
      background: #ffffff;
      border-bottom: 1px solid #efefef;/*no*/
      .text{
        font-size: 30px;/*px*/
        color: #959595;
        margin-bottom: 40px;
        padding: 0 34px;
        width: 682px;
        span{
          float: right;
        }
        span:first-child{
          float: left;
        }
        .first_line{
          color: #313131;
        }
        .first_line_ext{
          color: #313131;
        }
      }
    }
    .balance ,.arrears{
      background: #fafafa;
      height: 54px;
      line-height: 54px;
      font-size: 30px;/*px*/
      color: #626262;
      padding: 0 34px;
      span{
        float: right;
      }
      span:first-child{
        float: left;
      }
    }
    .un_pay ,.payment{
      background: #ffffff;
      height: 98px;
      line-height: 98px;
      font-size: 30px;/*px*/
      color: #626262;
      padding: 0 34px;
      span{
        float: right;
      }
      span:first-child{
        float: left;
      }
    }
    .origin{
      background: #fff;
      padding: 40px 34px 0;
      margin-top: 20px;
      width: 682px;
      border-bottom: 1px solid #efefef;
      div{
        color: #434343;
        font-size: 30px;/*px*/
        margin-bottom: 40px;
      }
    }
    .address{
      background: #fff;
      padding: 40px 34px 0;
      width: 682px;
      margin-bottom: 200px;
      div{
        color: #434343;
        font-size: 30px;/*px*/
        margin-bottom: 40px;
        .ext{
          color: #5f749f;
          margin-left: 50px;
          display: inline-block;
        }
      }
    }
    .bottom_ext{
      height: 50px;
      background: #fcefce;
      color: #b18b24;
      font-size: 24px;/*px*/
      text-align: center;
      line-height: 50px;
      position: fixed;
      bottom: 98px;
      left:0;
      width: 100%;
      i{
        width: 28px;
        height: 28px;
        background: url(../../../static/image/notice.png) no-repeat center / 100% 100%;
        display: inline-block;
        vertical-align: text-bottom;
        margin-right: 12px;
      }
    }
    .bottom_box{
      font-size: 32px;/*px*/
      height: 98px;
      line-height: 98px;
      text-align: center;
      width: 100%;
      position: fixed;
      bottom:0;
      left:0;
      .cancel{
        color: #434343;
        background: #ffffff;
        float: left;
        width: 100%;
      }
      .confirm{
        color: #ffffff;
        background: #41a849;
        float: left;
        width: 100%;
      }
      .w50{
        width: 50%;
      }
    }
  }
</style>
