import api from './index';

const path = {
  apiFind: '/api/find', // 获取数据
  apiAdd: '/api/add', // 新增API
  getInfo: '/api/detail', // API详情
  chargingList: '/api/free/list', // 计费管理
  accountList: '/api/account/list', // 对账列表
  accountExport: '/api/account/export', // 对账导出
};

// 获取数据
const apiFind = (page, count, groupId, apiName) =>
  api.get(path.apiFind, {
    params: {
      page,
      count,
      groupId,
      apiName,
    },
  });

// 新增API
const apiAdd = (form) => api.post(path.apiAdd, form);

const getInfo = (id) => api.get(`${path.getInfo}/${id}`);

// 获取数据
const chargingList = (page, count, groupId, apiName, dateValue) =>
  api.get(path.chargingList, {
    params: {
      page,
      count,
      groupId,
      apiName,
      dateValue,
    },
  });

// 获取数据
const accountList = (page, count, apiName) =>
  api.get(path.accountList, {
    params: {
      page,
      count,
      apiName,
    },
  });

  // 文件导出
const accountExport = (form) => {
  let url = `http://192.168.10.149:8080/${path.accountExport}?`;
  const keys = Object.keys(form);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    url += `&${key}=${form[key]}`;
  }
  return encodeURI(url);
};

export default {
  apiFind,
  apiAdd,
  getInfo,
  chargingList,
  accountList,
  accountExport,
};
