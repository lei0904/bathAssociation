import Vue from 'vue'
import Vuex from 'vuex'

import Logger from '../plugins/logger'

import auth from './modules/auth'
import perfectInfo from './modules/perfect_info'
import shopCart from './modules/shop_cart'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    perfectInfo,
    shopCart
  },
  strict: debug,
  plugins: debug ? [Logger()] : []
})
