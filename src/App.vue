<template>
<div id="app">
  <router-view></router-view>
</div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}

html {
  min-width: 1200px;
  min-height: 636px;
}

html, body, #app {
  width: 100%;
  height: 100%;
}
</style>
