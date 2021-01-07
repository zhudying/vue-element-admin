<template>
  <div class="company">
    <header class="title">分公司</header>
    <div
      class="name"
      v-for="(item, index) in companyList"
      :key="index"
      @click="chooseCompanyItem(item, index)"
      :class="number === index ? 'active' : ''"
    >
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "company",

  data() {
    return {
      companyList: [
        {
          name: "北京分公司",
          id: 1
        },
        {
          name: "天津分公司",
          id: 2
        },
        {
          name: "山东分公司",
          id: 3
        }
      ],
      number: 0
    };
  },
  created() {
    this.$emit("chooseCompany", this.companyList[0].id);
  },
  methods: {
    chooseCompanyItem(item, index) {
      this.$emit("chooseCompany", item.id);
      this.number = index;
    }
  }
};
</script>

<style lang="scss" scoped></style>
