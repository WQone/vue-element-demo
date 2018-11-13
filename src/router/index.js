import Vue from 'vue';
import Router from 'vue-router';
import ExportPdf from '@/views/ExportPdf';
import ExportExcel from '@/views/ExportExcel';
import UploadExcel from '@/views/UploadExcel';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "about" */ '@/views/Home.vue'),
      redirect: '/ExportPdf',
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
    },
    {
      path: '/ExportPdf',
      name: '导出PDF',
      component: ExportPdf,
    },
    {
      path: '/ExportExcel',
      name: '导出',
      component: ExportExcel,
    },
    {
      path: '/UploadExcel',
      name: '导入',
      component: UploadExcel,
    },
  ],
});
