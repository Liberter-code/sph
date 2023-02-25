import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './mock/mockServe'
import 'nprogress/nprogress.css'
import 'swiper/css/swiper.css'
import * as API from '@/api'
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import {Button,MessageBox} from 'element-ui'

Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.component(Button.name, Button)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  router,
  store,
}).$mount('#app')
