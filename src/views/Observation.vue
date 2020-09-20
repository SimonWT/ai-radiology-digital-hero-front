<template>
  <div class="observation">
    <el-row>
      <el-col :span="8">
        <ObservationForm />
      </el-col>
      <el-col :span="13" class="viewer"> </el-col>
      <el-col :span="0" class="tools">
        <el-button type="primary" class="mb-2"
          >Загрузить предсказание</el-button
        >
        <el-button type="success">Показать предсказание </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ObservationForm from '@/components/ObservationForm';

export default {
  components: { ObservationForm },
};
</script>

<style lang="scss">
.observation {
}
</style>
