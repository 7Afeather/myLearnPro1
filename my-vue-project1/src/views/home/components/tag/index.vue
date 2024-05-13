<template>
  <a-modal
    :open="open"
    :title="modalState.title"
    :confirm-loading="modalState.confirmLoading"
    @cancel="$emit('cancel')"
    @ok="handleOk"
  >
    <p>{{ currentValue }}</p>
  </a-modal>
</template>
<script setup>
import { computed, watch, reactive } from 'vue';
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String,
    default: null,
  },
});
const emit = defineEmits(['ok', 'cancel']);
const currentValue = computed(() => {
  return props.value;
});
watch(
  () => props.open,
  n => {
    if (n) {
      console.log('currentValue', currentValue.value);
    }
  },
  { immediate: true },
);
const modalState = reactive({
  title: '标签页',
  confirmLoading: false,
});
const handleOk = () => {
  emit('ok');
};
</script>
