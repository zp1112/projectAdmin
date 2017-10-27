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
        <el-select v-model="teams" filterable multiple placeholder="请选择所属部门">
          <el-option v-for="item in teamList"
          :key="item.tid"
          :label="item.tname"
          :value="item.tid"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目成员">
        <el-select v-model="form.members" filterable multiple placeholder="请选择">
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
  export default {
    name: '',
    components: {},
    props: {
    },
    data() {
      return {
        form: {
          name: '',
          description: '',
          members: [],
          teams: [],
          owner: ''
        },
        teams: [],
        members: [],
        teamList: []
      };
    },
    mounted() {
      this.form.owner = JSON.parse(localStorage.userInfo).name;
      this.$api.admin.team.request().then((res) => {
        this.teamList = res.data;
      });
      this.$api.admin.users.request().then((res) => {
        this.members = res.data;
      });
    },
    methods: {
      onSubmit() {
        this.teams.forEach((row) => {
          const obj = this.teamList.find(item => item.uuid === row);
          if (obj) {
            this.form.teams.push(obj);
          }
        });
        this.$api.project.new.request({ json: JSON.stringify(this.form) }).then((res) => {
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
