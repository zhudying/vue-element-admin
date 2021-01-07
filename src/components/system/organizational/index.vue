<template>
  <div class="organizational">
    <header class="organizational_title">组织架构</header>
    <section class="organizational_content">
      <companyHead />
      <company @chooseCompany="chooseCompany" />
      <department :departmentList="departmentList" @chooseDepartment="chooseDepartment" v-if="depShow" />
      <position :positionList="positionList" />
    </section>
  </div>
</template>

<script>
import companyHead from "./company-head";
import company from "./company";
import department from "./department";
import position from "./position";

export default {
  name: "organizational",
  components: {
    companyHead,
    company,
    department,
    position
  },
  data() {
    return {
      // 部门list
      departmentList: [],
      positionList: [],
      depShow: false
    };
  },
  methods: {
    // 分公司选中
    chooseCompany(id) {
      this.getCompanyList(id);
    },
    // 点击分公司请求部门列表函数
    getCompanyList(id) {
      let params = {
        id: id
      };
      this.departmentList = [];
      if (params.id === 1) {
        this.departmentList = [
          {
            name: "财务",
            id: 1,
            disable: true
          }
        ];
      }
      if (params.id === 2) {
        this.departmentList = [
          {
            name: "人力",
            id: 2,
            disable: true
          }
        ];
      }
      this.depShow = true;
      return this.departmentList;
    },
    // 部门选中
    chooseDepartment(id) {
      this.getDepartmentList(id);
    },
    // 点击部门请求职位列表函数
    getDepartmentList(id) {
      let params = {
        id: id
      };
      this.positionList = [];
      if (params.id === 1) {
        this.positionList = [
          {
            name: "经理",
            id: 1,
            disable: true
          }
        ];
      }
      if (params.id === 2) {
        this.positionList = [
          {
            name: "职员",
            id: 2,
            disable: true
          }
        ];
      }
      return this.positionList;
    }
  }
};
</script>

<style lang="scss" scoped>
.organizational {
  font-size: 14px;

  .organizational_title {
    height: 60px;
    line-height: 60px;
    text-align: center;
    margin: 40px 0;
  }
  .organizational_content {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
}
/deep/.company {
  display: flex;
  flex-direction: column;
  width: 20%;
  .title {
    height: 32px;
    line-height: 32px;
    text-align: center;
  }
  .name {
    box-sizing: border-box;
    height: 38px;
    line-height: 38px;
    width: 100%;
    border: 1px solid #ccc;
    padding: 0 10px;
    border-radius: 4px;
    margin-bottom: 20px;
  }
  // 总公司选中
  .header_name {
    border: 1px solid #1890ff;
  }
  // 分公司选中
  .active {
    border: 1px solid #1890ff;
  }
  .departmentActive {
    .info_input_inner {
      border-color: #1890ff;
    }
  }
  .positionActive {
    .info_input_inner {
      border-color: #1890ff;
    }
  }
}
</style>
