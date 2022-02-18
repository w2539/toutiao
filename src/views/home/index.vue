<template>
  <div class="home">
    <div class="home-container">
      <!-- 导航栏开始 -->
      <van-nav-bar class="app-nav-bar">
        <van-button
          slot="title"
          class="search-btn"
          icon="search"
          type="info"
          round
          size="small"
          >搜索</van-button
        >
      </van-nav-bar>
      <!-- /导航栏结束 -->

      <van-tabs v-model="active">
        <van-tab
          v-for="item in list.channels"
          :key="item.id"
          :title="item.name"
        >
          <ArticleList :listName="item"></ArticleList>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import { getUserChannels } from '../../api/list'
import ArticleList from './components/article-list.vue'
export default {
  data () {
    return {
      active: 0,
      list: {}
    }
  },
  created () {
    this.gainList()
  },
  computed: {},
  components: { ArticleList },
  methods: {
    async gainList () {
      const { data } = await getUserChannels()
      this.list = data.data
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  /deep/.app-nav-bar {
    height: 60px;
    background-color: #3296fa;
    display: flex;
    justify-content: center;
    align-items: center;
    .van-nav-bar__title {
      max-width: unset;
    }
    .search-btn {
      width: 277px;
      height: 32px;
      background-color: #5babfb;
      .van-button__text {
        font-size: 16px;
      }
      .van-icon {
        font-size: 16px;
      }
    }
  }
}
</style>
