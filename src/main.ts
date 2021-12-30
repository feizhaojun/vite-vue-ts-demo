import { createApp } from 'vue';
import router from './router/index';
import App from './App.vue';
// import Home from 'vue2-package-demo';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App).use(router).use(ElementPlus, {locale: zhCn}).mount('#app');