<template>
  <div class="right-board common-board">
    <a-tabs v-model:activeKey="activeKey" :tabBarGutter="14" class="average-tabs">
      <a-tab-pane key="field" tab="组件属性"></a-tab-pane>
      <a-tab-pane key="style" tab="组件样式"></a-tab-pane>
      <a-tab-pane key="form" tab="表单属性"></a-tab-pane>
    </a-tabs>
    <div class="field-box" v-if="activeData?.__config__ && activeData.__config__.ferKey">
      <a-form :colon="false" layout="vertical" v-show="activeKey === 'field'" class="right-board-form">
        <a-form-item label="控件类型">
          <a-input v-model:value="getCompName" disabled />
        </a-form-item>
        <a-form-item label="控件标题">
          <a-input v-model:value="activeData.__config__.label" placeholder="请输入" />
        </a-form-item>
        <a-form-item label="标题提示">
          <a-input v-model:value="activeData.__config__.tipLabel" placeholder="请输入" />
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, toRefs, computed, unref } from 'vue';
  import { inputComponents } from '@/helper/componentMap';

  const props = defineProps(['activeData', 'formConf', 'drawingList']);

  const state = reactive({
    activeKey: 'field',
  });

  const { activeKey } = toRefs(state);
  const ferKey = computed(() => unref(props.activeData).__config__?.ferKey);
  const getCompName = computed(() => {
    const allComps = [...inputComponents];
    const comp = allComps.filter(o => o.__config__.ferKey === unref(ferKey));
    if (!comp.length) return '';
    return comp[0].__config__.label;
  });
</script>
