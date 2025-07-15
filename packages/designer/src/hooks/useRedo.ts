import { ref, computed, unref } from 'vue';
import { cloneDeep } from 'lodash-es';
import { isString, isFunction } from '@fer-codeless/utils';

export function useRedo() {
  const recordList = ref<any[]>([]);
  const currentRecordIndex = ref(-1); // 当前索引
  // 新增一条记录
  const addRecord = (json, fullName = '修改') => {
    const item = {
      json: isString(json) ? json : cloneDeep(json),
      fullName,
      id: currentRecordIndex.value + 1,
    };
    recordList.value.push(item);
    currentRecordIndex.value++;
  };

  return {
    addRecord,
  };
}
