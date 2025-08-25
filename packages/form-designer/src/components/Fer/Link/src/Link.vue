<template>
  <p :class="`${prefixCls}`" :style="textStyle">
    <span :class="`${prefixCls}--inner`" @click="onClick">{{ content }}</span>
  </p>
</template>

<script lang="ts" setup>
  import { linkProps } from './props';
  import { useDesign } from '@/hooks/web/useDesign';

  defineOptions({ name: 'FerLink', inheritAttrs: false });
  const props = defineProps(linkProps);
  const emit = defineEmits(['click']);
  const { prefixCls } = useDesign('link');

  function onClick(e) {
    emit('click', e);
    if (!props.href) return;
    if (props.target === '_self') {
      alert('todo：配合 router 实现跳转');
    } else if (props.target === '_blank') {
      window.open(props.href, props.target);
    }
  }
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-link';
  .@{prefix-cls} {
    line-height: 32px;
    font-size: 14px;
    margin: 0;
    & &--inner {
      cursor: pointer;
      word-break: break-all;
    }
  }
</style>
