<template>
  <div class="comment-reply">
    <van-nav-bar :title="`${replayComment.reply_count}条回复`">
      <van-icon @click="$emit('crossClick')" name="cross" slot="left" />
    </van-nav-bar>
    <ToutiaoComment :comment="replayComment"></ToutiaoComment>

    <!-- 评论回复列表 -->
    <CommentList
      type="c"
      :source="replayComment.com_id"
      :list="replayList"
    ></CommentList>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        round
        type="default"
        class="button-bottom"
        @click="isCommentPost = true"
      >
        点击评论
      </van-button>

      <!-- 发布评论 -->
      <van-popup v-model="isCommentPost" position="bottom">
        <CommentPost
          @addComment="addComment"
          :articleId="this.$route.params.articleId"
          :target="replayComment.com_id"
        ></CommentPost>
      </van-popup>
    </div>
  </div>
</template>
<script>
import ToutiaoComment from '../../../components/library/toutiao-comment.vue'
import CommentPost from './comment-post.vue'
import CommentList from './comment-list.vue'
export default {
  data () {
    return {
      isCommentPost: false,
      replayList: []
    }
  },
  props: {
    replayComment: {
      type: Object,
      default: () => {}
    },
    autId: {
      type: Object,
      default: () => {}
    }
  },
  created () {},
  computed: {},
  components: { ToutiaoComment, CommentList, CommentPost },
  methods: {
    addComment (commentPost) {
      const data = commentPost.data.new_obj
      // 将发布的评论插入历史评论中
      this.replayList.unshift(data)
      this.replayComment.reply_count++
      this.isCommentPost = false
    }
  }
}
</script>
<style lang="less" scoped>
.comment-reply {
  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    margin-top: 20px;
    .button-bottom {
      height: 35px;
      width: 200px;
    }
  }
  /deep/.van-icon {
    color: black;
    font-size: 18px;
  }
}
</style>
