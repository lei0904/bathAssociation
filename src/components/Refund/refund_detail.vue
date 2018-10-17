<template>
  <div id="refund_detail">
    <Header :text="'减免退详情'"></Header>
    <div class="detail">
      <div class="head">
        <div class="head_top">{{detail.jmtRefundStatusTitle}}</div>
        <!--<div class="head_top red">退款成功！</div>-->
        <div class="head_text">{{detail.jmtTypeTitle}}金额：{{detail.jmtPrice}}元</div>
        <div class="head_text" v-if="detail.refundDate">{{detail.jmtTypeTitle}}时间：{{detail.refundDate}}</div>
        <div class="head_text" v-if="detail.jmtRefundChannel">
          {{detail.jmtTypeTitle}}渠道：{{detail.jmtRefundChannelTitle}}
          <span class="ext" v-if="detail.jmtRefundStatus == 7" @click="toChannel()">查看退款去向<i></i></span>
        </div>
      </div>
      <div class="content">
        <div class="content_text" @click="tel(detail.jmtApplicantPhone)">发起方：{{detail.jmtApplicantName}}<i></i></div>
        <div class="content_text">减免退类型：{{detail.jmtSubType | jmtSubType}}</div>
        <div class="content_text">减免退金额：{{detail.jmtPrice}}元</div>
        <div class="content_text">退货数量：{{detail.jmtProductCount}}{{detail.productChargeUnit}}</div>
        <div class="content_text">减免退原因：{{detail.jmtAppleReasonTypeTitle}}</div>
        <!--<div class="content_text">责任方：供货商/配送中心</div>-->
        <div class="content_text">减免退编号：{{detail.jmtNo | jmtNo}}</div>
        <div class="content_text">申请时间：{{detail.jmtApplyDate}}</div>
      </div>
      <div class="bottom" v-if="detail.jmtAppleReasonDetails">
        <div class="bottom_text">退货说明</div>
        <div class="bottom_text">{{detail.jmtAppleReasonDetails}}</div>
      </div>
    </div>
    <div class="ext_button"  @click="toAllList(detail.productId)">查看本商品所有减免退</div>
  </div>
</template>
<script>
  import MessageDialog from '../Dialogs/MessageDialog/index.js'
  export default {
    name: 'OrderList',
    data() {
      return {
        detail:{}
      };
    },
    methods:{
      getJmtDetail(id){
        let _this = this;
        this.$api.jmtDetail({
          "id":id
        }).then((rets) => {
          _this.detail = rets;
        })
      },
      toAllList(productId){
        sessionStorage.setItem("productId",productId);
        this.$router.push('/refund')
      },
      toChannel(){
          this.$router.push('/refund_channel')
      },
      tel(tel){
        window.location.href = 'tel://' + tel;
      }
    },
    activated(){
      let id = sessionStorage.getItem("jmtNo");
      this.getJmtDetail(id)
    },
    filters: {
      jmtSubType: function (value) {
        if( value === 1 ){
          return "减免退";
        }else if( value === 2 ){
          return "退款退货";
        }else if(value === 3){
          return "仅退货";
        }

      },
      jmtNo: function (value) {
        let str = String(value);
        return str.substr(str.length-6)
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
  #refund_detail{
    min-height: 100vh;
    background: #efefef;
    .detail{
      background: #efefef;
      .head{
        margin: 20px 0 40px 0;
        background: #fff;
        padding: 0 35px 20px;
        .head_top{
          color: #313131;
          font-size: 58px;/*px*/
          padding-top: 40px;
          margin-bottom: 40px;
        }
        .red{
          color: #ff0000;
        }
        .head_text{
          color: #434343;
          font-size: 30px;/*px*/
          margin-bottom: 40px;
          .ext{
            float: right;
            font-size: 28px;/*px*/
            color: #3eb094;
            i{
              display: inline-block;
              width: 13px;
              height: 24px;
              background: url(../../../static/image/arrow_right_green.png) no-repeat center / 100% 100%;
              vertical-align: middle;
              margin-left: 10px;
            }
          }
        }
      }
      .content{
        padding: 0 35px ;
        background: #fff;
        margin-top: -20px;
        min-height: 582px;
        color: #434343;
        font-size: 30px;/*px*/
        .content_text{
          margin-bottom: 40px;
          i{
            display: inline-block;
            width: 36px;
            height: 36px;
            background: url(../../../static/image/icon_phone.png) no-repeat center / 100% 100%;
            vertical-align: text-bottom;
            margin-left: 20px;
          }
        }
        .content_text:first-child{
          padding-top: 40px;
        }
      }
      .bottom{
        padding: 0 35px ;
        background: #fff;
        margin-top: -20px;
        min-height: 176px;
        color: #434343;
        font-size: 30px;/*px*/
        .bottom_text{
          margin-bottom: 40px;
        }
        .bottom_text:first-child{
          padding-top: 40px;
        }
      }
    }
    .ext_button{
      height: 96px;
      position: fixed;
      left:0;
      bottom: 0;
      line-height: 96px;
      border-top: 1px solid #3eb049;/*no*/
      font-size: 32px;/*px*/
      color: #3eb049;
      background: #fff;
      width: 100%;
      text-align: center;
    }
  }
</style>
