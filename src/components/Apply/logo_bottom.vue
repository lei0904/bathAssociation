<template>
  <div id="logo_bottom" class="bottom-area">
    <div class="more">
      <span class="text">更多信息</span>
    </div>
    <div class="logo">
      <img src="../../../static/image/logo2x.png">
    </div>
    <div class="copyright">e批生鲜提供技术支持</div>
  </div>
</template>

<style type="">
  #logo_bottom {
    height: 250px;
    margin-top: 0.4rem;
    text-align: center;
  }
  #logo_bottom .more {
    text-align: center;
    position: relative;
    height: 30px;
  }
  #logo_bottom .more .text {
    background: #f5f6f7;
    position: absolute;
    z-index: 10;
    left: 50%;
    font-size: 30px;/*px*/
    color: #434343;
    width: 160px;
    margin-left: -80px;
  }
  #logo_bottom .more:before,
  #logo_bottom .more:after {
    content: '';                 /*CSS伪类用法*/
    position: absolute;         /*定位背景横线的位置*/
    top: 50%;
    background: #626262;       /*宽和高做出来的背景横线*/
    width: 210px;
    /*background-image: -webkit-linear-gradient(top,#aaaaaa,#aaaaaa 50%,transparent 0);*/
    /*background-image: linear-gradient(180deg,#aaaaaa,#aaaaaa 50%,transparent 0);*/
    background-size: 120% 1px; /*no*/
    height: 1px; /*no*/
  }
  #logo_bottom .more:before {
    left: 50%;        /*调整背景横线的左右距离*/
  }
  #logo_bottom .more:after {
    right: 50%;
  }
  #logo_bottom .logo img {
    width: 178px;
    height: 82px;
    margin-top: 22px;
  }
  #logo_bottom .copyright {
    margin-top: 24px;
    font-size: 22px;/*px*/
    color: #959595;
  }
  .bottom-area{
    position: absolute;
    bottom: 0;
    width: 100%;
    background: #f5f6f7;
    padding-top: 0.4rem;
  }
</style>
