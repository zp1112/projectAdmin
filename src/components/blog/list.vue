<template>
  <div class="blog-home-wrapper">
    <div class="sentences" v-text="$store.state.sentence.trim()">
    </div>
    <div class="article-list-wrapper">
      <router-link v-for="item in list"
                   :to="`/blog/detail?id=${item._id}`"><article-item :article="item" /></router-link>
    </div>
  </div>
</template>
<script type="text/babel">
  import marked from 'marked';
  import range from '../../../static/rangeFn';
  import hljs from '../../../static/highlight.min';
  import BlogMenu from './menu.vue';
  import articleItem from './article_item.vue';

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
    components: { BlogMenu, articleItem },
    data() {
      return {
        list: []
      };
    },
    mounted() {
      this.$parent.showMenu = true;
      this.$api.posts.request({p: 1}).then(({ data }) => {
        console.log(data);
        data.posts.forEach((row) => {
          row.post = marked(row.post, {
            sanitize: true
          });
        });
        this.list = data.posts;
        this.list.forEach(row => row.background =
          'https://www.bing.com/az/hprichbg/rb/CaanaTemple_ZH-CN9714949581_1920x1080.jpg');
      });
    },
    computed: {},
    methods: {
    }
  };
</script>
<style lang="less" type="text/less" scoped>
  .blog-home-wrapper{
    padding: 60px;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .sentences{
      font-size: 20px;
      padding-left: 20px;
      white-space: pre-wrap;
    }
    .article-list-wrapper{
      display: flex;
      flex-wrap: wrap;
      a{
        width: 100%;
        position: relative;
        height: 300px;
        left: 0;
        margin: 10px 0;
      }
    }
  }
</style>
