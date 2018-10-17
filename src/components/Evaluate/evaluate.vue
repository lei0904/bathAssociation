<template>
  <div id="view_evaluate">
    <Header :text="'获得的评价'" ></Header>
    <div class="head_top clearfix">
      <div class="left">
        <div class="circle">
          <progress-bar type="circle" ref="circle" :options="options"></progress-bar>
          <div class="text_box">
            <div><span>97</span><span>%</span></div>
            <p>好评</p>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="type_button" :class="preference == 1 ? 'checked' : ''" @click="preference=1">全部(1920)</div>
        <div class="type_button" :class="preference == 2 ? 'checked' : ''" @click="preference=2">好评(1900)</div>
        <div class="type_button" :class="preference == 3 ? 'checked' : ''" @click="preference=3">满意(19)</div>
        <div class="type_button" :class="preference == 4 ? 'checked' : ''" @click="preference=4">吐槽(1)</div>
      </div>
    </div>
    <div class="evaluate_item">
      <div class="head"><span>张点当</span><span>2017-08-08 19:12</span></div>
      <div class="type">评价:
        <span class="type_1">
          <span><i></i>点赞</span>
        </span>
        <span class="type_2">
          <span><i></i>满意</span>
        </span>
        <span class="type_3">
          <span><i></i>吐槽</span>
        </span>
      </div>
      <div class="detail">水果品质不错，物流很及时！我同事也是赞不绝口！</div>
      <div class="img clearfix">
        <img src="../../../static/image/test_5.png">
        <img src="../../../static/image/test_5.png">
        <img src="../../../static/image/test_5.png">
      </div>
    </div>
    <div class="evaluate_item">
      <div class="head"><span>张点当</span><span>2017-08-08 19:12</span></div>
      <div class="type">评价:
        <span class="type_1">
          <span><i></i>点赞</span>
        </span>
        <span class="type_2">
          <span><i></i>满意</span>
        </span>
        <span class="type_3">
          <span><i></i>吐槽</span>
        </span>
      </div>
      <div class="detail">水果品质不错，物流很及时！我同事也是赞不绝口！</div>
      <div class="img clearfix">
        <img src="../../../static/image/test_5.png">
        <img src="../../../static/image/test_5.png">
        <img src="../../../static/image/test_5.png">
      </div>
    </div>
    <div class="evaluate_item">
      <div class="head"><span>张点当</span><span>2017-08-08 19:12</span></div>
      <div class="type">评价:
        <span class="type_1">
          <span><i></i>点赞</span>
        </span>
        <span class="type_2">
          <span><i></i>满意</span>
        </span>
        <span class="type_3">
          <span><i></i>吐槽</span>
        </span>
      </div>
      <div class="detail">水果品质不错，物流很及时！我同事也是赞不绝口！</div>
      <div class="img clearfix">
        <img src="../../../static/image/test_5.png">
        <img src="../../../static/image/test_5.png">
        <img src="../../../static/image/test_5.png">
      </div>
    </div>
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
        preference:1
      }
    },
    methods: {

    },
    mounted: function () {
      this.$refs.circle.animate(0.97)
    }
  }
</script>
<style lang="scss">
  #view_evaluate{
    height: 100vh;
    overflow-y: scroll;
    .head_top{
      height: 170px;
      background: #fff;
      padding-top: 30px;
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
