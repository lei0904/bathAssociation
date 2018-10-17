<template>
  <div id="register">
    <Header :text="'用户注册'" :handle="true" @back="back"></Header>
    <div class="container">
      <div class="register-form no_border">
        <div class="register-form-input" :class="hasSend ? 'has_send' : ''">
          <mt-field placeholder="请输入手机号" v-validate="'required|max:11'" name="手机号" v-model="phone" type="number"></mt-field>
          <mt-field placeholder="请输入验证码" v-validate="'required|digits:4'" name="4位验证码" v-model="code" type="text">
            <mt-button @click.native="doSendCode">{{hasSend ? time + 's' : '获取验证码'}}</mt-button>
          </mt-field>
          <mt-field placeholder="请输入密码" v-validate="'required|alpha_dash|min:6 '" name="密码" v-model="password" :type="pwd ? 'text' : 'password'">
            <span class="pwd" :class="pwd ? 'on' : 'off'" @click="pwd=!pwd"></span>
          </mt-field>
        </div>
        <div class="register-form-btn">
          <mt-button @click.native="doRegister">完成</mt-button>
        </div>

        <div class="register-form-checkbox">
          <div class="checkbox" @click="readAgreement=true">
              <input type="checkbox" class="checkbox-input" :checked="readAgreement" v-validate="'required'" name="agreement">
              <span class="checkbox-text">我已阅读并同意 <span @click.stop.prevent="$router.push('/agreement')">e批生鲜用户服务协议</span></span>
          </div>
        </div>
        <div class="register-form-hobby clearfix">
            <div class="name">采购偏好</div>
            <div class="box" :class="[preference == 1 ? 'checked':'' ]"  @click="select(1)">只看清真商品</div>
            <div class="box" :class="[preference == 0 ? 'checked':'' ]"  @click="select(0)">查看全部商品</div>
        </div>
        <div class="register-form-hobby clearfix">
          <div class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称</div>
          <input class="box2" type="text" v-model='nickName' v-validate="'required'" name="店名/公司名称或个人姓名"   placeholder="请填写店名/公司名称或个人姓名">

        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui';
  export default {
    name: 'Register',
    data: function () {
      return {
        pwd: false,

        readAgreement: true,
        hasSend: false,
        time: 10,

        read: false,

        phone: '',
        code: '',
        password: '',
        nickName:'',
        preference:'1'
      }
    },
    methods: {
      back () {
        this.$router.back();
      },
      doSendCode () {
        if (this.hasSend) {
          return;
        }
        this.hasSend = true;
        this.time = 60;
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
          "type": "1"
        }).then(function (rets) {
          console.log('验证码', rets)
        })
      },
      doRegister () {
        let _this = this;
        this.$validator.validateAll().then(result => {
          if(result){
            this.$api.accountRegister({
              "username": this.phone,
              "password": this.password,
              "verification": this.code,
              "nickName": this.nickName,
              "preference":this.preference
            }).then(function (rets) {
              if(rets.success === true){
                MessageBox.alert('注册成功!', '提示').then(action => {
                  _this.$router.push("/login")
                });
              }
            })
          } else {
            this.$utils.VeeValidateErrors.render(this.$validator.errors);
          }
        })
      },
      select(m){
        this.preference = m;
      }
    }
  }
</script>
<style lang="scss">
  #register .register-form {
    height: 100%;
    padding-top: 12px;
    padding-left: 75px;
    padding-right: 75px;
    background: #ffffff;
  }
  #register .register-form-input.has_send button{
    background-color: #aaaaaa;
    box-shadow: 0 0 1px #aaaaaa;
  }
  #register .register-form-input button{
    /*padding-left: 25px;*/
    /*padding-right: 25px;*/
    width: 200px;
  }
  #register .register-form-btn .mint-button {
    margin-top: 64px;
    width: 100%;
    height: 86px;
    font-size: $btnFontSize; /*px*/
    color: $btnTxtColor;
  }

  #register .register-form-checkbox {
    margin-top: 64px;
  }
  #register .register-form-hobby{
    margin-top: 68px;
    height: 78px;
    line-height: 78px;
    font-size: 28px;
    width: 100%;
    .name{
      color: #313131;
      float: left;
      padding-right: 30px;
    }
    .box{
      color: #626262;
      float: right;
      width: 220px;
      text-align: center;
      border: 1px solid #dcdcdc;/*no*/
      box-sizing: content-box;
    }
    .box2{
      height: 78px;
      width: 440px;
      border: 1px solid #dcdcdc;/*no*/
      text-indent: 30px;
      float: right;
      outline: none;
    }
    .checked{
      color: #3eb049;
      float: right;
      border: 1px solid #3eb049;/*no*/
      box-sizing: content-box;
      background: url(../../../static/image/checked_2.png) no-repeat right bottom / 58px 49px;
    }
  }
</style>
