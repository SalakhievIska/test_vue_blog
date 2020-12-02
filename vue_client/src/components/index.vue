<template>
  <div id="index">
    <h1>Тестовый блог BlogQA</h1><hr>
    <div v-if="userIsLogin">
      <i class="el-icon-user-solid"></i>
      <p style="margin-top: 0; margin-bottom: 20px; font-size: 25px; font-weight: bold;">{{ nick }}</p>
      <el-button @click="logOut" style="margin-bottom: 20px;">Выход</el-button>
      <postForm/>
    </div>
    <div v-else>
      <registerForm/>
    </div>
    <div id="posts" v-for="post in allPosts" :key="post.id">
      <el-link @click="go(post.id)" class="link">
        <h3>{{ post.title }}</h3>
      </el-link>
    </div>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import postForm from './postForm'
import registerForm from './registerForm'
import { Link } from 'element-ui'
import Meta from 'vue-meta'

@Component({
  name: 'Index',
  components: {
    ElLink: Link,
    postForm,
    registerForm,
    Meta,
  }
})
export default class Index extends Vue {
  userIsLogin = false;

  get allPosts() {
    return this.$store.getters.allPosts;
  }

  get nick() {
    return this.$store.getters.getUserNick
  }

  metaInfo = {
    title: 'Тестовый блог BlogQA',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
    ]
  };

  go (postId) {
    this.$router.push({ name: 'page', params: { id: postId } })
  }

  logOut() {
    this.$store.commit('logoutAccount');
    this.userIsLogin = false;
  }

  mounted() {
    if (this.$store.getters.checkUser) this.userIsLogin = true;
    else this.userIsLogin = false;

    this.$on('login', () => {
      this.userIsLogin = true
    })
  }
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
