let RouterPlugin = function () {
  this.$router = null
  // this.$store = null
}

RouterPlugin.install = function (vue, router, store) {
  this.$router = router
  // this.$store = store
  this.$router.$dynamicRouter = {
    routerList: [],
    safe: this,
    formatRoutes: function (menu = [], first) {
      const aRouter = []
      if (menu.length <= 0) return
      for (let i = 0; menu.length > i; i++) {
        const iMenu = menu[i]
        if (this.routerList.includes(iMenu.path)) return;

        const path = (() => {
          if (first) {
            return iMenu.path
          } else {
            return iMenu.path
          }
        })(),
          component = iMenu.path,
          file = iMenu.file,
          name = iMenu.name,
          icon = iMenu.icon,
          children = iMenu.children,
          sort = iMenu.sort,
          meta = iMenu.meta || {};
        const isChild = children;
        const oRouter = {
          path: path,
          // name: name,
          icon: icon,
          meta: meta,
          component: () => {
            if (first) {
              return import("../layout/index.vue")
            } else if (isChild && !first) {
              return import("../layout/index.vue")
            } else {
              return import(`../views${file}${component}.vue`)
            }
          },
          // redirect: (() => {
          // })()

          children: (!isChild) ? (() => {
            if (first) {
              return [
                {
                  path: path,
                  name: name,
                  icon: icon,
                  meta: meta,
                  component: () => import(`../views${file}${component}.vue`),
                }
              ]
            }
            return [];
          })() : (() => {
            return this.formatRoutes(children, false)
          })()
        }
        aRouter.push(oRouter)
      }
      if (first) {
        if (!this.routerList.includes(aRouter[0].path)) {
          this.safe.$router.addRoutes(aRouter)
          this.routerList.push(aRouter[0].path)
        }
      } else {
        return aRouter
      }
    }
  }
}
export default RouterPlugin;