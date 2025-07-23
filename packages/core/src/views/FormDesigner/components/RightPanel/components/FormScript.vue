<template>
  <BasicModal @register="registerModal" title="表单脚本" class="form-script-modal">
    <div class="form-script-modal-body">
      <div class="left-board">
        <a-tree :tree-data="treeData" :fieldNames="fieldNames"></a-tree>
      </div>
      <div class="main-board">
        <div class="main-board-editor"></div>
      </div>
    </div>
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';

  const props = defineProps(['treeTitle', 'drawingList']);
  const [registerModal, { closeModal }] = useModalInner(init);
  const text = ref('');
  const treeData = ref<any[]>([]);

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
</script>

<style scoped>
  .form-script-modal-body {
    display: flex;
  }
</style>
