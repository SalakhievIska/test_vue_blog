<template>
  <div>
    <el-button @click="dialogVisible = true">Создать новую запись</el-button>

    <el-dialog title="Новая запись" :visible.sync="dialogVisible" width="30%">
      <el-form :model="postForm" :rules="rules" ref="postForm" class="postForm">
        <el-form-item label="Заголовок поста" prop="title">
          <el-input v-model="postForm.title"></el-input>
        </el-form-item>
        <el-form-item label="Текст поста" prop="body">
          <el-input v-model="postForm.body"></el-input>
        </el-form-item>
        <!-- <el-form-item prop="photoUrl">
          <el-upload
            v-model="postForm.photoUrl"
            action="https://up.flickr.com/services/upload/&oauth_consumer_key=f1d25eabebc5e3cea7e589d781ace5a2"
            :limit="1"
            :auto-upload="true">
            <i class="el-icon-download icon"></i>
          </el-upload>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="submitNewPost('postForm')">Сохранить</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations } from 'vuex'
import Axios from 'axios'
import { Button, FormItem, Input, Form, Dialog, MessageBox, Upload } from 'element-ui'
import { v4 as uuidv4 } from 'uuid'

Vue.component(Button.name, Button)
Vue.component(FormItem.name, FormItem)
Vue.component(Input.name, Input)
Vue.component(Form.name, Form)
Vue.component(Dialog.name, Dialog)
Vue.component(MessageBox.name, MessageBox)
Vue.component(Upload.name, Upload)

export default {
  data () {
    return {
      postForm: {
        title: '',
        body: ''
      },
      dialogVisible: false,
      rules: {
        title: [
          { required: true, message: 'Обязательное поле', trigger: 'blur' },
          { min: 4, max: 32, message: 'Длина заголовка от 4 до 32 символов', trigger: 'blur' }
        ],
        body: [
          { required: true, message: 'Обязательное поле', trigger: 'blur' },
          { min: 16, max: 64, message: 'Длина текста от 16 до 64 символов', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['createPost']),
    submitNewPost (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createPost({
            title: this.postForm.title,
            body: this.postForm.body,
            photoUrl: this.postForm.photoUrl,
            id: uuidv4()
          })
          this.postForm.title = this.postForm.body = ''
          this.dialogVisible = false
          MessageBox.alert('Запись добавлена', 'Done!', {
            confirmButtonText: 'OK'
          })
        } else {
          return false
        }
      })
    }
    // upload (file) {
    //   console.log(this.postForm.photoUrl)
    //   let formData = new FormData()
    //   formData.append('file', file)

    //   Axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
    //   Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
    //   Axios({
    //       method: 'POST',
    //       url: "https://jsonplaceholder.typicode.com/photos",
    //       data: formData,
    //   }).then((response)=>{
    //       console.log(response)
    //   }).catch((error)=>{
    //       console.log(error)
    //   })
    // }
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

.icon {
  font-size: 25px;
  color: #8c939d;
  text-align: center;
}

@media (max-width: 800px) {
  .el-dialog {
    width: 80% !important;
  }
}
</style>

