<template>
  <div id="mine_account">
    <Header :text="'账户管理'"></Header>
    <div class="container bg">
      <section class="avatar-content">
        <span>头像</span>
        <span class="file_upload">
          <input type="file" accept="image/jpeg,image/jpg,image/png" class="open_file profileinfopanel-upload"  @change="uploadAvatar">
          <img class="img_show" :src="imgSrc ? imgSrc : '../../../static/image/avatar.png'">
          <div class="arrow"></div>
        </span>
      </section>

      <section class="form">
        <!--<mt-field label="名称" placeholder="单位名称及灶名" v-model="name"></mt-field>-->
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
                    <div class="address-select-arrow"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mint-cell-right"></div>
          </a>
        </div>
        <!--<mt-field label="主体类型" placeholder="单位名称及灶名" v-model="type"></mt-field>-->
        <div class="hide-input">
          <mt-field label="偏好设置" placeholder="">
            <div class="select-group clearfix">
              <div class="select-item" :class="preference == 2 ? 'selected' : ''" @click="preference=2">查看全部商品</div>
              <div class="select-item" :class="preference == 1 ? 'selected' : ''" @click="preference=1">只看清真商品</div>
            </div>
          </mt-field>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  export default {
    name: 'MineAccount',

    data() {
      return {
        preference: 1,
        imgSrc:''
      }
    },
    methods: {
      selectAddress () {
        this.$router.push('/address/0')
      },
      async uploadAvatar(){
          let _this = this;
        //上传头像
          let input = document.querySelector('.profileinfopanel-upload');
          let reader =new FileReader();
          let imgData = input.files[0];
          if(imgData.size > 1048576 ){
            Vue.$toast({
              message: '图片过大，请选择小于1M的图片',
              className: 'with-icon',
              iconClass: 'failed'
            });
            return false;
          }
          reader.readAsDataURL(imgData);
          reader.onload = (arg) => {
            let imgBase = arg.target.result
            let name = imgData.name;//文件的名字
            let type = imgData.type;//文件的类型

            _this.$api.uploadImg({
              'fileName':name,
              'ext':type,
              'file':imgBase.split("image/png;base64,")[1],
            }).then((rets) => {
              if (rets.id){
                _this.$api.updateAvatar({
                  "avatarImgId": rets.id,
                  "avatarImg":''
                }).then((rets1) => {
                    if (rets1.success){
                      _this.imgSrc = imgBase;
                    }
                })
              }
            })
          };
      }
    },
    activated(){
      let _this = this;
      _this.$api.userInfo({

      }).then((rets) => {
        sessionStorage.setItem("userInfo",JSON.stringify(rets));
      });
      let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      this.imgSrc = userInfo.avatar;
    }
  }
</script>
<style lang="scss">
  #mine_account .avatar-content {
    height: 170px;
    line-height: 170px;
    background: #ffffff;
    width: 100%;
    padding: 0 34px;
    box-sizing: border-box;
    font-size: 30px;
    color: $pageTxtColor;
    position: relative;
    cursor: pointer;
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-align-items: center;
    align-items: center;
  }

  #mine_account .avatar-content .avatar {
    float: right;
    line-height: normal;
    width: 110px;
    height: 110px;
    margin-top: 30px;
    border-radius: 50%;
    padding-right: 32px;
    background: url("../../../static/image/arrow-right.png") no-repeat center right;
    background-size: 14px 22px;
  }

  #mine_account .avatar-content .avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  #mine_account .form {
    margin-top: 20px;
  }
  #app #mine_account .mint-cell {
    height: 104px;
    min-height: 104px;
    border: none;
  }
  #app #mine_account .mint-cell .mint-cell-wrapper {
    border-bottom: 1px solid $border; /*no*/
  }
  #app #mine_account .mint-field-core {
    font-size: 30px;
    text-align: right;
  }
  #app #mine_account .address-select .mint-field-other {
    width: 100%;
    text-align: right;
  }
  #app #mine_account .address-select .mint-field-other .address-select-arrow{
    height: 22px;
    width: 14px;
    background: url("../../../static/image/arrow-right.png");
    background-position: center right;
    background-size: 14px 22px;
    float: none;
  }
  #mine_account .form .hide-input .mint-cell {
    border: none;
  }
  #mine_account .form .hide-input .mint-cell-wrapper {
    padding: 34px;
    background-image: none;
  }
  #mine_account .form .hide-input .mint-cell-wrapper{
    padding: 30px 32px;
    padding-right: 0px;
  }
  #mine_account .form .hide-input .mint-field-core,
  #mine_account .form .address-select .mint-field-core{
    display: none;
  }
  #mine_account .form .address-select .mint-field-other,
  #mine_account .form .hide-input .mint-field-other{
    width: 100%;
  }

  #mine_account .form .address-select .mint-cell{
    border-bottom: none;
  }

  #mine_account .form .select-group .select-item {
    width: 220px;
    height: 60px;
    line-height: 60px;
    padding-left: 0;
    padding-right: 0;
    font-size: 26px;
    color: #626262;
  }
  #mine_account .form .select-group .select-item.selected {
    color: #3eb049;
  }
  #app #mine_account  .mint-cell-title {
    width: 150px;
  }
  .file_upload{
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
  }
  .open_file{
    display: block;
    position: absolute;
    opacity: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .img_show{
    height: 13.333333vw;
    width: 13.333333vw;
    border-radius: 6vw;
    margin-right: 10px;
  }
  .arrow{
    height: 22px;
    width: 14px;
    background: url("../../../static/image/arrow-right.png");
    background-position: center right;
    background-size: 14px 22px;
    float: none;
  }

</style>
