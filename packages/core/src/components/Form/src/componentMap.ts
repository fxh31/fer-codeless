/**
 * 可自定或者二次封装函数
 */
// import { Textarea } from 'ant-design-vue';
// 二次封装（获修改其命名）组件 - fer
import { FerInput, FerTextarea, FerRadio, FerDivider } from '@/components/Fer';

const componentMap = new Map();
// componentMap.set('Textarea', Textarea);

componentMap.set('Input', FerInput);
componentMap.set('Textarea', FerTextarea);
componentMap.set('Radio', FerRadio);
componentMap.set('Divider', FerDivider);

export { componentMap };
