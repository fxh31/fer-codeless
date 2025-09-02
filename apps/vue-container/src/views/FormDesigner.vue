<script setup lang="ts">
  import WujieVue from 'wujie-vue3';

  const formDesignerUrl = 'http://localhost:5175' || import.meta.env.VITE_GLOB_API_URL;
</script>

<template>
  <div style="width: 100%; height: 100%">
    <WujieVue width="100%" height="100%" name="form-designer" :url="formDesignerUrl" />
  </div>
</template>

<style scoped></style>
