<template>
  <div id="apply">
    <div class="top-area">
      <span class="apply-title">登录成功</span>

      <div class="apply-card">
        <span class="shop-name">{{title}}</span>
        <span class="tip">成为会员可享折扣价</span>
        <span class="info">已自动申请会员请等待商家同意</span>
        <span class="tel">联系商家</span>
      </div>

      <!--<mt-button size="large" @click.native="close">关闭</mt-button>-->
    </div>
    <LogoBottom></LogoBottom>
  </div>
</template>
<script>
  import LogoBottom from './logo_bottom.vue'

  export default {
    name: 'Apply',
    data: function () {
      return {
        title:''
      }
    },
    components: {
      LogoBottom
    },
    methods: {
      close () {
        this.$router.push('/perfect_info')
      }
    },
    activated: function () {
      this.title = JSON.parse(sessionStorage.getItem('storeInfo')).marketName;
      this.phone = JSON.parse(sessionStorage.getItem('storeInfo')).managerPhone;
    }
  }
</script>
<style lang="scss">
  #apply {
    text-align: center;
    height: 100vh;
    background: #f5f6f7;
    overflow: auto;
    -webkit-overflow-scrolling:touch;
  }
  #apply .top-area {
    padding-top: 108px;
    background: #ffffff;
    padding-bottom: 168px;
  }
  #apply .apply-title {
    font-size: 54px; /*px*/
    color: $btnBgColor;
    height: 70px;
    padding-left: 76px;
    background: url("../../../static/image/login_success_bg.png") no-repeat left center;
    background-size: 70px 70px;
    margin-left: -35px;
  }

  #apply .apply-card {
    height: 374px;
    position: relative;
    z-index: 10;
    margin: 134px 34px;
    background: url("../../../static/image/apply_card_bg.png") no-repeat;
    background-size: 100% 258px;
  }
  #apply .apply-card:after {
    content: " ";
    position: absolute;
    left: -1px;
    top: 0;
    z-index: -1;
    width: 200%;
    height: 200%;
    border: 1px solid $border; /*no*/
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scale(.5, .5);
    transform: scale(.5, .5);
    border-radius: 40px;
    box-shadow: 10px 10px 10px rgba(80, 78, 78, 0.1);
  }

  #apply .apply-card .shop-name {
    position: absolute;
    top: 68px;
    right: 54px;
    left: 0;
    color: #ffffff;
    font-size: 34px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  #apply .apply-card .tip {
    font-size: 26px;
    color: #ffffff;
    top: 130px;
    left: 54px;
    position: absolute;
  }
  #apply .apply-card .info {
    font-size: 24px;
    color: #ffffff;
    top: 200px;
    left: 54px;
    position: absolute;
  }
  #apply .apply-card .tel {
    font-size: 30px;
    color: #434343;
    bottom: 43px;
    left: 258px;
    position: absolute;
    background: url("../../../static/image/tel.png") no-repeat;
    background-size: 29px 29px;
    background-position: left center;
    padding-left: 47px;
  }

  #apply .mint-button.mint-button--default {
    width: 230px;
    height: 78px;
    margin: 0 auto;
  }
  #apply .mint-button.mint-button--default .mint-button-text{
    font-size: 30px;
    color: #3eb049;
  }
  #app #apply .mint-button.mint-button--default {
    background: #ffffff;
    /*box-shadow: 0.5px 0.5px 0.5px #3eb049;*/
    border-radius: 0px;
    border: 1px solid #3eb049;
    box-shadow: none;
  }
</style>
