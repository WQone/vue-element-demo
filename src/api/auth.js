import api from '@request';

const path = {
  pageItem: '/page/item', // 首页获取数量
};

// 首页获取数量
const pageItem1 = (file) => api.post(path.pageItem, file);

const pageItem2 = (gpoMemerId) => api.post(path.pageItem, gpoMemerId, { headers: { 'Content-Type': 'multipart/form-data' } });

const pageItem = (gpoMemerId) => api.post(path.pageItem, { gpoMemerId });

export default {
  path,
  pageItem,
};
