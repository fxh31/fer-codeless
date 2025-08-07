// 二次封装组件（Fer）
import { FerInput, FerTextarea } from './Input';
import { FerRadio } from './Radio';
import { FerDivider } from './Divider';
import { FerIframe } from './Iframe';
import { FerButton } from './Button';
import { FerSelect } from './Select';
import { FerInputNumber } from './InputNumber';

import { BasicCaption } from '@/components/Basic';

const FerGroupTitle = BasicCaption;
FerGroupTitle.name = 'FerGroupTitle';

export { FerInput, FerTextarea, FerRadio, FerDivider, FerIframe, FerGroupTitle, FerButton, FerSelect, FerInputNumber };
