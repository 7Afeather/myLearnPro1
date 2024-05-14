<template>
  <a-modal
    :open="open"
    :title="currentValue"
    :confirm-loading="modalState.confirmLoading"
    @cancel="$emit('cancel')"
    @ok="handleOk"
  >
    <a-table :columns="fixedColumns" :data-source="data.costomerList" :pagination="false" bordered>
      <template #summary>
        <a-table-summary fixed>
          <a-table-summary-row>
            <a-table-summary-cell :col-span="2">数量汇总</a-table-summary-cell>
            <a-table-summary-cell :index="fixedColumns.findIndex(item => item.dataIndex === 'num')">
              20
            </a-table-summary-cell>
            <a-table-summary-cell
              :index="fixedColumns.findIndex(item => item.dataIndex === 'address')"
            >
              21
            </a-table-summary-cell>
            <a-table-summary-cell :index="fixedColumns.findIndex(item => item.dataIndex === 'age')">
              22
            </a-table-summary-cell>
          </a-table-summary-row>
        </a-table-summary>
      </template>
    </a-table>
  </a-modal>
</template>
<script setup lang="ts">
import { computed, watch, reactive, ref } from 'vue';
import type { TableColumnsType } from 'ant-design-vue';

export interface DataProps {
  supplierCode?: string;
  supplierName?: string;
  costomerList?: any[];
}

export interface Props {
  open?: boolean;
  value?: string;
  data?: DataProps;
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  value: null,
  data: () => {},
});
const emit = defineEmits({
  ok: fn => {
    return fn && fn();
  },
  cancel: null,
});
const currentValue = computed(() => {
  return props.value;
});
watch(
  () => props.open,
  n => {
    if (n) {
      //   console.log('currentValue', currentValue.value);
    }
  },
  { immediate: true },
);
const modalState = reactive({
  title: '标签页',
  confirmLoading: false,
});

const handleOk = async () => {
  await Promise.resolve(emit('ok'));
  //   await new Promise(resolve => {
  //     emit('ok');
  //     resolve();
  //   });
  console.log('ok后的代码');
};

const fixedColumns = ref<TableColumnsType>([
  {
    title: '名称',
    dataIndex: 'name',
    fixed: true,
    width: 100,
  },
  {
    title: '描述',
    dataIndex: 'description',
    width: 100,
  },
  {
    title: '数量',
    dataIndex: 'num',
    width: 100,
  },
  {
    title: '地址',
    dataIndex: 'address',
    width: 100,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    width: 100,
  },
]);
</script>
