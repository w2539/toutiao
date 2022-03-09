import request from '../utils/request'

export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}

export const changeUserInfo = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}

export const changeUserPhoto = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}
