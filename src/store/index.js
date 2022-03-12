import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '../utils/storage.js'

Vue.use(Vuex)

const USER_KEY = 'toutiao-user'

export default new Vuex.Store({
  state: {
    // 用户的登录状态信息
    user: getItem(USER_KEY),

    cachePage: ['LayoutIndex']
  },
  mutations: {
    setUser (state, data) {
      state.user = data

      setItem(USER_KEY, state.user)
      // window.localStorage.setItem('TOUTIAO_USER', JSON.stringify(state.user))
    },
    // 添加缓存页面
    addCachePage (state, pageName) {
      // 如果数组里面已经有了 就不再添加
      if (!state.cachePage.includes(pageName)) {
        state.cachePage.push(pageName)
      }
    },
    // 移出缓存页面
    removeCachePage (state, pageName) {
      const index = state.cachePage.indexOf(pageName)
      if (index !== -1) {
        state.cachePage.splice(index, 1)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
