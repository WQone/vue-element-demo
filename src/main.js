// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueBus from 'vue-bus';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/reset.css';
import './element';
import App from './App';
import router from './router';
import store from './vuex/store';

Vue.use(VueBus);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
