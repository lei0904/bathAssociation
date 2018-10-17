<template>
  <div id="refund">
    <Header :text="'减免退'"></Header>
    <div class="refund_box">
      <mt-loadmore :top-method="loadTop"
                   @top-status-change="handleTopChange"
                   :bottom-method="loadBottom"
                   @bottom-status-change="handleBottomChange"
                   :bottom-all-loaded="allLoaded"
                   ref="loadmore"
                   :autoFill = "false">
        <div class="refund_item" v-for="item in content" @click="toDetail(item.id)">
        <div class="head clearfix">
          <span class="left">减免退编号：{{item.jmtNo | jmtNo}}</span>
          <span class="right">{{item.jmtRefundStatusTitle}}</span>
        </div>
        <div class="center">
          <div class="content">
            <img :src="item.productImgUrl">
            <span>{{item.productTitle}}</span>
          </div>
        </div>
        <div class="bottom">
        <span class="left">
          {{item.jmtApplyDate}}
        </span>
          <span class="right">
          <span>退货：{{item.jmtProductCount}}{{item.productChargeUnit}}</span>
          <span>减免退金额：{{item.jmtPrice}}元</span>
        </span>
        </div>
      </div>
      </mt-loadmore>
    </div>
  </div>
</template>
<script>
  import MessageDialog from '../Dialogs/MessageDialog/index.js'
  export default {
    name: 'OrderList',
    data() {
      return {
        content:[],
        allLoaded: false,
        topStatus: '',
        bottomStatus: '',
        pageNumber: 0,
        pageSize: 5,
        empty:false,
      };
    },
    methods:{
      toDetail:function (id) {
        sessionStorage.setItem("jmtNo",id);
        this.$router.push("/refund_detail")
      },
      loadData(action, loading ,productId) {
        let _this = this;
        if ('load' == action) {
          this.pageNumber = this.pageNumber + 1;
        } else {
          this.pageNumber = 0;
        }
        this.$api.jmtList({
          "pageNumber": _this.pageNumber,
          "pageSize":  _this.pageSize,
          "productId":productId
        }).then((rets) => {
          if ('refresh' == action) {
            _this.content = []
          }
          _this.content = _this.content.concat(rets.content);
          _this.allLoaded = rets.last;
          console.log(_this.content)
        })
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
      loadTop (id) {
        let _this = this;
        setTimeout(function () {
          _this.loadData('refresh', false);
          _this.$refs.loadmore.onTopLoaded(id);
        }, 200);
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      loadBottom(id) {
        let _this = this;
        setTimeout(function () {
          _this.loadData('load', false);
          _this.$refs.loadmore.onBottomLoaded(id);
        },200);
      }
    },
    activated() {
      let productId = sessionStorage.getItem("productId");
      this.loadData('refresh', false , productId);
    },
    filters: {
      jmtNo: function (value) {
        let str = String(value);
        return str.substr(str.length-6)
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
  #refund{
    height: 100vh;
    background: #efefef;
    padding-top: 90px;
    .refund_box{
      height: 100%;
      overflow-y: scroll;
    }
    .header{
      position: fixed;
      width: 100%;
      top:0;
    }
    .refund_item{
      background: #fff;
      margin-top: 20px;
      .head{
        height: 86px;
        line-height: 86px;
        background: #ffffff;
        padding: 0 34px;
        font-size: 30px;/*px*/
        width: 682px;
        border-bottom: 1px solid #efefef;/*no*/
        .left{
          color: #434343;
          float: left;
        }
        .right{
          color: #ff0000;
          float: right;
        }
      }
      .center{
        height: 140px;
        padding: 30px 18px 0 18px;
        .content{
          width: 720px;
          height: 140px;
          background: #efefef;
          position: relative;
          img{
            width: 104px;
            height: 104px;
            margin: 20px;
            position: absolute;
            left:0;
            top:0;
          }
          span{
            margin:20px 0 0 150px;
            color: #313131;
            font-size: 30px;/*px*/
            display: inline-block;
          }
        }
      }
      .bottom{
        height: 88px;
        line-height: 88px;
        padding: 0 34px;
        width: 682px;
        .left{
          font-size: 22px;/*px*/
          color: #626262;
          float: left;
        }
        .right{
          font-size: 28px;
          color: #ff0000;
          float: right;
          span:first-child{
            margin-right: 28px;
          }
        }
      }
    }
    .refund_item:last-child{
      margin-bottom: 90px;
    }
  }
</style>
