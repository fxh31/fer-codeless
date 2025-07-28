<template>
  <div class="right-board common-board">
    <a-tabs v-model:activeKey="activeKey" :tabBarGutter="14" class="average-tabs">
      <a-tab-pane key="field" tab="组件属性"></a-tab-pane>
      <a-tab-pane key="style" tab="组件样式"></a-tab-pane>
      <a-tab-pane key="form" tab="表单属性"></a-tab-pane>
    </a-tabs>
    <div class="field-box" v-if="activeData?.__config__ && activeData.__config__.ferKey">
      <ScrollContainer>
        <a-form :colon="false" layout="vertical" v-show="activeKey === 'field'" class="right-board-form">
          <a-form-item label="组件类型">
            <a-input v-model:value="getCompName" disabled />
          </a-form-item>
          <a-form-item label="组件标题" v-if="!layoutList.includes(ferKey)">
            <a-input v-model:value="activeData.__config__.label" placeholder="请输入" />
          </a-form-item>
          <a-form-item label="组件字段" v-if="!layoutList.includes(ferKey)">
            <a-input v-model:value="activeData.__vModel__" placeholder="请输入" />
          </a-form-item>
          <a-form-item label="标题提示" v-if="hasTipLabel(ferKey)">
            <a-input v-model:value="activeData.__config__.tipLabel" placeholder="请输入" />
          </a-form-item>
          <component :is="getRightComp" v-bind="getRightCompBind" :key="activeData.__config__.renderKey" />
          <a-form-item label="是否禁用">
            <a-switch v-model:checked="activeData.disabled" />
          </a-form-item>
          <a-form-item label="是否隐藏">
            <a-switch v-model:checked="activeData.__config__.noShow" />
          </a-form-item>
          <div v-if="activeData.on">
            <a-divider>脚本事件</a-divider>
            <a-form-item :label="key" v-for="(_value, key) in activeData.on" :key="key">
              <a-button block @click="editFunc(key)">{{ getFuncText(key) }}</a-button>
            </a-form-item>
          </div>
        </a-form>
        <StylePane v-bind="getBindValue" v-show="activeKey === 'style'" />
        <FormAttrPane v-bind="getBindValue" v-show="activeKey === 'form'" />
      </ScrollContainer>
    </div>
    <FormScript @register="registerScriptModal" :treeTitle="formInfo.fullName" :drawingList="drawingList" @confirm="updateScript" />
  </div>
</template>

<script lang="ts" setup>
  import { reactive, toRefs, computed, unref, useAttrs } from 'vue';
  import { upperFirst } from 'lodash-es';
  import { inputComponents, layoutComponents } from '@/helper/componentMap';
  import { layoutList } from '@/helper/rightPanel';
  import { ScrollContainer } from '@/components/Container';
  import StylePane from './components/StylePane.vue';
  import FormAttrPane from './components/FormAttrPane.vue';
  import FormScript from './components/FormScript.vue';
  import * as RightComp from './rightComponents';
  import { useModal } from '@/components/Modal';

  const props = defineProps(['activeData', 'formConf', 'drawingList', 'formInfo']);
  const attrs = useAttrs();
  const [registerScriptModal, { openModal: openScriptModal }] = useModal();
  const state = reactive({
    activeKey: 'field',
    activeFunc: '',
  });

  const { activeKey } = toRefs(state);
  const getBindValue = computed(() => ({ ...props }));
  const ferKey = computed(() => unref(props.activeData).__config__?.ferKey);
  const getCompName = computed(() => {
    const allComps = [...inputComponents, ...layoutComponents];
    const comp = allComps.filter(o => o.__config__.ferKey === unref(ferKey));
    if (!comp.length) return '';
    return comp[0].__config__.label;
  });
  /**
   * 右侧表单动态组件（不同组件独有的组件属性）
   */
  const getRightComp = computed(() => {
    if (!unref(ferKey)) return null;
    // todo：根据不同的表单进行过滤
    return RightComp['R' + upperFirst(unref(ferKey))];
  });
  const getRightCompBind = computed(() => ({
    activeData: props.activeData,
    ...unref(attrs),
    drawingList: props.drawingList,
    formInfo: unref(props.formInfo),
  }));

  /**
   * 脚本事件
   */
  function getFuncText(key) {
    let text = '';
    switch (key) {
      case 'change':
        text = '发生变化时触发';
        break;
        text = '';
        break;
    }
    return text;
  }
  // 编辑脚本弹窗
  function editFunc(funcName) {
    state.activeFunc = funcName;
    openScriptModal(true, { text: props.activeData.on[state.activeFunc] });
  }
  // 修改脚本
  function updateScript(data) {
    props.activeData.on[state.activeFunc] = data;
  }
  /**
   * 控制标题提示配置
   */
  function hasTipLabel(ferKey) {
    return ![...layoutList].includes(ferKey);
  }
</script>
