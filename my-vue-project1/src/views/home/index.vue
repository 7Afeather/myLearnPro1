<template>
  <div>HOME PAGE</div>
  <a-button v-bind="buttonProps" @click="changeTagName">Primary</a-button>
  <tag-modal
    :open="tagState.open"
    :value="tagState.value"
    :data="tagState.data"
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
  data: {
    supplierName: '供应商名称',
    supplierCode: '供应商编码',
    costomerList: [
      {
        name: '章三',
        description: '章三zhangsan',
        num: 2,
        address: '北京',
        age: 23,
      },
      {
        name: '里三',
        description: '里三lisan',
        num: 2,
        address: '南京',
        age: 29,
      },
    ],
  },
});

const changeTagName = () => {
  // 0-1 0-8
  const r = Math.floor(Math.random() * 9);
  tagState.open = true;
  tagState.value = nameList[r];
};
</script>
