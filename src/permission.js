/**
 * 全站权限配置
 *
 */
import router from './router/index'
import store from './store'
import { validatenull } from '@/utils/validate'
// import { getToken } from '@/util/auth'
import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false });
// const lockPage = store.getters.website.lockPage; //锁屏页
router.beforeEach((to, from, next) => {
  //缓冲设置
  // if (to.meta.keepAlive === true && store.state.tags.tagList.some(ele => {
  //   return ele.value === to.fullPath;
  // })) {
  //   to.meta.$keepAlive = true;
  // } else {
  //   NProgress.start()
  //   if (to.meta.keepAlive === true && validatenull(to.meta.$keepAlive)) {
  //     to.meta.$keepAlive = true;
  //   } else {
  //     to.meta.$keepAlive = false;
  //   }
  // }
  // const meta = to.meta || {};
  if (store.getters.token) {
    // if (store.getters.isLock && to.path != lockPage) { //如果系统激活锁屏，全部跳转到锁屏页
    //   next({ path: lockPage })
    // } else 
    if (to.path === '/login') { //如果登录成功访问登录页跳转到主页
      next({ path: '/home' })
    } else {
      //如果用户信息为空则获取用户信息，获取用户信息失败，跳转到登录页
      if (store.getters.token.length === 0) {
        store.dispatch('LOGOUT').then(() => {
          next({ path: '/login' })
        })
      } else {
        // console.log(to, 'to')
        // const name = to.name,
        //   path = to.path,
        //   fullPath = to.path,
        //   title = to.meta.title
        // if (!validatenull(path) && !validatenull(name)) {
        //   store.commit('ADD_TAGS', {
        //     name,
        //     path,
        //     fullPath,
        //     title
        //   });
        // }
        next()
      }
    }
  } else {
    // //判断是否需要认证，没有登录访问去登录页
    // if (meta.isAuth === false) {
    //   next()
    // } else {
    next()
    // }
  }
})

router.afterEach(() => {
  NProgress.done();
  // let title = store.getters.tag.label;
  // let i18n = store.getters.tag.meta.i18n;
  // title = router.$avueRouter.generateTitle(title, i18n)

  // //根据当前的标签也获取label的值动态设置浏览器标题
  // router.$avueRouter.setTitle(title);

});
