<!--整个路由容器-->
<template>
  <div style="height: 100%;">
    <div class="header-wrapper">
      <span class="header">项目汇报管理系统</span>
      <template v-if="$store.state.currentUserInfo">
        <span class="header-right">欢迎你，
          <span>{{$store.state.currentUserInfo.name}}</span>
          <router-link to="/logout">退出</router-link>
        </span>
      </template>
      <template v-else>
        <span class="header-right">
          <router-link to="/login">请登录</router-link>
        </span>
      </template>
    </div>
    <el-row style="height: 100%;">
      <el-col :span="4" style="height: 100%;">
        <div class="menu"><Menus /></div>
      </el-col>
      <el-col :span="20" style="height: 100%;">
        <div class="container"><router-view></router-view></div>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  .menu{
    height: 100%;
    /*float: left;*/
  }
  .container{
    /*float: left;*/
    margin: 80px;
  }
  .header-wrapper{
    line-height: 80px;
    background: #5db0ec;
    margin: 0;
    padding: 0 20px;
    font-size: 26px;
    .header-right{
      float: right;
      font-size: 18px;
      color: #fff;
      a{
        margin-left: 20px;
        color: #000;
        cursor: pointer;
        font-size: 16px;
      }
    }
  }
</style>
<script type="text/babel">
  import Menus from './layout/menu.vue';

  export default{
    name: 'App',
    components: { Menus },
    data() {
      return {
      };
    },
    watch: {
      '$store.state.errMsg': function (val) {
        if (val) {
          this.$message({
            message: val,
            type: 'error'
          });
          this.$store.commit('API_ERROR', '');
        }
      }
    },
    mounted() {

    },
    methods: {
    }
  };
</script>
