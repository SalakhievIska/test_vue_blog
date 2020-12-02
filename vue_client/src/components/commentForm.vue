<template>
  <div>
    <el-button @click="dialogVisible = true">Написать комментарий</el-button>

    <el-dialog title="Новый комментарий" :visible.sync="dialogVisible" width="30%">
      <el-form :model="commentForm" :rules="rules" ref="commentForm" class="commentForm">
        <el-form-item label="Заголовок комментария" prop="title">
          <el-input v-model="commentForm.title"></el-input>
        </el-form-item>
        <el-form-item label="Текст комментария" prop="body">
          <el-input type="textarea" v-model="commentForm.body"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitNewComment('commentForm')">Сохранить</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import { Button, FormItem, Input, Form, Dialog, MessageBox, Upload } from 'element-ui';
import { v4 as uuidv4 } from 'uuid';

@Component({
  name: 'CommentForm',
  components: {
    ElButton: Button,
    ElFormItem: FormItem,
    ElInput: Input,
    ElForm: Form,
    ElDialog: Dialog,
    ElUpload: Upload,
    ElMessageBox: MessageBox,
  },
})
export default class CommentForm extends Vue {
  commentForm = {
    title: '',
    body: ''
  };

  dialogVisible = false;

  rules = {
    title: [
      { required: true, message: 'Обязательное поле', trigger: 'blur' },
      { min: 4, max: 32, message: 'Длина заголовка от 4 до 32 символов', trigger: 'blur' }
    ],
    body: [
      { required: true, message: 'Обязательное поле', trigger: 'blur' },
      { min: 12, max: 64, message: 'Длина текста от 12 до 64 символов', trigger: 'blur' }
    ]
  };

  submitNewComment () {
    this.$refs.commentForm.validate((valid) => {
      if (valid) {
        const comment = {
          postId: this.$route.params.id,
          title: this.commentForm.title,
          body: this.commentForm.body,
          id: uuidv4()
        }

        this.$store.commit('createComment', comment)
        this.commentForm.title = this.commentForm.body = ''
        this.dialogVisible = false
        MessageBox.alert('Комментарий добавлен', 'Done!', {
          confirmButtonText: 'OK',
          center: true
        })
      } else {
        return false
      }
    })
  };

}

</script>
