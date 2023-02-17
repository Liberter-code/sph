// 对axios进行封装
import axios from 'axios'

const instance = axios.create({
  baseURL: '/api',
  timeout: 5000,
})

instance.interceptors.request.use((config) => {
  return config
})

instance.interceptors.response.use(
	(res) => {
		return res.data
	},
	(err) => {
		return Promise.reject(err.message)
	}
)
export default instance
