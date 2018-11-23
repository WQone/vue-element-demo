import Vue from 'vue';
import Router from 'vue-router';
import ExportPdf from '@/views/ExportPdf';
import ExportExcel from '@/views/ExportExcel';
import UploadExcel from '@/views/UploadExcel';
import ShowPdf from '@/views/ShowPdf';
import Test from '@/views/Test';

Vue.use(Router);

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/ExportPdf',
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
    {
      path: '/ShowPdf',
      name: '文件测试',
      component: ShowPdf,
    },
    {
      path: '/Test',
      name: 'Test',
      component: Test,
    },
  ],
});
