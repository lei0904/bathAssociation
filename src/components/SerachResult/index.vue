<template>
  <div id="serach_result">
    <Header :text="'搜索结果'"></Header>
    <ul>
      <li v-for="(item, index) in list" class="page-infinite-listitem">
        <div class="goods_item" @click="toGoodsDetail(item.id, item.promotionId)">
          <div class="goods">
            <div class="info">
              <img class="pic" :src="item.thumbnail">
              <div class="data">
                <div class="name">{{item.title}}</div>
                <div class="spec">{{item.pack}}</div>
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

            <div class="collection" :class="item.show == 1 ? 'on' : ''" @click="addFav(item.id , item.show , index)"></div>
          </div>
          <div class="message" v-if="ifItemInShopCart(item.id)" @click.stop.prevent="leaveMessage(item)">
            <div class="message-line">
              {{itemMerMsgInShopCart(item.id) || "去留言"}}
            </div>
          </div>
        </div>
      </li>
    </ul>
    <LeaveMessage ref="leaveMessage"></LeaveMessage>
  </div>
</template>
<script>
  import InputDialog from '../Dialogs/InputDialog/index.js'
  import LeaveMessage from '../Dialogs/LeaveMessage/index.vue'
  import {mapActions, mapState, mapGetters} from 'vuex'
  export default {
    name: 'SerachResult',
    data () {
      return {
        searchWord:'',
        list:[]
      }
    },
    mounted () {

    },
    components: {
      LeaveMessage
    },
    computed: {
      ...mapGetters([
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
        'loadShopCart',
        'setShopCartItemNumber',
        'delFromShopCart',
        'addToShopCart'
      ]),
      itemInShopCart(id) {
        return this.$store.getters.inShopCart(id)
      },
      ifItemInShopCart (id) {
        return this.$store.getters.isInShopCart(id)
      },
      itemMerMsgInShopCart (id) {
        return this.$store.getters.merMsgInShopCart(id)
      },
      showShopCartItemNumber (item) {
        return this.$store.getters.getShopCartItemNumber(item.id)
      },
      leaveMessage(item) {
        let target = this.itemInShopCart(item.id);
        console.log(target);
        this.$refs['leaveMessage'].setTarget(target).open(target.merMsg);
      },
      openChangeNumber () {
//        this.$refs['inputDialog'].show();
        event.stopPropagation();
        InputDialog.input(' ', '', {
          inputValue: 1
        }).then((value, action) => {
          console.log(value, action)
        });
      },
      toGoodsDetail(id,promotionId){
        sessionStorage.setItem("goodsId",id);
        sessionStorage.setItem("promotionId",promotionId);
        this.$router.push('/goods_detail')
      },
      addFav(id,show,index){
        event.stopPropagation();
        let m = true;
        m = !(show === 1);
        let _this = this;
        this.$api.addFav({
          "productId":id,
          "show":m
        }).then((rets) => {
            if (rets){
              if (rets.show) {
                _this.list[index].show =1;
              }else{
                _this.list[index].show =0;
              }
            }
        })
      },
      toSearch(i){
        let _this = this;
        this.$api.search({
          "title":i
        }).then((rets) => {
          _this.list = rets.content;
        })
      }
    },
    activated() {
      let i = sessionStorage.getItem("searchWord")
      this.toSearch(i);
    }
  }
</script>
<style lang="scss">
  #serach_result{
    background: #fcfcfc;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    /*padding-top: 70px;*/
    overflow: hidden;
    ul{
      height: 93%;
      overflow-y: scroll;
    }
    .shopping_car_wrapper {
      position: absolute;
      display: inline-block;
      background: url("../../../static/image/shoping_cart_wrapper.png") no-repeat;
      background-size: 100% 100%;
      width: 120px;
      height: 120px;
      left: 34px;
      bottom: 114px;
    }

    .shopping_car_wrapper .num {
      right: 25px!important;
      top: 20px!important;
    }

    .goods_item .goods .info {
      left: 34px;
    }
    .goods_item .message .message-line {
      padding-left: 34px;

    }
    .goods_item .message:before {
      left: 86px;
    }

    .goods_content .type-list-wrapper:after {
      content: ' ';
      display: block;
      height: 100%;
      position: absolute;
      width: 70px;
      background: red;
      top: 0;
      right: 0;
      background: -webkit-linear-gradient(left,rgba(255,255,255, .0),#ffffff);
      background: -o-linear-gradient(right,rgba(255,255,255, .0),#ffffff);
      background: -moz-linear-gradient(right,rgba(255,255,255, .0),#ffffff);
      background: linear-gradient(to right, rgba(255,255,255, .0),#ffffff);
    }
    .goods_content .type-list-wrapper {
      height: 150px;
      border-bottom: 1px solid $border; /*no*/
      position: relative;
    }
    .goods_content .type-list-wrapper .type-list {
      height: 100%;
      overflow: hidden;
      text-align: left;
      white-space: nowrap;
      padding-left: 34px;
      padding-right: 34px;
    }
    .goods_content .type-list-wrapper .type-list::-webkit-scrollbar {
      height: 1px;
    }
    .goods_content .type-list-wrapper .type-list .type-item {
      display: inline-block;
      height: 100%;
      box-sizing: border-box;
      position: relative;
      text-align: center;
      padding: 12px 39px 0 39px;
      font-size: 24px;
      color: #788790;
      /*width: 80px;*/
    }
    .goods_content .type-list-wrapper .type-list .type-item:first-child {
      padding-left: 0;
    }
    .goods_content .type-list-wrapper .type-list .type-item.active:first-child:after {
      margin-left: -45px;
    }
    .goods_content .type-list-wrapper .type-list .type-item.active:last-child:after {
      right: 0;
      margin-left: 0px;
    }
    .goods_content .type-list-wrapper .type-list .type-item:last-child {
      padding-right: 0;
    }
    .goods_content .type-list-wrapper .type-list .type-item img {
      width: 80px;
      height: 80px;
    }
    .goods_content .type-list-wrapper .type-list .type-item .txt {
      display: block;
    }
    .goods_content .type-list .type-item.active:after {
      content: ' ';
      display: block;
      position: absolute;
      height: 3px; /*no*/
      width: 50%;
      bottom: 0; /*no*/
      left: 25%;
      background: #009983;
      border-radius: 3px; /*no*/
    }
    .goods_content .type-list .type-item.active {
      color: #009983;
    }

    .page-infinite-wrapper {
      margin-top: -1px;
      overflow: scroll;
      margin-bottom: $footerPx;
      -webkit-overflow-scrolling: touch;
    }
    .page-infinite-listitem {
      /*height: 100px;*/
      /*line-height: 100px;*/
      /*text-align: center;*/
      /*border-bottom: 1px solid #eee;*/
    }
    .page-infinite-loading {
      text-align: center;
      height: 100px;
      line-height: 100px;
    }
    .page-infinite-loading div {
      display: inline-block;
      vertical-align: middle;
      margin-right: 5px;
    }
    .goods_content {
      margin-top: 100px;
    }
    .goods_content.mb30 {
      margin-top: 30px;
    }
    .goods_content .tab {
      height: 80px;
      border-bottom: 1px solid $border; /*no*/
      position: relative;

    }
    .goods_content .tab .items {
      height: 100%;
      padding-left: 34px;
      padding-right: 34px;
      background: #fcfcfc;
      display: block;
      overflow: auto;
      text-align: left;
      white-space: nowrap;
      font-size: 32px;
      color: #788790;
    }
    .goods_content .tab:after {
      content: ' ';
      display: block;
      height: 100%;
      position: absolute;
      width: 70px;
      background: red;
      top: 0;
      right: 0;
      background: -webkit-linear-gradient(left,rgba(255,255,255, .0),#ffffff);
      background: -o-linear-gradient(right,rgba(255,255,255, .0),#ffffff);
      background: -moz-linear-gradient(right,rgba(255,255,255, .0),#ffffff);
      background: linear-gradient(to right, rgba(255,255,255, .0),#ffffff);
    }
    .goods_content .tab .items::-webkit-scrollbar {
      height: 1px;
    }
    .goods_content .tab .tab-item.active:after {
      content: ' ';
      display: block;
      position: absolute;
      height: 3px; /*no*/
      width: 50px;
      bottom: 0px; /*no*/
      left: 50%;
      margin-left: -25px;
      background: #009983;
      border-radius: 3px; /*no*/
    }
    .goods_content .tab .tab-item.active {
      color: #009983;
    }
    .goods_content .tab .tab-item {
      margin-left: 31px;
      margin-right: 31px;
      display: inline-block;
      height: 100%;
      box-sizing: border-box;
      position: relative;
      padding-top:3px
    }
    .goods_content .tab .tab-item:first-child {
      margin-left: 0;
    }
    .goods_content .tab .tab-item:last-child {
      margin-right: 0;
    }
  }
</style>
