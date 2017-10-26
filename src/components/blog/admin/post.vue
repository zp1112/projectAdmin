<template>
  <div class="post-wrapper">
    <div class="title">发表新文章</div>
    <form class="form" v-on:submit.prevent="onSubmit">
      <div class="sub-title">标题：</div>
      <input type="text" v-model="form.title" /><br />
      <div class="sub-title">缩略图：</div>
      <el-upload
        class="upload"
        drag
        :on-success="handleUpload1"
        action="/api/upload/thumbnail">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <div class="sub-title">标签：</div>
      <input type="text" v-model="form.tag1" />
      <input type="text" v-model="form.tag2" />
      <input type="text" v-model="form.tag3" /><br />
      <div class="sub-title">正文：</div>
      <!--<textarea name="post" rows="20" cols="100"></textarea><br />-->
      <div class="editorContainer">
        <markdown
          :mdValuesP="form.post"
          :fullPageStatusP="false"
          :editStatusP="true"
          :previewStatusP="true"
          :navStatusP="true"
          :icoStatusP="true"
          @childevent="childEventHandler"
        ></markdown>
      </div>
      <input type="submit" value="发表" class="submit"/>
    </form>
  </div>
</template>
<script type="text/babel">
  import markdown from '../../commons/markdown.vue';

  export default {
    props: {},
    components: { markdown },
    data() {
      return {
        mode: 'post',
        msgShow: '我要显示的内容',
        dilogStatus: false,
        form: {
          title: '',
          tag1: '',
          tag2: '',
          tag3: '',
          post: '',
          thumbnail: ''
        }
      };
    },
    mounted() {
      if (this.$route.query.id) {
        this.mode = 'edit';
        this.form.id = this.$route.query.id;
        this.$api.editOne.request({ id: this.$route.query.id }).then(({ data }) => {
          console.log(data);
          this.form.post = data.doc.post;
          this.form.title = data.doc.title;
          this.form.thumbnail = data.doc.thumbnail;
          data.doc.tags.forEach((row, index) => this.form[`tag${index + 1}`] = row);
        });
      }
    },
    methods: {
      handleUpload1(response) {
        this.$message(response.msg.key);
        this.form.thumbnail = `http://oifeo8q69.bkt.clouddn.com/${response.msg.key}`;
      },
      onSubmit() {
        if (this.mode === 'edit') {
          this.$api.savePost.request({
            id: this.form.id,
            tags: [this.form.tag1, this.form.tag2, this.form.tag3],
            title: this.form.title,
            post: this.form.post,
            thumbnail: this.form.thumbnail
          }).then(({ data }) => {
            if (data.status) {
              this.$router.push('/admin/manage');
            } else {
              this.$message(data.msg);
            }
          });
        } else {
          this.$api.newPost.request(this.form).then(({ data }) => {
            if (data.status) {
              this.$router.push('/admin/manage');
            } else {
              this.$message(data.msg);
            }
          });
        }
      },
      childEventHandler(res) {
      // res会传回一个data,包含属性mdValue和htmlValue，具体含义请自行翻译
        this.form.post = res.mdValue;
      },
      getMdValueFn() {
        this.msgShow = this.form.post;
        this.dilogStatus = true;
      },
      getHtmlValueFn() {
        this.msgShow = this.form.post;
        this.dilogStatus = true;
      },
      closeMaskFn() {
        this.msgShow = '';
        this.dilogStatus = false;
      }
    }
  };
</script>
<style lang="less" type="text/less">
  .post-wrapper{
    height: 100%;
    overflow-y: auto;
    padding: 20px;
    .title{
      font-size: 28px;
      font-weight: bold;
      margin: 20px 0;
    }
    .form{
      .sub-title{
        font-size: 20px;
        font-weight: bold;
        margin: 20px auto;
      }
      input{
        height: 40px;
        width: 300px;
        font-size: 20px;
        background: #f7ecec;
        text-indent: 10px;
        outline: none;
        border: 1px solid #c78686;
        margin: 0 10px;
      }
      .submit{
        margin-top: 200px;
      }
      .upload{
        margin: 34px;
      }
      textarea{
        width: 100%;
      }
      .editorContainer{
        height: 500px;
      }
    }
  }
</style>
