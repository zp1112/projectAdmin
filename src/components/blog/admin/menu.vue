<template>
  <div class="admin-menu-wrapper">
    <div class="avatar">
      <img src="../../../assets/avatar.jpg" />
      <div>Candy Zheng</div>
    </div>
    <div class="menu-links">
      <ul>
        <li><router-link to="/admin/post">发表文章</router-link></li>
        <li><router-link to="/admin/manage">管理列表</router-link></li>
        <li><router-link to="/admin/edit">编辑文章</router-link></li>
        <li v-if="$store.state.candyLogin"
            @click.prevent="logout"><a href="#">退出登陆</a></li>
      </ul>
    </div>
  </div>
</template>
<script type="text/babel">

  export default {
    props: {},
    components: {  },
    data() {
      return {
        search: '',
        latest: [
          { title: '最近的一结核杆菌个', id: 1 },
          { title: '恢复环境合格后放好久', id: 1 },
          { title: '好方法减肥工会经费和规范和解放好久放假费劲好贵', id: 1 },
          { title: '好好干活改好就', id: 1 },
          { title: '最近的一篇博客', id: 1 }
        ]
      };
    },
    mounted() {
    },
    computed: {},
    methods: {
      logout() {
        localStorage.candyLogin = '';
        this.$store.state.candyLogin = false;
        this.$api.logout.request().then(({ data }) => {
          location.href = '/blog/home';
        });
      }
    }
  };
</script>
<style lang="less" type="text/less" scoped>
  .admin-menu-wrapper{
    .avatar{
      text-align: center;
      padding: 40px 0;
      img{
        width: 160px;
        height: 160px;
        border-radius: 50%;
      }
    }
    .menu-links{
      text-align: center;
      font-size: 20px;
      li{
        margin: 26px auto;
        a{
          color: #948585;
          display: inline-block;
          position: relative;
          &.active{
            border-bottom: 2px solid #da43b9;
          }
          &:after{
            content: '';
            display: inline-block;
            width: 0;
            height: 2px;
            background-color: #da43b9;
            position: absolute;
            bottom: -10px;
            left: 0;
            right: 0;
            margin: auto;
            transition: .6s width ease;
          }
        }
        &:hover{
          a{
            color: #fff;
            &:after{
              width: 100%;
            }
          }
        }
        .active-link{
          color: #fff;
          &:after{
            width: 100%;
          }
        }
      }
    }
  }
</style>
