<template>
  <view class="scan-container">
    <nut-input
      v-model="currentValue"
      @update:model-value="updateValue"
      v-bind="$attrs"
      :autofocus="focus"
      :disabled="
        isObject(props.disabled) ? props.disabled.input : props.disabled
      "
      @blur="blurEvent"
      :placeholder="currentValue ? '' : props.placeholder"
    >
      <template #right>
        <spin v-if="props.isLoading"></spin>
        <nut-icon
          v-else
          :name="props.scanIcon"
          :size="props.iconSize"
          @click="handleScanIcon"
        ></nut-icon>
      </template>
      <template v-for="name in Object.keys($slots)" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps"></slot>
      </template>
    </nut-input>
    <div v-if="props.isLoading" class="inset-full"></div>
  </view>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { isObject } from "lodash-es";

import Spin from "@/components/Spin/index.vue";

type Spliter = { spliter?: string; codeIdx?: number };
type Props = {
  modelValue?: string;
  scanIcon?: string;
  scanType?: Array<any>;
  autofocus: boolean;
  placeholder?: string;
  iconSize?: number | string;
  disabled?: boolean | { input?: boolean; scan?: boolean };
  /**可分割的Code */
  splitCode?: boolean | Spliter;
  isLoading: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  autofocus: false,
  scanIcon: "scan2",
  scanType: () => ["qrCode", "barCode"],
  placeholder: "",
  splitCode: false,
  isLoading: false,
});

const emit = defineEmits([
  "update:modelValue",
  "blurEvent",
  "update:autofocus",
  "bring",
]);

const currentValue = ref(props.modelValue);
const focus = ref(props.autofocus);

const updateValue = (e: any) => {
  emit("update:modelValue", e);
};

const defaultSpliter: Spliter = {
  spliter: "@",
  codeIdx: 0,
};

watchEffect(() => {
  currentValue.value = props.modelValue;
  focus.value = props.autofocus;
});

const handleScanIcon = () => {
  if (isObject(props.disabled) ? props.disabled.scan : props.disabled) return;
  uni.scanCode({
    onlyFromCamera: false,
    scanType: props.scanType,
    success: ({ result }) => {
      currentValue.value = result;
      updateValue(result);
      uni.hideKeyboard();
      blurEvent(result);
    },
  });
};

const getSpliter = () => {
  if (props.splitCode) {
    let splitCodeObj = defaultSpliter;
    if (isObject(props.splitCode)) {
      splitCodeObj = {
        ...defaultSpliter,
        ...props.splitCode,
      };
    }
    return splitCodeObj;
  }
  return false;
};
const getRealCode = (codeStr: string, sptr: Spliter) => {
  const codes = codeStr.split(sptr.spliter);
  return { code: codes[sptr.codeIdx], codes };
};

const blurEvent = async (val: any) => {
  console.log("val", val);
  if (val) {
    const sptr = getSpliter();
    setTimeout(() => {
      emit("blurEvent", val.detail.value);
      emit("update:autofocus", false);
      if (sptr) {
        const { code, codes } = getRealCode(val.detail.value, sptr);
        currentValue.value = code;
        updateValue(code);
        emit("bring", code, codes, sptr.codeIdx);
      }
    }, 500);
  }
};
</script>

<style lang="scss" scoped>
.scan-container {
  display: flex;
  flex-grow: 1;
  align-items: center;
}
</style>
