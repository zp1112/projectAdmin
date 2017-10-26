<template>
  <div class="users-wrapper">
    <el-table
      :data="userList"
      border
      style="width: 100%">
      <el-table-column
        label="姓名"
        width="180">
        <template scope="scope">
          <el-popover trigger="hover" placement="top">
            <p><el-icon name="time"></el-icon>
              <span style="margin-left: 10px">创建日期：{{ new Date(scope.row.createdTime).toLocaleString() }}</span>
            </p>
            <p><el-icon name="time"></el-icon>
              <span style="margin-left: 10px">更新日期：{{ new Date(scope.row.updatedTime).toLocaleString() }}</span>
            </p>
            <div slot="reference" class="name-wrapper">
              <el-tag>{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="tag"
        label="所属部门"
        filter-placement="bottom-end">
        <template scope="scope">
          <el-tag
            type="primary"
            v-for="item in scope.row.teams"
            close-transition>{{item.name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script type="text/babel">
  export default {
    name: '',
    components: {},
    props: {},
    data() {
      return {
        userList: []
      };
    },
    mounted() {
      this.$api.admin.users.request().then(({ data }) => {
        this.userList = data.user;
      });
    },
    methods: {}
  };
</script>
<style lang="less" type="text/less" scoped>
</style>
