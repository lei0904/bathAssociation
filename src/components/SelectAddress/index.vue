<template>
  <div id="select_address">
    <Header :show="'slot'" @input="input" v-model="search">
      <div class="search-wrapper">
        <div class="search-select" @click="openDistPicker">{{addressArea}}</div>
        <div class="search-input">
          <input type="hidden" id="searchInputHidden">
          <input class="search-input-core" id="searchInput" placeholder="请输入您的收货地址" @focus="active = true" v-model="searchText">
          <i class="search-input-clear" v-show="searchText && active" @click="searchText=''"></i>
        </div>
      </div>
    </Header>
    <div class="container" v-show="!searching">
      <div id="map" class="select_address_map">
      </div>
      <div class="select_address_list">
        <section class="item" v-for="(item, index) in list1" :class="index == 0 ? 'cur' : ''" @click="addressItemClick(item)">
          <div class="wrapper">
            <div class="title"><span v-if="index == 0">[当前位置]</span>{{item.title}}</div>
            <div class="info">{{item.address}}</div>
          </div>
        </section>
      </div>
    </div>
    <div class="container" style="z-index: 100; background: #fff;" v-show="searching">
      <div class="select_address_list" style="top: 0">
        <section class="item" v-for="(item, index) in list2" @click="addressItemClick(item)">
          <div class="wrapper">
            <div class="title">{{item.title}}</div>
            <div class="info">{{item.address}}</div>
          </div>
        </section>
      </div>
    </div>

    <DistPicker ref="distPicker"
                :defaultAddressProvince="addressProvince"
                :defaultAddressCity="addressCity"
                :defaultAddressArea="addressArea"
                @confirm="addressSelected"></DistPicker>
  </div>
</template>
<script>
  import BM from '../../bm.js'
  import DistPicker from '../Picker/DistPicker/index.vue'

  export default {
    name: 'SelectAddress',
    data () {
      return {
        BMap: null,
        map: null,
        geolocation: null,

        list1: [],
        list2: [],

        search: '上海市',
        active: false,
        searchText: '',

        metaContent: '',

        addressProvince: '上海市',
        addressCity: '市辖区',
        addressArea: '普陀区',

        show: false
      }
    },
    components: {
      DistPicker
    },
    computed: {
      searching () {
        return this.searchText && this.active;
      }
    },
    watch: {
      searchText: function (v) {
        if(this.ac) {
          this.ac.search(v);
        }
      }
    },
    mounted () {
      let _this = this;
      BM('Ewcp0cprIYM0hOD10HjUeBASgQ0ux7c6').then((BMap) => {
        _this.mapInit(BMap);
      });
    },
    methods: {
      addressItemClick (item) {
        let myGeo = new this.BMap.Geocoder();
        let _this = this;
        // 将地址解析结果显示在地图上,并调整地图视野
        myGeo.getPoint(item.address, function(point){
          if (point) {
            let deliveryAddressModel = {
              "address": item.address,
              "lng": point.lng,
              "lat": point.lat,
              "addressOnMap": item.address,
              "isDefault":true,
              "isDeleted":false,
              "province":_this.addressProvince,
              "city":_this.addressCity,
              "district":item.district
            };
            _this.$store.commit('setSelectAddress', deliveryAddressModel);
          }else{
            alert("您选择地址没有解析到结果!");
          }
        }, "北京市");
      },
      address: function () {
        return this.addressProvince + this.addressCity + this.addressArea
      },

      mapInit (BMap) {
        let _this = this;
        _this.BMap = BMap;
        let map = new BMap.Map("map");
        let point = new BMap.Point(121.397257, 31.239197);
        map.centerAndZoom(point, 15);
        map.setMapStyle({style:'grayscale'});

        map.addControl(new BMap.NavigationControl());
        map.addControl(new BMap.ScaleControl());
        map.addControl(new BMap.OverviewMapControl());

        let marker = new BMap.Marker(point);
        map.addOverlay(marker);

        _this.map = map;
        _this.currentPosition();
        _this.bindClick();

      },

      setAutocompleteLocation(location){
        if (this.ac) {
          this.ac.setLocation(location);
        }
      },
      initAutocomplete (location) {
        let  _this = this;
        if (_this.ac) {
          _this.ac.dispose();
          _this.ac = null;
        }

        let ac = new _this.BMap.Autocomplete({
          "input" : "searchInputHidden",
          location: location,
          onSearchComplete: function (r) {
            ac.hide();
            _this.list2 = [];
            let zr = r['zr'];
            let item;
            for (let idx = 0, len = zr.length; idx < len; idx++) {
              item = zr[idx];
              _this.list2.push({
                title: item.business,
                address: item.city + '' + item.district + item.business
              });
              console.log(item)
            }
          }
        });
        ac.hide();
        _this.ac = ac;
      },

      currentPosition: function () {
        let _this = this;
        let map = _this.map;
        let geolocation = new _this.BMap.Geolocation();
        geolocation.enableSDKLocation();
        geolocation.getCurrentPosition(function(r){
          if(this.getStatus() === BMAP_STATUS_SUCCESS){
            let mk = new BMap.Marker(r.point);
            map.clearOverlays();
            map.addOverlay(mk);
            map.panTo(r.point);

            _this.show = true;

            _this.addressProvince = r.address.province;
            _this.addressCity = r.address.city;
            _this.addressArea = r.address.city;

            _this.initAutocomplete(map);

            _this.getLocation(r.point);
          } else {
            console.log('failed: ' + this.getStatus());
          }
        });
      },

      getLocation: function (point) {
        let _this = this;
        let myGeo = new _this.BMap.Geocoder();        //创建地址解析实例
        myGeo.getLocation(point, function(result){
          let arr = [];
          arr.push({
            title: result.address,
            address: result.address,
            district:result.addressComponents.district
          });

          let surroundingPois = result.surroundingPois;
          if (surroundingPois) {
            let item;
            for (let idx = 0, len = surroundingPois.length; idx < len; idx++) {
              item = surroundingPois[idx];
              arr.push({
                title: item.title,
                address: item.address,
                district:result.addressComponents.district
              });
            }
          }

          _this.list1 = arr;
        });
      },

      bindClick: function () {
        let _this = this;
        let map = _this.map;
        map.addEventListener("click", function (e) {

          map.clearOverlays();
          let marker = new _this.BMap.Marker(new _this.BMap.Point(e.point.lng, e.point.lat));
          map.addOverlay(marker);
          map.panTo(e.point);

          _this.setAutocompleteLocation(_this.map);
          _this.getLocation(e.point);
        });
      },

      input () {
      },
      openDistPicker() {
        this.$refs['distPicker'].open()
      },
      addressSelected (addressProvince, addressCity, addressArea) {
        this.addressProvince = addressProvince;
        this.addressCity = addressCity;
        this.addressArea = addressArea;

        this.list1 = [];
        this.map.centerAndZoom(this.addressProvince + '' + this.addressCity + '' + this.addressArea, 15);
        setTimeout(() => {
          this.map.clearOverlays();
          let marker = new this.BMap.Marker(this.map.getCenter());
          this.map.addOverlay(marker);
          this.map.panTo(this.map.getCenter());
          this.getLocation(this.map.getCenter());
          this.setAutocompleteLocation(this.map);
        }, 1500)


        // this.setAutocompleteLocation(this.addressProvince + '' + this.addressCity + '' + this.addressArea);
      }
    }
  }
</script>
<style lang="scss">
  .tangram-suggestion-main {
    z-index: 300;
  }
  .search-wrapper {
    height: 66px;
    line-height: 66px;
    position: absolute;
    left: 84px;
    top: 12px;
    right: 34px;
    background: #efefef;
    border-radius: 5px;
  }
  .search-wrapper .search-select {
    height: 100%;
    font-size: 28px; /*px*/
    padding-right: 31px;
    color: #313131;
    top: 0;
    box-sizing: border-box;
    display: inline-block;
    float: left;
    margin-left: 30px;
    background: url("../../../static/image/bottom_arrow.png");
    background-size: 18px 11px;
    background-repeat: no-repeat;
    background-position: center right;
    max-width: 120px;
    overflow: hidden;
    text-overflow: clip;
    white-space: nowrap;
  }
  .search-wrapper .search-input {
    /*height: 30px;*/
    position: absolute;
    left: 165px;
    right: 0px;
    top: 0;
    bottom: 0;
    /*border-left: 1px solid #aaaaaa; !*no*!*/
  }
  .search-wrapper .search-input:before {
    content: ' ';
    display: inline-block;
    width: 1px; /*no*/
    background: #aaaaaa;
    height: 30px;
    position: absolute;
    top: 20px;
    left: 1px;
  }
  .search-wrapper .search-input .search-input-core {
    outline: none;
    -webkit-appearance: normal;
    float: left;
    width: 100%;
    height: 100%;
    font-size: 28px; /*px*/
    color: #313131;
    border: none;
    background: none;
    padding: 0 22px;
    box-sizing: border-box;
  }
  .search-wrapper .search-input .search-input-clear {
    width: 38px;
    height: 38px;
    background: url("../../../static/image/input-clear.png") no-repeat;
    background-size: 100% 100%;
    display: inline-block;
    position: absolute;
    right: 16px;
    top: 14px;
  }

  #select_address .select_address_map {
    height: 500px;
    width: 100%;
  }

  #select_address .select_address_list {
    background: #ffffff;
    overflow: auto;
    position: absolute;
    top: 500px;
    bottom: 0px;
    width: 100%;
  }

  #select_address .select_address_list .item {
    height: 150px;
    width: 100%;
    padding: 0 34px 0 116px;
    box-sizing: border-box;
    border-bottom: 1px solid $border; /*no*/
    background: url("../../../static/image/pos_icon.png") no-repeat 34px center;
    background-size: 48px 54px;
  }
  #select_address .select_address_list .item.cur {
    background: url("../../../static/image/pos_icon_cur.png") no-repeat 34px center;
    background-size: 48px 54px;
  }

  #select_address .select_address_list .item .wrapper {
    float: left;
    width: 100%;
    margin-top: 30px;
  }
  #select_address .select_address_list .item .wrapper .title,
  #select_address .select_address_list .item .wrapper .info {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  #select_address .select_address_list .item .wrapper .title {
    font-size: 32px; /*px*/
    color: #313131;
    padding-bottom: 14px;
  }
  #select_address .select_address_list .item .wrapper .info {
    font-size: 26px; /*px*/
    color: #898989;
    padding-top: 14px;
  }
</style>
