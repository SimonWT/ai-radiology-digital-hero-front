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
          disabled
          placeholder="Select date and time"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="Детальное описание">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="Патологии" v-loading="!predictionReady" element-loading-text="Данные еще обрабатываются...">
        <el-checkbox
          v-for="(pat, i) in pathologiesApproves"
          :key="i"
          v-model="pat.value"
          :label="pat.label"
          border
        ></el-checkbox>
      </el-form-item>
      <el-form-item >
        <el-button class="mb-1" type="success">Сохранить</el-button>
        <el-button class="" type="">Отправить на дообучение</el-button>
      </el-form-item>
    </el-form>
    <div>
      <p class="font-weight-bold">Скачать:</p>
       <el-button class="mb-1" type=""><i class="el-icon-notebook-2" />SR отчет</el-button>
        <el-button class="" type=""><i class="el-icon-document" />Текстовый отчет</el-button>
        <el-button class="" type=""> <i class="el-icon-circle-check"/> Согласие на обработку персональных данных</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ObservationForm",
  props: {
    observation:{}
  },
  data() {
    return {
      predictionReady: true,
      form: {
        name: '',
        complaints: '',
        doctor: '',
        datetime: null,
        diagnosis: '',
        description: '',
      },
      pathologies2: [
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
      pathologies: {
        Atelectasis: 5,
        Cardiomegaly: 0,
        Effusion: 4,
        Infiltration: 6,
        Mass: 16,
        Nodule: 0,
        Pneumonia: 72,
        Pneumothorax: 2,
        Consolidation: 0,
        Edema: 0,
        Emphysema: 0,
        Fibrosis: 0,
        Pleural_Thickening: 0,
        Hernia: 0,
      },
      pathologiesApproves: [],
    };
  },
  mounted() {
    this.pathologiesApproves = Object.keys(this.observation.Predicitons).map((el) => {
      return { label: el, value: this.observation.Predicitons[el] > 0 };
    });
    this.form.datetime = Date(this.observation.Date)
  },
};
</script>

<style lang="scss">
.upload-form {
  text-align: left;

  .el-form-item__label {
    line-height: 17px;
  }

  .el-checkbox {
    width: 169px;
    margin-right: 15px !important;
    margin-left: 10px;
  }
}
</style>
