<template>
  <div id="applying">
    <Header :text="''" :actionable="true" @action="tel" :explain="'联系商家'"></Header>
    <div class="top_1">您可以向</div>
    <div class="top_2">{{title}}</div>
    <div class="top_3">申请会员</div>
    <div class="top_4">申请通过后可享受商家服务</div>
    <!--<div class="register-form-hobby clearfix">-->
      <!--<div class="name">采购偏好</div>-->
      <!--<div class="box" :class="[checked == 2 ? 'checked':'' ]"  @click="select(2)">只看清真商品</div>-->
      <!--<div class="box" :class="[checked == 1 ? 'checked':'' ]"  @click="select(1)">查看全部商品</div>-->
    <!--</div>-->
    <mt-button type="default" @click.native="apply()">申请</mt-button>
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
//          console.log(this.phone);
          window.location.href = 'tel://' + this.phone;
        },
        select(m){
          this.checked = m;
        },
        apply(){
          let _this = this;
          this.$api.applyBinding({
            "token":sessionStorage.getItem("token")
          }).then((rets) => {
            if (rets.success){
              _this.$router.push('/apply_audit')
            }
          })
        }
    },
    activated: function () {
      this.title = JSON.parse(sessionStorage.getItem('storeInfo')).marketName;
      this.phone = JSON.parse(sessionStorage.getItem('storeInfo')).managerPhone;
    }
  }
</script>
<style lang="scss">
  #applying{
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
      margin-top: 86px;
      font-size: 34px;/*px*/
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
      margin: 68px auto 0;
      .mint-button-text{
        font-size: 30px;/*px*/
        color: #fff;
      }
    }
  }
</style>
