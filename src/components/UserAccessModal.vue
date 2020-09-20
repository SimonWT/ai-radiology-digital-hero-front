<template>
  <div>
    <el-dialog
      title="Доступ Пациенту"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span class="text-left">
        <div class="link">Ссылка: <a href="">http://нашхост/obserbation/hash</a></div>
        <div class="password">Пароль для входа: 123456</div>
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
    };
  },
  methods: {
    open() {
      this.dialogVisible = true;
    },
  },
};
</script>
