<template>
  <van-list
    class="search-result"
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell v-for="item in result" :key="item.id" :title="item.title" />
  </van-list>
</template>
<script>
import { getSearchResult } from '../../../api/search'

export default {
  name: 'search-result',
  props: {
    value: {
      type: String,
      default: '',
      require: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      result: [],
      perPage: 20
    }
  },
  methods: {
    async onLoad () {
      // 接口获取数据
      const { data } = await getSearchResult({
        q: this.value,
        page: this.page,
        parPage: this.parPage
      })
      const { results } = data.data
      console.log()
      // 接受获取的接口数据
      this.result.push(...results)
      // loading 变为 false
      this.loading = false
      // 判断有无数据  没有数据变为true
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>
<style lang="less" scoped>
.search-result {
  position: fixed;
  left: 0;
  right: 0;
  top: 54px;
  bottom: 0;
  overflow-y: auto;
}
</style>
