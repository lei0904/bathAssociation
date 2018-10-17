<template>
  <div id="mine">
    <section class="info">
      <div class="avatar">
        <img :src="userInfo.avatar ? userInfo.avatar : '../../../static/image/avatar.png'">
      </div>
      <div class="content">
        <div class="name">{{userInfo.nickname || '暂无'}}</div>
        <div class="phone">{{userInfo.phone}}</div>
      </div>
      <a class="action" @click.stop.prev="$router.push('/mine_account')">账户管理</a>
    </section>
    <section class="order">
      <div class="link">
        <span>我的订单</span>
        <a class="action" @click="toOrderList(-1)">全部订单</a>
      </div>
      <div class="operations">
        <a class="operation" @click=toOrderList(1)>
          <img src="../../../static/image/operations/pending_payment.png">
          <span class="txt">待付款</span>
          <span class="num" v-if="num.pay">{{num.pay}}</span>
        </a>
        <a class="operation" @click=toOrderList(2)>
          <img src="../../../static/image/operations/pending_send.png">
          <span class="txt">待发货</span>
          <span class="num" v-if="num.delivery">{{num.delivery}}</span>
        </a>
        <a class="operation" @click=toOrderList(3)>
          <img src="../../../static/image/operations/pending_receive.png">
          <span class="txt">待收货</span>
          <span class="num" v-if="num.receive">{{num.receive}}</span>
        </a>
        <a class="operation" @click=toOrderList(9)>
          <img src="../../../static/image/operations/pending_evaluate.png">
          <span class="txt">待评价</span>
          <span class="num" v-if="num.comment">{{num.comment}}</span>
        </a>
        <a class="operation" @click="toRemit">
          <img src="../../../static/image/operations/customer_service.png">
          <span class="txt">售后</span>
          <span class="num" v-if="num.jmt">{{num.jmt}}</span>
        </a>
      </div>
    </section>
    <section class="menu">
      <div class="group">
        <mt-cell title="钱包" icon="more" is-link to="/wallet">
          <img slot="icon" src="../../../static/image/menu/wallet.png">
        </mt-cell>
        <mt-cell title="推荐给好友" icon="more" is-link>
          <img slot="icon" src="../../../static/image/menu/recommend.png">
        </mt-cell>
        <mt-cell title="拨打客服电话" icon="more" is-link >
          <img slot="icon" src="../../../static/image/menu/call.png">
        </mt-cell>
      </div>
      <div class="group">
        <mt-cell title="设置" icon="more" is-link to="/setting">
          <img slot="icon" src="../../../static/image/menu/setting.png">
        </mt-cell>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    name: 'Mine',
    data () {
      return{
        num:{},
        userInfo:{}
      }
    },
    methods:{
        getNum(){
          let _this = this;
          this.$api.getNum({

          }).then((rets) => {
            _this.num = rets
          })
        },
        toRemit(){
          sessionStorage.removeItem('productId');
          this.$router.push('/refund')
        },
        toOrderList(checked){
          sessionStorage.setItem("checked",checked);
          this.$router.push('/order_list')
        }
    },
    activated(){
      this.getNum();
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      console.log(this.userInfo)
    }
  }
</script>
<style lang="scss">
  #mine .info {
    background: #2c9f7a;
    background-image: -webkit-linear-gradient(to bottom, #009983, #2c9f7a);
    background-image: linear-gradient(to bottom, #009983, #2c9f7a);
    height: 232px;
    width: 100%;
    padding-left: 34px;
    padding-right: 34px;
    box-sizing: border-box;
    position: relative;
  }
  #mine .info .avatar {
    width: 134px;
    height: 134px;
    display: inline-block;
    float: left;
    position:absolute;
    top:50%;
    margin-top: -67px;
    /*border: 14px solid #67B79F;*/
    border-radius: 50%;
    box-sizing: border-box;
  }
  #mine .info .avatar img {
    /*width: 110px;*/
    /*height: 110px;*/
    width: 100%;
    height: 100%;
  }
  #mine .info .avatar img {
    /*position: relative;*/
    /*top: -16px;*/
    /*left: -2px;*/
  }

  #mine .info .content {
    position:absolute;
    left: 194px;
    top: 80px;
    color: #ffffff;
    font-size: 32px; /*px*/
  }
  #mine .info .content .phone{
    margin-top: 20px;
  }
  #mine .info .content .phone,
  #mine .info .action{
    font-size: 24px; /*px*/
    color: rgba(255, 255, 255, .7);
  }
  #mine .info .action {
    background: url("../../../static/image/account-arrow.png") center right no-repeat;
    background-size: 10px 16px;
    padding-right: 20px;
    position: absolute;
    top: 110px;
    right: 34px;
  }

  #mine .order {
    background: #ffffff;
  }
  #mine .order .link {
    height: 72px;
    line-height: 72px;
    padding: 0 34px;
    box-sizing: border-box;
    position: relative;
    font-size: 26px;
    color: #434343;
  }
  #mine .order .link:after {
    content: ' ';
    display: block;
    position: absolute;
    bottom: 0;
    height: 1px; /*no*/
    left: 24px;
    right: 24px;
    background: $border;
  }
  #mine .order .link .action {
    background: url("../../../static/image/arrow-right.png") center right no-repeat;
    float: right;
    background-size: 14px 22px;
    padding-right: 20px;
    font-size: 24px;
    color: #626262;
    font-weight: 300;
  }
  #mine .order .operations {
    display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box;     /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox;  /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex;         /* 新版本语法: Opera 12.1, Firefox 22+ */

    height: 144px;
  }
  #mine .order .operations .operation {
    -webkit-box-flex: 1;   /* OLD - iOS 6-, Safari 3.1-6 */
    -moz-box-flex: 1;     /* OLD - Firefox 19- */
    -webkit-flex: 1;      /* Chrome */
    -ms-flex: 1;           /* IE 10 */
    flex: 1;              /* NEW, Spec - Opera 12.1, Firefox 20+ */

    position: relative;
    font-size: 24px; /*px*/
    color: #626262;
  }

  #mine .order .operations .operation img {
    width: 54px;
    height: 54px;
    position: absolute;
    top: 22px;
    left: 50%;
    margin-left: -27px;
  }
  #mine .order .operations .operation .txt {
    position: absolute;
    top: 90px;
    width: 100%;
    text-align: center;
  }

  #mine .menu .group {
    margin-top: 20px;
  }
  #mine .menu .group .mint-cell-title img {
    width: 48px;
    height: 48px;
  }
  #app #mine .mint-cell {
    height: 104px;
    min-height: 104px;
  }
  #app #mine .mint-cell-wrapper {
    padding: 0 34px;
  }
  #app #mine .mint-cell-wrapper .mint-cell-text{
    font-size: 30px; /*px*/
    color: #434343;
    margin-left: 14px;
  }
  #app #mine .mint-cell-allow-right::after {
    border: none;
    right: 34px;
    background: url("../../../static/image/arrow-right.png") no-repeat;
    background-size: 100% 100%;
    width: 14px;
    height: 22px;
    -webkit-transform: translateY(-50%) rotate(0deg);
    transform: translateY(-50%) rotate(0deg);
  }

  #app #mine .mint-cell {
    border: none;
    border-top: 1px solid $border; /*no*/
  }
  #app #mine .mint-cell:last-child {
    border-bottom: 1px solid $border; /*no*/
  }
</style>
