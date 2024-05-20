<template>
  <scan-code
    v-model="queryParams.serialNumber"
    placeholder="请扫描序列号"
    iconSize="24"
    v-model:autofocus="pageData.serialNumberFocus"
    :disabled="pageData.serialNumberDisabled"
    @blurEvent="validateSerialNumber"
  ></scan-code>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import ScanCode from "@/components/scan-code/index.vue";

// 查询参数
const initQueryValues = () => ({
  // 序列号
  serialNumber: "",
});

// 展示列表
const initPageValues = (): any => ({
  list: [],
  serialNumberFocus: true,
  serialNumberDisabled: false,
});

// 查询
const queryParams = reactive(initQueryValues());
// 页面
const pageData = reactive<any>(initPageValues());

const validateSerialNumber = (e: Event) => {
  console.log("e", e);
};
</script>
