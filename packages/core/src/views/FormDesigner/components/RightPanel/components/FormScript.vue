<template>
  <BasicModal @register="registerModal" title="表单脚本" class="form-script-modal" width="80%" @ok="handleSubmit" destroyOnClose>
    <div class="form-script-modal-body">
      <div class="left-board">
        <a-tree ref="leftTreeRef" :tree-data="treeData" :fieldNames="fieldNames" @select="handleTreeSelect"></a-tree>
      </div>
      <div class="main-board">
        <div class="main-board-editor">
          <MonacoEditor ref="editorRef" v-model="text" />
        </div>
        <div class="main-board-tips">
          <p>请从左侧面板选择的字段名，支持JavaScript的脚本：demo(todo...)</p>
        </div>
      </div>
    </div>
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { MonacoEditor } from '@/components/CodeEditor';

  const props = defineProps(['treeTitle', 'drawingList']);
  const emit = defineEmits(['register', 'confirm']);
  const [registerModal, { closeModal }] = useModalInner(init);
  const text = ref('');
  const treeData = ref<any[]>([]);
  const editorRef = ref(null);
  const leftTreeRef = ref(null);

  const fieldNames = {
    key: 'id',
    title: 'fullName',
    children: 'children',
  };
  function init(data) {
    text.value = data.text;
    getTreeList();
  }
  function getTreeList() {
    console.log('getTreeList', unref(props.drawingList));
    const list = [];

    const loop = (data, parent?) => {
      if (!data) return;

      if (Array.isArray(data)) data.forEach(d => loop(d, parent));
      if (data.__vModel__) {
        list.push({ id: data.__vModel__, fullName: data.__config__.label });
      }
    };

    loop(unref(props.drawingList));
    const treeList = {
      id: (+new Date()).toString(),
      fullName: props.treeTitle,
      children: list,
    };

    treeData.value = [treeList];
  }

  function handleTreeSelect(keys, { node }) {
    if (!keys.length) return;
    if (!node.parent) return;
    (editorRef.value as any)?.insert(keys[0]);
  }

  function handleSubmit() {
    emit('confirm', text.value);
    closeModal();
  }
</script>

<style scoped>
  /* .form-script-modal-body {
    display: flex;
    width: 150px;
  } */
</style>
