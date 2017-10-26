/*
 * @Author: candy
 * @Date: 2017-10-26 14:49:47
 * @Last Modified by: candy
 * @Last Modified time: 2017-10-26 15:48:35
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
      ruleForm: {
        name: '',
        tid: '',
        password: '',
        passre: '',
        admin: []
      },
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
        ]
      }
    };
  },
  mounted() {
    this.$api.admin.team.request().then((res) => {
      this.teamList = res.data;
    });
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          console.log(this.ruleForm);
          const result = await this.$api.users.reg.request({ userInfo: this.ruleForm });
          console.log(result);
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
