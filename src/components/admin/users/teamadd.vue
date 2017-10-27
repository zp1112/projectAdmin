<template>
  <div class="user-add-wrapper">
    <h3>新建部门</h3>
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="添加成员" prop="region">
        <el-select v-model="ruleForm.uid" filterable multiple placeholder="请选择成员">
          <el-option v-for="item in userList"
          :key="item.uid"
          :label="item.name"
          :value="item.uid"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/babel">
import Add from './teamadd';

export default Add;
</script>
<style lang="less" type="text/less">
</style>
