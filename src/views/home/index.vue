<template>
  <div class="home">
    <div class="home-container">
      <!-- 导航栏开始 -->
      <van-nav-bar class="app-nav-bar">
        <van-button
          @click="$router.push('/search')"
          slot="title"
          class="search-btn"
          icon="search"
          type="info"
          round
          size="small"
          >搜索</van-button
        >
      </van-nav-bar>
      <!-- /导航栏结束 -->

      <van-tabs class="channel-tabs" v-model="active">
        <van-tab
          v-for="item in list.channels"
          :key="item.id"
          :title="item.name"
        >
          <ArticleList :listName="item"></ArticleList>
        </van-tab>
        <div slot="nav-right" class="icon-placeholder"></div>
        <!-- 汉堡图标 -->
        <div slot="nav-right" class="tab-icon" @click="popupCut = true">
          <van-icon name="wap-nav" />
        </div>
      </van-tabs>
      <!-- 弹出层 -->
      <van-popup
        v-model="popupCut"
        closeable
        close-icon-position="top-left"
        position="bottom"
      >
        <HomePopup
          :active="active"
          :channelList="list"
          @cutRecommend="cutRecommend"
          @closePopup="popupCut = false"
        ></HomePopup>
      </van-popup>
    </div>
  </div>
</template>
<script>
import { getUserChannels } from '../../api/list'
import ArticleList from './components/article-list.vue'
import HomePopup from './components/home-popup.vue'
import { mapState } from 'vuex'
import { getItem } from '../../utils/storage'
export default {
  data () {
    return {
      active: 0,
      list: {},
      popupCut: false
    }
  },
  created () {
    this.gainList()
  },
  computed: {
    ...mapState(['user'])
  },
  components: { ArticleList, HomePopup },
  methods: {
    async gainList () {
      let list = []
      try {
        if (this.user) {
          // 以登陆情况
          const { data } = await getUserChannels()
          list = data.data
        } else {
          const localChannels = getItem('channelList')
          if (localChannels) {
            // 有本地频道数据，则使用
            list = localChannels
          } else {
            // 没有本地频道数据，则请求获取默认推荐的频道列表
            const { data } = await getUserChannels()
            list = data.data
          }
        }
      } catch (err) {
        console.log(err)
        this.$toast('数据获取失败')
      }

      this.list = list
    },
    cutRecommend (index) {
      this.active = index
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  .channel-tabs {
    /deep/.van-tab {
      border-right: 0.5px solid #edeff3;
      border-left: 0.5px solid #edeff3;
      border-bottom: 0.5px solid #edeff3;
    }
  }
  /deep/.van-tabs__line {
    margin-bottom: 5px;
    width: 15px;
    background-color: blue;
  }
  .icon-placeholder {
    width: 33px;
    flex-shrink: 0;
  }
  .tab-icon {
    background-color: #fff;
    font-size: 16px;
    height: 43px;
    width: 33px;
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.9;
    .van-icon {
      font-size: 24px;
    }
    &::before {
      content: '';
      width: 1px;
      height: 43px;
      background: url('../../assets/image/icon-after.png') no-repeat;
      background-size: contain;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  /deep/.van-popup {
    height: 100%;
  }
  /deep/.app-nav-bar {
    height: 60px;
    background-color: #3296fa;
    display: flex;
    justify-content: center;
    align-items: center;
    // margin-right: 47px;
    .van-nav-bar__title {
      max-width: unset;
    }
    .search-btn {
      width: 277px;
      height: 32px;
      background-color: #5babfb;

      .van-button__text {
        font-size: 16px;
      }
      .van-icon {
        font-size: 16px;
      }
    }
  }
}
</style>
