<template>
  <div id="Header">
    <div class="header">
      <div class="box">
        <el-tooltip class="item"
                    effect="dark"
                    :content="tooltip"
                    placement="right">
          <i :class="toggleIcon"
             id="toggle"
             @click="toggle">
          </i>
        </el-tooltip>
        <transition name="el-fade-in-linear">
          <BreadCrumb v-show="show" :breadcrumbTitle="$route.meta.breadcrumbTitle ? $route.meta.breadcrumbTitle : null"
                      :breadcrumbTitleChildren="$route.meta.breadcrumbTitleChildren ? $route.meta.breadcrumbTitleChildren : null"
                      :breadcrumbTitleLast="$route.meta.breadcrumbTitleLast ? $route.meta.breadcrumbTitleLast : null">
          </BreadCrumb>
        </transition>
      </div>
      <div class="userBtnBox">
        <el-button type="primary" class="toggleSkin" @click="toggleSkin">
          一键换肤
        </el-button>
        <el-tooltip class="item"
                    effect="dark"
                    content="定位"
                    placement="bottom">
          <div class="mr" @click="showPosition">
            <i class="el-icon-map-location"></i>
            <span style="font-size: 14px;">{{positionCity}}</span>
          </div>
        </el-tooltip>
        <el-tooltip class="item"
                    effect="dark"
                    content="刷新页面"
                    placement="bottom">
          <el-button type="primary" class="refresh" @click="refresh">
            <i class="el-icon-refresh"></i>
          </el-button>
        </el-tooltip>
        <el-link :underline="false" type="primary">欢迎你（yuhao）余浩</el-link>
        <el-link :underline="false" type="primary" @click="toHelp">帮助文档</el-link>
        <el-link :underline="false" type="info">注销</el-link>
      </div>
    </div>
    <!--三级联动表单-->
    <el-dialog title="城市选择"
               width="400px"
               :close-on-click-modal="false"
               @close="cancel"
               :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="城市" label-width="50px">
          <el-cascader
            :model="positionForm.city"
            @change="onChange"
            style="width: 100%;"
            placeholder="试试搜索：北京"
            :options="cityOptions"
            filterable>
          </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from './BreadCrumb'

export default {
  data () {
    return {
      flag: this.showAsideBar,
      tooltip: '收起',
      dialogFormVisible: false,
      cityOptions: require('../../public/position'),
      positionForm: {
        city: ''
      },
      positionCity: '湖南省/长沙市/岳麓区',
      show: true,
      skinStatus: true,
      skin: {
        skin: '',
        textSkin: '',
        activeTextSkin: ''
      }
    }
  },
  created () {
    // 条件：1.session没有skin字段;2.session有skin字段，且为true
    if ((JSON.parse(sessionStorage.getItem('skin')) === true) || (JSON.parse(sessionStorage.getItem('skin')) === null && this.skinStatus === true)) {
      this.skin = {
        skin: '#FFFFFF',
        textSkin: '#222222',
        activeTextSkin: '#409EFF'
      }
      // 条件：skin有字段，且为false
    } else if (JSON.parse(sessionStorage.getItem('skin')) === false) {
      this.skin = {
        skin: '#555555',
        textSkin: '#FFFFFF',
        activeTextSkin: '#FFD04B'
      }
    }
    this.$store.commit('changeSkin', this.skin)
  },
  props: ['showAsideBar', 'toggleIcon'],
  methods: {
    toggle () {
      this.flag = !this.flag
      if (this.flag) {
        this.tooltip = '收起'
      } else {
        this.tooltip = '展开'
      }
      this.$emit('toggle', this.flag)
    },
    refresh () {
      window.location.reload()
    },
    showPosition () {
      this.dialogFormVisible = true
    },
    cancel () {
      this.positionForm.city = ''
      this.dialogFormVisible = false
    },
    onSubmit () {
      if (this.positionForm.city === '') {
        this.$message.warning('请选择您所在的城市')
        return false
      }
      this.positionCity = this.positionForm.city
      this.$message.success('修改定位城市成功')
      this.dialogFormVisible = false
    },
    onChange (list) {
      this.positionForm.city = list.join('/')
    },
    toHelp () {
      const helpUrl = this.$router.resolve({
        path: '/help'
      })
      console.log(helpUrl)
      window.open(
        helpUrl.href,
        '_blank'
      )
    },
    toggleSkin () {
      if (sessionStorage.getItem('skin')) {
        this.skinStatus = JSON.parse(sessionStorage.getItem('skin'))
      } else {
        this.skinStatus = true
      }
      this.skinStatus = !this.skinStatus
      sessionStorage.setItem('skin', this.skinStatus)
      // 条件：1.session没有skin字段;2.session有skin字段，且为true
      if (JSON.parse(sessionStorage.getItem('skin')) === true) {
        this.skin = {
          skin: '#FFFFFF',
          textSkin: '#222222',
          activeTextSkin: '#409EFF'
        }
        // 条件：skin有字段，且为false
      } else if (JSON.parse(sessionStorage.getItem('skin')) === false) {
        this.skin = {
          skin: '#555555',
          textSkin: '#FFFFFF',
          activeTextSkin: '#FFD04B'
        }
      }
      this.$store.commit('changeSkin', this.skin)
    }
  },
  components: {
    BreadCrumb
  },
  watch: {
    $route: {
      handler () {
        this.show = false
        setTimeout(() => {
          this.show = true
        }, 300)
      }
    }
  }
}
</script>

<style scoped lang="less">
#Header {
  .header {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #CCCCCC;
    .box {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    #toggle {
      font-size: 30px;
      margin-left: 10px;
      color: #409EFF;
      cursor: pointer;
    }

    .userBtnBox {
      margin-right: 50px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .el-link {
        margin-left: 15px;
      }

      .refresh {
        font-size: 20px;
        width: 50px;
        height: 30px;
        padding: 0;
      }

      .toggleSkin {
        font-size: 12px;
        width: 70px;
        height: 30px;
        padding: 0;
      }

      .mr {
        margin: 0 15px;
        cursor: pointer;
        color: #409EFF;
      }
    }
  }
}
</style>
