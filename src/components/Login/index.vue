<template>
  <div id="login">
    <span class="login-title">登录</span>

    <div class="login-form">
      <div class="login-form-input">
        <mt-field placeholder="请输入手机号"  v-validate="'required|max:11'" name="手机号" v-model="phone" type="number"></mt-field>
        <mt-field placeholder="请输入密码" v-validate="'required|alpha_dash|min:6 '" name="密码" v-model="password" :type="pwd ? 'text' : 'password'">
          <span class="pwd" :class="pwd ? 'on' : 'off'" @click="pwd=!pwd"></span>
        </mt-field>
      </div>
      <mt-button @click.native="doLogin">登录</mt-button>
      <div class="login-form-operation">
        <a href="#/register">快速注册</a>
        <a href="#/forget_password">忘记密码</a>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  export default {
    name: 'Login',
    data: function () {
      return {
        pwd: false,
        phone: '',
        password: ''
      }
    },
    methods: {
      doLogin () {
        let _this = this;
        this.$validator.validateAll().then(result => {
          if(result){
            this.$api.accountLogin({
              "username": this.phone,
              "password": this.password
            }).then((rets) => {
                if (!rets.error){
                  sessionStorage.setItem("token",rets.token);
                  _this.getInfo(rets);
                }else{
                  Vue.$toast({
                    message: rets.error || '操作失败',
                    className: 'with-icon',
                    iconClass: 'failed'
                  })
                }

            })
          } else {
            this.$utils.VeeValidateErrors.render(this.$validator.errors);
          }
        })
      },
      getInfo(rets){
        let _this = this;
        this.$api.getInfo({
        }).then((rets2) => {
          sessionStorage.setItem("storeInfo",JSON.stringify(rets2));
          _this.getUserInfo();
          if(rets.bindStatus === 1){ //未绑定
            _this.$router.push("/applying")
          }else if(rets.bindStatus === 2){ //绑定中
            _this.$router.push("/apply_audit")
          }else if(rets.bindStatus === 3){ //已绑定
            _this.$router.push("/nav")
          }else{  //绑定被拒
            _this.$router.push("/apply_reject")
          }
        })
      },
      getStoreId(){
          let url = window.location.href;
          let targetId = url.split("&")[0].split("=")[1];
          sessionStorage.setItem("storeID",targetId);
      },
      getUserInfo(){
        let _this = this;
        _this.$api.userInfo({

        }).then((rets) => {
          sessionStorage.setItem("userInfo",JSON.stringify(rets));
        });
      }
    },
    activated(){
      this.getStoreId()
    }
  }
</script>
<style lang="scss">
  #login {
    height: 100%;
    padding-top: 216px;
    text-align: center;
    color:$pageTxtColor;
    background: #fff;
  }
  #login .login-title {
    font-size:$loginTitle; /*px*/
  }
  #login .login-form {
    padding-left: 75px;
    padding-right: 75px;
    margin-top: 134px;
  }
  #login .login-form .pwd {
    display: block;
    width: 72px;
    height: 32px;
  }

  #login .login-form .mint-button {
    margin-top: 54px;
    width: 100%;
    height: 86px;
    font-size: $btnFontSize; /*px*/
    color: $btnTxtColor;
  }
  #login .login-form .login-form-operation {
    margin-top: 62px;
  }
  #login .login-form .login-form-operation a {
    display: inline-block;
    height: 30px;
    font-size: 30px; /*px*/
    color: $pageTxtColor3;
  }
  #login .login-form .login-form-operation a:first-child {
    color: $pageTxtColor2;
    padding-right: 26px;
    border-right: 1px solid $splitLineColor; /*px*/
  }
  #login .login-form .login-form-operation a:first-child {
    color: $pageTxtColor2;
    padding-right: 27px;
    border-right: 1px solid $splitLineColor; /*px*/
  }
  #login .login-form .login-form-operation a:last-child {
    padding-left: 26px;
  }
</style>
