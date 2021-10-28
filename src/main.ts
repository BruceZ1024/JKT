import {createApp} from 'vue';
import Vant from 'vant';
import App from './App.vue';
import router from './router';
import store from './store';
import 'vant/lib/index.css';
import 'amfe-flexible';
import MyHeader from '@/components/MyHeader.vue'

const app = createApp(App);
app.component('MyHeader', MyHeader)
app
  .use(store)
  .use(router)
  .use(Vant)
  .mount('#app');
