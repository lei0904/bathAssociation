<template>
  <div id="store_info">
    <Header :text="'店铺信息'" ></Header>
    <div class="main">
      <div>{{detail.marketName}}</div>
      <div>{{detail.address}}</div>
      <div>{{detail.managerPhone}}</div>
    </div>
    <div class="auth">
      <div class="left">供货商资质</div>
      <div class="right" v-show="detail.certStatus == 0">未认证</div>
      <div class="right" v-show="detail.certStatus == 1">认证中</div>
      <div class="right" v-show="detail.certStatus == 2">已认证</div>
      <div class="right" v-show="detail.certStatus == 3">认证失败</div>
    </div>
    <div class="info">
      <div class="info_item clearfix">
        <div class="left">接单时间</div>
        <div class="right">{{detail.businessTime || '全天'}}</div>
      </div>
      <div class="info_item clearfix">
        <div class="left">信誉评价</div>
        <div class="right" @click="to_evaluate()">98%好评率</div>
      </div>
      <div class="info_item clearfix">
        <div class="left">成交量</div>
        <div class="right">{{detail.orderCount}}单</div>
      </div>
      <div class="info_item clearfix">
        <div class="left">主营类目</div>
        <div class="right">{{detail.description}}</div>
      </div>
    </div>
    <div class="text">
      <div class="head">店铺简介</div>
      <div class="detail">{{detail.name}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'StoreInfo',
    data: function () {
      return {
        detail:{}
      }
    },
    methods: {
      to_evaluate(){
          this.$router.push('/store_evaluate')
      }

    },
    activated(){
      this.detail  = JSON.parse(sessionStorage.getItem('storeInfo'))
      console.log(this.detail)
    }
  }
</script>
<style lang="scss">
    #store_info{
      .main{
        background: #eeeeee;
        div{
          background: #fff;
          color: #434343;
          font-size: 30px;/*px*/
          height: 98px;
          line-height: 98px;
          margin-bottom: 1px;/*no*/
          text-indent: 86px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        div:nth-child(1){
          background: #fff url(../../../static/image/stote_icon2.png) no-repeat 34px center / 30px 28px;
        }
        div:nth-child(2){
          background: #fff url(../../../static/image/address_icon.png) no-repeat 34px center / 30px 39px;
        }
        div:nth-child(3){
          background: #fff url(../../../static/image/tel_icon.png) no-repeat 34px center / 28px 28px;
        }
      }
      .auth{
        height: 98px;
        line-height: 98px;
        font-size: 30px;/*px*/
        color: #434343;
        background: #ffffff;
        margin-top: 20px;
        .left{
          float: left;
          margin-left: 34px;
        }
        .right{
          float: right;
          color: #3eb049;
          margin-right: 50px;
        }
      }
      .info{
        background: #fff;
        margin-top: 20px;
        .info_item{
          width: 100%;
          color: #434343;
          font-size: 30px;/*px*/
          height: 30px;
          line-height: 30px;
          margin-bottom: 30px;
          .left{
            float: left;
            margin-left: 34px;
          }
          .right{
            float: right;
            margin-right: 50px;
            max-width: 500px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .info_item:nth-child(1){
          margin-top: 30px;
        }
        .info_item:nth-child(2){
          background: #fff url(../../../static/image/arrow-right.png) no-repeat 707px center / 22px 34px;
        }
      }
      .text{
        font-size: 30px;/*px*/
        margin-top: 20px;
        background: #eeeeee;
        .head{
          background: #fff;
          color: #434343;
          height: 98px;
          line-height: 80px;
          margin-bottom: 1px;/*no*/
          padding: 0 50px 0 34px;
        }
        .detail{
          background: #fff;
          color: #959595;
          padding: 0 50px 0 34px;
          height: 200px;
          line-height: 70px;
        }
      }
    }
</style>
