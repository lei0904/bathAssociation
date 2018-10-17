<template>
  <div class="top" :class="type == 'index' ? '' : 'h70'">
    <section class="shop">
      <span class="name" @click="toDetail()">{{storeInfo.name}}</span>
      <span class="status status1" v-if="type == 'index' && status == 1">
        <span class="bg"></span>
        <span class="txt">申请中</span>
      </span>
      <span class="status status2" v-if="type == 'index' && status == 2">
        <span class="bg"></span>
        <span class="txt">会员</span>
      </span>
      <div class="search-shop" v-if="select" @click="selectClick">{{selectTitle}}</div>
    </section>

    <section class="search" v-if="type == 'index'">
      <form >
        <input type="search"
               v-model="searchInputValue"
               @focus="searchInputActive = true"
               @blur="searchInputActive = false"
               class="search-input"
               placeholder="请输入商品名称">
        <i class="clear" v-show="searchInputValue && searchInputActive" @click="searchInputValue = ''"></i>
        <input type="submit" name="submit" class="none" @click.prevent="searchSubmit">
      </form>
    </section>


    <DataPicker ref="dataPicker"
                :values="values"
                :vk="'name'"
                :defaultIndex="-1"
                @confirm="dataSelected"></DataPicker>
  </div>
</template>
<script>
  import DataPicker from '../Picker/DataPicker/index.vue'

  export default {
    name: 'Index',

    props: {
      type: {
        type: String,
        'default': 'index'
      },
      select: {
        type: Boolean,
        'default': false
      },
      values: {
        type: Array
      }
    },

    components: {
      DataPicker
    },

    data() {
      return {
        storeInfo: {},
        searchInputValue: '',
        searchInputActive: false,
        status: 2,
        sheetVisible: false,

        selectTitle: ''
      }
    },
    watch: {
      values(vals) {
        this.selectTitle = vals[0]['name'];
      }
    },
    methods:{
      setItem(item) {
        this.dataSelected (item);
      },
      toDetail() {
        this.$router.push('/store_info');
      },
      searchSubmit(){
        this.$emit('searchSubmitHandler', this.searchInputValue);
      },
      dataSelected (val) {
        this.selectTitle = val['name'];
        this.$emit('dataSelectedHandler', val);
      },
      selectClick() {
        this.$refs['dataPicker'].open()
        // this.$emit('selectClickHandler');
      }

      /*,
      selectType() {
        this.sheetVisible = true
      },
      changeType(id){
        let _this = this;
        this.$api.nextLevel({
          "token": sessionStorage.getItem("token"),
          "storeId": 4,
          "topCategoryId":id
        }).then((rets) => {
          sessionStorage.setItem("typeData",JSON.stringify(rets));
          _this.sheetVisible=false;
        })
      },
      onTypeChange(picker, values) {
        this.goodsType = values[0];
      },
      getType() {
        let _this = this;
        this.$api.topLevel({
          "token": sessionStorage.getItem("token"),
          "storeId": 4
        }).then((rets) => {
          let m =[];
          for (let i = 0; i < rets.length; i++) {
            m.push({
              name:rets[i].name,
              id:rets[i].id
            });
          }
          _this.typeSlot[0].values = m;
        })
      }*/
    },
    mounted () {
      this.storeInfo = JSON.parse(sessionStorage.getItem('storeInfo'));
    },
    activated(){
      let val = JSON.parse(sessionStorage.getItem("itemTopSelect"))
      this.dataSelected(val)
    }
  }
</script>
<style lang="scss">
  .top.h70 {
    height: 70px;
  }
  .top input[type="search"]{
    -webkit-appearance:none;
  }
  .top input[type=search]::-webkit-search-cancel-button{
    -webkit-appearance: none;//此处只是去掉默认的小×
  }
  .top .search .clear {
    display: inline-block;
    width: 44px;
    height: 44px;
    background: url("../../../static/image/input-clear.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    right: 16px;
    top: 8px;
  }
  .top .shop .search-shop {
    position: absolute;
    right: 0;
    height: 48px;
    line-height: 48px;
    min-width: 180px;
    background: #efefef url("../../../static/image/search-input-bg.png") no-repeat 30px center;
    background-size: 29px 29px;
    top: 50%;
    margin-top: -24px;
    border-radius: 48px;
    border: none;
    outline: none;
    box-sizing: border-box;
    font-size: 30px;
    color: #788790;
    padding: 0 30px 0 70px;
    overflow: hidden;
  }

  .top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 950;
    background: #fcfcfc;
  }

  .top .search {
    margin-top: 12px;
    margin-bottom: 40px;
    background: #fcfcfc;
    position: relative;
  }
  .top .search .search-input{
    width: 100%;
    height: 60px;
    background: #efefef url("../../../static/image/search-input-bg.png") no-repeat 44px center;
    background-size: 29px 29px;
    padding-left: 89px;
    padding-right: 44px;
    box-sizing: border-box;
    border: none;
    outline: none;
    font-size: 30px; /*px*/
    color: #434343;
    border-radius: 60px;
  }


  .top {
    height: 182px;
    padding-left: 34px;
    padding-right: 34px;
    margin-top: 15px;
  }
  .top .shop {
    height: 70px;
    line-height: 70px;
    position: relative;
  }
  .top .shop .name {
    color: #434343;
    font-size: 36px; /*px*/
  }
  .top .status {
    height: 44px;
    line-height: 44px;
    font-size: 26px; /*px*/
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -22px;
  }
  .top .status.status1 {
    color: #313131;
    width: 184px;
    text-align: center;
  }
  .top .status.status1 .bg {
    display: inline-block;
    width: 48px;
    height: 44px;
    background: url("../../../static/image/status1_bg.png") no-repeat center;
    background-size: 100% 100%;
    position: absolute;
    left: 0px;
    z-index: 10;
  }
  .top .status.status1 .txt {
    display: inline-block;
    width: 160px;
    height: 44px;
    text-align: center;
    border: 1px solid #F1F1F1; /*no*/
    box-sizing: border-box;
    position: absolute;
    border-radius: 0 44px 44px 0;
    z-index: 1;
    right: 0;
  }
  .top .status.status2 {
    color: #43AF4E;
    width: 144px;
    text-align: center;
  }
  .top .status.status2 .bg {
    display: inline-block;
    width: 48px;
    height: 44px;
    background: url("../../../static/image/status2_bg.png") no-repeat center;
    background-size: 100% 100%;
    position: absolute;
    left: 0px;
    z-index: 10;
  }
  .top .status.status2 .txt {
    display: inline-block;
    width: 120px;
    background: #F6FEF6;
    height: 44px;
    text-align: center;
    border: 1px solid #43AF4E; /*no*/
    box-sizing: border-box;
    position: absolute;
    border-radius: 0 44px 44px 0;
    z-index: 1;
    right: 0;
  }
  .top .none{
    display: none;
  }
  .popup_top{
    position: absolute;
    top:-80px;
    width: 100%;
    background: #fff;
  }
</style>
