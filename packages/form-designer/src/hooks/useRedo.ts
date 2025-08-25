import { ref, computed, unref } from 'vue';
import { cloneDeep } from 'lodash-es';
import { isString, isFunction } from '@fer-codeless/utils';

export function useRedo() {
  const recordList = ref<any[]>([]);
  const currentRecordIndex = ref(-1); // 当前索引

  const getCanUndo = computed(() => currentRecordIndex.value > 0);
  const getCanRedo = computed(() => recordList.value.length > currentRecordIndex.value + 1);
  // 新增一条记录
  const addRecord = (json, fullName = '修改') => {
    const item = {
      json: isString(json) ? json : cloneDeep(json),
      fullName,
      id: currentRecordIndex.value + 1,
    };
    recordList.value.push(item);
    currentRecordIndex.value++;
    // todo：限制 undo 记录步数
  };
  // 上一步
  const handlePrev = (callback?) => {
    if (!unref(getCanUndo)) return;
    currentRecordIndex.value--;
    const currRecord = recordList.value[currentRecordIndex.value];
    callback && isFunction(callback) && callback(currRecord.json);
  };
  // 下一步
  const handleNext = (callback?) => {
    if (!unref(getCanRedo)) return;
    currentRecordIndex.value++;
    const currRecord = recordList.value[currentRecordIndex.value];
    callback && isFunction(callback) && callback(currRecord.json);
  };

  return {
    addRecord,
    handlePrev,
    handleNext,
    getCanUndo,
    getCanRedo,
  };
}
