<template>
  <div id="addaddress">
    <Header :text="'增加收货地址'" :actionable="true"  @action="save()"></Header>
    <mt-field label="收货人姓名" placeholder="请输入收货人姓名" v-model="name" v-validate="'required'" name="姓名"></mt-field>
    <mt-field label="手机号码" placeholder="请输入手机号" type="number" v-model="tel" v-validate="'required|phone|max:11'" name="手机号"></mt-field>
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
                  <span class="placeholder" v-if="!getSelectAddress"  name="收货地址">小区/大厦</span>
                  <!--<input v-else="getSelectAddress" type="text" class="mint-field-core" v-model="getSelectAddress">-->
                  <span v-else="getSelectAddress">{{getSelectAddress}}</span>
                </div> <div class="address-select-arrow"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="mint-cell-right"></div>
      </a>
    </div>
    <mt-field  placeholder="详细地址" class="align" v-model="detail" v-validate="'required'" name="详细地址"></mt-field>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import Vue from 'vue'
  export default {
    name: 'Address',
    data() {
      return{
        name:'',
        tel:'',
        detail:''
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
          this.$validator.validateAll().then(result => {
              if(!_this.getSelectAddress){
                Vue.$toast({
                  message: '请输入收货地址',
                  className: 'with-icon',
                  iconClass: 'failed'
                });
                  return false;
              }
              if(result){
                this.$api.addAddress({
                  "name":_this.name,
                  "phone":_this.tel,
                  "address":_this.detail,
                  "addressOnMap":_this.$store.state.perfectInfo.deliveryAddressModel.addressOnMap,
                  "lng":_this.$store.state.perfectInfo.deliveryAddressModel.lng,
                  "lat":_this.$store.state.perfectInfo.deliveryAddressModel.lat,
                  "province":_this.$store.state.perfectInfo.deliveryAddressModel.province,
                  "city":_this.$store.state.perfectInfo.deliveryAddressModel.city,
                  "district":_this.$store.state.perfectInfo.deliveryAddressModel.district
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
          this.$router.push('/select_address')
        }
    },
    mounted () {
      let _this = this;
      _this.$store.commit('getSelectAddress')
    }
  }
</script>
<style lang="scss">
  #addaddress{
    background: #efefef;
    min-height: 100vh;
  }
  #addaddress .mint-cell-title{
    width: 180px;
  }
  #addaddress .align .mint-field-core{

    padding-left: 234px;
  }
  #addaddress .mint-cell-text{
    color: #959595;
    font-size: 32px;/*px*/
  }
  #addaddress .mint-field-core::-webkit-input-placeholder {/* WebKit browsers */
    color: #959595;
    font-size: 32px;/*px*/
  }
　#addaddress .mint-field-core:-moz-placeholder{/* Mozilla Firefox 4 to 18 */
    color: #959595;
    font-size: 32px;/*px*/
  }
　#addaddress .mint-field-core::-moz-placeholder {/* Mozilla Firefox 19+ */
    color: #959595;
    font-size: 32px;/*px*/
  }
　#addaddress .mint-field-core:-ms-input-placeholder {/* Internet Explorer 10+ */
    color: #959595;
    font-size: 32px;/*px*/
  }
  #addaddress .mint-field-core{
    font-size: 32px;/*px*/
  }
  #addaddress .address-select-item{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 400px;
  }
</style>
