// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
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

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 }
  }
})

router.beforeEach(async (to, from, next) => {

  const token = store.state.user.token
  const name = store.state.user.userInfo.name
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (name) {
        next()
      } else {
        try {
          await store.dispatch('user/userInfo')
          next()
        } catch (e) {
          await store.dispatch('user/userLogout')
          next('/login')
        }
      }
    }
  } else {
    const toPath = to.path
    if (toPath.indexOf('/trade') !== -1 || toPath.indexOf('/pay') !== -1 || toPath.indexOf('/center') !== -1) {
      next(`/login?redirect=${toPath}`)
    } else {
      next()
    }
  }
})

export default router
