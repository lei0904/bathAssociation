import router from '../../router'

const state = {
  'deliveryAddressModel': null
}

const mutations = {
  setSelectAddress (state, data) {
    state['deliveryAddressModel'] = data
    router.back()
  }
}

const getters = {
  getSelectAddress (state) {
    return state['deliveryAddressModel'] && state['deliveryAddressModel']['address']
  }
}

export default {
  state,
  getters,
  mutations
}
