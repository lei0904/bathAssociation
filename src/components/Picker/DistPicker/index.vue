<template>
  <mt-popup v-model="visible" position="bottom">
    <mt-picker :slots="addressSlots" @change="onAddressChange" class="mint-address-picker" :visible-item-count="visibleItemCount" show-toolbar>
      <span class="mint-address-action mint-address-cancel" @click="cancel">{{ cancelText }}</span>
      <span class="mint-address-action mint-address-confirm" @click="confirm">{{ confirmText }}</span>
    </mt-picker>
  </mt-popup>
</template>

<style>
  .mint-address-picker .picker-toolbar {
    height: 98px;
    line-height: 98px;
    background: #fcfcfc;
    padding-left: 34px;
    padding-right: 34px;
    font-size: 32px; /*px*/
    border-bottom: 1px solid #dcdcdc;
  }
  .mint-address-action {
    color: #313131;
  }
  .mint-address-action.mint-address-confirm {
    float: right;
    color: #009983;
  }

  .mint-address-picker .picker-selected {
    font-size: 36px;
    color: #313131;
  }
</style>

<script>
  import DistData from './data.js'

  export default{
    name: 'AddressPicker',
    props: {
      cancelText: {
        type: String,
        default: '取消'
      },
      confirmText: {
        type: String,
        default: '确定'
      },
      visibleItemCount: {
        type: Number,
        default: 5
      },
      defaultAddressProvince: {
        type: String,
        default: '北京市'
      },
      defaultAddressCity: {
        type: String,
        default: '市辖区'
      },
      defaultAddressArea: {
        type: String,
        default: '东城区'
      }
    },
    data () {
      this.addressProvince = this.defaultAddressProvince || '上海市'
      this.addressCity = this.defaultAddressCity || '市辖区'
      this.addressArea = this.defaultAddressArea || '黄浦区'

      let pValues = Object.keys(DistData)
      let pIndex = 0
      pValues.forEach((item, index) => {
        if (this.addressProvince === item) {
          pIndex = index
        }
      })
      let cValues = Object.keys(DistData[this.addressProvince])
      let cIndex = 0
      cValues.forEach((item, index) => {
        if (this.addressCity === item) {
          cIndex = index
        }
      })
      let aValues = DistData[this.addressProvince][this.addressCity]
      let aIndex = 0
      aValues.forEach((item, index) => {
        if (this.addressArea === item) {
          aIndex = index
        }
      })

      this.pIndex = pIndex
      this.cIndex = cIndex
      this.aIndex = aIndex

      return {
        visible: false,
        addressSlots: [
          {
            flex: 1,
            values: pValues,
            className: 'slot1',
            textAlign: 'center'
          },
          {
            divider: true,
            content: ' ',
            className: 'slot2'
          },
          {
            flex: 1,
            values: cValues,
            className: 'slot3',
            textAlign: 'center'
          },
          {
            divider: true,
            content: ' ',
            className: 'slot4'
          },
          {
            flex: 1,
            values: aValues,
            className: 'slot5',
            textAlign: 'center'
          }
        ],
        addressProvince: this.defaultAddressProvince,
        addressCity: this.defaultAddressCity,
        addressArea: this.defaultAddressArea
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.addressSlots[0].defaultIndex = this.pIndex || 0
        this.addressSlots[2].defaultIndex = this.cIndex || 0
        this.addressSlots[4].defaultIndex = this.aIndex || 0
      })
    },
    methods: {
      onAddressChange (picker, values) {
        if (values[0]) {
          let selectProvince = values[0]
          console.log(selectProvince)
          if (selectProvince !== this.addressProvince) {
            picker.setSlotValues(1, Object.keys(DistData[selectProvince]))
            picker.setSlotValues(2, Object.values(DistData[selectProvince])[0])
          }
          this.addressProvince = selectProvince

          if (values[1]) {
            let selectCity = values[1]
            if (selectCity !== this.addressCity) {
              picker.setSlotValues(2, DistData[this.addressProvince][selectCity])
            }
            this.addressCity = selectCity
          }
          if (values[2]) {
            this.addressArea = values[2]
          }
        }
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
        this.$emit('confirm', this.addressProvince, this.addressCity, this.addressArea)
      }
    }
  }
</script>
