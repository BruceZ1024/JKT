import { createApp } from 'vue';
import Vant from 'vant';
import App from './App.vue';
import router from './router';
import registerSvgIconComp from '@/assets/icons/index';

const app = createApp(App);
// svg-icon
registerSvgIconComp(app);

app
  .use(router)
  .use(Vant)
  .mount('#app');
