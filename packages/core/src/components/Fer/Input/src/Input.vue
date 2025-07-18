<template>
  <component :is="Comp" v-bind="getBindValue" v-model:value="innerValue" @change="onChange"></component>
</template>

<script lang="ts" setup>
  import { ref, unref, computed, watch, useAttrs } from 'vue';
  import { Input } from 'ant-design-vue';
  import { inputProps } from './props';

  defineOptions({ name: 'FerInput', inheritAttrs: false });
  const props = defineProps(inputProps);
  const emit = defineEmits(['update:value', 'change']);
  const attrs = useAttrs();
  const Comp = Input;

  const innerValue = ref('');

  const getBindValue = computed(() => ({ ...unref(attrs) }));

  watch(
    () => props.value,
    val => {
      setValue(val);
    },
    { immediate: true },
  );
  function setValue(val) {
    innerValue.value = val;
  }
  function onChange(e) {
    emit('update:value', e.target.value);
  }
</script>
