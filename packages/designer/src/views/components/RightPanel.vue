<template>
  <div class="right-board common-board">
    <a-tabs v-model:activeKey="activeKey" :tabBarGutter="14" class="average-tabs">
      <a-tab-pane key="field" tab="组件属性"></a-tab-pane>
      <a-tab-pane key="style" tab="组件样式"></a-tab-pane>
      <a-tab-pane key="form" tab="表单属性"></a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, toRefs } from 'vue';

  const props = defineProps(['activeData', 'formConf', 'drawingList']);

  const state = reactive({
    activeKey: 'field',
  });

  const { activeKey } = toRefs(state);
</script>
