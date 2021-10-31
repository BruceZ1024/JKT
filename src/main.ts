import {createApp} from 'vue';
import Vant from 'vant';
import App from './App.vue';
import router from './router';
import store from './store';
import 'vant/lib/index.css';
import './assets/css/landingPage/animate.css';
import './assets/css/landingPage/bootstrap.min.css';
import './assets/css/landingPage/style.css';
import 'amfe-flexible';
import ComHeader from '@/components/ComHeader.vue'
import '@/assets/icons'


const app = createApp(App);
app.component('ComHeader', ComHeader);
app
  .use(store)
  .use(router)
  .use(Vant)
  .mount('#app');
