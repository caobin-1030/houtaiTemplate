<template>
  <div id="Index">
    <el-container class="container">
      <AsideBar :asideBarList="asideBarList"
                :showAsideBar="showAsideBar">
      </AsideBar>
      <el-main>
        <Header :showAsideBar="showAsideBar"
                :toggleIcon="toggleIcon"
                @toggle="toggle">
        </Header>
        <div class="tagNav">
          <TagNav :dynamicTags="dynamicTags" @newDynamicTags="newDynamicTags"></TagNav>
        </div>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import AsideBar from '../../components/AsideBar/AsideBar'
import Header from '../../components/Header/Header'
import TagNav from '../../components/TagNav/TagNav'

export default {
  name: 'Index',
  data () {
    return {
      showAsideBar: true,
      asideBarList: require('../../assets/JSONfiles/root'),
      toggleIcon: 'el-icon-s-fold',
      dynamicTags: [],
      allAsideBarList: []
    }
  },
  created () {
    const tempArr1 = this.asideBarList.filter(item => {
      return item.hasChildren === false
    })
    const tempArr2 = this.asideBarList.filter(item => {
      return item.hasChildren === true
    })
    let tempArr3 = []
    tempArr2.forEach(key => {
      tempArr3 = tempArr3.concat(key.children.filter(item => {
        return item.hasChildren === false
      }))
    })
    this.allAsideBarList = this.allAsideBarList.concat(tempArr1).concat(tempArr3)
    this.dynamicTags = [
      {
        title: this.$route.meta.breadcrumbTitleChildren ? this.$route.meta.breadcrumbTitleChildren : this.$route.meta.breadcrumbTitle,
        path: this.$route.path
      }
    ]
  },
  methods: {
    toggle (value) {
      this.showAsideBar = value
      if (this.showAsideBar) {
        this.toggleIcon = 'el-icon-s-fold'
      } else {
        this.toggleIcon = 'el-icon-s-unfold'
      }
    },
    newDynamicTags (newDynamicTags) {
      this.dynamicTags = newDynamicTags
    },
    tagChange (to) {
      const routeTag = this.allAsideBarList.filter(item => {
        return item.path === to.path
      })
      const flag = this.dynamicTags.some(item => {
        if (item.path === routeTag[0].path) {
          return true
        }
      })
      if (flag === true) {
        return false
      }
      this.dynamicTags = this.dynamicTags.concat(routeTag)
    }
  },
  watch: {
    $route: {
      handler (to) {
        this.tagChange(to)
      }
    }
  },
  components: {
    AsideBar,
    Header,
    TagNav
  }
}
</script>

<style scoped lang="less">
#Index {
  height: 100%;

  .container {
    height: 100%;

    .el-main {
      padding: 0;
      margin: 0;

      .tagNav {
        height: 50px;
        padding: 0 10px;
        box-shadow: 0 2px 3px 0 #CCCCCC;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
      }
    }
  }
}
</style>
