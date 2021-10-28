/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
// 扩充
declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter,
    $route: Route,
  }
}

// html
declare module '*.html';
// css
declare module '*.css';
declare module '*.png';
declare module '*.gif';
declare module '*.js';
declare module 'js-cookie';
