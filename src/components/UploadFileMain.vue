<template>
  <div class="UploadFileMain">
    <div @click="importClick" class="el-upload el-upload--text">
      <el-button icon="el-icon-upload2" type="warning">
        <span>{{title}}</span>
      </el-button>
      <input :accept="accept" :multiple="true" @change="uploadFile" class="el-upload__input" name="file" ref="input" type="file" />
    </div>
    <ul :key="index" v-for="(item,index) in FileArr">
      <li>{{item}}</li>
    </ul>
  </div>
</template>

<script>
import uploadApi from '../api/upload';

export default {
  components: {},
  created() {},
  data() {
    return {
      LENGTH: 2,
      FileArr: [],
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
        for (let i = 0; i < files.length; i += 1) {
          const fileChunkList = this.createFileChunk(files[i], this.FileArr.length + i);
        }
      }
    },
    //  生成文件 hash（web-worker）
    calculateHash(file) {
      return new Promise((resolve) => {
        // 添加 worker 属性
        const worker = new Worker('./js/hash.js');
        worker.postMessage({ file });
        worker.onmessage = (e) => {
          const hash = e.data;
          resolve(hash);
          console.log('hash', hash);
        };
      });
    },
    // 生成文件切片
    async createFileChunk(file, index) {
      console.log('file', file);
      this.FileArr.push({ name: file.name, percentage: 0 });
      const filename = file.name;

      const hash = await this.calculateHash(file); // 获取文件hash

      const blobSlice = // eslint-disable-line
        File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
      const chunkSize = 2 * 1024 * 1024; // 切片的大小
      const blockCount = Math.ceil(file.size / chunkSize); // 分片总数
      const axiosPromiseArray = [];
      for (let i = 0; i < blockCount; i += 1) {
        const start = i * chunkSize;
        const end = Math.min(file.size, start + chunkSize);
        // 构建表单
        const formData = new FormData();
        formData.append('files', blobSlice.call(file, start, end));
        formData.append('filename', filename);
        formData.append('total', blockCount);
        formData.append('index', i);
        formData.append('size', file.size);
        formData.append('hash', hash);
        axiosPromiseArray.push(uploadApi.upload(formData, this.onProgress, index, file.size));
        // this.$emit('upload-file', file, formData, {
        //   filename: file.name,
        //   total: blockCount,
        //   hash,
        // });
      }
      await Promise.all(axiosPromiseArray);
      await uploadApi.mergeUpload({ filename, total: blockCount, hash });
      console.log(111);
    },
    onProgress(e, index, fileSize) {
      if (e.loaded === e.total) {
        const percent = Math.round((e.total / fileSize) * 100);
        this.$set(this.FileArr[index], 'percentage', (this.FileArr[index].percentage += percent));
        console.log('我是上传进度e', e, index, fileSize, percent);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
