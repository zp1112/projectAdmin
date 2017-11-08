<template>
  <div class="new-wrapper">
    <h2>项目汇报</h2>
    <div>
      <div id="editorElem" style="text-align:left"></div>
      <button @click="submit">提交汇报</button>
      <!-- <TextEditor /> -->
    </div>
    <el-select v-model="currentProject" placeholder="请选择">
      <el-option
        v-for="item in projects"
        :key="item.pid"
        :label="item.pname"
        :value="item.pid">
      </el-option>
    </el-select>
  </div>
</template>
<script type="text/babel">
import E from 'wangeditor';
import TextEditor from '../commons/text_edit.vue';

export default {
  name: '',
  components: { TextEditor },
  props: {
  },
  data() {
    return {
      projects: [],
      currentProject: '',
      editorContent: ''
    };
  },
  mounted() {
    const editor = new E('#editorElem');
    editor.customConfig.uploadImgShowBase64 = true;
    editor.customConfig.pasteFilterStyle = false;
    editor.customConfig.onchange = (html) => {
      this.editorContent = html;
    };
    editor.create();
    this.$api.project.owner.request({ uid: this.$store.state.currentUserInfo.uid }).then(({ data }) => {
      console.log(data);
      this.projects = data.projects;
    });
  },
  methods: {
    submit() {
      console.log(this.editorContent);
      this.$api.project.report.request({ content: this.editorContent,
        pid: this.currentProject,
        uid: this.$store.state.currentUserInfo.uid,
        action: 1
      }).then(({ data }) => {

      });
    }
  }
};
</script>
<style lang="less" type="text/less" scoped>
</style>
