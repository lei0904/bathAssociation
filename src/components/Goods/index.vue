<template>
  <div id="goods">
    <Top :type="'goods'"
         ref="goodsTop"
         id="goods_top"
         :select="true"
         :values="arr"
         @dataSelectedHandler="dataSelectedHandler"></Top>

    <div class="goods_content" :class="isShowTB ? '': 'mb30'">
      <section class="tab">
        <div class="items">
          <a class="tab-item"
             v-for="(item , index) in type2Data"
             :class="curType2.id == item.id ? 'active' : ''"
            @click="type2Click(item)">
            {{item.name}}
          </a>
        </div>
      </section>
      <section class="tab-container">
        <section v-if="type == 2" id="typeListWrapper" ref="typeListWrapper" class="type-list-wrapper">
          <div class="type-list">
            <a class="type-item" v-for="(item , index) in type3Data" :class="index == curTypeItemIndex ? 'active' : ''">
              <img :src="item.iconUrl">
              <span class="txt">{{item.name}}</span>
            </a>
          </div>
        </section>
        <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
          <ul class="page-infinite-list"
              v-is="loadMore"
              infinite-scroll-scrolling="scrolling"
              infinite-scroll-disabled="loading"
              infinite-scroll-listener="listen"
              infinite-scroll-distance="50">
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
                    <div class="badge group1 ms-mrms" v-if="item % 2 == 0"></div>
                    <!--<div class="badge group1 ms-hh" v-if="item % 3 == 0"></div>-->
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
          <p v-show="loading" class="page-infinite-loading">
            <mt-spinner type="fading-circle"></mt-spinner>
            加载中...
          </p>
        </div>
      </section>
    </div>
    <div class="shopping_car_wrapper" v-show="!isShowTB" @click="toShoppingCart">
      <span class="num" v-show="getShopCartCount">{{getShopCartCount}}</span>
    </div>

    <LeaveMessage ref="leaveMessage"></LeaveMessage>
  </div>
</template>
<script>
  import Top from '../Top/index.vue'
  import '../../directive/InfiniteScroll/index'
  import InputDialog from '../Dialogs/InputDialog/index.js'
  import LeaveMessage from '../Dialogs/LeaveMessage/index.vue'

  import {mapActions, mapState, mapGetters} from 'vuex'

  export default {
    name: 'Goods',
    data() {
      return {
        selected: 1,
        type2Data: [],
        curType2: null,
        type3Data: [],
        curType3: null,
        activeFirstLevel: '1',

        list: [],
        pageNumber: 0,
        pageSize: 20,
        loading: false,
        allLoaded: false,
        wrapperHeight: 0,

        lastScrollTop: 0,
        isShowTB: true,

        type: 2,
        curTypeItemIndex: 0,

        tabbarBottomClientHeight: 0,
        pageTabbarContainer: null,
        goodsTop: null,
        typeListWrapperHeight: 0,
        tabbarBottom: null,
        pageInfiniteListItemHeight: 0,

        typeListPaddingLeft: 0,
        typeListWidth: 0,
        typeItemWidth: 0,
        // count: sessionStorage.getItem("count"),

        arr: []
      }
    },

    watch: {
      curTypeItemIndex(val) {
        // this.curTypeItemIndex = val;
        if (this.type === 2) {
          let typeList = document.querySelector('.type-list');
          if (this.typeListWidth === 0) {
            this.typeListWidth = parseFloat(this.$utils.getStyle(typeList, 'width'));
          }
          // console.log(this.typeListWidth);
          this.$nextTick(() => {
            let typeItemActive = document.querySelector('.type-item.active');
            let offsetLeft = typeItemActive.offsetLeft;
            if (offsetLeft > this.typeListWidth) {
              typeList.scrollLeft = offsetLeft;
            } else {
              typeList.scrollLeft = 0;
            }
            // let typeItemWidth = parseFloat(this.$utils.getStyle(typeItemActive, 'width'))
            /*this.typeItemWidth = parseFloat(this.$utils.getStyle(typeItemActive, 'width'));
            let x = typeItemActive.getBoundingClientRect().x;
            console.log(x);
            if (x) {
              if (x > this.typeListWidth) {
                typeList.scrollLeft = typeList.scrollLeft + this.typeItemWidth;
              } else if (x < 0) {
                typeList.scrollLeft = typeList.scrollLeft - this.typeItemWidth;
              }
            } else {
              let offsetLeft = typeItemActive.offsetLeft;
              if (offsetLeft > typeList.scrollLeft + this.typeListWidth) {
                typeList.scrollLeft = typeList.scrollLeft + this.typeItemWidth;
              } else {
                typeList.scrollLeft = typeList.scrollLeft - this.typeItemWidth;
              }
            }*/
          })
        }
      }
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
      toShoppingCart() {
        this.isShowTB = true;
        this.goodsTop.style.display = 'block';
        this.tabbarBottom.style.display = 'flex';
        this.$emit('shoppingCartClick');
      },
      toGoodsDetail(id,promotionId){
        sessionStorage.setItem("goodsId",id);
        sessionStorage.setItem("promotionId",promotionId);
        this.$router.push('/goods_detail')
      },
      openChangeNumber(item) {
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
      },

      leaveMessage(item) {
        let target = this.itemInShopCart(item.id);
        console.log(target);
        this.$refs['leaveMessage'].setTarget(target).open(target.merMsg);
      },

      scrolling(e) {
        let curScrollTop = e.target.scrollTop;
        let b = curScrollTop - this.lastScrollTop;
        this.lastScrollTop = curScrollTop;
        if (b > 0) {
          this.isShowTB = false;
        } else {
          this.isShowTB = true;
        }
        if (this.isShowTB && this.goodsTop.style.display !== 'block') {
          this.goodsTop.style.display = 'block';
          this.tabbarBottom.style.display = 'flex';
        } else if (!this.isShowTB && this.goodsTop.style.display !== 'none') {
          this.goodsTop.style.display = 'none';
          this.tabbarBottom.style.display = 'none';
        }
        if (this.pageInfiniteListItemHeight <= 0) {
          this.pageInfiniteListItemHeight = document.querySelector('.page-infinite-listitem').getBoundingClientRect().height;
        }

        if (this.type === 2) {
          let idx = parseInt(curScrollTop / this.pageInfiniteListItemHeight);
          this.curTypeItemIndex = this.getCurTypeItemIndex(this.list[idx]);
          console.log(this.curTypeItemIndex + "---curTypeItemIndex");
          /*if (this.curTypeItemIndex >= this.type3Data.length) {
            this.curTypeItemIndex = this.type3Data.length - 1;
          }*/
        }
      },

      getCurTypeItemIndex(item) {
        let index = 0;
        for (let i = 0, l = this.type3Data.length; i < l; i++) {
          let data = this.type3Data[i];
          if(data['id'] === item['nameId']) {
            index = i;
            break;
          }
        }

        return index;
      },

      setTypeListWrapperHeight(h) {
        if (this.type === 2 && this.typeListWrapperHeight <= 0) {
          this.typeListWrapperHeight = h;
          this.wrapperHeight = this.wrapperHeight - this.typeListWrapperHeight;
        }
      },

      selectChange(id) {
        this.selected = 1;
      },

      type2Click(item) {
        if (this.curType2['id'] !== item['id']) {
          this.curType2 = item;
          this.type3Data = this.curType2['item'];
          this.curType3 = this.type3Data[0];
          this.allLoaded = false;
          this.list = [];
          this.pageNumber = 0;
          this.curTypeItemIndex = 0;
          this.listLoad(this.curType2, this.curType3);
        }
      },
      loadMore() {
        this.listLoad(this.curType2, this.curType3);
      },
      listLoad(type2, type3) {
        if (this.allLoaded) {
          return false;
        }
        if (!type2 || !type2['id']) {
          return false;
        }
        this.loading = true;
        // this.pageNumber = this.pageNumber + 1;
        this.$api.productList({
          categoryId: type2['id'],
          categoryType: type2['type'],
          pageNumber: this.pageNumber++,
          pageSize: this.pageSize,
        }).then((rets) => {
         if(rets.content){
           this.loading = false;
           let list = rets['content'];
           if (list.length < this.pageSize ) {
             this.allLoaded = true;
           }
           this.list = this.list.concat(list);
         }
        })
      },
      dataSelectedHandler(v) {
        this.changeType(v.id);
      },
      addFav(id, show ,index) {
        event.stopPropagation();
        let m = true;
        m = !(show === 1);
        let _this = this;
        this.$api.addFav({
          "productId": id,
          "show": m
        }).then((rets) => {
          if (rets.show) {
            _this.list[index].show =1;
          }else{
            _this.list[index].show =0;
          }
        })
      },
      changeType(id) {
        this.list = [];
        this.pageNumber = 0;
        this.allLoaded = false;
        this.$api.nextLevel({
          "topCategoryId": id
        }).then((rets) => {
          let type2Arr = rets['item'];
          this.type2Data = type2Arr;
          this.curType2 = this.type2Data[0];
          let type3Arr = this.curType2['item'];
          this.type3Data = type3Arr;
          this.curType3 = type3Arr[0];
          this.listLoad(this.curType2, this.curType3);
        })
      },
      getType() {
        let _this = this;
        this.$api.topLevel({

        }).then((rets) => {
          let m = [];
          for (let i = 0; i < rets.length; i++) {
            m.push({
              name: rets[i].name,
              id: rets[i].id
            });
          }
          _this.arr = m;
          _this.changeType(_this.arr[0]['id']);
        })
      }
    },
    mounted() {

      this.loadShopCart();
      this.getType();

      this.goodsTop = document.getElementById('goods_top');
      this.tabbarBottom = document.getElementById('tabbar');

      this.wrapperHeight = document.documentElement.clientHeight -
        this.$refs.wrapper.getBoundingClientRect().top -
        this.tabbarBottom.offsetHeight;

      /*for (let i = 1; i <= 10; i++) {
        this.list.push(i);
      }*/
    },
    components: {
      Top,
      LeaveMessage
    }
  }
</script>
<style lang="scss">
  #goods {
    background: #fcfcfc;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    /*padding-top: 70px;*/
    overflow: hidden;
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
    right: 25px !important;
    top: 20px !important;
  }

  #goods .goods_item .goods .info {
    left:39px !important;
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
    background: -webkit-linear-gradient(left, rgba(255, 255, 255, .0), #ffffff);
    background: -o-linear-gradient(right, rgba(255, 255, 255, .0), #ffffff);
    background: -moz-linear-gradient(right, rgba(255, 255, 255, .0), #ffffff);
    background: linear-gradient(to right, rgba(255, 255, 255, .0), #ffffff);
  }

  .goods_content .type-list-wrapper {
    height: 150px;
    border-bottom: 1px solid $border; /*no*/
    position: relative;
  }

  .goods_content .type-list-wrapper .type-list {
    height: 100%;
    overflow: scroll;
    text-align: left;
    white-space: nowrap;
    /*padding-left: 34px;*/
    /*padding-right: 34px;*/
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
    /*padding-left: 0;*/
  }

  .goods_content .type-list-wrapper .type-list .type-item.active:first-child:after {
    /*margin-left: -45px;*/
  }

  .goods_content .type-list-wrapper .type-list .type-item.active:last-child:after {
    right: 0;
    margin-left: 0px;
  }

  .goods_content .type-list-wrapper .type-list .type-item:last-child {
    /*padding-right: 0;*/
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
    height: 60px;
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
    background: -webkit-linear-gradient(left, rgba(255, 255, 255, .0), #ffffff);
    background: -o-linear-gradient(right, rgba(255, 255, 255, .0), #ffffff);
    background: -moz-linear-gradient(right, rgba(255, 255, 255, .0), #ffffff);
    background: linear-gradient(to right, rgba(255, 255, 255, .0), #ffffff);
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
    padding-top: 3px
  }
  .goods_content .tab .tab-item:first-child {
    margin-left: 0;
  }

  .goods_content .tab .tab-item:last-child {
    margin-right: 0;
  }
</style>

