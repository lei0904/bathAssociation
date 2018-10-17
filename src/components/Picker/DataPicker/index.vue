<template>
  <mt-popup v-model="visible" position="bottom">
    <mt-picker :slots="slots"
               @change="onDataChange"
               :visible-item-count="item"
               :valueKey="vk"
               class="mint-data-picker"
               show-toolbar>
      <span class="mint-data-action mint-data-cancel" @click="cancel">{{ cancelText }}</span>
      <span class="mint-data-action mint-data-confirm" @click="confirm">{{ confirmText }}</span>
    </mt-picker>
  </mt-popup>
</template>

<style>
  .mint-data-picker .picker-toolbar {
    height: 98px;
    line-height: 98px;
    background: #fcfcfc;
    padding-left: 34px;
    padding-right: 34px;
    font-size: 32px; /*px*/
    border-bottom: 1px solid #dcdcdc;
  }
  .mint-data-action {
    color: #313131;
  }
  .mint-data-action.mint-data-confirm {
    float: right;
    color: #009983;
  }

  .mint-address-picker .picker-selected {
    font-size: 36px;
    color: #313131;
  }
</style>

<script>
  export default{
    name: 'DataPicker',
    props: {
      vk: {
        type: String,
        default: 'name'
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      confirmText: {
        type: String,
        default: '确定'
      },
      item: {
        type: Number,
        default: 3
      },
      values: {
        type: Array
      },
      curValueIndex: {
        type: Number
      }
    },
    data () {
      return {
        visible: false,
        currentValue: this.curValue,
        slots: [{
          flex: 1,
          values: this.values,
          defaultIndex: 0,
          className: 'slot1'
        }]
      }
    },
    watch: {
      values (v) {
        this.values = v;
        this.$set(this.slots, 0, {
          flex: 1,
          values: this.values,
          defaultIndex: 0,
          className: 'slot1'
        })
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.slots[0].defaultIndex = this.curValueIndex
      })
    },
    methods: {
      onDataChange (picker, values) {
        this.currentValue = values[0]
      },
      open () {
        this.visible = true
      },
      cancel () {
        this.visible = false
        this.$emit('cancel')
      },
      confirm () {
        this.visible = false
        this.$emit('confirm', this.currentValue)
      }
    }
  }
</script>
