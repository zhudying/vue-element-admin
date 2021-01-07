<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="activeMenu"
      :collapse="collapse"
      background-color="#000"
      text-color="rgba(255,255,255,1)"
      active-text-color="yellow"
      unique-opened
      router
    >
      <template v-for="route in menuList">
        <!-- 多级菜单 -->
        <el-submenu
          v-if="route.children&&!route.sort"
          :index="route.path"
          :key="route.path"
        >
          <template slot="title">
            <i :class="route.icon"></i>
            <span
              slot="title"
              class="title"
            >{{ route.name }}</span>
          </template>
          <!-- 二级菜单 -->
          <sidebarItem :item="route.children" />
        </el-submenu>
        <!-- 一级菜单 -->
        <el-menu-item
          v-else
          :index="route.path"
          :key="route.path"
        >
          <i :class="route.icon"></i>
          <span
            slot="title"
            class="title"
          >{{ route.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import sidebarItem from "./sidebar-Item";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "sidebar",
  components: {
    sidebarItem
  },
  data() {
    return {
      collapse: false
    };
  },
  computed: {
    ...mapGetters(["menuList"]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // 可以在路由配置文件中设置自定义的路由路径到meta.activeMenu属性中，来控制菜单自定义高亮显示
      return meta.activeMenu ? meta.activeMenu : path
    },
  },
  methods: {
    ...mapActions({
      getMenu: 'GET_MENU'
    }),
    initMenu() {
      this.getMenu().then(res => {
        if (res.data.length == 0) return
        this.$router.$dynamicRouter.formatRoutes(res.data, true);
      })
    }
  },
  mounted() {
    this.initMenu()
  }
};
</script>

<style lang="scss" scoped>
.sidebar-el-menu {
  height: 100%;
}
</style>
