<template>
  <div>HOME PAGE</div>
  <a-row :gutter="[16, 24]">
    <a-col class="gutter-row" :span="6">
      <a-button v-bind="buttonProps" @click="changeTagName">Primary</a-button>
      <tag-modal
        :open="tagState.open"
        :value="tagState.value"
        :data="tagState.data"
        @ok="handleOk"
        @cancel="tagState.open = false"
      ></tag-modal>
    </a-col>
    <a-col class="gutter-row" :span="6">
      <a-button type="primary" @click="twoFncHandler">方法</a-button>
    </a-col>
    <a-col class="gutter-row" :span="6">
      <component :is="MailOutlined" />
    </a-col>
    <a-col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </a-col>
  </a-row>
</template>
<script setup>
import { reactive } from 'vue';
import TagModal from './components/tag/index.vue';
import { message } from 'ant-design-vue';
import { MailOutlined } from '@ant-design/icons-vue';

const buttonProps = {
  type: 'primary',
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

const returnHandler = () => {
  return new Promise((resolve, reject) => {
    return message.warning('return handler 两个方法(一个方法含return)');
    resolve();
  });
};

const returnStatus = false;
message.config({
  top: `100px`,
  duration: 2,
  maxCount: 1,
  rtl: true,
  // prefixCls全局设置message弹窗的样式
  prefixCls: 'my-message',
});

const returnHandler2 = () => {
  return message.warning({ content: 'return handler 两个方法(一个方法含return)' });
};

const twoFncHandler = () => {
  //   await Promise.resolve(returnHandler2());
  returnHandler2();
  console.log('two fnc');
};

const handleOk = () => {
  returnHandler2();
};
</script>
<style>
.my-message {
  color: red;
}
</style>
