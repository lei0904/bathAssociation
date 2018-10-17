// eslint-disable-next-line no-unused-vars
import { get, post, handleParamters } from './base'

export default {
  accountGetVerification (parameters) {  // 验证码
    return post('small/shop/user/get/verification', parameters)
  },
  accountRegister (parameters) { // 注册
    if (!parameters['storeId']) {
      parameters['storeId'] = sessionStorage.getItem('storeID')
    }
    return post('small/shop/user/register', parameters)
  },
  accountLogin (parameters) { // 登录
    if (!parameters['storeId']) {
      parameters['storeId'] = sessionStorage.getItem('storeID')
    }
    return post('small/shop/user/login?storeid=4', parameters)
  },
  forgetPassword (parameters) { // 忘记密码
    if (!parameters['token']) {
      parameters['token'] = sessionStorage.getItem('token')
    }
    return post('small/shop/user/update/password', parameters)
  },
  getInfo (parameters) { // 查店铺详情
    handleParamters(parameters)
    return post('small/shop/store/info', parameters)
  },
  userInfo (parameters) { // 查用户详情
    handleParamters(parameters)
    return post('small/shop/user/info', parameters)
  },
  applyBinding (parameters) { // 申请绑定
    handleParamters(parameters)
    return post('small/shop/user/apply', parameters)
  },
  addressList (parameters) { // 地址列表
    handleParamters(parameters)
    return post('small/shop/user/delivery/address/list', parameters)
  },
  addAddress (parameters) { // 添加地址
    handleParamters(parameters)
    return post('small/shop/user/delivery/address/save', parameters)
  },
  editAddress (parameters) { // 编辑地址
    handleParamters(parameters)
    return post('small/shop/user/delivery/address/save', parameters)
  },
  deleteAddress (parameters) { // 删除地址
    handleParamters(parameters)
    return post('small/shop/user/delivery/address/delete', parameters)
  },
  purseBalance (parameters) { // 钱包余额
    handleParamters(parameters)
    return post('small/shop/wallet/balance', parameters)
  },
  useRecords (parameters) { // 钱包使用记录
    handleParamters(parameters)
    return post('small/shop/wallet/use/records', parameters)
  },
  quit (parameters) { // 退出
    handleParamters(parameters)
    return post('small/shop/user/logout', parameters)
  },
  topLevel (parameters) { // 一级分类
    handleParamters(parameters)
    return post('small/shop/product/top/category', parameters)
  },
  getHistory (parameters) { // 搜索历史记录
    handleParamters(parameters)
    return post('small/shop/product/search/history', parameters)
  },
  search (parameters) { // 搜索
    handleParamters(parameters)
    return post('small/shop/product/list', parameters)
  },
  nextLevel (parameters) { // 二级分类
    handleParamters(parameters)
    return post('small/shop/product/category', parameters)
  },

  productList (parameters) {
    handleParamters(parameters)
    return post('small/shop/product/list', parameters)
  },

  goodDetail (parameters) { // 商品详情
    handleParamters(parameters)
    return post('small/shop/product/info', parameters)
  },
  store_commit (parameters) { // 店铺评价
    handleParamters(parameters)
    if (!parameters['pageNumber']) {
      parameters['pageNumber'] = 0
    }
    if (!parameters['pageSize']) {
      parameters['pageSize'] = 10
    }
    return post('small/shop/store/comment/list', parameters)
  },
  addToCart (parameters) { // 添加购物车
    handleParamters(parameters)
    return post('small/shop/shopping/car/add', parameters)
  },
  addFav (parameters) { // 添加常购商品
    handleParamters(parameters)
    return post('small/shop/product/frequent', parameters)
  },
  checkCount (parameters) { // 查看购物车商品数量
    handleParamters(parameters)
    return post('small/shop/shopping/car/product/count', parameters)
  },
  orderList (parameters) { // 订单列表
    handleParamters(parameters)
    return post('small/shop/order/list', parameters)
  },
  getExpress (parameters) { // 订单追踪
    handleParamters(parameters)
    return post('small/shop/order/track', parameters)
  },
  getDetail (parameters) { // 订单详情
    handleParamters(parameters)
    return post('small/shop/order/details', parameters)
  },
  getTrack (parameters) { // 溯源信息
    handleParamters(parameters)
    return post('small/shop/order/track/product', parameters)
  },
  getNum (parameters) { // 分类订单数量
    handleParamters(parameters)
    return post('small/shop/order/my', parameters)
  },
  orderCancel (parameters) { // 取消订单
    handleParamters(parameters)
    return post('small/shop/order/cancel/by/id', parameters)
  },
  checkedReceive (parameters) { // 确认收货状态
    handleParamters(parameters)
    return post('small/shop/order/checked/receive', parameters)
  },
  confirmReceive (parameters) { // 确认收货
    handleParamters(parameters)
    return post('small/shop/order/confirm/receive', parameters)
  },
  commentLoad (parameters) { // 评价界面
    handleParamters(parameters)
    return post('small/shop/order/comment/load', parameters)
  },
  commentSave (parameters) { // 提交评价
    handleParamters(parameters)
    return post('small/shop/order/comment/save', parameters)
  },
  jmtList (parameters) { // 减免退列表
    handleParamters(parameters)
    if (!parameters['pageNumber']) {
      parameters['pageNumber'] = 0
    }
    if (!parameters['pageSize']) {
      parameters['pageSize'] = 10
    }
    return post('small/shop/jmt/list', parameters)
  },
  jmtDetail (parameters) { // 减免退详情
    handleParamters(parameters)
    return post('small/shop/jmt/details', parameters)
  },
  carAgain (parameters) { // 再来一单
    handleParamters(parameters)
    return post('small/shop/shopping/car/again', parameters)
  },
  refundDetails (parameters) { // 退款去向
    handleParamters(parameters)
    return post('small/shop/jmt/refund/details', parameters)
  },
  uploadImg (parameters) { // 头像上传
    handleParamters(parameters)
    return post('small/shop/user/file/upload', parameters)
  },
  historyDelete (parameters) { // 清空搜索历史
    handleParamters(parameters)
    return post('small/shop/product/history/delete', parameters)
  },
  updateAvatar (parameters) { // 头像修改
    handleParamters(parameters)
    return post('small/shop/user/update/avatar', parameters)
  },
  userInfo (parameters) { // 账户信息
    handleParamters(parameters)
    return post('small/shop/user/info', parameters)
  }

}
