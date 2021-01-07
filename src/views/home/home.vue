<template>
  <div class="home">
    <table-page
      :columns="columns"
      :dataSource="tableData"
      :options="options"
      :fetch="fetchTableData"
    ></table-page>
  </div>
</template>

<script>
import { getTableList } from '@/api/home/home';
import tablePage from "@/components/table-page/table-page";

export default {
  name: "Home",
  components: {
    tablePage
  },
  data() {
    return {
      columns: [
        {
          prop: "author",
          label: "操作人"

        },
        {
          prop: "id",
          label: "id",

        },
        {
          prop: "name",
          label: "姓名"
        },
        {
          prop: "time",
          label: "操作时间"
        },
        {
          button: true,
          label: "操作",
          width: '600px',
          group: [{
            name: "详情",
            type: 'text',
            onClick: (row, index) => {
              this.$router.push('/detail')
            }
          }]
        }],
      tableData: [],
      options: {
        stripe: false,  // 显示斑马线
        mutiSelect: false, // 显示多选框
        index: false, // 显示序号， 多选则 mutiSelect
        loading: false, // 表格动画
        initTable: true // 是否一挂载就加载数据
      }
    };
  },
  created() {

  },
  methods: {
    fetchTableData() {
      let params = {
        id: 1,
        name: 'zhu'
      }
      getTableList(params).then(res => {
        this.tableData = res.data.list
      })
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
