import { getGoodInfo,updateShopCart } from '@/api'
import {getUUID} from '@/utils/token'


export default {
  namespaced: true,
  state: {
    goodInfo: {},
    uuid_token: getUUID()
  },
  actions: {
    async getGoodInfo({ commit }, skuId) {
      let result = await getGoodInfo(skuId)
      if (result.code === 200) {
        commit('GOOD_INFO', result.data)
      }
    },
    async updateCart({commit},{skuId,skuNum}){
      let result = await updateShopCart(skuId,skuNum)
      if(result.code === 200){
        return 'ok'
      }else {
        return Promise.reject()
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
