import { RouteRecordRaw } from 'vue-router';

import Layout from '@/components/Layout.vue';
import Loader from '@/views/landing/Loader.vue';
import LandingPage from '@/views/landing/LandingPage.vue';
import SplashScreen from '@/views/landing/SplashScreen.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    redirect: '/landingPage',
    meta: {
      title: 'landingPage',
      keepAlive: false,
    },
  },
  {
    path: '/landingPage',
    name: 'landingPage',
    component: LandingPage,
    meta: {
      title: 'landingPage',
      keepAlive: false,
    },
  },
  {
    path: '/splashScreen',
    name: 'splashScreen',
    component: SplashScreen,
    meta: {
      title: 'splashScreen',
      keepAlive: false,
    },
  },
  {
    path: '/loader',
    name: 'loader',
    component: Loader,
    meta: {
      title: 'loader',
      keepAlive: false,
    },
  },
  {
    path: '/home',
    name: 'home',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: 'Home',
          keepAlive: false,
        },
        component: () => import('@/views/home/Home.vue'),
      },
    ],
  },
  {
    path: '/gameFi',
    name: 'gameFi',
    component: Layout,
    children: [
      {
        path: '/gameFi',
        name: 'gameFi',
        meta: {
          title: 'GameFi',
          keepAlive: false,
        },
        component: () => import('@/views/gamefi/GameFi.vue'),
      },
    ],
  },
  {
    path: '/deFi',
    name: 'deFi',
    component: Layout,
    children: [
      {
        path: '/deFi',
        name: 'deFi',
        meta: {
          title: 'Defi',
          keepAlive: false,
        },
        component: () => import('@/views/defi/DeFi.vue'),
      },
    ],
  },
  {
    path: '/account',
    name: 'account',
    component: Layout,
    children: [
      {
        path: '/account',
        name: 'account',
        meta: {
          title: 'Account',
          keepAlive: false,
        },
        component: () => import('@/views/account/Account.vue'),
      },
      {
        path: '/account/setting',
        name: 'AccountSetting',
        meta: {
          title: 'Settings',
          keepAlive: false,
        },
        component: () => import('@/views/account/AccountSetting.vue'),
      },
      {
        path: '/account/upgrade',
        name: 'AccountUpgrade',
        meta: {
          title: 'VIP Upgrade',
          keepAlive: false,
        },
        component: () => import('@/views/account/AccountUpgrade.vue'),
      },
      {
        path: '/account/transaction',
        name: 'AccountTransaction',
        meta: {
          title: 'Transactions',
          keepAlive: false,
        },
        component: () => import('@/views/account/AccountTransaction.vue'),
      },
      {
        path: '/account/invite',
        name: 'AccountInvite',
        meta: {
          title: 'Invite Friends',
          keepAlive: false,
        },
        component: () => import('@/views/account/AccountInvite.vue'),
      },
    ],
  },
];

export default routes;
