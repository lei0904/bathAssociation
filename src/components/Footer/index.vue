<template>
  <div class="footer">
    <div @click="navChange(1, '/index')" class="item index" :class="nav==1 ? 'active' : ''"><span class="txt">首页</span></div>
    <div @click="navChange(2, '/goods')" class="item goods" :class="nav==2 ? 'active' : ''"><span class="txt">商品</span></div>
    <div @click="navChange(3, '/shopping_cart')" class="item shopping_cart" :class="nav==3 ? 'active' : ''"><span class="txt">购物车</span></div>
    <div @click="navChange(4, '/mine')" class="item mine" :class="nav==4 ? 'active' : ''"><span class="txt">我的</span></div>
  </div>
</template>

<script>
  export default {
    name: 'Header',

    data () {
      return {
        nav: 4
      }
    },
    methods: {
      navChange (nav, link) {
        this.$router.push(link);
        this.nav = nav;

        console.log(this.nav);
      }
    }
  }
</script>

<style lang="scss">
  .footer {
    height: $footerPx;
    background: $headerBgColor;
    border-top: 1px solid $border;
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 200;

    display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box;     /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox;  /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex;         /* 新版本语法: Opera 12.1, Firefox 22+ */
  }
  .footer .item {
    -webkit-box-flex: 1;   /* OLD - iOS 6-, Safari 3.1-6 */
    -moz-box-flex: 1;     /* OLD - Firefox 19- */
    -webkit-flex: 1;      /* Chrome */
    -ms-flex: 1;           /* IE 10 */
    flex: 1;              /* NEW, Spec - Opera 12.1, Firefox 20+ */

    text-align: center;
    color: #898989;
    font-size: 22px; /*px*/

    position: relative;
  }
  .footer .item.active {
    color: #009983;
  }
  .footer .item .txt {
    position: absolute;
    width: 100%;
    text-align: center;
    left: 0;
    bottom: 12px;
  }
  .footer .item.index {
    background: url("../../../static/image/nav/index-off.png") no-repeat center 10px;
    background-size: 50px 50px;
  }
  .footer .item.goods {
    background: url("../../../static/image/nav/goods-off.png") no-repeat center 10px;
    background-size: 50px 50px;
  }
  .footer .item.shopping_cart {
    background: url("../../../static/image/nav/shopping_cart-off.png") no-repeat center 10px;
    background-size: 50px 50px;
  }
  .footer .item.mine {
    background: url("../../../static/image/nav/mine-off.png") no-repeat center 10px;
    background-size: 50px 50px;
  }
  .footer .item.index.active {
    background: url("../../../static/image/nav/index-on.png") no-repeat center 10px;
    background-size: 50px 50px;
  }
  .footer .item.goods.active {
    background: url("../../../static/image/nav/goods-on.png") no-repeat center 10px;
    background-size: 50px 50px;
  }
  .footer .item.shopping_cart.active {
    background: url("../../../static/image/nav/shopping_cart-on.png") no-repeat center 10px;
    background-size: 50px 50px;
  }
  .footer .item.mine.active {
    background: url("../../../static/image/nav/mine-on.png") no-repeat center 10px;
    background-size: 50px 50px;
  }
</style>
