<script lang="tsx">
  import type { FormInstance } from 'ant-design-vue';

  import { defineComponent, ref, watch, computed, unref, reactive, toRaw } from 'vue';
  import { cloneDeep, upperFirst } from 'lodash-es';
  import { buildUUID } from '@fer-codeless/utils';
  import { getScriptFunc } from '@fer-codeless/utils';
  import { useI18n } from '@/hooks/web/useI18n';
  import render from '@/helper/render';

  interface State {
    formData: any;
    formRules: any;
    relations: any;
    tableRefs: any;
    options: any;
    formConfCopy: any;
  }

  export default defineComponent({
    props: ['formConf'],
    components: { render },
    setup(props, { expose, emit }) {
      const state = reactive<State>({
        formData: {},
        formRules: {},
        relations: {},
        tableRefs: {},
        options: {},
        formConfCopy: {},
      });
      const formElRef = ref<FormInstance>();

      state.formConfCopy = cloneDeep(props.formConf);
      const layouts = {
        colFormItem(element, index, parent) {
          const config = element.__config__;
          const listeners = buildListeners(element);
          const globalLabelWidth = props.formConf.labelWidth;
          let labelCol = {};
          if (props.formConf.labelPosition !== 'top' && config.showLabel) {
            const labelWidth = (config.labelWidth || globalLabelWidth) + 'px';
            if (!config.showLabel) labelWidth = '0px';
            labelCol = { style: { width: labelWidth } };
          }
          const Item = (
            <render key={config.renderKey} formData={state.formData} conf={element} size={element.size ? element.size : props.formConf.size} {...listeners} />
          );

          let basicHelp: any = null;
          const label = config.label;
          const tipLabel = config.tipLabel;
          if (config.showLabel && label && tipLabel) basicHelp = <BasicHelp text={tipLabel} />;
          let slots: any = {
            label: () => {
              if (!config.showLabel) return null;
              return (
                <span>
                  {label ? label + (props.formConf.labelSuffix || '') : ''}
                  {basicHelp}
                </span>
              );
            },
          };
          if (!config.showLabel) slots = {};

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

      // 绑定组件监听器
      function buildListeners(scheme) {
        const config = scheme.__config__;
        const listeners: any = {};

        if (scheme.on) {
          Object.keys(scheme.on).forEach(key => {
            const str = scheme.on[key];
            const func: any = getScriptFunc(str);
            if (!func) return;
            // 事件监听器
            listeners['on' + upperFirst(key)] = (...arg) => {
              if (key === 'change') {
                const data = arg.length > 1 ? arg[1] : arg[0];
                func({ data });
              } else {
                func({ data });
              }
            };
          });
        }

        // 响应 render.ts 中的 buildVModel 中 emit('update:value', val);
        listeners['onUpdate:value'] = event => {
          config.defaultValue = event;
          state.formData[scheme.__vModel__] = event;
        };
        return listeners;
      }
      // 渲染表单
      function renderForm() {
        let labelCol = { style: { width: state.formConfCopy.labelWidth + 'px' } };
        console.log(props.formConf);
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
        return elementList.map(scheme => {
          const config = scheme.__config__;
          const layout = layouts[config.layout];
          if (layout) return layout(scheme);
          return null;
        });
      }

      return () => {
        return renderForm();
      };
    },
  });
</script>
