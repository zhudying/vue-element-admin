<template>
  <div class="detail">
    详情
    <el-button
      type="primary"
      @click="backHome"
    >返回</el-button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: "Home",

  data() {
    return {

    };
  },
  created() {

  },
  methods: {
    ...mapMutations(['DEL_TAGS']),
    backHome() {
      this.DEL_TAGS(this.$route)
      this.$router.push('/home')
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
