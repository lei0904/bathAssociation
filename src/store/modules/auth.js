import api from '../../api'
import router from '../../router'
import Utils from '../../utils'

const state = {
  'phone': null,
  'accountId': null,
  'token': null,
  'status': null
}

const actions = {
  login (store, parameters) {
    api.accountLogin(parameters).then((rets) => {
      store.commit('LOGIN_SUCCESS', rets['response'])
      store.commit('SET_PHONE', parameters.phone)
      // router.push('/apply')
      api.accountCertInfo(state.token, state.phone).then((rets) => {
        if (rets['response'] && rets['response']['status']) {
          let status = rets['response']['status']
          if (status === -1) {
            router.push('/perfect_info')
          }
        } else {
          Utils.toast('获取认证信息失败')
        }
      })
    })
  }
}

const mutations = {
  SET_PHONE (state, data) {
    state.phone = data
  },
  LOGIN_SUCCESS (state, data) {
    state.token = data.token
    state.accountId = data.accountId
  }
}

export default {
  state,
  actions,
  mutations
}
