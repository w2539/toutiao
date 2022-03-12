<template>
  <div class="login-container">
    <van-nav-bar title="登陆" left-arrow />
    <van-form
      ref="loginFrom"
      :show-error="false"
      :show-error-message="false"
      validate-first
      @submit="submit"
      @failed="onFailed"
    >
      <van-field
        v-model="user.mobile"
        name="mobile"
        label="手机号"
        icon-prefix="toutiao"
        left-icon="shouji"
        clearable
        placeholder="手机号"
        :rules="pattern.mobile"
      />
      <van-field
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        v-model="user.code"
        type="number"
        name="code"
        label="验证码"
        clearable
        class="toutiao"
        placeholder="验证码"
        :rules="pattern.code"
      >
        <template #button>
          <van-count-down
            :time="1000 * 60"
            format=" ss 秒"
            v-if="isCountDownShow"
          />
          <van-button
            v-if="!isCountDownShow"
            size="small"
            type="primary"
            round
            :loading="isSendSmsLoading"
            @click.prevent="verificationCode"
            class="verificationCode"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="van-button-big">
        <van-button block type="info" @click="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { loginAPI, verificationCode } from '@/api/login.js'
import { Toast } from 'vant'

export default {
  data () {
    return {
      user: {
        // 手机号
        mobile: '',
        // 验证码
        code: ''
      },
      pattern: {
        // 手机号
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3|5|8|7|9]\d{9}$/, message: '账号格式错误' }
        ],
        // 验证码
        code: [
          { required: true, message: '请填写密码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false,
      isSendSmsLoading: false
    }
  },
  created () {},
  computed: {},
  components: {},
  methods: {
    async submit () {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        // 只有当表单数据校验通过之后，才会调用此 login 函数
        const { data } = await loginAPI(this.user)
        // 当数据请求成功之后，res.data 中存储的就是服务器响应回来的数据
        Toast.success('登陆成功')
        this.$store.commit('setUser', data.data)
        // 清除 layout 的 缓存 让他重新渲染
        this.$store.commit('removeCachePage', 'LayoutIndex')
        // this.$router.back()
        // 返回来源页
        // 跳转到返回页 或者跳转到首页
        const redirect = this.$route.query.redirect || '/'
        this.$router.push(redirect)
      } catch (err) {
        Toast.fail('账号或密码错误')
      }
    },
    onFailed (error) {
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message, // 提示消息
          position: 'top' // 防止手机键盘太高看不见提示消息
        })
      }
    },
    async verificationCode () {
      try {
        this.isSendSmsLoading = true
        await this.$refs.loginFrom.validate('mobile')
        const data = await verificationCode(this.user.mobile)
        this.isCountDownShow = true
        console.log(data)
      } catch (err) {
        // console.dir(err)
        let message = ''
        if (err && err && err.response && err.response.status === 429) {
          // 发送太多
          message = '发送太频繁了，请稍后重试'
        } else if (err.name === 'mobile') {
          // 正常报错
          // 表单验证失败的错误提示
          message = err.message
        } else {
          // 其他错误
          // 未知错误
          message = '发送失败，请稍后重试'
        }
        this.$toast({
          message,
          position: 'top' // 防止手机键盘太高看不见提示消息
        })
      }
      this.isSendSmsLoading = false
    }
  }
}
</script>
<style lang="less" scoped>
.login-container {
  .van-nav-bar {
    background-color: #1989fa;
  }
  .van-button-big {
    margin: 50px !important ;
  }
  .verificationCode {
    width: 100px;
  }
  // 头部字体
  /deep/.van-nav-bar__title {
    color: #fff;
  }
  // 头部图标
  /deep/.van-nav-bar .van-icon {
    color: #fff;
  }

  .send-btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    .van-button__text {
      font-size: 11px;
      color: #666666;
    }
  }
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
  /deep/.van-field__body {
    margin-right: 20px;
  }
}
</style>
