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
                    @deleteItem="drawingItemDelete"
                    :put="shouldClone"
                    :end="onTableEnd"
                    :mergeLeftColDisabled="mergeLeftColDisabled"
                    :mergeRightColDisabled="mergeRightColDisabled"
                    :mergeWholeRowDisabled="mergeWholeRowDisabled"
                    :mergeAboveRowDisabled="mergeAboveRowDisabled"
                    :mergeBelowRowDisabled="mergeBelowRowDisabled"
                    :mergeWholeColDisabled="mergeWholeColDisabled"
                    :undoMergeRowDisabled="undoMergeRowDisabled"
                    :undoMergeColDisabled="undoMergeColDisabled"
                    :deleteWholeColDisabled="deleteWholeColDisabled"
                    :deleteWholeRowDisabled="deleteWholeRowDisabled"
                    @addRow="handleTableAddRow"
                    @addCol="handleTableAddCol"
                    @handleTableSetting="handleTableSetting"
                    @handleShowMenu="handleShowMenu" />
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
    <RightPanel v-bind="getRightPanelBind" @handleTableSetting="handleTableSetting" />
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

  interface StateTable {
    rowIndex: number;
    colIndex: number;
    rowData: any[];
    colData: any[];
    selectCell: any;
    gridEl: any;
  }

  interface State extends StateTable {
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
      // { id: '2', title: '高级组件', list: advanceComponents },
      // { id: '3', title: '系统组件', list: systemComponents },
      { id: '4', title: '布局组件', list: layoutComponents },
    ],
    leftActiveKey: ['1', '2', '3', '4'],
    leftTabActiveKey: '1',
    formConf: cloneDeep(defaultFormConf),
    drawingList: [],
    activeId: null,
    activeData: {},
    // table 布局数据 --
    rowIndex: 0,
    colIndex: 0,
    rowData: [],
    colData: [],
    selectCell: {
      __config__: {
        rowspan: 1,
        colspan: 1,
      },
    },
    // 当前点击 tableGrid 元素，主要用于右侧配置面板获取
    gridEl: null,
    // --
  });

  const { leftComponents, leftTabActiveKey, leftActiveKey, formConf, drawingList, activeId } = toRefs(state);
  const { addRecord, getCanRedo, getCanUndo, handlePrev, handleNext } = useRedo();

  const getRightPanelBind = computed(() => {
    return {
      activeData: state.activeData,
      formConf: state.formConf,
      drawingList: state.drawingList,
      formInfo: props.formInfo,
      curEl: state.gridEl,
    };
  });
  /**
   * 表格布局，合并配置
   */
  const mergeLeftColDisabled = computed(() => {
    if (!state.colData.length) return true;
    return state.colIndex <= 0 || state.colData[state.colIndex - 1].__config__.rowspan !== state.selectCell.__config__.rowspan;
  });
  const mergeRightColDisabled = computed(() => {
    if (!state.colData.length) return true;
    let rightColIndex = state.colIndex + state.selectCell.__config__.colspan;
    return (
      state.colIndex >= state.colData.length - 1 ||
      rightColIndex > state.colData.length - 1 ||
      state.colData[rightColIndex].__config__.rowspan !== state.selectCell.__config__.rowspan
    );
  });
  const mergeWholeRowDisabled = computed(() => {
    if (!state.selectCell.__config__ || !state.rowData.length) return true;
    let rowDataChildren = state.rowData[state.rowIndex].__config__.children;
    let startRowspan = rowDataChildren[0].__config__.rowspan;
    let unmatchedFlag = false;
    for (let i = 1; i < rowDataChildren.length; i++) {
      if (rowDataChildren[i].__config__.rowspan !== startRowspan) {
        unmatchedFlag = true;
        break;
      }
    }
    if (unmatchedFlag) return true;
    return state.colData.length <= 1 || state.colData.length === state.selectCell.__config__.colspan;
  });
  const mergeAboveRowDisabled = computed(() => {
    if (!state.rowData.length || state.rowIndex <= 0) return true;
    return (
      state.rowData[state.rowIndex - 1].__config__.children[state.colIndex].__config__.colspan !== state.selectCell.__config__.colspan ||
      state.rowData[state.rowIndex - 1].__config__.children[state.colIndex].__config__.merged
    );
  });
  const mergeBelowRowDisabled = computed(() => {
    if (!state.rowData.length || state.rowIndex == state.rowData.length) return true;
    let belowRowIndex = state.rowIndex + state.selectCell.__config__.rowspan;
    return (
      state.rowIndex >= state.rowData.length - 1 ||
      belowRowIndex > state.rowData.length - 1 ||
      state.rowData[belowRowIndex].__config__.children[state.colIndex].__config__.colspan !== state.selectCell.__config__.colspan ||
      state.rowData[belowRowIndex].__config__.children[state.colIndex].__config__.merged
    );
  });
  const mergeWholeColDisabled = computed(() => {
    if (!state.rowData.length) return true;
    let startColspan = state.rowData[0].__config__.children[state.colIndex].__config__.colspan;
    let unmatchedFlag = false;
    for (let i = 1; i < state.rowData.length; i++) {
      if (state.rowData[i].__config__.children[state.colIndex].__config__.colspan !== startColspan) {
        unmatchedFlag = true;
        break;
      }
    }
    if (unmatchedFlag) return true;
    return state.rowData.length <= 1 || state.rowData.length === state.selectCell.__config__.rowspan;
  });
  const undoMergeRowDisabled = computed(() => {
    return state.selectCell.__config__.merged || state.selectCell.__config__.colspan <= 1;
  });
  const undoMergeColDisabled = computed(() => {
    return state.selectCell.__config__.merged || state.selectCell.__config__.rowspan <= 1;
  });
  const deleteWholeColDisabled = computed(() => {
    if (!state.rowData.length) return true;
    if (state.rowData[0].__config__.children[0].__config__.colspan === state.rowData[0].__config__.children.length) return true;
    let startColspan = state.rowData[0].__config__.children[state.colIndex].__config__.colspan;
    let unmatchedFlag = false;
    for (let i = 1; i < state.rowData.length; i++) {
      if (state.rowData[i].__config__.children[state.colIndex].__config__.colspan !== startColspan) {
        unmatchedFlag = true;
        break;
      }
    }
    if (unmatchedFlag) return true;
    return state.selectCell.__config__.colspan === state.colData.length;
  });
  const deleteWholeRowDisabled = computed(() => {
    if (!state.rowData.length || state.rowData.length <= state.rowIndex) return true;
    if (state.rowData[0].__config__.children[0].__config__.rowspan === state.rowData.length) return true;
    //整行所有单元格行高不一致不可删除！！
    let startRowspan = state.rowData[state.rowIndex].__config__.children[0].__config__.rowspan;
    let unmatchedFlag = false;
    for (let i = 1; i < state.rowData[state.rowIndex].__config__.children.length; i++) {
      if (state.rowData[state.rowIndex].__config__.children[i].__config__.rowspan !== startRowspan) {
        unmatchedFlag = true;
        break;
      }
    }
    if (unmatchedFlag) return true;
    return state.rowData.length === 1 || state.selectCell.__config__.rowspan === state.rowData.length;
  });

  // 插入行 - table
  function handleTableAddRow(element, insertPos, cloneRowIdx) {
    const row = element.__config__.children;
    let rowIdx = insertPos === undefined ? row.length : insertPos + row[cloneRowIdx].__config__.children[state.colIndex].__config__.rowspan - 1;
    let newRow = cloneRowIdx === undefined ? cloneDeep(row[row.length - 1]) : cloneDeep(row[cloneRowIdx]);
    newRow.__config__.children.forEach(col => {
      col.__config__.formId = 'formItem' + buildBitUUID();
      col.__config__.merged = false;
      col.__config__.colspan = 1;
      col.__config__.rowspan = 1;
      col.__config__.children = [];
    });
    newRow.__config__.formId = 'formItem' + buildBitUUID();
    newRow.__config__.ferKey = 'tableGridTr';
    element.__config__.children.splice(rowIdx, 0, newRow);
  }
  // 插入列 - table
  function handleTableAddCol(element, insertPos) {
    const row = element.__config__.children;
    let colIdx = insertPos === undefined ? row[0].__config__.children.length : insertPos; //确定插入列位置
    row.forEach(item => {
      let newCol = {
        __config__: {
          ferKey: 'tableGridTd',
          merged: false,
          colspan: 1,
          rowspan: 1,
          formId: 'formItem' + buildBitUUID(),
          children: [],
          backgroundColor: '',
        },
      };
      item.__config__.children.splice(colIdx, 0, newCol);
    });
  }
  // 向左合并列 - table
  function mergeTableCol(_element, type = 0) {
    let mergedColIndex = type == 1 ? state.colIndex : state.colIndex + state.colData[state.colIndex].__config__.colspan;
    let remainedColIndex = type == 1 ? state.colIndex - state.colData[state.colIndex - 1].__config__.colspan : state.colIndex;
    const colChildren = state.colData[mergedColIndex].__config__.children;
    const colChildren_ = state.colData[remainedColIndex].__config__.children;
    state.colData[remainedColIndex].__config__.children = [...colChildren_, ...cloneDeep(colChildren)];
    let newColspan = state.colData[mergedColIndex].__config__.colspan * 1 + state.colData[remainedColIndex].__config__.colspan * 1;
    setPropsOfMergedCols(remainedColIndex, newColspan, state.selectCell.__config__.rowspan);
  }
  // 合并所有列 - table
  function mergeWholeCol() {
    let childrenData = state.colData.filter(colItem => {
      return !colItem.merged && colItem.__config__.children?.length;
    });
    if (childrenData?.length) {
      childrenData.map((o, i) => {
        if (i == 0) state.colData[0].__config__.children = cloneDeep(o.__config__.children);
        if (i != 0) state.colData[0].__config__.children.push(...cloneDeep(o.__config__.children));
      });
    }
    setPropsOfMergedCols(0, state.colData.length, state.colData[state.colIndex].__config__.rowspan);
  }
  // 合并行 - table
  function mergeTableRow(type = 0) {
    let mergedRowIndex = type == 1 ? state.rowIndex : state.rowIndex + state.selectCell.__config__.rowspan;
    let remainedRowIndex = type == 1 ? state.rowIndex - 1 : state.rowIndex;
    let childrenData = state.rowData[mergedRowIndex].__config__.children[state.colIndex].__config__.children;
    let childrenData_ = state.rowData[remainedRowIndex].__config__.children[state.colIndex].__config__.children;
    state.rowData[remainedRowIndex].__config__.children[state.colIndex].__config__.children = [...childrenData_, ...cloneDeep(childrenData)];
    let newRowspan =
      state.rowData[mergedRowIndex].__config__.children[state.colIndex].__config__.rowspan * 1 +
      state.rowData[remainedRowIndex].__config__.children[state.colIndex].__config__.rowspan * 1;
    setPropsOfMergedRows(remainedRowIndex, state.selectCell.__config__.colspan, newRowspan);
  }
  // 合并所有行 - table
  function mergeWholeRow() {
    let childrenData: any[] = [];
    state.rowData.forEach(o => {
      let tempCell = o.__config__.children[state.colIndex];
      if (!o.__config__.merged && !!o.__config__.children && o.__config__.children.length) {
        childrenData.push(tempCell);
      }
    });
    let firstCellOfCol = state.rowData[0].__config__.children[state.colIndex];
    if (childrenData && childrenData.length) {
      childrenData.map((o, i) => {
        if (i != 0) firstCellOfCol.__config__.children.push(...cloneDeep(o.__config__.children));
      });
    }
    setPropsOfMergedRows(0, firstCellOfCol.__config__.colspan, state.rowData.length);
  }
  function undoMergeCol() {
    setPropsOfSplitCol(state.colIndex, state.selectCell.__config__.colspan, state.selectCell.__config__.rowspan);
  }
  function undoMergeRow() {
    setPropsOfSplitRow(state.colIndex, state.selectCell.__config__.colspan, state.selectCell.__config__.rowspan);
  }
  function deleteWholeCol() {
    let startColspan = state.rowData[0].__config__.children[state.colIndex].__config__.colspan;
    state.rowData.forEach(rItem => {
      rItem.__config__.children.splice(state.colIndex, startColspan);
    });
  }
  function deleteWholeRow() {
    let startRowspan = state.rowData[state.rowIndex].__config__.children[0].__config__.rowspan;
    state.rowData.splice(state.rowIndex, startRowspan);
  }
  function setPropsOfMergedCols(startColIndex, newColspan, rowspan) {
    for (let i = state.rowIndex; i < state.rowIndex + rowspan; i++) {
      for (let j = startColIndex; j < startColIndex + newColspan; j++) {
        if (i === state.rowIndex && j === startColIndex) {
          state.rowData[i].__config__.children[j].__config__.colspan = newColspan;
          continue;
        }
        state.rowData[i].__config__.children[j].__config__.merged = true;
        state.rowData[i].__config__.children[j].__config__.colspan = newColspan;
        state.rowData[i].__config__.children[j].__config__.children = [];
      }
    }
  }
  function setPropsOfMergedRows(startRowIndex, colspan, newRowspan, colIndex = 0) {
    if (!colIndex) colIndex = state.colIndex;
    for (let i = startRowIndex; i < startRowIndex + newRowspan; i++) {
      for (let j = colIndex; j < colIndex + colspan; j++) {
        if (i === startRowIndex && j === colIndex) {
          state.rowData[i].__config__.children[j].__config__.rowspan = newRowspan;
          continue;
        }
        state.rowData[i].__config__.children[j].__config__.merged = true;
        state.rowData[i].__config__.children[j].__config__.rowspan = newRowspan;
        state.rowData[i].__config__.children[j].__config__.children = [];
      }
    }
  }
  function setPropsOfSplitCol(startColIndex, colspan, rowspan) {
    for (let i = state.rowIndex; i < state.rowIndex + rowspan; i++) {
      for (let j = startColIndex; j < startColIndex + colspan; j++) {
        state.rowData[i].__config__.children[j].__config__.merged = false;
        state.rowData[i].__config__.children[j].__config__.rowspan = 1;
        state.rowData[i].__config__.children[j].__config__.colspan = 1;
      }
    }
  }
  function setPropsOfSplitRow(startColIndex, colspan, rowspan) {
    for (let i = state.rowIndex; i < state.rowIndex + rowspan; i++) {
      for (let j = startColIndex; j < startColIndex + colspan; j++) {
        state.rowData[i].__config__.children[j].__config__.merged = false;
        state.rowData[i].__config__.children[j].__config__.rowspan = 1;
        state.rowData[i].__config__.children[j].__config__.colspan = 1;
      }
    }
  }
  function handleTableSetting(e, element) {
    console.log(state.colIndex, state.rowIndex);
    switch (e) {
      case '1':
        //插入左侧列
        handleTableAddCol(element, state.colIndex);
        break;
      case '2':
        //插入右侧列
        handleTableAddCol(element, state.colIndex + 1);
        break;
      case '3':
        //插入上方行
        handleTableAddRow(element, state.rowIndex, state.rowIndex);
        break;
      case '4':
        //插入下方行
        handleTableAddRow(element, state.rowIndex + 1, state.rowIndex);
        break;
      case '5':
        //向左合并
        mergeTableCol(element, 1);
        break;
      case '6':
        //向右合并
        mergeTableCol(element);
        break;
      case '7':
        //合并整行
        mergeWholeCol();
        break;
      case '8':
        //向上合并
        mergeTableRow(1);
        break;
      case '9':
        //向下合并
        mergeTableRow();
        break;
      case '10':
        //合并整列
        mergeWholeRow();
        break;
      case '11':
        //撤销行合并
        undoMergeCol();
        break;
      case '12':
        //撤销列合并
        undoMergeRow();
        break;
      case '13':
        //删除整列
        deleteWholeCol();
        break;
      case '14':
        //删除整行
        deleteWholeRow();
        break;
      default:
        break;
    }
    resetData();
  }
  function resetData() {
    state.rowIndex = 0;
    state.colIndex = 0;
    state.rowData = [];
    state.colData = [];
    state.selectCell = {
      __config__: {
        rowspan: 1,
        colspan: 1,
      },
    };
  }
  function handleShowMenu(element, rowIndex, colIndex) {
    state.rowIndex = rowIndex;
    state.colIndex = colIndex;
    state.rowData = element.__config__.children;
    state.colData = state.rowData[rowIndex].__config__.children;
    state.selectCell = state.colData[colIndex];
  }

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
    } else if (config.layout === 'rowFormItem') {
      config.componentName = `${config.ferKey}${uuid}`;
      !Array.isArray(config.children) && (config.children = []);
    }
    if (Array.isArray(config.children)) {
      config.children = config.children.map(childItem => createIdAndKey(childItem, item));
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

    console.log(element, state);
    if (element.__config__.ferKey === 'tableGrid') {
      state.gridEl = element;
    }
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
  //
  function onTableEnd(obj) {}
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
      cancelText: t('common.cancelText'),
      okText: t('common.okText'),
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
  // 是否复制 - 阻止表格中嵌套容器
  function shouldClone(_to, _from, target, _event, conf) {
    const targetConf = target._underlying_vm_;

    if (conf.__config__.ferKey === 'tableGridTd' && targetConf.__config__.ferKey === 'tableGrid') return false;
    return true;
  }
</script>
