<template>
  <div class="users-wrapper">
    <el-button type="primary"
    :disabled="$store.state.currentUserInfo.powers.indexOf('/users/add') === -1"
    @click="$router.push('/users/add')"
    style="marginBottom: 20px">新增用户</el-button>
    <el-table
      :data="userList"
      @selection-change="handleSelectionChange"
      border
      ref="singleTable"
      style="width: 100%">
      <el-table-column
        v-if="$store.state.currentUserInfo.powers.indexOf('users_delete') !== -1"
        type="selection"
        width="55">
      </el-table-column>
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
            size="mini"
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
            :disabled="userEdit"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="small"
            type="danger"
            :disabled="userDelete"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="pages.limit"
        layout="total, prev, pager, next, jumper"
        :current-page.sync="pages.curPage"
        :total="pages.total">
      </el-pagination>
    </div>
  </div>
</template>
<script type="text/babel">
import tableMixin from '../../mixins/table_mixin';

export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      userList: [],
      pages: {
        total: 0,
        limit: 0,
        curPage: 1
      }
    };
  },
  mixins: [tableMixin],
  computed: {
    userDelete() {
      return this.$store.state.currentUserInfo.powers.indexOf('user_delete') === -1;
    },
    userEdit() {
      return this.$store.state.currentUserInfo.powers.indexOf('user_edit') === -1;
    }
  },
  mounted() {
    this.getUserList(this.$route.query.page);
  },
  methods: {
    getUserList(page = 1) {
      this.$api.admin.users.request({ page, type: 0 }).then(({ data }) => {
        this.userList = data.users;
        this.pages = data.pages;
      });
    },
    handleCurrentChange(val) {
      this.getUserList(val);
    },
    handleEdit(index, row) {
      this.$router.push(`/users/add?uid=${row.uid}`);
    },
    handleDelete(index, row) {
      let msg = '确定删除吗？';
      const bool = row.uid === this.$store.state.currentUserInfo.uid;
      if (bool) {
        msg = '确定删除当前登录用户吗？';
      }
      this.$alert(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        callback: (action) => {
          if (action === 'confirm') {
            this.$api.users.delete.request({ uid: row.uid }).then(({ data }) => {
              if (data.status) {
                if (bool) {
                  this.$message({
                    message: '请重新登录！',
                    type: 'warning'
                  });
                  setTimeout(() => {
                    this.$route.push('/logout');
                  }, 2000);
                } else {
                  const i = this.userList.findIndex(v => v.uid === row.uid);
                  this.userList.splice(i, 1);
                }
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
.page{
  text-align: right;
  margin-top: 20px;
}
</style>
