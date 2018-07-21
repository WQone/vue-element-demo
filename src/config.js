// 配置文件
//  (地址配置均以/结尾，后续无需再加)

// 开发环境 (dev)
let apiHost = `${location.protocol}//${location.host}/api/`;

if (process.env.NODE_ENV && process.env.NODE_ENV === 'master') {
  apiHost = 'http://121.9.245.185:8088/';
}

console.log(process.env.NODE_ENV);

export default {
  apiHost,
};
