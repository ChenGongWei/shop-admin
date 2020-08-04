<template>
  <!-- 登录页 -->
  <div class="login_bg">
    <div class="form">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <h2>登录</h2>
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            placeholder="请输入密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="submit" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      console.log(this.$refs[formName].$el[0].value);
      console.log(this.$refs[formName].$el[1].value);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.$router.replace("/index");

          // params1：提交路径
          // params2：参数
          this.http
            .post("/api/userlogin", this.ruleForm)
            .then((res) => {
              console.log(res);
              if (res.code == 200) {
                sessionStorage.setItem("list", JSON.stringify(res.list));
                sessionStorage.setItem("token", res.token);
                this.$router.replace("/index");
              } else {
                this.$message("请输入正确的用户名和密码");
              }
            })
            .catch((err) => {
              this.$message(err.msg);
            });
        }
      });
      // this.$router.replace("/index");
    },
  },
};
</script>

<style scoped>
.login_bg {
  width: 100%;
  height: 100%;
  background: -webkit-linear-gradient(left, #563443, #413a53, #2f3d60);
}
h2 {
  text-align: center;
  line-height: 60px;
  color: #efefef;
}
.demo-ruleForm {
  width: 300px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -150px 0 0 -150px;
}
.submit {
  width: 300px;
}
</style>