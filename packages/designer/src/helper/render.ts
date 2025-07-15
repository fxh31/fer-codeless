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

    return () => {
      const dataObject = {};

      const ferKey = upperFirst(props.conf.__config__.ferKey);
      const Comp = componentMap.get(ferKey as ComponentType) as ReturnType<typeof defineComponent>;
      if (!Comp) return null;
      const realDataObject = {};
      return h(Comp, realDataObject as any);
    };
  },
});
