<script lang="tsx">
  import { defineComponent, ref, watch, computed, unref, toRaw } from 'vue';
  export default defineComponent({
    setup(props, { expose, emit }) {
      function renderForm() {}

      return () => {
        return renderForm();
      };
    },
  });
</script>
