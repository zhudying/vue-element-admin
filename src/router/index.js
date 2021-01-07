import Vue from "vue";
import VueRouter from "vue-router";
import page from './page';
import dynamicRouter from './reset-router';
import Store from '../store/index';
Vue.use(VueRouter);
/**
 * 重写路由的push方法
 */
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};

const router = new VueRouter({
  mode: "history",
  // base: process.env.VUE_APP_URL,
  routes: []
});
dynamicRouter.install(Vue, router, Store);
router.$dynamicRouter.formatRoutes(Store.state.user.menuList, true);

router.addRoutes([...page]);
export default router;
