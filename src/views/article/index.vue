<template>
  <div class="article">
    <!-- 顶部 -->
    <van-nav-bar class="article-top" title="文章详情" left-arrow> </van-nav-bar>
    <van-cell>
      <div slot="title" class="article-title">
        <h1>iOS原生混合RN开发最佳实践</h1>
      </div>
    </van-cell>

    <!-- 个人信息 -->
    <van-cell>
      <!-- 用户头像 -->
      <div slot="icon">
        <van-image
          width="75"
          height="75"
          round
          fit="cover"
          :src="articlesParticulars.aut_photo"
        />
      </div>
      <!-- 用户名称 -->
      <div slot="title" class="user">
        <span class="userName">{{ articlesParticulars.aut_name }}</span>
      </div>

      <!-- 文章发布时间 -->
      <div slot="label" class="userTime">
        <span>{{ articlesParticulars.pubdate | relativeTime }}</span>
      </div>

      <!-- 关注按钮 -->
      <div slot="default" class="button-info">
        <van-button
          :disabled="isFollowLoading"
          :type="articlesParticulars.is_followed ? 'default' : 'info'"
          round
          @click="attentionUser"
          >{{
            articlesParticulars.is_followed ? '已关注' : '+ 关注'
          }}</van-button
        >
      </div>
    </van-cell>

    <!-- 文章正文 -->
    <div
      class="markdown-body"
      ref="articleCount"
      v-html="articlesParticulars.content"
    ></div>
    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button round type="default" class="button-bottom"
        >点击评论</van-button
      >
      <van-icon name="comment-o" info="123" color="#777" />
      <!-- 收藏按钮 -->
      <van-icon
        @click="collectionArticles"
        :color="articlesParticulars.is_collected ? 'red' : '#777'"
        :name="articlesParticulars.is_collected ? 'star' : 'star-o'"
      />
      <!-- 点赞按钮 -->
      <van-icon
        @click="giveLike"
        :color="articlesParticulars.attitude === 1 ? 'red' : '#777'"
        :name="articlesParticulars.attitude === 1 ? 'good-job' : 'good-job-o'"
      />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
  </div>
</template>
<script>
import '../../assets/style/markdown.css'
import { ImagePreview } from 'vant'

import {
  getArticlesParticulars,
  addFollow,
  deleteFollow,
  giveLike,
  cancelGiveLike,
  collectionArticles,
  cancelCollectionArticles
} from '../../api/article.js'

export default {
  data () {
    return {
      articlesParticulars: [],
      isFollowLoading: false
    }
  },
  created () {
    this.isArticlesParticulars()
  },
  computed: {},
  components: {},
  methods: {
    // 获取文章详情
    async isArticlesParticulars () {
      const { data } = await getArticlesParticulars(
        this.$route.params.articleId
      )
      this.articlesParticulars = data.data

      this.$nextTick(() => {
        this.handlePerviewImage()
      })
    },
    // 获取ref里面的所有图片 并绑定点击事件
    handlePerviewImage () {
      // 获取文章内容 DOM 容器
      const articleCount = this.$refs.articleCount
      // 得到所有img 标签

      const images = articleCount.querySelectorAll('img')

      const imgPaths = []
      // 循环出文章的所有图片
      images.forEach((img, index) => {
        imgPaths.push(img.src)
        // 添加点击事件
        img.onclick = function () {
          ImagePreview({
            images: imgPaths,
            startPosition: index
          })
        }
      })
    },

    // 点击关注 && 点击取消关注
    async attentionUser () {
      // 开启按钮的 loading 状态
      this.isFollowLoading = true
      try {
        // 如果已关注，则取消关注
        const authorId = this.articlesParticulars.aut_id
        if (this.articlesParticulars.is_followed) {
          const { data } = await deleteFollow(authorId)
          if (data.message === 'OK') {
            // 提示用户成功
            this.$toast.success('取关成功！')
          }
        } else {
          // 否则添加关注
          const { data } = await addFollow(authorId)
          if (data.message === 'OK') {
            // 提示用户成功
            this.$toast.success('取关成功！')
          }
        }

        // 更新视图
        this.articlesParticulars.is_followed =
          !this.articlesParticulars.is_followed
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }

      // 关闭按钮的 loading 状态
      this.isFollowLoading = false
    },
    // 点赞取 && 消点赞
    async giveLike () {
      // 两个作用：1、交互提示 2、防止网络慢用户连续不断的点击按钮请求
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        if (this.articlesParticulars.attitude === 1) {
          // 点赞 取消点赞
          const { data } = await cancelGiveLike(this.$route.params.articleId)
          if (data.message === 'OK') {
            // 提示用户成功
            this.$toast.success('取关成功！')
            this.articlesParticulars.attitude = -1
          }
        } else {
          // 点赞 取消点赞
          const { data } = await giveLike(this.$route.params.articleId)
          if (data.message === 'OK') {
            // 提示用户成功
            this.$toast.success('取关成功！')
            this.articlesParticulars.attitude = 1
          }
        }
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    },
    // 收藏 && 取消收藏
    async collectionArticles () {
      try {
        if (this.articlesParticulars.is_collected) {
          // 收藏 取消收藏
          await cancelCollectionArticles(this.$route.params.articleId).then(
            () => {
              // 提示用户成功
              this.$toast.success('取消收藏！')
            }
          )
        } else {
          const { data } = await collectionArticles(
            this.$route.params.articleId
          )
          if (data.message === 'OK') {
            // 提示用户成功
            this.$toast.success('收藏成功！')
          }
        }
        this.articlesParticulars.is_collected =
          !this.articlesParticulars.is_collected
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.article {
  .article-bottom {
    position: fixed;
    bottom: 0px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 0.2px solid #fff;
    width: 100%;
    height: 45px;
    background-color: #fff;
    .button-bottom {
      height: 35px;
      width: 100px;
    }
  }
  .markdown-body {
    padding: 14px;
  }
  /deep/.van-cell__title {
    .user {
      margin-top: 5px;
      margin-left: 15px;
      // background-color: #3296fa;
      width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
      -webkit-text-overflow: ellipsis;
      -moz-text-overflow: ellipsis;
      white-space: nowrap;
      .userName {
        font-size: 22px;
      }
    }
  }
  /deep/.van-cell__label {
    line-height: 0px;
    .userTime {
      margin-top: 5px;
      margin-left: 16px;
      flex-wrap: wrap;
    }
  }
  .button-info {
    // margin-top: 10px;
  }

  .article-title {
    font-size: 12px;
    font-weight: 700;
  }
  &-top {
    background-color: #3296fa;
    /deep/.van-icon {
      font-size: 16px;
      color: #fff;
    }
    /deep/.van-nav-bar__title {
      font-size: 18px;
      color: #fff;
    }
  }
}
</style>
