import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/reset.css';
import './element';
import App from './App';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
