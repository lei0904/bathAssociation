/* eslint-disable camelcase,no-undef */
import Api from '../../api'
import Utils from '../../utils'
import Router from '../../router'

import Vue from 'vue'

import MessageDialog from '../../components/Dialogs/MessageDialog/index.js'

/*
 "id" : 3477,
 "title" : "奶白菜",
 "price" : 11.7,
 "chargeUnit" : "斤",
 "packageSize" : 1.00,
 "packageUnit" : "斤",
 "packageContainer" : "散货",
 "moq" : 1.00,
 "oid" : null,
 "type" : "1",
 "moml" : 1,
 "pack" : "",
 "incr" : 1.0,
 "nameId" : 54,
 "thumbnail" : "http://imgtest.epfresh.com/2017%2F1%2F15%2F1484431950384_20150427141628752875.jpg-PRODUCTTHUMBNAIL",
 "keyTop" : "1|1",
 "keyTwo" : "1|50|1",
 "lastSnapshotId" : 63902,
 "fastMessages" : [ ],
 "show" : 0
 */
/*
list_mapping: {
  id: item
}

number_mapping: {
  id: number
}
 */
const state = {
  invalid: [],
  checked_mapping: {},
  shop_cart_id_mapping: {},
  list_mapping: {},
  number_mapping: {},
  address: {},
  settlement_data: {},

  submit: {}
}

const getters = {
  submit () {
    return state.submit
  },

  submitNormalDeliveryDate () {
    if (state.submit['normalDeliveryDate']) {
      return state.submit['normalDeliveryDate']
    }
    return {
    }
  },
  submitExpressDeliveryDate () {
    if (state.submit['expressDeliveryDate']) {
      return state.submit['expressDeliveryDate']
    }
    return {
    }
  },
  deliveryDateList () {
    return (state.settlement_data && state.settlement_data['deliveryDateList']) || []
  },

  submitDelivery () {
    if (state.submit['delivery']) {
      return state.submit['delivery']
    }
    return {
    }
  },
  deliveryList () {
    return (state.settlement_data && state.settlement_data['deliveryList']) || []
  },
  submitPayType () {
    if (state.submit['payType']) {
      return state.submit['payType']
    }
    return {
    }
  },
  payTypeList () {
    return (state.settlement_data && state.settlement_data['payTypeList']) || []
  },
  distribution () {
    if (state.settlement_data && state.settlement_data['distributionList']) {
      return state.settlement_data['distributionList'][0] || {}
    }
    return {}
  },
  distributionList () {
    return (state.settlement_data && state.settlement_data['distributionList']) || []
  },
  productExpressFee () {
    return (state.settlement_data && state.settlement_data['productExpressFee']) || 0
  },

  isOverScope () {
    return state.settlement_data['isOverScope']
  },

  checked () {
    return state.checked_mapping
  },
  checkedItems () {
    let items = []
    for (let k in state.checked_mapping) {
      if (state.checked_mapping[k] === 1) {
        items.push(state.list_mapping[k])
      }
    }
    return items
  },
  isCheckedAll () {
    return Object.keys(state.list_mapping).length === Object.keys(state.checked_mapping).length
  },

  invalidContent () {
    return state.invalid
  },
  validContent () {
    return Object.values(state.list_mapping)
  },
  isShopCartEmpty () {
    return Object.keys(state.list_mapping).length === 0 && state.invalid.length === 0
  },
  getShopCartCount (state) {
    return Object.keys(state.list_mapping).length /* + state.invalid.length */
  },
  getShopCartItemNumber (state) {
    return function ({id}) {
      return state.number_mapping[id] || 0
    }
  },
  getShopCartItemTotalPrice (state) {
    return function ({id, price}) {
      return new BigDecimal((state.number_mapping[id] || 0) + '').multiply(new BigDecimal(price + '')).toString()
    }
  },
  getCheckedTotalPrice (state) {
    return function (ids) {
      let list_mapping = state.list_mapping
      let number_mapping = state.number_mapping

      let total = new BigDecimal('0')
      ids.forEach(function (id) {
        let item = list_mapping[id]
        if (item) {
          let number = number_mapping[id]
          let price = item['price']
          let temp = new BigDecimal(number + '').multiply(new BigDecimal(price + ''))
          total = total.add(temp)
        }
      })
      return total.toString()
    }
  },
  getMoney (state) {
    return function (ids, fee) {
      let list_mapping = state.list_mapping
      let number_mapping = state.number_mapping

      let total = new BigDecimal('0')
      ids.forEach(function (id) {
        let item = list_mapping[id]
        if (item) {
          let number = number_mapping[id]
          let price = item['price']
          let temp = new BigDecimal(number + '').multiply(new BigDecimal(price + ''))
          total = total.add(temp)
        }
      })
      total = total.add(new BigDecimal(fee + ''))
      return total.toString()
    }
  },
  isInShopCart (state) {
    return function (id) {
      return !!state.list_mapping[id]
    }
  },
  inShopCart (state) {
    return function (id) {
      return state.list_mapping[id]
    }
  },
  merMsgInShopCart (state) {
    return function (id) {
      return state.list_mapping[id]['merMsg']
    }
  },
  selectedAddress () {
    return state.address && state.address.id
  },
  getAddress () {
    return state.address
  }
}

const actions = {
  shoppingCartClear ({commit}, data) {
    commit('SHOPPING_CART_CLEAR')
    console.log(data)
  },

  setSubmitDeliveryDate ({commit}, data) {
    commit('SET_SUBMIT_DELIVERY_DATE', data)
  },
  setSubmitNormalDeliveryDate ({commit}, data) {
    commit('SET_SUBMIT_NORMAL_DELIVERY_DATE', data)
  },
  setSubmitExpressDeliveryDate ({commit}, data) {
    commit('SET_SUBMIT_EXPRESS_DELIVERY_DATE', data)
  },

  setSubmitDelivery ({commit}, data) {
    commit('SET_SUBMIT_DELIVERY', data)
  },

  setSubmitPayType ({commit}, data) {
    commit('SET_SUBMIT_PAY_TYPE', data)
  },

  toggleThis ({commit}, id) {
    commit('TOGGLE_THIS', id)
  },

  toggleAll ({commit}) {
    commit('TOGGLE_ALL')
  },

  settlement ({getters, commit}, r) {
    // 结算购物车
    let params = {
    }

    let address = state.address
    let items = getters.checkedItems
    if (address && address.id) {
      params.destination = address.cityName
      params.lng = address.lng
      params.lat = address.lat
      params.receiverDistrictId = address.districtId
      params.receiverDetailsAddress = address.addressOnMap + '' + address.address
    }

    let number = state.number_mapping
    let products = []
    items.forEach((i) => {
      products.push({
        'shoppingCarId': i['_shop_cart_id_'],
        'productId': i['id'],
        'count': number[i['id']],
        'versionId': i['lastSnapshotId']
      })
    })
    params.products = products
    Api.settlement(params).then((rets) => {
      commit('SET_SETTLEMENT_DATA', rets)
      commit('SET_SUBMIT_NORMAL_DELIVERY_DATE', rets['normalDeliveryDate'])
      commit('SET_SUBMIT_EXPRESS_DELIVERY_DATE', rets['expressDeliveryDate'])
      commit('SET_SUBMIT_DELIVERY', rets['deliveryList'][0])
      commit('SET_SUBMIT_PAY_TYPE', rets['payTypeList'][0])
      if (r === 1) {
        Router.push('/firm_order')
      }
    })
  },

  firmOrder ({commit, dispatch}, ids) {
    if (!ids || !ids.length || ids.length === 0) {
      Utils.toast('请选择结算的商品')
      return
    }
    // Router.push('/firm_order')
    // 加载默认收货地址
    Api.addressList({
    }).then((rets) => {
      if (rets && rets.length > 0) {
        let address = rets[0]
        for (let i = 0, l = rets.length; i < l; i++) {
          let o = rets[i]
          if (o['isDefault']) {
            address = o
            break
          }
        }
        commit('SET_FIRM_ORDER_ADDRESS_NO_BACK', address)
      }

      dispatch('settlement', 1)
    })
  },

  setFirmOrderAddress ({commit, dispatch}, address) {
    commit('SET_FIRM_ORDER_ADDRESS', address)
    dispatch('settlement', 0)
  },

  loadShopCart ({commit}) {
    Api.CartList({
    }).then((rets) => {
      if (!rets['error']) {
        Api.productCount({
        }).then((rets2) => {
          commit('LOAD_SHOP_CART', {
            list: rets,
            number: rets2
          })
        })
      }
    })
  },
  setShopCartItemNumber ({state, commit}, obj) {
    let item = obj['item']
    let number = obj['number']
    let id = item['id']
    if (parseInt(number) === 0) {
      Api.removeProduct({
        'shoppingCarIds': [state.shop_cart_id_mapping[id]]
      }).then((rets) => {
        if (rets['success']) {
          commit('REMOVE_FROM_PRODUCT', item)
        }
      })
    } else {
      Api.shoppingCarAdd({
        'productId': item.id,
        'count': number,
        'price': item.price,
        'versionId': item.lastSnapshotId
      }).then((rets) => {
        if (rets['success']) {
          commit('SET_SHOP_CART_ITEM_NUMBER', {
            obj: obj,
            shoppingCarId: rets['shoppingCarId']
          })
        }
      })
    }
  },
  removeFromShopCart ({state, commit}, ids) {
    if (!ids || !ids.length || ids.length === 0) {
      Utils.toast('请选择删除的商品')
      return
    }

    let shopCartIds = []
    let list_mapping = state.list_mapping

    ids.forEach(function (id) {
      shopCartIds.push(list_mapping[id]['_shop_cart_id_'])
    })
    Api.removeProduct({
      'shoppingCarIds': shopCartIds
    }).then((rets) => {
      if (rets['success']) {
        commit('REMOVE_FROM_SHOP_CART', ids)
      }
    })
  },
  delFromShopCart ({state, commit}, item) {
    let id = item['id']
    let number = state['number_mapping'][id]
    if (!number) {
      return
    }
    let curNumber = number - 1
    if (curNumber === 0) {
      Api.removeProduct({
        'shoppingCarIds': [state.shop_cart_id_mapping[id]]
      }).then((rets) => {
        if (rets['success']) {
          commit('REMOVE_FROM_PRODUCT', item)
        }
      })
    } else {
      Api.shoppingCarAdd({
        'productId': item.id,
        'count': curNumber,
        'price': item.price,
        'versionId': item.lastSnapshotId
      }).then((rets) => {
        if (rets['success']) {
          commit('DEL_FROM_SHOP_CART', item)
        }
      })
    }
  },
  addToShopCart ({ state, commit }, item) {
    let id = item['id']
    let number = state['number_mapping'][id] || 0
    let curNumber = number + 1
    Api.shoppingCarAdd({
      'productId': item.id,
      'count': curNumber,
      'price': item.price,
      'versionId': item.lastSnapshotId
    }).then((rets) => {
      if (rets['success']) {
        commit('ADD_TO_SHOP_CART', {
          item: item,
          shoppingCarId: rets['shoppingCarId']
        })
      }
    })
  },
  removeInvalid ({commit}) {
    MessageDialog.confirm('确认清空失效商品？', '', {
      callback (action) {
        if (action === 'confirm') {
          Api.clearInvalidContent({

          }).then((rets) => {
            if (rets['success']) {
              commit('CLEAR_INVALID')
            }
          })
        }
      }
    })
  },

  updateMsg ({commit}, data) {
    Api.updateMsg({
      msg: data.msg,
      shoppingCarId: data.item['_shop_cart_id_']
    }).then((rets) => {
      if (rets['success']) {
        commit('UPDATE_MSG', data)
      }
    })
  }
}

const mutations = {
  TOGGLE_THIS (state, id) {
    if (state.checked_mapping[id]) {
      Vue.delete(state.checked_mapping, id)
    } else {
      Vue.set(state.checked_mapping, id, 1)
    }
    if (Object.keys(state.checked_mapping).length === Object.keys(state.list_mapping).length) {
      state.is_checked_all = true
    } else {
      state.is_checked_all = false
    }
  },

  TOGGLE_ALL () {
    let is_checked_all = Object.keys(state.list_mapping).length === Object.keys(state.checked_mapping).length
    if (is_checked_all) {
      Vue.set(state, 'checked_mapping', {})
    } else {
      Object.keys(state.list_mapping).forEach(function (id) {
        Vue.set(state.checked_mapping, id, 1)
      })
    }
  },

  LOAD_SHOP_CART (state, data) {
    state['list_mapping'] = {}
    state['number_mapping'] = {}

    let list = data['list']
    let number = data['number']

    let invalidContent = list['invalidContent']
    let validContent = list['validContent']
    validContent.forEach(function (o) {
      let item = {
        '_shop_cart_id_': o['id'],
        'id': o['productId'],
        'title': o['productTitle'],
        'price': o['productUnitPrice'],
        'chargeUnit': o['productChargeUnit'],
        'packageSize': o['productPackageSize'],
        'packageUnit': o['productChargeUnit'],
        'packageContainer': '散货',
        'thumbnail': o['productImgUrl'],
        'merMsg': o['merMsg'],
        'lastSnapshotId': o['lastVersionId']
      }
      let n = o['productCount']
      let id = item['id']
      if (!state.list_mapping[id]) {
        Vue.set(state.list_mapping, id, item)
      }
      state.shop_cart_id_mapping[id] = item['_shop_cart_id_']
      Vue.set(state.number_mapping, id, n)
    })
    Vue.set(state, 'invalid', invalidContent)
  },
  SET_SHOP_CART_ITEM_NUMBER: function (state, obj) {
    obj = obj['obj']
    let shoppingCarId = obj['shoppingCarId']

    let item = obj['item']
    let number = obj['number']
    let id = item['id']

    item['_shop_cart_id_'] = shoppingCarId

    if (!state.list_mapping[id]) {
      Vue.delete(item, 'merMsg')
      Vue.set(state.list_mapping, id, item)
    }
    Vue.set(state.number_mapping, id, number)
    state.shop_cart_id_mapping[id] = item['_shop_cart_id_']
  },
  DEL_FROM_SHOP_CART: function (state, item) {
    let id = item['id']
    if (state.number_mapping[id]) {
      Vue.set(state.number_mapping, id, state.number_mapping[id] - 1)
    }
    if (state.number_mapping[id] === 0) {
      Vue.delete(state.checked_mapping, id)
      Vue.delete(state.number_mapping, id)
      Vue.delete(state.list_mapping, id)
      Vue.delete(state.shop_cart_id_mapping, id)
    }
  },
  ADD_TO_SHOP_CART: function (state, obj) {
    let item = obj['item']
    let shoppingCarId = obj['shoppingCarId']
    let id = item['id']
    item['_shop_cart_id_'] = shoppingCarId

    if (!state.list_mapping[id]) {
      Vue.delete(item, 'merMsg')
      Vue.set(state.list_mapping, id, item)
    }
    if (!state.number_mapping[id]) {
      Vue.set(state.number_mapping, id, 1)
    } else {
      Vue.set(state.number_mapping, id, state.number_mapping[id] + 1)
    }
    state.shop_cart_id_mapping[id] = item['_shop_cart_id_']
  },

  REMOVE_FROM_PRODUCT: function (state, item) {
    let id = item['id']
    Vue.delete(state.checked_mapping, id)
    Vue.delete(state.list_mapping, id)
    Vue.delete(state.number_mapping, id)
    Vue.delete(state.shop_cart_id_mapping, id)
  },

  REMOVE_FROM_SHOP_CART: function (state, ids) {
    ids.forEach(function (id) {
      Vue.delete(state.checked_mapping, id)
      Vue.delete(state.list_mapping, id)
      Vue.delete(state.number_mapping, id)
      Vue.delete(state.shop_cart_id_mapping, id)
    })
  },

  CLEAR_INVALID: function (state) {
    Vue.set(state, 'invalid', [])
  },

  UPDATE_MSG: function (state, data) {
    Vue.set(state.list_mapping[data.item.id], 'merMsg', data['msg'])
  },

  SET_FIRM_ORDER_ADDRESS: function (state, data) {
    Vue.set(state, 'address', data)
    Router.back()
  },

  SET_FIRM_ORDER_ADDRESS_NO_BACK: function (state, data) {
    Vue.set(state, 'address', data)
  },

  SET_SETTLEMENT_DATA: function (state, data) {
    Vue.set(state, 'settlement_data', data)
  },

  SET_SUBMIT_DELIVERY_DATE: function (state, data) {
    Vue.set(state.submit, 'deliveryDate', data)
  },
  SET_SUBMIT_NORMAL_DELIVERY_DATE: function (state, data) {
    Vue.set(state.submit, 'normalDeliveryDate', data)
  },
  SET_SUBMIT_EXPRESS_DELIVERY_DATE: function (state, data) {
    Vue.set(state.submit, 'expressDeliveryDate', data)
  },
  SET_SUBMIT_DELIVERY: function (state, data) {
    Vue.set(state.submit, 'delivery', data)
  },
  SET_SUBMIT_PAY_TYPE: function (state, data) {
    Vue.set(state.submit, 'payType', data)
  },

  SHOPPING_CART_CLEAR: function (state) {
    Vue.set(state, 'invalid', [])
    Vue.set(state, 'checked_mapping', {})
    Vue.set(state, 'shop_cart_id_mapping', {})
    Vue.set(state, 'list_mapping', {})
    Vue.set(state, 'number_mapping', {})
    Vue.set(state, 'address', {})
    Vue.set(state, 'settlement_data', {})
    Vue.set(state, 'submit', {})
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
