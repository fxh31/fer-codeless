<script lang="tsx">
  import { defineComponent, h } from 'vue';
  import { CopyOutlined, DeleteOutlined } from '@ant-design/icons-vue';
  import draggable from 'vuedraggable';
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
    },
    props: ['element', 'index', 'drawingList', 'activeId', 'formConf', 'showType'],
    setup(props, { attrs }) {
      const { t } = useI18n();

      const components = {
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
              onUpdate:value={event => {
                config.defaultValue = event;
              }}
            />
          );

          let basicHelp: any = null;
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
      };
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
