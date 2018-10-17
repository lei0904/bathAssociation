<template>
  <div id="pay_failed">
    <Header :text="''"></Header>
    <div class="container">
      <section class="info">
        <span class="pay-tip">
          <img src="../../../static/image/pay_failed_txt.png" class="txt-tip">
        </span>
      </section>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'PayFailed'
  }
</script>
<style lang="scss">
  #pay_failed {
    overflow: auto;
  }
  #pay_failed .container {
    background: #ffffff;
    text-align: center;
  }
  #pay_failed .header {
    background: #ffffff;
  }
  #pay_failed .header:after {
    display: none;
  }

  #pay_failed .pay-tip {
    margin-top: 224px;
    display: inline-block;
    background: url("../../../static/image/pay_failed_bg.png") no-repeat center left;
    background-size: 70px 70px;
    padding-left: 92px;
    height: 70px;
  }
  #pay_failed .pay-tip .txt-tip {
    width: 260px;
    height: 60px;
    margin-top: 5px;
  }
</style>
