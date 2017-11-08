<template>
  <div class="user-add-wrapper">
    <h3>{{edit ? '编辑用户' : '新增用户'}}</h3>
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
      <template v-if="(editPass && edit) || !edit">
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="passre">
          <el-input type="password" v-model="ruleForm.passre" auto-complete="off"></el-input>
        </el-form-item>
      </template>
      <el-form-item label="重置密码" prop="editPass" v-if="edit">
        <el-switch on-text="" off-text="" v-model="editPass"></el-switch>
      </el-form-item>
      <el-form-item
        prop="email"
        label="邮箱"
      >
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item
        prop="phone"
        label="手机号"
      >
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="权限" prop="type">
        <el-checkbox-group v-model="ruleForm.admin">
          <el-checkbox v-for="item in roles" :key="item.rname" :label="item.rname">{{item.rname}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')" v-if="!edit">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/babel">
import Add from './add';

export default Add;
</script>
<style lang="less" type="text/less">
</style>
