<template>
  <div class="upload-form">
    <h5 class="h5 mb-3 text-center">Данные пациента</h5>
    <el-form :label-position="labelPosition" label-width="100px" :model="form">
      <el-form-item label="ФИО">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Лечущий врач">
        <el-input v-model="form.doctor"></el-input>
      </el-form-item>
      <el-form-item label="Жалобы">
        <el-input v-model="form.complaints"></el-input>
      </el-form-item>
      <el-form-item label="Дата обращения">
        <el-date-picker
          v-model="form.datetime"
          type="datetime"
          placeholder="Select date and time"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="Жалобы">
        <el-input v-model="form.diagnosis"></el-input>
      </el-form-item>
      <el-form-item label="Детальное описание">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success">Сохранить</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        complaints: '',
        doctor: '',
        datetime: null,
        diagnosis: '',
        description: '',
      },
    };
  },
};
</script>

<style lang="scss">
.upload-form {
  text-align: left;

  .el-form-item__label {
    line-height: 17px;
  }
}
</style>
