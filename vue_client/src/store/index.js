import Vue from 'vue'
import Vuex from 'vuex'
import vuexfunc from './modules/vuexfunc'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    vuexfunc
  },
  plugins: [createPersistedState()]
})
