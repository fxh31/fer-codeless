import '@/design/config.less';

// 二次封装组件（Fer）
import { FerInput, FerTextarea } from './Input';
import { FerRadio } from './Radio';
import { FerDivider } from './Divider';
import { FerIframe } from './Iframe';
import { FerButton } from './Button';
import { FerSelect } from './Select';
import { FerInputNumber } from './InputNumber';
import { FerSwitch } from './Switch';
import { FerCheckbox } from './Checkbox';
import { FerCascader } from './Cascader';
import { FerDatePicker, FerTimePicker } from './DatePicker';
import { FerUploadFile } from './Upload';
import { FerRate } from './Rate';
import { FerSlider } from './Slider';
import { FerLink } from './Link';
import { FerText } from './Text';
import { FerAlert } from './Alert';
import { FerQrcode } from './Qrcode';

import { BasicCaption } from '@/components/Basic';

const FerGroupTitle = BasicCaption;
FerGroupTitle.name = 'FerGroupTitle';

export {
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
  FerRate,
  FerSlider,
  FerLink,
  FerText,
  FerAlert,
  FerQrcode,
};
