<template>
  <a-form-item label="是否手风琴">
    <a-switch v-model:checked="activeData.accordion" />
  </a-form-item>
  <a-divider>面板配置</a-divider>
  <div class="options-list">
    <draggable v-model="activeData.__config__.children" :animation="300" group="selectItem" handle=".option-drag" itemKey="uuid">
      <template #item="{ element, index }">
        <div class="select-item">
          <div class="select-line-icon option-drag">
            <DragOutlined />
          </div>
          <fer-input v-model:value="element.title" placeholder="面板名称" />
          <div class="close-btn select-line-icon" @click="delItem(index)">
            <DeleteOutlined />
          </div>
        </div>
      </template>
    </draggable>
    <div class="add-btn">
      <a-button type="link" @click="addItem" style="padding: 4px 0"> <PlusOutlined />添加面板</a-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import draggable from 'vuedraggable';
  import { DeleteOutlined, DragOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import { buildBitUUID } from '@fer-codeless/utils';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useI18n } from '@/hooks/web/useI18n';

  defineOptions({ inheritAttrs: false });
  const props = defineProps(['activeData']);
  const { createMessage, createConfirm } = useMessage();
  const { t } = useI18n();

  function addItem() {
    const uuid = buildBitUUID();
    props.activeData.__config__.children.push({
      title: '新面板' + uuid,
      name: uuid,
      __config__: {
        ferKey: 'collapseItem',
        children: [],
      },
    });
  }
  function delItem(index) {
    const list = props.activeData.__config__.children;
    if (list.length < 2) return createMessage.warning('最后一项不能删除');
    createConfirm({
      iconType: 'warning',
      title: t('common.tipTitle'),
      content: '删除后不能撤销，确定要删除吗?',
      cancelText: t('common.cancelText'),
      okText: t('common.okText'),
      onOk: () => {
        props.activeData.__config__.children.splice(index, 1);
      },
    });
  }
</script>
