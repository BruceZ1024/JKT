import { RouteRecordRaw } from 'vue-router';

import Landing from '../views/Landing.vue';
import Home from '../views/Home.vue';
import Layout from '../components/Layout.vue';
import LandingPage from '../views/LandingPage.vue';

const routes: Array<RouteRecordRaw> = [
    {
      path: '/landingPage',
      name: 'landingPage',
      component: LandingPage,
      meta: {
        title: '入口',
        keepAlive: false,
      },
    },
    {
      path: '/',
      name: 'index',
      redirect: '/landingPage',
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
    },
  ]
;

export default routes;
