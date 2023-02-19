import api from '@/api'
const { getCategoryList,getBannerList } = api
// console.log(api)
export default {
  namespaced: true,
  state: {
    categoryList: [],
    bannerList: [] || undefined
  },
  actions: {
    async categoryList({ commit }) {
      let result = await getCategoryList()
      if (result.code === 200) {
        commit('CATEGORY_LIST', result.data)
      }
    },
    async bannerList ({ commit }) {
      let result = await getBannerList()
      if (result.code === 200) {
        commit('BANNER_LIST', result.data)
      }
    }
  },
  mutations: {
    CATEGORY_LIST(state, categoryList) {
      state.categoryList = categoryList
    },
    BANNER_LIST (state, bannerList) {
      state.bannerList = bannerList
    }
  },
  getters: {},
}
