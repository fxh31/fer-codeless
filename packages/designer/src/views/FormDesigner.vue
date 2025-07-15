<template>
  <div class="fer-basic-generator">
    <div class="left-board common-board">
      <a-tabs v-model:activeKey="leftTabActiveKey" :tabBarGutter="10" class="average-tabs">
        <a-tab-pane key="1" tab="控件" />
      </a-tabs>

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
                  {{ element.__config__.label }}
                </div>
              </div>
            </template>
          </draggable>
        </a-collapse-panel>
      </a-collapse>
    </div>
    <div class="center-board common-board">
      <div class="action-bar">
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
                      :form-conf="formConf"
                      @activeItem="activeFormItem"
                      @copyItem="drawingItemCopy" />
                  </template>
                </draggable>
                <div v-show="!drawingList.length" class="empty-info">
                  empty
                  <!-- <img src="@/assets/images/emptyElement.png" class="empty-img" /> -->
                </div>
              </a-form>
            </a-row>
          </ScrollContainer>
        </div>
      </div>
    </div>
    <RightPanel v-bind="getRightPanelBind" @relationChange="onRelationChange" @addTableComponent="handleAddTableComponent" @activeFormItem="activeFormItem" />
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, toRefs } from 'vue';
  import draggable from 'vuedraggable';
  import { cloneDeep } from 'lodash-es';
  import { buildBitUUID } from '@fer-codeless/utils';
  import { ScrollContainer } from '@/components/Container';
  import DraggableItem from './components/DraggableItem.vue';
  import RightPanel from './components/RightPanel.vue';
  import { useRedo } from '../hooks/useRedo';

  import { inputComponents, selectComponents, systemComponents, layoutComponents, formConf as defaultFormConf } from '../helper/componentMap';

  interface State {
    leftComponents: any[];
    leftTabActiveKey: string;
    formConf: any;

    drawingList: any[];
    activeId: any;
  }

  const state = reactive<State>({
    leftComponents: [
      { id: '1', title: '基础控件', list: inputComponents },
      { id: '2', title: '高级控件', list: selectComponents },
      { id: '3', title: '系统控件', list: systemComponents },
      { id: '4', title: '布局控件', list: layoutComponents },
    ],
    leftActiveKey: ['1', '2', '3', '4'],
    leftTabActiveKey: '1',
    formConf: cloneDeep(defaultFormConf),
    drawingList: [],
    activeId: null,
  });

  const { leftComponents, leftTabActiveKey, leftActiveKey, formConf, drawingList } = toRefs(state);
  const { addRecord } = useRedo();

  /**
   * left component
   */
  // 处理对应组件配置：添加 id 和 renderKey
  function handleComponentConfig(item) {
    const uuid = buildBitUUID();
    const config = item.__config__;
    config.renderKey = +new Date();

    if (config.layout === 'colFormItem') {
      item.__vModel__ = `${config.ferKey}Field${uuid}`;
    }

    return item;
  }
  // 拖拽时赋复制对应组件配置
  function cloneComponent(origin) {
    const clone = cloneDeep(origin);
    const config = clone.__config__;
    handleComponentConfig(clone);
    console.log(clone);
    return clone;
  }
  // 激活当前点击的表单项组件
  function activeFormItem(element) {
    state.activeData = element;
  }

  function drawingItemCopy(item, parent, isActiveFormItem = true) {}

  // 左侧组件拖拽结束
  function onLeftEnd(obj) {
    addLocalRecord(state.drawingList);
  }

  /**
   * center component
   */
  function onCenterEnd() {}

  /**
   *
   */
  function addLocalRecord(val) {
    addRecord(val);
  }
</script>
