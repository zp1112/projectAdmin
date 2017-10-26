<template>
  <div class="menu-wrapper">
    <h1>项目汇报管理系统</h1>
    <el-row class="tac">
      <el-col :span="8">
        <el-menu :default-active="onRoute" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
          <el-menu-item index="/index"><i class="el-icon-menu"></i>首页</el-menu-item>
          <el-submenu index="/project">
            <template slot="title"><i class="el-icon-message"></i>项目列表</template>
            <el-menu-item-group>
              <template slot="title">进行中</template>
              <el-menu-item v-for="item in inProjects" :index="`/project/detail/${item.uuid}`">{{item.name}}
</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">已结项</template>
              <el-menu-item v-for="item in outProjects" :index="`/project/detail/${item.uuid}`">{{item.name}}
</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/new"><i class="el-icon-menu"></i>立项</el-menu-item>
          <el-menu-item index="/report"><i class="el-icon-setting"></i>汇报</el-menu-item>
          <el-submenu index="/users">
            <template slot="title"><i class="el-icon-message"></i>用户管理</template>
            <el-menu-item index="/users/list">用户列表</el-menu-item>
            <el-menu-item index="/users/add">新增用户</el-menu-item>
          </el-submenu>
          <el-menu-item
            index="/logout"><i class="el-icon-setting"></i>登出</el-menu-item>
          <el-menu-item
            index="/login"><i class="el-icon-setting"></i>登录</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script type="text/babel">
  export default {
    name: '',
    components: {},
    props: {},
    data() {
      return {
        isCollapse: true
      };
    },
    computed: {
      onRoute() {
        return this.$route.path;
      },
      userInfo() {
        return JSON.parse(localStorage.getItem('userInfo'));
      },
      inProjects() {
        return this.$store.state.inProjects;
      },
      outProjects() {
        return this.$store.state.outProjects;
      }
    },
    mounted() {
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  };
</script>
<style lang="less" type="text/less">
  .menu-wrapper{
    height: 100%;
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 100%;
      position: absolute;
    }
    .tac{
      height: 100%;
    }
  }
</style>
