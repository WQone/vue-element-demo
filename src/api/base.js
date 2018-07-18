import api from './index';

const path = {
  apiFind: '/api/find', // 获取数据
  apiAdd: '/api/add', // 新增API
  getInfo: 'api/detail', // API详情
};

// 获取数据
const apiFind = (groupId, apiName) =>
  api.get(path.apiFind, {
    params: {
      groupId,
      apiName,
    },
  });

// 新增API
const apiAdd = (form) =>
  api.post(path.apiAdd, JSON.parse(form));

const getInfo = (id) => api.get(`${path.getInfo}/${id}`);

export default {
  apiFind,
  apiAdd,
  getInfo,
};
