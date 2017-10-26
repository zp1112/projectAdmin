<template>
  <div class="footer-wrapper">
    <div>
      <span>原文标题：</span><span>{{detailInfo.title}}</span><br/>
      <span>发布作者：</span><span>{{detailInfo.name}}</span><br/>
      <span>发布时间：</span><span>{{detailInfo.time.minute}}</span><br/>
      <span>最后更新：</span><span>{{detailInfo.update.minute}}</span><br/>
      <span>原文链接：</span><span>{{detailInfo.title}}</span>
    </div>
  </div>
</template>
<script type="text/babel">
  export default {
    name: '',
    components: {},
    props: ['detailInfo'],
    data() {
      return {};
    },
    mounted() {
    },
    methods: {}
  };
</script>
<style lang="less" type="text/less" scoped>
  .footer-wrapper{
    text-align: center;
    div{
      display: inline-block;
      text-align: left;
      padding: 20px 40px;
      background: #ceecd3;
      width: 55%;
      span{
        margin: 4px 0;
        display: inline-block;
      }
    }
  }
</style>
