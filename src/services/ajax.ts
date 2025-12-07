import axios from 'axios'
import { message } from 'antd'
import { getToken } from '../utils/user-token'

const instance = axios.create({
  //创建了一个 axios 实例 instance，它可以像 axios 一样使用
  timeout: 10 * 1000,
})

// request 拦截：每次请求都带上 token,axios 先经过请求拦截器，在 headers 里自动加上 Authorization 头,
// 这样服务器就能识别这个用户的身份，不需要在每个 API 调用里手动加 token
instance.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${getToken()}` // JWT 的固定格式
    return config
  },
  error => Promise.reject(error)
)

//response 拦截：统一处理 errno 和 msg, 只返回 data 部分，不返回 errno 和 msg。
//简化 API 代码，让 getQuestionService 直接拿到 data，不用手动解析 response.data
instance.interceptors.response.use(res => {
  const resData = (res.data || {}) as ResType
  const { errno, data, msg } = resData

  if (errno !== 0) {
    // 错误提示
    if (msg) {
      message.error(msg)
    }

    throw new Error(msg)
  }

  return data as any
})

export default instance

export type ResType = {
  errno: number
  data?: ResDataType
  msg?: string
}

export type ResDataType = {
  [key: string]: any
}
