import api from '@request';

const path = {
  upload: '/upload', // 上传
  mergeUpload: '/merge_upload', // 上传
};

const upload = (formData, onProgress, index, fileSize) => api.post(path.upload, formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  onUploadProgress(e) {
    // 处理上传的进度
    onProgress(e, index, fileSize);
  },
});

const mergeUpload = (form) => api.post(
  path.mergeUpload, { ...form },
);

export default {
  path,
  upload,
  mergeUpload,
};
