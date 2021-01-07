<template>
  <div class="tags">
    <div
      class="tags_li"
      v-for="(item, index) in tags"
      :class="{ active: isActive(item.path) }"
      :key="index"
    >
      <router-link
        :to="item.path"
        class="tags_li_title"
      >
        <i :class="item.icon"></i>
        {{ item.title }}
      </router-link>
      <span
        class="tags-li-icon"
        @click="moveTag(item, index)"
      ><i class="el-icon-close"></i></span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { setCookie, getCookie } from "@/utils/cookie";
export default {
  name: "tags",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["tags"]),
  },
  watch: {
    $route() {
      this.addTags();
    }
  },
  created() {
    this.addTags();
  },
  methods: {
    ...mapMutations(['ADD_TAGS', 'DEL_TAGS']),
    isActive(route) {
      return route === this.$route.fullPath;
    },
    // 删除
    moveTag(item, index) {
      // this.DEL_TAGS(index)
      this.DEL_TAGS(item)
      return false;
    },
    // 添加tags
    addTags() {
      const { name, path, fullPath, meta } = this.$route;
      let params = {
        name,
        path,
        fullPath,
        title: meta.title
      };
      if (path) {
        // this.$store.commit("ADD_TAGS", params);
        this.ADD_TAGS(params)
      }
      return false;
    },
    choosePage(tag) {
      let route = tag.fullPath;
      this.$router.push(route);
    }
  }
};
</script>

<style lang="scss" scoped>
.tags {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  .tags_li {
    height: 32px;
    line-height: 32px;
    padding-right: 10px;
    background-color: #ccc;
    margin: 8px 5px 0;
    border-radius: 4px 4px 0 0;
    &:first-child {
      margin-left: 10px;
    }
    &.active {
      .tags_li_title,
      .tags-li-icon {
        color: $light-blue;
      }
    }
    a {
      display: inline-block;
    }
  }
  .tags_li_title {
    color: #333;
    padding-left: 20px;
    padding-right: 10px;
  }
}
</style>
