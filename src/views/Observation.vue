<template>
  <div class="observation">
    <el-row>
      <el-col :span="9">
        <ObservationForm />
      </el-col>
      <el-col :span="15" class="viewer">
          <DicomViewer />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ObservationForm from '@/components/ObservationForm';
import DicomViewer from '@/components/DicomViewer';

export default {
  components: { ObservationForm, DicomViewer },
};
</script>

<style lang="scss">
.observation {
}
</style>
