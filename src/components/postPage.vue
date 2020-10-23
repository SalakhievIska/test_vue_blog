<template>
  <div id="page">
    <div id="posts">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
      <img v-if="post.photoUrl" :src="post.photoUrl" alt="Фото блога">
      <el-link @click="go()" class="back">Назад</el-link>
      <hr>
      <commentForm/>
      <div v-if="comments">
        <div id="comments" v-for="comment in comments" :key="comment.postId">
          <p>{{ comment.title }}</p>
          <p>{{ comment.body }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import store from './../store'
import commentForm from './commentForm'
import Meta from 'vue-meta'

Vue.use(Meta)

export default {
  store,
  name: 'page',
  metaInfo: {
    title: 'Тестовый блог BlogQA',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
    ]
  },
  computed: {
    ...mapGetters(['onePost', 'neededComments']),
    post () { return this.onePost(this.$route.params.id) },
    comments () { return this.neededComments(this.$route.params.id) }
  },
  data () {
    return {
      postId: this.$route.params.id
    }
  },
  methods: {
    go (postId) {
      this.$router.push({ name: 'index' })
    }
  },
  components: { commentForm }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap');

#page {
  font-family: 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h2 {
  margin: 20px auto;
  font-size: 40px;
}

#page {
  width: 65%;
  margin: 50px auto;
}

#comments {
  width: 50%;
  margin: 25px auto;
  border: 1px solid #DCDFE6;
}

#comments p:first-child {
  font-size: 20px;
  font-weight: 700;
}

.el-button {
  padding: 15px 20px;
  font-size: 20px;
}

.back {
  position: relative;
  float: left;
  font-size: 20px;
}

hr {
  margin: 50px auto;
}

@media (max-width: 800px) {
  .el-dialog {
    width: 80% !important;
  }
}
</style>
