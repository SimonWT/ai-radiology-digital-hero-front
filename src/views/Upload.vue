<template>
  <div class="upload-page">
    <h1 class="h1 mt-5 mb-5">Загрузка снимков</h1>
    <h5 class="h5">Достускаются разрешения файлов: DICOM, PNG, JPG</h5>
    <UploadBox @uploaded="uploaded" class="mt-5" />
  </div>
</template>

<script>
import UploadBox from '@/components/UploadBox';

export default {
  components: { UploadBox },
  methods: {
    uploaded() {
      this.$emit('show-history');
    },
  },
};
</script>

<style lang="scss"></style>
