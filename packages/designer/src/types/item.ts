export interface ItemCfg {
  ferKey: string;
  dragDisabled: boolean;
  formId?: string;
  label: string;
  showLabel: boolean; // 是否显示 label
  layout: string;
  labelWidth: undefined | number;
  tipLabel?: string; // 标题提示
  defaultValue?: any; // 默认值
}

export interface BasicGenItem {
  __config__: ItemCfg;
  __vModel__?: string;
  style?: {
    width: string;
  };
}

// 单行输入
export interface InputGenItem extends BasicGenItem {
  placeholder: string;
}

export type GenItem = InputGenItem;
