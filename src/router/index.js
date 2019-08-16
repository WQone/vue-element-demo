import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/Layout';
import ExportPdf from '@/views/ExportPdf';
import ExportExcel from '@/views/ExportExcel';
import UploadExcel from '@/views/UploadExcel';
import ShowPdf from '@/views/ShowPdf';
import Test from '@/views/Test';
import UploadPdf from '@/views/UploadPdf';
import Car from '@/views/Car';
import TestItem from '@/views/Test/Item';
import BigData from '@/views/BigData';
import Scroll from '@/views/Scroll';

Vue.use(Router);

const staticRoutes = {
  path: '/',
  component: Layout,
  children: [
    {
      path: '/Car',
      name: '汽车',
      component: Car,
      meta: { title: '汽车' },
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
      path: '/UploadPdf',
      name: 'UploadPdf',
      component: UploadPdf,
    },
    {
      path: '/Scroll',
      name: 'Scroll',
      component: Scroll,
    },
  ],
};

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/BigData',
      name: 'BigData',
      component: BigData,
    },
    staticRoutes,
    {
      path: '',
      component: Layout,
      redirect: 'Car',
      children: [
        {
          path: 'Car',
          component: Car,
          name: 'Car',
          meta: { title: 'Car' },
        },
      ],
    },
    {
      path: '/Test',
      component: Layout,
      redirect: '/Test/index',
      meta: { title: 'Test' },
      children: [
        {
          path: 'index',
          component: Test,
          name: 'Test',
        },
        {
          path: 'Item/:id',
          component: TestItem,
          name: 'TestItem',
          meta: { title: 'TestItem' },
        },
      ],
    },
  ],
});
