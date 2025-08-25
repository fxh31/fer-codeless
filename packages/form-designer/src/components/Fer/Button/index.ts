import type { ExtractPropTypes } from 'vue';

import { withInstall } from '@fer-codeless/utils';
import Button from './src/Button.vue';
import { buttonProps } from './src/props';

export const FerButton = withInstall(Button);
export declare type ButtonProps = Partial<ExtractPropTypes<typeof buttonProps>>;
