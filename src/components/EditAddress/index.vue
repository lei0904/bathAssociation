<template>
  <div id="edit_address">
    <Header :text="'编辑收货地址'" :actionable="true"  @action="save()"></Header>
    <mt-field label="收货人姓名" placeholder="请输入收货人姓名"  v-validate="'required'" v-model="data.name" name="姓名"></mt-field>
    <mt-field label="手机号码" placeholder="请输入手机号" v-validate="'required|phone|max:11'" name="手机号" v-model="data.phone"></mt-field>
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
                  <span class="placeholder" v-if="!getSelectAddress" >{{data.addressOnMap}}</span>
                  <!--<input v-else="getSelectAddress" type="text" class="mint-field-core" v-model="getSelectAddress">-->
                  <span v-else="getSelectAddress"  name="地址"  v-model="getSelectAddress">{{getSelectAddress}}</span>
                </div> <div class="address-select-arrow"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="mint-cell-right"></div>
      </a>
    </div>
    <mt-field  placeholder="详细地址" class="align" v-validate="'required'" name="详细地址" v-model="data.address"></mt-field>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import Vue from 'vue'
  export default {
    name: 'Address',
    data() {
      return {
        data: {},
        change: false
      }
    },
    computed: {
      ...mapGetters([
        'getSelectAddress'
      ])
    },
    methods:{
        save:function () {
          let _this = this;
          console.log(_this.data)
          this.$validator.validateAll().then(result => {
            if(result){
              this.$api.editAddress({
                "id":_this.data.id,
                "name":_this.data.name,
                "phone":_this.data.phone,
                "address":_this.data.address,
                "addressOnMap":_this.$store.state.perfectInfo.deliveryAddressModel.addressOnMap || _this.data.addressOnMap,
                "lng":_this.$store.state.perfectInfo.deliveryAddressModel.lng ||_this.data.lng,
                "lat":_this.$store.state.perfectInfo.deliveryAddressModel.lat ||_this.data.lat,
                "province":_this.$store.state.perfectInfo.deliveryAddressModel.province ||_this.data.provinceName,
                "city":_this.$store.state.perfectInfo.deliveryAddressModel.city ||_this.data.cityName,
                "district":_this.$store.state.perfectInfo.deliveryAddressModel.district ||_this.data.districtName
              }).then((rets) => {
                if (rets.success === true){
                  Vue.$toast({
                    message:'操作成功',
                    className: 'with-icon',
                    iconClass: 'success'
                  })
                  this.$router.back()
                }
              })
            }
            else {
              this.$utils.VeeValidateErrors.render(this.$validator.errors);
            }

          })
        },
        selectAddress () {
          this.change=true;
          this.$router.push('/select_address')
        }
    },
    activated:function () {
      let data = JSON.parse(sessionStorage.getItem("address_data"))
      this.data = data;
    }
  }
</script>
<style lang="scss">
  #edit_address{
    background: #efefef;
    min-height: 100vh;
  }
  #edit_address .mint-cell-title{
    width: 180px;
  }
  #edit_address .align .mint-field-core{

    padding-left: 234px;
  }
  #edit_address .mint-cell-text{
    color: #959595;
    font-size: 32px;/*px*/
  }
  #edit_address .mint-field-core::-webkit-input-placeholder {/* WebKit browsers */
    color: #959595;
    font-size: 32px;/*px*/
  }
　#edit_address .mint-field-core:-moz-placeholder{/* Mozilla Firefox 4 to 18 */
    color: #959595;
    font-size: 32px;/*px*/
  }
　#edit_address .mint-field-core::-moz-placeholder {/* Mozilla Firefox 19+ */
    color: #959595;
    font-size: 32px;/*px*/
  }
　#edit_address .mint-field-core:-ms-input-placeholder {/* Internet Explorer 10+ */
    color: #959595;
    font-size: 32px;/*px*/
  }
  #edit_address .mint-field-core{
    font-size: 32px;/*px*/
  }
  #edit_address .address-select-item{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 400px;
  }
</style>
