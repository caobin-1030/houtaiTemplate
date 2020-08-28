<template>
<div id="Authentication">
  <div class="title">用户登录</div>
  <div class="logo_box">
    <img src="./../assets/logo.png" alt="">
  </div>
  <el-form
    :model="ruleFormLogin"
    status-icon
    :rules="rulesLogin"
    ref="ruleFormLogin"
    label-width="50px"
    class="demo-ruleForm"
    @keypress.native.enter="submitFormLogin('ruleFormLogin')"
  >
    <el-form-item label="账号" prop="loginName">
      <el-input placeholder="请输入账号" prefix-icon="el-icon-user-solid" v-model.trim="ruleFormLogin.loginName"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input show-password placeholder="请输入密码" prefix-icon="el-icon-lock" type="password" v-model.trim="ruleFormLogin.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item class="registerBtn">
      <el-button :loading="isLoading" type="primary" @click="submitFormLogin('ruleFormLogin')">登录</el-button>
      <el-button @click="resetFormLogin('ruleFormLogin')">重置</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  data () {
    // 账号验证逻辑
    const validateLoginName = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入账号'))
      } else {
        return callback()
      }
    }
    // 登录密码验证逻辑
    const validatePassWord = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入密码'))
      } else {
        return callback()
      }
    }
    return {
      // 登录表单数据
      ruleFormLogin: {
        password: '',
        loginName: ''
      },
      // 登录字段定规则的地方
      rulesLogin: {
        password: [
          {
            validator: validatePassWord,
            trigger: 'blur'
          }
        ],
        loginName: [
          {
            validator: validateLoginName,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  props: ['isLoading'],
  methods: {
    // 提交登录
    submitFormLogin (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('Login', this.ruleFormLogin)
        } else {
          return false
        }
      })
    },
    // 重置登录
    resetFormLogin (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
#Authentication .el-form-item {
  padding-right: 50px;
}
#Authentication .el-form-item__content {
  text-align: center;
}
#Authentication .el-form-item__label {
  color: #FFFFFF;
}
</style>
<style scoped lang="less">
#Authentication {
  margin: 0 auto;
  width: 400px;

  .title {
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 36px;
    font-weight: 500;
    color: #FFFFFF;
  }
  .logo_box {
    width: 100%;
    text-align: center;
  }
}
</style>
