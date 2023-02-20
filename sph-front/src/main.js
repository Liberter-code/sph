import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './mock/mockServe'
import 'nprogress/nprogress.css'
import 'swiper/css/swiper.css'

import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app')
