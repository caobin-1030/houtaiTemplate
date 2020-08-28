import axios from 'axios'
import storage from './localStorage'
import { Message } from 'element-ui'
import router from '../router'

const localStorageToken = 'token'

// 请求头配置
function getHeaders () {
  return storage.getLocalStorage(localStorageToken)
}

// 请求前的config配置
const config = {
  // 请求超时时间
  timeout: 30 * 1000,
  // 默认请求地址前缀，最后的常量是开发时的本地接口地址，前面的是环境变量的地址
  baseURL: process.env.NODE_ENV === 'production' && process.env.VUE_APP_FLAG === 'pro' ? process.env.VUE_APP_BASE_API : 'http://api.yuhaocloud.club'
}

const request = axios.create(config)

// 请求拦截
request.interceptors.request.use(
  config => {
    // 每次请求的请求头携带token
    config.headers.Authorization = getHeaders()
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 报错码，统一用code
// 400：权限问题

export function getRes (res) {
  // 除了 code === 0 的情况下都是未请求成功
  if ((res && (res.code === 0)) || res.status === 0) {
    return Promise.resolve(res)
  }
  const err = Promise.reject(res)
  // code === 400 默认token失效等，报400的时候会跳登陆页面，其它不会，其它仅仅只是报错
  if (res.code === 400 || res.code === '400') {
    Message.error('登录失效，请重新登录')
    storage.loginOut(localStorageToken)
    router.push('/login')
    return err
  }
  // 除了 code === 0 请求成功和 code === 400 登录失效需要清除localStorage，其它报错都走以下
  Message.error(res.msg)
  return err
}

// 响应拦截
request.interceptors.response.use(
  response => {
    const { data: res } = response
    if (res instanceof Blob) {
      return res
    }
    if (res instanceof ArrayBuffer) {
      return res
    }
    return getRes(res)
  },
  error => {
    Message.error('服务器错误')
    return Promise.reject(error)
  }
)

export default request
