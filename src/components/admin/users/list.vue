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
              <span style="margin-left: 10px">创建日期：{{ new Date(scope.row.createdTime * 1000).toLocaleString() }}</span>
            </p>
            <p><el-icon name="time"></el-icon>
              <span style="margin-left: 10px">更新日期：{{ new Date(scope.row.updatedTime * 1000).toLocaleString() }}</span>
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
            close-transition>{{scope.row.tname}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话号码">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="admin"
        label="权限"
        filter-placement="bottom-end">
        <template scope="scope">
          <el-tag
            type="primary"
            v-for="item in scope.row.admin.split(',')"
            :key="item"
            close-transition>{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button
            size="small"
            :disabled="disabled"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="small"
            type="danger"
            :disabled="disabled"
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
    computed: {
      disabled() {
        return JSON.parse(localStorage.getItem('userInfo')).admin.split(',').indexOf('root') === -1;
      }
    },
    mounted() {
      this.$api.admin.users.request().then(({ data }) => {
        this.userList = data;
      });
    },
    methods: {
      handleEdit(index, row) {
        this.$router.push(`/users/add?uid=${row.uid}`);
      },
      handleDelete(index, row) {
        this.$alert('确定删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          callback: (action) => {
            if (action === 'confirm') {
              this.$api.users.delete.request({ uid: row.uid }).then(({ data }) => {
                if (data.status) {
                  const i = this.userList.findIndex(v => v.uid === row.uid);
                  this.userList.splice(i, 1);
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
