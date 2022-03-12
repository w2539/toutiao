<template>
  <div id="app">
    <keep-alive :include="['cachePage']">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState(['cachePage'])
  }
}
</script>
<style lang="less"></style>
