<template>
  <div class="new-wrapper">
    <h2>{{currenProject}}汇报</h2>
    <div>
      <el-collapse v-model="activeNames">
        <el-collapse-item v-for="(item, index) in list" :title="new Date(item.updatedTime * 1000).toLocaleString()" :name="index">
          <div v-html="item.content"></div>
          <template v-if="!index && userInfo.uid === item.uid">
            <el-button type="warning" plain @click="handleEdit(item)">编辑</el-button>
            <el-button type="danger" plain @click="handleDelete(item)">删除</el-button>
          </template>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script type="text/babel">

export default {
  name: '',
  props: {
  },
  data() {
    return {
      currenProject: {},
      list: [],
      activeNames: [0]
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.currentUserInfo;
    }
  },
  mounted() {
    if (this.$route.query.pid) {
      this.$api.project.detail.request({ pid: this.$route.query.pid }).then(({ data }) => {
        console.log(data);
        this.currenProject = data.pname;
        this.list = data.detail;
      });
    }
  },
  methods: {
    handleEdit(row) {
      this.$router.push(`/project/detail?pid=${row.pid}&edit=1`);
    },
    handleDelete(row) {
      this.$alert('确定删除该最新汇报吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        callback: (action) => {
          if (action === 'confirm') {
            this.$api.project.delete.request({ updatedTime: row.updatedTime, pid: row.pid }).then(({ data }) => {
              if (data.status) {
                this.list = data.detail;
                this.currentRole = '';
              } else {
                this.$message({
                  message: '删除失败！请重试',
                  type: 'error'
                });
              }
            });
          }
        }
      });
    }
  }
};
</script>
<style lang="less" type="text/less" scoped>
</style>
