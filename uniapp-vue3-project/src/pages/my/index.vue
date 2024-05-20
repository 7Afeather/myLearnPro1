<template>
  <view class="page-container">
    <up-form
      labelPosition="left"
      :labelStyle="{
        fontSize: '24rpx',
      }"
      labelWidth="56"
      :model="state.model"
      :rules="state.rules"
      ref="form1"
    >
      <up-form-item
        label="功能名称"
        prop="functionState.name"
        borderBottom
        ref="item1"
      >
        <up-input
          :style="{
            padding: '4rpx 16rpx',
          }"
          :fontSize="12"
          v-model="state.model.functionState.name"
          clearable
          placeholder="请输入功能名称"
        ></up-input>
      </up-form-item>
      <up-form-item
        label="功能类型"
        prop="functionState.type"
        borderBottom
        @click.native="state.showTypeSelect = true"
        ref="item1"
      >
        <up-input
          :style="{
            padding: '4rpx 16rpx',
          }"
          readonly
          :fontSize="12"
          v-model="state.model.functionState.type"
          disabledColor="#ffffff"
          placeholder="请选择功能类型"
          clearable
        ></up-input>
      </up-form-item>
      <up-form-item
        label="功能描述"
        prop="functionState.desc"
        borderBottom
        ref="item1"
      >
        <up-textarea
          autoHeight
          count
          :height="30"
          v-model="state.model.functionState.desc"
          :maxlength="30"
          ref="textareaRef"
          placeholder="请输入功能描述"
        ></up-textarea>
      </up-form-item>
    </up-form>
    <view class="btn-box">
      <up-button
        size="mini"
        :style="{
          width: '32%',
        }"
        text="重置"
        @click="reset"
      ></up-button>
      <up-button
        size="mini"
        :style="{
          width: '32%',
        }"
        type="warning"
        text="清空"
        @click="clear"
      ></up-button>
      <up-button
        size="mini"
        :style="{
          width: '32%',
        }"
        type="primary"
        text="确定"
        @click="confirm"
      ></up-button>
    </view>
    <up-list :height="300" v-if="functionList?.length">
      <up-list-item v-for="(item, index) in functionList" :key="index">
        <up-cell
          :title="`功能名称:${item.name}\n功能类型:${item.type}\n功能描述:${item.desc}`"
        >
          <template #icon>
            <up-icon name="photo"></up-icon>
          </template>
        </up-cell>
      </up-list-item>
    </up-list>
    <up-empty v-else :height="600" mode="list" icon="info-circle"> </up-empty>
    <view class="btn-box">
      <up-button
        size="mini"
        :style="{
          width: '98%',
        }"
        type="primary"
        text="提交"
        @click="submit"
      ></up-button>
    </view>

    <up-action-sheet
      :show="state.showTypeSelect"
      :actions="state.actions"
      title="请选择功能类型"
      @close="state.showTypeSelect = false"
      @select="typeSelect"
    >
    </up-action-sheet>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

interface Item {
  name: string;
  type: string;
  desc: string;
}

const initModel = (): Item => {
  return {
    name: "",
    type: "",
    desc: "",
  };
};

// 使用 reactive 创建响应式状态
const state = reactive({
  showTypeSelect: false,
  model: {
    functionState: initModel(),
  },
  actions: [
    { name: "网页端功能" },
    { name: "移动端功能" },
    { name: "无效功能" },
  ],
  rules: {
    "functionState.name": {
      type: "string",
      required: true,
      message: "请填写功能名称",
      trigger: ["blur", "change"],
    },
    "functionState.type": {
      type: "string",
      required: true,
      message: "请选择功能类型",
      trigger: ["blur", "change"],
    },
  },
});

// 使用 ref 创建响应式引用
const formRef = ref(null);

// 定义方法
function typeSelect(e: any) {
  state.model.functionState.type = e.name;
  if (formRef.value) {
    formRef.value.validateField("functionState.type");
  }
}

// volume
// volume-fill
// volume-off
// volume-off-fill
// trash
// trash-fill
const functionList = ref<Item[]>([]);

const reset = () => {
  Object.assign(state.model.functionState, initModel());
};

const confirm = () => {
  functionList.value.push({
    ...state.model.functionState,
  });
  reset();
};

const clear = () => {
  functionList.value = [];
};

const submit = () => {
  console.log("functionList.value", functionList.value);
};
</script>

<style lang="scss">
.page-container {
  padding: 20rpx;
}
.btn-box {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.u-textarea {
  padding: 4rpx 16rpx;
  .uni-textarea-textarea {
    font-size: 12px;
  }
  .uni-textarea-placeholder {
    font-size: 12px;
  }
}
</style>
