import './index.less';

import { createApp } from 'vue';
import { setupI18n } from './locales/setupI18n';
import antDeSign from 'ant-design-vue';

import App from './App.vue';

async function bootstrap() {
  const app = createApp(App);

  await setupI18n(app);

  app.use(antDeSign);

  app.mount('#app');
}

bootstrap();
