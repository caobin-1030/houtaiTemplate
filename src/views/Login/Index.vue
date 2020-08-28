<template>
  <div id="Login">
    <Authentication @Login="login" :isLoading="isLoading"></Authentication>
  </div>
</template>

<script>
import Authentication from '../../components/Authentication/Authentication'
import storage from '../../utils/localStorage'

export default {
  name: 'Login',
  data () {
    return {
      isLoading: false
    }
  },
  components: {
    Authentication
  },
  methods: {
    login (data) {
      this.isLoading = true
      console.log(data)
      setTimeout(() => {
        storage.setLocalStorage('token', 'i am is token')
        this.$message({
          type: 'success',
          message: '登陆成功'
        })
        this.isLoading = false
        this.$router.push('/')
      }, 1000)
    }
  }
}
</script>

<style scoped lang="less">
#Login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: rgb(44,59,77);
}
</style>
