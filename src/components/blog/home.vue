<template>
  <div class="blog-home-wrapper">
     <div class="welcome">
      <img src="../../assets/maram.jpg" />
      <span>
      <div class="left-half"></div>
      <div class="right-half"></div>
      <div class="center">
        <h2>Daily Record</h2>
        <div class="line"><span></span></div>
        <p>Other men live to eat, while I eat to live.</p>
      </div>
      </span>
     </div>
  </div>
</template>
<script type="text/babel">

  export default {
    props: {},
    components: { },
    data() {
      return {
      };
    },
    mounted() {
      $('.welcome').hover(() => {
        $('.center').addClass('center-hover');
      }, () => {
        $('.center').removeClass('center-hover');
      });
    },
    computed: {
    },
    methods: {
    }
  };
</script>
<style lang="less" type="text/less" scoped>
  .blog-home-wrapper{
    height: 100%;
    background: url('../../assets/bg.jpg') no-repeat;
    background-size: cover;
    position: absolute;
    width: 100%;
    img{
      position: absolute;
    }
    .welcome{
      width: 700px;
      height: 473px;
      margin-left: 100px;
      margin-top: 100px;
      position: relative;
      &:hover{
        .left-half, .right-half{
          opacity: 1;
          transform: perspective(600px) rotateY(0);
        }
      }
    }
    .center{
      position: absolute;
      width: 100%;
      h2{
        color: #fff;
        text-align: center;
        font-size: 30px;
        margin-top: 100px;
        opacity: 0;
        transition: all .4s ease-in;
      }
      .line{
        height: 80px;
        span{
          height: 0;
          width: 4px;
          background: #fff;
          display: inline-block;
          padding-top: 0;
          position: absolute;
          left: 0;
          right: 0;
          margin: auto;
          transition: all .4s ease-in;
          transition-delay: .5s;
        }
      }
      p{
        text-align: center;
        opacity: 0;
        font-size: 20px;
        color: #fff;
        transition: all .4s ease-in;
        transition-delay: .9s;
      }
      &.center-hover{
        h2, p{
          opacity: 1;
        }
        .line span{
          padding-top: 80px;
        }
      }
    }
    .left-half, .right-half{
        width: 350px;
        height: 473px;
        top: 0;
        left: 0;
        background: rgba(97, 92, 92, 1);
        opacity: .8;
        position: absolute;
        transition: all .4s linear;
      }
      .left-half{
        transform-origin: right center;
        transform: perspective(2000px) rotateY(90deg);
      }
      .right-half{
        left: 350px;
        transform-origin: left center;
        background: rgba(97, 92, 92, .9);
        transform: perspective(2000px) rotateY(-90deg);
      }
  }
</style>
