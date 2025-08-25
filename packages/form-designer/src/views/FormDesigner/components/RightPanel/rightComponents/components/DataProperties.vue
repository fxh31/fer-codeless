<template>
  <a-divider>数据选项</a-divider>
  <a-form-item class="flex justify-center">
    <fer-radio v-model:value="activeData.__config__.dataType" :options="dataTypeOptions" optionType="button" buttonStyle="solid" @change="onDataTypeChange" />
  </a-form-item>
  <div class="options-list" v-if="activeData.__config__.dataType === 'static'">
    <template v-if="['cascader'].includes(activeData.__config__.ferKey)">
      <BasicTree ref="treeRef" :treeData="activeData.options" :actionList="actionList" />
      <div class="add-btn">
        <a-button type="link" @click="addTreeItem" style="padding: 4px 0"><PlusOutlined />添加顶级</a-button>
        <a-divider type="vertical"></a-divider>
        <!-- <a-button type="link" @click="openTreeModal(true, { options: activeData.options })" style="padding: 4px 0">批量编辑</a-button> -->
      </div>
    </template>
    <template v-else>
      <draggable v-model="activeData.options" :animation="300" group="selectItem" handle=".option-drag" itemKey="uuid">
        <template #item="{ element, index }">
          <div class="select-item">
            <div class="select-line-icon option-drag">
              <DragOutlined style="font-size: 16px" />
            </div>
            <a-input v-model:value="element.fullName" placeholder="选项名" />
            <a-input v-model:value="element.id" placeholder="选项值" />
            <div class="close-btn select-line-icon" @click="activeData.options.splice(index, 1)">
              <DeleteOutlined style="font-size: 16px" />
            </div>
          </div>
        </template>
      </draggable>
      <div class="add-btn">
        <a-button type="link" preIcon="icon-ym icon-ym-btn-add" @click="addSelectItem" style="padding: 4px 0">添加选项</a-button>
        <a-divider type="vertical"></a-divider>
        <a-button type="link" @click="openModal(true, { options: activeData.options })" style="padding: 4px 0">批量编辑</a-button>
      </div>
    </template>
  </div>

  <a-divider></a-divider>
  <BatchOperate @register="registerBatchOperate" @confirm="onBatchOperateConfirm" />
  <TreeNodeModal ref="treeNodeRef" @confirm="onTreeNodeConfirm" />
  <!-- <TreeBatchOperate @register="registerTreeBatchOperate" @confirm="onBatchOperateConfirm" /> -->
</template>
<script lang="ts" setup>
  import type { TreeActionItem, TreeActionType } from '@/components/Tree';

  import draggable from 'vuedraggable';
  import { PlusOutlined, FormOutlined, DeleteOutlined, DragOutlined } from '@ant-design/icons-vue';
  import { onMounted, h, ref, unref } from 'vue';
  import { useDynamic } from '../../hooks/useDynamic';
  import { useField } from '../../hooks/useField';
  import { useModal } from '@/components/Modal';
  import BatchOperate from './BatchOperate.vue';
  import TreeBatchOperate from './TreeBatchOperate.vue';
  import TreeNodeModal from './TreeNodeModal.vue';
  import { BasicTree } from '@/components/Tree';

  const emit = defineEmits(['propsChildrenChange']);
  const props = defineProps(['activeData', 'dicOptions']);
  const treeRef = ref<Nullable<TreeActionType>>(null);
  const treeNodeRef = ref(null);

  const currentNode = ref<any>(null);
  const { initFieldData } = useField(props.activeData);
  const { onDataTypeChange, dataTypeOptions, addSelectItem, onBatchOperateConfirm } = useDynamic(props.activeData, initFieldData);
  const [registerBatchOperate, { openModal }] = useModal();
  const actionList: TreeActionItem[] = [
    {
      render: node => {
        return h(PlusOutlined, {
          class: 'ml-4px',
          title: '添加',
          onClick: () => {
            handleAdd(node);
          },
        });
      },
    },
    {
      render: node => {
        return h(FormOutlined, {
          class: 'ml-4px',
          title: '编辑',
          onClick: () => {
            handleEdit(node);
          },
        });
      },
    },
    {
      render: node => {
        return h(DeleteOutlined, {
          class: 'ml-4px',
          title: '删除',
          onClick: () => {
            handleDelete(node);
          },
        });
      },
    },
  ];
  function getTree() {
    const tree = unref(treeRef);
    if (!tree) {
      throw new Error('tree is null!');
    }
    return tree;
  }
  function handleAdd(node: any) {
    const data = getTree().getSelectedNode(node.id) as any;
    if (!Reflect.has(data, 'children')) data.children = [];
    currentNode.value = data.children;
    (unref(treeNodeRef) as any).openModal();
  }
  function handleEdit(node: any) {
    const data = getTree().getSelectedNode(node.id) as any;
    currentNode.value = data;
    (unref(treeNodeRef) as any).openModal(data);
  }
  function handleDelete(node: any) {
    props.activeData.__config__.defaultValue = [];
    getTree().deleteNodeByKey(node.id);
  }

  function addTreeItem() {
    (unref(treeNodeRef) as any).openModal();
    currentNode.value = props.activeData.options;
  }
  function onTreeNodeConfirm(data, isEdit) {
    if (!isEdit) return currentNode.value.push(data);
    getTree().updateNodeByKey(currentNode.value.id, data);
  }
  function onPropsChildrenChange() {
    emit('propsChildrenChange');
  }

  onMounted(() => initFieldData());
</script>
