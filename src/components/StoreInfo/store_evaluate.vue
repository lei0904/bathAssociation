<template>
  <div id="store_evaluate">
    <Header :text="'评价'" ></Header>
    <div class="head_top clearfix">
      <div class="left">
        <div class="circle">
          <progress-bar type="circle" ref="circle" :options="options"></progress-bar>
          <div class="text_box">
            <div><span>{{commit.goodCommentsRate}}</span><span>%</span></div>
            <p>好评</p>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="type_button" :class="preference == 1 ? 'checked' : ''" @click="preference=1">全部({{commit.allCommentsCount}})</div>
        <div class="type_button" :class="preference == 2 ? 'checked' : ''" @click="preference=2">好评({{commit.goodCommentsCount}})</div>
        <div class="type_button" :class="preference == 3 ? 'checked' : ''" @click="preference=3">满意({{commit.middleCommentsCount}})</div>
        <div class="type_button" :class="preference == 4 ? 'checked' : ''" @click="preference=4">吐槽({{commit.badCommentsCount}})</div>
      </div>
    </div>
    <mt-loadmore :top-method="loadTop"
                 @top-status-change="handleTopChange"
                 :bottom-method="loadBottom"
                 @bottom-status-change="handleBottomChange"
                 :bottom-all-loaded="allLoaded"
                 ref="loadmore"
                 :autoFill = "false">
    <div class="evaluate_item" v-for="item in content">
      <div class="head"><span>{{item.nickname}}</span><span>{{item.time}}</span></div>
      <div class="type">评价:
        <span :class="item.score | className">
          <span><i></i>{{item.score | scoreText}}</span>
        </span>
      </div>
      <div class="detail">{{item.content || "该用户没有填写评价"}}</div>
      <!--<div class="img clearfix">-->
        <!--<img src="../../../static/image/test_5.png">-->
        <!--<img src="../../../static/image/test_5.png">-->
        <!--<img src="../../../static/image/test_5.png">-->
      <!--</div>-->
    </div>
    </mt-loadmore>
  </div>
</template>
<script>
  import Vue from 'vue'
  import VueProgress from 'vue-progress'
  Vue.use(VueProgress);
  export default {
    name: 'StoreInfo',
    data: function () {
      return {
        options: {
          color: '#aaa',
          // This has to be the same size as the maximum width to
          // prevent clipping
          strokeWidth: 4,
          trailWidth: 1,
          easing: 'easeInOut',
          duration: 1400,
          text: {
            autoStyleContainer: false
          },
          from: { color: '#3eb049', width: 1 },
          to: { color: '#00cfc3', width: 4 },
          // Set default step function for all animate calls
          step: function(state, circle) {
            circle.path.setAttribute('stroke', state.color);
            circle.path.setAttribute('stroke-width', state.width);
            var value = Math.round(circle.value() * 100 ) + ' %';
            if (value === 0) {
              circle.setText('')
            } else {
              circle.setText('')
            }
          }
        },
        preference:1,
        commit:{},

        content:[],
        allLoaded: false,
        topStatus: '',
        bottomStatus: '',
        pageNumber: 0,
        pageSize: 5,
        empty:false
      }
    },
    methods: {
//      getData(){
//        let _this = this;
//        this.$api.store_commit({
//
//        }).then((rets) => {
//          _this.commit = rets;
//          this.$refs.circle.animate(rets.goodCommentsRate/100)
//        })
//      },


      loadData(action, id, loading) {
        let _this = this;
        if ('load' == action) {
          this.pageNumber = this.pageNumber + 1;
        } else {
          this.pageNumber = 0;
        }
        this.$api.store_commit({
          "pageNumber": _this.pageNumber,
          "pageSize":  _this.pageSize
        }).then((rets) => {
          if ('refresh' == action) {
            _this.content = []
          }
          _this.$refs.circle.animate(rets.goodCommentsRate/100);
          _this.commit = rets;
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
          _this.loadData('refresh', id, false);
          _this.$refs.loadmore.onTopLoaded(id);
        }, 200);
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      loadBottom(id) {
        let _this = this;
        setTimeout(function () {
          _this.loadData('load', id, false);
          _this.$refs.loadmore.onBottomLoaded(id);
        },200);
      }
    },
    activated(){
      this.loadData('refresh', false);
    },

    filters: {
      className: function (value) {
        if( value === 1 ){
          return "type_3";
        }else if( value === 2 ){
          return "type_2";
        }else{
          return "type_1";
        }
      },
      scoreText: function (value) {
        if( value === 1 ){
          return "吐槽";
        }else if( value === 2 ){
          return "满意";
        }else{
          return "点赞";
        }
      }
    }
  }
</script>
<style lang="scss">
  #store_evaluate{
    height: 100vh;
    overflow-y: scroll;
    .header{
      position: fixed;
      top:0;
      width: 100%;
      left:0;
    }
    .head_top{
      height: 170px;
      background: #fff;
      padding-top: 110px;
      .left{
        float: left;
        height: 144px;
        width: 280px;
        border-right: 1px solid #dddddd;/*no*/
        .circle{
          width: 140px;
          height: 140px;
          position: relative;
          margin-left: 72px;
        }
        .text_box{
          position: absolute;
          width: 80px;
          height: 80px;
          left:50%;
          top: 50%;
          margin-left: -40px;
          margin-top: -30px;
          text-align: center;
          div{
            height: 40px;
            line-height: 40px;
            span:nth-child(1){
              font-size: 40px;/*px*/
              font-weight: bold;
            }
            span:nth-child(2){
              font-size: 27px;/*px*/
            }
          }
          p{
            height: 40px;
            line-height: 40px;
            font-size: 22px;/*px*/
          }
        }
      }
      .right{
        float: left;
        height: 144px;
        width: 465px;
        .type_button{
          width: 180px;
          height: 60px;
          border-radius: 15px;
          font-size: 26px;/*px*/
          text-align: center;
          line-height: 60px;
          color: #626262;
          border: 1px solid #dcdcdc;/*no*/
          float: left;
          margin-left: 18px;
        }
        .type_button:nth-child(1),.type_button:nth-child(3){
          margin-left: 32px;
        }
        .type_button:nth-child(1),.type_button:nth-child(2){
          margin-bottom: 24px;
        }
        .type_button:nth-child(3),.type_button:nth-child(4){
          margin-top: -4px;/*px*/
        }
        .checked{
          background: #3eb049;
          color: #fff;
        }
      }
    }
    .evaluate_item{
      background: #fff;
      .head{
        height: 88px;
        line-height: 88px;
        margin: 0 56px 0 32px;
        border-bottom: 1px solid #eeeeee;/*no*/
        span{
          float: right;
        }
        span:first-child{
          float: left;
        }
      }
      .type{
        color: #313131;
        font-size: 30px;/*px*/
        margin: 30px 56px 30px 32px;
        height: 34px;
        line-height: 34px;
        .type_1{
          span{
            color: #ee5d11;
            i{
              display: inline-block;
              margin-right: 14px;
              width: 34px;
              height: 34px;
              background: url(../../../static/image/type_1.png) no-repeat center / 100% 100%;
              vertical-align: bottom;
            }
          }
        }
        .type_2{
          span{
            color: #ff9600;
            i{
              display: inline-block;
              margin-right: 14px;
              width: 34px;
              height: 34px;
              background: url(../../../static/image/type_2.png) no-repeat center / 100% 100%;
              vertical-align: bottom;
            }
          }
        }
        .type_3{
          span{
            color: #aaaaaa;
            i{
              display: inline-block;
              margin-right: 14px;
              width: 34px;
              height: 34px;
              background: url(../../../static/image/type_3.png) no-repeat center / 100% 100%;
              vertical-align: bottom;
            }
          }
        }
      }
      .detail{
        color: #313131;
        font-size: 30px;/*px*/
        margin: 0 56px 30px 32px;
        padding-bottom: 30px;
      }
      .img{
        img{
          width: 222px;
          height: 222px;
          float: left;
          margin: 28px 8px 30px 0;
        }
        img:first-child{
          margin-left: 34px;
        }
      }
    }
  }
</style>
