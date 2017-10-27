/*
 * @Author: candy
 * @Date: 2017-10-26 14:49:47
 * @Last Modified by: candy
 * @Last Modified time: 2017-10-27 14:16:22
 */

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      edit: false,
      ruleForm: {
        name: '',
        tid: '',
        password: '',
        passre: '',
        admin: [],
        email: '',
        phone: ''
      },
      editPass: false,
      teamList: [],
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        tid: [
          { required: true, message: '请选择所在部门', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
        passre: [
          { required: true, message: '请再次输入密码', trigger: 'change', validator: validatePass }
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
        ]
      }
    };
  },
  watch: {
    editPass(val) {
      if (!val) {
        this.ruleForm.passre = '';
        this.ruleForm.password = '';
      }
    }
  },
  mounted() {
    if (this.$route.query.uid) {
      this.edit = true;
      this.$api.users.edit.request({ uid: this.$route.query.uid }).then(({ data }) => {
        if (!data.status) {
          this.$message({
            message: data.msg,
            type: 'warning'
          });
        } else {
          this.ruleForm = data.data;
          this.ruleForm.admin = this.ruleForm.admin.split(',');
        }
      });
    }
    this.$api.admin.team.request().then((res) => {
      this.teamList = res.data;
    });
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          console.log(this.ruleForm);
          if (!this.edit) {
            const result = await this.$api.users.reg.request({ userInfo: this.ruleForm });
            if (result.status) {
              this.$router.push('/users/list');
            }
          } else {
            const { passre, password, admin, ...rest } = this.ruleForm;
            const ruleForm = rest;
            if (this.editPass) {
              ruleForm.password = password;
            }
            ruleForm.admin = admin.join(',');
            const result = await this.$api.users.save.request({ userInfo: ruleForm });
            if (result.status) {
              if (JSON.parse(localStorage.getItem('userInfo')).uid === this.ruleForm.uid) {
                this.$message({
                  message: '请重新登录获取最新信息！',
                  type: 'warning'
                });
                setTimeout(() => {
                  this.$router.push('/logout');
                }, 2000);
              } else {
                this.$router.push('/users/list');
              }
            }
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
