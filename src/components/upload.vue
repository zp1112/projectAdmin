<template>
  <div class="upload-wrapper">
    <div class="title">法律法规数据录入</div>
    <div class="upload">
      <el-upload
        class="upload-demo"
        action="http://180.96.11.73:7373/api/law_search/upload"
        :on-change="handleChange"
        :file-list="fileList3"
        name="f">
        <el-button size="small" type="primary">点击上传</el-button>
        <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
      </el-upload>
    </div>
  </div>
</template>
<script type="text/babel">
  export default {
    props: {},
    data() {
      return {
        fileList3: []
      };
    },
    methods: {
      handleChange(file, fileList) {
        this.fileList3 = fileList;
      }
    }
  };
</script>
<style lang="less" type="text/less">
  .upload-wrapper{
    width: 1000px;
    margin: 100px auto;
    .title{
      font-size: 28px;
    }
    .upload{
      margin-top: 50px;
    }
  }
</style>
