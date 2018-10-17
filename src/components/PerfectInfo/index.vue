<template>
  <div id="perfect_info">
    <Header :text="'完善信息'" :actionable="true" @action="save" :backable="false"></Header>
    <div class="container bg overflow">
      <section class="main_type">
        <div class="title">主体类型</div>
        <div class="content">
          <div class="line clearfix">
            <div class="item cyfd" :class="main_type == 0 ? 'on' : ''" @click="main_type=0"><span class="txt">餐饮饭店</span></div>
            <div class="item jgst" :class="main_type == 1 ? 'on' : ''" @click="main_type=1"><span class="txt">机关食堂</span></div>
            <div class="item csc" :class="main_type == 2 ? 'on' : ''" @click="main_type=2"><span class="txt">菜市场</span></div>
          </div>
          <div class="line clearfix">
            <div class="item sqsx" :class="main_type == 3 ? 'on' : ''" @click="main_type=3"><span class="txt">社区生鲜</span></div>
            <div class="item cs" :class="main_type == 4 ? 'on' : ''" @click="main_type=4"><span class="txt">超市</span></div>
            <div class="item qt" :class="main_type == 5 ? 'on' : ''" @click="main_type=5"><span class="txt">其他</span></div>
          </div>
        </div>
      </section>
      <section class="form">
        <mt-field label="名称" placeholder="单位名称及灶名"></mt-field>
        <mt-field label="收货人" placeholder="请输入手机号码"></mt-field>
        <div class="address-select">
          <a class="mint-cell mint-field">
            <div class="mint-cell-left"></div>
              <div class="mint-cell-wrapper">
                <div class="mint-cell-title">
                  <span class="mint-cell-text">收货地址</span>
                </div>
                <div class="mint-cell-value">
                  <div class="mint-field-other" @click="selectAddress">
                    <div class="address-select clearfix">
                      <div class="address-select-item">
                        <span class="placeholder" v-if="!getSelectAddress">小区/大厦</span>
                        <!--<input v-else="getSelectAddress" type="text" class="mint-field-core" v-model="getSelectAddress">-->
                        <span v-else="getSelectAddress">{{getSelectAddress}}</span>
                      </div> <div class="address-select-arrow"></div>
                    </div>
                  </div>
                </div>
              </div>
            <div class="mint-cell-right"></div>
          </a>
          <!--<mt-field label="收货地址" placeholder="小区/大厦">
            <div class="address-select clearfix">
              <div class="address-select-item">
                <span class="placeholder">小区/大厦</span>
              </div>
              <div class="address-select-arrow">
              </div>
            </div>
          </mt-field>-->
        </div>
        <mt-field label=" " placeholder="详细地址（如门牌号等）" type="textarea" rows="1"></mt-field>
        <div class="hide-input">
          <mt-field label="偏好设置" placeholder="">
            <div class="select-group clearfix">
              <div class="select-item" :class="preference == 0 ? 'selected' : ''" @click="preference=0">查看全部商品</div>
              <div class="select-item" :class="preference == 1 ? 'selected' : ''" @click="preference=1">只看清真商品</div>
            </div>
          </mt-field>
        </div>
        <div class="tip">可在 我的-账户管理-偏好设置中修改</div>
      </section>
      <div class="tip">
        以上信息将影响配送，请确认填写无误
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'PerfectInfo',

    data() {
      return {
        main_type: 1,
        preference: 1,
        nickname: '',
        deliveryAddressModel: {
        }
      };
    },

    computed: {
      ...mapGetters([
        'getSelectAddress'
      ])
    },

    methods: {
      save () {
//        console.log('----', this.$store.state.perfectInfo.deliveryAddressModel)
         this.$router.push('/nav')
      },
      selectAddress () {
//        this.$utils.toSelectAddress();
        this.$router.push('/select_address')
      }
    }
  }
</script>
<style lang="scss">
  #perfect_info .address-select .address-select-item {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 400px;
  }
  #perfect_info section {
    background: #ffffff;
    margin-top: 20px;
  }
  #perfect_info .main_type .title {
    margin-left: 34px;
    margin-right: 34px;
    height: 84px;
    line-height: 84px;
    color: $pageTxtColor;
    font-size: $pageTitleFontSize; /*px*/
    border-bottom: 1px solid $border; /*no*/
  }
  #perfect_info .main_type .content {
    height: 458px;
  }
  #perfect_info .main_type .content .line {
    margin-top: 58px;
    width: 100%;
  }
  #perfect_info .main_type .content .item {
    float: left;
    position: relative;
    height: 145px;
    width: 250px;
    font-size: 30px; /*px*/
    color: $pageTxtColor;
  }
  #perfect_info .main_type .content .item.on {
    color: #3eb049;
  }
  .cyfd {
    background: url("../../../static/image/main_type/cyfd_off.png") no-repeat center 0px;
    background-size: 97px 97px;
  }
  .cyfd.on {
    background: url("../../../static/image/main_type/cyfd_on.png") no-repeat center 0px;
    background-size: 97px 97px;
  }
  .jgst {
    background: url("../../../static/image/main_type/jgst_off.png") no-repeat center 0px;
    background-size: 97px 97px;
  }
  .jgst.on {
    background: url("../../../static/image/main_type/jgst_on.png") no-repeat center 0px;
    background-size: 97px 97px;
  }
  .csc {
    background: url("../../../static/image/main_type/csc_off.png") no-repeat center 0px;
    background-size: 97px 97px;
  }
  .csc.on {
    background: url("../../../static/image/main_type/csc_on.png") no-repeat center 0px;
    background-size: 97px 97px;
  }
  .sqsx {
    background: url("../../../static/image/main_type/sqsx_off.png") no-repeat center 0px;
    background-size: 97px 97px;
  }
  .sqsx.on {
    background: url("../../../static/image/main_type/sqsx_on.png") no-repeat center 0px;
    background-size: 97px 97px;
  }
  .cs {
    background: url("../../../static/image/main_type/cs_off.png") no-repeat center 0px;
    background-size: 97px 97px;
  }
  .cs.on {
    background: url("../../../static/image/main_type/cs_on.png") no-repeat center 0px;
    background-size: 97px 97px;
  }
  .qt {
    background: url("../../../static/image/main_type/qt_off.png") no-repeat center 0px;
    background-size: 97px 97px;
  }
  .qt.on {
    background: url("../../../static/image/main_type/qt_on.png") no-repeat center 0px;
    background-size: 97px 97px;
  }
  #perfect_info .main_type .content .item .txt {
    display: block;
    position: absolute;
    width: 100%;
    text-align: center;
    bottom: 0px;
  }

  #perfect_info .form .mint-cell-text {
    font-size: 30px; /*px*/
    color: $pageTxtColor;
  }
  #perfect_info .form .mint-field-core {
    font-size: 30px; /*px*/
  }
  #perfect_info .form .tip {
    height: 64px;
    line-height: 34px;
    text-align: right;
    color: #898989;
    font-size: 24px; /*px*/
    padding-right: 34px;
  }
  #perfect_info .tip {
    font-size: 22px; /*px*/
    color: #898989;
    text-align: center;
    height: 120px;
    line-height: 120px;
  }
  #perfect_info .is-textarea {
    border: 1px solid $border;  /*no*/
  }
  #perfect_info .form .hide-input .mint-cell {
    border: none;
  }
  #perfect_info .form .hide-input .mint-cell-wrapper {
    padding: 34px;
    background-image: none;
  }
  #perfect_info .form .hide-input .mint-cell-wrapper{
    padding: 30px 32px;
    padding-right: 0px;
  }
  #perfect_info .form .hide-input .mint-field-core,
  #perfect_info .form .address-select .mint-field-core{
    display: none;
  }
  #perfect_info .form .address-select .mint-field-other,
  #perfect_info .form .hide-input .mint-field-other{
    width: 100%;
  }

  #perfect_info .form .address-select .mint-cell{
    border-bottom: none;
  }

  #app #perfect_info .mint-cell {
    border: none;
    border-top: 1px solid $border; /*no*/
  }
  /*#app #perfect_info .mint-cell:last-child {
    border-bottom: 1px solid $border; !*no*!
  }*/
</style>
