<template>
  <div>
    <iframe :src="url" style="width:100%;height:500px;"></iframe>
    <input @change="handleClick" accept=".xlsx, .xls, .pdf" id="excel-upload-input" ref="excel-upload-input" type="file">
    <el-button @click="handleUpload" size="mini" style="margin-left:16px;" type="primary">导入PDF</el-button>
  </div>
</template>

<script>
/* eslint-disable */
import auth from '@/api/auth';

export default {
  data() {
    return {
      loading: false,
      url: '',
    };
  },
  methods: {
    handleUpload() {
      document.getElementById('excel-upload-input').click();
    },
    handleClick(e) {
      const files = e.target.files;
      const rawFile = files[0]; // only use files[0]
      console.log(rawFile, 'rawFile');
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target.result; // result是你读取到的文件内容，此属性读取完成才能使用
        //  去掉url的头，并转换为byte
        const bytes = window.atob(base64.split(',')[1]);
        const type = base64.split(',')[0].match(/:(.*?);/)[1];
        //  处理异常,将ascii码小于0的转换为大于0
        const buffer = new ArrayBuffer(bytes.length);
        const ua = new Uint8Array(buffer);
        for (let i = 0; i < bytes.length; i += 1) {
          ua[i] = bytes.charCodeAt(i);
        }
        this.url = window.URL.createObjectURL(
          new Blob([buffer], {
            type,
          }),
        );
        console.log(this.url);
      };
      reader.readAsDataURL(rawFile);
    },
  },
};
</script>

<style scoped>
#excel-upload-input {
  display: none;
  z-index: -9999;
}
#drop {
  border: 2px dashed #bbb;
  width: 600px;
  height: 160px;
  line-height: 160px;
  margin: 0 auto;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
</style>
