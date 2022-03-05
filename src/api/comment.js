import request from '../utils/request.js'

/**
 *  获取文章评论
 * @param {*获取文章评论需要的参数} params
 * @returns
 */
export const getComment = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })
}

/**
 *  文章评论 点赞或者取消点赞
 * @param {*评论用户的Id} userId
 * @returns
 */
export const getCommentIsLike = (userId) => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target: userId
    }
  })
}

/**
 *  文章评论 点赞或者取消点赞
 * @param {*评论用户的Id} userId
 * @returns
 */
export const cancelCommentIsLike = (userId) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${userId}`
  })
}

/**
 * 发布评论
 */
export const addComment = data => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
