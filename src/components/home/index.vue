<template>
  <div class="home-wrapper">
    <h2>项目列表</h2>
    <div>
      <el-table
        :data="list"
        border
        style="width: 100%">
        <el-table-column
          label="项目名称"
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
                <el-tag>{{ scope.row.pname }}</el-tag>
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
              close-transition>{{scope.row.ownerTeam}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="tag"
          label="负责人"
          filter-placement="bottom-end">
          <template scope="scope">
            <el-tag
              type="primary"
              close-transition>{{scope.row.ownerName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          label="备注">
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button
              size="small"
              :disabled="userInfo.name !== scope.row.ownerName"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="small"
              type="danger"
              :disabled="userInfo.name !== scope.row.ownerName"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button
            size="small"
            type="danger"
            @click="handleDetail(scope.$index, scope.row)">查看汇报记录</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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

  export default {
    name: '',
    components: { },
    props: {},
    data() {
      return {
        list: [],
        pages: {
          total: 0,
          limit: 0,
          curPage: 1
        }
      };
    },
    computed: {
      userInfo() {
        return this.$store.state.currentUserInfo;
      }
    },
    mounted() {
      this.getProjectList(this.$route.query.page);
    },
    methods: {
      handleEdit() {

      },
      handleDelete() {

      },
      getProjectList(page) {
        this.$api.project.list.request({ page, type: 0 }).then(({ data }) => {
          this.list = data.projects;
          this.pages = data.pages;
        });
      },
      handleDetail(index, row) {
        this.$router.push(`/project/detail?pid=${row.pid}`);
      },
      handleCurrentChange(val) {
        this.getUserList(val);
      }
    }
  };
</script>
<style lang="less" type="text/less">
  .home-wrapper{
    height: 100%;
    .menu{
      height: 100%;
    }
  }
</style>
