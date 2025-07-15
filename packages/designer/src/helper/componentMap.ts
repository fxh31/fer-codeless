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
  // fullScreenWidth: '100%',
  // drawerWidth: '600px',
  gutter: 15,
  // disabled: false,
  // span: 24,
  colon: false,
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
  // formStyle: '',
  // classNames: [],
  // className: [],
  // classJson: '',
  // funcs: {
  //   onLoad: '({ formData, setFormData, setShowOrHide, setRequired, setDisabled, onlineUtils }) => {\n    // 在此编写代码\n    \n}',
  //   beforeSubmit:
  //     '({ formData, setFormData, setShowOrHide, setRequired, setDisabled, onlineUtils }) => {\n    return new Promise((resolve, reject) => {\n        // 在此编写代码\n        \n        // 继续执行\n        resolve()\n    })\n}',
  //   afterSubmit: '({ formData, setFormData, setShowOrHide, setRequired, setDisabled, onlineUtils }) => {\n    // 在此编写代码\n    \n}',
  // },
  // fields: [],
};

// 左面板 - 基础组件
export const inputComponents = [
  {
    __config__: {
      ferKey: 'input',
      label: '单行输入',
      layout: 'colFormItem',
      dragDisabled: false,
    },
  },
  {
    __config__: {
      ferKey: 'textarea',
      label: '多行输入',
      layout: 'colFormItem',
      dragDisabled: false,
    },
  },
];

export const selectComponents = [];
export const systemComponents = [];
export const layoutComponents = [];
