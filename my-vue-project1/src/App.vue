<template>
  <div class="baseContainer">
    <a-layout
      :style="{
        width: '100%',
        height: '100%',
      }"
    >
      <a-layout-sider :width="250" v-model:collapsed="collapsed" :trigger="null" collapsible>
        <div class="logo"></div>
        <a-menu
          v-model:selectedKeys="state.selectedKeys"
          mode="inline"
          theme="dark"
          :open-keys="state.openKeys"
          :items="items"
          @openChange="onOpenChange"
          @click="clickItem"
        ></a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0; display: flex; align-items: center">
          <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            :style="{
              fontSize: '2em',
              padding: '0 24px',
            }"
            @click="() => (collapsed = !collapsed)"
          />
          <menu-fold-outlined
            :style="{
              fontSize: '2em',
              padding: '0 24px',
            }"
            v-else
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <a-breadcrumb>
            <a-breadcrumb-item v-for="(item, index) in breadcrumbPathArray" :key="index">
              <router-link :to="item.path">{{ item.name }}</router-link>
            </a-breadcrumb-item>
          </a-breadcrumb>
        </a-layout-header>
        <a-layout-content
          :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
        >
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { h, reactive, ref } from 'vue';
import type { VueElement } from 'vue';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';
import type { ItemType } from 'ant-design-vue';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
// import { uuid } from '@/utils/generate-uuid';
import { useRouter } from 'vue-router';

const router = useRouter();

const collapsed = ref<boolean>(false);

// 面包屑路径参数
const breadcrumbPathArray = ref<any[]>([]);

function getItem(
  label: VueElement | string,
  key: string,
  path: string,
  icon?: any,
  children?: ItemType[],
  type?: 'group',
): ItemType {
  return {
    key,
    icon,
    children,
    label,
    type,
    path,
  } as ItemType;
}

const items: ItemType[] = reactive([
  {
    key: 1,
    icon: () => h(MailOutlined),
    children: null,
    label: '首页',
    type: null,
    path: '/',
  },
  {
    key: 2,
    icon: () => h(AppstoreOutlined),
    children: [
      {
        key: 2.1,
        icon: () => h(MailOutlined),
        children: null,
        label: '公司简介',
        type: null,
        path: '/about/companyIntroduction',
      },
    ],
    label: '关于',
    type: null,
    path: '/about',
  },
  {
    key: 3,
    icon: () => h(SettingOutlined),
    children: null,
    label: 'Algorithm',
    type: null,
    path: '/algorithm',
  },
  getItem('Navigation Two', 'sub2', 'sub2', () => h(AppstoreOutlined), [
    getItem('Option 5', '5', '5'),
    getItem('Option 6', '6', '6'),
    getItem('Submenu', 'sub3', 'sub3', null, [
      getItem('Option 7', '7', '7'),
      getItem('Option 8', '8', '8'),
    ]),
  ]),
  getItem('Navigation Three', 'sub4', 'sub4', () => h(SettingOutlined), [
    getItem('Option 9', '9', '9'),
    getItem('Option 10', '10', '10'),
    getItem('Option 11', '11', '11'),
    getItem('Option 12', '12', '12'),
  ]),
]);

const state = reactive({
  rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
  openKeys: ['sub1'],
  selectedKeys: [],
});
const onOpenChange = (openKeys: string[]) => {
  const latestOpenKey: any = openKeys.find(key => state.openKeys.indexOf(key) === -1);
  if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    state.openKeys = openKeys;
  } else {
    state.openKeys = latestOpenKey ? [latestOpenKey] : [];
  }
};

// 结束条件：查出 keyPath 对应的两个菜单配置对象
// 循环对象：items items.children
const loop = (array: any[], key: string): any => {
  if (array) {
    for (let index = 0; index < array.length; index++) {
      // 结束条件
      if (key === array[index].key) {
        return {
          name: array[index].label,
          path: array[index].path,
        };
      } else {
        // 循环，为空的时候不退出循环，知道children循环完成
        if (loop(array[index].children, key)) {
          return loop(array[index].children, key);
        }
      }
    }
  }
};

const queryMenu = (keyPath: string[]): any => {
  const result: any[] = [];
  keyPath.forEach(kp => {
    // 从 items 中查找，children中查找
    if (loop(items, kp)) {
      result.push(loop(items, kp));
    }
  });
  return result;
};

const clickItem = ({ item, keyPath }: any) => {
  breadcrumbPathArray.value = queryMenu(keyPath);
  router.push({ path: item.originItemValue.path });
};
</script>

<style scoped>
.baseContainer {
  width: 100vw;
  height: 100vh;
}
.baseContainer .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
