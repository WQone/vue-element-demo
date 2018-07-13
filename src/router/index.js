import Vue from 'vue';
import Router from 'vue-router';
import Basic from '@/views/Basic';
import Create from '@/views/Basic/Create';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Basic',
      component: Basic,
    },
    {
      path: '/Create',
      name: 'Create',
      component: Create,
    },
  ],
});
