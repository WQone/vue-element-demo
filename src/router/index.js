import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/Layout';
import ExportPdf from '@/views/ExportPdf';
import ExportExcel from '@/views/ExportExcel';
import UploadExcel from '@/views/UploadExcel';
import ShowPdf from '@/views/ShowPdf';
import Test from '@/views/Test';
import UploadPdf from '@/views/UploadPdf';
import StopUp from '@/views/StopUp';
import TestItem from '@/views/Test/Item';
import BigData from '@/views/BigData';
import Scroll from '@/views/Scroll';

Vue.use(Router);

export const staticRoutes = [
  {
    path: '/Test',
    component: () => import('@/views/Layout/Black'),
    name: '简化',
    redirect: '/Test/index',
    children: [
      {
        path: 'index',
        component: Test,
      },
      {
        path: 'Item/:id',
        component: TestItem,
        name: 'TestItem',
        meta: { title: 'TestItem' },
      },
    ],
  },
  {
    path: '/ExportPdf',
    name: '导出PDF',
    component: ExportPdf,
  },
  {
    path: '/ExportExcel',
    name: '导出Excel',
    component: ExportExcel,
  },
  {
    path: '/UploadExcel',
    name: '导入Excel',
    component: UploadExcel,
  },
  {
    path: '/ShowPdf',
    name: '文件测试',
    component: ShowPdf,
  },
  {
    path: '/UploadPdf',
    name: '上传PDF',
    component: UploadPdf,
  },
  {
    path: '/Scroll',
    name: '滚动',
    component: Scroll,
  },
  {
    path: '/StopUp',
    name: '断点上传',
    component: StopUp,
  },
  {
    path: '/BigData',
    name: '大屏',
    component: BigData,
  },
];

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Layout,
      children: [...staticRoutes],
    },
  ],
});
