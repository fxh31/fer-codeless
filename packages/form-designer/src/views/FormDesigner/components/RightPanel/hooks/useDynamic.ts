import { computed, unref } from 'vue';
import { buildBitUUID } from '@fer-codeless/utils';

export function useDynamic(activeData, initFieldData?) {
  const dataTypeOptions = [{ id: 'static', fullName: '静态数据' }];
  const sizeOptions = [
    { id: 'large', fullName: '较大' },
    { id: 'default', fullName: '中等' },
    { id: 'small', fullName: '较小' },
  ];
  const optionTypeOptions = [
    { id: 'default', fullName: '默认' },
    { id: 'button', fullName: '按钮' },
  ];

  const defaultValue = computed(() => {
    if (activeData.__config__.ferKey === 'checkbox' || activeData.__config__.ferKey === 'cascader' || activeData.multiple) return [];
    return '';
  });
  const onDataTypeChange = () => {
    activeData.__config__.defaultValue = unref(defaultValue);
  };
  const onMultipleChange = val => {
    activeData.__config__.defaultValue = val ? [] : '';
  };
  /**
   * 静态数据
   */
  const addSelectItem = () => {
    const uuid = buildBitUUID();
    activeData.options.push({
      fullName: '选项' + uuid,
      id: uuid,
    });
  };
  const onBatchOperateConfirm = options => {
    activeData.options = options;
  };
  /** -*/
  return { onDataTypeChange, optionTypeOptions, sizeOptions, dataTypeOptions, addSelectItem, onMultipleChange, onBatchOperateConfirm };
}
