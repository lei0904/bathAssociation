<template>
  <div id="apply_audit">
    <Header :text="''" :actionable="true" @action="tel" :explain="'联系商家'"></Header>
    <div class="top_1">会员申请中</div>
    <div class="top_2">{{title}}</div>
    <div class="top_4">商家正在审核您的申请</div>
    <div class="top_5">申请通过后可享受商家服务</div>

    <!--<mt-button type="default">关闭</mt-button>-->
    <LogoBottom></LogoBottom>
  </div>
</template>
<script>
  import LogoBottom from './logo_bottom.vue'

  export default {
    name: 'ApplyAudit',
    components: {
      LogoBottom
    },
    data(){
      return{
        checked:'1',
        phone:'',
        title:''
      }
    },
    methods:{
      tel(){
        window.location.href = 'tel://' + this.phone;
      },
      select(m){
        this.checked = m;
      }
    },
    activated: function () {
      this.title = JSON.parse(sessionStorage.getItem('storeInfo')).marketName;
      this.phone = JSON.parse(sessionStorage.getItem('storeInfo')).managerPhone;
    }
  }
</script>
<style lang="scss">
  #apply_audit{
    text-align: center;
    min-height: 100vh;
    background: #fff;
    .header:after{
      display: none;
    }
    .header{
      background: #fff;
    }
    .action{
      color: #434343;
      font-size: 30px;/*px*/
      padding-left: 47px;
      background: url(../../../static/image/tel.png) no-repeat left / 29px 29px;
    }
    .top_1{
      height: 38px;
      line-height: 38px;
      margin-top: 186px;
      color: #626262;
      font-size: 38px;/*px*/
    }
    .top_2{
      margin-top: 38px;
      height: 44px;
      line-height: 44px;
      color: #313131;
      font-size: 44px;/*px*/
      font-weight: bold;
    }
    .top_3{
      color: #313131;
      height: 34px;
      line-height: 34px;
      margin-top: 26px;
      font-size: 34px;/*px*/
    }
    .top_4{
      color: #626262;
      height: 34px;
      line-height: 34px;
      margin-top: 150px;
      font-size: 34px;/*px*/
    }
    .top_5{
      color: #626262;
      height: 34px;
      line-height: 34px;
      margin-top: 10px;
      font-size: 34px;/*px*/
    }
    .bottom-area{
      position: absolute;
      bottom: 0;
      width: 100%;
    }
    .register-form-hobby {
      height: 78px;
      line-height: 78px;
      font-size: 28px;
      width: 610px;
      margin: 116px auto 0;
      padding: 0 75px;
      .name {
        color: #313131;
        float: left;
        padding-right: 30px;
      }
      .box {
        color: #626262;
        float: right;
        width: 220px;
        text-align: center;
        border: 1px solid #dcdcdc; /*no*/
        box-sizing: content-box;
      }
      .checked {
        color: #3eb049;
        float: right;
        border: 1px solid #3eb049; /*no*/
        box-sizing: content-box;
        background: url(../../../static/image/checked_2.png) no-repeat right bottom / 58px 49px;
      }
    }
    .mint-button{
      width: 510px;
      margin: 260px auto 0;
      .mint-button-text{
        font-size: 30px;/*px*/
        color: #fff;
      }
    }
  }
</style>
