import type { GenItem } from '../types/item';

// 表单属性【右面板】
export const formConf = {
  formRef: 'formRef',
  formModel: 'dataForm',
  size: 'middle', //large,middle,small
  labelPosition: 'right',
  labelWidth: 100,
  labelSuffix: '', // 标题后缀
  // formRules: 'rules',
  // popupType: 'general',
  // generalWidth: '600px',
  fullScreenWidth: '100%',
  // drawerWidth: '600px',
  gutter: 15,
  formStyle: '', // 表单样式
  // disabled: false,
  // span: 24,
  colon: false,
  classNames: [], // 表单属性 - 表单CSS
  className: [],
  // hasCancelBtn: true,
  // cancelButtonText: '取消',
  // cancelButtonTextI18nCode: 'common.cancelText',
  // hasConfirmBtn: true,
  // confirmButtonText: '确定',
  // confirmButtonTextI18nCode: 'common.okText',
  // hasConfirmAndAddBtn: true,
  // hasPrintBtn: false,
  // printButtonText: '打印',
  // printButtonTextI18nCode: 'common.printText',
  // customBtns: [],
  // primaryKeyPolicy: 1,
  // concurrencyLock: false,
  // logicalDelete: false,
  // dataLog: false,
  // useBusinessKey: false,
  // businessKeyList: [],
  // businessKeyTip: '数据已存在，请勿重复提交！',
  // printId: '',
  classJson: '', // 表单属性 - classJson
  // funcs: {
  //   onLoad: '({ formData, setFormData, setShowOrHide, setRequired, setDisabled, onlineUtils }) => {\n    // 在此编写代码\n    \n}',
  //   beforeSubmit:
  //     '({ formData, setFormData, setShowOrHide, setRequired, setDisabled, onlineUtils }) => {\n    return new Promise((resolve, reject) => {\n        // 在此编写代码\n        \n        // 继续执行\n        resolve()\n    })\n}',
  //   afterSubmit: '({ formData, setFormData, setShowOrHide, setRequired, setDisabled, onlineUtils }) => {\n    // 在此编写代码\n    \n}',
  // },
  // fields: [],
};

// 左面板 - 基础组件
export const inputComponents: GenItem[] = [
  {
    __config__: {
      ferKey: 'input',
      label: '单行输入',
      tag: 'FerInput',
      tipLabel: '',
      labelWidth: undefined,
      showLabel: true,
      layout: 'colFormItem',
      dragDisabled: false,
      span: 24,
      defaultValue: undefined,
      noShow: false, // 是否隐藏
    },
    style: { width: '100%' },
    placeholder: '请输入',
    on: {
      change: '({ data }) => {\n    // 在此编写代码\n    \n}',
    },
    allowClear: true,
    maxlength: null,
    readonly: false,
    disabled: false,
  },
  {
    __config__: {
      ferKey: 'textarea',
      label: '多行输入',
      tag: 'FerTextarea',
      tipLabel: '',
      labelWidth: undefined,
      showLabel: true,
      layout: 'colFormItem',
      dragDisabled: false,
      span: 24,
      defaultValue: undefined,
      noShow: false, // 是否隐藏
    },
    style: { width: '100%' },
    placeholder: '请输入',
    on: {
      change: '({ data }) => {\n    // 在此编写代码\n    \n}',
    },
    autoSize: {
      minRows: 4,
      maxRows: 4,
    },
    allowClear: true,
    maxlength: null,
    readonly: false,
    disabled: false,
  },
  {
    __config__: {
      ferKey: 'button',
      label: '按钮',
      tag: 'FerButton',
      tipLabel: '',
      labelWidth: undefined,
      showLabel: false, // 不显示 label
      layout: 'colFormItem',
      dragDisabled: false,
      span: 24,
      defaultValue: undefined,
      noShow: false, // 是否隐藏
    },
    style: { width: '100%' },
    placeholder: '请输入',
    on: {
      click: '({ data }) => {\n    // 在此编写代码\n    \n}',
    },
    align: 'left',
    buttonText: '按钮',
    type: 'default',
    disabled: false,
  },
];
// 左面板 - 高级组件
export const advanceComponents = [
  {
    __config__: {
      ferKey: 'iframe',
      label: 'Iframe',
      labelWidth: undefined,
      showLabel: true,
      tag: 'FerIframe',
      className: [],
      defaultValue: null,
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false,
      noShow: false,
    },
    href: '',
    height: 300,
    borderType: 'solid',
    borderColor: '#E2E0E0',
    borderWidth: 1,
  },
];
// 左面板 - 系统组件
export const systemComponents = [];
// 左面板 - 布局组件
export const layoutComponents = [
  {
    __config__: {
      ferKey: 'groupTitle',
      label: '分组标题',
      labelWidth: undefined,
      showLabel: false,
      tag: 'FerGroupTitle', // 实际渲染组件
      className: [],
      defaultValue: null,
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false,
      noShow: false,
    },
    helpMessage: '',
    content: '分组标题',
    contentPosition: 'left',
  },
  {
    __config__: {
      ferKey: 'divider',
      label: '分割线',
      labelWidth: undefined,
      showLabel: false,
      tag: 'FerDivider',
      className: [],
      defaultValue: null,
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false,
      noShow: false,
    },
    content: '我是分割线',
    contentPosition: 'center',
  },
];
