<template>
  <a-form-item label="默认值">
    <fer-select
      v-model:value="activeData.__config__.defaultValue"
      :options="activeData.options"
      :fieldNames="activeData.props"
      :multiple="activeData.multiple"
      allowClear
      showSearch />
  </a-form-item>
  <data-properties :activeData="activeData" :dicOptions="dicOptions" />
  <a-form-item label="能否清空">
    <a-switch v-model:checked="activeData.allowClear" />
  </a-form-item>
  <a-form-item label="能否搜索">
    <a-switch v-model:checked="activeData.showSearch" />
  </a-form-item>
  <a-form-item label="能否多选">
    <a-switch v-model:checked="activeData.multiple" @change="onMultipleChange" />
  </a-form-item>
</template>
<script lang="ts" setup>
  import { useDynamic } from '../hooks/useDynamic';
  import DataProperties from './components/DataProperties.vue';

  defineOptions({ inheritAttrs: false });
  const props = defineProps(['activeData', 'dicOptions']);

  const { onMultipleChange } = useDynamic(props.activeData);
</script>
