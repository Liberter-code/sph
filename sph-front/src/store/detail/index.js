import api from '@/api'

const { getGoodInfo } = api
export default {
  namespaced: true,
  state: {
    goodInfo: {}
  },
  actions: {
    async getGoodInfo({ commit }, skuId) {
      let result = await getGoodInfo(skuId)
      if (result.code === 200) {
        commit('GOOD_INFO', result.data)
      }
    }
  },
  mutations: {
    GOOD_INFO(state, goodInfo) {
      state.goodInfo = goodInfo
    }
  },
  getters: {
    categoryView(state) {
      return state.goodInfo.categoryView || {}
    },
    skuInfo(state) {
      return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
      return state.goodInfo.spuSaleAttrList || []
    }
  }
}
