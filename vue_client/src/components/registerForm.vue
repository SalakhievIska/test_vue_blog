<template>
  <div>
    <el-button @click="dialogVisible = true" style="margin-bottom: 20px;">Создать аккаунт</el-button>

    <el-dialog title="Регистрация" :visible.sync="dialogVisible" width="20%">
      <el-form :model="registerForm" :rules="rules" ref="registerForm" class="registerForm">
        <el-form-item label="Никнейм" prop="nickname">
          <el-input v-model="registerForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="Майл" prop="mail">
          <el-input v-model="registerForm.mail"></el-input>
        </el-form-item>
        <el-form-item label="Пароль" prop="password">
          <el-input v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitNewAccount('registerForm')">Создать</el-button>
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
      registerForm: {
        nickname: '',
        mail: '',
        password: '',
      },
      dialogVisible: false,
      rules: {
        nickname: [
          { required: true, message: 'Обязательное поле', trigger: 'blur' },
          { min: 4, max: 32, message: 'Длина заголовка от 4 до 32 символов', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: 'Обязательное поле', trigger: 'blur' },
          { min: 3, max: 20, message: 'Длина текста от 3 до 20 символов', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Обязательное поле', trigger: 'blur' },
          { min: 3, max: 20, message: 'Длина текста от 3 до 20 символов', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['createAccount']),
    submitNewAccount (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createAccount({
            nickname: this.registerForm.nickname,
            mail: this.registerForm.mail,
            password: this.registerForm.password,
            id: uuidv4(),
          })
          this.registerForm.nickname = this.registerForm.mail = this.registerForm.password = ''
          this.dialogVisible = false
          MessageBox.alert('Пользователь создан', 'Done!', {
            confirmButtonText: 'OK',
            center: true
          })
        } else {
          return false
        }
      })
    },
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

