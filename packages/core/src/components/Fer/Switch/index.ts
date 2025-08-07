import type { ExtractPropTypes } from 'vue';

import { withInstall } from '@fer-codeless/utils';
import Switch from './src/Switch.vue';
import { switchProps } from './src/props';

export const FerSwitch = withInstall(Switch);
export declare type SwitchProps = Partial<ExtractPropTypes<typeof switchProps>>;
