<template>
  <div class="admin-manage-wrapper">
    <div class="sentences" v-text="$store.state.sentence.trim()">
    </div>
    <div class="article-list-wrapper">
      <ul>
        <li v-for="(item, index) in list">
          <div class="title">{{item.title}}</div>
          <div class="tags" :class="{'blue': !((index + 3) % 3), 'blue-green':
              (index % 3) === 1, 'green': (index % 3) === 2}">
            <span v-for="tag in item.tags" v-if="tag">{{tag}}</span>
          </div>
          <div class="desc" v-html="item.post"></div>
          <div class="operator">
            <span class="delete" @click="deleteOne(item._id)">删除<i class="icon icon-remove"></i></span>
            <span class="edit" @click="editOne(item._id)">编辑<i class="icon icon-edit"></i></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/babel">
  import marked from 'marked';
  import hljs from '../../../../static/highlight.min';

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
    components: {},
    data() {
      return {
        list: []
      };
    },
    mounted() {
      this.getPosts();
    },
    computed: {},
    methods: {
      getPosts() {
        this.$api.posts.request({ p: 1 }).then(({ data }) => {
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
      editOne(id) {
        this.$router.push(`/admin/post?id=${id}`);
      },
      deleteOne(id) {
        this.$api.removeOne.request({ id }).then(({ data }) => {
          if (data.status) {
            this.getPosts();
          } else {
            this.showLogin = true;
          }
          this.$message(data.msg);
        });
      }
    }
  };
</script>
<style lang="less" type="text/less" scoped>
  @import "../../../../static/github-markdown.css";
  @import "../../../../static/atom-one-dark.min.css";
  .admin-manage-wrapper{
    height: 100%;
    .sentences{
      font-size: 20px;
      padding-left: 20px;
      white-space: pre-wrap;
    }
    .article-list-wrapper{
      display: flex;
      flex-wrap: wrap;
      max-height: 100%;
      overflow-y: auto;
      ul{
        width: 100%;
        li{
          width: 80%;
          border: 1px solid #000;
          margin: 20px auto;
          .title{
            font-size: 20px;
            margin: 10px;
            font-weight: bold;
          }
          .tags{
            padding: 0 10px;
            span{
              display: inline-block;
              line-height: 18px;
              color: #fff;
              font-size: 14px;
              padding: 4px 8px;
              margin: 10px 10px 0 0;
              border-radius: 2px;
              min-width: 66px;
              text-align: center;
            }
            &.blue{
              span{
                background: #42adec;
              }
            }
            &.blue-green{
              span{
                background: #60d1de;
              }
            }
            &.green{
              span{
                background: #42cca0;
              }
            }
          }
          .desc{
            max-height: 180px;
            overflow: hidden;
            margin: 20px 20px 0;
          }
          .operator{
            span{
              display: inline-block;
              padding: 20px;
              font-size: 20px;
              margin: 0 20px;
              cursor: pointer;
              &.delete{
                color: #da3030;
              }
              &.edit{
                color: #162ee4;
              }
            }
          }
        }
      }
    }
  }
</style>
