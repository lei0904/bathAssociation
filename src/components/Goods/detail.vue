<template>
  <div id="goods_detail">
    <Header :text="'商品详情'" :shareable="true" :transparent="isTransparent"></Header>
    <div class="container overflow" v-scrolling="scrolling">
      <section class="swipe">
        <span class="badge group2 mrms"></span>
        <mt-swipe :auto="5000" >
          <mt-swipe-item  v-for="item in detail.banners" :key="item">
            <img :src="item">
          </mt-swipe-item>

        </mt-swipe>
      </section>
      <section class="info">
        <div class="title-price">
          <div class="title">
            {{detail.title}}
          </div>
          <div class="tag-list">
            <span class="tag">特价</span>
            <span class="tag_2">库存紧张</span>
          </div>
          <div class="price-line">
            <div class="line clearfix">
              <div class="left" >
                <span class="price">{{detail.price}}</span>
                <span class="unit"><span>{{detail.pack}}</span></span>
              </div>
              <div class="right">{{detail.leastCount}}</div>
            </div>
            <div class="old-price">
              原价：150.45元/箱
            </div>
          </div>
        </div>
      </section>
      <section class="dispatching goods_in_stock">
        <span class="tip">现货</span>22:00前下单，可选择{{detail.arrivalDate}}送达
      </section>
      <section class="details">
        <section class="detail">
          <div class="title">规格参数</div>
          <div class="content clearfix">
            <div class="content-item">
              <span class="label">品名: </span>{{detail.name}}
            </div>
            <div class="content-item">
              <span class="label">包装: </span>{{detail.pack}}
            </div>
            <div class="content-item">
              <span class="label">品种: </span>{{detail.variety}}
            </div>
            <div class="content-item">
              <span class="label">等级: </span>{{detail.level}}
            </div>
            <div class="content-item">
              <span class="label">产地: </span>{{detail.cityName}}
            </div>
            <div class="content-item">
              <span class="label">品牌: </span>{{detail.brand}}
            </div>
          </div>
        </section>
        <section class="detail">
          <div class="title">商品简介</div>
          <div class="content txt">
            {{detail.description}}
          </div>
        </section>
      </section>
      <section class="evaluate">
        <div class="title">
          72条评价
          <span class="more">{{detail.goodCommentsRate}}<span class="level">好评</span></span>
        </div>
        <div class="evaluate-list">
          <div class="evaluate-item" v-for="commit in detail.comments">
            <div class="star-time">
              <div class="rater">商品评分:
                <i class="att_1" v-show="commit.score == 1">满意</i>
                <i class="att_2" v-show="commit.score == 2">点赞</i>
                <i class="att_3" v-show="commit.score == 3">吐槽</i>
              </div>
              <span class="time">{{commit.time}}</span>
            </div>
            <div class="content">{{commit.content}}</div>
          </div>

        </div>
        <div class="action">
          <span class="more" @click="to_evaluation()">查看更多</span>
        </div>
      </section>
      <!--<section class="drag-tip">-->
        <!--<span class="tip">继续拖动查看图文详情</span>-->
      <!--</section>-->

      <section class="buy-line">
        <div class="shop">
          <span class="txt">店铺</span>
        </div>
        <div class="car">
          <span v-show="count" class="num">{{count}}</span>
          <span class="txt" @click="toCart()">购物车</span>
        </div>
        <div class="add-car" @click="popupVisible = true">加入购物车</div>
      </section>
      <section v-if="showDownload" class="download-tip">
        <img class="applogo" src="../../../static/image/applogo.png">
        <span class="txt">网上农产品批发交易服务平台</span>
        <span class="download-btn">立即下载</span>
      </section>
    </div>

    <mt-popup v-model="popupVisible" position="bottom">
      <section class="popup-wrapper">
        <i class="close-btn" @click="popupVisible = false"></i>
        <div class="top-info">
          <div class="img">
            <img :src="detail.banners">
          </div>
          <div class="price">
            <span class="p">单价: {{detail.price}}</span>
            <span class="s">库存{{detail.inventory}}{{detail.packageContainer}}</span>
          </div>
        </div>
        <div class="bottom-info">
          <div class="u">
            <span>{{detail.leastCount}}</span>
            <span>{{detail.pack}}</span>
          </div>
          <div class="operation">
            <div class="btn clearfix">
              <span class="sub" @click="setNum(0)"></span>
              <span class="txt" @click="openChangeNumber">{{chioceNum}}</span>
              <span class="add" @click="setNum(1)"></span>
            </div>
            <div class="tip">已选: {{chioceNum * detail.packageSize}}公斤({{chioceNum}}袋)</div>
          </div>
        </div>
        <div class="confirm" @click="addToCart()">确定</div>
      </section>
    </mt-popup>
  </div>
</template>
<script>
  import Vue from 'vue'
  import InputDialog from '../Dialogs/InputDialog/index.js'
  export default {
    name: 'GoodsDetail',

    data () {
      return {
        chioceNum:1,
        star: 1,
        isTransparent: false,
        isLogin: false,
        showDownload: false,
        popupVisible: false,
        detail:{},
        count:sessionStorage.getItem("count")
      }
    },

    methods: {
      scrolling (e) {
        let curScrollTop = e.target.scrollTop;

        if (curScrollTop > 20) {
          this.isTransparent = true;
        } else {
          this.isTransparent = false;
        }
      },
      to_evaluation() {
        this.$router.push("/view_evaluation")
      },
      getDetail(id,promotionId){

        let _this = this;
        if(promotionId === 'undefined'){
          promotionId = null
        }
        this.$api.goodDetail({
          "productId":id,
          "promotionItemId": promotionId
        }).then((rets) => {
            _this.detail = rets
        })
      },
      setNum(type){
          if(type == 0){
              if(this.chioceNum >1){
                this.chioceNum = this.chioceNum-1
              }
          }else if(type == 1){
              if(this.chioceNum <this.detail.inventory){
                this.chioceNum = this.chioceNum+1
              }
          }
      },
      addToCart(){
        let _this = this;
        this.$api.addToCart({
          "productId":_this.detail.id,
          "promotionId" : _this.detail.promotionId ,
          "promotionItemId" :  _this.detail.promotionItemId ,
          "promotionType" :  _this.detail.promotionType,
          "count" : this.chioceNum,
          "price" : this.detail.price,
          "versionId" : this.detail.lastSnapshotId
        }).then((rets) => {
          if(rets.success){
            Vue.$toast({
              message: '添加购物车成功',
              className: 'with-icon',
              iconClass: 'success'
            });
            _this.checkCount()
          }
        })
        _this.popupVisible = false
      },
      openChangeNumber () {
        var _this = this;
        InputDialog.input(' ', '', {
          inputValue: 1
        }).then((value, action) => {
          console.log(value, action);
        });
      },
      checkCount(){
        let _this = this;
        this.$api.checkCount({

        }).then((rets) => {
          _this.count = rets.count;
          sessionStorage.setItem("count",rets.count)
        })
      },
      toCart(){
         console.log("跳转到购物车")
      }
    },
    activated(){
        let id = sessionStorage.getItem("goodsId");
        let promotionId = sessionStorage.getItem("promotionId");
        this.getDetail(id,promotionId)
    }
  }
</script>
<style lang="scss">
#goods_detail .popup-wrapper {
  height: 450px;
  background: #fff;
  position: relative;
}
#goods_detail .popup-wrapper .bottom-info {
  width: 100%;
  position: absolute;
  top: 150px;
  bottom: 98px;
  padding-left: 34px;
  padding-right: 34px;
  box-sizing: border-box;
}
#goods_detail .popup-wrapper .bottom-info .operation{
  position: absolute;
  bottom: 28px;
  right: 34px;
}
#goods_detail .popup-wrapper .bottom-info .operation .tip {
  margin-top: 20px;
  font-size: 26px;
  color: #009983;
}
#goods_detail .popup-wrapper .bottom-info .operation .btn {
  display: block;
  position: absolute;
  right: 0;
  bottom: 45px;
}
#goods_detail .popup-wrapper .bottom-info .operation .btn .txt {
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
#goods_detail .popup-wrapper .bottom-info .operation .btn .add,
#goods_detail .popup-wrapper .bottom-info .operation .btn .sub {
  display: inline-block;
  float: left;
  width: 52px;
  height: 52px;
  background: url("../../../static/image/sc_add.png") no-repeat center;
  background-size: 100% 100%;
}

#goods_detail .popup-wrapper .bottom-info .operation .btn .sub {
  background: url("../../../static/image/sc_sub.png") no-repeat center;
  background-size: 100% 100%;
}
#goods_detail .popup-wrapper .bottom-info .u {
  padding-top: 22px;
  font-size: 28px; /*px*/
  color: #959595;
}
#goods_detail .popup-wrapper .bottom-info .u span {
  margin-right: 66px;
}
#goods_detail .popup-wrapper .top-info{
  height: 150px;
  margin-left: 20px;
  margin-right: 20px;
  position: relative;
  border-bottom: 1px solid $border; /*no*/
}
#goods_detail .popup-wrapper .top-info .price {
  position: absolute;
  height: 100%;
  left: 260px;
  /*right: 20px;*/
}
#goods_detail .popup-wrapper .top-info .price > span {
  display: inline-block;
  width: 100%;
}
#goods_detail .popup-wrapper .top-info .price > span.p {
  font-size: 32px; /*px*/
  color: #ff0000;
  padding-top: 30px;
}
#goods_detail .popup-wrapper .top-info .price > span.s {
  font-size: 24px; /*px*/
  color: #959595;
  padding-top: 20px;
}
#goods_detail .popup-wrapper .top-info .img {
  width: 220px;
  height: 166px;
  position: absolute;
  left: 20px;
  top: -38px;
  border-radius: 2px;
  box-shadow: 1px 3px 2px #F6F6F6;
}
#goods_detail .popup-wrapper .top-info .img img {
  width: 100%;
  height: 100%;
  border-radius: 2px;
}
#goods_detail .popup-wrapper .close-btn {
  width: 66px;
  height: 58px;
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  background: url("../../../static/image/close.png") no-repeat center;
  background-size: 26px 26px;
  z-index: 700;
}
#goods_detail .popup-wrapper .confirm {
  height: 98px;
  line-height: 98px;
  position: absolute;
  background: #3eb049;
  color: #ffffff;
  font-size: 32px; /*px*/
  width: 100%;
  bottom: 0;
  text-align: center;
}

#goods_detail .swipe {
  position: relative;
}
#goods_detail .download-tip {
  width: 100%;
  height: 98px;
  line-height: 98px;
  position: fixed;
  bottom: 0;
  z-index: 600;
  background: rgba(255,255,255,.5);
}
#goods_detail .download-tip .txt {
  position: absolute;
  left: 160px;
  font-size: 28px; /*px*/
  color: #313131;
}
#goods_detail .download-tip .applogo {
  width: 115px;
  height: 115px;
  position: absolute;
  top: -35px;
  left: 30px;
}
#goods_detail .download-tip .download-btn {
  height: 60px;
  line-height: 60px;
  background: #3eb049;
  position: absolute;
  top: 50%;
  margin-top: -30px;
  right: 30px;
  font-size: 30px; /*px*/
  width: 180px;
  text-align: center;
  color: #fff;
  border-radius: 60px;
}
#goods_detail .buy-line .add-car {
  display: inline-block;
  height: 100%;
  background: #3eb049;
  color: #ffffff;
  font-size: 32px; /*px*/
  position: absolute;
  right: 0;
  left: 263px;
  text-align: center;
  line-height: 98px;
}
#goods_detail .buy-line .shop,
#goods_detail .buy-line .car {
  height: 100%;
  width: 130px;
  display: inline-block;
  position: relative;
}
#goods_detail .buy-line .shop {
  background: url("../../../static/image/buy-line-shop.png") no-repeat center 14px;
  background-size: 44px 40px;
}
#goods_detail .buy-line .shop:after {
  content: ' ';
  display: block;
  position: absolute;
  height: 70px;
  width: 1px; /*no*/
  background: $border;
  right: 0px; /*no*/
  top: 14px;
}
#goods_detail .buy-line .car {
  background: url("../../../static/image/buy-line-car.png") no-repeat center 14px;
  background-size: 43px 41px;
}
#goods_detail .buy-line .shop .txt,
#goods_detail .buy-line .car .txt {
  display: inline-block;
  position: absolute;
  width: 100%;
  bottom: 12px;
  text-align: center;
  font-size: 22px; /*px*/
  color: #959595;
}
#goods_detail .buy-line .car .num {
  top: 3px;
}
#goods_detail .buy-line {
  height: 98px;
  width: 100%;
  background: #ffffff;
  position: fixed;
  bottom: 0;
  border-top: 1px solid $border; /*no*/
  z-index: 500;
}

#goods_detail .drag-tip {
  text-align: center;
  padding-top: 44px;
}
#goods_detail .drag-tip .tip {
  display: inline-block;
  color: #959595;
  font-size: 24px; /*px*/
  position: relative;
}
#goods_detail .drag-tip .tip:before,
#goods_detail .drag-tip .tip:after {
  content: ' ';
  width: 28px;
  height: 1px; /*no*/
  display: block;
  position: absolute;
  background: $border;
  top: 50%;
  transform: translateY(50%)
}
#goods_detail .drag-tip .tip:before{
  left: -30px;
}
#goods_detail .drag-tip .tip:after {
  right: -30px;
}
#goods_detail .evaluate {
  padding-left: 34px;
  padding-right: 34px;
  background: #ffffff;
  margin-top: 20px;
}
#goods_detail .evaluate .evaluate-list .evaluate-item .star-time {
  height: 90px;
  line-height: 90px;
  .rater{
    float: left;
    i{
      display: inline-block;
      padding-left: 50px;
      vertical-align: unset;
    }
    .att_1{
      background: url(../../../static/image/type_1.png) no-repeat left / 40px 40px;
      color: #ee5d11;
    }
    .att_2{
       background: url(../../../static/image/type_2.png) no-repeat left / 40px 40px;
       color: #ff9600;
     }
    .att_3{
      background: url(../../../static/image/type_3.png) no-repeat left / 40px 40px;
      color: #aaaaaa;
    }
  }
}
#goods_detail .evaluate .evaluate-list .evaluate-item {
  border-bottom: 1px solid $border; /*no*/
}
#goods_detail .evaluate .evaluate-list .evaluate-item .star-time .time {
  float: right;
  font-size: 24px; /*px*/
  color: #959595;
}
#goods_detail .evaluate .evaluate-list .evaluate-item .content {
  padding-bottom: 30px;
  font-size: 30px;
  color: #313131;
}
#goods_detail .evaluate .action {
  height: 118px;
  line-height: 118px;
  text-align: center;
}
#goods_detail .evaluate .action .more {
  height: 60px;
  line-height: 60px;
  width: 190px;
  border: 1px solid $border; /*no*/
  display: inline-block;
  font-size: 24px;
  color: #434343;
  border-radius: 60px;
}
#goods_detail .evaluate .title {
  height: 88px;
  line-height: 88px;
  font-size: 32px;
  color: #434343;
  background: url("../../../static/image/evaluate-title.png") no-repeat 0 center;
  background-size: 35px 41px;
  padding-left: 55px;
  border-bottom: 1px solid $border; /*no*/
}
#goods_detail .evaluate .title .more {
  float: right;
  color: #009A83;
}
#goods_detail .evaluate .title .level {
  float: right;
  color: #525252;
  font-size: 26px;
  display: inline-block;
  margin-left: 15px;
}
#goods_detail .container{
  padding-bottom: 198px;
}
#goods_detail .details {
  background: #ffffff;
  padding-left: 34px;
  padding-right: 34px;
}
#goods_detail .details .detail {
  padding-top: 38px;
  padding-bottom: 40px;
  border-bottom: 1px solid $border; /*no*/
}
#goods_detail .details .detail:last-child {
  border-bottom: none;
}
#goods_detail .details .detail .title {
  font-size: 32px;
  color: #434343;
  border-left: 10px solid #3eb049;
  padding-left: 14px;
  padding-right: 24px;
  box-sizing: border-box;
}
#goods_detail .content {
  padding-top: 14px;
}
#goods_detail .content.txt {
  padding-top: 42px;
  font-size: 30px;
  color: #313131;
}
#goods_detail .content .content-item {
  width: 50%;
  float: left;
  margin-top: 28px;
  font-size: 28px;
  color: #313131;
}
#goods_detail .content .content-item .label {
  color: #959595;
}

#goods_detail .dispatching {
  font-size: 26px;
  padding: 18px 90px 18px 100px;
  line-height: 1.5;
}
#goods_detail .dispatching .tip {
  margin-right: 20px;
}
#goods_detail .dispatching.goods_in_stock{
  background: url("../../../static/image/goods_in_stock.png") no-repeat 34px 22px;
  background-size: 35px 33px;
}
#goods_detail .dispatching.goods_in_stock .tip {
  color: #ff0000;
}


#goods_detail .info {
  background: #ffffff;
}

#goods_detail .price-line  {
  display: block;
  padding-bottom: 30px;
}
#goods_detail .price-line .line {
  height: 50px;
  line-height: 50px;
  width:100%;
}
#goods_detail .price-line .old-price {
  color: #959595;
  font-size: 24px; /*px*/
  margin-top: 14px;
  text-decoration: line-through;
}
#goods_detail .price-line .left {
  float: left;
  color: #959595;
  font-size: 24px; /*px*/
  position: relative;
}
#goods_detail .price-line .left .price {
  color: #ff0000;
  font-size: 48px; /*px*/
}
#goods_detail .price-line .left .unit {
  /*display: inline-block;*/
  float: right;
  margin-left: 20px;
  height: 50px;
  line-height: 50px;
  display: table-cell;
  vertical-align: middle;
  padding-top: 5px;
}
#goods_detail .price-line .left .unit > span {
  background: #F3F4F7;
  /*padding: 5px 10px;*/
  height: 36px;
  display: inline-block;
  line-height: 36px;
  padding-left: 5px;
  padding-right: 5px;
  box-sizing: border-box;
  border-radius: 5px;
  min-width: 114px;
  text-align: center;
}
#goods_detail .price-line .right {
  float: right;
  color: #525252;
  font-size: 28px; /*px*/
}
#goods_detail .info .tag-list {
  padding-bottom: 30px;
}
#goods_detail .info .tag-list .tag {
  display: inline-block;
  height: 26px;
  line-height: 26px;
  min-width: 64px;
  text-align: center;
  border-radius: 26px;
  font-size: 18px; /*px*/
  padding: 0 5px;
  border: 1px solid #ff0000; /*no*/
  color: #ff0000;
}
#goods_detail .info .tag-list .tag_2 {
  display: inline-block;
  height: 26px;
  line-height: 26px;
  min-width: 64px;
  text-align: center;
  border-radius: 26px;
  font-size: 18px; /*px*/
  padding: 0 5px;
  color: #ff0000;
  float: right;
}

#goods_detail .info .title-price {
  padding-left: 34px;
  padding-right: 34px;
}
#goods_detail .info .title-price .title {
  font-size: 32px;
  color: #313131;
  line-height: 50px;
  padding-top: 22px;
  padding-bottom: 22px;
}

#goods_detail .info .price-line .left .login-tip {
  font-size: 50px; /*px*/
  color: #ff0000;
  background-size: 100% 100%;
  padding: 13px 0px;
}

#goods_detail .mint-swipe {
  height: 398px;
  background: #ffffff;
}
#goods_detail .mint-swipe .mint-swipe-item img{
  width: 100%;
  height: 100%;
}
#goods_detail .mint-swipe .mint-swipe-indicators {
  bottom: 34px;
}
#goods_detail .mint-swipe .mint-swipe-indicator{
  width: 20px;
  height: 20px;
  margin: 0 8px;
  background: rgba(255, 255, 255, .5);
  opacity: 1;
}
#goods_detail .mint-swipe .mint-swipe-indicator.is-active {
  background: #ffffff;
}
</style>
