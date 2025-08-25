<script lang="tsx">
  import type { FormInstance } from 'ant-design-vue';

  import { defineComponent, ref, watch, computed, unref, reactive, toRaw } from 'vue';
  import { BasicHelp } from '@/components/Basic';
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

          if (!config.noShow) {
            return (
              <a-col span={config.span} class={[...(config.className || []), 'ant-col-item']}>
                <a-form-item v-slots={slots} required={config.required} labelCol={labelCol}>
                  {Item}
                </a-form-item>
              </a-col>
            );
          }
        },
        rowFormItem(element) {
          const config = element.__config__;
          const listeners = buildListeners(element);

          if (config.ferKey === 'collapse') {
            return (
              <a-col span={config.span} class={props.formConf.formStyle ? '' : 'mb-20px'}>
                <a-collapse ghost={true} expandIconPosition="end" accordion={element.accordion} v-model:activeKey={config.active} {...listeners}>
                  {config.children.map(item => {
                    const child = renderChildren(item);
                    return (
                      <a-collapse-panel key={item.name} header={item.title} forceRender>
                        <a-row gutter={props.formConf.formStyle ? 0 : state.formConfCopy.gutter || 15}>{child}</a-row>
                      </a-collapse-panel>
                    );
                  })}
                </a-collapse>
              </a-col>
            );
          }

          if (config.ferKey === 'tableGrid') {
            return (
              <a-col span={config.span}>
                <table
                  class="table-grid-box"
                  style={{ '--borderType': config.borderType, '--borderColor': config.borderColor, '--borderWidth': config.borderWidth + 'px' }}>
                  <tbody>
                    {config.children.map(item => {
                      return (
                        <tr>
                          {item.__config__.children.map(it => {
                            const child = renderChildren(it);
                            if (it.__config__.merged) return '';
                            return (
                              <td
                                colspan={it.__config__.colspan || 1}
                                rowspan={it.__config__.rowspan || 1}
                                style={{ '--backgroundColor': it.__config__.backgroundColor, padding: '0px' }}>
                                <a-col style={{ padding: '0px' }}>
                                  <a-row gutter={state.formConfCopy.gutter || 15}>{child}</a-row>
                                </a-col>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </a-col>
            );
          }

          if (config.ferKey === 'tab') {
            return (
              <a-col span={config.span} class={props.formConf.formStyle} style={{ marginBottom: '10px' }}>
                <a-tabs type={element.type} size={props.formConf.size} tabPosition={element.tabPosition} v-model:activeKey={config.active} {...listeners}>
                  {config.children.map(item => {
                    const child = renderChildren(item);
                    return (
                      <a-tab-pane forceRender key={item.name} tab={item.title}>
                        <a-row gutter={props.formConf.formStyle ? 0 : state.formConfCopy.gutter || 15}>{child}</a-row>
                      </a-tab-pane>
                    );
                  })}
                </a-tabs>
              </a-col>
            );
          }

          const child = renderChildren(element);

          if (config.ferKey === 'row') {
            return (
              <a-col span={config.span}>
                <a-row gutter={props.formConf.formStyle ? 0 : state.formConfCopy.gutter || 15}>{child}</a-row>
              </a-col>
            );
          }

          if (config.ferKey === 'card') {
            let basicHelp: any = null;
            const header = element.header;
            const tipLabel = config.tipLabelI18nCode ? t(config.tipLabelI18nCode, config.tipLabel) : config.tipLabel;
            if (tipLabel) basicHelp = <BasicHelp text={tipLabel} />;
            const cardSlots = {
              title: () => {
                if (!header) return null;
                return (
                  <span>
                    {header}
                    {basicHelp}
                  </span>
                );
              },
            };
            return (
              <a-col span={config.span}>
                <a-card style={{ marginBottom: '20px' }} v-slots={cardSlots} size={props.formConf.size} hoverable={element.shadow === 'hover'}>
                  <a-row gutter={props.formConf.formStyle ? 0 : state.formConfCopy.gutter || 15}>{child}</a-row>
                </a-card>
              </a-col>
            );
          }
        },
      };

      // 设置表单唯一 name
      const getFormName = computed((): string => {
        return `form-${buildUUID()}`;
      });
      // 表单样式
      const getFormClass = computed((): string => {
        let className: string[] = ['dynamic-form', unref(getFormName)];
        if (props.formConf.formStyle) className.push(props.formConf.formStyle);
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
                func({ data: arg[0] });
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
        const labelCol = { style: { width: state.formConfCopy.labelWidth + 'px' } };

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
      // 渲染表单项
      function renderFormItem(elementList) {
        return elementList.map(scheme => {
          const config = scheme.__config__;
          const layout = layouts[config.layout];
          if (layout) return layout(scheme);
          return null;
        });
      }
      // 渲染组件内部的子组件
      function renderChildren(scheme) {
        const config = scheme.__config__;
        if (!Array.isArray(config.children)) return null;
        return renderFormItem(config.children);
      }

      return () => {
        return renderForm();
      };
    },
  });
</script>
