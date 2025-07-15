import './index.less';

import { createApp } from 'vue';
import antDeSign from 'ant-design-vue';

import App from './App.vue';

const app = createApp(App);

app.use(antDeSign);

app.mount('#app');
