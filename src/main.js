import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import axios from "axios";
import store from './store'   // 导入 vueX 
import '@/util/filter.js'     // 导入过滤器

import { Lazyload ,Toast ,Button } from 'vant';
Vue.use(Lazyload, {
  lazyComponent: true,
});

// 把变量可以直接设置vue原型上,可以继承 全局使用
Vue.prototype.$api = axios;

// 把 引入vantui组件挂载到 vue 原型上，
Vue.prototype.$Toast = Toast;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
