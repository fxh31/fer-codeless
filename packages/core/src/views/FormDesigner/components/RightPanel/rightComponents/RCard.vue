<template>
  <a-form-item label="卡片标题">
    <fer-input v-model:value="activeData.header" placeholder="请输入" />
  </a-form-item>
  <a-form-item label="显示阴影">
    <fer-radio v-model:value="activeData.shadow" :options="typeOptions" optionType="button" button-style="solid" class="right-radio" />
  </a-form-item>
</template>
<script lang="ts" setup>
  import { inject, computed } from 'vue';
  defineOptions({ inheritAttrs: false });
  defineProps(['activeData']);

  const typeOptions = [
    { id: 'never', fullName: '永不显示' },
    { id: 'hover', fullName: '移入显示' },
  ];
</script>
