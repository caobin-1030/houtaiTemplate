<template>
  <div id="TagNav">
    <el-tag
      :key="index"
      v-for="(tag,index) in dynamicTags"
      closable
      :type="$route.path === tag.path ? '' : 'info'"
      :disable-transitions="true"
      @click="toTagPage(tag)"
      @close="handleClose(tag)">
      {{tag.title}}
    </el-tag>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newDynamicTags: []
    }
  },
  props: ['dynamicTags'],
  methods: {
    handleClose (tag) {
      this.newDynamicTags = JSON.parse(JSON.stringify(this.dynamicTags))
      this.newDynamicTags = this.newDynamicTags.filter(item => {
        return item.title !== tag.title
      })
      this.$emit('newDynamicTags', this.newDynamicTags)
    },
    toTagPage (tag) {
      this.$router.push(tag.path)
    }
  }
}
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.el-tag {
  cursor: pointer;
}
</style>
