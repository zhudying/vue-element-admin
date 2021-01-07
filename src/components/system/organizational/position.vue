<template>
  <div class="position company">
    <header class="title">职位</header>
    <div
      class="position_list"
      v-for="(item, index) in positionList"
      :key="index"
      @click="choosePosition(item, index)"
      :class="number === index ? 'positionActive' : ''"
    >
      <inputEditor :item="item" />
    </div>
    <div class="position_add" @click="addInput">
      <span>+ 新增</span>
    </div>
  </div>
</template>

<script>
import inputEditor from "../common/input_editor";

export default {
  name: "position",
  props: {
    positionList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    inputEditor
  },
  data() {
    return {
      number: 0
    };
  },
  methods: {
    choosePosition(item, index) {
      this.$emit("choosePosition", item);
      this.number = index;
    },
    addInput() {
      let name = this.positionList.every(val => val.name);
      if (!name) {
        return;
      }
      let obj = { name: "", id: "", addInput: true };
      this.positionList.push(obj);
    }
  }
};
</script>

<style lang="scss" scoped>
.position_list {
  position: relative;
  margin-bottom: 20px;
}
.position_add {
  width: 100%;
  border: 1px dashed #ccc;
  height: 38px;
  line-height: 38px;
  text-align: center;
}
</style>
