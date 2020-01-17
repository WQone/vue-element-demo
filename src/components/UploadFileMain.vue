<template>
  <div class="UploadFileMain">
    <div @click="importClick" class="el-upload el-upload--text">
      <el-button icon="el-icon-upload2" type="warning">
        <span>{{title}}</span>
      </el-button>
      <input :accept="accept" :multiple="true" @change="uploadFile" class="el-upload__input" name="file" ref="input" type="file" />
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  created() {},
  data() {
    return {
      LENGTH: 2,
    };
  },
  props: {
    title: {
      type: String,
      default: '文件上传',
    },
    isDisabled: {
      type: [Boolean],
      default() {
        return false;
      },
    },
    accept: {
      type: String,
      default: '',
    },
  },
  methods: {
    importClick() {
      this.$refs.input.value = null;
      this.$refs.input.click();
    },
    uploadFile(e) {
      if (!this.isDisabled) {
        const files = e.target.files;
        const formData = new FormData();
        for (let i = 0; i < files.length; i += 1) {
          const fileChunkList = this.createFileChunk(files[i]);
          console.log(files, fileChunkList);
          for (let j = 0; j < fileChunkList.length; j += 1) {
            const fileChunkObj = {
              chunk: fileChunkList[j],
              hash: `${files[i].name}-${j}`, // 文件名 + 数组下标
            };
            // formData.append('files', fileChunkList[j]);
          }
          formData.append('files', files[i]);
        }
        console.log(formData);
        this.$emit('upload-file', formData);
      }
    },
    // 生成文件切片
    createFileChunk(file) {
      const fileChunkList = [];
      const chunkSize = Math.ceil(file.size / this.LENGTH);
      let cur = 0;
      while (cur < file.size) {
        fileChunkList.push({ file: file.slice(cur, cur + chunkSize) });
        cur += chunkSize;
      }
      return fileChunkList;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
