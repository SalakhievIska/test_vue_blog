<template>
  <div id="page">
    <div id="posts">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
      <img v-if="post.photoUrl" :src="post.photoUrl" alt="Фото блога">
      <el-link @click="go()" class="back"><i class="el-icon-back"></i> Назад</el-link>
      <el-link @click="deletePostGo()" class="delete-post">Удалить <i class="el-icon-delete"></i></el-link>
      <hr>
      <commentForm/>
      <div v-if="comments">
        <div id="comments" v-for="comment in comments" :key="comment.id">
          <p>{{ comment.title }}</p>
          <p>{{ comment.body }}</p>
          <!--<i @click="deleteCommentGo(comment.id)" class="el-icon-delete delete-comment"></i>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import store from './../store'
import commentForm from './commentForm'
import Meta from 'vue-meta'
import { MessageBox, Link } from 'element-ui'

@Component({
  name: 'PostPage',
  components: {
    ElLink: Link,
    ElMessageBox: MessageBox,
    commentForm,
    Meta,
  }
})
export default class PostPage extends Vue {
  metaInfo = {
    title: 'Тестовый блог BlogQA',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
    ]
  }

  postId = this.$router.currentRoute.params.id

  get post() {
    return this.$store.getters.onePost(this.postId)
  }

  get comments() {
    return this.$store.getters.neededComments(this.postId)
  }

  go () {
    this.$router.push({ name: 'index' })
  }

  deletePostGo () {
    this.$state.commit('deletePost', postId)
    MessageBox.alert('Запись удалена', 'Done!', {
      confirmButtonText: 'OK'
    })
    this.$router.push({ name: 'index' })
  }

  deleteCommentGo (commentId) {
    this.$state.commit('deleteComment', commentId)
    MessageBox.alert('Комментарий удален', 'Done!', {
      confirmButtonText: 'OK'
    })
  }
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
  width: 65%;
  margin: 50px auto;
}

h2 {
  margin: 20px auto;
  font-size: 40px;
}

#page img{
  width: 50%;
  margin: 0 auto;
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

.delete-post {
  position: relative;
  float: right;
  font-size: 20px;
}

.delete-comment {
  vertical-align: super;
}

.delete-comment:hover {
  cursor: pointer;
}

.el-message-box__content p {
  font-size: 18px;
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
