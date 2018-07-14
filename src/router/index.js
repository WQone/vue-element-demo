import Vue from 'vue';
import Router from 'vue-router';
import Basic from '@/views/Basic';
import Create from '@/views/Basic/Create';
import Account from '@/views/Account';
import Charging from '@/views/Charging';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Basic',
      component: Basic,
    },
    {
      path: '/Basic',
      name: 'Basic',
      component: Basic,
    },
    {
      path: '/Create',
      name: 'Create',
      component: Create,
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
  ],
});
