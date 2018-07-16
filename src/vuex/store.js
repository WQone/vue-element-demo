import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';

Vue.use(Vuex);

// 创建 store 实例
export default new Vuex.Store({
  modules,
});
