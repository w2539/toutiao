import request from '@/utils/request'

// 登录的 API 接口
export const loginAPI = (data) => {
  return request('/v1_0/authorizations', 'post', data)
}

// 登录的 API 接口
export const verificationCode = (mobile) => {
  return request(`/v1_0/sms/codes/${mobile}`, 'get', mobile)
}
