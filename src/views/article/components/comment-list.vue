<template>
  <div class="commentList">
    <van-cell-group>
      <van-cell title="全部评论" v-if="list.length" />
    </van-cell-group>

    <van-list
      v-model="articleComment.loading"
      :finished="articleComment.finished"
      :finished-text="list.length ? '评论加载完毕' : ''"
      @load="onLoad"
    >
      <!-- <van-cell
        v-for="item in articleComment.list"
        :key="item.id"
        :title="item.aut_name"
      /> -->
      <ToutiaoComment
        v-for="items in list"
        :key="items.id"
        :comment="items"
        @replyClick="$emit('replyClick', $event)"
      ></ToutiaoComment>
    </van-list>
  </div>
</template>
<script>
import { getComment } from '../../../api/comment.js'
import ToutiaoComment from '../../../components/library/toutiao-comment.vue'
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'a'
    },
    source: {
      type: [String, Array, Object],
      require: true
    }
  },
  data () {
    return {
      articleComment: {
        // 文章评论相关数据
        loading: false,
        finished: false,
        offset: null, // 请求下一页数据的页码
        totalCount: 0 // 总数据条数
      }
    }
  },
  created () {},
  computed: {},
  components: { ToutiaoComment },
  methods: {
    async onLoad () {
      // 1.通过接口获取数据
      const { data } = await getComment({
        type: this.type, // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        source: this.source, // 源id，文章id或评论id
        offset: this.articleComment.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        limit: 10 // 每页大小
      })
      // console.log(data)
      // 2.将数据导出进list
      // 2. 将数据添加到列表中
      const { results } = data.data
      this.list.push(...results)
      this.$emit('update-totalCount', data.data.total_count)
      // 更新总数据条数
      this.articleComment.totalCount = data.data.total_count
      // 3.将加载状态设置为false
      this.articleComment.loading = false
      // 4.判断数据是否全部加载完成
      if (results.length) {
        this.articleComment.offset = data.data.last_id // 更新获取下一页数据的页码
      } else {
        this.articleComment.finished = true
      }
    }
  }
}
</script>
<style lang="less" scoped>
.commentList {
  margin-bottom: 40px;
}
</style>
