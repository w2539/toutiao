<template>
  <van-datetime-picker
    v-model="currentDate"
    type="date"
    title="修改生日"
    :min-date="minDate"
    @cancel="$emit('close')"
    @confirm="confirm"
    :max-date="maxDate"
  />
</template>
<script>
import { changeUserInfo } from '../../../api/user'
import { Toast } from 'vant'
export default {
  name: 'user-changeBirthday',
  props: {
    value: {
      type: String,
      default: '',
      require: true
    }
  },
  data () {
    return {
      minDate: new Date(1964, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  created () {},
  computed: {},
  components: {},
  methods: {
    async confirm () {
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      const currentDate = `${this.currentDate.getFullYear()}-${
        this.currentDate.getMonth() + 1
      }-${this.currentDate.getDate()}`
      const { data } = await changeUserInfo({ birthday: currentDate })
      if (data.message === 'OK') {
        this.$toast.success('修改成功！')
      }
      this.$emit('close')
      this.$emit('confirm', currentDate)
    }
  }
}
</script>
<style lang="less" scoped></style>
