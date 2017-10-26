<template>
  <div class="detail-wrapper">
    <!--<img :src="detail.thumbnail" />-->
    <div class="title" :style="{background: `url(${detail.thumbnail})`}">
      <div class="info">
        <div>{{detail.title}}</div>
        <span>发布日期：{{detail.time.minute}}</span>
        <div class="tags">
          <span v-for="item in detail.tags" v-if="item">{{item}}</span>
        </div>
      </div>
    </div>
    <div class="BlogAnchor" id="BlogAnchor">
      <p>
        <b id="AnchorContentToggle" title="收起" style="cursor:pointer;">目录[-]</b>
      </p>
      <div class="AnchorContent" id="AnchorContent"> </div>
    </div>
    <div class="markdown-body article-entry">
      <div v-html="detail.post"></div>
    </div>
    <MyFooter :detailInfo="detailInfo" v-if="detailInfo" />
    <div class="post-link">
      <a v-if="pre" class="pre" @click="goLink(pre._id)">{{pre.title}}</a>
      <a v-if="next" class="next" @click="goLink(next._id)">{{next.title}}</a>
    </div>
  </div>
</template>
<script type="text/babel">
  import marked from 'marked';
  import MyFooter from '../commons/footer.vue';
  import hljs from '../../../static/highlight.min';

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    highlight(code) {
      return hljs.highlightAuto(code).value;
    }
  });
  export default {
    props: {},
    components: { MyFooter },
    data() {
      return {
        detail: {
          time: {}
        },
        pre: null,
        next: null,
        detailInfo: null
      };
    },
    watch: {
      '$route.query'(query) {
        console.log(query);
        this.getArticle();
        document.querySelector('.detail-wrapper').scrollTop = 0;
      }
    },
    mounted() {
      if (this.$route.query.id) {
        this.getArticle();
      }
      const wrapper = document.querySelector('.detail-wrapper');
      wrapper.onscroll = function () {
        if (wrapper.scrollTop > 600) {
          document.querySelector('#BlogAnchor').style = 'position:fixed;top:0;';
        } else {
          document.querySelector('#BlogAnchor').style = '';
        }
      };
    },
    methods: {
      getArticle() {
        this.$api.getOne.request({ id: this.$route.query.id }).then(({ data }) => {
          if (data.status) {
            this.detail = data.doc;
            this.detail.post = marked(data.doc.post, {
              sanitize: true
            });
            this.detailInfo = data.doc;
            this.$nextTick(() => {
              $('#AnchorContent')[0].innerHTML = ''
              $('.markdown-body').find('h2,h3,h4,h5,h6').each(function (i, item) {
                const tag = $(item).get(0).localName;
                $(item).attr('id', `wow${i}`);
                $('#AnchorContent').append(`<li><a class="new${tag} anchor-link" onclick="return false;" href="#" link="#wow${i}">${i + 1} · ${$(this).text()}</a></li>`);
                $('.newh2').css('margin-left', 0);
                $('.newh3').css('margin-left', 20);
                $('.newh4').css('margin-left', 40);
                $('.newh5').css('margin-left', 60);
                $('.newh6').css('margin-left', 80);
              });
              $('#AnchorContentToggle').click(function () {
                const text = $(this).html();
                if (text === '目录[-]') {
                  $(this).html('目录[+]');
                  $(this).attr({ title: '展开' });
                } else {
                  $(this).html('目录[-]');
                  $(this).attr({ title: '收起' });
                }
                $('#AnchorContent').toggle();
              });
            });
            this.$nextTick(() => {
              $('.anchor-link').click(function () {
                $($(this).attr('link'))[0].scrollIntoView();
              });
            });
          } else this.$message(data.msg);
        });
        this.$api.getTwo.request({ id: this.$route.query.id }).then(({ data }) => {
          if (data.status) {
            this.pre = data.gtDoc;
            this.next = data.ltDoc;
          } else this.$message(data.msg);
        });
      },
      goLink(link) {
        this.$router.push(`/blog/detail?id=${link}`);
      }
    }
  };
</script>
<style lang="scss" scoped>
  .BlogAnchor {
    background: #f4f7f9;
    padding: 10px;
    line-height: 180%;
    position: fixed;
  }
  .BlogAnchor p {
    font-size: 18px;
    color: #15a230;
    margin-bottom: 0.3em;
  }
  .BlogAnchor .AnchorContent {
    padding: 5px 0px;
  }
  .BlogAnchor li{
    text-indent: 20px;
    font-size: 14px;
  }
  #AnchorContentToggle {
    font-size: 13px;
    font-weight: normal;
    color: #FFF;
    display: inline-block;
    line-height: 20px;
    background: #5cc26f;
    font-style: normal;
    padding: 1px 8px;
    margin-right: 10px;
  }
  .BlogAnchor a:hover {
    color: #5cc26f;
  }
  .BlogAnchor a {
    text-decoration: none;
  }
  @import "../../less/style.css";
  /*@import "../../../static/github-markdown.css";*/
  @import "../../../static/atom-one-dark.min.css";
  .detail-wrapper{
    height: 100%;
    overflow-y: auto;
    /*padding: 30px;*/
    img{
      position: absolute;
      left: 0;
      top: 0;
      height: 315px;
      width: 100%;
      z-index: -1;
    }
    .title{
      padding: 100px;
      font-weight: bold;
      font-size: 30px;
      text-align: center;
      color: #fff;
      width: 100%;
      position: relative;
      height: 400px;
      background-size: cover!important;
      background-position: center center!important;
      background-repeat: no-repeat!important;
      .info{
        background: rgba(255, 255, 255, .5);
        padding: 20px;
        margin-top: 20px;
        font-size: 30px;
        color: #000;
        span{
          font-size: 14px;
        }
        .tags{
          margin-top: 20px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          span{
            display: inline-block;
            text-decoration: none;
            font-weight: normal;
            font-size: 0.75rem;
            color: #fff;
            height: 1.125rem;
            line-height: 1.125rem;
            padding: 0 5px 0 10px;
            position: relative;
            border-radius: 0 5px 5px 0;
            margin: 5px 9px 5px 8px;
            background: #24b6ba;
            &:before{
              content: " ";
              width: 0;
              height: 0;
              position: absolute;
              top: 0;
              left: -1.1rem;
              border: 0.5625rem solid transparent;
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
              top: 0.4375rem;
              left: 2px;
            }
          }
        }
      }
    }
    .markdown-body{
      padding: 0 140px 0 200px;
    }
    .post-link{
      height: 40px;
      background: #c9e1e6;
      line-height: 40px;
      .pre{
        margin: 0 20px;
        cursor: pointer;
        &:before{
          content: '<';
          margin-right: 18px;
        }
      }
      .next{
        float: right;
        margin: 0 20px;
        cursor: pointer;
        &:after{
          content: '>';
          margin-left: 18px;
        }
      }
    }
    @media only screen and(max-width: 740px) {
      .markdown-body{
        padding: 0 20px;
      }
    }
  }
</style>
