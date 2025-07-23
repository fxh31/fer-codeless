<template>
  <div class="de-container">
    <FormDesigner v-bind="getFormDesignerBind" />
  </div>
</template>
<script lang="ts" setup>
  import FormDesigner from './views/FormDesigner/index.vue';

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
  }
</style>
