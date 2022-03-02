import request from '../utils/request.js'

/**
 *  获取文章详情
 * @param {*用户的Id} articleId
 * @returns
 */
export const getArticlesParticulars = (articleId) => {
  return request({
    methods: 'GET',
    url: `/v1_0/articles/${articleId}`
  })
}

/**
 * 添加关注
 */
export const addFollow = userId => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

/**
 * 取消关注
 */
export const deleteFollow = userId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${userId}`
  })
}
/**
 * 收藏文章
 * @param 文章Id  [String,Number] target
 * @returns
 */
export const collectionArticles = (userId) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target: userId
    }
  })
}

/**
 * 取消收藏文章
 * @param {*文章Id} target
 * @returns
 */
export const cancelCollectionArticles = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}

/**
 *  对文章点赞
 * @param {*文章Id} target
 * @returns
 */
export const giveLike = (userId) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target: userId
    }
  })
}

/**
 * 取消文章点赞
 * @param {*文章Id} target
 * @returns
 */
export const cancelGiveLike = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${target}`
  })
}
