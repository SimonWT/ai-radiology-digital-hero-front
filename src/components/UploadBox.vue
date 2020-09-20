<template>
  <div class="upload-box">
    <el-upload
      class="upload-demo"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :file-list="fileList"
      accept="file/png, file/jpeg, file/dcm"
      :auto-upload="false"
      multiple
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        Перетяните файлы сюда или <em>Нажмите чтобы выбрать файлы</em>
      </div>
      <div class="el-upload__tip" slot="tip">
        Файлы, доступные для загрузки:
      </div>
    </el-upload>
    <el-button @click="sumbitUpload" type="primary" class="mt-5"
      >Загрузить</el-button
    >
  </div>
</template>

<script>
export default {
  name: 'UploadBox',
  data() {
    return {
      fileList: [],
    };
  },
  methods: {
    handleChange(file, fileList) {
      console.log(file, fileList);
    },
    handleRemove() {},
    handlePreview() {},
    async sumbitUpload() {
      await setTimeout(() => {
        this.$notify({
          title: 'Успех',
          message: 'Файлы загруженны на сервер',
          type: 'success',
        });
        this.$emit('uploaded')
        this.fileList = []
      }, 100);
    //   await this.axios.post('/back');
    },
  },
};
</script>

<style lang="scss">
.upload-box {
  flex-direction: column;
  display: flex;
  align-items: center;
}

.upload-demo {
  text-align: left;
  width: 365px;
}
</style>
