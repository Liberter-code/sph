import {getCartList, deleteGoodFromCart, updateCheckCart} from '@/api'

export default {
  namespaced: true,
  state: {
    cartList: [],
  },
  actions: {
    async getCartList({ commit }) {
      let result = await getCartList()
      if (result.code === 200) {
        commit('CART_LIST', result.data)
      }
    },
    async deleteGood({ commit }, skuId) {
      let result = await deleteGoodFromCart(skuId)
      if (result.code === 200) {
        return 'ok'
      } else {
        return Promise.reject()
      }
    },
    async updateCheckCart({ commit }, { skuId, isChecked }) {
      let result = await updateCheckCart(skuId, isChecked)
      if (result.code === 200) {
        return 'ok'
      } else {
        return Promise.reject()
      }
    },
    deleteChecked({dispatch,getters}){
      const promises = []
      getters.cartList.forEach(item=>{
        let promise = item.isChecked == 1 ? dispatch('deleteGood', item.skuId) : ''
        promises.push(promise)
      })
      return Promise.all(promises)
    }
  },
  mutations: {
    CART_LIST(state, cartList) {
      state.cartList = cartList
    }
  },
  getters: {
    cartList(state) {
      return state.cartList[0]?.cartInfoList || []
    }
  }
}
