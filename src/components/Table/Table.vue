<template>
  <div id="Table">
    <el-table
      size="mini"
      :data="tableData"
      border
      :height="tableHeight"
      @selection-change="selection"
      style="width: 100%">
      <el-table-column
        :resizable="false"
        v-if="hasSelection"
        type="selection"
        width="50">
      </el-table-column>
      <el-table-column
        :resizable="false"
        label="序号"
        type="index"
        width="50">
        <template slot-scope="scope">{{ (scope.$index + 1) + (pagination.currentPage - 1) * pagination.pageSize }}</template>
      </el-table-column>
      <el-table-column
        :resizable="false"
        v-for="(item, index) in columnList"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        width="auto">
      </el-table-column>
      <el-table-column
        :resizable="false"
        v-if="hasEdit"
        label="操作"
        width="auto">
        <template slot-scope="scope">
          <div class="editBox">
            <div v-for="(item,index) in editBtnList"
                 :key="index">
              <i class="el-icon-minus line"></i>
              <el-button type="text"
                         size="small"
                         @click="editBtn(scope.row, item.name)">
                {{item.name}}
              </el-button>
            </div>
            <i class="el-icon-minus line"></i>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="text-align: right;margin: 10px 0;padding: 0;"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentPageChange"
      :current-page="pagination.currentPage"
      :page-sizes="pagination.pageSizes"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: ['tableData', 'columnList', 'pagination', 'tableHeight', 'editBtnList', 'hasEdit', 'hasSelection'],
  methods: {
    handlePageSizeChange (val) {
      this.$emit('handlePageSizeChange', val)
    },
    handleCurrentPageChange (val) {
      this.$emit('handleCurrentPageChange', val)
    },
    editBtn (option, name) {
      this.$emit('editBtn', option, name)
    },
    selection (option) {
      this.$emit('handleSelection', option)
    }
  }
}
</script>

<style scoped lang="less">
#Table {
  margin-top: 10px;
}
.line {
  font-size: 14px;
  color: #C7C9CD;
  transform: rotate(90deg);
}
.editBox {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
</style>
