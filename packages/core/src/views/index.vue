<template>
  <div class="de-container">
    <FormDesigner v-bind="getFormDesignerBind" style="flex: 1" />
  </div>
</template>
<script lang="ts" setup>
  import FormDesigner from './FormDesigner/index.vue';

  import { ref } from 'vue';
  const getFormDesignerBind = {
    // 设计表单信息
    formInfo: {
      fullName: '表单设计器',
    },
  };
</script>
<style lang="less">
  .de-container {
    display: flex;
    height: 100%;
    // flex-direction: column;
    margin: 0 8px;
  }
</style>
