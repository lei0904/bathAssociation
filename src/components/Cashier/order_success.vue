<template>
  <div id="order_success">
    <Header :text="'下单成功'"></Header>
    <div class="container overflow">
      <section class="info">
        <img src="../../../static/image/order_success_txt.png" class="txt-tip">
        <div class="price" v-if="is_online_pay">在线支付: <span class="p">20元</span></div>
        <div class="money" v-if="is_online_pay">使用上次结余: 10元</div>
      </section>
      <section class="btn">
        <div class="tip">我们会尽快处理您的订单</div>
        <mt-button @click.native="pay">查看订单</mt-button>
      </section>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'OrderSuccess',

    data () {
      return {
        is_online_pay: false
      }
    },
    methods:{
       pay(){
           this.$router.push("/order_list")
       }
     },
    activated () {
      let is_online_pay = this.$route.params['is_online_pay'];
      if (is_online_pay === '1') {
        this.is_online_pay = true;
      } else {
        this.is_online_pay = false;
      }
    }
  }
</script>
<style lang="scss">
  #order_success .container {
    background: #ffffff;
    text-align: center;
  }
  #order_success .txt-tip {
    width: 260px;
    height: 60px;
    margin-top: 186px;
  }
  #order_success .info .price {
    margin-top: 56px;
    color: #434343;
    font-size: 40px; /*px*/
  }
  #order_success .info .price .p {
    color: #ff0000;
  }
  #order_success .info .money {
    margin-top: 20px;
    color: #898989;
    font-size: 30px; /*px*/
  }
  #order_success .btn {
    margin-top: 206px;
    padding-left: 75px;
    padding-right: 75px;
    box-sizing: border-box;
  }
  #order_success .btn .mint-button--default {
    width: 100%;
    height: 78px;
    line-height: 78px;
  }
  #order_success .btn .mint-button--default .mint-button-text{
    font-size: 30px; /*px*/
    color: #ffffff;
  }
  #order_success .btn .tip {
    margin-bottom: 30px;
    color: #626262;
    font-size: 30px; /*px*/
  }
</style>
