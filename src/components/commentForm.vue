<template>
  <div>
    <el-button @click="dialogVisible = true">Написать комментарий</el-button>

    <el-dialog title="Новый комментарий" :visible.sync="dialogVisible" width="30%">
      <el-form :model="commentForm" :rules="rules" ref="commentForm" class="commentForm">
        <el-form-item label="Заголовок комментария" prop="title">
          <el-input v-model="commentForm.title"></el-input>
        </el-form-item>
        <el-form-item label="Текст комментария" prop="body">
          <el-input v-model="commentForm.body"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitNewComment('commentForm')">Сохранить</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations } from 'vuex'
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
      commentForm: {
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
    ...mapMutations(['createComment']),
    submitNewComment (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createComment({
            postId: this.$route.params.id,
            title: this.commentForm.title,
            body: this.commentForm.body,
            id: uuidv4()
          })
          this.commentForm.title = this.commentForm.body = ''
          this.dialogVisible = false
          MessageBox.alert('Комментарий добавлен', 'Done!', {
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
