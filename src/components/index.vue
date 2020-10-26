<template>
  <div id="index">
    <h1>Тестовый блог BlogQA</h1><hr>
    <postForm/>
    <div id="posts" v-for="post in allPosts" :key="post.id">
      <el-link @click="go(post.id)" class="link">
        <h3>{{ post.title }}</h3>
      </el-link>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import store from './../store'
import postForm from './postForm'
import { Link } from 'element-ui'
import Meta from 'vue-meta'

Vue.use(Meta)
Vue.component(Link.name, Link)

export default {
  store,
  name: 'index',
  metaInfo: {
    title: 'Тестовый блог BlogQA',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
    ]
  },
  computed: mapGetters(['allPosts']),
  methods: {
    go (postId) {
      this.$router.push({ name: 'page', params: { id: postId } })
    }
  },
  components: { postForm }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap');

#index {
  font-family: 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  margin-top: 60px;
}

h1 {
  margin: 50px auto;
}

h3 {
  font-size: 35px;
}

#posts {
  width: 65%;
  margin: 20px auto;
}

.link {
  text-decoration: none;
  color: black;
}

.link:hover {
  text-decoration: none;
  color: #1e2b38;
}

.el-button {
  padding: 15px 20px;
  font-size: 20px;
}

</style>
