<!--整个路由容器-->
<template>
  <div style="height: 100%;">
    <h1 class="header">项目汇报管理系统</h1>
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
  .header{
    background: #5db0ec;
    margin: 0;
    padding: 20px;
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
    mounted() {

    },
    methods: {
    }
  };
</script>
