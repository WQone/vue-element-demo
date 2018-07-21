import Vue from 'vue';
import Router from 'vue-router';

const ApiList = (resolve) => require(['@/views/ApiList'], resolve);
const Item = (resolve) => require(['@/views/ApiList/Item'], resolve);
const CreateOne = (resolve) => require(['@/views/ApiList/CreateOne'], resolve);
const CreateTwo = (resolve) => require(['@/views/ApiList/CreateTwo'], resolve);
const CreateThree = (resolve) => require(['@/views/ApiList/CreateThree'], resolve);
const CreateFour = (resolve) => require(['@/views/ApiList/CreateFour'], resolve);
const Account = (resolve) => require(['@/views/Account'], resolve);
const Charging = (resolve) => require(['@/views/Charging'], resolve);
const ChargingItem = (resolve) => require(['@/views/Charging/Item'], resolve);
const NotFound = (resolve) => require(['@/views/NotFound'], resolve);

Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/ApiList',
    },
    {
      path: '/ApiList',
      name: 'ApiList',
      component: ApiList,
    },
    {
      path: '/ApiList/Item',
      name: 'Item',
      component: Item,
    },
    {
      path: '/CreateOne',
      name: 'CreateOne',
      component: CreateOne,
    },
    {
      path: '/CreateTwo',
      name: 'CreateTwo',
      component: CreateTwo,
    },
    {
      path: '/CreateThree',
      name: 'CreateThree',
      component: CreateThree,
    },
    {
      path: '/CreateFour',
      name: 'CreateFour',
      component: CreateFour,
    },
    {
      path: '/Account',
      name: 'Account',
      component: Account,
    },
    {
      path: '/Charging',
      name: 'Charging',
      component: Charging,
    },
    {
      path: '/Charging/Item',
      name: 'ChargingItem',
      component: ChargingItem,
    },
    {
      path: '*',
      name: '404',
      component: NotFound,
    },
  ],
});
