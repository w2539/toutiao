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
        @search="onSearch"
        @cancel="$router.back()"
      >
      </van-search>
    </form>
    <!-- 搜索结果 -->
    <SearchResult :q="value" v-if="isResultShow"></SearchResult>

    <!-- 搜索联想模块 -->
    <SearchAssociate v-else-if="value" :value="value"></SearchAssociate>

    <!-- 搜索历史 -->
    <SearchHistory v-else></SearchHistory>
  </div>
</template>
<script>
import SearchAssociate from './components/search-associate.vue'
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
export default {
  name: 'search',
  data () {
    return {
      value: '',
      isResultShow: false
    }
  },
  created () {},
  computed: {},
  components: { SearchAssociate, SearchHistory, SearchResult },
  methods: {
    onSearch (val) {
      this.isResultShow = true
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
