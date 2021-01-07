export default [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("../views/login/login.vue")
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/error/404.vue')
  },
  {
    path: '/500',
    name: '500',
    component: () => import('../views/error/500.vue')
  },
  {
    path: "/home",
    component: () => import("../layout/index.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("../views/home/home.vue"),
        meta: {
          title: "首页"
        }
      },
    ]
  },
]