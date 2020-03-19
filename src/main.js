import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/reset.css';
import './element';
import App from './App';
import router from './router';
import store from './store';
import './registerServiceWorker';
import api from './api/auth';
import mockjsInit from './api/mock'; // 添加mockjs拦截请求，模拟返回服务器数据

// mockjsInit();
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
