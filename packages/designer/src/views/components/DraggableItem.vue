<script lang="tsx">
  import { defineComponent, h } from 'vue';
  import draggable from 'vuedraggable';
  import render from '@/helper/render';

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
      const components = {};

      const layouts = {
        colFormItem(element, index, parent) {
          const { onActiveItem } = attrs as AttrsType;
          const config = element.__config__;
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
