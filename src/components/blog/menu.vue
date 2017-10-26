<template>
  <div class="blog-menu-wrapper">
    <div class="avatar">
      <img src="../../assets/avatar.jpg"/>
      <div>Candy Zheng</div>
    </div>
    <div class="menu-links">
      <ul>
        <li><router-link to="/blog/home"><img src="../../assets/home.png"/>首页</router-link></li>
        <li><router-link to="/blog/list"><img src="../../assets/home.png"/>文章列表</router-link></li>
        <li><router-link to="/blog/about"><img src="../../assets/home.png"/>关于我</router-link></li>
        <li><router-link to="/blog/contact"><img src="../../assets/concat.png"/>联系我</router-link></li>
      </ul>
    </div>
    <div class="search-wrapper">
      <div class="input">
        <input type="text" placeholder="输入关键词搜索文章" v-model="search"/>
        <span :class="{'active': search}"></span>
      </div>
    </div>
    <div class="latest-wrapper">
      <div class="list-wrapper">
        <div class="post">快速通道：</div>
        <ul>
        <li class="email icon icon-envelope-o" data-msg="qqmail">
          <a href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=a1paUllSXFJZXVsrGhpFCAQG"
             target="_blank"></a>
        </li>
        <li class="github icon icon-github" data-msg="github">
          <a href="https://github.com/zp1112" target="_blank"></a>
        </li>
        <li class="blog icon icon-cloud" data-msg="blog.suzper.com">
          <a href="http://blog.suzper.com/" target="_blank"></a>
        </li>
        <li class="lofter icon icon-cloud" data-msg="lofter">
          <a href="http://zpcandy.lofter.com/" target="_blank"></a>
        </li>
      </ul>
      </div>
    </div>
    <audio controls autoplay
           id="audio"
           ref="video"
           :src="videoList[videoIndex]">
      <!--<source  type="audio/ogg">-->
      您的浏览器不支持音频播放
  </audio>
  </div>
</template>
<script type="text/babel">

  export default {
    props: {},
    components: {  },
    data() {
      return {
        videoIndex: 0,
        videoList: [
          'http://oifeo8q69.bkt.clouddn.com/music1.mp3',
          'http://oifeo8q69.bkt.clouddn.com/music3.mp3',
          'http://oifeo8q69.bkt.clouddn.com/music2.mp3'
        ],
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
      const vm = this;
      document.querySelector('#audio').onended = function() {
        vm.videoIndex += 1;
      };
      this.$watch('videoIndex', (val) => {
        if (val >= 3) {
          this.videoIndex = 0;
        }
      });
    },
    computed: {},
    methods: {
    }
  };
</script>
<style lang="less" type="text/less" scoped>
  @keyframes profilepic {
    0% {
      transform: translateY(1px) translateX(4px);
    }
    100% {
      transform: translateY(-1px) translateX(0);
    }
  }
.blog-menu-wrapper{
  .avatar{
    text-align: center;
    padding: 40px 0 0;
    img{
      width: 160px;
      height: 160px;
      border: 8px solid #fff;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 0 10px #fff;
      &:hover{
        border: 8px solid #83cbff;
        box-shadow: 0 0 10px #83cbff;
        -webkit-animation: profilepic 0.15s linear infinite alternate;
      }
    }
    div{
      font-size: 22px;
    }
  }
  .menu-links{
    margin-left: 150px;
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
        img{
          width: 20px;
          margin-right: 10px;
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
  .search-wrapper{
    text-align: center;
    width: 80%;
    margin: 0 auto;
    border: 1px solid #904040;
    .input{
      background: #fff;
    }
    input{
      border: none;
      outline: none;
      height: 30px;
      margin-left: 26px;
      width: 80%;
    }
    span{
      display: inline-block;
      height: 30px;
      float: right;
      width: 30px;
      background: url('../../assets/search.png') no-repeat;
      background-color: #ccc;
      background-position: center;
      cursor: pointer;
      &:hover{
        background-color: #cc5e5e;
      }
      &.active{
        background-color: #cc5e5e;
      }
    }
  }
  .latest-wrapper{
    .list-wrapper{
      .post{
        margin: 20px auto 10px;
        width: 80%;
        border-left: 5px solid #246ac2;
        color: #fff;
        padding-left: 10px;
        font-size: 20px;
      }
      ul{
        font-size: 14px;
        margin: 0 auto;
        width: 80%;
        li{
          font-size: 30px;
          width: 50px;
          height: 50px;
          background: #56b6c2;
          padding: 10px;
          border-radius: 50%;
          color: #fff;
          cursor: pointer;
          position: relative;
          margin: 0 8px;
          box-shadow: 0 0 3px #fff;
          transition: all .3s;
          &:hover{
            box-shadow: 0 0 5px #000;
          }
          &:hover:after{
            transform: scale(1, 1);
            content: attr(data-msg);
            position: absolute;
            font-size: 12px;
            padding: 2px 10px;
            line-height: 30px;
            text-align: center;
            left: 0;
            top: 72px;
            border: 1px solid #4a4646;
            background: #4a4646;
            border-radius: 6px;
            box-shadow: 0 0 1px;
          }
          a{
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
          }
          &.github:before{
            margin-left: 2px;
          }
          &.lofter{
            background: url('../../assets/lofter.png') no-repeat center;
            background-size: cover;
          }
          &.lofter:before{
            opacity: 0;
          }
        }
      }
    }
  }
  #audio{
    width: 100%;
    padding: 0 20px;
    position: absolute;
    bottom: 20px;
  }
}
</style>
