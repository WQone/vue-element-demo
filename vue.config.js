/**
 * @param {string} baseUrl 公共路径
 * @param {string} outputDir 输出目录
 * @param {string} assetsDir 用于嵌套生成静态资产的目录
 * @param {string} productionSourceMap 是否构建map文件
 */
module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://www.baidu.com/',
        ws: true,
        changeOrigin: true
      },
    }, // api代理
    overlay: {
      warnings: true,
      errors: true
    } // 浏览器 overlay 同时显示警告和错误：
  },
  // lintOnSave: 'error', // lint 错误在开发时直接显示在浏览器中
};
