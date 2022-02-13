<template>
  <div class="layout">
    <router-view />
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="search">问答</van-tabbar-item>
      <van-tabbar-item icon="friends-o">视频</van-tabbar-item>
      <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
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
