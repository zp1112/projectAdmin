<template>
    <div>
        <el-card v-loading="spinShow">
            <textarea class='tinymce-textarea' id="tinymceEditer"></textarea>
        </el-card>
    </div>
</template>

<script>
import tinymce from 'tinymce';

export default {
  name: 'text-editor',
  data() {
    return {
      spinShow: true
    };
  },
  methods: {
    init() {
      this.$nextTick(() => {
        const vm = this;
        const height = document.body.offsetHeight - 300;
        tinymce.init({
          selector: '#tinymceEditer',
          branding: false,
          elementpath: false,
          height,
          language: 'zh_CN.GB2312',
          menubar: 'edit insert view format table tools',
          plugins: [
            'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
            'searchreplace visualblocks visualchars code fullpage',
            'insertdatetime media nonbreaking save table contextmenu directionality',
            'emoticons paste textcolor colorpicker textpattern imagetools codesample'
          ],
          toolbar1: ' newnote print preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample',
          autosave_interval: '20s',
          image_advtab: true,
          table_default_styles: {
            width: '100%',
            borderCollapse: 'collapse'
          },
          setup(editor) {
            editor.on('init', (e) => {
              vm.spinShow = false;
              if (localStorage.editorContent) {
                tinymce.get('tinymceEditer').setContent(localStorage.editorContent);
              }
            });
            editor.on('keydown', (e) => {
              localStorage.editorContent = tinymce.get('tinymceEditer').getContent();
            });
          }
        });
      });
    }
  },
  created() {
    this.init();
  },
  destroyed() {
    tinymce.get('tinymceEditer').destroy();
  }
};
</script>
