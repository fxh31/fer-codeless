<template>
  <div>
    <DesignCom />
  </div>
</template>
<script lang="ts" setup>
  import { defineAsyncComponent } from 'vue';

  // 使用异步组件加载，确保 setup 函数都已经加载执行完毕，导出的变量已经赋值
  const DesignCom = defineAsyncComponent(() => import('./views/index.vue'));
</script>
<style lang="less"></style>
