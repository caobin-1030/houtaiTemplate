<template>
  <div id="noPage">
    <div>
      <p>404 NotFound！</p>
      <p>找不到该页面！</p>
    </div>
    <img src="../../assets/images/noPage.jpg" alt="">
  </div>
</template>

<script>
export default {
  name: 'noPage'
}
</script>

<style scoped lang="less">
#noPage {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  font-weight: bold;
  font-style: italic;
}
</style>
