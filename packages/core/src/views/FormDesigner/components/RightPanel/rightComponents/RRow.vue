<template>
  <a-form-item label="组件名">
    {{ activeData.__config__.componentName }}
  </a-form-item>
  todo...
</template>
<script lang="ts" setup>
  defineOptions({ inheritAttrs: false });
  defineProps(['activeData']);
</script>
