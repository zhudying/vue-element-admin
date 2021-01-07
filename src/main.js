import "@babel/polyfill";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './permission'; // 权限

import Element from "element-ui";
import "@/styles/element-variables.scss";
import "@/styles/index.scss"; // global css
// 引入mock，生产环境时注掉
require('@/mock')
Vue.use(Element);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
