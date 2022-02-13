<template>
  <div class="login-container">
    <van-nav-bar title="登陆" left-arrow />
    <van-form>
      <van-field
        v-model="user.mobile"
        name="手机号"
        label="手机号"
        icon-prefix="toutiao"
        left-icon="wode"
        clearable
        placeholder="手机号"
      />
      <van-field
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        v-model="user.code"
        type="number"
        name="验证码"
        label="验证码"
        clearable
        placeholder="验证码"
      >
        <template #button>
          <van-button size="small" type="primary" round>发送验证码</van-button>
        </template>
      </van-field>
      <div class="van-button-big">
        <van-button block type="info" @click="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { loginAPI } from '@/api/login.js'

export default {
  data () {
    return {
      user: {
        // 手机号
        mobile: '',
        // 验证码
        code: ''
      }
    }
  },
  created () {},
  computed: {},
  components: {},
  methods: {
    async submit () {
      try {
        // 只有当表单数据校验通过之后，才会调用此 login 函数
        const res = await loginAPI(this.user)
        // 当数据请求成功之后，res.data 中存储的就是服务器响应回来的数据
        console.log(res)
      } catch (err) {
        console.log(err)
      }
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
    margin: 16px;
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
}
</style>
