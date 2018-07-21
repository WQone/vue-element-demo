import api from './index';
import config from '../config';

const path = {
  apiFind: '/api/find', // 获取数据
  apiAdd: '/api/add', // 新增API
  getInfo: '/api/detail', // API详情
  chargingList: '/api/free/list', // 计费管理
  accountList: '/api/account/list', // 对账列表
  accountExport: '/api/account/export', // 对账导出
  routeTest: '/api/route/test', // 调用API
  apiAmount: '/api/amount', //  计费详情
  graphAmount: '/api/graph', //  计费图表
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
const accountList = (page, count, factoryName) =>
  api.get(path.accountList, {
    params: {
      page,
      count,
      factoryName,
    },
  });

// 文件导出
const accountExport = (form) => {
  let url = `${config.apiHost}${path.accountExport}?`;
  const keys = Object.keys(form);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    url += `&${key}=${form[key]}`;
  }
  return encodeURI(url);
};

const routeTest = (apiId, params) =>
  api.get(path.routeTest, {
    params: {
      apiId,
      params: {},
    },
  });

const apiAmount = (page, count, apiId, apiName, startTime, endTime) =>
  api.get(path.apiAmount, {
    params: {
      page,
      count,
      apiId,
      apiName,
      startTime,
      endTime,
    },
  });

const graphAmount = (id) => api.get(`${path.graphAmount}/${id}`);

export default {
  apiFind,
  apiAdd,
  getInfo,
  chargingList,
  accountList,
  accountExport,
  routeTest,
  apiAmount,
  graphAmount,
};
