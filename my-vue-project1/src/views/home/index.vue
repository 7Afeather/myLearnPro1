<template>
  <div>HOME PAGE</div>
  <a-button type="primary" @click="changeTagName">Primary</a-button>
  <Tag :value="tagname"></Tag>
</template>
<script setup>
import { ref } from 'vue';
import Tag from './components/tag/index.vue';

const nameList = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9'];

const tagname = ref('TAG NAME');

const changeTagName = () => {
  // 0-1 0-8
  const r = Math.floor(Math.random() * 9);
  tagname.value = nameList[r];
};
</script>
