<template>
  <div class="sidebarItem">
    <template v-for="subItem in item">
      <el-submenu
        v-if="subItem.children&&!route.sort"
        :index="subItem.path"
        :key="subItem.path"
      >
        <template
          slot="title"
          class="title"
        >{{ subItem.name }} </template>
        <!-- 递归 -->
        <sidebarItem :item="subItem.children" />
      </el-submenu>
      <el-menu-item
        v-else
        :index="subItem.path"
        :key="subItem.path"
        class="title"
      >
        {{ subItem.name }}
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: "sidebarItem",
  props: {
    item: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped></style>
