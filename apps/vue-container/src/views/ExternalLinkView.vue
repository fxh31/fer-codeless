<script setup lang="ts">
  import WujieVue from 'wujie-vue3';

  const { bus, setupApp, preloadApp, destroyApp } = WujieVue;

  const url = 'https://antdv.com/components/overview';
</script>

<template>
  <div style="width: 100%; height: 100%">
    <WujieVue width="100%" height="100%" name="AntDesignVue" :url="url" :sync="true" />
  </div>
</template>

<style scoped>
  div {
    height: 100vh;
    width: 100%;
  }
</style>
