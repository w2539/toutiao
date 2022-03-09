<template>
  <div>
    <img :src="image" alt="" />
    <van-nav-bar
      left-text="返回"
      right-text="保存"
      @click-left="$emit('close')"
      @click-right="onClickRight"
    />
  </div>
</template>
<script>
export default {
  props: {
    image: {
      type: String,
      require: true
    }
  },
  data () {
    return {}
  },
  created () {},
  computed: {},
  components: {},
  methods: {
    onClickRight () {}
  }
}
</script>
<style lang="less" scoped>
/deep/.van-nav-bar {
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: black !important;
  .van-nav-bar__content {
    background-color: black !important;
  }
}
</style>
