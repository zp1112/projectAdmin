<template>
  <div class="new-wrapper">
    <h2>新建项目</h2>
    <el-form ref="form" :model="form" label-width="200px">
      <el-form-item label="项目名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="项目描述">
        <el-input type="textarea" :rows="6" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="项目所属部门">
        <el-select v-model="form.team" filterable placeholder="请选择所属部门">
          <el-option v-for="item in teamList"
          :key="item.tid"
          :label="item.tname"
          :value="item.tid"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目成员">
        <el-select
          v-model="form.members"
          multiple
          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词"
          :loading="loading"
          :remote-method="remoteMethod">
          <el-option
            v-for="item in members"
            :key="item.uid"
            :label="item.name"
            :value="item.uid">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/babel">
const throttle = (method, delay, context) => (...args) => {
  if (!method.tid) {
    method.call(context, ...args);
    method.tid = 1;
    setTimeout(() => (method.tid = 0), delay);
  }
};
export default {
  name: '',
  components: {},
  props: {
  },
  data() {
    return {
      loading: false,
      form: {
        name: '',
        description: '',
        members: [],
        team: '',
        owner: ''
      },
      teams: [],
      members: [],
      teamList: [],
      timer: null,
      query: ''
    };
  },
  mounted() {
    this.form.owner = this.$store.state.currentUserInfo.uid;
    this.$api.admin.team.request().then((res) => {
      this.teamList = res.data;
    });
  },
  methods: {
    remoteMethod(query) {
      this.query = query;
      if (query !== '') {
        const func = () => {
          this.loading = true;
          this.$api.admin.users.request({ type: 1, keyword: this.query }).then(({ data }) => {
            this.members = data.users;
            this.loading = false;
          });
          this.timer = null;
        };
        if (!this.timer) {
          this.timer = setTimeout(func, 800);
        }
      } else {
        this.members = [];
      }
    },
    onSubmit() {
      const param = this.form;
      param.edit = false;
      this.$api.project.new.request(this.form).then((res) => {
        this.members = res.data.user;
//          this.$router.push('/');
      });
    }
  }
};
</script>
<style lang="less" type="text/less" scoped>
  .new-wrapper{
    width: 700px;
  }
</style>
