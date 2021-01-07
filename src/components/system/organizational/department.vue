<template>
  <div class="department company">
    <header class="title">部门</header>
    <div
      class="department_list"
      v-for="(item, index) in departmentList"
      :key="index"
      @click="chooseDepart(item, index)"
      :class="number === index ? 'departmentActive' : ''"
    >
      <inputEditor :item="item" />
    </div>
    <div class="department_add" @click="addInput">
      <span>+ 新增</span>
    </div>
  </div>
</template>

<script>
import inputEditor from "../common/input_editor";

export default {
  name: "department",
  props: {
    departmentList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    inputEditor
  },
  watch: {
    departmentList: {
      handler(newVal) {
        let item = newVal[this.number];
        this.chooseDepart(item, this.number);
      }
    }
  },
  data() {
    return {
      number: 0
    };
  },
  created() {
    let item = this.departmentList[this.number];
    this.chooseDepart(item, this.number);
  },
  methods: {
    chooseDepart(item, index) {
      if (item) {
        this.$emit("chooseDepartment", item.id);
      } else {
        this.$emit("chooseDepartment", null);
      }

      this.number = index;
    },
    addInput() {
      let name = this.departmentList.every(val => val.name);
      if (!name) {
        return;
      }
      let obj = { name: "", id: "", addInput: true };
      this.departmentList.push(obj);
    }
  }
};
</script>

<style lang="scss" scoped>
.department_list {
  position: relative;
  margin-bottom: 20px;
}
.department_add {
  width: 100%;
  border: 1px dashed #ccc;
  height: 38px;
  line-height: 38px;
  text-align: center;
}
</style>
