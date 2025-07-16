<template>
  <a-form :colon="false" layout="vertical" class="right-board-form">
    <a-form-item label="控件栅格"> <a-slider v-model:value="activeData.__config__.span" :max="24" :min="2" :step="2" :marks="sliderMarks" /> </a-form-item
  ></a-form>
</template>

<script lang="ts" setup>
  const sliderMarks = { 2: 2, 4: 4, 6: 6, 8: 8, 10: 10, 12: 12, 14: 14, 16: 16, 18: 18, 20: 20, 22: 22, 24: 24 };

  const props = defineProps(['activeData']);
</script>
