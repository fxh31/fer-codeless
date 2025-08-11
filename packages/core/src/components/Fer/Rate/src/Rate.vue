<template>
  <Rate v-bind="getBindValue">
    <template #[item]="data" v-for="item in Object.keys($slots)"><slot :name="item" v-bind="data || {}"></slot></template>
  </Rate>
</template>

<script lang="ts" setup>
  import { Rate } from 'ant-design-vue';
  import { computed, unref, useAttrs } from 'vue';

  defineOptions({ name: 'FerRate', inheritAttrs: false });

  const attrs = useAttrs();

  const getBindValue = computed(() => ({ ...unref(attrs) }));
</script>
