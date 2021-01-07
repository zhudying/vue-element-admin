<template>
  <div class="input_editor">
    <input :value="item.name" :disabled="item.disable" class="info_input_inner" />
    <!-- 后置内容 -->
    <span class="info_input__suffix" v-show="!item.addInput">
      <span @click="disable(item, '禁用')">{{ item.status === 0 ? "启用" : "禁用" }}</span>
      <span @click="editor(item, '编辑')">编辑</span>
    </span>
    <span class="info_input__suffix" v-show="item.addInput">
      <span @click="disable(item, '取消')">取消</span>
      <span @click="editor(item, '保存')">保存</span>
    </span>
  </div>
</template>

<script>
export default {
  name: "input_editor",
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  created() {
    this.$parent.item = Object.assign(
      {
        disable: true
      },
      this.item
    );
  },
  methods: {
    disable(item, name) {
      if (name === "禁用") {
        if (item.disable) {
          return;
        }
        // this.getList();
        return;
      }
      if (name === "取消") {
        // 调接口刷新
        // this.getList(item);
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
        if (!item.name) {
          return;
        }
        // 调接口更新
        // this.getList(item);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.input_editor {
  width: 100%;
}
.info_input_inner {
  display: inline-block;
  width: 100%;
  height: 100%;
  height: 38px;
  padding: 0 10px;
  font-size: 14px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.info_input__suffix {
  position: absolute;
  right: 5px;
  height: 100%;
  line-height: 38px;
  color: #2383f3;
  > span {
    display: inline-block;
    height: 100%;
    margin-right: 5px;
    font-size: 14px;
    cursor: pointer;
    &:last-child {
      margin-left: 0;
    }
  }
}
</style>
