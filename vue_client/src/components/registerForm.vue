<template>
  <div>
    <el-button @click="dialogVisible.register = true" style="margin-bottom: 20px;">Создать аккаунт</el-button>
    <el-button @click="dialogVisible.login = true" style="margin-bottom: 20px;">Войти</el-button>

    <el-dialog title="Регистрация" :visible.sync="dialogVisible.register" width="20%">
      <el-form :model="registerForm" :rules="rules" ref="registerForm" class="registerForm">
        <el-form-item label="Никнейм" prop="nickname">
          <el-input v-model="registerForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="Майл" prop="mail">
          <el-input v-model="registerForm.mail"></el-input>
        </el-form-item>
        <el-form-item label="Пароль" prop="password">
          <el-input v-model="registerForm.password" :show-password="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitNewAccount()">Создать</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="Вход" :visible.sync="dialogVisible.login" width="20%">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="loginForm">
        <el-form-item label="Майл" prop="mail">
          <el-input v-model="loginForm.mail"></el-input>
        </el-form-item>
        <el-form-item label="Пароль" prop="password">
          <el-input v-model="loginForm.password" :show-password="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitLogin()">Войти</el-button>
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
  name: 'RegisterLoginForm',
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
export default class RegisterLoginForm extends Vue {
  registerForm = {
    nickname: '',
    mail: '',
    password: '',
  };

  loginForm = {
    mail: '',
    password: '',
  };

  dialogVisible = {
    login: false,
    register: false,
  };

  rules = {
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
  };

  submitNewAccount() {
    this.$refs.registerForm.validate((valid) => {
      if (valid) {
        const newAccount = {
          nickname: this.registerForm.nickname,
          mail: this.registerForm.mail,
          password: this.registerForm.password,
          token: uuidv4(),
        }

        this.$store.commit('createAccount', newAccount)
        this.registerForm.nickname = this.registerForm.mail = this.registerForm.password = ''
        this.loginForm.mail = this.loginForm.password = ''
        this.dialogVisible.register = false

        MessageBox.alert('Пользователь создан', 'Done!', {
          confirmButtonText: 'OK',
          center: true
        })
      } else {
        return false
      }
    })
  }

  submitLogin() {
    if (this.$store.getters.getAccount(this.loginForm.mail, this.loginForm.password).length === 1) {
      this.$store.commit('loginAccount', 
                         {mail: this.loginForm.mail, password: this.loginForm.password})
      
      this.loginForm.mail = this.loginForm.password = ''
      this.dialogVisible.login = false
      MessageBox.alert('Вход успешен!', 'Done!', {
        confirmButtonText: 'OK',
        center: true
      })
      this.$parent.$emit('login');
    } else {
      MessageBox.alert('Такого аккаунта нет', 'Error!', {
        confirmButtonText: 'OK',
        center: true
      })
    }
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

