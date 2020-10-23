<template>
  <div>
    <el-button type="text" @click="dialogVisible = true">Создать новую запись</el-button>

    <el-dialog title="Новая запись" :visible.sync="dialogVisible" width="30%">
      <el-form :model="postForm" :rules="rules" ref="postForm" class="postForm">
        <el-form-item label="Заголовок поста" prop="title">
          <el-input v-model="postForm.title"></el-input>
        </el-form-item>
        <el-form-item label="Текст поста" prop="body">
          <el-input v-model="postForm.body"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitNewPost('postForm')">Сохранить</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import './../assets/index.css'
import Vue from 'vue'
import { mapMutations } from 'vuex'
import { Button, FormItem, Input, Form, Dialog, MessageBox } from 'element-ui'

Vue.component(Button.name, Button)
Vue.component(FormItem.name, FormItem)
Vue.component(Input.name, Input)
Vue.component(Form.name, Form)
Vue.component(Dialog.name, Dialog)
Vue.component(MessageBox.name, MessageBox)

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
            id: Date.now()
          })
          this.title = this.body = ''
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
