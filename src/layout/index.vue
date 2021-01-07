<template>
  <div class="layout">
    <section
      class="layout_header"
      @click="logOut"
    >退出</section>
    <section class="layout_content">
      <sidebar class="layout_nav" />
      <div class="layout_center">
        <tags class="layout_center_tags" />
        <div class="layout_center_content">
          <div class="banner">
            <router-view />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import sidebar from "./components/sidebar/index";
import tags from "./components/tags/index";
import { mapActions } from 'vuex';
export default {
  name: "layout",
  components: {
    sidebar,
    tags
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      LOGOUT: 'LOGOUT'
    }),
    logOut() {
      this.LOGOUT().then(res => {
        this.$router.push({ path: "/login" });
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .layout_header {
    height: 60px;
    width: 100%;
    background-color: #ccc;
  }
  .layout_content {
    width: 100%;
    height: calc(100% - 60px);
    display: flex;
    flex-direction: row;
    overflow: hidden;
    .layout_nav {
      width: 240px;
      height: 100%;
    }
    .layout_center {
      width: calc(100% - 240px);
      height: 100%;
      .layout_center_tags {
        height: 40px;
      }
      .layout_center_content {
        height: calc(100% - 40px);
        padding: 20px;
        box-sizing: border-box;
        overflow-y: auto;
        background-color: #ccc;

        .banner {
          width: 100%;
          height: 100%;
          background-color: #666;
          padding: 20px;
          box-sizing: border-box;
        }
      }
    }
  }
}
</style>
