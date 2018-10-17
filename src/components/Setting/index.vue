<template>
  <div id="Setting">
    <Header :text="'设置'"></Header>
    <div class="padt20">
      <mt-cell title="修改密码" to="/forget_password"></mt-cell>
      <mt-cell title="服务条款" to="agreement"></mt-cell>
      <mt-cell title="联系e批生鲜" value="400-0588-198" @click.native="tel('400-0588-198')"></mt-cell>
    </div>
    <div class="padt65">
      <mt-button size="large" @click.native="quit()">退出当前账号</mt-button>
    </div>

  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui';
  export default {
    name: 'Agreement',
    data:function () {
        return{

        }
    },
    methods:{
      quit:function () {
        MessageBox.confirm('确认退出?').then(action => {
          let _this = this;
          this.$api.quit({
            "token":sessionStorage.getItem("token")
          }).then((rets) => {
              if(rets.success){
                _this.$router.push('/login')
              }
          })
        });
      },
      tel(val){
        window.location.href = 'tel://' + val;
      }
    }
  }
</script>
<style lang="scss">
  #Setting{
    background: #efefef;
    min-height: 100vh;
  }
  #Setting .padt20{
    padding-top: 20px;
  }
  #Setting .padt65{
    padding-top: 65px;
  }
  #Setting .mint-cell{
    border-bottom: 1px solid #dcdcdc;/*no*/
    border-top:0 none;
  }
  #Setting .mint-cell:last-child{
    border:0 none;
  }
  #Setting .mint-button{
    background: #fff;
    color: #009983;
    border: 0 none;
    border-radius: 0;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    font-size: 32px;/*px*/
  }
  #Setting .mint-cell-text ,#Setting .mint-cell-value{
    font-size: 32px;/*px*/
    color: #434343;
  }
</style>
