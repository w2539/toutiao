<template>
  <div class="search">
    <!-- 搜索模块 -->
    <!-- 在 van-search外部加上form 即可在手机键盘上看见搜索按钮 -->
    <!-- search 事件在点击键盘上的搜索/回车按钮后触发 -->
    <!-- cancel 事件在点击搜索框右侧取消按钮时触发。 -->
    <form action="/">
      <van-search
        class="search-input"
        v-model="value"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch(value)"
        @cancel="$router.back()"
      >
      </van-search>
    </form>
    <!-- 搜索结果 -->
    <SearchResult
      :value="value"
      v-if="isResultShow && value !== ''"
    ></SearchResult>

    <!-- 搜索联想模块 -->
    <SearchAssociate
      v-else-if="value"
      :value="value"
      @associate="onSearch"
    ></SearchAssociate>

    <!-- 搜索历史 -->
    <SearchHistory
      v-if="value === ''"
      :searchHistories="searchHistories"
      @search-history="searchHistories = []"
      @search-historys="onSearch"
    ></SearchHistory>
  </div>
</template>
<script>
import SearchAssociate from './components/search-associate.vue'
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import { setItem, getItem } from '../../utils/storage'
export default {
  name: 'search',
  data () {
    return {
      value: '',
      isResultShow: false,
      searchHistories: getItem('serach-histories') || []
    }
  },
  created () {},
  computed: {},
  components: { SearchAssociate, SearchHistory, SearchResult },
  methods: {
    onSearch (val) {
      this.value = val

      // 存储搜索历史记录
      // 要求：不要有重复历史记录、最新的排在最前面
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)

      // 渲染搜索结果
      this.isResultShow = true
    }
  },
  watch: {
    searchHistories (val) {
      // 同步到本地存储
      setItem('serach-histories', val)
    }
  }
}
</script>
<style lang="less" scoped>
.search {
  .van-search__action {
    color: #fff;
  }
}
</style>
