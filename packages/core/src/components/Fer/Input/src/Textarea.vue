<template>
  <Textarea v-bind="getBindValue" v-model:value="innerValue" @change="onChange">
    <template #[item]="data" v-for="item in Object.keys($slots)"><slot :name="item" v-bind="data || {}"></slot></template>
  </Textarea>
</template>

<script lang="ts" setup>
  import { Textarea } from 'ant-design-vue';
  import { computed, ref, unref, watch, useAttrs } from 'vue';
  import { textareaProps } from './props';

  defineOptions({ name: 'FerTextarea', inheritAttrs: false });
  const props = defineProps(textareaProps);
  const emit = defineEmits(['update:value', 'change']);
  const attrs = useAttrs();
  const innerValue = ref('');

  const getBindValue = computed(() => ({ ...unref(attrs), rows: props.rows }));

  watch(
    () => props.value,
    val => {
      setValue(val);
    },
    { immediate: true },
  );

  function setValue(value) {
    innerValue.value = value;
  }
  function onChange(e) {
    emit('update:value', e.target.value);
    emit('change', e.target.value);
  }
</script>
