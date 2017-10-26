<template>
  <div class="article-wrapper" :style="{background: `url(${article.thumbnail}) no-repeat`}"
       @mouseenter="hover=true" @mouseleave="hover=false">
    <div class="center">
      <div class="title">{{article.title}}</div>
      <div class="date">{{article.time.minute}}</div>
      <div class="tags">
        <span v-for="item in article.tags" v-if="item">{{item}}</span>
      </div>
    </div>
    <div class="mask" :class="{'mask1': hover}">
      <div class="mask-inner">
        <div class="date">{{article.time.minute}}</div>
        <div class="title-wrapper">
          <div class="title">{{article.title}}</div>
        </div>
        <div class="click">Click</div>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  export default {
    props: {
      article: {
        type: Object
      }
    },
    data() {
      return {
        hover: false
      };
    },
    mounted() {
    },
    methods: {}
  };
</script>
<style lang="less" type="text/less">
  .article-wrapper{
    width: 100%;
    background-position: center center!important;
    background-size: cover!important;
    display: table;
    height: 100%;
    .tags{
      margin-top: 20px;
      span{
        display: inline-block;
        text-decoration: none;
        font-weight: normal;
        font-size: 16px;
        color: #fff;
        height: 34px;
        line-height: 34px;
        padding: 0 20px;
        position: relative;
        border-radius: 0 5px 5px 0;
        margin: 5px 20px;
        background: #24b6ba;
        &:before{
          content: " ";
          width: 0;
          height: 0;
          position: absolute;
          top: 0;
          left: -34px;
          border: 17px solid transparent;
          border-right-color: #24b6ba;
        }
        &:after{
          content: " ";
          width: 4px;
          height: 4px;
          background-color: #fff;
          border-radius: 4px;
          -webkit-box-shadow: 0 0 0 1px rgba(0,0,0,0.3);
          box-shadow: 0 0 0 1px rgba(0,0,0,0.3);
          position: absolute;
          top: 15px;
          left: 2px;
        }
      }
    }
    .center{
      display: table-cell;
      vertical-align: middle;
      text-align: center;
      color: #fff;
      .title{
        font-size: 28px;
      }
      .date{
        font-size: 20px;
      }
      .click{
        font-size: 20px;
      }
      div{
        margin: 10px 0;
      }
    }
    .mask{
      opacity: 0;
      position: absolute;
      width: 100%;
      left: 0;
      top: 0;
      height: 100%;
      transition: all 1s;
      &.mask1{
        opacity: 1;
        background: rgba(0,0,0,.6);
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
        height: 100%;
        .title-wrapper{
          &:before{
            width: 100%;
          }
          &:after{
            width: 100%;
          }
          .title{
            &:before{
              height: 100%;
            }
            &:after{
              height: 100%;
            }
          }
        }
      }
      .title-wrapper{
        display: inline-block;
        padding: 20px 60px;
        position: relative;
        &:before{
          bottom: -1px;
          height: 1px;
          right: -1px;
          width: 0;
          background-color: #ffffff;
          content: '';
          display: block;
          position: absolute;
          z-index: 10;
          transition: all .6s ease;
        }
        &:after{
          height: 1px;
          left: -1px;
          top: -1px;
          width: 0;
          background-color: #ffffff;
          content: '';
          display: block;
          position: absolute;
          z-index: 10;
          transition: all .6s ease;
        }
      }
      .title{
        margin: 0;
        font-size: 32px;
        font-family: Georgia, Times, "Times New Roman", serif;
        &:before{
          height: 0;
          right: -1px;
          top: -1px;
          width: 1px;
          background-color: #ffffff;
          content: '';
          display: block;
          position: absolute;
          z-index: 10;
          transition: all .6s ease;
        }
        &:after{
          bottom: -1px;
          height: 0;
          left: -1px;
          width: 1px;
          background-color: #ffffff;
          content: '';
          display: block;
          position: absolute;
          z-index: 10;
          transition: all .6s ease;
        }
      }
      .mask-inner{
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        color: #fff;
        width: 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
      .date{
        font-size: 18px;
      }
      .click{
        font-size: 22px;
      }
      div{
        margin-bottom: 10px;
      }
    }
  }
</style>
