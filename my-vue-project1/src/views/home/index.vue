<template>
  <div>HOME PAGE</div>
  <a-button v-bind="buttonProps" @click="changeTagName">Primary</a-button>
  <tag-modal
    :open="tagState.open"
    :value="tagState.value"
    @ok="tagState.open = false"
    @cancel="tagState.open = false"
  ></tag-modal>
</template>
<script setup>
import { reactive } from 'vue';
import TagModal from './components/tag/index.vue';

const buttonProps = {
  type: 'link',
  loading: false,
  size: 'middle',
};

const nameList = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9'];

const tagState = reactive({
  open: false,
  value: 'TAG NAME',
});

const changeTagName = () => {
  // 0-1 0-8
  const r = Math.floor(Math.random() * 9);
  tagState.open = true;
  tagState.value = nameList[r];
};
</script>
