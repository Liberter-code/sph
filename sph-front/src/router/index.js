// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

// 使用插件
Vue.use(VueRouter)

// 保存原函数
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      (res) => {},
      (error) => {}
    )
  }
}


VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(
      this,
      location,
      (res) => {},
      (error) => {}
    )
  }
}

export default new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 }
  }
})
