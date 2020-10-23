import Vue from 'vue'
import Vuex from 'vuex'
import post from './modules/post'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    post
  },
  plugins: [createPersistedState()]
})
