<template>
  <div :class="`${prefixCls}`">
    <QrCode :value="qrcode" :width="width" :options="options" tag="img" />
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, watch } from 'vue';
  import { useDesign } from '@/hooks/web/useDesign';
  import { QrCode } from '@/components/Qrcode/index';
  import { isNullOrUnDef } from '@fer-codeless/utils';

  defineOptions({ name: 'FerQrcode', inheritAttrs: false });
  const props = defineProps({
    dataType: { type: String, default: 'static' },
    colorDark: { type: String, default: '#000' },
    colorLight: { type: String, default: '#fff' },
    width: { type: Number, default: 100 },
    relationField: { type: String, default: '' },
    staticText: { type: String, default: '' },
    formData: { type: Object },
  });

  const { prefixCls } = useDesign('qrcode');
  const relationText = ref('');

  const options = computed(() => ({
    margin: 1,
    color: { dark: props.colorDark, light: props.colorLight },
  }));
  const qrcode = computed(() => {
    if (props.dataType === 'static') {
      return props.staticText;
    }
  });

  watch(
    () => props.formData,
    val => {
      if (val && props.dataType === 'relation' && props.relationField) {
        relationText.value = isNullOrUnDef(val[props.relationField]) ? '' : val[props.relationField];
      }
    },
    { deep: true, immediate: true },
  );
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-qrcode';
  .@{prefix-cls} {
    width: 100%;
    padding: 0;
    min-height: 40px;
    max-width: 100% !important;
  }
</style>
