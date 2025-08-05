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
    <a-form-item>
      <template #label>表单CSS</template>
      <a-button block @click="editStyle()">编写样式</a-button>
    </a-form-item>
    <StyleScript @register="registerStyleScriptModal" @confirm="updateStyleScript" />
  </a-form>
</template>

<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import StyleScript from './components/StyleScript.vue';
  import { useModal } from '@/components/Modal';

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

  const [registerStyleScriptModal, { openModal: openStyleScriptModal }] = useModal();

  function editStyle() {
    openStyleScriptModal(true, { text: unref(props.formConf).classJson });
  }

  function updateStyleScript(data) {
    props.formConf.classJson = data;
    props.formConf.classNames = spiltByDoc(data);
  }
  // 拆分 css class 编码，提取 className
  function spiltByDoc(str) {
    str = str.trim();
    let arr: any[] = [];
    let cut = str.split('}');
    cut.forEach(item => {
      if (item) {
        let afterCut = item.split('{');
        let classObject = { key: '', value: '' };
        let name = '';
        if (afterCut[0].split(' ').length > 1) {
          name = afterCut[0].split(' ')[0];
        } else {
          name = afterCut[0];
        }
        if (name.split('\.').length > 1) {
          name = name.split('\.')[1];
        }
        name = name.split('\:')[0];
        let matching = new RegExp(/^[a-zA-Z]-?.*[a-zA-Z0-9_]*$/);
        if (matching.test(name)) {
          classObject.key = name.replace(/\r|\n/gi, '').trim();
          classObject.value = item.replace(/\r|\n/gi, '') + '}';
          arr.push(classObject);
        }
      }
    });
    return arr.map(o => o.key);
  }
</script>
