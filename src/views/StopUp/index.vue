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
    return {};
  },
  methods: {
    uploadFile(file) {
      console.log(77);
      uploadApi.upload(file).then((res) => {
        console.log(88, res);
        console.log(file);
      });
    },
  },
};
</script>

<style scoped lang="scss">
</style>
