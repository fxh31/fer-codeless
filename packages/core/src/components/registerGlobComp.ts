import antDeSign from 'ant-design-vue';

import { FerRadio, FerInput, FerButton, FerSelect, FerTextarea, FerCheckbox, FerCascader, FerDatePicker, FerTimePicker } from './Fer/index';

export function registerGlobComp(app: App) {
  app.use(antDeSign);

  app.use(FerRadio);
  app.use(FerInput);
  app.use(FerTextarea);
  app.use(FerButton);
  app.use(FerSelect);
  app.use(FerCheckbox);
  app.use(FerCascader);
  app.use(FerDatePicker);
  app.use(FerTimePicker);
}
