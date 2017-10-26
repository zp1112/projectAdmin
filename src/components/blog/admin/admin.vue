<template>
  <div class="admin-wrapper">
    <template v-if="!showLogin">
      <div class="left">
        <AdminMenu />
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </template>
    <Login @loginSuccess="loginSuccess" v-else/>
  </div>
</template>
<script type="text/babel">
  import AdminMenu from './menu.vue';
  import Login from '../../commons/login.vue';

  export default {
    props: {},
    components: { AdminMenu, Login },
    data() {
      return {
        showLogin: false
      };
    },
    mounted() {
      if (!this.$store.state.candyLogin) {
        this.showLogin = true;
      }
    },
    computed: {},
    methods: {
      loginSuccess() {
        this.showLogin = false;
      }
    }
  };
</script>
<style lang="less" type="text/less" scoped>
  .admin-wrapper{
    height: 100%;
    .left{
      width: 300px;
      border-right: 1px solid #ccc;
      box-shadow: 5px 0px 5px -5px #170f0f;
      height: 100%;
      position: absolute;
      background: #615c5c;
    }
    .right{
      height: 100%;
      margin-left: 300px;
      padding: 20px;
      position: relative;
    }
  }
</style>
