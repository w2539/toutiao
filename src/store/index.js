import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '../utils/storage.js'

Vue.use(Vuex)

const USER_KEY = 'toutiao-user'

export default new Vuex.Store({
  state: {
    // 用户的登录状态信息
    user: getItem(USER_KEY)
  },
  mutations: {
    setUser (state, data) {
      state.user = data

      setItem(USER_KEY, state.user)
      // window.localStorage.setItem('TOUTIAO_USER', JSON.stringify(state.user))
    }
  },
  actions: {
  },
  modules: {
  }
})
