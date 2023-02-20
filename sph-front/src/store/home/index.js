import api from '@/api'
const { getCategoryList,getBannerList,getFloorList } = api
// console.log(api)
export default {
  namespaced: true,
  state: {
    categoryList: [],
    bannerList: [] || undefined,
    floorList: []
  },
  actions: {
    async categoryList({ commit }) {
      let result = await getCategoryList()
      if (result.code === 200) {
        commit('CATEGORY_LIST', result.data)
      }
    },
    async bannerList({ commit }) {
      let result = await getBannerList()
      if (result.code === 200) {
        commit('BANNER_LIST', result.data)
      }
    },
    async floorList({ commit }) {
      let result = await getFloorList()
      if (result.code === 200) {
        commit('FLOOR_LIST', result.data)
      }
    },
  },
  mutations: {
    CATEGORY_LIST(state, categoryList) {
      state.categoryList = categoryList
    },
    BANNER_LIST(state, bannerList) {
      state.bannerList = bannerList
    },
    FLOOR_LIST (state, floorList) {
      state.floorList = floorList
    }
  },
  getters: {},
}
