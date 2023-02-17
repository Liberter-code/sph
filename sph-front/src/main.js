import Vue from 'vue'
import App from './App.vue'
import router from './router'

import TypeNav from '@/components/TypeNav'
import api from '@/api'
Vue.component(TypeNav.name, TypeNav)


Vue.config.productionTip = false
api.categoryList()
new Vue({
  render: (h) => h(App),
  router,
}).$mount('#app')
