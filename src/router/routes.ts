import { RouteRecordRaw } from 'vue-router';

import Home from '../views/home/Home.vue';
import Layout from '../components/Layout.vue';
import LandingPage from '../views/landing/LandingPage.vue';
import Loader from '@/views/landing/Loader.vue';

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
      path: '/loader',
      name: 'loader',
      component: Loader,
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
