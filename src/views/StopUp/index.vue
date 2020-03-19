<template>
  <div>
    <UploadFileMain @upload-file="uploadFile"></UploadFileMain>
  </div>
</template>

<script>
import uploadApi from '../../api/upload';
import UploadFileMain from '../../components/UploadFileMain';

export default {
  components: {
    UploadFileMain,
  },
  data() {
    return {
      fileInfo: null,
    };
  },
  methods: {
    uploadFile(file, formData, fileInfo) {
      console.log('触发上传', file);
    //   this.fileInfo = fileInfo;
    //   uploadApi.upload(formData).then((res) => {
    //     // console.log(file);
    //   });
    },
    margeAll() {
    //   console.log('合并上传', 'name, total, hash');
    //   const filename = this.fileInfo.filename;
    //   const total = this.fileInfo.total;
    //   const hash = this.fileInfo.hash;
    //   uploadApi.mergeUpload({ filename, total, hash }).then((res) => {
    //     // console.log(file);
    //   });
    },
  },
};
</script>

<style scoped lang="scss">
</style>
