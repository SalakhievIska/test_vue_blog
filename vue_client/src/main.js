import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import index from './components/index.vue'
import postPage from './components/postPage.vue'
import Meta from 'vue-meta'
import store from './store'

Vue.use(Meta)
Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', name: 'index', component: index },
    { path: '/pages/:id', name: 'page', component: postPage }
  ]
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
