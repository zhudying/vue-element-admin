<template>
  <div class="info_ediotr">
    <header class="info_header">{{ infoObj.title }}</header>
    <section class="info_section">
      <div class="info_list" v-for="(item, index) in infoObj.list" :key="index">
        <inputEditor :item="item" />
      </div>
      <div class="info_list add_input" @click="addInput">
        <span>+ 新增</span>
      </div>
    </section>
  </div>
</template>

<script>
import inputEditor from "./common/input_editor";
export default {
  name: "info_ediotr",
  components: {
    inputEditor
  },
  props: {
    infoObj: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  created() {
    // console.log(this.infoObj, "infoObj");
  },
  methods: {
    disable(item, name) {
      if (name === "禁用") {
        if (item.disable) {
          return;
        }
        this.getList();
        return;
      }
      if (name === "取消") {
        // 调接口刷新
        this.getList(item);
      }
    },
    editor(item, name) {
      if (name === "编辑") {
        if (!item.disable) {
          return;
        }
        this.$set(item, "disable", false);
        this.$set(item, "addInput", true);
        return;
      }
      if (name === "保存") {
        // 校验是否填入为空
        let name = this.infoObj.list.every(val => val.name);
        if (!name) {
          return;
        }
        // 调接口更新
        this.getList(item);
      }
    },
    addInput() {
      let name = this.infoObj.list.every(val => val.name);
      if (!name) {
        return;
      }
      let obj = { name: "", id: "", addInput: true };
      this.infoObj.list.push(obj);
    },
    // 接口
    getList(item) {
      this.$set(item, "addInput", false);
      this.$set(item, "disable", true);
    }
  }
};
</script>

<style lang="scss" scoped>
.info_ediotr {
  .info_header {
    height: 40px;
    line-height: 40px;
    margin-bottom: 20px;
  }
  .info_section {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .info_list {
      display: flex;
      align-items: center;
      width: 30%;
      margin-right: 20px;
      margin-bottom: 20px;
      position: relative;
    }
    .add_input {
      border: 1px solid #666;
      cursor: pointer;
      height: 38px;
      box-sizing: border-box;
      > span {
        display: inline-block;
        margin: 0 auto;
        font-size: 14px;
      }
    }
  }
}
</style>
