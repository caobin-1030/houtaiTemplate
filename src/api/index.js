import request from '../utils/request'

// 获取用户列表
export function getUserList () {
  return request({
    method: 'get',
    url: 'http://api.yuhaocloud.club/api/getuserinfo'
  })
}
