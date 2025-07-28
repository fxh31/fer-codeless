<template>
  <a-form-item label="默认值">
    <a-input v-model:value="activeData.__config__.defaultValue" placeholder="请输入" />
  </a-form-item>
  <a-form-item label="能否清空">
    <a-switch v-model:checked="activeData.allowClear" />
  </a-form-item>
  <a-form-item label="是否只读">
    <a-switch v-model:checked="activeData.readonly" />
  </a-form-item>
</template>
<script lang="ts" setup>
  defineOptions({ inheritAttrs: false });
  const props = defineProps(['activeData']);
</script>
