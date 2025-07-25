<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="t('common.previewText')">
    <Parser :formConf="formConf" v-if="!loading" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, reactive, nextTick } from 'vue';
  import Parser from './Parser.vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { useI18n } from '@/hooks/web/useI18n';

  defineEmits(['register']);
  const props = defineProps(['formConf']);
  const { t } = useI18n();
  const [registerModal, { changeOkLoading }] = useModalInner(init);
  const loading = ref(true);

  function init(data) {
    loading.value = true;

    nextTick(() => {
      loading.value = false;
    });
  }
</script>
