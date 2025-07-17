import './index.less';
import { createApp } from 'vue';
import { setupI18n } from './locales/setupI18n';
import { registerGlobComp } from './components/registerGlobComp';

import App from './App.vue';

async function bootstrap() {
  const app = createApp(App);

  await setupI18n(app);

  // Register global components
  // 注册全局组件
  registerGlobComp(app);

  app.mount('#app');
}

bootstrap();
