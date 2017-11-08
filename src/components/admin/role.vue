/*
 * @Author: candy
 * @Date: 2017-10-30 11:32:20
 * @Last Modified by: candy
 * @Last Modified time: 2017-11-03 17:21:42
 */

<template>
  <div>
    <h2>权限管理</h2>
    <div class="count">总共<span id="myTargetElement"></span>个角色</div>
    <el-row>
      <el-col :span="10">
        <div class="newrole">
          <el-input placeholder="请输入角色名称" v-model="newRole">
            <el-button slot="append" icon="el-icon-plus" @click="addRole"></el-button>
            <!-- <el-button slot="append" icon="el-icon-plus" @click="addRole"></el-button> -->
          </el-input>
        </div>
        <el-table
          border
          highlight-current-row
          ref="singleTable"
          :data="roleData"
          @selection-change="handleSelectionChange"
          @current-change="handleCurrentChange"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="角色">
            <template scope="scope">
              <span style="margin-left: 10px">{{ scope.row.rname }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="角色备注">
            <template scope="scope">
              <el-popover trigger="hover" placement="top">
                <span style="margin-left: 10px">{{ scope.row.desc }}</span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button v-if="multipleSelection.length" type="error" @click="handleDeleteAll">批量删除</el-button>
        <el-button v-if="multipleSelection.length" type="success" @click="toggleSelection()">取消选中</el-button>
      </el-col>
      <el-col :span="12" v-show="currentRole" class="right">
        <el-button
            icon="plus"
            style="margin-bottom: 15px;"
            type="primary"
            @click="handleSave()">保存权限</el-button>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="role-name">{{currentRole}}</span>
          </div>
          <el-tree
            class="role-tree"
            :data="roleTree"
            show-checkbox
            ref="tree"
            node-key="id"
            :props="defaultProps">
          </el-tree>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script type="text/babel">
  import CountUp from 'countup';
import tableMixin from '../mixins/table_mixin';

  export default {
    name: '',
    components: {},
    props: {},
    data() {
      return {
        newRole: '',
        currentRole: '',
        roleData: [
          { rname: '111' }
        ],
        roleTree: [{
          label: '用户管理',
          children: [{
            id: 'user_add',
            label: '新增用户'
          }, {
            id: 'user_delete',
            label: '删除用户'
          }, {
            id: 'user_edit',
            label: '编辑用户'
          }]
        }, {
          label: '部门管理',
          children: [{
            id: 'team_add',
            label: '新增部门'
          }, {
            id: 'team_delete',
            label: '删除部门'
          }, {
            id: 'team_edit',
            label: '编辑部门'
          }]
        }, {
          label: '路由',
          children: [{
            id: '/role',
            label: '权限管理'
          }, {
            id: '/users/add',
            label: '新增用户'
          }, {
            id: '/team/add',
            label: '新增部门'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        currentRow: '',
        currentRow1: ''
      };
    },
    mixins: [tableMixin],
    watch: {
      currentRole(val) {
        if (val) {
          const index = this.roleData.findIndex(row => row.rname === val);
          this.$refs.tree.setCheckedKeys(this.roleData[index].roles.split(','));
        }
      },
      total(val) {
        this.count(val);
      }
    },
    computed: {
      total() {
        return this.roleData.length;
      }
    },
    mounted() {
      this.$api.admin.role.roles.request().then(({ data }) => {
        this.roleData = data.roles;
        this.count(data.roles.length);
      });
    },
    methods: {
      handleDeleteAll() {
        this.$alert('确定批量删除选中的角色吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          callback: (action) => {
            if (action === 'confirm') {
              this.$api.admin.role.deleteAll.request({ rnames: this.multipleSelection }).then(({ data }) => {
                if (data.status) {
                  this.roleData = data.roles;
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
      },
      handleCurrentChange(val) {
        if (val) {
          // this.currentRole = val.rname;
          this.$refs.singleTable.setCurrentRow(val);
          this.currentRow = val;
        }
      },
      count(val) {
        const options = {
          useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.',
          prefix: '',
          suffix: ''
        };
        const demo = new CountUp('myTargetElement', 0, val, 0, 2.5, options);
        if (!demo.error) {
          demo.start();
        } else {
          this.$message({
            message: demo.error,
            type: 'error'
          });
        }
      },
      addRole() {
        if (this.newRole) {
          this.$api.admin.role.new.request({ rname: this.newRole }).then(({ data }) => {
            this.$message({
              message: '角色创建成功！请分配权限',
              type: 'success'
            });
            this.roleData = data.roles;
            const obj = this.roleData.find(row => row.rname === this.newRole);
            this.handleCurrentChange(obj);
            this.currentRole = this.newRole;
            this.newRole = '';
          });
        }
      },
      handleEdit(index, row) {
        this.currentRole = row.rname;
      },
      handleDelete(index, row) {
        this.$alert('确定删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          callback: (action) => {
            if (action === 'confirm') {
              this.$api.admin.role.delete.request({ rname: row.rname }).then(({ data }) => {
                if (data.status) {
                  const i = this.roleData.findIndex(v => v.rname === row.rname);
                  this.roleData.splice(i, 1);
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
      },
      handleSave() {
        this.$api.admin.role.save.request({
          rname: this.currentRole,
          roles: this.$refs.tree.getCheckedKeys().join(',')
        }).then(({ data }) => {
          if (data.status) {
            this.$message({
              message: '更新成功！',
              type: 'success'
            });
            this.roleData = data.roles;
            this.handleCurrentChange(this.roleData.find(row => row.rname === this.currentRow.rname));
          }
        });
      }
    }
  };
</script>
<style lang="less" type="text/less" scoped>
  .right{
    margin-left: 20px;
    .role-tree{
      border: 1px solid #e6ebf5;
    }
    .role-name{
      font-size: 20px;
      line-height: 40px;
    }
  }
  .newrole{
    margin-bottom: 15px;
    width: 50%;
  }
  .count{
    margin-bottom: 20px;
    #myTargetElement{
      font-size: 20px;
      font-weight: bold;
      color: #da8020;
    }
  }
</style>
