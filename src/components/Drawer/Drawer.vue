<template>
  <div id="Drawer">
    <el-drawer
      :title="drawerObj.title"
      :visible.sync="drawerObj.drawer"
      :direction="drawerObj.direction"
      :size="drawerObj.size"
      :withHeader="drawerObj.hasHeader"
      @open="openDrawer"
      :before-close="handleClose">
      <slot name="DrawerContent"></slot>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      nowDrawer: false
    }
  },
  props: ['drawerObj'],
  methods: {
    handleClose () {
      this.nowDrawer = !this.drawerObj.drawer
      this.$emit('changeDrawer', this.nowDrawer)
    },
    openDrawer () {
      this.$emit('openDrawer')
    }
  }
}
</script>

<style scoped>
/deep/ .el-drawer__body {
  padding: 15px;
}
/deep/ .el-drawer__header {
  margin: 0;
  padding: 20px;
}
</style>
