<template>
  <div>
    <el-button @click="dialogVisible = true">Создать новую запись</el-button>

    <el-dialog title="Новая запись" :visible.sync="dialogVisible" width="30%">
      <el-form :model="postForm" :rules="rules" ref="postForm" class="postForm">
        <el-form-item label="Заголовок поста" prop="title">
          <el-input v-model="postForm.title"></el-input>
        </el-form-item>
        <el-form-item label="Текст поста" prop="body">
          <el-input type="textarea" v-model="postForm.body"></el-input>
        </el-form-item>
        <el-form-item prop="photoUrl">
          <el-upload
            ref="upload"
            action="http://localhost:5000/upload"
            :on-success="uploadPhoto"
            :on-remove="removePhoto"
            :limit="1">
            <i v-if="!file" class="el-icon-plus icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitNewPost('postForm')">Сохранить</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import Axios from 'axios'
import { Button, FormItem, Input, Form, Dialog, MessageBox, Upload } from 'element-ui'
import { v4 as uuidv4 } from 'uuid'

@Component({
  name: 'PostForm',
  components: {
    ElButton: Button,
    ElFormItem: FormItem,
    ElInput: Input,
    ElForm: Form,
    ElDialog: Dialog,
    ElMessageBox: MessageBox,
    ElUpload: Upload,
  }
})
export default class PostForm extends Vue{
  postForm = {
    title: '',
    body: ''
  }

  file = ''

  dialogVisible = false

  rules = {
    title: [
      { required: true, message: 'Обязательное поле', trigger: 'blur' },
      { min: 4, max: 32, message: 'Длина заголовка от 4 до 32 символов', trigger: 'blur' }
    ],
    body: [
      { required: true, message: 'Обязательное поле', trigger: 'blur' },
      { min: 12, max: 64, message: 'Длина текста от 12 до 64 символов', trigger: 'blur' }
    ]
  }

  submitNewPost (formName) {
    this.$refs[formName].validate((valid) => {
      if (valid) {
        const newPost = {
          title: this.postForm.title,
          body: this.postForm.body,
          photoUrl: this.file,
          id: uuidv4(),
          user: this.$store.getters.getUserNick
        }

        this.$store.commit('createPost', newPost)
        this.postForm.title = this.postForm.body = this.file = ''
        this.$refs.upload.clearFiles()
        this.dialogVisible = false
        MessageBox.alert('Запись добавлена', 'Done!', {
          confirmButtonText: 'OK',
          center: true
        })
      } else {
        return false
      }
    })
  }

  uploadPhoto (response) {
    this.file = response.photoUrl
  }

  removePhoto (file) {
    Axios.get(this.file.replace('getPhoto', 'removePhoto'))
    this.file = ''
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

.el-dialog__title {
  font-size: 23px;
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

