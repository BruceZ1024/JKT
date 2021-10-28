import {RouteRecordRaw} from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: false,
    }
  },
];

export default routes;
