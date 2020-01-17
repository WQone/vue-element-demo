import api from '@request';

const path = {
  upload: '/upload', // 上传
};

const upload = (formData) => api.post(path.upload, formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export default {
  path,
  upload,
};
