import { get, post, handleParamters } from './base'

export default {
  productFastMessage (parameters) {
    handleParamters(parameters)
    return post('small/shop/product/fast/message', parameters, false)
  },
  CartList (parameters) { // 查看购物车商品列表
    handleParamters(parameters)
    return post('small/shop/shopping/car/list', parameters)
  },
  productCount (parameters) { // 购物车商品数量
    handleParamters(parameters)
    return post('small/shop/shopping/car/product/count', parameters)
  },
  shoppingCarAdd (parameters) {  // 添加购物车
    handleParamters(parameters)
    return post('small/shop/shopping/car/add', parameters, false)
  },
  removeProduct (parameters) { // 删除购物车
    handleParamters(parameters)
    return post('small/shop/shopping/car/remove/product', parameters, false)
  },
  clearInvalidContent (parameters) { // 清空失效商品
    handleParamters(parameters)
    return post('small/shop/shopping/car/remove/failure/product', parameters)
  },
  updateMsg (parameters) { // 购物车添加留言
    handleParamters(parameters)
    return post('small/shop/shopping/car/update/msg', parameters)
  },
  settlement (parameters) {
    handleParamters(parameters)
    return post('small/shop/shopping/car/settlement', parameters)
  },
  orderCreate (parameters) {
    handleParamters(parameters)
    return post('small/shop/order/create', parameters)
  },
  paymentWay (parameters) {
    handleParamters(parameters)
    return post('small/shop/payment/way', parameters)
  },

  orderWalletPaid (parameters) {
    handleParamters(parameters)
    return post('small/shop/order/wallet/paid', parameters)
  },
  paymentWeChat (parameters) {
    handleParamters(parameters)
    return post('small/shop/payment/weChat', parameters)
  },
  paymentAlipay (parameters) {
    handleParamters(parameters)
    return post('small/shop/payment/alipay', parameters)
  }
}
