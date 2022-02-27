<template>
  <div class="search-associate" v-if="value">
    <van-cell
      slot="title"
      icon="search"
      v-for="(items, index) in associate"
      :key="index"
    >
      <div slot="title" v-html="highlight(items, value)"></div>
    </van-cell>
  </div>
</template>
<script>
import { getSearchAssociate } from '../../../api/search.js'
import { debounce } from 'lodash'
export default {
  name: 'search-associate',
  props: {
    value: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      associate: []
    }
  },
  created () {},
  computed: {},
  components: {},
  methods: {
    highlight (items, value) {
      return items.replace(
        new RegExp(this.value, 'gi'),
        `<span style="color: red">${this.value}</span>`
      )
    }
  },
  watch: {
    value: {
      handler: debounce(async function () {
        // 请求数据
        const { data } = await getSearchAssociate(this.value)
        // 传给双向绑定的值
        this.associate = data.data.options
      }, 1000),
      immediate: true
    }
  }
}
</script>
<style lang="less" scoped>
.search-associate {
  /deep/.van-cell {
  }
}
</style>
