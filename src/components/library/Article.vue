<template>
  <div class="article">
    <van-cell>
      <div class="title" slot="title">{{ article.title }}</div>
      <div slot="label">
        <div v-if="article.cover.type === 3" class="cover-wrap">
          <div
            class="cover-wrap-item"
            v-for="item in article.cover.images"
            :key="item.id"
          >
            <van-image
              class="cover-image"
              height="100"
              alt=""
              :src="item"
              fit="cover"
            />
          </div>
        </div>
      </div>
      <div slot="label" class="text-info">
        <span class="textOne">{{ article.aut_name }}</span>
        <span class="textTwo">{{ article.comm_count }} 评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>

      <div slot="extra" class="extra">
        <div v-if="article.cover.type === 1">
          <van-image
            width="116"
            height="73"
            alt=""
            class="thumb"
            :src="article.cover.images[0]"
            fit="cover"
          />
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'Article',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.article {
  .title {
    font-size: 18px;
  }
  .thumb {
    margin-left: 5px;
  }
  /deep/.text-info {
    span {
      font-size: 11px;
      margin-left: 8px;
    }
  }
  .extra {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .cover-wrap {
    padding: 15px 0;
    display: flex;
    .cover-wrap-item {
      flex: 1;
      height: 73px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-image {
        width: 100%;
        height: 73px;
      }
    }
  }
}
</style>
