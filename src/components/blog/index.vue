<template>
  <div class="blog-wrapper">
    <div class="menu-button" :class="{'menu-active': showMenu}" @click="showMenu = !showMenu">
      <span class="line" :class="{'line-1': showMenu}"></span>
      <span class="line" :class="{'line-2': showMenu}"></span>
      <span class="line" :class="{'line-3': showMenu}"></span>
    </div>
    <div class="left" :class="{left1: showMenu}">
      <BlogMenu />
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>
<script type="text/babel">
  import BlogMenu from './menu.vue';

  export default {
    props: {},
    components: { BlogMenu },
    data() {
      return {
        showMenu: true
      };
    },
    mounted() {
      this.$api.sentence.request('/').then((res) => {
        this.$store.state.sentence = res.data;
      }).catch((err) => {
        console.log(err);
      });
    },
    computed: {},
    methods: {
    }
  };
</script>
<style lang="less" type="text/less" scoped>
  .blog-wrapper{
    height: 100%;
    .menu-button{
      cursor: pointer;
      background: #c6d8d1;
      position: absolute;
      z-index: 1;
      transition: all 1s;
      &.menu-active{
        margin-left: 320px;
      }
      .line{
        width: 37px;
        height: 4px;
        background: #fff;
        display: block;
        margin: 9px;
        transition: all 1s;
        &.line-1{
          transform-origin: left;
          transform: rotate(-315deg);
        }
        &.line-2{
          opacity: 0;
          transform: translateX(-40px);
        }
        &.line-3{
          transform-origin: left;
          transform: rotate(315deg);
        }
      }
    }
    .left{
      position: relative;
      margin-left: -400px;
      width: 400px;
      height: 100%;
      float: left;
      background: #c6d8d1;
      transition: all 1s;
      &.left1{
        margin-left: 0;
      }
    }

    @media only screen and(max-width: 740px) {
      .menu-button{
        z-index: 10;
        left: 0;
      }
      .left{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        margin-left: -100%;
        z-index: 9;
      }
    }
    .right{
      height: 100%;
      float: left;
      /*position: relative;*/
    }
  }
</style>
