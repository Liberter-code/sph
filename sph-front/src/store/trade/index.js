import {getAddressInfo, getOrderInfo} from '@/api/index'

export default {
  namespaced: true,
  state: {
    addressList: [],
    orderInfo: {}
  },
  actions: {
    async addressInfo({commit}) {
      let result = await getAddressInfo()
      if (result.code === 200) {
        commit('ADDRESS', result.data)
      }
    },
    async orderInfo({commit}) {
      let result = await getOrderInfo()
      if (result.code === 200) {
        commit('ORDER_INFO', result.data)
      }
    }
  },
  mutations: {
    ADDRESS(state, addressList) {
      state.addressList = addressList
    },
    ORDER_INFO(state, orderInfo) {
      state.orderInfo = orderInfo

    }
  },
  getters: {}
}
