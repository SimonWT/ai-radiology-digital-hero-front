<template>
  <div
    class="upload-form"
    v-loading="loading"
    :class="{ 'is-patient': isPatient }"
  >
    <h5 class="h5 mb-3 text-center">Данные пациента</h5>
    <el-form :label-position="'left'" label-width="100px" :model="form">
      <el-form-item label="ФИО">
        <el-input :disabled="isPatient" v-model="form.Fullname"></el-input>
      </el-form-item>
      <el-form-item label="Лечущий врач">
        <el-input v-model="form.HealingDoctor" :disabled="isPatient"></el-input>
      </el-form-item>
      <el-form-item label="Жалобы">
        <el-input :disabled="isPatient" v-model="form.Сomplaints"></el-input>
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
        <el-input
          type="textarea"
          :disabled="isPatient"
          v-model="form.Description"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="Патологии"
        v-loading="!observation.Predicted"
        element-loading-text="Данные еще обрабатываются..."
      >
        <el-checkbox
          v-for="(pat, i) in pathologiesApproves"
          :key="i"
          v-model="pat.value"
          :label="pat.label"
          :disabled="isPatient"
          border
        ></el-checkbox>
      </el-form-item>
      <el-form-item label="Дообучение" v-if="!isPatient">
        <el-button
          v-if="!AdditionalTraining"
          @click="AdditionalTraining = true"
          class=""
          type=""
          >Отправить на дообучение</el-button
        >
        <el-button
          v-else
          class=""
          @click="AdditionalTraining = false"
          type="danger"
          ><i class="el-icon-circle-close mr-1" />Убрать с дообучения</el-button
        >
      </el-form-item>
      <el-form-item v-if="!isPatient">
        <el-button class="mb-1" type="success" @click="saveForm"
          >Сохранить</el-button
        >
      </el-form-item>
    </el-form>
    <div v-if="!isPatient">
      <p class="font-weight-bold">Скачать:</p>
      <el-button class="mb-1" type="" @click.prevent="downloadReport('sr')"
        ><i class="el-icon-notebook-2" /> SR отчет</el-button
      >
      <el-button class="" type="" @click.prevent="downloadReport('docx')"
        ><i class="el-icon-document" />Текстовый отчет</el-button
      >
      <el-button class="" type="">
        <i class="el-icon-circle-check" />
        <a
          href="../assets/soglasie_pacienta_na_obrabotku_personalnykh_dannyk.pdf"
          download="soglasie.pdf"
        >
          Согласие на обработку персональных данных</a
        ></el-button
      >
    </div>
  </div>
</template>

<script>
import { fbApp } from '../main';

export default {
  name: 'ObservationForm',
  props: {
    observation: {},
    isPatient: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      AdditionalTraining: false,
      form: {
        Fullname: '',
        Сomplaints: '',
        HealingDoctor: '',
        datetime: null,
        Description: '',
      },
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
    this.loadDatabaseData();
  },
  methods: {
    async downloadReport(format) {
      const Predictions = {};
      this.pathologiesApproves.map((el) => {
        Predictions[el.label] = el.value ? 1 : 0;
      });
      const body = {
        patient_name: this.form.Fullname,
        doctor_name: this.form.HealingDoctor,
        date: this.observation.Date,
        description: this.form.Description,
        pathologies: Predictions,
      };
      const response = await this.axios.post(
        `http://127.0.0.1:5000/get_${format}`,
        body
      );
      const downloadUrl = response.data.path;
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `report.${format === 'sr'? 'dcm' : format}`); //any other extension
      document.body.appendChild(link);
      link.click();
      link.remove();
    },
    loadDatabaseData() {
      if (this.observation.PatientInfo) {
        this.form = this.observation.PatientInfo;
      }
      this.pathologiesApproves = Object.keys(this.observation.Predictions).map(
        (el) => {
          return { label: el, value: this.observation.Predictions[el] > 0 };
        }
      );
      this.form.datetime = new Date(this.observation.Date);
      this.AdditionalTraining =
        this.observation.AdditionalTraining ?? this.AdditionalTraining;
    },
    async saveForm() {
      this.loading = true;
      const PatientInfo = {
        Fullname: this.form.Fullname,
        HealingDoctor: this.form.HealingDoctor,
        Сomplaints: this.form.Сomplaints,
        Description: this.form.Description,
      };

      const Predictions = {};
      this.pathologiesApproves.map((el) => {
        Predictions[el.label] = el.value ? 1 : 0;
      });

      fbApp
        .database()
        .ref(`History/${this.observation.id}`)
        .update({
          PatientInfo: PatientInfo,
          Predictions: Predictions,
          AdditionalTraining: this.AdditionalTraining,
        })
        .catch((error) => this.$message.error('Ошибка ' + error))
        .then((resp) => this.$message.success('Изменения сохранены'))
        .finally(() => (this.loading = false));
    },
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
  &.is-patient {
    .el-textarea__inner,
    .el-input__inner,
    .el-checkbox__label {
      color: black !important;
    }
    .el-checkbox__inner {
      // background-color: #409EFF !important;
      // border-color: #409EFF !important;
      &:after {
        border-color: #409eff !important;
      }
    }
  }
}
</style>
