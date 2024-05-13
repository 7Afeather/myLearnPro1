<template>
  <div>HOME PAGE</div>
  <a-button type="primary" @click="changeTagName">Primary</a-button>
  <Tag :value="tagname"></Tag>
</template>
<script setup>
import { ref } from 'vue';
import Tag from './components/tag/index.vue';

const tagname = ref('TAG NAME');

const changeTagName = () => {
  tagname.value = 'NEW TAG NAME';
};
</script>
