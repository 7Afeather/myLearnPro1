import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import { Button, Modal, Table, Menu, Layout, Row, Col, Breadcrumb } from 'ant-design-vue';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(Button).use(Modal).use(Table).use(Menu).use(Layout).use(Row).use(Col).use(Breadcrumb);

app.mount('#app');
