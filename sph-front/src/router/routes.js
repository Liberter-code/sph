import Detail from '@/views/Detail/index.vue'
// import Home from '@/views/Home/index.vue'
import Search from '@/views/Search/index.vue'
import Login from '@/views/Login/index.vue'
import Register from '@/views/Register/index.vue'
import AddCartSuccess from '@/views/AddCartSuccess/index.vue'
import ShopCart from '@/views/ShopCart/index.vue'
import Trade from '@/views/Trade/index.vue'
import Pay from '@/views/Pay/index.vue'
import PaySuccess from '@/views/PaySuccess/index.vue'
import Center from '@/views/Center/index.vue'
import MyOrder from '@/views/Center/MyOrder/index.vue'
import GroupOrder from '@/views/Center/GroupOrder/index.vue'

export default [
  {
    path: '/center',
    component: Center,
    children: [
      {
        path: 'myOrder',
        component: MyOrder
      },
      {
        path: 'groupOrder',
        component: GroupOrder
      },
      {
        path: '/center',
        redirect: '/center/myOrder'
      }
    ]
  },
  {
    path: '/paySuccess',
    component: PaySuccess,
    beforeEnter: (to, from, next) => {
      if (from.path === '/pay') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/pay',
    component: Pay,
    beforeEnter: (to, from, next) => {
      if (from.path === '/trade') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/trade',
    component: Trade,
    beforeEnter: (to, from, next) => {
      if (from.path === '/cart') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: ShopCart
  },
  {
    path: '/add-cart-success',
    name: 'addCartSuccess',
    component: AddCartSuccess
  },
  {
    path: '/detail/:skuId',
    component: Detail,
  },
  {
    path: '/home',
    component: () => import('@/views/Home'),
    meta: {
      hasFooter: true,
    },
  },
  {
    name: 'search',
    path: '/search/:keyword?',
    component: Search,
    meta: {
      hasFooter: true,
    },
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/',
    redirect: '/home',
  },
]
