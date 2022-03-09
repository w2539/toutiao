<template>
  <div class="my-container">
    <!-- 头部区域 -->
    <van-cell-group class="van-cell-group" :border="false" v-if="user">
      <van-cell title="单元格" center :border="false" class="base-info">
        <van-image
          class="base-info-user"
          slot="icon"
          round
          fit="cover"
          :src="userInfo.photo"
        />
        <div slot="title" class="base-info-name">{{ userInfo.name }}</div>
        <van-button size="small" round class="base-info-btn" to="/user"
          >编辑资料</van-button
        >
      </van-cell>
      <van-grid :border="false" class="gird-info">
        <van-grid-item class="gird-info-item">
          <div class="texts" slot="text">
            <div class="count">{{ userInfo.art_count }}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="gird-info-item">
          <div class="texts" slot="text">
            <div class="count">{{ userInfo.fans_count }}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="gird-info-item">
          <div class="texts" slot="text">
            <div class="count">{{ userInfo.follow_count }}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="gird-info-item">
          <div class="texts" slot="text">
            <div class="count">{{ userInfo.like_count }}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <div v-else class="no-login">
      <div @click="$router.push('/login')">
        <img src="../../assets/image/头像.png" alt="" />
      </div>
      <div class="text">
        <span>登陆/注册</span>
      </div>
    </div>

    <!-- 底部区域 -->
    <van-grid :column-num="2" class="bar-grid-info">
      <van-grid-item
        class="bar-grid-info-item"
        icon-prefix="toutiao"
        icon="shoucang"
        text="收藏"
      />
      <van-grid-item
        class="bar-grid-info-item"
        icon-prefix="toutiao"
        icon="lishi"
        text="历史"
      />
    </van-grid>

    <van-cell title="消息通知" is-link to="/" />
    <van-cell class="mb-4" title="小智同学" is-link to="/" />
    <van-cell
      v-if="user"
      class="logout-cell"
      title="退出登录"
      @click="logout"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '../../api/login.js'
export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.loadCurrentUser()
  },
  mounted () {},
  methods: {
    async loadCurrentUser () {
      const { data } = await getUserInfo()
      this.userInfo = data.data
    },

    logout () {
      // 提示用户确认退出
      // 确认 -> 处理退出
      this.$dialog
        .confirm({
          title: '退出提示',
          message: '确认退出吗？'
        })
        .then(() => {
          // 确认执行这里
          // 清除用户登录状态
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // 退出执行这里
          // on cancel
        })
    }
  }
}
</script>

<style scoped lang="less">
.my-container {
  /deep/.van-cell-group {
    background: url('../../assets/image/banner.png') no-repeat;
    background-size: cover;
  }
  .van-cell {
    background-color: unset;
  }
  /deep/.van-grid-item__content {
    background-color: unset;
  }
  .out {
    text-align: center;
  }
  .no-login {
    background: url('../../assets/image/banner.png') no-repeat;
    background-size: cover;
    height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 14px;
    .text {
      margin-top: 5px !important;
      height: 10px;
    }
  }
  .base-info {
    height: 115px;
    box-sizing: border-box;
    &-user {
      margin-top: 8px;
      width: 66px;
      height: 66px;
      margin-right: 11px;
      /deep/.van-image__img {
        border: 1px solid #fff;
      }
    }
    &-name {
      padding-left: 10px;
      font-size: 16px;
      color: #fff;
    }
    &-btn {
      height: 16px;
    }
  }
  .gird-info {
    &-item {
      height: 65px;
      .texts {
        text-align: center;
        .text {
          font-size: 11px;
        }
        .count {
          font-size: 16px;
        }
      }
    }
  }
  /deep/.bar-grid-info {
    &-item {
      height: 70px;
      .toutiao-shoucang {
        color: #ec5758;
        font-size: 20px;
      }
      .toutiao-lishi {
        color: #ffa734;
        font-size: 20px;
      }
      .van-grid-item__text {
        font-size: 18px;
      }
    }
  }
  .logout-cell {
    text-align: center;
    color: #d86262;
  }
  .mb-4 {
    margin-bottom: 10px !important;
  }
}
</style>
