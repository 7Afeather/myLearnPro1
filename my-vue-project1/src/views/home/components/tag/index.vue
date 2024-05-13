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
  return props.value;
});
</script>
