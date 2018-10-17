<template>
  <div id="index" ref="index">
    <Top @searchSubmitHandler="searchSubmitHandler"></Top>
    <!--<div class="search-info">-->
      <!--<div class="title">热搜</div>-->
      <!--<div class="list">-->
        <!--<div class="list-item">苹果苹果苹果苹果</div>-->
        <!--<div class="list-item">苹果</div>-->
        <!--<div class="list-item">苹果</div>-->
      <!--</div>-->
    <!--</div>-->
    <div class="search-info" v-if="showHistory">
      <div class="title">历史搜索 <i class="btn" @click="clearHistory"></i></div>
      <div class="list" >
        <div v-for="i in history" class="list-item" @click="toSearch(i)">{{i}}</div>
      </div>
    </div>
    <section class="content">
        <div class="content-type-1 clearfix" v-if="type == 1">
          <div class="content-item" @click="contentItemClick(i)" v-for="i in content1">
            <div class="content-item-img">
              <img :src="i.iconUrl">
            </div>
            <div class="content-item-txt">{{i.name}}</div>
          </div>
        </div>

        <div class="content-type-2" v-if="type == 2">
          <div class="content-group clearfix"  v-for="i in content2">
            <div class="content-title">{{i.name}}</div>
            <div>
              <div class="content-item" @click="contentItemClick(a)" v-for="a in i.item">
                <div class="content-item-img">
                  <img :src="a.iconUrl">
                </div>
                <div class="content-item-txt">{{a.name}}</div>
              </div>
            </div>
          </div>
        </div>
    </section>
  </div>
</template>
<script>
  import Top from '../Top/index.vue'

  export default {
    name: 'Index',

    created () {
      this.content1 = this.content1.concat( this.content1 );
      this.content2 = this.content2.concat( this.content2 );
    },

    data () {
      return {
        showHistory: true,
        type: 2,
        content1: [],
        content2: [],
        history:[],
        isAcceptOrders:true
      }
    },

    methods: {
      searchSubmitHandler (item) {
        sessionStorage.setItem("searchWord",item);
        this.$router.push("/serach-result");
      },
      contentItemClick (item) {
        this.$emit('indexContentItemClick', item);

      },
      clearHistory(){
        let _this = this;
        this.$api.historyDelete({

        }).then((rets) => {
          if(rets.success){
            _this.history = []
          }
        })
      },
      getTopLevel(){
        let _this = this;
        this.$api.topLevel({

        }).then((rets) => {
          if (rets.length >= 4 ){
              this.type = 1;
              _this.content1 = rets
              sessionStorage.setItem("itemTopSelect",JSON.stringify(rets[0]))
          }else{
            this.type = 2;
            _this.content2 = rets
          }
        })
      },
      getHistory(){
        let _this = this;
        this.$api.getHistory({

        }).then((rets) => {
          _this.history = rets
        })
      },
      toSearch(i){
        sessionStorage.setItem("searchWord",i);
        this.$router.push("/serach-result")
      }
    },

    components: {
      Top
    },
    activated(){
      this.getTopLevel();
      this.getHistory();
    }
  }
</script>
<style lang="scss">
  #index .search-info {
    padding-bottom: 32px;
    padding-left: 34px;
    padding-right: 34px;
    background: #fcfcfc;
  }
  #index .search-info:last-of-type {
    border-bottom: none;
    margin-bottom: 0;
  }
  #index .search-info .title {
    font-size: 30px; /*px*/
    color: #434343;
    position: relative;
  }
  #index .search-info .title .btn{
    display: inline-block;
    width: 34px;
    height: 34px;
    background: url("../../../static/image/btn-remove.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 50%;
    right: 0;
    margin-top: -17px;
  }
  #index .search-info .list {
    padding-bottom: 32px;
    border-bottom: 1px solid $border; /*no*/
  }
  #index .search-info:last-of-type .list{
    border-bottom: none;
    padding-bottom: 0;
  }
  #index .search-info .list .list-item {
    padding: 0 18px;
    box-sizing: border-box;
    margin-top: 30px;
    margin-right: 5%;
    display: inline-block;
    width: 20%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    height: 48px;
    line-height: 48px;
    text-align: center;
    background: #efefef;
    border-radius: 4px;
    color: #626262;
    font-size: 28px;
  }

  #index {
    background: #fcfcfc;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    padding-top: 200px;
    overflow: auto;
  }

  #index .content {
    overflow: hidden;
    position: relative;
    bottom: $footerPx;
    top: 0;
    background: #ffffff;
  }


  #index .content-type-1,
  #index .content-type-2 {
    padding: 8px 34px 40px;
    border-top: 1px solid $border; /*no*/
    width: 100%;
  }
  #index  .content-item {
    float: left;
    width: 146px;
    height: 186px;
    display: block;
    margin-left: 32px;
    margin-top: 32px;
  }
  #index  .content-item:first-child {
    margin-left: 0;
  }
  #index  .content-item:nth-of-type(4n + 1) {
    margin-left: 0;
  }
  #index  .content-item .content-item-img,
  #index  .content-item .content-item-img img {
    width: 146px;
    height: 146px;
  }
  #index  .content-item .content-item-txt {
    width: 146px;
    display: table-cell;
    text-align: center;
    vertical-align: bottom;
    height: 40px;
    font-size: 30px;
    color: #434343;
  }

  #index .content-type-2 .content-group .content-title {
    background: -webkit-linear-gradient(left,#efedf9,#ffffff);
    background: -o-linear-gradient(right,#efedf9,#ffffff);
    background: -moz-linear-gradient(right,#efedf9,#ffffff);
    background: linear-gradient(to right, #efedf9, #ffffff);
    height: 52px;
    line-height: 52px;
    color: #313131;
    font-size: 32px; /*px*/
    padding-left: 34px;
    padding-right: 34px;
    border-radius: 52px;
    margin-top: 32px;
  }
  #index .content-type-2 .content-group {
    margin-bottom: 18px;
    width: 100%;
  }
</style>
