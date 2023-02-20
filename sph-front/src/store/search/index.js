import api from '@/api/index'

const { getSearchResult } = api
export default {
  namespaced: true,
  state: {
    searchList: {}
  },
  actions: {
    async searchList({ commit }, data) {
      let result = await getSearchResult(data)
      if (result.code === 200) {
        commit('SEARCH_LIST', result.data)
      }
    }
  },
  mutations: {
    SEARCH_LIST(state,searchList){
      state.searchList = searchList
    }
  },
  getters: {
    attrsList(state){
      return state.searchList.attrsList || []
    },
    goodsList(state){
      return state.searchList.goodsList || []
    },
    trademarkList(state){
      return state.searchList.trademarkList || []
    }
  }
}
