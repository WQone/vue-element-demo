import api from './index';

const path = {
  pageItem: '/page/item', // 首页获取数量
};

// 首页获取数量
const pageItem = (gpoMemerId) =>
  api.get(path.pageItem, {
    params: {
      gpoMemerId,
    },
  });

export default {
  pageItem,
};
