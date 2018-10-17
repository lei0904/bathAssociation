<template>
  <div id="wallet">
    <Header :text="'我的钱包'" :explain="'钱包说明'" :actionable="true" @action="toWalletNote"></Header>
    <div class="wallet-head">
      <p class="balance"><span class="front">{{balanceInteger}}</span>.<span class="after">{{balancedecimal}}</span></p>
      <div class="ext">余额（元）</div>
      <div class="ext_1"><div class="line"></div><div class="ext_text">e批生鲜</div><div class="line"></div></div>
    </div>
    <mt-cell title="查看周期" class="check_date marb20">
      <mt-button size="small" type="primary" @click="dateClick">{{text}}</mt-button>
      <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    </mt-cell>
    <div class="item_content">
      <mt-loadmore :top-method="loadTop"
                   @top-status-change="handleTopChange"
                   :bottom-method="loadBottom"
                   @bottom-status-change="handleBottomChange"
                   :bottom-all-loaded="allLoaded"
                   ref="loadmore"
                   :autoFill = "false">
        <mt-cell v-for="(item , index) in content" :key="index" :title="item.time" :value="item.used + '元'" class=" main_list"></mt-cell>
      </mt-loadmore>
      <div class="empty" v-if="content.length == 0">
        <div class="empty_img"></div>
        <div class="mar20">没有使用记录</div>
      </div>
    </div>


  </div>
</template>
<script>
  export default {
    name: 'Address',
    data() {
      return{
        balance:'',
        balanceInteger:'',
        balancedecimal:'',
        sheetVisible:false,
        text:"近一个月",
        actions:[],
        days:'30',
        content:[],

        allLoaded: false,
        topStatus: '',
        bottomStatus: '',
        pageNumber: 0,
        pageSize: 10,
        empty:false,
      }
    },
    methods:{
      save:function () {
        console.log("1")
      },
      dateClick:function () {
        this.sheetVisible = true
      },
      toWalletNote:function () {
        this.$router.push('/walletnote')
      },
      createFun (val, text){
          let _this = this;
          return function () {
            this.days = val;
            _this.text = text;
            _this.loadData('refresh', false)
          }
      },
      purseBalance(){
        let _this = this;
        this.$api.purseBalance({

        }).then((rets) => {
          _this.balance = rets.balance;
          _this.balanceInteger = Math.floor(rets.balance);
          _this.balancedecimal = String(rets.balance).split(".")[1];
          if(!_this.balancedecimal){
            _this.balancedecimal = '00'
          }
        })
      },

      loadData(action, id, loading) {
        let _this = this;
        if ('load' == action) {
          this.pageNumber = this.pageNumber + 1;
        } else {
          this.pageNumber = 0;
        }
        this.$api.useRecords({
          "pageNumber": _this.pageNumber,
          "pageSize":  _this.pageSize,
          "days":_this.days
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
          _this.loadData('refresh', id, false);
          _this.purseBalance();
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
    mounted() {
      this.actions = [{
        name: '近一个月',
        method: this.createFun(30,"近一个月")
      },{
        name: '近三个月',
        method: this.createFun(90,"近三个月")
      },{
        name: '近六个月',
        method: this.createFun(180,"近六个月")
      },{
        name: '近一年',
        method: this.createFun(365,"近一年")
      }];
    },
    activated(){
      this.purseBalance();
      this.loadData('refresh', false);
    }

  }
</script>
<style lang="scss">
  #wallet{
    height: 100vh;
    background: #efefef;
    .item_content{
      height: 60%;
      overflow-y: scroll;
    }
  }
  #wallet .wallet-head{
    height: 300px;
    background: #039d7e;
    position: relative;
    top:-1px;/*no*/
    color: #fff;
  }
  #wallet .header{
    background: #039d7e;
  }
  #wallet .header .header-text{
    color: #ffffff;
  }
  #wallet .header .action{
    font-size: 30px;/*px*/
    color: #ffffff;
  }
  #wallet .header .back{
    background: url("../../../static/image/back_white.png") no-repeat center / 20px 34px;
  }
  #wallet .header:after{
    display: none;
  }
  #wallet .balance{
    height: 150px;
    line-height: 200px;
    text-align: center;
    font-size: 82px;/*px*/
  }
  #wallet .balance .front{
    font-size: 82px;/*px*/
  }
  #wallet .balance .after{
    font-size: 55px;/*px*/
  }
  #wallet .ext{
    opacity: 0.7;
    font-size: 30px;/*px*/
    text-align: center;
    margin-top: 20px;
  }
  #wallet .ext_1{
    opacity: 0.7;
    font-size: 30px;/*px*/
    text-align: center;
    margin-top: 40px;
    padding: 0 34px;
    .ext_text{
      padding: 0 42px;
      float: left;
    }
    .line{
      width: 240px;
      height: 1px;/*no*/
      background: #ffffff;
      opacity: 0.7;
      float: left;
      margin-top: 13px;
    }
  }
  #wallet .check_date{
    margin-top: 20px;
  }
  #wallet .mint-button--primary ,#wallet .mint-button--primary:active {
    background: #fff;
    -webkit-box-shadow: 0 0 0 #fff !important;
    box-shadow: 0 0 0 #fff !important;
    background: url(../../../static/image/down-arrow.jpg) no-repeat right / 40px 20px;
  }
  #wallet .mint-button-text{
    padding-right: 30px;
    color: #000;
    font-size: 32px;/*px*/
  }
  .marb20{
    margin-bottom: 20px;
  }
  .mar20{
    margin-top: 20px;
  }
  #wallet .main_list{
    font-size: 30px;/*px*/
    height: 98px;
  }
  #wallet .check_date .mint-cell-wrapper{
    height: 98px;
  }
  #wallet .check_date .mint-cell-text{
    color: #313131;
    font-size: 32px;/*px*/
  }
  #wallet .mint-cell-text{
    color: #898989;
  }
  #wallet .mint-cell-value{
    color: #313131;
  }
  .tips1{
    text-align: center;
    font-size: 28px;/*px*/
    color: #959595;
    background: #efefef;
    margin-top: 50px;
  }
  .tips2{
    text-align: center;
    font-size: 26px;/*px*/
    color: #009983;
    background: #efefef;
    position: absolute;
    bottom:80px;
    width: 100%;
  }
  .tips2 span{
    line-height: 32px;
    display: inline-block;
    height: 32px;
  }
  .tips2 i{
    display: inline-block;
    width: 32px;
    height: 32px;
    background: url(../../../static/image/wallet_tips.png) no-repeat center / 32px 32px;
    vertical-align: sub;
    margin-right: 20px;
  }
  .empty{
    font-size: 30px;/*px*/
    color: #959595;
    text-align: center;
    margin-top: 156px;
  }
  .empty_img{
    width: 186px;
    height: 186px;
    background: url(../../../static/image/empty_img.png) no-repeat center / 186px 186px;
    margin-left: 50%;
    position: relative;
    left:-93px;
  }
</style>
