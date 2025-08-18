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
export const basicComponents: GenItem[] = [
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
    direction: 'horizontal', // 排列方向
    optionType: 'default',
    buttonStyle: 'solid',
    size: 'default',
    disabled: false,
  },
  {
    __config__: {
      ferKey: 'checkbox',
      label: '多选框组',
      tag: 'FerCheckbox',
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
    allowClear: true, // 是否清空
    showSearch: true, // 搜索
    multiple: false,
  },
  {
    __config__: {
      ferKey: 'cascader',
      label: '级联选择',
      tag: 'FerCascader',
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
    allowClear: true, // 是否清空
    showSearch: true, // 搜索
    multiple: false,
  },
  {
    __config__: {
      ferKey: 'datePicker',
      label: '日期选择',
      tag: 'FerDatePicker',
      tipLabel: '',
      labelWidth: undefined,
      showLabel: true,
      layout: 'colFormItem',
      dragDisabled: false,
      span: 24,
      defaultValue: undefined,
      noShow: false, // 是否隐藏
      startTimeType: 1, // 开始时间类型
      startTimeTarget: 1, // 验证开始时间目标类型
      endTimeType: 1,
      endTimeTarget: 1,
    },
    style: { width: '100%' },
    on: {
      change: '({ data }) => {\n    // 在此编写代码\n    \n}',
    },
    placeholder: '请选择',
    allowClear: true, // 是否清空
    format: 'yyyy-MM-dd',
    startTime: null,
    endTime: null,
    disabled: false,
  },
  {
    __config__: {
      ferKey: 'timePicker',
      label: '时间选择',
      tag: 'FerTimePicker',
      tipLabel: '',
      labelWidth: undefined,
      showLabel: true,
      layout: 'colFormItem',
      dragDisabled: false,
      span: 24,
      defaultValue: undefined,
      noShow: false, // 是否隐藏
      startTimeType: 1, // 开始时间类型
      startTimeTarget: 1, // 验证开始时间目标类型
      endTimeType: 1,
      endTimeTarget: 1,
    },
    style: { width: '100%' },
    on: {
      change: '({ data }) => {\n    // 在此编写代码\n    \n}',
    },
    placeholder: '请选择',
    allowClear: true, // 是否清空
    format: 'HH:mm:ss',
    startTime: null,
    endTime: null,
    disabled: false,
  },
  {
    __config__: {
      ferKey: 'uploadFile',
      label: '文件上传',
      tag: 'FerUploadFile',
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
    disabled: false,
    accept: '', // 文件类型
    fileSize: 10, // 文件大小
    sizeUnit: 'MB', // 文件大小单位
    buttonText: '点击上传', // 按钮文字
    limit: 9, // 最大上传数
    pathType: 'defaultPath', // 上传路径
    sortRule: [], // 排序规则
    timeFormat: 'YYYY', // 时间格式
    folder: '', // 文件夹名
    tipText: '', // 上传提示
  },
  {
    __config__: {
      ferKey: 'rate',
      label: '评分',
      tag: 'FerRate',
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
    count: 5,
    allowHalf: false,
    disabled: false,
  },
  {
    __config__: {
      ferKey: 'slider',
      label: '滑块',
      tag: 'FerSlider',
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
    disabled: false,
    min: 0,
    max: 100,
    step: 1,
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
    on: {
      click: '({ data }) => {\n    // 在此编写代码\n    \n}',
    },
    align: 'left',
    buttonText: '按钮',
    type: 'default',
    disabled: false,
  },
  {
    __config__: {
      ferKey: 'link',
      label: '链接',
      tag: 'FerLink',
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
      click: '({ data }) => {\n    // 在此编写代码\n    \n}',
    },
    content: '文本链接',
    href: '',
    target: '_self',
    textStyle: {
      'text-align': 'left',
    },
  },
  {
    __config__: {
      ferKey: 'text',
      label: '文字',
      tag: 'FerText',
      tipLabel: '',
      labelWidth: undefined,
      showLabel: false,
      layout: 'colFormItem',
      dragDisabled: false,
      span: 24,
      defaultValue: undefined,
      noShow: false, // 是否隐藏
    },
    textStyle: {
      color: '#000000',
      'text-align': 'left',
      'font-weight': 'normal',
      'font-style': 'normal',
      'text-decoration': 'none',
      'line-height': 32,
      'font-size': 12,
    },
    content: '这是一段文字',
  },
  {
    __config__: {
      ferKey: 'alert',
      label: '提示',
      tag: 'FerAlert',
      tipLabel: '',
      labelWidth: undefined,
      showLabel: false,
      layout: 'colFormItem',
      dragDisabled: false,
      span: 24,
      defaultValue: undefined,
      noShow: false, // 是否隐藏
    },
    title: '这是一个提示',
    type: 'success',
    showIcon: false,
    closable: true,
    description: '',
    closeText: '',
  },
  {
    __config__: {
      ferKey: 'qrcode',
      label: '二维码',
      tag: 'FerQrcode',
      tipLabel: '',
      labelWidth: undefined,
      showLabel: true,
      layout: 'colFormItem',
      dragDisabled: false,
      span: 24,
      defaultValue: undefined,
      noShow: false, // 是否隐藏
    },
    colorDark: '#000',
    colorLight: '#fff',
    width: 100,
    dataType: 'static',
    staticText: '二维码',
    relationField: '',
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
  {
    __config__: {
      ferKey: 'collapse',
      label: '折叠面板',
      labelWidth: undefined,
      showLabel: false,
      tag: 'ACollapse',
      className: [],
      layout: 'rowFormItem',
      span: 24,
      dragDisabled: false,
      noShow: false,
      children: [
        {
          title: '面板1',
          name: '1',
          __config__: {
            ferKey: 'collapseItem',
            children: [],
          },
        },
        {
          title: '面板2',
          name: '2',
          __config__: {
            ferKey: 'collapseItem',
            children: [],
          },
        },
      ],
      active: ['1'],
    },
    on: {
      change: '({ data, rowIndex, formData, setFormData, setShowOrHide, setRequired, setDisabled, onlineUtils }) => {\n    // 在此编写代码\n    \n}',
    },
    accordion: false,
    ghost: true,
    expandIconPosition: 'end',
  },
  {
    __config__: {
      ferKey: 'row',
      label: '栅格容器',
      labelWidth: undefined,
      showLabel: false,
      tag: 'ARow',
      className: [],
      layout: 'rowFormItem',
      span: 24,
      dragDisabled: false,
      noShow: false,
    },
    type: 'default',
    justify: 'start', // 水平排列方式
    align: 'top', // 垂直对齐方式
  },
];
