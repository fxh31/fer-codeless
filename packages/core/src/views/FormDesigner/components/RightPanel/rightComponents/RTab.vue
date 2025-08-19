<template>
  <a-form-item label="风格类型">
    <fer-radio v-model:value="activeData.type" :options="typeOptions" optionType="button" button-style="solid" class="right-radio" />
  </a-form-item>
  <a-form-item label="选项卡位置">
    <fer-radio v-model:value="activeData.tabPosition" :options="positionOptions" optionType="button" button-style="solid" class="right-radio" />
  </a-form-item>
  <a-divider>标签页配置</a-divider>
  <div class="options-list">
    <draggable v-model="activeData.__config__.children" :animation="300" group="selectItem" handle=".option-drag" itemKey="uuid">
      <template #item="{ element, index }">
        <div class="select-item">
          <div class="select-line-icon option-drag">
            <DragOutlined />
          </div>
          <fer-input v-model:value="element.title" placeholder="标签名称" />
          <div class="close-btn select-line-icon" @click="delItem(index, element)">
            <DeleteOutlined />
          </div>
        </div>
      </template>
    </draggable>
    <div class="add-btn">
      <a-button type="link" @click="addItem" style="padding: 4px 0"><PlusOutlined />添加标签页</a-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { inject, computed } from 'vue';
  import draggable from 'vuedraggable';
  import { DeleteOutlined, DragOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import { buildBitUUID } from '@fer-codeless/utils';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useI18n } from '@/hooks/web/useI18n';

  const typeOptions = [
    { id: '', fullName: '默认' },
    { id: 'card', fullName: '选项卡' },
  ];
  const positionOptions = [
    { id: 'top', fullName: '顶部' },
    { id: 'left', fullName: '左侧' },
    { id: 'right', fullName: '右侧' },
    { id: 'bottom', fullName: '底部' },
  ];

  defineOptions({ inheritAttrs: false });
  const props = defineProps(['activeData']);
  const { createMessage, createConfirm } = useMessage();
  const { t } = useI18n();

  function addItem() {
    const uuid = buildBitUUID();
    props.activeData.__config__.children.push({
      title: 'New Tab ' + uuid,
      titleI18nCode: '',
      name: uuid,
      __config__: {
        ferKey: 'tabItem',
        children: [],
      },
    });
  }
  function delItem(index, item) {
    const list = props.activeData.__config__.children;
    if (list.length < 2) return createMessage.warning('最后一项不能删除');
    createConfirm({
      iconType: 'warning',
      title: t('common.tipTitle'),
      content: '删除后不能撤销，确定要删除吗?',
      cancelText: t('common.cancelText'),
      okText: t('common.okText'),
      onOk: () => {
        if (props.activeData.__config__.active === item.name) {
          let nextTab = list[index + 1] || list[index - 1];
          if (nextTab) props.activeData.__config__.active = nextTab.name;
        }
        props.activeData.__config__.children.splice(index, 1);
      },
    });
  }
</script>
