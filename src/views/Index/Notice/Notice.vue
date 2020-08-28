<template>
  <div id="Message">
    <FormSearch :formList="formList" @search="search"></FormSearch>
    <Btns :btnList="btnList" @clickButton="clickButton"></Btns>
    <Table :tableData="tableData"
           :pagination="pagination"
           :tableHeight="tableHeight"
           :hasEdit="hasEdit"
           :hasSelection="hasSelection"
           :editBtnList="editBtnList"
           :columnList="columnList"
           @handleCurrentPageChange="handleCurrentPageChange"
           @editBtn="editBtn"
           @handleSelection="handleSelection"
           @handlePageSizeChange="handlePageSizeChange">
    </Table>
  </div>
</template>

<script>
import {
  getUserList
} from '../../../api'
import FormSearch from '../../../components/FormSearch/FormSearch'
import Table from '../../../components/Table/Table'
import Btns from '../../../components/Btns/Btns'

export default {
  name: 'Message',
  data () {
    return {
      // 搜索条件部分
      formList: [
        {
          id: 1,
          type: 'input',
          label: '编码',
          value: '',
          placeholder: '请填写编码'
        },
        {
          id: 2,
          type: 'inputSelect',
          label: '标题',
          value: '',
          placeholder: '请填写标题',
          option: []
        },
        {
          id: 3,
          type: 'inputSelect',
          label: '发布人',
          value: '',
          placeholder: '请填写发布人',
          option: []
        },
        {
          id: 4,
          type: 'select',
          label: '状态',
          value: '',
          option: [
            {
              id: 1,
              label: '已读',
              value: '已读'
            },
            {
              id: 2,
              label: '未读',
              value: '未读'
            }
          ]
        },
        {
          id: 5,
          type: 'select',
          label: '紧急状况',
          value: '',
          option: [
            {
              id: 1,
              label: '紧急',
              value: '紧急'
            },
            {
              id: 2,
              label: '一般',
              value: '一般'
            }
          ]
        },
        {
          id: 6,
          type: 'datePicker',
          label: '日期',
          value: []
        }
      ],
      // table部分
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      columnList: [
        {
          id: 1,
          prop: 'date',
          label: '日期'
        },
        {
          id: 2,
          prop: 'name',
          label: '姓名'
        },
        {
          id: 3,
          prop: 'address',
          label: '地址'
        }
      ],
      pagination: {
        currentPage: 1,
        pageSize: 15,
        total: 15,
        pageSizes: [15, 30, 50]
      },
      tableHeight: window.innerHeight - 350,
      hasEdit: true,
      hasSelection: true,
      editBtnList: [
        {
          name: '查看'
        },
        {
          name: '修改'
        },
        {
          name: '删除'
        }
      ],
      // 按钮列表
      btnList: [
        {
          id: 1,
          name: '新增',
          size: 'small',
          type: 'primary'
        },
        {
          id: 2,
          name: '批量删除',
          size: 'small',
          type: 'danger'
        },
        {
          id: 3,
          name: '推送配置',
          size: 'small',
          type: 'primary'
        }
      ],
      // 已选中的表格行数据
      selected: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      getUserList().then(res => {
        console.log(res)
      })
    },
    search (value) {
      console.log(value)
    },
    handlePageSizeChange (val) {
      this.pagination.pageSize = val
    },
    handleCurrentPageChange (val) {
      this.pagination.currentPage = val
    },
    editBtn (option, name) {
      if (name === '查看') {
        console.log('查看')
      } else if (name === '修改') {
        console.log('修改')
      } else if (name === '删除') {
        console.log('删除')
      }
    },
    handleSelection (option) {
      this.selected = JSON.parse(JSON.stringify(option))
    },
    clickButton (name) {
      if (name === '新增') {
        console.log('新增')
      } else if (name === '批量删除') {
        if (this.selected.length < 1) {
          this.$message.warning('批量删除必须勾选要删除的表格')
          return false
        }
        this.$message.success('删除成功')
      } else if (name === '推送配置') {
        if (this.selected.length < 1) {
          this.$message.warning('推送配置必须勾选要配置的表格')
          return false
        }
      }
    }
  },
  components: {
    FormSearch,
    Table,
    Btns
  }
}
</script>

<style scoped lang="less">
#Message {
  width: 100%;
  box-sizing: border-box;
  padding: 15px;
}
</style>
