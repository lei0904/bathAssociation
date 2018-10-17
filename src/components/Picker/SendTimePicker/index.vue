<template>
  <mt-popup v-model="visible" position="bottom">
    <div class="send-time-picker">
      <div class="header">
        要求送达时间
        <div class="confirm" @click="confirm"></div>
      </div>
      <div class="button_select clearfix">
        <div :class="checked == 1 ? 'checked' : ''" @click="changeType(1)">标准达</div>
        <div :class="checked == 2 ? 'checked' : ''" @click="changeType(2)">精准达</div>
      </div>
      <div class="body clearfix" v-if="checked == 1">
        <div class="left">
          <div class="date"
               :class="type1DateChecked == index ? 'checked' : ''"
               v-for="(item , index) in submitNormalDeliveryDate"
              @click="changeTimeList(1,index)">
            {{item.dateStr}}
          </div>
        </div>
        <div class="right">
          <div class="time"
               :class="type1TimeChecked == index ? 'checked' : ''"
               v-for="(items , index) in timeList"
               @click="sendCheck(1,index,items)">{{items.title}} (运费{{items.freight}}元)</div>
        </div>
      </div>
      <div class="body clearfix" v-if="checked == 2">
        <div class="left">
          <div class="date"
               :class="type2DateChecked == index ? 'checked' : ''"
               v-for="(item , index) in submitExpressDeliveryDate"
               @click="changeTimeList(2,index)">{{item.dateStr}}</div>
        </div>
        <div class="right">
          <div class="time"
               :class="type2TimeChecked == index ? 'checked' : ''"
               v-for="(items , index) in timeList"
               @click="sendCheck(2,index,items)">{{items.title}} (运费{{items.freight}}元)</div>

        </div>
      </div>
    </div>
  </mt-popup>
</template>

<style lang="scss">
  .send-time-picker .header {
    height: 98px;
    line-height: 98px;
    background: #fcfcfc;
    color: #434343;
    font-size: 34px;
    position: relative;
  }
  .send-time-picker .header .confirm{
    height: 100%;
    font-size: 30px;
    color: #009983;
    position: absolute;
    right: 0;
    top:0;
    padding: 0 26px;
    background: #fff;
    border: 0 none;
    width: 32px;
    background: url(../../../../static/image/close_selectbox.png) no-repeat center / 32px 32px;
  }

  .send-time-picker {
    .button_select{
      width: 350px;
      height: 60px;
      line-height: 60px;
      margin: 36px 205px 36px 205px;
      background: #f3f4f7;
      border-radius: 100px;

      div{
        width: 170px;
        float: left;
        text-align: center;
        color: #313131;
      }
      .checked{
        background: #3eb049;
        color: #fff;
        border-radius: 100px;
      }
    }
    .body{
      border-top: 1px solid #dcdcdc;/*no*/
      .left{
        width: 244px;
        float: left;
        .date{
          height: 90px;
          line-height: 90px;
          text-align: center;
          color: #434343;
          background: #f8f8f8;
          font-size: 28px;/*px*/
          border-bottom: 1px solid #dcdcdc;/*no*/
          border-right: 1px solid #dcdcdc;/*no*/
        }
        .checked{
          color: #3eb049;
          background: #fff;
          border-right: 0 none;
        }
      }
      .right{
        width: 505px;
        font-size: 28px;/*px*/
        float: left;
        max-height: 600px;
        overflow-y: scroll;
        .time{
          color: #434343;
          background: #fff;
          height: 90px;
          line-height: 90px;
          text-align: center;
        }
        .checked{
          color: #3eb049;
          background: url(../../../../static/image/checked_selectbox.png) no-repeat  #f7fff6 right bottom / 48px 40px;
          margin: 0 32px;
          width:441px ;
        }
      }
    }
  }
</style>

<script>
  import {mapGetters} from 'vuex'

  export default{
    name: 'DataPicker',
    props: {
      values: {
        type:Array
      },
      cur: {
        type: Object
      }
    },
    computed: {
      ...mapGetters([
        'submitNormalDeliveryDate',
        'submitExpressDeliveryDate'
      ])
    },
    data () {
      return {
        visible: false,
        normal: this.submitNormalDeliveryDate || {},
        express: this.submitExpressDeliveryDate || {},
        checked:'1',
        type1DateChecked:0,
        type2DateChecked:0,
        type1TimeChecked:-1,
        type2TimeChecked:-1,
        timeList:[],
        checkedTitle:'',
        checkedId:''
      }
    },
    methods: {
      isSelected (item, index) {
        if (this.current && this.current.id) {
          return item.id === this.current.id
        }
        return index === 0;
      },
      open () {
        this.visible = true
      },
      selected (item) {
        this.current = item;
      },
      confirm () {
        this.visible = false;
      },
      changeType(type){
          this.checked = type;
          if (type == 1){
            this.timeList = this.submitNormalDeliveryDate[0].timeList
          }else if(type == 2){
            this.timeList = this.submitExpressDeliveryDate[0].timeList
          }
      },
      sendCheck(type,index,items){
          if(type == 1){
            this.type1TimeChecked = index;
            this.checkedTitle = items.title;
            this.checkedId = items.typeAndId;
            this.$emit('confirm', items)
          }else if (type == 2){
            this.type2TimeChecked = index;
            this.checkedTitle = items.title;
            this.checkedId = items.typeAndId;
            this.$emit('confirm', items)
          }

      },
      changeTimeList(type,index){
          if (type == 1 && this.type1DateChecked !== index){
            this.timeList = this.submitNormalDeliveryDate[index].timeList;
            this.type1DateChecked = index;
            this.type1TimeChecked = -1;
          }else if(type == 2  && this.type2DateChecked !== index){
            this.timeList = this.submitExpressDeliveryDate[index].timeList;
            this.type2DateChecked = index;
            this.type2TimeChecked = -1;
          }
      }
    },
    activated(){
        this.timeList = this.submitNormalDeliveryDate[0].timeList
    }
  }
</script>
