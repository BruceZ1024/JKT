import {RouteRecordRaw} from 'vue-router';

import Landing from '../views/Landing.vue';
import Home from '../views/Home.vue';
import Layout from '../components/Layout.vue';

const routes: Array<RouteRecordRaw> = [
    {
      path: '/',
      name: 'index',
      redirect: '/landing',
      meta: {
        title: '入口',
        keepAlive: false,
      },
    },
    {
      path: '/landing',
      name: 'landing',
      component: Landing,
      meta: {
        title: '入口',
        keepAlive: false,
      },
    },
  {
    path: '/home',
    name: 'home',
    component: Layout,
    meta: {
      title: 'Home',
      keepAlive: false,
    },
  }
  ]
;

export default routes;
