<template>
  <div class="login-wrapper">
    <div class="title">登陆</div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm2" label-width="100px" class="ruleForm"
             label-position="top">
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="ruleForm.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/babel">
  export default {
    props: {},
    data() {
      return {
        ruleForm: {
          name: '',
          pass: ''
        },
        rules: {}
      };
    },
    mounted() {
    },
    methods: {
      login() {
        const { name, pass: password } = this.ruleForm;
        this.$api.login.request({ name, password }).then(({ data }) => {
          console.log(data)
          if (data.status) {
            localStorage.candyLogin = true;
            this.$store.state.candyLogin = true;
            localStorage.setItem('userInfo', JSON.stringify(data.user));
            this.$router.push('/index');
          } else {
            this.$message(data.msg);
          }
        });
      }
    }
  };
</script>
<style lang="less" type="text/less" scoped>
  .login-wrapper{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 400px;
    height: 300px;
    background: rgba(0,0,0,.4);
    .title{
      text-align: center;
      font-weight: bold;
      font-size: 20px;
      color: #fff;
      margin: 20px;
    }
    .ruleForm{
      width: 80%;
      margin: auto;
      .el-form-item__label{
        color: #fff;
        font-size: 18px;
      }
    }
  }
</style>
