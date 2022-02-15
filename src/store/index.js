import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户的登录状态信息
    user: JSON.parse(window.localStorage.getItem('TOUTIAO_USER'))
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      window.localStorage.setItem('TOUTIAO_USER', JSON.stringify(state.user))
    }
  },
  actions: {
  },
  modules: {
  }
})
