import Vue from 'vue';
import Router from 'vue-router';
import ExportPdf from '@/views/ExportPdf';
import ExportExcel from '@/views/ExportExcel';
import UploadExcel from '@/views/UploadExcel';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/ApiList',
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
