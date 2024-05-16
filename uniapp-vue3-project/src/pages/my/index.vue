<template>
  <view class="container">
    <!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
    <up-form
      labelPosition="left"
      :model="state.model1"
      :rules="state.rules"
      ref="form1"
    >
      <up-form-item label="姓名" prop="userInfo.name" borderBottom ref="item1">
        <up-input v-model="state.model1.userInfo.name" border="none"></up-input>
      </up-form-item>
      <up-form-item
        label="性别"
        prop="userInfo.sex"
        borderBottom
        @click="
          state.showSex = true
          // hideKeyboard();
        "
        ref="item1"
      >
        <up-input
          v-model="state.model1.userInfo.sex"
          disabled
          disabledColor="#ffffff"
          placeholder="请选择性别"
          border="none"
        ></up-input>
        <template #right>
          <up-icon name="arrow-right"></up-icon>
        </template>
      </up-form-item>
    </up-form>
    <up-action-sheet
      :show="state.showSex"
      :actions="state.actions"
      title="请选择性别"
      description="如果选择保密会报错"
      @close="state.showSex = false"
      @select="sexSelect"
    >
    </up-action-sheet>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

// 使用 reactive 创建响应式状态
const state = reactive({
  showSex: false,
  model1: {
    userInfo: {
      name: "uview-plus UI",
      sex: "",
    },
  },
  actions: [{ name: "男" }, { name: "女" }, { name: "保密" }],
  rules: {
    "userInfo.name": {
      type: "string",
      required: true,
      message: "请填写姓名",
      trigger: ["blur", "change"],
    },
    "userInfo.sex": {
      type: "string",
      max: 1,
      required: true,
      message: "请选择男或女",
      trigger: ["blur", "change"],
    },
  },
  radio: "",
  switchVal: false,
});

// 使用 ref 创建响应式引用
const formRef = ref(null);

// 定义方法
function sexSelect(e: any) {
  state.model1.userInfo.sex = e.name;
  if (formRef.value) {
    formRef.value.validateField("userInfo.sex");
  }
}
</script>

<style>
.container {
  height: 100vh;
}
</style>
