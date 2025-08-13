<template>
  <div :class="`${prefixCls}`">
    <div class="left-board common-board">
      <a-tabs v-model:activeKey="leftTabActiveKey" :tabBarGutter="10" class="average-tabs">
        <a-tab-pane key="1" tab="组件" />
      </a-tabs>
      <ScrollContainer>
        <a-collapse v-model:activeKey="leftActiveKey" expandIconPosition="end" ghost v-show="leftTabActiveKey === '1'">
          <a-collapse-panel :header="item.title" :key="item.id" v-for="item in leftComponents" class="components-list">
            <draggable
              class="components-draggable"
              v-model="item.list"
              item-key="__config__.ferKey"
              filter=".disabled"
              :sort="false"
              draggable=".components-item"
              :clone="cloneComponent"
              :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
              @end="onLeftEnd">
              <template #item="{ element }">
                <div class="components-item" :class="{ disabled: element.__config__.dragDisabled }" @click="addComponent(element)">
                  <div class="components-body">
                    <component :is="iconMap[element.__config__.tag]"></component>
                    {{ element.__config__.label }}
                  </div>
                </div>
              </template>
            </draggable>
          </a-collapse-panel>
        </a-collapse>
      </ScrollContainer>
    </div>
    <div class="center-board common-board">
      <div class="action-bar">
        <div class="action-bar-left"> </div>
        <div class="action-bar-right">
          <a-tooltip :title="t('common.prev')">
            <a-button type="text" class="action-bar-btn" :disabled="!getCanUndo" @click="handlePrev(replaceDrawingList)">
              <UndoOutlined />
            </a-button>
          </a-tooltip>
          <a-tooltip :title="t('common.next')">
            <a-button type="text" class="action-bar-btn" :disabled="!getCanRedo" @click="handleNext(replaceDrawingList)">
              <RedoOutlined />
            </a-button>
          </a-tooltip>
          <a-divider type="vertical" class="action-bar-divider" />
          <a-tooltip :title="t('common.cleanText')">
            <a-button type="text" class="action-bar-btn" @click="handleClear">
              <ClearOutlined />
            </a-button>
          </a-tooltip>
          <a-tooltip :title="t('common.previewText')">
            <a-button type="text" class="action-bar-btn" @click="handlePreview">
              <PlayCircleOutlined />
            </a-button>
          </a-tooltip>
          <a-tooltip title="获取表单对象（console todo...）">
            <a-button type="text" class="action-bar-btn" @click="handleFormInfo">
              <ContainerOutlined />
            </a-button>
          </a-tooltip>
        </div>
      </div>
      <div class="center-board-main">
        <ScrollContainer>
          <a-row class="center-board-row" :gutter="formConf.gutter || 15">
            <a-form
              :colon="formConf.colon"
              :size="formConf.size"
              :layout="formConf.labelPosition === 'top' ? 'vertical' : 'horizontal'"
              :labelAlign="formConf.labelPosition === 'right' ? 'right' : 'left'">
              <draggable class="drawing-board" v-model="drawingList" :animation="300" group="componentsGroup" item-key="renderKey" @end="onCenterEnd">
                <template #item="{ element, index }">
                  <draggable-item
                    :key="element.renderKey"
                    :drawing-list="drawingList"
                    :element="element"
                    :index="index"
                    :active-id="activeId"
                    :form-conf="formConf"
                    @activeItem="activeFormItem"
                    @copyItem="drawingItemCopy"
                    @deleteItem="drawingItemDelete" />
                </template>
              </draggable>
              <div v-show="!drawingList.length" class="empty-info">
                <a-empty />
                <!-- <img src="@/assets/images/emptyElement.png" class="empty-img" /> -->
              </div>
            </a-form>
          </a-row>
        </ScrollContainer>
      </div>
    </div>
    <RightPanel v-bind="getRightPanelBind" />
    <PreviewModal @register="registerPreviewModal" :formConf="formConf" />
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, toRefs, nextTick, computed, unref } from 'vue';
  import draggable from 'vuedraggable';
  import { cloneDeep } from 'lodash-es';
  import { ClearOutlined, PlayCircleOutlined, UndoOutlined, RedoOutlined, ContainerOutlined } from '@ant-design/icons-vue';
  import { buildBitUUID } from '@fer-codeless/utils';
  import { ScrollContainer } from '@/components/Container';
  import DraggableItem from './components/DraggableItem.vue';
  import PreviewModal from './components/PreviewModal.vue';
  import { useModal } from '@/components/Modal';
  import RightPanel from './components/RightPanel/index.vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useRedo } from '../../hooks/useRedo';
  import { useDesign } from '@/hooks/web/useDesign';

  import { basicComponents, advanceComponents, systemComponents, layoutComponents, formConf as defaultFormConf } from '../../helper/componentMap';
  import { iconMap } from '@/helper/iconMap';

  interface State {
    leftComponents: any[];
    leftActiveKey: string[];
    leftTabActiveKey: string;
    formConf: any;
    drawingList: any[];
    activeId: any;
    activeData: any;
  }

  const props = defineProps(['formInfo']);
  const { prefixCls } = useDesign('basic-generator');
  const { t } = useI18n();
  const [registerPreviewModal, { openModal: openPreviewModal }] = useModal();
  const { createMessage, createConfirm } = useMessage();
  let tempActiveData;

  const state = reactive<State>({
    leftComponents: [
      { id: '1', title: '基础组件', list: basicComponents },
      { id: '2', title: '高级组件', list: advanceComponents },
      // { id: '3', title: '系统组件', list: systemComponents },
      { id: '4', title: '布局组件', list: layoutComponents },
    ],
    leftActiveKey: ['1', '2', '3', '4'],
    leftTabActiveKey: '1',
    formConf: cloneDeep(defaultFormConf),
    drawingList: [],
    activeId: null,
    activeData: {},
  });

  const { leftComponents, leftTabActiveKey, leftActiveKey, formConf, drawingList, activeId } = toRefs(state);
  const { addRecord, getCanRedo, getCanUndo, handlePrev, handleNext } = useRedo();

  const getRightPanelBind = computed(() => {
    return {
      activeData: state.activeData,
      formConf: state.formConf,
      drawingList: state.drawingList,
      formInfo: props.formInfo,
    };
  });

  /**
   * left component
   */
  // 处理对应组件配置：添加 id 和 renderKey
  function createIdAndKey(item) {
    const uuid = buildBitUUID();
    const config = item.__config__;
    config.formId = 'formItem' + uuid;
    config.renderKey = +new Date();

    if (config.layout === 'colFormItem') {
      item.__vModel__ = `${config.ferKey}Field${uuid}`;
    }

    return item;
  }
  // 点击组件时添加至表单，并激活
  function addComponent(item) {
    const clone = cloneComponent(item);
    (state.drawingList as any[]).push(clone);
    activeFormItem(clone);
    addLocalRecord(state.drawingList);
  }
  // 拖拽时赋复制对应组件配置
  function cloneComponent(origin) {
    const clone = cloneDeep(origin);
    const config = clone.__config__;
    createIdAndKey(clone);
    tempActiveData = clone;
    return tempActiveData;
  }
  // 激活当前点击的表单项组件
  function activeFormItem(element) {
    state.activeData = element;
    state.activeId = element.__config__.formId;
  }
  // 左侧组件拖拽结束
  function onLeftEnd(obj) {
    if (obj.from !== obj.to) {
      state.activeData = tempActiveData;
      state.activeId = tempActiveData.__config__.formId;
    }
    addLocalRecord(state.drawingList);
  }

  /**
   * center component
   */
  // 中间表单拖拽完成事件
  function onCenterEnd() {
    console.log('中间拖拽结束');
  }
  // 组装表单属性和表单项
  function assembleFormData() {
    state.formConf = {
      ...state.formConf,
      fields: cloneDeep(state.drawingList),
    };
  }
  // 预览表单
  function handlePreview() {
    assembleFormData();
    openPreviewModal(true, { formConf: unref(state.formConf) });
  }
  // 清空
  function handleClear() {
    createConfirm({
      iconType: 'warning',
      title: t('common.tipTitle'),
      content: t('formGenerator.cleanComponentTip'),
      onOk: () => {
        state.drawingList = [];
        addLocalRecord(state.drawingList);
      },
    });
  }
  function addLocalRecord(val) {
    addRecord(val);
  }
  function handleFormInfo() {
    assembleFormData();
  }
  // 复制表单项
  function drawingItemCopy(item, parent, isActiveFormItem = true) {
    let clone = cloneDeep(item);
    clone = createIdAndKey(clone); // 重新生成 key
    parent.push(clone);
    isActiveFormItem && activeFormItem(clone);
    addLocalRecord(state.drawingList);
  }
  // 删除表单项
  function drawingItemDelete(index, parent) {
    parent.splice(index, 1);
    // nextTick(() => {
    //   const len = state.drawingList.length;
    //   if (len) activeFormItem(state.drawingList[len - 1]);
    //   addLocalRecord(state.drawingList);
    // });
  }

  function replaceDrawingList(data) {
    state.drawingList = cloneDeep(data);
    // state.copyDrawingList = JSON.stringify(state.drawingList);

    const loop = list => {
      for (const e of list) {
        console.log(e);
      }
    };

    loop(state.drawingList);
  }
</script>
