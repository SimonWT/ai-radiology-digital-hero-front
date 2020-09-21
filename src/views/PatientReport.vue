<template>
  <div class="patient-report">
    <el-row v-if="loggedIn">
      <el-col :span="12">
        <ObservationForm
          ref="form"
          :isPatient="true"
          :propObservation="observation"
        />
      </el-col>
      <el-col :span="12" class="viewer">
        <DicomViewer
          ref="viewer"
          :isPatient="true"
          :propObservation="observation"
        />
      </el-col>
    </el-row>
    <div v-else class="code-input">
      <el-card>
        <el-form :model="form">
          <el-form-item label="Код доступа">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="onSubmit">Войти</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import ObservationForm from '@/components/ObservationForm';
import DicomViewer from '@/components/DicomViewer';
import { fbApp } from '../main';
import store from '../store';

export default {
  name: 'PatientReport',
  components: { ObservationForm, DicomViewer },
  data() {
    return {
      password: '123456',
      loggedIn: false,
      form: {
        code: '',
      },
    };
  },
  computed: {
    observation() {
      return store.getters.observation;
    },
  },
  methods:{
      onSubmit(){
          if(this.form.code === this.observation.PatientPassword) this.loggedIn = true
      }
  },
  beforeRouteUpdate(to, from, next) {
    this.$refs.viewer.updateDwv();
    this.$refs.form.loadDatabaseData();
  },
  beforeRouteEnter(to, from, next) {
    fbApp
      .database()
      .ref('History/' + to.params.id)
      .once('value')
      .then((snapshot) => {
        var id = snapshot.key;
        var observation = { id, ...snapshot.val() };
        store.dispatch('setObservation', observation);
        next();
      });
  },
};
</script>

<style lang="scss" scoped>
.code-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
}

.el-card {
  width: 360px;
}
</style>
