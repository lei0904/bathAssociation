<template>
  <div id="address">
    <Header :text="'收货地址'" :actionable="true" :explain="'添加'" @action="add()"></Header>
    <div class="address_item" v-for="(item, index) in list" @click="itemClick(item)">
      <div class="address_name"><span>{{item.name}}</span><span>{{item.phone}}</span></div>
      <div class="address_detail">{{item.addressOnMap}}{{item.address}}</div>
      <div class="address_button">
        <div class="address_button_item" @click.stop ="delete_address(item.id)">
          <i class="icon_delete"></i>删除
        </div>
        <div class="address_button_item" @click.stop ="edit_address(item)">
            <i class="icon_edit"></i>编辑
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui';
  import Vue from 'vue'
  import Api from '../../api'

  import {mapActions} from 'vuex'

  export default {
    name: 'Address',
    data() {
      return{
          list:[]
      }
    },
    methods:{
        ...mapActions([
          'setFirmOrderAddress'
        ]),
        itemClick (item) {
          let str = window.location.href;
          let type = str.substr(str.length-1,1);
          if(type === '0'){
              return false;
          }else{
            this.setFirmOrderAddress(item)
          }
        },
        add:function () {
          this.$router.push('/add_address');
          },
        delete_address:function (id) {
          MessageBox.confirm('确定删除地址么?','').then(action => {
            let _this = this;
            this.$api.deleteAddress({
              "deliveryAddressId":id
            }).then((rets) => {
              if (rets.success){
                Vue.$toast({
                  message:'删除成功',
                  className: 'with-icon',
                  iconClass: 'success'
                });
                this.getData()
              }
            })
        });

        },
        edit_address:function (item) {
          console.log(item)
          sessionStorage.setItem("address_data",JSON.stringify(item));
          this.$router.push("/edit_address");

        },
        getData:function () {
          Api.addressList({
            "token":sessionStorage.getItem("token")
          }).then((rets) => {
            this.list = rets
          })
        }
    },
    activated: function () {
      this.getData();
    }

  }
</script>
<style lang="scss">
  #address{
    background: #efefef;
    height: 100vh;
    overflow-y: scroll;
  }
  #address .address_item{
    padding: 34px 34px 0 34px;
    background: #fff;
    margin-top: 20px;
  }
  .address_item .address_name{
    font-size: 32px;/*px*/
    color: #313131;
    margin-bottom: 45px;
  }
  .address_item .address_name span:first-child{
    margin-right: 60px;
  }
  .address_item .address_main{
    font-size: 28px;/*px*/
    color: #313131;
    margin-bottom: 30px;
  }
  .address_item .address_detail{
    font-size: 26px;/*px*/
    color: #898989;
    padding-bottom: 40px;
    border-bottom:1px solid #898989;/*no*/
  }
  .address_item .address_button{
    height: 84px;
  }
  .address_item .address_button_item{
    width: 140px;
    height: 84px;
    line-height: 84px;
    font-size: 34px;/*px*/
    color: #626262;
    float: right;
    margin-left: 60px;
  }
  .address_button_item .icon_edit{
    width: 34px;
    height: 34px;
    background: url(../../../static/image/icon_delete.png) no-repeat center / 100% 100%;
    margin-right: 16px;
    display: inline-block;
    vertical-align:text-top;
  }
  .address_button_item .icon_delete{
    width: 34px;
    height: 34px;
    background: url(../../../static/image/icon_edit.png) no-repeat center / 100% 100%;
    display: inline-block;
    margin-right: 16px;
    vertical-align:text-top;
  }
</style>
