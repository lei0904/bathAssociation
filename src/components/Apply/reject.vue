<template>
  <div id="apply_reject">
    <Header :text="''" :actionable="true" @action="tel" :explain="'联系商家'"></Header>
    <div class="reject">申请被拒</div>
    <div class="button_box">
      <mt-button type="primary">再想想</mt-button>
      <mt-button type="primary">重新申请</mt-button>
    </div>
    <LogoBottom></LogoBottom>
  </div>
</template>
<script>
  import LogoBottom from './logo_bottom.vue'

  export default {
    name: 'ApplyReject',
    components: {
      LogoBottom
    },
    data(){
      return{
        phone:''
      }
    },
    methods:{
      tel(){
        window.location.href = 'tel://' + this.phone;
      }
    },
    activated: function () {
      this.phone = JSON.parse(sessionStorage.getItem('storeInfo')).managerPhone;
    }
  }
</script>
<style lang="scss">
  #apply_reject {
    text-align: center;
    height: 100vh;
    background: #fff;
    overflow: auto;
    -webkit-overflow-scrolling:touch;
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
    .reject{
      height: 44px;
      line-height: 44px;
      color: #313131;
      font-size: 44px;/*px*/
      font-weight: bold;
      margin: 270px 0 0 ;
    }
    .button_box{
      margin: 430px 70px 0;
      .mint-button{
        width: 280px;
        height: 78px;
        background: #3eb049;
        padding: 0;
        float: left;
      }
      .mint-button:first-child{
        margin-right: 40px;
        background: #aaaaaa;
      }
    }
  }

</style>
