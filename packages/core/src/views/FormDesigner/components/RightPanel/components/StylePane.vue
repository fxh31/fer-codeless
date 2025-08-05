<template>
  <a-form :colon="false" layout="vertical" class="right-board-form">
    <a-form-item label="控件栅格"> <a-slider v-model:value="activeData.__config__.span" :max="24" :min="2" :step="2" :marks="sliderMarks" /> </a-form-item>
    <a-form-item label="标题宽度" v-if="!layoutList.includes(ferKey)">
      <a-input-number v-model:value="activeData.__config__.labelWidth" placeholder="请输入" :min="0" />
    </a-form-item>
    <a-form-item v-if="!noWithList.includes(ferKey) && activeData.style">
      <template #label>
        <span class="form-title-item"> 控件宽度 </span>
        <BasicHelp text="支持%和px两种宽度设置" />
      </template>
      <a-input v-model:value="activeData.style.width" placeholder="请输入" />
    </a-form-item>
    <a-form-item>
      <template #label>控件Class（todo...）</template>
      <a-select v-model:value="activeData.__config__.className" />
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { unref, computed } from 'vue';
  import { BasicHelp } from '@/components/Basic';
  import { noWithList, layoutList } from '@/helper/rightPanel';
  const sliderMarks = { 2: 2, 4: 4, 6: 6, 8: 8, 10: 10, 12: 12, 14: 14, 16: 16, 18: 18, 20: 20, 22: 22, 24: 24 };

  const props = defineProps(['activeData']);
  const ferKey = computed(() => unref(props.activeData).__config__?.ferKey);
</script>

<style lang="css">
  .form-title-item {
    width: 120px;
  }
</style>
