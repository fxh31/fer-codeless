<script lang="tsx">
  import { defineComponent, h } from 'vue';
  import { CopyOutlined, DeleteOutlined } from '@ant-design/icons-vue';
  import draggable from 'vuedraggable';
  import { BasicHelp } from '@/components/Basic/index';
  import render from '@/helper/render';
  import { useI18n } from '@/hooks/web/useI18n';

  interface AttrsType {
    onActiveItem: (element) => void;
    onCopyItem: (element, parent) => void;
    onDeleteItem: (index, parent) => void;
    put: (...args: unknown[]) => void;
    end: (...args: unknown[]) => void;
    onAddRow: (element) => void;
    onAddCol: (element) => void;
  }

  export default defineComponent({
    inheritAttrs: false,
    components: {
      draggable,
      render,
      BasicHelp,
    },
    props: ['element', 'index', 'drawingList', 'activeId', 'formConf', 'showType'],
    setup(props, { attrs }) {
      const { t } = useI18n();
      let activeData = {};
      const useCompList = ['groupTitle', 'button', 'text', 'link', 'alert', 'qrcode'];

      const components = {
        // 表单项按钮
        itemBtns(element, index, parent, isTableGrid = false) {
          const gutter = element.__config__?.layout === 'colFormItem' && props.formConf?.gutter ? props.formConf.gutter : 0;
          const rightDistance = gutter;
          const { onCopyItem, onDeleteItem } = attrs as unknown as AttrsType;
          const tableSetting = (element, isTableGrid) => {
            const { onAddRow, onAddCol } = attrs as unknown as AttrsType;
            if (!isTableGrid) return null;
            return [
              <span
                class="drawing-item-action-item drawing-item-add-row"
                title="插入行"
                onClick={event => {
                  onAddRow(element);
                  event.stopPropagation();
                }}>
                <i class="icon-ym icon-ym-generator-insertRow" />
              </span>,
              <span
                class=" drawing-item-action-item drawing-item-add-col"
                title="插入列"
                onClick={event => {
                  onAddCol(element);
                  event.stopPropagation();
                }}>
                <i class="icon-ym icon-ym-generator-insertCol" />
              </span>,
            ];
          };
          return (
            <div class="drawing-item-action" style={{ '--rightDistance': rightDistance + 10 + 'px' }}>
              {tableSetting(element, isTableGrid)}
              <div class="drawing-item-action-container">
                <span
                  class="drawing-item-action-item drawing-item-copy"
                  title={t('common.copyText')}
                  onClick={event => {
                    onCopyItem(element, parent);
                    event.stopPropagation();
                  }}>
                  <a-button shape="circle" icon={h(CopyOutlined)} />
                </span>
                <a-popconfirm
                  title={t('formGenerator.delComponentTip')}
                  class="drawing-item-action-item drawing-item-delete"
                  cancelText={t('common.cancelText')}
                  okText={t('common.okText')}
                  onConfirm={_ => {
                    onDeleteItem(index, parent);
                  }}>
                  <span title={t('common.delText')}>
                    <a-button shape="circle" icon={h(DeleteOutlined)} />
                  </span>
                </a-popconfirm>
              </div>
            </div>
          );
        },
      };

      const layouts = {
        colFormItem(element, index, parent) {
          const { onActiveItem } = attrs as AttrsType;
          const config = element.__config__;
          const className = props.activeId === config.formId ? 'drawing-item active-from-item' : 'drawing-item';
          const globalLabelWidth = props.formConf.labelWidth;
          let labelCol = {};
          if (props.formConf.labelPosition !== 'top' && config.showLabel) {
            const labelWidth = (config.labelWidth || globalLabelWidth) + 'px';
            labelCol = { style: { width: labelWidth } };
          }
          const Item = (
            <render
              key={config.renderKey}
              conf={element}
              size={element.size ? element.size : props.formConf.size}
              onUpdate:value={v => {
                config.defaultValue = v;
              }}
            />
          );

          let basicHelp: any = null;
          if (config.label && config.tipLabel) basicHelp = <BasicHelp text={config.tipLabel} />;
          const labelSuffix = !config.isSubTable && props.formConf.labelSuffix ? props.formConf.labelSuffix : '';
          const slots = {
            label: () => {
              if (!config.showLabel) return null;
              return (
                <span>
                  {config.label ? config.label + labelSuffix : ''}
                  {basicHelp}
                </span>
              );
            },
          };

          return (
            <a-col
              class={className}
              span={config.span}
              data-draggable={true}
              draggable={false}
              onClick={event => {
                onActiveItem(element);
                event.stopPropagation();
              }}>
              <a-form-item v-slots={slots} required={config.required} labelCol={labelCol}>
                {Item}
              </a-form-item>
              {components.itemBtns(element, index, parent)}
            </a-col>
          );
        },
        rowFormItem(element, index, parent) {
          const { onActiveItem, put, end } = attrs as unknown as AttrsType;
          const config = element.__config__;
          const className = props.activeId === config.formId ? 'drawing-row-item active-from-item' : 'drawing-row-item';

          if (config.ferKey === 'collapse') {
            return (
              <a-col
                span={24}
                data-draggable={true}
                draggable={false}
                onClick={event => {
                  onActiveItem(element);
                  event.stopPropagation();
                }}>
                <a-row class={className}>
                  <a-collapse ghost={true} expandIconPosition="end" accordion={element.accordion} v-model:activeKey={config.active}>
                    {config.children.map(item => {
                      const group = { name: 'componentsGroup', put: (...arg) => put(...arg, item) };
                      const onEnd = (...arg) => end(...arg, activeData, item);
                      const slots = {
                        item: ({ element: childElement, index }) => {
                          return renderChildren(childElement, index, item.__config__.children);
                        },
                      };
                      let tip: JSX.Element | Element | null = null;
                      if (!item.__config__.children.length) {
                        tip = <div class="row-tip">请将组件拖到此区域(可拖多个组件)</div>;
                      }
                      return (
                        <a-collapse-panel key={item.name} header={item.title}>
                          <a-col>
                            {tip}
                            <a-row gutter={props.formConf.gutter || 15}>
                              <draggable
                                v-model={item.__config__.children}
                                v-slots={slots}
                                item-key="renderKey"
                                animation={300}
                                group={group}
                                onEnd={onEnd}
                                class="drag-wrapper"></draggable>
                            </a-row>
                          </a-col>
                        </a-collapse-panel>
                      );
                    })}
                  </a-collapse>
                  {components.itemBtns(element, index, parent)}
                </a-row>
              </a-col>
            );
          }

          if (config.ferKey === 'tab') {
            return (
              <a-col
                span={config.span}
                data-draggable={true}
                draggable={false}
                onClick={event => {
                  onActiveItem(element);
                  event.stopPropagation();
                }}>
                <a-row class={className}>
                  <a-tabs
                    type={element.type}
                    size={props.formConf.size}
                    tabPosition={props.showType === 'app' ? 'top' : element.tabPosition}
                    v-model:activeKey={config.active}>
                    {config.children.map(item => {
                      const group = { name: 'componentsGroup', put: (...arg) => put(...arg, item) };
                      const onEnd = (...arg) => end(...arg, activeData, item);
                      const slots = {
                        item: ({ element: childElement, index }) => {
                          return renderChildren(childElement, index, item.__config__.children);
                        },
                      };
                      let tip: JSX.Element | Element | null = null;
                      if (!item.__config__.children.length) {
                        tip = <div class="row-tip">请将组件拖到此区域(可拖多个组件)</div>;
                      }
                      return (
                        <a-tab-pane key={item.name} tab={item.title}>
                          <a-col>
                            {tip}
                            <a-row gutter={props.formConf.gutter || 15}>
                              <draggable
                                v-model={item.__config__.children}
                                v-slots={slots}
                                item-key="renderKey"
                                animation={300}
                                group={group}
                                onEnd={onEnd}
                                class="drag-wrapper"
                                style="padding-top:12px"></draggable>
                            </a-row>
                          </a-col>
                        </a-tab-pane>
                      );
                    })}
                  </a-tabs>
                  {components.itemBtns(element, index, parent)}
                </a-row>
              </a-col>
            );
          }

          const group = { name: 'componentsGroup', put: (...arg) => put(...arg, element) };
          const onEnd = (...arg) => end(...arg, activeData, element);
          const slots = {
            item: ({ element: childElement, index }) => {
              return renderChildren(childElement, index, config.children);
            },
          };

          let tip: JSX.Element | Element | null = null;
          if (!config.children.length) {
            tip = <div class="row-tip">请将组件拖到此区域(可拖多个组件)</div>;
          }
          if (config.ferKey === 'row') {
            return (
              <a-col
                span={config.span}
                data-draggable={true}
                draggable={false}
                onClick={event => {
                  onActiveItem(element);
                  event.stopPropagation();
                }}>
                <a-row class={className + ' drawing-row-item-row'}>
                  <span class="component-name">{config.componentName}</span>
                  <a-col>
                    <a-row gutter={props.formConf.gutter || 15} class="child-drawing-row">
                      {tip}
                      <draggable
                        v-model={config.children}
                        v-slots={slots}
                        item-key="renderKey"
                        animation={300}
                        group={group}
                        onEnd={onEnd}
                        class="drag-wrapper"
                        style="padding-top:30px"></draggable>
                    </a-row>
                  </a-col>
                  {components.itemBtns(element, index, parent)}
                </a-row>
              </a-col>
            );
          }
        },
      };

      function renderChildren(element, index, parent) {
        const layout = layouts[element.__config__.layout];
        if (layout) {
          return layout(element, index, parent);
        }
        return null;
      }

      return () => {
        const layout = layouts[props.element.__config__.layout];
        if (layout) {
          return layout(props.element, props.index, props.drawingList);
        }
        return null;
      };
    },
  });
</script>
