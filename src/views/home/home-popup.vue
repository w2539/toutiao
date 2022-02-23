<template>
  <div class="channel-edit">
    <van-cell class="channel-edit-title" title="我的频道" :border="false">
      <van-button
        @click="iconCloseShow = !iconCloseShow"
        class="popup-button"
        size="mini"
        round
        type="danger"
        plain
        >{{ iconCloseShow ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        :class="{ active: index === active }"
        v-for="(item, index) in channelList.channels"
        :key="item.id"
        :icon="iconCloseShow && index !== 0 ? 'close' : ''"
        :text="item.name"
        @click="userRecommend(index, item)"
      />
    </van-grid>
    <van-cell
      title="频道推荐"
      :border="false"
      class="channel-edit-title twoTitle"
    ></van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="item in allRecommend"
        :key="item.id"
        :text="item.name"
        @click="addRecommend(item)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  getNewUserChannels,
  deleteUserChannels
} from '../../api/list'
import { mapState } from 'vuex'
import { setItem } from '../../utils/storage'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    channelList: {
      type: Object,
      default: () => {}
    },
    active: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      allChannel: [],
      iconCloseShow: false
    }
  },
  watch: {},
  created () {
    this.AllGainList()
  },
  mounted () {},
  methods: {
    // 获取所有频道的列表数据
    async AllGainList () {
      const { data: res } = await getAllChannels()
      if (res.message === 'OK') {
        // 将请求到的数据，转存到 allChannel 中
        this.allChannel = res.data.channels
      }
    },
    // 增加用户推荐频道
    async addRecommend (item) {
      this.channelList.channels.push(item)
      if (this.user) {
        // 登陆下
        // 已登录，数据存储到线上
        await getNewUserChannels([
          {
            id: item.id, // 频道 id
            seq: this.channelList.length // 频道的 序号
          }
        ])
      } else {
        // 未登录下
        setItem('channelList', this.channelList.channels)
      }
    },
    userRecommend (index, item) {
      if (this.iconCloseShow && index !== 0) {
        if (index <= this.active) {
          this.$emit('cutRecommend', this.active - 1)
        }
        // 删除
        this.deleteChannel(index, item)
      } else {
        // 切换
        this.cutChannel(index)
      }
    },
    async deleteChannel (index, item) {
      this.channelList.channels.splice(index, 1)
      if (this.user) {
        // 登陆状态下
        await deleteUserChannels(item.id)
      } else {
        // 未登录情况下
        setItem('deleteChannel', this.channelList.channels)
      }
    },
    cutChannel (index) {
      this.$emit('cutRecommend', index)
      this.$emit('closePopup')
    }
  },
  computed: {
    ...mapState(['user']),
    allRecommend () {
      // 1. 对数组进行 filter 过滤，返回的是符合条件的新数组
      return this.allChannel.filter((item) => {
        // 判断当前循环项，是否在 “我的频道” 列表之中
        const index = this.channelList.channels.findIndex(
          (x) => x.id === item.id
        )
        // 如果不在，则 return true，表示需要把这一项存储到返回的新数组之中
        if (index === -1) return true
      })
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  .active {
    /deep/.van-grid-item__text {
      color: red !important;
    }
  }
  /deep/.van-icon {
    position: absolute;
    right: 1px;
    top: 2px;
    font-size: 20px;
    color: #ccc;
  }

  margin-top: 55px;
  &-title {
    font-size: 22px;
  }
  .twoTitle {
    margin-top: 20px;
  }
  .popup-button {
    width: 60px;
  }
  /deep/.channel-item {
    text-align: center;
    height: 84px;
    display: block; //块状显示
    overflow: hidden; //隐藏文字
    white-space: nowrap; //不换行
    .van-grid-item__content {
      background-color: #f5f5f6;
      .van-grid-item__text {
        color: #222;
        font-size: 28px;
      }
      .van-grid-item__text {
        font-size: 17px;
      }
    }
  }
}
</style>
