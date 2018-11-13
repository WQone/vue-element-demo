/**
 * @param {string} baseUrl 公共路径
 * @param {string} outputDir 输出目录
 * @param {string} assetsDir 用于嵌套生成静态资产的目录
 * @param {string} productionSourceMap 是否构建map文件
 */
module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/vue-element-demo/' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
};
