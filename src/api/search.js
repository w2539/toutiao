import request from '@/utils/request'

/**
 *  获取联想建议
 *  @param {String} q - 搜索内容
 */

export const getSearchAssociate = (q) => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 *  获取搜索结果
 *  @param {String} q - 搜索内容
 *  @param {Number} page - 页码值(从1开始)
 */

export const getSearchResult = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
