import antDeSign from 'ant-design-vue';

import { FerRadio, FerInput, FerButton, FerSelect } from './Fer/index';

export function registerGlobComp(app: App) {
  app.use(antDeSign);

  app.use(FerRadio);
  app.use(FerInput);
  app.use(FerButton);
  app.use(FerSelect);
}
