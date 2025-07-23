<script lang="tsx">
  import { defineComponent, ref, watch, computed, unref, toRaw } from 'vue';
  import { buildUUID } from '@fer-codeless/utils';
  import { useI18n } from '@/hooks/web/useI18n';

  interface State {
    formData: any;
    formRules: any;
    relations: any;
    tableRefs: any;
    options: any;
    formConfCopy: any;
  }

  export default defineComponent({
    setup(props, { expose, emit }) {
      const state = reactive<State>({
        formData: {},
        formRules: {},
        relations: {},
        tableRefs: {},
        options: {},
        formConfCopy: {},
      });
      state.formConfCopy = cloneDeep(props.formConf);

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
            <a-col span={config.span} class={[...(config.className || []), 'ant-col-item']}>
              <a-form-item v-slots={slots} required={config.required} labelCol={labelCol}>
                {Item}
              </a-form-item>
            </a-col>
          );
        },
      };

      // 设置表单唯一 name
      const getFormName = computed((): string => {
        return `form-${buildUUID()}`;
      });
      // 表单样式
      const getFormClass = computed((): string => {
        let className: string[] = ['dynamic-form', unref(getFormName)];
        if (props.formConf.className) className = [...className, ...props.formConf.className];
        return className;
      });

      function renderFrom() {
        let labelCol = { style: { width: state.formConfCopy.labelWidth + 'px' } };
        return (
          <a-row class={unref(getFormClass)}>
            <a-form
              class={props.formConf.className}
              ref={formElRef}
              model={state.formData}
              rules={state.formRules}
              name={unref(getFormName)}
              colon={false}
              size={state.formConfCopy.size}
              disabled={state.formConfCopy.disabled}
              labelCol={labelCol}
              layout={state.formConfCopy.labelPosition === 'top' ? 'vertical' : 'horizontal'}
              labelAlign={state.formConfCopy.labelPosition === 'right' ? 'right' : 'left'}>
              <a-row gutter={props.formConf.formStyle ? 0 : state.formConfCopy.gutter || 15}>{renderFormItem(state.formConfCopy.fields)}</a-row>
            </a-form>
          </a-row>
        );
      }

      function renderFormItem(elementList) {
        console.log(elementList);
        // return elementList.map(scheme => {
        //   const config = scheme.__config__;
        //   const layout = layouts[config.layout];
        //   if (layout) return layout(scheme);
        //   return null;
        // });
      }

      return () => {
        return renderForm();
      };
    },
  });
</script>
