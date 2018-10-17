<template>
  <div id="evaluate">
    <Header :text="'评价'" :actionable="true"  @action="save()" :explain="'提交'"></Header>
    <div class="head">
      <div class="name">上海三林专业合作社</div>
      <div class="detail clearfix">
        <div class="left">商品评分</div>
        <div class="right">
          <div class="type_item type_1" :class="checked == 1 ? 'checked' : ''" @click="checked=1">
            <div class="img"></div>
            <div class="text">点赞</div>
          </div>
          <div class="type_item type_2" :class="checked == 2 ? 'checked' : ''" @click="checked=2">
            <div class="img"></div>
            <div class="text">满意</div>
          </div>
          <div class="type_item type_3" :class="checked == 3 ? 'checked' : ''" @click="checked=3">
            <div class="img"></div>
            <div class="text">吐槽</div>
          </div>
        </div>
      </div>
    </div>
    <div class="item" v-for="item in list.productList">
      <div class="item_head">
        <img :src="item.productImgUrl" >
        {{item.productTitle}}
      </div>
      <div class="item_detail">
          <textarea placeholder="商品符合您的期待嘛？请分享您的经历"  v-model="item.text"></textarea>
          <div class="img_box clearfix">
            <img src="../../../static/image/test_5.png">
            <img src="../../../static/image/test_5.png">
            <img src="../../../static/image/test_5.png">
          </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  export default {
    name: 'Evaluate',
    data() {
      return{
        checked:0,
        list:{},
        id:''
      }
    },
    methods:{
        save:function () {
          let _this = this;
          let productList = [];
          let item = {};
          if(!_this.checked){
            Vue.$toast({
              message: '请选择评分',
              className: 'with-icon',
              iconClass: 'failed'
            })
            return;
          }
          for (let i = 0; i < _this.list.productList.length; i++) {
            if(!_this.list.productList[i].text){
              Vue.$toast({
                message: '请填写评价内容',
                className: 'with-icon',
                iconClass: 'failed'
              });
              productList = [];
              return;
            }else{
              item.itemId = _this.list.productList[i].itemId;
              item.productId = _this.list.productList[i].productId;
              item.score = _this.checked;
              item.content = _this.list.productList[i].text ;
              productList.push(item)
            }
          }
          this.$api.commentSave({
            "orderId": _this.id,
            "score":_this.checked,
            "productList":productList
          }).then((rets) => {
              if (rets.success){
                sessionStorage.setItem("orderId",_this.id);
                this.$router.push("/view_evaluation")
              }
          })
        },
      commentLoad(id){
        let _this = this;
        this.$api.commentLoad({
          "orderId": id,
        }).then((rets) => {
          _this.list = rets
        })
      }
    },
    activated(){
      let id = sessionStorage.getItem("orderId");
      this.id = id;
      this.commentLoad(id)
    }
  }
</script>
<style lang="scss">
    #evaluate{
      height: 100vh;
      background: #efefef;
      overflow-y: scroll;
      .header{
        position: fixed;
        top:0;
        width: 100%;
      }
      .head{
        background: #fff;
        margin-top: 110px;
        .name{
          height: 88px;
          line-height: 88px;
          font-size: 32px;/*px*/
          color: #313131;
          text-indent: 32px;
          border-bottom: 1px solid #efefef;/*no*/
        }
        .detail{
          height: 160px;
          width: 100%;
          .left{
            color: #898989;
            font-size: 30px;/*px*/
            height: 160px;
            line-height: 160px;
            text-indent: 32px;
            width: 50%;
            float: left;
          }
          .right{
            width: 50%;
            float: left;
            .type_item{
              text-align: center;
              float: right;
              margin-right: 50px;
              .img{
                width: 68px;
                height: 68px;
                margin-top: 26px;
                margin-bottom: 16px;
              }
              .text{
                color: #626262;
                font-size: 26px;/*px*/
              }
            }
            .type_1{
              .img{
                background: url(../../../static/image/type_1_unchecked.png) no-repeat center / 100% 100%;
              }
            }
            .type_1.checked{
              .img{
                background: url(../../../static/image/type_1.png) no-repeat center / 100% 100%;
              }
              .text{
                color: #ee5d11;
              }
            }
            .type_2{
              .img{
                background: url(../../../static/image/type_2_unchecked.png) no-repeat center / 100% 100%;
              }
            }
            .type_2.checked{
              .img{
                background: url(../../../static/image/type_2.png) no-repeat center / 100% 100%;
              }
              .text{
                color: #ff9600;
              }
            }
            .type_3{
              .img{
                background: url(../../../static/image/type_3_unchecked.png) no-repeat center / 100% 100%;
              }
            }
            .type_3.checked{
              .img{
                background: url(../../../static/image/type_3.png) no-repeat center / 100% 100%;
              }
              .text{
                color: #aaaaaa;
              }
            }
          }
        }
      }
      .item{
        margin-top: 20px;
        background: #fff;
        padding: 35px 48px 42px 32px;
        .item_head{
          background: #f3f4f7;
          height: 136px;
          line-height: 136px;
          font-size: 30px;/*px*/
          img{
            width: 100px;
            height: 100px;
            margin: 18px 35px 18px 32px;
            vertical-align: middle;
          }
        }
        .item_detail{
          border: 1px solid #dcdcdc;/*no*/
          margin-top: 28px;
          min-height: 350px;
          font-size: 28px;/*px*/
          color: #313131;
          textarea{
            width: 610px;
            height: 200px;
            border: 0 none;
            margin: 28px 35px 28px 32px;
            outline: none;
          }
          .img_box{
            margin: 0 0 30px 32px;
            img{
              width: 184px;
              height: 184px;
              margin-right: 30px;
              float: left;
            }
            img:last-child{
              margin-right: 0;
            }
          }
        }
      }
    }
</style>
