<template>
  <a-form :colon="false" layout="vertical" class="right-board-form">
    <a-form-item label="表单尺寸">
      <fer-radio v-model:value="formConf.size" :options="sizeOptions" optionType="button" button-style="solid" />
    </a-form-item>
    <a-form-item label="标签对齐">
      <fer-radio v-model:value="formConf.labelPosition" :options="labelPositionOptions" optionType="button" button-style="solid" class="right-radio" />
    </a-form-item>
    <a-form-item label="标题宽度">
      <a-input-number v-model:value="formConf.labelWidth" placeholder="请输入" :min="0" />
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicHelp } from '@/components/Basic';

  const sizeOptions = [
    { id: 'large', fullName: '较大' },
    { id: 'middle', fullName: '中等' },
    { id: 'small', fullName: '较小' },
  ];
  const labelPositionOptions = [
    { id: 'left', fullName: '左对齐', disabled: false },
    { id: 'right', fullName: '右对齐', disabled: false },
    { id: 'top', fullName: '顶部对齐', disabled: false },
  ];

  const props = defineProps(['activeData', 'formConf', 'drawingList']);
</script>
