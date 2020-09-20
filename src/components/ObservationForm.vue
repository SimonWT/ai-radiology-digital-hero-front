<template>
  <div class="upload-form">
    <h5 class="h5 mb-3 text-center">Данные пациента</h5>
    <el-form :label-position="'left'" label-width="100px" :model="form">
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
      <el-form-item label="Патологии">
        <el-table :data="pathologies" border style="width: 100%">
          <el-table-column prop="name" label="Патология"></el-table-column>
          <el-table-column prop="name" label="Предсказание">
            <template slot-scope="scope">
              <el-checkbox :value="pathologies[scope.$index].pred > 0" disabled>
              </el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="Подтверждаю">
            <template slot-scope="scope">
              <el-checkbox
                v-model="pathologies[scope.$index].approve"
              ></el-checkbox>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button class="mb-1" type="success">Сохранить</el-button>
        <el-button class="" type="">Отправить на дообучение</el-button>
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
      pathologies: [
        { name: 'Atelectasis', pred: 5, approve: false },
        { name: 'Cardiomegaly', pred: 0, approve: false },
        { name: 'Effusion', pred: 4, approve: false },
        { name: 'Infiltration', pred: 6, approve: false },
        { name: 'Mass', pred: 16, approve: false },
        { name: 'Nodule', pred: 0, approve: false },
        { name: 'Pneumonia', pred: 72, approve: false },
        { name: 'Pneumothorax', pred: 2, approve: false },
        { name: 'Consolidation', pred: 0, approve: false },
        { name: 'Edema', pred: 0, approve: false },
        { name: 'Emphysema', pred: 0, approve: false },
        { name: 'Fibrosis', pred: 0, approve: false },
        { name: 'Pleural_Thickening', pred: 0, approve: false },
        { name: 'Hernia', pred: 0, approve: false },
      ],
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
