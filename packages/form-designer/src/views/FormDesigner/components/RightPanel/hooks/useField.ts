import { reactive, toRefs } from 'vue';

interface State {
  options: any[];
  allOptions: any[];
}

export function useField(activeData) {
  const state = reactive<State>({
    options: [],
    allOptions: [],
  });
  const { options, allOptions } = toRefs(state);

  function initFieldData() {
    const ferKey = activeData.__config__.ferKey;

    state.allOptions = [];
  }
  return { initFieldData };
}
