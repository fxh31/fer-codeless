<template>
  <div :class="`${prefixCls} ${prefixCls + '-' + align}`">
    <a-button v-bind="getBindValue">{{ buttonText }}</a-button>
  </div>
</template>

<script lang="ts" setup>
  import { omit } from 'lodash-es';
  import { computed, unref, useAttrs } from 'vue';
  import { buttonProps } from './props';
  import { useDesign } from '@/hooks/web/useDesign';

  defineOptions({ name: 'FerButton', inheritAttrs: false });
  const props = defineProps(buttonProps);
  const attrs = useAttrs();
  const { prefixCls } = useDesign('button');
  const getBindValue = computed(() => omit({ ...unref(attrs), ...props }, ['align', 'buttonText']));
</script>
<style lang="less" scoped>
  @import '@/design.less';
  @prefix-cls: ~'@{namespace}-button';
  .@{prefix-cls} {
    // width: 100%;
    width: 100px;
    &&-left {
      text-align: left;
    }
    &&-center {
      text-align: center;
    }
    &&-right {
      text-align: right;
    }
  }
</style>
