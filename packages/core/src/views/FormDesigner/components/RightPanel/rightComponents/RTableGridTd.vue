<template>
  <a-divider>todo...</a-divider>
  <!-- <a-form-item label="插入左侧列">
    <a-button size="small" @click="handleTableGrid('1')">插入左侧列</a-button>
  </a-form-item>
  <a-form-item label="插入右侧列">
    <a-button size="small" @click="handleTableGrid('2')">插入右侧列</a-button>
  </a-form-item>
  <a-form-item label="插入上方行">
    <a-button size="small" @click="handleTableGrid('3')">插入上方行</a-button>
  </a-form-item>
  <a-form-item label="插入下方行">
    <a-button size="small" @click="handleTableGrid('4')">插入下方行</a-button>
  </a-form-item> -->
</template>
<script lang="ts" setup>
  import { useAttrs } from 'vue';

  defineOptions({ inheritAttrs: false });
  defineProps(['activeData']);

  const attrs = useAttrs();
  const {
    onHandleTableSetting,
    curEl,
    // onHandleShowMenu,
    // mergeLeftColDisabled,
    // mergeRightColDisabled,
    // mergeWholeRowDisabled,
    // mergeAboveRowDisabled,
    // mergeBelowRowDisabled,
    // mergeWholeColDisabled,
    // undoMergeRowDisabled,
    // undoMergeColDisabled,
    // deleteWholeColDisabled,
    // deleteWholeRowDisabled,
  } = attrs as unknown as any;

  function handleTableGrid(key) {
    onHandleTableSetting(key, curEl);
  }
</script>
