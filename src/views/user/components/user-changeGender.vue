<template>
  <div class="user-changeGender">
    <van-picker
      title="修改性别"
      show-toolbar
      :default-index="userGenderIndex"
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
    />
  </div>
</template>
<script>
import { changeUserInfo } from '../../../api/user'
import { Toast } from 'vant'
export default {
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      userGenderIndex: this.value
    }
  },
  methods: {
    async onConfirm (value, index) {
      // 当前值 value
      // 索引值 index
      // 发送接口
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        await changeUserInfo({ gender: index })
        this.$emit('close')
        this.$emit('onConfirm', index)
        this.$toast.success('修改性别成功')
      } catch (err) {
        this.$toast.fail(err.response.data.message)
      }
    }
  }
}
</script>
<style lang="less" scoped></style>
