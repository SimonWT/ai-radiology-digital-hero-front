<template>
  <div class="observation">
    {{ observation.id }}
    <el-row>
      <el-col :span="12">
        <ObservationForm ref="form" :isPatient="isPatient" :observation="observation" />
      </el-col>
      <el-col :span="12" class="viewer">
        <DicomViewer ref="viewer" :isPatient="isPatient" :observation="observation" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ObservationForm from '@/components/ObservationForm';
import DicomViewer from '@/components/DicomViewer';
import { fbApp } from '../main';
import store from '../store';

export default {
  components: { ObservationForm, DicomViewer },
  props: {
    isPatient: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    observation() {
      return store.getters.observation;
    },
  },
  beforeRouteUpdate(to,from,next){
    this.$refs.viewer.updateDwv()
    this.$refs.form.loadDatabaseData()
  },
  beforeRouteEnter(to, from, next) {
    if (
      Object.keys(store.getters.observation).length > 0 &&
      store.getters.observation.id === to.params.id
    ) {
      next();
    } else {
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
    }
  },
};
</script>

<style lang="scss">
.observation {
}
</style>
