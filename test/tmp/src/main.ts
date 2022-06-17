import { createApp } from 'vue';

import App from './App.vue';

import router from '@/router/index';
import store from '@/store/index';
import '@/assets/css/index.scss';

const app = createApp(App);

app.use(store);
app.use(router);

app.mount('#app');
