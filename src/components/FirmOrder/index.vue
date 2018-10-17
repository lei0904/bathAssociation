<template>
  <div id="firm_order">
    <Header :text="'确认订单'" :refreshable="true" @refresh="refresh"></Header>
    <div class="container overflow">
      <section class="address mt20" @click="toSelectAddress">
        <div class="select" v-if="selectedAddress">
          <div class="person">
            <span class="name">{{getAddress.name}}</span>
            <span class="phone">{{getAddress.phone}}</span>
          </div>
          <div class="info">
            {{getAddress.addressOnMap}}{{getAddress.address}}
          </div>
          <!--<div class="shop">-->
            <!--张小国蔬菜店-->
          <!--</div>-->
        </div>
        <button class="none" v-else>
          <span class="txt">点击添加收货地址</span>
        </button>
      </section>
      <section class="projects mt20">
        <div class="title">{{storeInfo.name}}</div>
        <div class="list">
          <div class="item" v-for="item in checkedItems">
            <div class="project-box">
              <img :src="item.thumbnail">
              <div class="info">
                <div class="info-top">{{item.title}}</div>
                <div class="info-middle clearfix">
                <span class="left">
                  <span class="p">{{item.price}}元/{{item.packageUnit}}</span>
                  <span class="u">x{{showShopCartItemNumber(item)}}公斤</span>
                </span>
                  <span class="right">{{getShopCartItemTotalPrice(item)}}元</span>
                </div>
                <div class="info-bottom clearfix">
                  <!--<span class="icon">促</span>-->
                  <span class="msg" @click="openLMDialog(item)">留言</span>
                </div>
              </div>
            </div>
            <div class="msg-box" v-if="item.merMsg">
              <span class="t">我的留言: </span>{{item.merMsg}}
            </div>
          </div>
        </div>
        <div v-if="false" class="show-more" :class="showMore ? 'open' : ''"  @click="showMore=!showMore">
          <span class="txt">查看其余23件商品</span>
        </div>
        <div class="line methods">
          <span class="subject">配送方式</span>
          <div class="right">
            <!--<span class="item selected">集单配送</span>-->
            <span class="item" :class="submitDelivery.id == item.id ? 'selected' : ''" @click="setSubmitDelivery(item)" v-for="item in deliveryList">{{item.name}}</span>
          </div>
        </div>
        <div class="send-out-error" v-if="isOverScope">
          <div class="tip">您的地址超出配送范围，请更换地址或选择自提&nbsp;&nbsp;></div>
        </div>
        <div class="line">
          <span class="subject">{{distribution.distributionTitle}}</span>
          <div class="right">
            <span class="p">运费{{productExpressFee}}元</span>
          </div>
        </div>
      </section>
      <section class="send mt20">
        <div class="line time" @click="openSendTimePicker">
          <span class="subject">要求送达时间</span>
          <div class="right">
            {{time_show || '请选择送达时间'}}
          </div>
        </div>
        <div class="line methods">
          <span class="subject">支付方式</span>
          <div class="right">
            <!--<span class="item selected">预先支付</span>-->
            <span class="item" :class="submitPayType.id == item.id ? 'selected' : ''" @click="setSubmitPayType(item)" v-for="item in payTypeList">{{item.name}}</span>
          </div>
        </div>
      </section>
      <section class="money mt20">
        <div class="line clearfix">
          <span class="left">商品金额</span>
          <span class="right">{{getCheckedTotalPrice(Object.keys(checked))}}元</span>
        </div>
        <div class="line clearfix">
          <span class="left">运费</span>
          <span class="right">{{productExpressFee}}元</span>
        </div>
      </section>

      <section class="submit-wrapper">
        <div class="total">合计: <span class="m">{{getMoney(Object.keys(checked), productExpressFee)}}元</span></div>
        <div class="button" @click="submit">提交订单</div>
      </section>

      <SendTimePicker ref="stp"
                      :values="deliveryDateList"
                      @confirm="timeSelected"></SendTimePicker>
    </div>
  </div>
</template>
<script>
  import SendTimePicker from '../Picker/SendTimePicker/index.vue'
  import InputDialog from '../Dialogs/InputDialog/index.js'

  import {mapActions, mapState, mapGetters} from 'vuex'

  export default {
    name: 'FirmOrder',
    components: {
      SendTimePicker
    },

    data() {
      return {
        storeInfo: {},
        showMore: false,
        times: ['', ''],
        time_show:'',
        emitId:''
      }
    },
    computed: {
      ...mapGetters([
        'submitNormalDeliveryDate',
        'submitExpressDeliveryDate',
        'deliveryDateList',

        'submitDelivery',
        'deliveryList',

        'submitPayType',
        'payTypeList',

        'distribution',
        'productExpressFee',

        'isOverScope',

        'getMoney',

        'checked',
        'getCheckedTotalPrice',
        'getAddress',
        'selectedAddress',
        'checkedItems'
      ])
    },
    activated() {
      this.storeInfo = (JSON.parse(sessionStorage.getItem('storeInfo')))
    },
    methods: {
      ...mapActions([
        'shoppingCartClear',
        'updateMsg',
        'setSubmitDelivery',
        'setSubmitDeliveryDate',
        'setSubmitNormalDeliveryDate',
        'setSubmitExpressDeliveryDate',
        'setSubmitPayType'
      ]),
      showShopCartItemNumber (item) {
        return this.$store.getters.getShopCartItemNumber(item)
      },
      getShopCartItemTotalPrice (item) {
        return this.$store.getters.getShopCartItemTotalPrice(item)
      },
      toSelectAddress () {
        this.$router.push('/address/1')
      },
      openLMDialog(item) {
        let _this = this;
        InputDialog.textArea(' ', '', {
          inputValue: item.merMsg || '',
          confirmButtonClass: 'text-area',
          cancelButtonClass: 'text-area',
          title: '我的留言',
        }).then((rets) => {
          let value = rets['value'];
          let action = rets['action'];
          if (action === 'confirm') {
            _this.updateMsg({
              msg: value,
              item: item
            });
          }
        });
      },
      refresh() {
        console.log('refresh')
      },
      timeSelected(t) {
        this.time_show = t.title;
        this.emitId = t.typeAndId;
      },
      openSendTimePicker() {
        this.$refs['stp'].open()
      },
      submit () {
        // this.$router.push('/cashier')
        let submit = this.$store.getters.submit;
        let items = this.$store.getters.checkedItems;
        let address = this.$store.getters.getAddress;
        let distribution = this.$store.getters.distribution;

        console.log(items);

        if (!address || !address.id) {
          this.$utils.toast('请选择收货地址');
          return;
        }
        if (!distribution || !distribution['distributionId']) {
          this.$utils.toast('请选择配送公司');
          return;
        }
        if (!this.time_show) {
          this.$utils.toast('请选择要求送达时间');
          return;
        }
        if (!submit || !submit['payType'] || !submit['payType']['id']) {
          this.$utils.toast('请选择支付方式');
          return;
        }
        if (!submit || !submit['delivery'] || !submit['delivery']['id']) {
          this.$utils.toast('请选择配送方式');
          return;
        }
        let deliveryDate = submit['deliveryDate'];
        let payType = submit['payType'];
        let delivery = submit['delivery'];

        let params = {};
        params['receiverProvinceId'] = address['provinceId'];
        params['receiverCityId'] = address['cityId'];
        params['receiverDistrictId'] = address['districtId'];
        params['receiverLongitude'] = address['lng'];
        params['receiverLatitude'] = address['lat'];
        params['receiverDetailsAddress'] = address['addressOnMap'] + '' + address['address'];
        params['receiverDetailsAddressx'] = '';
        params['receiver'] = address['name'];
        params['receiverPhone'] = address['phone'];

        params['distributionId'] = distribution['distributionId'];

        params['deliveryDateTypeAndId'] = this.emitId;

        params['deliveryDateStr'] = this.time_show;

        params['payTypeStr'] = payType['code'];

        params['deliveryTypeStr'] = delivery['code'];

        let productList = [];
        for (let i = 0, l = items.length; i < l; i++) {
          let item = items[i];
          let num = this.$store.getters.getShopCartItemNumber(item);
          if (num <= 0) {
            this.$utils.toast('请选择商品' + item['title'] + '数量');
            return;
          }
          productList.push({
            "shoppingCarId": item['_shop_cart_id_'],
            "productId": item['id'],
            "promotionItemId":null,
            "promotionType":null,
            "productCount": num,
            "productUnitPrice": item['price'],
            "versionId": item['lastSnapshotId'],
            "merMsg": item['merMsg']
          })
        }
        params['productList'] = productList;

        this.$api.orderCreate(params).then((rets) => {
          if (rets['orderId']) {
            this.shoppingCartClear(rets);
          }
          if (params['payTypeStr'] === 'cashOnDelivery') {
            sessionStorage.setItem("checked",-1);
            this.$router.replace('/order_success/0')
          } else {
            this.$router.replace('/cashier/' + rets['orderId'] + '/' + rets['orderNo'])
          }
        })

        /*let params = {
          "couponsList":null
        }*/
      }
    }
  }
</script>
<style lang="scss">
  #firm_order .submit-wrapper {
    position: fixed;
    bottom: 0;
    height: 98px;
    line-height: 98px;
    width: 100%;
    background: #fcfcfc;
  }
  #firm_order .submit-wrapper .total {
    font-size: 34px;
    color: #313131;
    position: absolute;
    left: 34px;
  }
  #firm_order .submit-wrapper .total .m {
    color: #ff0000;
  }
  #firm_order .submit-wrapper .button {
    width: 256px;
    text-align: center;
    background: #3eb049;
    color: #ffffff;
    font-size: 38px; /*px*/
    position: absolute;
    right: 0;
  }
  #firm_order .money .line {
    font-size: 30px; /*px*/
    color: #313131;
    padding: 40px 34px;
    display: block;
  }
  #firm_order .money .line .left {
    float: left;
  }
  #firm_order .money .line .right {
    float: right;
  }
  #firm_order .money .line:last-child {
    padding-top: 0px;
  }

  #firm_order .container {
    padding-bottom: 200px;
  }
  #firm_order section {
    background: #fcfcfc;
    width: 100%;
  }
  #firm_order .projects .send-out-error {
    font-size: 26px;
    color: #b68e22;
    background: #fff2d0;
    padding: 0 60px;
    box-sizing: border-box;
  }
  #firm_order .projects .send-out-error + .line {
    border: none;
  }
  #firm_order .projects .send-out-error .tip{
    white-space:nowrap;
    height: 54px;
    line-height: 54px;
    position: relative;
    padding-left: 42px;
  }
  #firm_order .projects .send-out-error .tip::before {
    content: ' ';
    display: block;
    width: 30px;
    height: 30px;
    background: url("../../../static/image/send-out-tip.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -15px;
  }

  #firm_order .send .line.time .right {
    background: url("../../../static/image/select-address-arrow.png") no-repeat right center;
    background-size: 15px 26px;
    padding-right: 31px;
  }

  /**/
  #firm_order .projects .txt {
    /*display: block;*/
    /*width: 100%;*/
    /*word-wrap:break-word*/
  }
  #firm_order .projects .line,
  #firm_order .send .line {
    height: 98px;
    line-height: 98px;
    border-top: 1px solid $border; /*no*/
    box-sizing: border-box;
    padding-left: 34px;
    padding-right: 34px;
    font-size: 30px;
    color: #313131;
  }
  #firm_order .projects .line:first-child,
  #firm_order .send .line:first-child {
    border-top: none;
  }
  #firm_order .projects .line .right,
  #firm_order .send .line .right {
    float: right;
  }
  #firm_order .projects .line .right .p,
  #firm_order .send .line .right .p {
    color: #313131;
  }
  #firm_order .projects .line.methods .right .item,
  #firm_order .send .line.methods .right .item {
    height: 64px;
    line-height: 64px;
    width: 158px;
    border: 1px solid $border; /*no*/
    display: inline-block;
    text-align: center;
    margin-left: 30px;
    border-radius: 3px;
    font-size: 26px; /*px*/
    color: #434343;
    box-sizing: border-box;
  }
  #firm_order .projects .line.methods .right .item.selected,
  #firm_order .send .line.methods .right .item.selected {
    color: #3eb049;
    border-color: #3eb049;
  }
  #firm_order .projects .show-more {
    height: 98px;
    line-height: 98px;
    text-align: center;
    border-top: 1px solid $border; /*no*/
  }
  #firm_order .projects .show-more .txt {
    font-size: 28px;
    color: #313131;
    background: url("../../../static/image/close-icon.png") no-repeat center right;
    background-size: 15px 9px;
    padding-right: 28px;
  }
  #firm_order .projects .show-more.open .txt {
    background: url("../../../static/image/open-icon.png") no-repeat center right;
    background-size: 15px 9px;
  }
  #firm_order .projects .list {
    padding-left: 18px;
    padding-right: 18px;
    box-sizing: border-box;
    padding-bottom: 8px;
  }

  #firm_order .projects .list .item {
    margin-bottom: 8px;
  }

  #firm_order .projects .list .project-box {
    position: relative;
    background: #F3F4F7;
    box-sizing: border-box;
    padding: 14px 34px 14px 14px;
  }

  #firm_order .projects .list .item .msg-box {
    display: block;
    background: #ffffff;
    padding: 20px 8px 12px;
    font-size: 26px;
    color: #434343;
    line-height: 1.5;
    position: relative;
  }
  #firm_order .projects .list .item .msg-box::before {
    content: ' ';
    display: block;
    width: 23px;
    height: 14px;
    background: url("../../../static/image/lm-arrow-top.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 60px;
    top: -14px;
  }

  #firm_order .projects .list .item .msg-box .t {
    color: #898989;
  }

  #firm_order .projects .list .item .info {
    position: absolute;
    left: 140px;
    top: 14px;
    right: 34px;
  }

  #firm_order .projects .list .item .info .info-top {
    width: 100%;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 28px; /*px*/
    color: #313131;
  }

  #firm_order .projects .list .item .info .info-middle {
    display: block;
    font-size: 26px; /*px*/
    color: #898989;
    margin-top: 18px;
  }

  #firm_order .projects .list .item .info .info-bottom {
    margin-top: 22px;
    display: block;
    font-size: 24px;
  }

  #firm_order .projects .list .item .info .info-bottom .icon {
    float: left;
    color: #EC7635;
    border: 1px solid #EC7635; /*no*/
    font-size: 10px;
    display: inline-block;
    width: 26px;
    height: 26px;
    line-height: 26px;
    border-radius: 3px;
  }

  #firm_order .projects .list .item .info .info-bottom .msg {
    float: right;
    color: #3eb049;
    background: url("../../../static/image/msg-arrow.png") no-repeat center right;
    background-size: 14px 24px;
    padding-right: 26px;
  }

  #firm_order .projects .list .item .info .info-middle .left {
    float: left;
  }

  #firm_order .projects .list .item .info .info-middle .right {
    float: right;
  }

  #firm_order .projects .list .item img {
    width: 110px;
    height: 110px;
    background: #ffffff;
  }

  #firm_order .projects .title {
    height: 94px;
    line-height: 94px;
    padding-left: 34px;
    padding-right: 34px;
    font-size: 30px; /*px*/
    color: #313131;
  }

  #firm_order .address {

  }

  #firm_order .address .select {
    position: relative;
    padding-left: 99px;
    margin-right: 34px;
    background: url("../../../static/image/select-address-arrow.png") no-repeat right center;
    background-size: 15px 26px;
    font-size: 30px; /*px*/
    color: #434343;
    padding-top: 30px;
    padding-bottom: 30px;
  }

  #firm_order .address .select .person {
    color: #313131;
  }

  #firm_order .address .select .info,
  #firm_order .address .select .shop {
    margin-top: 30px;
  }

  #firm_order .address .select::before {
    content: ' ';
    display: block;
    position: absolute;
    width: 33px;
    height: 44px;
    background: url("../../../static/image/address.png") no-repeat;
    background-size: 100% 100%;
    left: 34px;
    top: 50%;
    margin-top: -22px;
  }

  #firm_order .address .none {
    height: 200px;
    line-height: 200px;
    text-align: center;
    width: 100%;
    font-size: 34px; /*px*/
    color: #434343;
  }

  #firm_order .address .none .txt {
    display: inline-block;
    padding-left: 44px;
    line-height: normal;
    background: url("../../../static/image/address.png") no-repeat left center;
    background-size: 33px 44px;
  }
</style>
