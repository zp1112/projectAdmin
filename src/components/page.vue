<template>
  <div class="page-bar">
    <ul>
      <li><a>共<i>{{allCount}}</i>条</a></li>
      <li v-if="cur!=1"><a @click="btnClick(1)">第一页</a></li>
      <li v-if="cur!=1"><a @click="btnClick(cur-1)">上一页</a></li>
      <li v-for="index in indexs" v-bind:class="{ active: cur == index}">
        <a v-on:click="btnClick(index)">{{ index }}</a>
      </li>
     <li v-if="cur!=allPage"><a @click="btnClick(cur+1)">下一页</a></li>
      <li v-if="cur!=allPage"><a @click="btnClick(allPage)">最后一页</a></li>
     <li><a>共<i>{{allPage}}</i>页</a></li>
      <li>
        <span class="goto">
        前往
        <input type="text"
               class="page-editor"
               style="width: 26px; text-align: center; color: #39464c"
               v-model.number="currentPage"
               @keyup.enter="callback(currentPage)"
      >
        页
        </span>
        </li>
    </ul>
  </div>
</template>

<script type="text/babel">
  export default{
    name: 'Page',
    props: {
      cur: {
        type: [String, Number],
        required: true
      },
      allPage: {
        type: [String, Number],
        required: true
      },
      allCount: {
        type: [String, Number],
        required: true
      },
      callback: {
        default() {
          return function callback() {
            // todo
          };
        }
      }
    },
    data() {
      return {
        currentPage: this.cur
      };
    },
    computed: {
      indexs() {
        let total = 10;
        if (document.body.clientWidth < 1280) {
          total = 6;
        }
        let left = 1;
        let right = this.allPage;
        const ar = [];
        if (this.allPage >= total + 1) {
          if (this.cur > (total / 2) && this.cur < this.allPage - (total / 2 - 1)) {
            left = this.cur - (total / 2);
            right = this.cur + (total / 2 - 1);
          } else if (this.cur <= (total / 2)) {
            left = 1;
            right = total;
          } else {
            right = this.allPage;
            left = this.allPage - (total - 1);
          }
        }
        while (left <= right) {
          ar.push(left);
          left++;
        }
        return ar;
      }
    },
    methods: {
      btnClick(page) {
        if (page !== this.cur) {
          this.callback(page);
        }
      }
    }
  };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .page-bar ul{
    font-size: 12px;
  }
  ul,li {
    margin: 0px;
    padding: 0px;
  }

  .page-bar li {
    list-style: none;
    display: inline-block;
  }

  .page-bar li:first-child>a {
    margin-left: 0px
  }

  .page-bar a, .goto {
    text-decoration: none;
    position: relative;
    float: left;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #0099e5;
    cursor: pointer;
  }
  .page-bar a{
    border: 1px solid #ddd;
  }

  .page-bar a:hover {
    background-color: #eee;
  }

  .page-bar .active a {
    color: #fff;
    cursor: default;
    background-color: #0099e5;
    border-color: #0099e5;
  }

  .page-bar i {
    font-style:normal;
    color: #0099e5;
    margin: 0px 4px;
    font-size: 12px;
  }
</style>
