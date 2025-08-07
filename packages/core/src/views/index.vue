<template>
  <div class="de-container">
    <FormDesigner v-bind="getFormDesignerBind" />
    <Foo :name="foo" tvalue="jj" />
  </div>
</template>
<script lang="ts" setup>
  import FormDesigner from './FormDesigner/index.vue';
  import Foo from './Test.vue';
  import { ref } from 'vue';
  const getFormDesignerBind = {
    // 设计表单信息
    formInfo: {
      fullName: '表单设计器',
    },
  };
  const foo = ref('foo');
</script>
<style lang="less">
  .de-container {
    display: flex;
    height: 100%;
  }
</style>
