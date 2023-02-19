// 对axios进行封装
import axios from 'axios'
import nProgress from 'nprogress'

const instance = axios.create({
  baseURL: '/mock',
  timeout: 5000,
})

instance.interceptors.request.use((config) => {
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
