<template>
  <div class="shopping_cart_wrapper">
    <div id="shopping_cart">
      <Header :text="'购物车'" :explain="isEdit ? '完成' : '编辑'" :actionable="true" :backable = "false" @action="isEdit = !isEdit"></Header>
      <div class="shopping_cart_container">
        <div class="empty" v-if="isShopCartEmpty">
          <img class="sc_empty_pic" src="../../../static/image/sc_empty_pic.png">
          <div class="tip">
            <span class="no">目前还没有商品</span>
            <a href="#" @click.stop.prevent="toSelectGoods" class="to">去选购商品<span class="arrow"> > </span></a>
          </div>
        </div>
        <div class="content overflow" v-else>
          <section class="effective pt20">
            <div class="goods_item" v-for="(item , index) in validContent">
              <div class="goods">
                <div class="checkbox-label">
                  <input v-if="checked[item.id]" checked type="checkbox" class="checkbox-core">
                  <input v-else type="checkbox" class="checkbox-core">
                  <span class="checkbox-view" @click="toggleThis(item.id)"></span>
                </div>
                <div class="info">
                  <img class="pic" :src="item.thumbnail">
                  <div class="data">
                    <div class="name">{{item.title}}</div>
                    <div class="spec">{{item.packageSize}} {{item.packageContainer}}</div>
                    <div class="price"><span class="number">{{item.price}}</span>元 ／ {{item.chargeUnit}}</div>
                  </div>
                </div>
                <div class="operation">
                  <div class="btn">
                    <span class="sub" @click.stop="delFromShopCart(item)"></span>
                    <span class="txt" @click.stop="openChangeNumber(item)">{{itemNumbers[item.id] || 0}}</span>
                    <span class="add" @click.stop="addToShopCart(item)"></span>
                  </div>
                  <div class="tip">已选{{itemScales[item.id] || 0}}{{item.chargeUnit}}</div>
                </div>
              </div>
              <div class="message">
                <div class="message-line" @click.stop.prevent="leaveMessage(item)">
                  {{item.merMsg || "去留言"}}
                </div>
              </div>
            </div>
          </section>
          <section class="invalid pt20">
            <div class="goods_item" v-for="(items , index) in invalidContent">
              <div class="goods">
                <label class="checkbox-label" >
                  <input type="checkbox" class="checkbox-core">
                  <span class="checkbox-view"></span>
                </label>
                <div class="info">
                  <img class="pic" :src="items.productImgUrl">
                  <div class="data">
                    <div class="name">{{items.productTitle}}</div>
                    <div class="sorry">对不起，目前不能购买</div>
                  </div>
                </div>
                <div class="invalid_btn">
                  <span class="txt">失效商品</span>
                </div>
              </div>
            </div>

            <div class="btn" v-if="invalidContent.length > 0">
              <mt-button @click.native="removeInvalid">清空失效商品</mt-button>
            </div>
          </section>
          <section class="handlebar clearfix">
            <div class="left">
              <label class="checkbox-label" @click="toggleAll">
                <span class="checkbox-view checked" v-if="isCheckedAll"></span>
                <span class="checkbox-view" v-else></span>
              </label>
              <span class="checkbox-txt" @click="toggleAll">全选</span>
            </div>
            <div class="right">
              <div class="del" v-if="isEdit" @click="removeFromShopCart(Object.keys(checked))">
                <span class="del_btn">删除<span class="number">({{Object.keys(checked).length}})</span></span>
              </div>
              <div class="cal" v-else>
                <span class="cal_info">合计：<span class="cal_money">{{getCheckedTotalPrice(Object.keys(checked))}}元</span></span>
                <span class="cal_btn" @click="firmOrder(Object.keys(checked))">结算<span class="number">({{Object.keys(checked).length}})</span></span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    <LeaveMessage ref="leaveMessage"></LeaveMessage>
  </div>
</template>
<script>
  import InputDialog from '../Dialogs/InputDialog/index.js'
  import LeaveMessage from '../Dialogs/LeaveMessage/index.vue'

  import {mapActions, mapState, mapGetters} from 'vuex'

  export default {
    name: 'ShoppingCart',
    components: {
      LeaveMessage
    },
    data() {
      return {
        isEdit: false
      }
    },

    computed: {
      ...mapGetters([
        'checked',
        'isCheckedAll',
        'isShopCartEmpty',
        'invalidContent',
        'validContent',
        'getCheckedTotalPrice',
        'getShopCartCount'
      ]),
      itemScales () {
        return this.$store.state.shopCart.number_mapping;
      },
      itemNumbers () {
        return this.$store.state.shopCart.number_mapping;
      }
    },

    methods: {
      ...mapActions([
        'toggleThis',
        'toggleAll',
        'setShopCartItemNumber',
        'delFromShopCart',
        'addToShopCart',
        'firmOrder',
        'removeFromShopCart',
        'removeInvalid'
      ]),

      toSelectGoods() {
        this.$emit('selectGoodsClick');
      },

      leaveMessage (item) {
        this.$refs['leaveMessage'].setTarget(item).open(item.merMsg);
      },

      openChangeNumber (item) {
        let number = this.$store.getters.getShopCartItemNumber(item);
//        this.$refs['inputDialog'].show();
        InputDialog.input(' ', '', {
          inputValue: number
        }).then((rets) => {
          console.log(rets);
          if(rets.action === 'confirm') {
            this.setShopCartItemNumber({
              item:item,
              number: parseInt(rets.value)
            });
          }
          // console.log(value, action)
        });
      }
      /*,toFirmOrder () {
        this.$router.push('firm_order')
      }*/
    },
    activated(){
      this.isEdit = false;

    }
  }
</script>
<style lang="scss">

  #shopping_cart {
    overflow: hidden;
    position: absolute;
    top: 0;
    bottom: 98px;
    left: 0;
    right: 0;
    /*z-index: 100;*/
  }

  #shopping_cart .content {
    overflow: auto;
    /*-webkit-overflow-scrolling:touch;*/
    position: absolute;
    top: $headerPx;
    bottom: 0px;
    left: 0;
    right: 0;
  }

  .handlebar .left {
    float: left;
    height: 100%;
  }

  .handlebar .right {
    float: right;
    height: 100%;
    width: auto;
  }
  .handlebar .cal_info .cal_money {
    color: #ff0000;
    margin-right: 30px;
  }
  .handlebar .cal_btn {
    width: 220px;
    background: #3eb049;
    display: inline-block;
    text-align: center;
    color: #ffffff;
    font-size: 36px;
  }
  .handlebar .del_btn {
    height: 98px;
    width: 308px;
    background: #ff0000;
    display: inline-block;
    text-align: center;
    color: #ffffff;
    font-size: 36px;
  }
  .handlebar .cal_btn .number {
    font-size: 26px;
  }

  .handlebar .checkbox-label {
    left: 34px;
    top: 5px;
    position: absolute;
  }

  .handlebar .checkbox-txt {
    display: inline-block;
    position: absolute;
    left: 86px;
  }

  #shopping_cart .content .handlebar {
    height: 98px;
    line-height: 98px;
    width: 100%;
    background: #ffffff;
    position: fixed;
    bottom: $footerPx;
    font-size: 32px;
    color: #434343;
    border-bottom: 1px solid $border; /*no*/
    box-sizing: border-box;
    /*z-index: 199;*/
  }

  #shopping_cart .invalid .btn {
    width: 100%;
    text-align: center;
  }

  #shopping_cart .invalid .btn .mint-button {
    margin-top: 50px;
    margin-bottom: 116px;
    background: #ffffff;
    border-radius: 5px;
    /*width: 208px;*/
    height: 50px;
    box-shadow: none;
    border: 1px solid #3eb049; /*no*/
    font-size: 24px;
    color: #3eb049;
  }

  #shopping_cart .invalid .btn .mint-button .mint-button-text {
    font-size: 24px; /*px*/
    color: #3eb049;
    margin-top: -12px; /*px*/
  }

  .goods_item {
    background: #ffffff;
    display: block;
    border-bottom: 1px solid $border; /*no*/
  }

  .goods_item .goods {
    height: 240px;
    position: relative;
  }
  .goods_item .goods .collection {
    position: absolute;
    top: 0;
    right: 34px;
    width: 42px;
    height: 50px;
    background: url("../../../static/image/collection_off.png") no-repeat;
    background-size: 100% 100%;
  }
  .goods_item .goods .collection.on {
    background: url("../../../static/image/collection_on.png") no-repeat;
    background-size: 100% 100%;
  }

  .goods_item .message {
    height: 69px;
    margin-top: -21px;
    position: relative;
  }

  .goods_item .message .message-line {
    height: 48px;
    line-height: 48px;
    background: #f2fdf1;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding-left: 96px;
    padding-right: 34px;
    font-size: 24px;
    color: #626262;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .goods_item .message:before {
    content: ' ';
    display: inline-block;
    background: url("../../../static/image/message_arrow.png");
    width: 42px;
    height: 21px;
    background-size: 100% 100%;
    position: absolute;
    top:0px;
    left: 148px;
  }

  .goods_item .message .message-line:after {
    content: ' ';
    display: inline-block;
    width: 10px;
    height: 100%;
    background: url("../../../static/image/message_arrow_right.png") center center no-repeat;
    background-size: 10px 18px;
    position: absolute;
    right: 34px;
  }

  .goods_item .goods .operation {
    position: absolute;
    bottom: 14px;
    right: 34px;
  }

  .goods_item .goods .invalid_btn {
    position: absolute;
    bottom: 34px;
    right: 34px;
    background: #F3F3F3;
    color: #aaaaaa;
    font-size: 24px;
    width: 186px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    border-radius: 4px;
  }

  .goods_item .goods .invalid_btn .txt {
    background: url("../../../static/image/invalid_btn_icon.png") no-repeat;
    background-size: 22px 22px;
    background-position: center left;
    padding-left: 32px;
  }

  .goods_item .goods .operation .tip {
    text-align: right;
    font-size: 20px;
    color: #898989;
    margin-top: 10px;
  }

  .goods_item .goods .operation .btn {
    height: 52px;
  }

  .goods_item .goods .operation .btn .txt {
    float: left;
    text-align: center;
    min-width: 70px;
    font-size: 28px; /*px*/
    color: #434343;
    border-bottom: 1px solid $border;
    margin-left: 8px;
    margin-right: 8px;
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .goods_item .goods .operation .btn .add,
  .goods_item .goods .operation .btn .sub {
    display: inline-block;
    float: left;
    width: 52px;
    height: 52px;
    background: url("../../../static/image/sc_add.png") no-repeat center;
    background-size: 100% 100%;
  }

  .goods_item .goods .operation .btn .sub {
    background: url("../../../static/image/sc_sub.png") no-repeat center;
    background-size: 100% 100%;
  }

  .goods_item .goods .checkbox-label {
    position: absolute;
    top: 84px;
    left: 34px;
  }

  .goods_item .goods .info {
    position: absolute;
    top: 28px;
    left: 96px;
    right: 34px;
  }

  .goods_item .goods .info .pic {
    position: absolute;
    top: 0;
    left: 0;
    width: 146px;
    height: 146px;
  }

  .goods_item .goods .info .data {
    position: absolute;
    top: 0;
    left: 166px;
    right: 0;
  }

  .goods_item .goods .info .data .sorry {
    font-size: 28px;
    color: #959595;
    margin-top: 30px;
  }

  .goods_item .goods .info .data .name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 32px; /*px*/
    color: #313131;
  }

  .goods_item .goods .info .data .spec {
    display: inline-block;
    color: #626262;
    font-size: 22px; /*px*/
    background: #F3F4F7;
    border-radius: 3px;
    margin-top: 22px;
    padding: 5px 10px;
  }

  .goods_item .goods .info .data .price {
    color: #434343;
    font-size: 24px; /*px*/
    margin-top: 22px;
  }

  .goods_item .goods .info .data .price .number {
    color: #ff0000;
    font-size: 30px; /*px*/
  }

  #shopping_cart .empty {
    padding-top: 352px;
    text-align: center;
  }

  #shopping_cart .empty .sc_empty_pic {
    width: 213px;
    height: 195px;
  }

  #shopping_cart .empty .tip {
    margin-top: 64px;
  }

  #shopping_cart .empty .tip .no {
    font-size: 32px;
    color: #898989;
    margin-right: 15px;
  }

  #shopping_cart .empty .tip .to {
    font-size: 36px;
    color: #3eb049;
    margin-left: 15px;
  }

  #shopping_cart .empty .tip .to .arrow {
    display: table-cell;
    vertical-align: middle;
    padding-left: 5px;
  }

  #shopping_cart .content {
    /*padding-bottom: 212px;*/
  }
</style>
