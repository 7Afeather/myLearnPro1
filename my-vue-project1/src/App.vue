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
            <a-breadcrumb-item>Home</a-breadcrumb-item>
            <a-breadcrumb-item><router-link to="/">Home</router-link></a-breadcrumb-item>
            <a-breadcrumb-item><router-link to="/about">About</router-link></a-breadcrumb-item>
            <a-breadcrumb-item>PageName</a-breadcrumb-item>
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

  <!-- <header>
    <div class="wrapper">
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
      </nav>
    </div>
  </header>
  <router-view /> -->
</template>

<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router';
import { h, reactive, ref } from 'vue';
import type { VueElement } from 'vue';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';
import type { ItemType } from 'ant-design-vue';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import { uuid } from '@/utils/generate-uuid';

const collapsed = ref<boolean>(false);

function getItem(
  label: VueElement | string,
  key: string,
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
  } as ItemType;
}

const items: ItemType[] = reactive([
  {
    key: uuid(),
    icon: () => h(MailOutlined),
    children: null,
    label: '首页',
    type: null,
  },
  getItem('Navigation Two', 'sub2', () => h(AppstoreOutlined), [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),
  getItem('Navigation Three', 'sub4', () => h(SettingOutlined), [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),
]);

console.log('items', items);

const state = reactive({
  rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
  openKeys: ['sub1'],
  selectedKeys: [],
});
const onOpenChange = (openKeys: string[]) => {
  const latestOpenKey = openKeys.find(key => state.openKeys.indexOf(key) === -1);
  if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    state.openKeys = openKeys;
  } else {
    state.openKeys = latestOpenKey ? [latestOpenKey] : [];
  }
};
const clickItem = ({ item, key, keyPath }) => {
  console.log('item, key, keyPath', item, key, keyPath);
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
