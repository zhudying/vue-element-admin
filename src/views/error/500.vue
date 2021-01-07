<template>
  <div
    class="error_page"
    @click="back"
  >
    <div class="title">服务器出错</div>
    <div class="section">500</div>

  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    back() {
      this.$router.push({
        name: 'home',
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.error_page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  .title {
    width: 265px;
    text-align: center;
    border-bottom: 1px solid #4f4f4f;
    padding: 15px 0;

    font-size: 24px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #fefefe;
    opacity: 0.5;
  }
  .section {
    font-size: 172px;
    font-family: Adobe Heiti Std;
    font-weight: normal;
    color: #b38200;
    margin-bottom: 125px;
  }
}
</style>