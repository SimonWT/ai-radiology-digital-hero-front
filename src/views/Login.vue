<template>
  <div class="login">
    <el-card class="login-card">
      <h5 class="h5 mb-4">Авторизация</h5>
      <el-form
        class="login-form"
        :model="form"
        :rules="rules"
        ref="form"
        @submit.native.prevent="submit"
        style=""
      >
        <el-form-item prop="login">
          <el-input v-model="form.login" placeholder="Логин"></el-input>
        </el-form-item>
        <el-form-item prop="password" style="margin-bottom: 35px;">
          <el-input
            v-model="form.password"
            placeholder="Password"
            type="password"
          ></el-input>
        </el-form-item>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <el-form-item
          style="display: flex; flex-direction: column; align-items: center;"
        >
          <el-button
            :loading="loading"
            class="login-button"
            type="primary"
            native-type="submit"
            block
            >Войти</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { fbApp } from '../main';

export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        // this.allow = false
        callback(new Error('Please input the password again'));
      } else if (value !== this.resetForm.password) {
        // this.allow = false
        callback(new Error("Two passwords don't match!"));
      } else {
        // this.allow = true
        callback();
      }
    };
    return {
      form: {
        login: '',
        password: '',
      },
      error: null,
      loading: false,
      rules: {
        login: [
          {
            required: true,
            message: 'Введите логин',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: 'Password is required', trigger: 'blur' },
          {
            min: 5,
            message: 'Пароль длинее 5 симвовол',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    submit() {
      this.loading = true;
      fbApp
        .auth()
        .signInWithEmailAndPassword(this.form.login, this.form.password)
        .then((data) => {
          console.log('sign in', data.user);
          this.$store.dispatch('fetchUser', data.user).then(() => {
            this.$router.replace('/');
          });
          console.log('login', data);
        })
        .catch((err) => {
          this.error = err.message;
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style lang="scss">
.login-card {
  width: 360px;
  padding: 20px 40px 10px;
}
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 200px);
}
</style>
