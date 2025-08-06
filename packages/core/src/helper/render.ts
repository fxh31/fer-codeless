import type { ComponentType } from '@/components/Form/src/types/index';

import { defineComponent, h, ref, unref, onMounted, getCurrentInstance } from 'vue';
import { cloneDeep, upperFirst } from 'lodash-es';
import { componentMap } from '@/components/Form/src/componentMap';
import { getRealProps } from './transform';

export default defineComponent({
  props: {
    conf: {
      type: Object,
      required: true,
    },
    formData: {
      type: Object,
      default: () => {},
    },
    size: {
      type: String,
      default: 'default',
    },
    relations: Object,
  },
  setup(props, { emit }) {
    onMounted(() => {});

    // 默认值绑定
    function buildVModel(dataObject, defaultValue) {
      dataObject.value = defaultValue;
      // let obj = dataObject.on ?? {};
      // obj['update:value'] = val => {
      //   emit('update:value', val);
      // };
      // dataObject.on = obj;
    }

    function buildDataObject(confClone, dataObject, formData) {
      const ferKey = confClone.__config__.ferKey;
      Object.keys(confClone).forEach(key => {
        const val = confClone[key];
        if (key === '__vModel__') {
          buildVModel(dataObject, confClone.__config__.defaultValue);
        } else if (dataObject[key] !== undefined) {
        } else {
          dataObject[key] = val;
        }
      });
    }

    return () => {
      const dataObject = {};
      const confClone = cloneDeep(props.conf);

      // 转换 dataObject 对象：将json表单配置转化为vue render可以识别的数据对象(dataObject)
      buildDataObject(confClone, dataObject, props.formData);

      const ferKey = upperFirst(props.conf.__config__.ferKey);
      const Comp = componentMap.get(ferKey as ComponentType) as ReturnType<typeof defineComponent>;
      if (!Comp) return null;

      const realDataObject = getRealProps(dataObject, props.conf.__config__.ferKey);
      console.log('realProp', realDataObject);
      return h(Comp, realDataObject as any);
    };
  },
});
