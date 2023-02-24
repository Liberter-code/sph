import {getUserInfo, getVerifyCode, userLogin, userLogout, userRegister} from '@/api'
import {getToken, removeToken, setToken} from '@/utils/token'

export default {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: {}
  },
  actions: {
    async getVerifyCode({ commit }, phone) {
      let result = await getVerifyCode(phone)
      if (result.code === 200)
        return result.data
      return Promise.reject()
    },
    async register({ commit }, data) {
      let result = await userRegister(data)
      if (result.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(result.message)
      }
    },
    async login({ commit }, data) {
      let result = await userLogin(data)
      if (result.code === 200) {
        commit('TOKEN', result.data.token)
        return 'ok'
      } else {
        return Promise.reject(result.message)
      }
    },
    async userInfo({ commit }) {
      let result = await getUserInfo()
      if (result.code === 200) {
        commit('USER_INFO', result.data)
        return 'ok'
      }else {
        return Promise.reject(new Error('fail'))
      }
    },
    async userLogout({ commit }) {
      let result = await userLogout()
      if (result.code === 200) {
        commit('CLEAR')
        return 'ok'
      } else {
        return Promise.reject(result.message)
      }
    }
  },
  mutations: {
    TOKEN(state, token) {
      setToken(token)
      state.token = token
    },
    USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    CLEAR(state) {
      state.token = ''
      state.userInfo = {}
      removeToken()
    }
  },
  getters: {}
}
