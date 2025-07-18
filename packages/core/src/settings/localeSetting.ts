export type LocaleType = 'zh_CN' | 'zh_TW' | 'en_US' | 'ru' | 'ja' | 'ko';

export interface LocaleSetting {
  showPicker: boolean;
  // Current language
  locale: LocaleType;
  // default language
  fallback: LocaleType;
  // available Locales
  availableLocales: LocaleType[];
}

export const LOCALE: { [key: string]: LocaleType } = {
  ZH_CN: 'zh_CN',
  ZH_TW: 'zh_TW',
  EN_US: 'en_US',
};

export const localeSetting: LocaleSetting = {
  // 是否显示语言选择器
  showPicker: true,
  // 当前语言
  locale: LOCALE.ZH_CN,
  // 默认语言
  fallback: LOCALE.ZH_CN,
  // 允许的语言
  availableLocales: [LOCALE.ZH_CN, LOCALE.ZH_TW, LOCALE.EN_US],
};

// 语言列表
export const localeList = [
  {
    text: '简体中文',
    event: LOCALE.ZH_CN,
  },
  {
    text: '繁体中文',
    event: LOCALE.ZH_TW,
  },
  {
    text: 'English',
    event: LOCALE.EN_US,
  },
];
