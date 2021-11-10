import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './routes';
import Web3Provider from '@/utils/Web3Provider';

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if(to.path != '/' && to.path != '/index' && to.path !== '/landingPage' && to.path !== '/splashScreen'){
    let parent = localStorage.getItem('parentAddr');
    if (!parent) {
      parent = await Web3Provider.getInstance().getParentInfo();
      // 0x0000000000000000000000000000000000000000 is no parent
      if (parent && parent !== '0x0000000000000000000000000000000000000000') {
        localStorage.setItem('parentAddr', parent);
        next();
      } else {
        next({
          path: '/splashScreen',
          query: to.query
        })
      }
    } else {
      next();
    }
  } else {
    next();
  }
  


  // next();
  // if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
  //   if (localStorage.getItem('username')) {// 判断是否登录
  //     next()
  //   } else {// 没登录则跳转到登录界面
  //     next({
  //       path: '/Register',
  //       query: { redirect: to.fullPath }
  //     })
  //   }
  // } else {
  //   next()
  // }
})

export default router;
