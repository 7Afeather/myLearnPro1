<template>
  <div>{{ currentValue }}</div>
</template>
<script setup>
import { computed } from 'vue';
const props = defineProps({
  value: {
    type: String,
    default: null,
  },
});
const currentValue = computed(() => {
  //   console.log('currentValue变化了', props.value);
  return props.value;
});
</script>
