// 可自定或者二次封装函数
import { Textarea } from 'ant-design-vue';
import { FerInput } from '@/components/Fer';
import { FerRadio } from '@/components/Fer';

const componentMap = new Map();

componentMap.set('Input', FerInput);
componentMap.set('Radio', FerRadio);
componentMap.set('Textarea', Textarea);

export { componentMap };
