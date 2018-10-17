<template>
  <div id="trace">
    <Header :text="'溯源信息'"></Header>
    <div class="header_img"></div>
    <div class="trace_item clearfix">
      <div class="left">
        <img :src="img">
      </div>
      <div class="right">
        {{origin.title}}
      </div>
    </div>
    <div class="trace_detail clearfix">
      <div class="trace_line"></div>
      <div class="trace_1" v-if="origin.origin">
        <div class="trace_date">{{origin.productionDate}}<i></i></div>
        <div class="trace_text">产地<span>【{{origin.origin}}】</span></div>
        <div class="trace_text">生产日期<span>【{{origin.productionDate}}】</span></div>
        <div class="trace_text">产地证明</div>
        <div v-for="item in origin.originProveImages" class="trace_img" ><img :src="item"></div>
      </div>
      <div class="trace_2" v-for="items in origin.nodeList">
        <div class="title">{{items.nodeTime}}<i></i></div>
        <div class="text">{{items.nodeName}}</div>
      </div>
    </div>
    <div class="trace_ext" v-if="!origin.origin">暂无溯源信息！</div>
    <div class="trace_ext">感谢您的光顾！</div>
  </div>
</template>
<script>
  export default {
    name: 'Trace',
    data:function () {
        return{
          origin:{},
          img:''
        }
    },
    methods:{
//      track
      getTrack(a ,b){
        let _this = this;
        this.$api.getTrack({
          "itemId":a,
          "productId":b
        }).then((rets) => {
          console.log(rets)
          this.origin = rets;
        })
      }
    } ,
    activated(){
      let a = sessionStorage.getItem("trackId");
      let b = sessionStorage.getItem("productId");
      this.img  = sessionStorage.getItem("productIdImg");
      this.getTrack(a,b)
    }
  }
</script>
<style lang="scss">
  #trace{
    background: #efefef;
    height: 100vh;
    width: 100%;
    overflow-y: scroll;
    .header{
      background: #169c7c;
      position: fixed;
      width: 100%;
      span{
        color: #fff;
      }
      a{
        background: url(../../../static/image/back_white.png) no-repeat center / 20px 34px;
      }
    }
    .header:after{
      display: none;
    }
    .header_img{
      background: url(../../../static/image/background.jpg) no-repeat center / 750px 443px;
      width: 750px;
      height: 443px;
      margin-top: -1px;/*no*/
    }
    .trace_item{
      height: 162px;
      background: #f2f5f7;
      .left{
        width: 175px;
        text-align: center;
        float: left;
        img{
          width: 110px;
          height: 110px;
          margin-top: 26px;
        }
      }
      .right{
        float: left;
        width: 575px;
        padding:40px 0;
        font-size: 30px;/*px*/
        color: #313131;
      }
    }
    .trace_detail{
      padding: 0 34px;
      background: #fff;
      .trace_1{
        padding-left: 78px;
        width: 600px;
        border-left:4px solid #dcdcdc;/*no*/
        padding-bottom: 40px;
        .trace_date{
          color: #959595;
          font-size: 26px;/*px*/
          padding-top: 40px;
          position: relative;
          i{
            position: absolute;
            display: inline-block;
            width: 68px;
            height: 32px;
            background: url(../../../static/image/trace_0.png) no-repeat center / 100% 100%;
            left:-110px;
            top:50px;
          }
        }
        .trace_text{
          font-size: 32px;/*px*/
          margin-top: 32px;
          span{
            color: #3eb049;
          }
        }
        .trace_img{
          width: 600px;
          margin-top: 26px;
          img{
            width: 100%;
          }
        }
        .trace_img:first-child{
          margin-top: 35px;
        }
      }
      .trace_2{
        padding:38px 0 44px 78px;
        border-left:4px solid #dcdcdc;/*no*/
        border-top: 1px solid #dcdcdc;/*no*/
        .title{
          color: #959595;
          font-size: 26px;/*px*/
          position: relative;
          i{
            position: absolute;
            display: inline-block;
            width: 68px;
            height: 32px;
            background: url(../../../static/image/trace_0.png) no-repeat center / 100% 100%;
            left:-110px;
            top:50px;
          }
          .ok{
            background: url(../../../static/image/trace_1.png) no-repeat center / 100% 100%;
          }
        }
        .text{
          font-size: 32px;/*px*/
          color: #434343;
          margin-top: 28px;
        }
      }
      .trace_2:last-child {
        .title{
          i{
            background: url(../../../static/image/trace_1.png) no-repeat center / 100% 100%;
          }
        }
      }
      }
    .trace_ext{
      height: 150px;
      width: 750px;
      background: #efefef;
      font-size: 38px;/*px*/
      color: #959595;
      line-height: 120px;
      text-align: center;
    }
  }
</style>
