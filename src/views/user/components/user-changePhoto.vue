<template>
  <div class="changePhoto">
    <div class="image">
      <img :src="image" alt="" ref="image" />
    </div>
    <van-nav-bar
      left-text="返回"
      right-text="保存"
      @click-left="$emit('close')"
      @click-right="onClickRight"
    />
  </div>
</template>
<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { changeUserPhoto } from '../../../api/user.js'
export default {
  props: {
    file: {
      // type: String,
      require: true
    }
  },
  data () {
    return {
      image: window.URL.createObjectURL(this.file),
      cropper: null
    }
  },
  created () {},
  computed: {},
  components: {},
  mounted () {
    // 因为要操作dom 所以要写在
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      // 默认背景
      background: false,
      // 是否可以移动
      movable: true
    })
  },
  beforeDestroy () {
    // this.$refs.image.src = ''
    console.log(this.$refs.image.src)
  },

  methods: {
    getCroppedCanvas () {
      return new Promise((resolve) => {
        this.cropper.getCroppedCanvas().toBlob((blob) => {
          resolve(blob)
        })
      })
    },
    async onClickRight () {
      const file = await this.getCroppedCanvas()
      const fd = new FormData()
      fd.append('photo', file)

      // form-data 文件对象 不能是其他格式
      // const fd = new FormData()
      // fd.append('photo', this.file)

      // 向接口传入数据
      await changeUserPhoto(fd)
      this.$toast.success('保存成功')
      this.$emit('close')
      this.$emit('update-photo', window.URL.createObjectURL(file))
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.van-nav-bar {
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  .van-nav-bar__content {
    background-color: black !important;
  }
}
</style>
