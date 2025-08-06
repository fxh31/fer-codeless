import { computed, unref } from 'vue';
import { buildBitUUID } from '@fer-codeless/utils';

export function useDynamic(activeData, initFieldData?) {
  const dataTypeOptions = [{ id: 'static', fullName: '静态数据' }];

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
  return { onDataTypeChange, dataTypeOptions, addSelectItem, onMultipleChange, onBatchOperateConfirm };
}
