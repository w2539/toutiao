import Vue from 'vue'
import Vuex from 'vuex'
// ******************先导入*************************
// import createPersistedState from 'vuex-persistedstate'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  // **********************在这个对象里加上就完成啦, 是不是easily*****************************
  // 持久化
  plugins: [vuexLocal.plugin],
  // state '全局状态'
  state: {
    // 用户的登录状态信息
    user: JSON.parse(window.localStorage.getItem('TOUTIAO_USER'))
  },
  mutations: {
    setUser (state, data) {
      state.user = data
    }
  },
  actions: {
  },
  modules: {
  }

})
