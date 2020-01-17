import api from './index';

const path = {
  star: '/star', // 首页获取数量
};

const star = (page, size) => api.get(path.star, {
  params: {
    page,
    size,
  },
});

export default {
  path,
  star,
};
