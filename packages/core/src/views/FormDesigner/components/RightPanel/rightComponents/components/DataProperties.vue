<template>
  <a-divider>数据选项</a-divider>
  <a-form-item class="flex justify-center">
    <fer-radio v-model:value="activeData.__config__.dataType" :options="dataTypeOptions" optionType="button" buttonStyle="solid" @change="onDataTypeChange" />
  </a-form-item>
  <div class="options-list" v-if="activeData.__config__.dataType === 'static'">
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
      <a-button type="link" preIcon="icon-ym icon-ym-btn-add" @click="addSelectItem" class="!px-0">添加选项</a-button>
      <a-divider type="vertical"></a-divider>
      <a-button type="link" @click="openModal(true, { options: activeData.options })" class="!px-0">批量编辑</a-button>
    </div>
  </div>

  <a-divider></a-divider>
  <BatchOperate @register="registerBatchOperate" @confirm="onBatchOperateConfirm" />
</template>
<script lang="ts" setup>
  import draggable from 'vuedraggable';
  import { PlusOutlined, FormOutlined, DeleteOutlined, DragOutlined } from '@ant-design/icons-vue';
  import { onMounted, h, ref, unref } from 'vue';
  import { useDynamic } from '../../hooks/useDynamic';
  import { useField } from '../../hooks/useField';
  import { useModal } from '@/components/Modal';
  import BatchOperate from './BatchOperate.vue';

  const props = defineProps(['activeData', 'dicOptions']);

  const currentNode = ref<any>(null);
  const { initFieldData } = useField(props.activeData);
  const { onDataTypeChange, dataTypeOptions, addSelectItem, onBatchOperateConfirm } = useDynamic(props.activeData, initFieldData);
  const [registerBatchOperate, { openModal }] = useModal();

  onMounted(() => initFieldData());
</script>
