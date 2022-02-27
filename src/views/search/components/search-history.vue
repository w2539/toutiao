<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isHistory">
        <span @click="$emit('search-history', [])">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isHistory = false">完成</span>
      </div>
      <van-icon v-if="!isHistory" name="delete-o" @click="isHistory = true" />
    </van-cell>
    <van-cell
      v-for="(items, index) in searchHistories"
      :key="index"
      :title="items"
      @click="closeHistory(items, index)"
    >
      <van-icon v-if="isHistory" name="close" />
    </van-cell>
  </div>
</template>
<script>
export default {
  name: 'search-history',
  props: {
    searchHistories: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      isHistory: false
    }
  },
  created () {},
  computed: {},
  components: {},
  methods: {
    closeHistory (items, index) {
      if (this.isHistory) {
        // 删除状态
        return this.searchHistories.splice(index, 1)
      }
      // 否则执行搜索操作
      this.$emit('associate', items)
    }
  }
}
</script>
<style lang="less" scoped>
.search-history {
}
</style>
