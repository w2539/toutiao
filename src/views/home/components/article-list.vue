<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      :success-text="refreshSuccessText"
      :success-duration="1500"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <Article
          v-for="article in article"
          :key="article.id"
          :article="article"
        >
        </Article>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { getArticles } from '../../../api/list'
import Article from '../../../components/library/Article.vue'

export default {
  name: 'ArticleList',
  data () {
    return {
      loading: false,
      // 控制加载结束的状态，当加载结束，不再触发加载更多
      finished: false,
      article: [],
      timestamp: null, // 获取下一页数据的时间戳
      isRefreshLoading: false, // 下拉刷新的 loading 状态
      refreshSuccessText: '' // 下拉刷新成功的提示文本
    }
  },
  props: {
    listName: {
      type: Object,
      require: true
    }
  },
  created () {},
  computed: {},

  methods: {
    async onLoad () {
      console.log('onLoad')
      // 1. 请求获取数据
      const { data } = await getArticles({
        channel_id: this.listName.id, // 频道 ID
        timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳，timestamp 相当于页码，请求最新数据使用当前最新时间戳，下一页数据使用上一次返回的数据中的时间戳
        with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
      })

      // 2. 把数据放到 list 数组中
      const { results } = data.data
      this.article.push(...results)

      // 3. 设置本次加载状态结束，它才可以判断是否需要加载下一次，否则就会永远的停在这里
      this.loading = false

      // 4. 数据全部加载完成
      if (results.length) {
        // 更新获取下一页数据的页码
        this.timestamp = data.data.pre_timestamp
      } else {
        // 没有数据了，把加载状态设置结束，不再触发加载更多
        this.finished = true
      }
    },
    async onRefresh () {
      // 1. 请求获取数据
      const { data } = await getArticles({
        channel_id: this.listName.id, // 频道 ID
        timestamp: this.timestamp || Date.now(),
        with_top: 0
      })

      // 2. 把数据放到 list 数组中
      const { results } = data.data
      this.article.unshift(...results)

      this.isRefreshLoading = false

      this.refreshSuccessText = `更新了${results.length}条数据`
    }
  },
  // 注册组件
  components: {
    Article
  }
}
</script>
<style lang="less" scoped>
.article-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 110px;
  bottom: 50px;
  overflow-y: auto;
}
</style>
