<template>
  <div class="table_page">
    <el-table
      :row-key="getRowKey"
      v-loading="options.loading"
      :data="dataSource"
      :max-height="options.maxHeight"
      :stripe="options.stripe"
      :border="options.border"
      @row-click="handleRowClick"
      @selection-change="handleSelectionChange"
      highlight-current-row
      :cell-style="cellStyle"
      ref="multipleTable2"
    >
      <!--selection选择框-->
      <el-table-column
        v-if="options.mutiSelect"
        type="selection"
        :reserve-selection="true"
        label-class-name="selectionText"
        align="center"
      >

      </el-table-column>
      <!--序号-->
      <el-table-column
        v-if="options.index"
        label="序号"
        width="120"
        type="index"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{
            (pagination.pageIndex - 1) * pagination.pageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <!--数据列-->
      <template v-for="(column, index) in columns">
        <el-table-column
          :key="index"
          :prop="column.prop"
          :label="column.label"
          :align="column.align || 'center'"
          :width="column.width"
          :fixed="column.fixed"
          :show-overflow-tooltip="options.tooltip"
        >
          <template slot-scope="scope">
            <!--  含有click函数 -->
            <template v-if="column.onClick">
              <span @click.stop="column.onClick(scope.row, scope.$index, scope)">{{ scope.row[column.prop] }}</span>
            </template>
            <!-- 含有render函数 -->
            <template v-else-if="column.render">
              <RenderDom
                :row="scope.row"
                :index="index"
                :render="column.render"
              />
            </template>
            <!-- 有img图片显示 -->
            <template v-else-if="column.img">
              <span v-if="!scope.row[column.prop]">无</span>
              <img
                v-else
                :src="scope.row[column.prop]"
                alt="加载失败"
              />
            </template>
            <!-- 开关 -->
            <template v-else-if='column.switch'>
              <el-switch
                class="tableScopeSwitch"
                active-value="1"
                inactive-value="0"
                active-text="开启"
                inactive-text="关闭"
                v-model="scope.row.reservedTwo"
                @click.native.prevent=" startBtn(scope.row, scope.$index, scope)"
              >
              </el-switch>
            </template>
            <!-- 没有render函数且没有图片要显示 -->
            <template v-else>
              <span>{{ scope.row[column.prop] }}</span>
            </template>

            <!-- button 操作按钮  caseStatus-->
            <template v-if="column.button">
              <template v-for="(btn, i) in column.group">
                <el-button
                  :key="i+213123"
                  :type="btn.type"
                  :round="btn.round"
                  :size="btn.size || 'mini'"
                  :icon="btn.icon"
                  :plain="btn.plain"
                  @click.stop="btn.onClick(scope.row, scope.$index, scope)"
                >{{ btn.name }}</el-button>
              </template>
            </template>
            <!-- slot 你可以其他常用项 -->
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 分页 sizes-->
    <el-pagination
      v-if="pagination"
      background
      :total="pagination.total"
      :page-size="pagination.pageSize"
      layout="total, prev, pager, next,jumper"
      @size-change="handleSizeChange"
      @current-change="handleIndexChange"
      :current-page.sync="pagination.pageIndex"
      :page-sizes="[pagination.pageSize]"
      popper-class="table_page_all"
      style="padding: 20px;text-align: right"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  components: {
    RenderDom: {
      functional: true, // 函数式组件 - 无 data 和 this 上下文 => better render
      props: {
        row: Object,
        index: Number,
        render: Function
      },
      /**
       * @param {Function} createElement - 原生创建dom元素的方法， 弃用，推荐使用 jsx
       * @param {Object} ctx - 渲染的节点的this对象
       * @argument 传递参数 row index
       */
      render(createElement, ctx) {
        const {
          row,
          index
        } = ctx.props;
        return ctx.props.render(row, index);
      }
    }
  },
  props: {
    dataSource: Array, // table内容数据
    options: Object, // 表格参数控制 maxHeight、stripe 等等...
    columns: Array, // 表头
    fetch: {
      type: Function,
      default: function () { }
    }, // 获取数据的函数
    pagination: Object, // 分页，不传则不显示
    typeTable: String,
  },
  data() {
    return {};
  },
  created() {
    // 传入的options覆盖默认设置
    this.$parent.options = Object.assign({
      // maxHeight: 500,
      stripe: false, // 是否为斑马纹
      border: false,
      tooltip: true
    },
      this.options
    );

    this.options.initTable && this.fetch();
  },
  methods: {
    // table 文本颜色
    cellStyle(row, column, rowIndex, columnIndex) {
      // if (row.column.label == "当前状态" && row.row.statusId == 1) {
      //   return "color:#0ED1AA";
      // } else if (row.column.label == "当前状态" && row.row.statusId == 0) {
      //   return "color:#F3384F";
      // }
      // if (row.column.label == "位置" && row.row.statusId == 1) {
      //   return "color:#0ED1AA";
      // }
    },
    // pageSize 改变时触发事件
    handleSizeChange(size) {
      this.pagination.pageSize = size;
      this.fetch();
    },
    // currentPage 改变时触发事件
    handleIndexChange(current) {
      this.pagination.pageIndex = current;
      this.fetch();
    },
    // 多选框选择变化触发事件
    handleSelectionChange(selection, index) {
      this.$emit("selection-change", selection);
    },
    // 点击table某一行时触发事件
    handleRowClick(row, event, column) {
      this.$emit("handleRowClick", row, event, column);
    },
    // 翻页时，记住上一页的勾选标识
    getRowKey(row) {
      return row.id;
    },
    changeSwitch(data) {
      console.log(data)
    },
    startBtn(row) {
      this.$emit("startBtn", row);
    }
  }
};
</script>

<style lang="scss" scoped>
.table_page {
  width: 100%;
  font-size: 14px;
}

// /deep/.el-table-column--selection .cell {
//   padding: 0 !important;
// }

// .el-table /deep/.selectionText .cell .el-checkbox__inner {
//   z-index: -1;
//   position: relative;
// }

// // 全选由多选框变为汉字
// .el-table /deep/.selectionText .cell:before {
//   content: "全选";
//   position: absolute;
//   right: 3px;
//   color: #0095f6;
// }

// /deep/.tableScopeSwitch .el-switch__label {
//   position: absolute;
//   display: none;
//   color: #fff;
// }
// /*打开时文字位置设置*/
// /deep/.tableScopeSwitch .el-switch__label--right {
//   z-index: 1;
//   left: 0;
// }
// /*关闭时文字位置设置*/
// /deep/.tableScopeSwitch .el-switch__label--left {
//   z-index: 1;
//   right: 0;
// }
// /*显示文字*/
// /deep/.tableScopeSwitch .el-switch__label.is-active {
//   display: block;
// }
// /deep/.tableScopeSwitch.el-switch .el-switch__core,
// .el-switch .el-switch__label {
//   width: 55px !important; /*开关按钮的宽度大小*/
// }
// /deep/.el-switch__label * {
//   font-size: 12px !important;
//   font-family: Microsoft YaHei;
//   font-weight: 400;
//   color: #ffffff;
// }
</style>
