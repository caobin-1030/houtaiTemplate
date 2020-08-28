<template>
  <div id="Btns">
    <el-button v-for="item in btnList"
               :key="item.id"
               :type="item.type"
               :size="item.size"
               @click="clickButton(item.name)">
      {{item.name}}
    </el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: ['btnList'],
  methods: {
    clickButton (value) {
      this.$emit('clickButton', value)
    }
  }
}
</script>

<style scoped lang="less">
#Btns {
  margin-top: 10px;
}
</style>
