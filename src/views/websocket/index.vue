<template>
  <div class="websocket">
    <van-nav-bar title="小智同学" left-arrow @click-left="$router.back()" />

    <!-- 聊天主体区域 -->
    <div class="chat-list" ref="listMessage">
      <div v-for="(item, index) in list" :key="index">
        <!-- 左侧是机器人小思 -->
        <div class="chat-item left" v-if="item.name === 'xs'">
          <div class="chat-pao">{{ item.listMessage }}</div>
          <van-image
            fit="cover"
            round
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
        </div>

        <!-- 右侧是当前用户 -->
        <div class="chat-item right" v-if="item.name === 'me'">
          <div class="chat-pao">{{ item.listMessage }}</div>
          <van-image
            fit="cover"
            round
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
        </div>
      </div>
    </div>

    <van-cell-group class="websocket-leva">
      <van-field
        v-model="message"
        rows="1"
        autosize
        type="textarea"
        placeholder="请输入留言"
      />
      <van-button @click="onSend" type="info" class="websocket-leva-button"
        >发布</van-button
      >
    </van-cell-group>
  </div>
</template>
<script>
// 按需导入 io 方法：调用 io('url') 方法，即可创建 websocket 连接的实例
import { io } from 'socket.io-client'
import { setItem, getItem } from '../../utils/storage.js'
export default {
  data () {
    return {
      list: getItem('chat-messages') || [],
      loading: false,
      finished: false,
      message: '',
      socket: null
    }
  },
  created () {
    // 建立连接
    const socket = io('ws://www.liulongbin.top:9999')

    // 把 socket 存储到 data 中，然后就可以在 methods 中访问到了
    this.socket = socket

    // 当客户端与服务器建立连接成功，触发 connect 事件
    socket.on('connect', () => {
      // console.log('建立连接成功！')
    })

    // 监听接收服务端消息
    socket.on('message', (data) => {
      // console.log('收到服务器消息：', data)
      this.list.push({ name: 'xs', listMessage: data })
      this.list.push({
        message: data.listMessage,
        isMe: false,
        photo: 'http://toutiao.meiduo.site/FkBUsGwtrHKjoF0NPLzeilckol1-'
      })
    })
  },
  watch: {
    list (newValue) {
      setItem('chat-messages', newValue)

      // 在操作完数据后 视图不会直接刷新 拿不到要操作的dom
      // nextTick 是将拿dom的操作放到视图下次刷新后
      this.$nextTick(() => {
        this.$refs.listMessage.scrollTop = this.$refs.listMessage.scrollHeight
      })
    }
  },
  mount () {
    this.$nextTick(() => {
      this.$refs.listMessage.scrollTop = this.$refs.listMessage.scrollHeight
    })
  },
  computed: {},
  components: {},
  methods: {
    onSend () {
      const message = this.message.trim()
      if (!message) {
        return
      }

      // 向服务器发送消息
      this.socket.emit('send', this.message)
      // 将用户填写的消息存储到 list 数组中
      this.list.push({ name: 'me', listMessage: this.message })
      // 清空文本框中的消息内容
      this.message = ''
    },
    scrollToBottom () {}
  },
  beforeDestroy () {
    // 关闭连接
    this.socket.close()

    // 销毁 websocket 实例对象
    this.socket = null
  }
}
</script>
<style lang="less" scoped>
.websocket {
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    margin-bottom: 40px;
    .chat-item {
      position: relative;
      padding: 10px;

      .chat-pao {
        margin-left: 52px;
        vertical-align: top;
        display: inline-block;
        min-width: 40px;
        max-width: 70%;
        min-height: 40px;
        line-height: 38px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 14px;
        color: #333;
        &::before {
          content: '';
          width: 10px;
          height: 10px;
          position: absolute;
          top: 12px;
          border-top: 0.5px solid #c2d9ea;
          border-right: 0.5px solid #c2d9ea;
          background: #e0effb;
        }
      }
      /deep/.van-image {
        padding-left: 10px;
        vertical-align: top;
        width: 40px;
        height: 40px;
      }
    }
  }
  /deep/.van-icon-arrow-left {
    color: white !important;
  }
  /deep/.van-nav-bar__title {
    color: white !important;
  }
  /deep/.van-nav-bar__content {
    background-color: #1989fa;
  }
  &-list {
    margin-bottom: 54px;
  }
  .websocket-leva {
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
    display: flex;
    align-items: center;
    width: 100%;
    &-field {
      height: 150px;
      width: 90%;
    }
    &-button {
      flex: 1;
      .van-button__text {
      }
    }
  }
}
.chat-item.right {
  text-align: right;
  position: relative;
  .chat-pao {
    margin-left: 0px;
    margin-right: 52px;
    &::before {
      right: -6px;
      transform: rotate(45deg);
    }
  }
  /deep/.van-image {
    position: absolute;
    right: 0;
    padding-left: 10px;
    vertical-align: top;
    width: 40px;
    height: 40px;
  }
}
.chat-item.left {
  text-align: left;
  .chat-pao {
    margin-left: 15px;
    margin-right: 0;
    &::before {
      left: -5px;
      transform: rotate(-135deg);
    }
  }
  /deep/.van-image {
    position: absolute;
    left: 0;
    padding-left: 10px;
    vertical-align: top;
    width: 40px;
    height: 40px;
  }
}
</style>
