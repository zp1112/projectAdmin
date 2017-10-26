<template>
  <div class="user-add-wrapper">
    <h3>新增用户</h3>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="归属部门" prop="region">
        <el-select v-model="ruleForm.tid" filterable placeholder="请选择所属部门">
          <el-option v-for="item in teamList"
          :key="item.tid"
          :label="item.tname"
          :value="item.tid"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="重复密码" prop="passre">
        <el-input type="password" v-model="ruleForm.passre" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="权限" prop="type">
        <el-checkbox-group v-model="ruleForm.admin">
          <el-checkbox label="root" name="type">管理员</el-checkbox>
          <el-checkbox label="member" name="type">成员</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/babel">
import Add from './add.js';
export default Add;
</script>
<style lang="less" type="text/less">
</style>
