<template>
  <div>{{ name }}</div>
</template>

<script lang="ts">
  // import { useAttrs } from 'vue';
  // defineOptions({
  //   inheritAttrs: true,
  // });
  // const attrs = useAttrs();
  // const props = defineProps(['name']);
  // console.log(attrs);
  export default {
    props: ['name'],
    // inheritAttrs: false,
    setup(props, { attrs }) {
      console.log('p', props);
      console.log('attr', attrs);

      return { name: props.name };
    },
  };
</script>
