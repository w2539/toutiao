<template>
  <div class="user">
    <!-- 头部 -->
    <van-nav-bar
      class="user-header"
      title="个人信息"
      left-text="返回"
      right-text="保存"
    >
      <template slot="left" class="user-header-left">
        <van-icon name="arrow-left" @click="$router.back()"></van-icon>
      </template>
      <template slot="right" class="user-header-right">
        <span>保存</span>
      </template>
    </van-nav-bar>

    <!-- 点击上传图片 -->
    <input
      @change="onChangeFile"
      type="file"
      hidden
      ref="file"
      accept="image/png,image/jpeg"
    />
    <!-- 头像 -->
    <van-cell
      title="头像"
      size="large"
      is-link
      center
      @click="$refs.file.click()"
    >
      <van-image
        width="30"
        height="30"
        round
        fit="cover"
        :src="userInfo.photo"
      />
    </van-cell>

    <!-- 昵称 -->
    <van-cell
      @click="isChangeName = true"
      title="昵称"
      :value="userInfo.name"
      size="large"
      is-link
    />

    <!-- 介绍 -->
    <van-cell title="介绍" size="large" is-link />

    <!-- 性别 -->
    <van-cell
      @click="isChangeGender = true"
      title="性别"
      :value="userInfo.gender === 0 ? '男' : '女'"
      size="large"
      is-link
    />

    <!-- 生日 -->
    <van-cell
      @click="isChangeBirthday = true"
      title="生日"
      :value="userInfo.birthday"
      size="large"
      is-link
    />

    <!-- 地区 -->
    <van-cell title="地区" value="带完善" size="large" is-link />

    <!-- 修改姓名弹出层 -->
    <van-popup v-model="isChangeName" round position="center">
      <UserChangeName
        :userName="userInfo.name"
        @confirm="confirmChangeName"
        @cancelConfirm="isChangeName = false"
      ></UserChangeName>
    </van-popup>

    <!-- 修改性别弹出层 -->
    <van-popup
      v-model="isChangeGender"
      round
      position="bottom"
      :style="{ height: '30%' }"
    >
      <UserChangeGender
        v-model="userInfo.gender"
        @close="isChangeGender = false"
        @onConfirm="userInfo.gender = $event"
      ></UserChangeGender>
    </van-popup>

    <!-- 修改生日弹出层 -->
    <van-popup
      v-model="isChangeBirthday"
      round
      position="bottom"
      :style="{ height: '30%', width: '100%' }"
    >
      <UserChangeBirthday
        v-model="userInfo.birthday"
        @close="isChangeBirthday = false"
        @confirm="userInfo.birthday = $event"
      ></UserChangeBirthday>
    </van-popup>

    <!-- 图片预览弹出层 -->
    <van-popup
      v-model="isChangePhoto"
      class="userPhoto"
      :style="{ height: '100%', width: '100%' }"
    >
      <UserChangePhoto
        v-if="isChangePhoto"
        :file="prewiewImage"
        @close="changePhotoClose"
        @update-photo="onClickRight"
      ></UserChangePhoto>
    </van-popup>
  </div>
</template>
<script>
import { getUserInfo, changeUserInfo } from '../../api/user.js'
import UserChangeName from './components/user-changeName.vue'
import UserChangeGender from './components/user-changeGender.vue'
import UserChangeBirthday from './components/user-changeBirthday.vue'
import UserChangePhoto from './components/user-changePhoto.vue'
export default {
  data () {
    return {
      // 用户信息
      userInfo: {},
      isChangeName: false,
      isChangeGender: false,
      isChangeBirthday: false,
      isChangePhoto: false,
      prewiewImage: null // 上传图片预览
    }
  },
  created () {
    this.isGetUserInfo()
  },
  computed: {},
  components: {
    UserChangeName,
    UserChangeGender,
    UserChangeBirthday,
    UserChangePhoto
  },
  methods: {
    async isGetUserInfo () {
      try {
        const { data } = await getUserInfo()
        console.log(data)
        this.userInfo = data.data
      } catch (err) {
        this.$toast.fail(err.response.data.message)
      }
    },
    // 修改姓名
    async confirmChangeName (changeName) {
      try {
        await changeUserInfo({ name: changeName })
          .then(() => {
            this.isChangeName = false
            this.userInfo.name = changeName
          })
          .then(() => {
            this.$toast.success('修改成功')
          })
      } catch (err) {
        if (err && err.response && err.response.status === 409) {
          this.$toast.fail('昵称已存在')
        }
        this.$toast.fail(err.response.data.message)
      }
    },
    // 上传图片文件发生改变
    onChangeFile () {
      // 打开弹出层
      this.isChangePhoto = true
      // 获得上传的图片 进行图片预览
      const file = this.$refs.file.files[0]
      // const bol = window.URL.createObjectURL(this.$refs.file.files[0])
      this.prewiewImage = file
      // console.log(bol)
      // 清空文件上传的内容 防止上传相同的内容之后
      // 没有反应
      this.$refs.file.value = ''
    },
    changePhotoClose () {
      this.isChangePhoto = false
      this.prewiewImage = ''
    },
    onClickRight (file) {
      this.userInfo.photo = file
    }
  }
}
</script>
<style lang="less" scoped>
.user {
  .userPhoto {
    background-color: #000;
  }
  /deep/.van-nav-bar__content {
    .van-nav-bar__right {
      color: white !important;
    }

    background-color: #3296fa;
    .van-nav-bar__title {
      color: white;
    }
    .van-icon-arrow-left {
      color: white;
    }
    .van-nav-bar__text {
      color: white;
    }
  }
}
</style>
