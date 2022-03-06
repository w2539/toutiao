<template>
  <van-cell v-if="comment" class="comment">
    <van-image
      slot="icon"
      width="36"
      height="36"
      round
      fit="cover"
      :src="comment.aut_photo"
    />
    <div slot="title" class="comment-body">
      <div class="body-name">{{ comment.aut_name }}</div>
      <div class="body-details">{{ comment.content }}</div>
      <div class="body-bottom">
        <span class="body-bottom-time">{{ comment.pubdate }}</span>
        <van-button
          class="body-bottom-button"
          round
          size="mini"
          @click="$emit('replyClick', comment)"
        >
          {{ comment.reply_count }}回复
        </van-button>
      </div>
    </div>
    <div slot="right-icon" class="comment-icon">
      <van-icon
        @click="isLiking"
        :color="comment.is_liking ? 'red' : '#777'"
        :name="comment.is_liking ? 'good-job' : 'good-job-o'"
      />
      <span>{{ comment.like_count }}</span>
    </div>
  </van-cell>
</template>
<script>
import { getCommentIsLike, cancelCommentIsLike } from '../../api/comment.js'
export default {
  name: 'toutiao-comment',
  data () {
    return {
      like_count: 0
    }
  },
  props: {
    comment: {
      type: [Array, Object],
      require: true
    }
  },
  created () {},
  computed: {},
  components: {},
  methods: {
    async isLiking () {
      try {
        this.like_count = this.comment.like_count
        if (this.comment.is_liking) {
          // 已经点赞 点击取消
          await cancelCommentIsLike(this.comment.com_id.toString()).then(() => {
            // 提示用户成功
            this.$toast.success('取消成功！')
            this.comment.like_count -= 1
          })
        } else {
          // 还未点赞
          const { data } = await getCommentIsLike(
            this.comment.com_id.toString()
          )
          if (data.message === 'OK') {
            // 提示用户成功
            this.$toast.success('点赞成功！')
            this.comment.like_count += 1
          }
        }
        this.comment.is_liking = !this.comment.is_liking
      } catch (err) {
        this.$toast.fail(err.response.data.message)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.comment {

  &-icon {
    margin-right: 30px;
  }
  .comment-body {
    // background-color: #406599;
    width: 200px;
    margin-left: 15px;
    .body-name {
      color: #406599;
    }
    .body-details {
      width: 250px;
      font-size: 21px !important;
      margin-top: 5px;
      margin-bottom: 5px;
      word-wrap:break-word;
      // overflow: hidden;
      // text-overflow: ellipsis;
      // -o-text-overflow: ellipsis;
      // -webkit-text-overflow: ellipsis;
      // -moz-text-overflow: ellipsis;
      // white-space: nowrap;
    }
    .body-bottom {
      display: flex;
      align-items: center;
      &-button {
        width: 50px;
        margin-left: 18px;
      }
    }
  }
}
</style>
