import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import index from './components/index.vue'
import postPage from './components/postPage.vue'
import Meta from 'vue-meta'

Vue.use(Meta)
Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', name: 'index', component: index },
    { path: '/pages?id=:id', name: 'page', component: postPage }
  ]
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
