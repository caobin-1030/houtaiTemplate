<template>
  <div id="Test">
    测试组件用页面
    <!--FormSubmit-->
    <FormSubmit
      @formSubmitData="formSubmitData"
      :formSubmitList="formSubmitList">
    </FormSubmit>
    <!--Drawer-->
    <el-button type="danger" @click="toggleDrawer">打开/关闭抽屉</el-button>
    <Drawer
      :drawerObj="drawerObj"
      @openDrawer="openDrawer"
      @changeDrawer="changeDrawer">
      <div slot="DrawerContent">
        此处插槽位置添加具体内容
      </div>
    </Drawer>
    <!--Card-->
    <Card :cardList="cardList" @clickBtn="clickBtn"></Card>
  </div>
</template>

<script>
import FormSubmit from '../../components/FormSubmit/FormSubmit'
import Drawer from '../../components/Drawer/Drawer'
import Card from '../../components/Card/Card'
import { getUserList } from '../../api'

export default {
  name: 'Test',
  data () {
    return {
      // FormSubmit
      formSubmitList: [
        {
          id: 1,
          label: '名称',
          key: 'name',
          value: '',
          type: 'input',
          required: true
        },
        {
          id: 2,
          label: '位置',
          key: 'address',
          value: '',
          type: 'select',
          required: true,
          options: [
            {
              id: 1,
              label: '北京',
              value: 'beijing'
            },
            {
              id: 2,
              label: '上海',
              value: 'shanghai'
            }
          ]
        },
        {
          id: 3,
          label: '时间',
          key: 'date',
          value: [],
          type: 'dateRange',
          required: true
        },
        {
          id: 4,
          label: '开关',
          key: 'switch',
          value: false,
          type: 'switch',
          required: true
        },
        {
          id: 5,
          label: '密码',
          key: 'password',
          value: '',
          type: 'password',
          required: true
        },
        {
          id: 6,
          label: '性别',
          key: 'sex',
          value: '',
          type: 'radio',
          required: true,
          options: [
            {
              id: 1,
              label: '男'
            },
            {
              id: 2,
              label: '女'
            },
            {
              id: 3,
              label: '保密'
            }
          ]
        },
        {
          id: 7,
          label: '多选',
          key: 'checkbox',
          value: [],
          type: 'checkbox',
          required: true,
          options: [
            {
              id: 1,
              label: '张三'
            },
            {
              id: 2,
              label: '李四'
            },
            {
              id: 3,
              label: '王五'
            }
          ]
        },
        {
          id: 8,
          label: '计数器',
          key: 'num',
          value: '',
          type: 'num',
          required: true
        },
        {
          id: 9,
          label: '文本域',
          key: 'textarea',
          value: '',
          type: 'textarea',
          required: true,
          rows: 5
        }
      ],
      // Drawer
      drawerObj: {
        drawer: false,
        direction: 'rtl',
        title: 'title',
        size: '430px',
        hasHeader: true
      },
      // cardList
      cardList: [
        {
          id: 1,
          title: '我是一个标题头',
          date: 1598348731877,
          btnList: [
            {
              name: '查看'
            },
            {
              name: '编辑'
            },
            {
              name: '删除'
            }
          ]
        },
        {
          id: 2,
          title: '我是另一个标题',
          date: 1598348731877,
          btnList: [
            {
              name: '查看'
            }
          ]
        },
        {
          id: 3,
          title: '我是最后一个标题',
          date: 1598348731877,
          btnList: [
            {
              name: '查看'
            },
            {
              name: '编辑'
            }
          ]
        },
        {
          id: 4,
          title: '我是最后一个标题',
          date: 1598348731877,
          btnList: [
            {
              name: '查看'
            },
            {
              name: '编辑'
            }
          ]
        },
        {
          id: 5,
          title: '我是最后一个标题',
          date: 1598348731877,
          btnList: [
            {
              name: '查看'
            },
            {
              name: '编辑'
            }
          ]
        }
      ]
    }
  },
  methods: {
    // FormSubmit
    formSubmitData (data) {
      console.log(data)
    },
    // Drawer
    toggleDrawer () { // 打开drawer
      this.drawerObj.drawer = true
    },
    changeDrawer (val) { // 关闭drawer
      this.drawerObj.drawer = val
    },
    openDrawer () { // drawer被打开时触发的回调函数
      getUserList().then(res => {
        console.log(res)
      })
    },
    // Card
    clickBtn (data, name) {
      console.log(data)
      console.log(name)
    }
  },
  components: {
    FormSubmit,
    Drawer,
    Card
  }
}
</script>

<style scoped lang="less">
#Test {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
}
</style>
