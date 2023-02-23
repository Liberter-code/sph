import Detail from '@/views/Detail/index.vue'
import Home from '@/views/Home/index.vue'
import Search from '@/views/Search/index.vue'
import Login from '@/views/Login/index.vue'
import Register from '@/views/Register/index.vue'
import AddCartSuccess from '@/views/AddCartSuccess/index.vue'
import ShopCart from '@/views/ShopCart/index.vue'

export default [
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
    component: Home,
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
