<template>
  <div id="nav">
    <mt-tab-container class="page-tabbar-container" :class="selected == 'goods' ? 'b0' : ''" v-model="selected">
      <mt-tab-container-item id="index">
        <Index @indexContentItemClick="handleIndexContentItemClick"></Index>
      </mt-tab-container-item>
      <mt-tab-container-item id="goods">
        <Goods ref="goodsRef" @shoppingCartClick="handleShoppingCartClick" @isHideBottomHandler="isHideBottomHandler"></Goods>
      </mt-tab-container-item>
      <mt-tab-container-item id="shopping_cart">
        <ShoppingCart @selectGoodsClick="selectGoodsClick"></ShoppingCart>
      </mt-tab-container-item>
      <mt-tab-container-item id="mine">
        <Mine></Mine>
      </mt-tab-container-item>
    </mt-tab-container>

    <div class="goods_ext" :class="(selected == 'goods' || selected == 'index' )&& !isAcceptOrders ? 'show' : ''" >
      <p>暂不接单</p>
      <p>接单时间：{{businessTime}}</p>
    </div>

    <mt-tabbar v-model="selected" fixed id="tabbar">
      <mt-tab-item id="index">
        <img slot="icon" v-if="selected == 'index'" src="../../../static/image/nav/index-on.png">
        <img slot="icon" v-else src="../../../static/image/nav/index-off.png">
        首页
      </mt-tab-item>
      <mt-tab-item id="goods">
        <img slot="icon" v-if="selected == 'goods'" src="../../../static/image/nav/goods-on.png">
        <img slot="icon" v-else src="../../../static/image/nav/goods-off.png">
        商品
      </mt-tab-item>
      <mt-tab-item id="shopping_cart">
        <img slot="icon" v-if="selected == 'shopping_cart'" src="../../../static/image/nav/shopping_cart-on.png">
        <img slot="icon" v-else src="../../../static/image/nav/shopping_cart-off.png">
        购物车
        <span v-show="getShopCartCount" class="num">{{getShopCartCount}}</span>
      </mt-tab-item>
      <mt-tab-item id="mine">
        <img slot="icon" v-if="selected == 'mine'" src="../../../static/image/nav/mine-on.png">
        <img slot="icon" v-else src="../../../static/image/nav/mine-off.png">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
  import Index from '../Index/index.vue'
  import Goods from '../Goods/index.vue'
  import ShoppingCart from '../ShoppingCart/index.vue'
  import Mine from '../Mine/index.vue'
  import {mapActions, mapState, mapGetters} from 'vuex'

  export default {
    name: 'Nav',
    data() {
      return {
        selected: 'index',
        isHideBottom: false,
        isAcceptOrders:true,
        businessTime:"",
      };
    },
    watch: {
      selected (val) {
        this.$nextTick(() => {
          this.$refs['goodsRef'].setTypeListWrapperHeight(document.getElementById('typeListWrapper').getBoundingClientRect().height);
        })
      }
    },
    computed: {
      ...mapGetters([
        'getShopCartCount'
      ])
    },
    methods: {
      selectGoodsClick () {
        this.selected = 'goods'
      },
      isHideBottomHandler (b) {
        this.isHideBottom = b;
      },
      handleShoppingCartClick() {
        this.isHideBottom = false;
        this.selected = 'shopping_cart';
      },
      handleIndexContentItemClick(item) {
        this.$refs['goodsRef']['$refs']['goodsTop'].setItem(item);
        this.selected = 'goods'

      }
    },
    components: {
      Index,
      Goods,
      ShoppingCart,
      Mine,
    },
    activated(){
      this.isAcceptOrders = JSON.parse(sessionStorage.getItem('storeInfo')).isAcceptOrders;
      this.businessTime = JSON.parse(sessionStorage.getItem('storeInfo')).businessTime;
      if(sessionStorage.getItem('navSelected')){
        this.selected = sessionStorage.getItem('navSelected');
        sessionStorage.removeItem('navSelected');
      }
    }
  };
</script>

<style lang="scss">
  .b0 {
    bottom: 0!important;
  }
  #nav .mint-tabbar {
    height: $footerPx;
    background: $headerBgColor;
    border-top: 1px solid $border; /*no*/
  }
  #nav .mint-tabbar .mint-tab-item-icon{
    width: 50px;
    height: 50px;
  }
  #nav .mint-tabbar .mint-tab-item .mint-tab-item-label{
    color: #898989;
    font-size: 22px; /*px*/
  }
  #nav .mint-tabbar > .mint-tab-item.is-selected {
    background: $headerBgColor;
    color: #009983;
  }
  #nav .mint-tabbar > .mint-tab-item.is-selected .mint-tab-item-label {
    color: #009983;
  }
  #nav .mint-tab-item {
    padding: 10px 0;
  }
  #nav .page-tabbar-container {
    /*height: 100%;*/
    background: #efefef;
    position: absolute;
    top: 0;
    width: 100%;
    bottom: $footerPx;
  }
  #nav .mint-tab-item {
    position: relative;
  }
  #nav .mint-tab-item .num{
    width: 28px;
    height: 28px;
    line-height: 28px;
    font-size: 16px; /*px*/
    top: 8px;
    right: 60px;
  }
  #nav {
    height: 100%;
    .index_ext,.goods_ext{
      position: fixed;
      left:0;
      bottom:98px;
      width: 100%;
      text-align: center;
      background: #000000;
      opacity: 0.6;
      display: none;
    }
    .index_ext{
      height: 128px;
      line-height: 128px;
      font-size: 36px;/*px*/
      color: #fff;
    }
    .goods_ext{
      height: 128px;
      color: #ffffff;
      p:nth-child(1){
        font-size: 32px;/*px*/
        line-height: 32px;
        margin-top: 27px;
      }
      p:nth-child(2){
        margin-top: 14px;
      }
    }
    .show{
      display: block;
    }
  }
</style>
