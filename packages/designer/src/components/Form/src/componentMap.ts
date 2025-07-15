// 可自定或者二次封装函数
import { Input, Textarea } from 'ant-design-vue';

const componentMap = new Map();

componentMap.set('Input', Input);
componentMap.set('Textarea', Textarea);

export { componentMap };
