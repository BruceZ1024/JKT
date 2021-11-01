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
import {registerSvgIconComp} from '@/assets/icons'


const app = createApp(App);
// svg-icon
registerSvgIconComp(app);

app.use(router)
  .use(store)
  .use(Vant)
  .mount('#app');
