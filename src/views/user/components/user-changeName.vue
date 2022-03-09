<template>
  <div class="user-changeName">
    <!-- 标题 -->
    <van-cell class="changeName-title" title="修改姓名"></van-cell>

    <!-- 输入框 -->
    <van-cell-group class="changeName-input">
      <!-- input-align 文本横向的对其方式 -->
      <van-field
        v-model.trim="changeName"
        placeholder="请输入用户名"
        input-align="center"
        maxlength="7"
        label-align="center"
      />
    </van-cell-group>

    <!-- 底部按钮 -->
    <div class="changeName-button">
      <van-button
        @click="$emit('confirm', changeName)"
        class="buttonOne"
        type="default"
        >确认</van-button
      >
      <van-button
        @click="$emit('cancelConfirm')"
        class="buttonTwo"
        type="default"
        >取消</van-button
      >
    </div>
  </div>
</template>
<script>
export default {
  props: {
    userName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      changeName: this.userName
    }
  },
  created () {},
  computed: {},
  components: {},
  methods: {}
}
</script>
<style lang="less" scoped>
.user-changeName {
  width: 300px;
  height: 120px;
  background-color: #fff;
  .changeName-title {
    text-align: center;
    margin-top: 10px;
  }
  .changeName-input {
    margin-left: 17%;
    width: 200px;
  }
  .changeName-button {
    width: 300px;
    height: 28px;
    display: flex;
    .buttonOne {
      width: 150px;
      height: 100%;
    }
    .buttonTwo {
      flex: 1;
      height: 100%;
    }
  }
}
</style>
