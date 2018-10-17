<template>
  <div id="refund_channel">
    <Header :text="'退款去向'"></Header>
    <div class="express_head">
      <div class="text">退款渠道：{{detail.refundPayChannel}}</div>
      <div class="text">退款金额：{{detail.refundPrice}}</div>
    </div>

    <div class="bacfff">
      <div class="express_info">
        <div class="info" v-for="item in detail.nodeList">
          <div class="text">{{item.title}}<i></i></div>
          <div class="date">{{item.nodeTime}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'refundChannel',
    data:function () {
      return{
       detail:{}
      }
    },
    methods:{
      refundDetails(id){
        let _this = this;
        this.$api.refundDetails({
          "id":id
        }).then((rets) => {
          _this.detail = rets;
        })
      }
    },
    activated(){
      let id = sessionStorage.getItem("jmtNo");
      this.refundDetails(id)
    }
  }
</script>
<style lang="scss">
  #refund_channel{
    background: #efefef;
    height: 100vh;
    width: 100%;
    overflow-y: scroll;
    .bacfff{
      background: #ffffff;
    }
    .express_head{
      background: #fff;
      margin-bottom: 10px;
      .text{
        padding:0 34px;
        height: 98px;
        line-height: 98px;
        font-size: 30px;/*px*/
        color: #434343;
        border-top: 1px solid #efefef;/*no*/
      }
    }
    .express_phone{
      padding:0 64px 0 34px;
      height: 158px;
      width: 652px;
      background: #fff;
      margin-top: 20px;
      font-size: 30px;/*px*/
      color: #434343;
      .left{
        float: left;
        line-height: 158px;
        i{
          display: inline-block;
          width: 65px;
          height: 65px;
          background: url(../../../static/image/express_car.png) no-repeat center / 100% 100%;
          vertical-align: middle;
          margin-right: 30px;
        }
      }
      .right{
        float: right;
        padding-left: 56px;
        height: 100px;
        border-left: 1px solid #efefef;/*no*/
        margin-top: 29px;
        line-height: 100px;
        i{
          display: inline-block;
          width: 47px;
          height: 47px;
          background: url(../../../static/image/express_phone.png) no-repeat center / 100% 100%;
          vertical-align: middle;
          margin-right: 18px;
          position: relative;
          top:-5px;
        }
      }
    }
    .express_info{
      padding: 56px 50px 40px 0;
      margin-left: 50px;
      width: 650px;
      background: #fff;
      .info{
        padding:0 130px 70px 60px;
        color: #898989;
        border-left: 2px solid #d2d2d2;/*no*/
        .text{
          font-size: 28px;/*px*/
          line-height: 40px;
        }
        .text:first-child{
          position: relative;
          i{
            display: inline-block;
            position: absolute;
            width: 22px;
            height: 22px;
            background: url(../../../static/image/express_0.png) no-repeat center / 100% 100%;
            left:-74px;
            top:1px;
          }
        }
        .date{
          font-size: 22px;/*px*/
          margin-top: 18px;
        }
      }
      .info:last-child{
        padding-bottom: 0;
        border: 0 none;
        border-left: 2px solid #fff;/*no*/
      }
      .info:first-child{
        .text{
          color: #3eb049;
        }
        .text:first-child{
          position: relative;
          i{
            background: url(../../../static/image/express_1.png) no-repeat center / 100% 100%;
            left:-83px;
            top:-10px;
            width: 42px;
            height: 42px;
          }
        }
      }
    }
    .express_bottom{
      margin-top: 20px;
      padding: 40px 34px;
      background: #fff;
      .text{
        margin-bottom: 40px;
        color: #434343;
        font-size: 30px;/*px*/
        line-height: 60px;
        span{
          color: #5f749f;
          margin-left: 46px;
        }
      }
      .text:last-child{
        margin-bottom: 0;
      }
    }
  }
</style>
