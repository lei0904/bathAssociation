import 'lib-flexible'

import Vue from 'vue'

import Vuex from 'vuex'
Vue.use(Vuex)

import VueWeChatTitle from 'vue-wechat-title'
Vue.use(VueWeChatTitle)

import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint)

import api from './api'
Vue.prototype.$api = api

import utils from './utils.js'
Vue.prototype.$utils = utils

Vue.config.productionTip = false

import App from './components/App.vue'
import router from './router.js'

import FastClick from 'fastclick'
FastClick.attach(document.body)

import './validators/index.js'

import store from './store'

/* import Mock from './mock'
Mock.init() */

import Header from './components/Header/index'
import Footer from './components/Footer/index'

Vue.component('Header', Header)
Vue.component('Footer', Footer)

import Scrolling from './directive/scrolling.js'
Vue.directive('scrolling', Scrolling)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
