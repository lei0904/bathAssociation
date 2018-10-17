<template>
  <div id="order_list">
    <Header :text="'我的订单'"></Header>
    <div class="container">
      <div class="item_head">
        <div class="unchecked" :class="checked == -1 ? 'on' : ''" @click="checkType('refresh', false,-1)">全部</div>
        <div class="unchecked" :class="checked == 1 ? 'on' : ''" @click="checkType('refresh', false,1)">待付款</div>
        <div class="unchecked" :class="checked == 2 ? 'on' : ''" @click="checkType('refresh', false,2)">待发货</div>
        <div class="unchecked" :class="checked == 3 ? 'on' : ''" @click="checkType('refresh', false,3)">待收货</div>
        <div class="unchecked" :class="checked == 9 ? 'on' : ''" @click="checkType('refresh', false,9)">待评价</div>
      </div>
     <div class="item_box">
       <mt-loadmore :top-method="loadTop"
                    @top-status-change="handleTopChange"
                    :bottom-method="loadBottom"
                    @bottom-status-change="handleBottomChange"
                    :bottom-all-loaded="allLoaded"
                    ref="loadmore"
                    :autoFill = "false">
          <div class="order_item" v-for="item in list" >
            <div class="order_item_head">
              <div class="order_item_head_left">订单：{{item.orderNo}}</div>
              <div class="order_item_head_right">{{item.placeOrderTime}}</div>
            </div>
            <div class="order_item_ext clearfix">
              <div class="left">{{item.source | source}}</div>
              <div class="right">{{item.purchaseStatusTitle}}</div>
            </div>
            <div @click="toDetail(item.orderId)">
              <div class="order_item_content_imgbox clearfix" v-if="item.productList.length > 1">
                  <div class="order_item_content_head" v-for="items in item.productList">
                    <img :src="items.productImgUrl">
                  </div>
              </div>
              <div class="order_item_content clearfix" v-else>
                <div class="order_item_content_head">
                  <img :src="item.productList[0].productImgUrl">
                </div>
                <div class="order_item_content_main">
                  <div>{{item.productList[0].productTitle}}</div>
                  <div></div>
                </div>

              </div>
              <div class="order_item_ext2">
                <div class="left">
                  共{{item.productCount}}件
                </div>
                <div class="right">
                  <span class="main">订单金额：</span>
                  <span class="ext">{{item.orderSumPrice}}元（含运费：{{item.productExpressFee}}元）</span>
                </div>
              </div>
            </div>
            <div class="order_item_bottom" v-if="item.inspectCode">
              <div class="left"  @click="changeCodeStatus( item.inspectCode , true)">
                查看交货码<i></i>
              </div>
              <div class="right">
                <mt-button
                  v-for="items in item.buyerButton"
                  size="small"
                  :key="items.code"
                  :type="items.code == 'BuyerCancelOrder'?'default':'primary'"
                  v-if="items.code != 'BuyerViewInspectCode'"
                  @click.native="buttonClick(items.code , item.orderId ,item.orderNo)">{{items.title}}</mt-button>
              </div>
            </div>
          </div>
       </mt-loadmore>
       <mt-popup   v-model="popupVisible" position="bottom">
           <div class="box_title">
             交货码
             <i @click.stop="closeBox()"></i>
           </div>
           <div class="box_content">{{inspectCode}}</div>
         </mt-popup>
       <div class="empty" v-show = "empty" >
         <div class="emptyList"></div>
         <div class="emptyTitle" v-if="type == 9">暂无评价</div>
         <div class="emptyTitle" v-else>暂无订单</div>
       </div>
     </div>
    </div>
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
  </div>
</template>
<script>
  import MessageDialog from '../Dialogs/MessageDialog/index.js'
  import {mapActions, mapState, mapGetters} from 'vuex'
  export default {
    name: 'OrderList',
    data() {
      return {
        selected: '1',
        popupVisible:false,
        checked: '',
        inspectCode:'',
        list:[],
        sheetVisible:false,
        actions: [],
        id:'',

        allLoaded: false,
        topStatus: '',
        bottomStatus: '',
        pageNumber: 0,
        pageSize: 5,
        empty:false,
        type : ''
      };
    },
    mounted() {
      this.actions = [{
        name: '订错货了',
        method: this.orderCancel('订错货了')
      }, {
        name: '不想要了',
        method: this.orderCancel('不想要了')
      }];
    },
    methods:{
      ...mapActions([
        'loadShopCart'
      ]),
      openConfirm:function () {
        MessageDialog.confirm('', {
            title: '',
            message:'您以支付本订单，<br>请确认收货后在点击确认收货',
            confirmButtonText:'确认收货'
        }).then(action => {
          console.log("确认")
        });
      },
      toEvaluate:function () {
        this.$router.push('/evaluate')
      },
      toDetail:function (id) {
        sessionStorage.setItem("orderId",id);
        this.$router.push('/order_detail')
      },
      changeCodeStatus(code , operation){
        this.inspectCode = code;
        this.popupVisible = operation;
      },
      closeBox(){
        this.popupVisible = false;
      },
      buttonClick(code , id , orderNo){
        if (code === 'BuyerOrderTrack'){//BuyerOrderTrack : 订单跟踪
            sessionStorage.setItem("orderId",id);
            this.$router.push("/express")
        }else if(code === "BuyerCancelOrder"){//BuyerCancelOrder : 取消订单
          this.id = id;
          this.sheetVisible = true
        }else if(code === "BuyerPay"){//BuyerPay : 支付
//          this.$router.push("/cashier/orderId/orderNo")
          this.$router.push('/cashier/' + id + '/' + orderNo )
        }else if(code === "BuyerReceiveGoods"){//BuyerReceiveGoods : 确认收货
          this.checkedReceive(id,orderNo)
        }else if(code === "BuyerComment"){//BuyerComment : 评价
          sessionStorage.setItem("orderId",id);
          this.$router.push("/evaluate")
        }else if(code === "BuyerAgain"){//BuyerAgain : 再来一单
          let _this = this;
          _this.$api.carAgain({
            "orderId": id
          }).then((rets) => {
            if(rets.success){
              _this.loadShopCart();
              sessionStorage.setItem('navSelected','shopping_cart');
              _this.$router.push('/nav')
            }
          })
        }
      },
      checkedReceive(id,No){
        let _this = this;
        this.$api.checkedReceive({
          "orderId": id
        }).then((rets) => {
          if (rets.type === 0){
            MessageDialog.confirm('', {
              title: '',
              message:'您以支付本订单，<br>请确认收货后在点击确认收货',
              confirmButtonText:'确认收货'
            }).then(action => {
              _this.confirmReceive(id);
            });
          }else{
            MessageDialog.confirm('', {
              title: '',
              message:'您还有未支付钱款，<br>是否去支付？',
              confirmButtonText:'去支付'
            }).then(action => {
              this.$router.push('/cashier/' + id + '/' + No )
            });
          }
        })

      },
      orderCancel(reason){
        let _this = this;
        return function () {
          _this.$api.orderCancel({
            "orderId": _this.id,
            "reason":reason
          }).then((rets) => {
            let type = sessionStorage.getItem("checked");
            this.loadData('refresh', false ,type);
          })
        }
      },
      confirmReceive(id){
        let _this = this;
        this.$api.confirmReceive({
          "orderId": id,
        }).then((rets) => {
          if (rets.success){
            _this.$router.back()
          }
        })
      },
      loadData(action, loading ,type) {
        let _this = this;
        this.checked = type  || sessionStorage.getItem("checked");
        if (type === -1){
          type = null
        }
        if ('load' == action) {
          this.pageNumber = this.pageNumber + 1;
        } else {
          this.pageNumber = 0;
        }
        this.$api.orderList({
          "type":type || null,
          "keyWords":null,
          "pageNumber":_this.pageNumber,
          "pageSize":_this.pageSize
        }).then((rets) => {
          if ('refresh' == action) {
            _this.list = []
          }
          _this.list = _this.list.concat(rets.content);
          if(_this.list.length === 0){
              _this.empty = true;
          }
          _this.allLoaded = rets.last;
        })
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
      loadTop (id) {
        let _this = this;
        setTimeout(function () {
          _this.loadData('refresh', false ,_this.checked);
          _this.$refs.loadmore.onTopLoaded(id);
        }, 200);
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      loadBottom(id) {
        let _this = this;
        setTimeout(function () {
          _this.loadData('load', false ,_this.checked);
          _this.$refs.loadmore.onBottomLoaded(id);
        },200);
      },
      checkType(action,loading,type){
        this.type = type;
        this.loadData(action,loading,type)
      }
    },
    activated() {
      let type = sessionStorage.getItem("checked");
      this.loadData('refresh', false ,type);
    },
    filters: {
      source: function (value) {
        if (value === 0){
          return "线上订单"
        }
        else if(value === 1){
          return "线下订单"
        }
        else if(value === 2){
          return "现场订单"
        }
        else if(value === 3){
          return "e批小店"
        }
        else{
          return value
        }
      }
    }
  }
</script>
<style lang="scss">
  .clearfix:after {
    content: "\0020";
    display: block;
    height: 0;
    clear: both;
  }
  .clearfix {
    zoom: 1;
  }
  .box_title{
    height: 98px;
    line-height: 98px;
    color: #434343;
    font-size: 36px;/*px*/
    background: #f8f8f8;
    border-bottom: 1px solid #dcdcdc;
    text-align: center;
    i{
      width: 34px;
      height: 34px;
      float: right;
      margin: 31px 44px 31px 0;
      display: inline-block;
      background: url(../../../static/image/close_icon.png) no-repeat center / 100% 100%;
    }
  }
  .box_content{
    padding: 154px 122px 200px;
    font-size: 74px;/*px*/
    color: #434343;
    text-align: center;
    letter-spacing: 56px;
  }
  #order_list {
    .container{
      overflow-y: scroll;
      .item_head{
        height: 88px;
        position: fixed;
        width: 100%;
        top:90px;
        z-index: 99;
        background: #fff;
        .unchecked{
          font-size: 32px;/*px*/
          width: 20%;
          float: left;
          height: 88px;
          text-align: center;
          line-height: 88px;
          background: #fff;
        }
        .on{
          border-bottom: 3px solid #009983;/*no*/
          border-radius: 5px;
          color: #009983;
        }
      }
    }
    .mint-navbar{
      padding: 0 11px;
      height: 88px;
      position: fixed;
      width: 100%;
      top:90px;
      z-index: 99;
    }
    .mint-tab-item{
      color: #626262;
      font-size: 30px;/*px*/
    }
    .is-selected{
      color: #009983;
      border-bottom: 5px solid #009983;/*no*/
    }
    .mint-tab-item-label{
      font-size: 30px;/*px*/
    }
    .mint-tab-container{
      margin-top: 108px;
    }
    .item_box{
      margin-top: 110px;
      .order_item{
        margin-bottom: 20px;
        background: #fff;
        .order_item_head{
          color: #313131;
          height: 32px;
          line-height: 32px;
          padding: 34px 0 32px;
          /*border-bottom: 1px solid #efefef;!*no*!*/
          .order_item_head_left{
            font-size: 32px;/*px*/
            display: inline-block;
            width: 375px;
            text-align: left;
            text-indent: 30px;
            float: left;
          }
          .order_item_head_right{
            font-size: 24px;/*px*/
            display: inline-block;
            width: 340px;
            text-align: right;
            margin-right: 35px;
            float: right;
            color: #898989;
          }
        }
        .order_item_ext{
          height: 28px;
          line-height: 28px;
          font-size: 28px;/*px*/
          padding: 0 30px 32px;
          display: block;
          .left{
            color: #898989;
            float: left;
            i{
              display: inline-block;
              width: 34px;
              height: 34px;
              background: url(../../../static/image/icon_store.png) no-repeat center / 100% 100%;
              vertical-align: sub;
              margin-right: 10px;
            }
          }
          .right{
            color: #009983;
            float: right;
          }
        }
        .order_item_content{
          margin: 0 20px;
          background: #f3f4f7;
          height: 150px;
          width: 710px;
          .order_item_content_head{
            width: 150px;
            float: left;
            height: 150px;
            text-align: center;
            img{
              width: 120px;
              height: 120px;
              margin-top: 15px;
            }
          }
          .order_item_content_main{
            width: 500px;
            float: left;
            padding: 30px 10px 0;
            font-size: 28px;/*px*/
            color: #313131;
          }
        }
        .order_item_content_imgbox{
          margin: 0 20px;
          background: #f3f4f7;
          height: 150px;
          width: 710px;
          overflow: scroll;
          white-space: nowrap;
          .order_item_content_head{
            width: 150px;
            display: inline-block;
            height: 150px;
            text-align: center;
            img{
              width: 120px;
              height: 120px;
              margin-top: 15px;
            }
          }
        }

        .order_item_ext2{
          height: 72px;
          line-height: 72px;
          border-bottom: 1px solid #dcdcdc;/*no*/
          padding: 0 30px;
          .left{
            color: #626262;
            font-size: 28px;/*px*/
            float: left;
            margin-left: 120px;
          }
          .right{
            color: #ff0000;
            float: right;
            .main{
              font-size: 26px;/*px*/
            }
            .ext{
              font-size: 22px;/*px*/
            }
          }
        }
        .order_item_bottom{
          height: 98px;
          line-height: 98px;
          padding:0 10px 0 35px;
          .left{
            color: #009983;
            font-size: 28px;/*px*/
            float: left;
            i{
              display: inline-block;
              width: 11px;
              height: 16px;
              background: url(../../../static/image/delivery_code.png) no-repeat center / 100% 100%;
              margin-left: 5px;
            }
          }
          .right{
            float: right;
            .mint-button--default{
              background: #fff;
              color: #626262;
              width: 156px;
              height: 62px;
              line-height: 62px;
              margin-right: 25px;
              -webkit-box-shadow:0 0 0.5px #dcdcdc;/*no*/
              box-shadow:0 0 0.5px #dcdcdc;/*no*/
              border-radius: 1px;/*no*/
            }
            .mint-button--primary{
              background: #3eb049;
              color: #fff;
              width: 156px;
              height: 62px;
              line-height: 62px;
              margin-right: 25px;
              -webkit-box-shadow:0 0 0.5px #3eb049;/*no*/
              box-shadow:0 0 0.5px #3eb049;/*no*/
              border-radius: 1px;/*no*/
            }
            .mint-button-text{
              font-size: 26px;
            }
          }
        }
      }
    }
    .emptyList{
      margin: 200px 0 50px;
      width: 100%;
      height: 300px;
      background: url(../../../static/image/listEmpty.png) no-repeat center / 205px 237px;
    }
    .emptyTitle{
      text-align: center;
      width: 100%;
      font-size: 34px;/*px*/
      font-weight: bold;
      color: #959595;
    }
  }
</style>
