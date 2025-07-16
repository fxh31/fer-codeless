export interface ItemCfg {
  ferKey: string;
  dragDisabled: boolean;
  formId?: string;
  label: string;
  showLabel: boolean; // 是否显示 label
  labelWidth: undefined | number;
  layout: string;
}

export interface BasicGenItem {
  __config__: ItemCfg;
  __vModel__?: string;
}

// 单行输入
export interface InputGenItem extends BasicGenItem {
  placeholder: string;
}

export type GenItem = InputGenItem;
