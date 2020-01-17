/**
 * @param {string} baseUrl 公共路径
 * @param {string} outputDir 输出目录
 * @param {string} assetsDir 用于嵌套生成静态资产的目录
 * @param {string} productionSourceMap 是否构建map文件
 */
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}
const basePage = {
  index: {
    // page 的入口
    entry: 'src/main.js',
    template: 'public/index.html',
    filename: 'index.html',
    title: '测试demo',
    chunks: ['chunk-vendors', 'chunk-common', 'index'],
  },
};

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  pages: basePage,
  devServer: {
    host: '0.0.0.0',
    port: 80,
    proxy: {
      '/api': {
        target: 'http://192.168.10.124:1024/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/',
        },
      },
    }, // api代理
    overlay: {
      warnings: true,
      errors: true,
    }, // 浏览器 overlay 同时显示警告和错误：
  },
  chainWebpack: (config) => {
    // config.plugins.delete('preload'); // TODO: need test
    // config.plugins.delete('prefetch'); // TODO: need test
    config.resolve.alias.set('@request', resolve('src/api')).set('@', resolve('src'));
  },
  // lintOnSave: 'error', // lint 错误在开发时直接显示在浏览器中
};
