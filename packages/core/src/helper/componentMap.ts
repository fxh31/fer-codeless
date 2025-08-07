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
    on: {
      change: '({ data }) => {\n    // 在此编写代码\n    \n}',
    },
    placeholder: '请输入',
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
    on: {
      change: '({ data }) => {\n    // 在此编写代码\n    \n}',
    },
    autoSize: {
      minRows: 4,
      maxRows: 4,
    },
    placeholder: '请输入',
    allowClear: true,
    maxlength: null,
    readonly: false,
    disabled: false,
  },
  {
    __config__: {
      ferKey: 'inputNumber',
      label: '数字输入',
      tag: 'FerInputNumber',
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
    on: {
      change: '({ data }) => {\n    // 在此编写代码\n    \n}',
    },
    min: undefined, // 最小值
    max: undefined, // 最大值
    controls: false, // 按钮（可结合 step 控制步长）
    step: 1, // 步长
    placeholder: '请输入',
    addonBefore: '',
    addonAfter: '',
    thousands: false, // 千位分隔
    precision: undefined, // 精度
    isAmountChinese: false, // 大写金额
  },
  {
    __config__: {
      ferKey: 'switch',
      label: '开关',
      tag: 'FerSwitch',
      tipLabel: '',
      labelWidth: undefined,
      showLabel: true,
      layout: 'colFormItem',
      dragDisabled: false,
      span: 24,
      defaultValue: undefined,
      noShow: false, // 是否隐藏
    },
    on: {
      change: '({ data }) => {\n    // 在此编写代码\n    \n}',
    },
    disabled: false,
    checkedChildren: '开', // 选中时的内容
    unCheckedChildren: '关', // 未选中时的内容
    checkedValue: 1, // 选中时的值
    unCheckedValue: 0, // 未选中时的值
  },
  {
    __config__: {
      ferKey: 'radio',
      label: '单选框租',
      tag: 'FerRadio',
      tipLabel: '',
      labelWidth: undefined,
      showLabel: true,
      layout: 'colFormItem',
      dragDisabled: false,
      span: 24,
      defaultValue: undefined,
      noShow: false, // 是否隐藏
      dataType: 'static',
    },
    on: {
      change: '({ data }) => {\n    // 在此编写代码\n    \n}',
    },
    style: { width: '100%' },
    options: [
      {
        fullName: '选项一',
        id: '1',
      },
      {
        fullName: '选项二',
        id: '2',
      },
    ],
    props: {
      label: 'fullName',
      value: 'id',
    },
    direction: 'horizontal',
    optionType: 'default',
    buttonStyle: 'solid',
    size: 'default',
    disabled: false,
  },
  {
    __config__: {
      ferKey: 'select',
      label: '下拉选择',
      tag: 'FerSelect',
      tipLabel: '',
      labelWidth: undefined,
      showLabel: true,
      layout: 'colFormItem',
      dragDisabled: false,
      span: 24,
      defaultValue: undefined,
      noShow: false, // 是否隐藏
      dataType: 'static', // 数据类型 - 默认静态数据
    },
    style: { width: '100%' },
    on: {
      change: '({ data }) => {\n    // 在此编写代码\n    \n}',
    },
    options: [
      {
        id: '1',
        fullName: '选项1',
        children: [
          {
            id: '2',
            fullName: '选项1-1',
          },
        ],
      },
    ],
    props: {
      value: 'id',
      label: 'fullName',
      children: 'children',
    },
    placeholder: '请选择',
    disabled: false,
    multiple: false, // 是否多选
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
