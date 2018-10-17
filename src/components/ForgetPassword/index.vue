<template>
  <div id="forget_password">
    <Header :text="'修改密码'"></Header>
    <div class="container">
      <div class="forget_password-form no_border">
        <div class="forget_password-form-input" :class="hasSend ? 'has_send' : ''">
          <mt-field placeholder="请输入手机号" v-validate="'required|max:11'" name="手机号" v-model="phone" type="number"></mt-field>
          <mt-field placeholder="请输入验证码" v-validate="'required|digits:4'" name="4位验证码" v-model="code" type="text">
            <mt-button @click.native="doSendCode">{{hasSend ? time + 's' : '获取验证码'}}</mt-button>
          </mt-field>
          <mt-field placeholder="请输入密码" v-validate="'required|alpha_dash|min:6 '" name="密码" v-model="password" :type="pwd ? 'text' : 'password'">
            <span class="pwd" :class="pwd ? 'on' : 'off'" @click="pwd=!pwd"></span>
          </mt-field>
        </div>
        <div class="forget_password-form-btn">
          <mt-button @click.native="doRegister">完成</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui';
  export default {
    name: 'ForgetPassword',
    data: function () {
      return {
        pwd: false,

        hasSend: false,
        time: 10,

        phone: '',
        code: '',
        password: ''
      }
    },
    methods: {
      doSendCode () {
        if (this.hasSend) {
          return;
        }
        this.hasSend = true;
        this.time = 10;
        let i = setInterval(() => {
          if (this.time <= 0) {
            this.hasSend = false;
            clearInterval(i);
          } else {
            this.time = this.time - 1;
          }
        }, 1000);
        this.$api.accountGetVerification({
          "username": this.phone,
          "type": "2"
        }).then(function (rets) {
          console.log('验证码', rets)
        })
      },
      doRegister () {
        let _this = this;
        this.$validator.validateAll().then(result => {
          if(result){
            this.$api.forgetPassword({
              "username": this.phone,
              "password": this.password,
              "verification": this.code
            }).then(function (rets) {
              if(rets.success === true){
                MessageBox.alert('修改成功!', '提示').then(action => {
                  _this.$router.push("/login")
                });
              }
            })
          } else {
            this.$utils.VeeValidateErrors.render(this.$validator.errors);
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  #forget_password .forget_password-form {
    padding-top: 12px;
    padding-left: 75px;
    padding-right: 75px;
    height: 100%;
    background: #ffffff;
  }
  #forget_password .forget_password-form-input.has_send button{
    background-color: #aaaaaa;
    box-shadow: 0 0 1px #aaaaaa;
  }
  #forget_password .forget_password-form-input button{
    width: 200px;
  }
  #forget_password .forget_password-form-btn .mint-button {
    margin-top: 64px;
    width: 100%;
    height: 86px;
    font-size: $btnFontSize; /*px*/
    color: $btnTxtColor;
  }
</style>
