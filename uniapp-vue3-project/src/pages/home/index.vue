<template>
  <nut-row>
    <nut-col :span="24">
      <nut-button type="primary" @click="openUntuiHandler"
        >untui测试</nut-button
      >
    </nut-col>
  </nut-row>
  <nut-row>
    <nut-col :span="12">
      <nut-button type="primary" @click="openUviewHandler"
        >uview测试</nut-button
      >
    </nut-col>
    <nut-col :span="12">
      <nut-button type="primary">主要按钮</nut-button>
    </nut-col>
  </nut-row>
</template>
<script setup lang="ts">
const openUntuiHandler = () => {
  uni.navigateTo({
    url: `/pages/nut1/index`,
  });
};
const openUviewHandler = () => {
  uni.navigateTo({
    url: `/pages/my/index`,
  });
};
</script>
