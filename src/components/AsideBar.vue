<template>
  <div id="AsideBar">
    <div class="asideBarBox">
      <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      :collapse-transition="true"
      :background-color="$store.state.skin.skin"
      :text-color="$store.state.skin.textSkin"
      :active-text-color="$store.state.skin.activeTextSkin"
      :router="true"
      unique-opened
      :collapse="!showAsideBar">
      <!--写死的首页菜单，是属于一级菜单，排序第一位-->
      <el-menu-item index="/index">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <!--一级权限菜单，根据后端接口获取，分为两种情况，存在子类和不存在子类-->
      <fragment
        v-for="(item) in asideBarList"
        :key="item.id">
        <!--不存在子类，直接作为一级菜单点击-->
        <el-menu-item
          v-if="!item.hasChildren"
          :index="item.path">
          <i :class="item.icon"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
        <!--存在子类的如下，作为一级菜单展开-->
        <el-submenu v-if="item.hasChildren" :index="item.path">
          <!--二级菜单标题-->
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.title}}</span>
          </template>
          <!--二级菜单跳转标题-->
          <el-menu-item
            v-show="!items.children"
            :index="items.path"
            v-for="(items,index) in item.children"
            :key="index">
            <span slot="title">{{items.title}}</span>
          </el-menu-item>
        </el-submenu>
      </fragment>
    </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: this.$route.path
    }
  },
  props: ['asideBarList', 'showAsideBar'],
  watch: {
    $route: {
      handler (to, from) {
        switch (to.path) {
          case '/backstage-user-info':
            this.activeIndex = from.path
            break
          default:
            this.activeIndex = this.$route.path
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
#AsideBar {
  height: 100%;
  .asideBarBox {
    height: 100%;
    overflow-y: scroll;
    border-right: solid 1px #E6E6E6;
    .el-menu {
      min-height: 100%;
      border-right: none;
    }
  }
}
</style>
<style>
#AsideBar .asideBarBox .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 199px;
  max-width: 199px;
}
#AsideBar .asideBarBox::-webkit-scrollbar{
  display: none;
}
</style>
