<template>
  <div class="layout">
    <router-view></router-view>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o" to="/qa">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: 0
    }
  },
  created () {},
  computed: {},
  components: {},
  methods: {
    onChange (event) {
      // event.detail 的值为当前选中项的索引
      this.setData({ active: event.detail })
    }
  }
}
</script>
<style lang="less" scoped></style>
