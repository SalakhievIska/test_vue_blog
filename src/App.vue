<template>
  <div id="app">
    <h1>Тестовый блог BlogQA</h1><hr>
    <postForm/>
    <div id="posts" v-for="post in allPosts" :key="post.id">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import postForm from './components/postForm'

export default {
  name: 'app',
  computed: mapGetters(['allPosts']),
  methods: mapActions(['fetchPosts']),
  components: { postForm }
  // async mounted () {
  //   this.fetchPosts()
  // }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap');
#app {
  font-family: 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  margin: 50px auto;
}

#posts {
  width: 65%;
  margin: 50px auto;
}
</style>
