import Vue from 'vue';
import Router from 'vue-router';
import ApiList from '@/views/ApiList';
import Item from '@/views/ApiList/Item';
import CreateOne from '@/views/ApiList/CreateOne';
import CreateTwo from '@/views/ApiList/CreateTwo';
import CreateThree from '@/views/ApiList/CreateThree';
import CreateFour from '@/views/ApiList/CreateFour';
import Account from '@/views/Account';
import Charging from '@/views/Charging';
import ChargingItem from '@/views/Charging/Item';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
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
  ],
});
