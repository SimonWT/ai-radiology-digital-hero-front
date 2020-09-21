<template>
  <div>
    <el-dialog
      title="Доступ Пациенту"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span class="text-left">
        <div class="link">
          Ссылка: <a target="_blank" :href="baseLink + key">{{baseLink + key}}</a>
        </div>
        <div class="password">Пароль для входа: {{code}}</div>
      </span>
      <span slot="footer">
        <el-button type="primary" @click="dialogVisible = false"
          >Закрыть</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    link: {},
    password: {},
  },
  data() {
    return {
      dialogVisible: false,
      baseLink: 'http://localhost:8080/patient/report/',
      key: '',
      code: ''
    };
  },
  methods: {
    open(key, code) {
      this.key = key;
      this.code = code;
      this.dialogVisible = true;
    },
  },
};
</script>
