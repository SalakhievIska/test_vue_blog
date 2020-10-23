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
            class="photo"
            v-model="postForm.photoUrl"
            action=""
            :before-upload="beforeUpload"
            :show-file-list="true"
            :limit=1>
            <img v-if="postForm.photoUrl" :src="postForm.photoUrl">
            <i v-else class="el-icon-plus photo-icon"></i>
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
import { Button, FormItem, Input, Form, Dialog, MessageBox, Upload } from 'element-ui'

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
        body: '',
        photoUrl: ''
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
      this.$refs[formName].validate((valid, file) => {
        if (valid) {
          this.createPost({
            title: this.postForm.title,
            body: this.postForm.body,
            photoUrl: this.imageUrl,
            id: Date.now().toString()
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
  }
}

</script>
