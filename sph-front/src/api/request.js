// 对axios进行封装
import axios from 'axios'
import nProgress from 'nprogress'
import store from '@/store'

const instance = axios.create({
  baseURL: '/api',
  timeout: 5000,
})

instance.interceptors.request.use((config) => {
  if(store.state.detail.uuid_token){
    config.headers.userTempId = store.state.detail.uuid_token
  }
  if(store.state.user.token){
    config.headers.token = store.state.user.token
  }
  nProgress.start()
  return config
})

instance.interceptors.response.use(
  (res) => {
    nProgress.done()
    return res.data
  },
  (err) => {
    nProgress.done()
    return Promise.reject(err.message)
  }
)
export default instance
