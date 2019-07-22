import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://172.16.119.6:5007',
  timeout: 15000, // 请求超时时间
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  withCredentials: true // 跨域session
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非20000是抛错 可结合自己业务进行修改
  */
    const res = response.data
    if (res.code !== 200) {
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    return Promise.reject(error)
  }
)

export default service
