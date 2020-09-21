<template>
  <div class="upload-box" v-loading="loading">
    <el-upload
      class="upload-demo"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :file-list="fileList"
      accept=".png, .jpeg, .dcm"
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
import { backendUrl } from '../main';

export default {
  name: 'UploadBox',
  data() {
    return {
      fileList: [],
      loading: false
    };
  },
  methods: {
    handleChange(file, fileList) {
        if(file)
        this.fileList = fileList
    },
    handleRemove() {},
    handlePreview() {},
    async sumbitUpload() {
      this.loading = true
      const form = new FormData();
      this.fileList.forEach(el => {
          console.log(el.name)
          form.append('file[]', el.raw, el.name);
      })
      this.axios({
        method: 'POST',
        url: `${backendUrl}/uploader`,
        data: form,
        headers: {
          'content-type': `multipart/form-data;`,
        },
      }).then(resp=>{
        this.$notify({
          title: 'Успех',
          message: 'Файлы загруженны на сервер',
          type: 'success',
        })
        this.$emit('uploaded');
        this.fileList = [];
      })
      .catch(() => {
        this.$message.error('Ошибка загрузки. Попробуйте еще раз.')
      })
      .finally(() =>  this.loading = false);
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
