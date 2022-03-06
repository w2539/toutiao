<template>
  <div class="comment">
    <div class="comment-post">
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入评论"
        show-word-limit
      />
      <van-button
        @click="addComment"
        :disabled="!message"
        type="default"
        plain
        class="comment-post-button"
        >发布</van-button
      >
    </div>
  </div>
</template>
<script>
import { addComment } from '../../../api/comment'
export default {
  name: 'comment-post',
  props: {
    target: {
      type: [Number, String, Object],
      require: true
    },
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  data () {
    return {
      message: ''
    }
  },
  created () {},
  computed: {},
  components: {},
  methods: {
    async addComment () {
      const { data } = await addComment({
        target: this.target,
        content: this.message,
        art_id: this.articleId ? this.articleId.toString() : null
      })
      this.$emit('addComment', data)
      this.message = ''
      // 提示用户成功
      this.$toast.success('发布成功！')
    }
  }
}
</script>
<style lang="less" scoped>
.comment {
  height: 100px;
  .comment-post {
    height: 100%;
    display: flex;
    width: 100%;
    flex: 1;
    &-button {
      text-align: center;
      margin-bottom: 0px;
      height: 100%;
      background-color: #fff;
    }
  }
}
</style>
