import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import home from './home'
import search from './search'
import detail from '@/store/detail'

export default new Vuex.Store({
  modules: { home, search,detail },
})
