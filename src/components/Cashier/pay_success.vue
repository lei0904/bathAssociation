<template>
  <div id="pay_success">
    <Header :text="''"></Header>
    <div class="container">
      <section class="info">
        <span class="pay-tip">
          <img src="../../../static/image/pay_success_txt.png" class="txt-tip">
        </span>
        <div class="price">实付金额: <span class="p">{{paid}}元</span></div>
      </section>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'PaySuccess',

    data () {
      return {
        paid: 0
      }
    },

    activated () {
      let paid = this.$route.params['paid'];
      this.paid = paid;
    }
  }
</script>
<style lang="scss">
  #pay_success {
    overflow: auto;
  }
  #pay_success .container {
    background: #ffffff;
    text-align: center;
  }
  #pay_success .header {
    background: #ffffff;
  }
  #pay_success .header:after {
    display: none;
  }

  #pay_success .pay-tip {
    margin-top: 224px;
    display: inline-block;
    background: url("../../../static/image/pay_success_bg.png") no-repeat center left;
    background-size: 70px 70px;
    padding-left: 92px;
    height: 70px;
  }
  #pay_success .pay-tip .txt-tip {
    width: 260px;
    height: 60px;
    margin-top: 5px;
  }

  #pay_success .info .price {
    margin-top: 56px;
    color: #434343;
    font-size: 40px; /*px*/
  }
  #pay_success .info .price .p {
    color: #ff0000;
  }
</style>
