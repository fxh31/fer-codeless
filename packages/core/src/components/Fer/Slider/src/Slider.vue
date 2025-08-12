<template>
  <div :class="`${prefixCls}`" :style="getStyle">
    <Slider v-bind="getBindValue">
      <template #[item]="data" v-for="item in Object.keys($slots)"><slot :name="item" v-bind="data || {}"></slot></template>
    </Slider>
  </div>
</template>

<script lang="ts" setup>
  import { Slider } from 'ant-design-vue';
  import { computed, unref, useAttrs } from 'vue';
  import { useDesign } from '@/hooks/web/useDesign';

  defineOptions({ name: 'FerSlider', inheritAttrs: false });

  const attrs = useAttrs();
  const { prefixCls } = useDesign('slider');

  const getBindValue: any = computed(() => ({ ...unref(attrs) }));
  const getStyle = computed(() => (Reflect.has(unref(attrs), 'style') ? unref(attrs).style : {}));
</script>
