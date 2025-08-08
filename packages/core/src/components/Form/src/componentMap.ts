/**
 * 可自定或者二次封装函数
 */
// import { Textarea } from 'ant-design-vue';
// 二次封装（获修改其命名）组件 - fer
import {
  FerInput,
  FerTextarea,
  FerRadio,
  FerDivider,
  FerIframe,
  FerGroupTitle,
  FerButton,
  FerSelect,
  FerInputNumber,
  FerSwitch,
  FerCheckbox,
  FerCascader,
  FerDatePicker,
  FerTimePicker,
  FerUploadFile,
} from '@/components/Fer';

const componentMap = new Map();
// componentMap.set('Textarea', Textarea);

componentMap.set('Input', FerInput);
componentMap.set('Textarea', FerTextarea);
componentMap.set('Radio', FerRadio);
componentMap.set('Divider', FerDivider);
componentMap.set('Iframe', FerIframe);
componentMap.set('GroupTitle', FerGroupTitle);
componentMap.set('Button', FerButton);
componentMap.set('Select', FerSelect);
componentMap.set('InputNumber', FerInputNumber);
componentMap.set('Switch', FerSwitch);
componentMap.set('Checkbox', FerCheckbox);
componentMap.set('Cascader', FerCascader);
componentMap.set('DatePicker', FerDatePicker);
componentMap.set('TimePicker', FerTimePicker);
componentMap.set('UploadFile', FerUploadFile);

export { componentMap };
