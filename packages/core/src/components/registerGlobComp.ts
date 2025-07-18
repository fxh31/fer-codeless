import antDeSign from 'ant-design-vue';

import { FerRadio } from './Fer/index';

export function registerGlobComp(app: App) {
  app.use(antDeSign);

  app.use(FerRadio);
}
