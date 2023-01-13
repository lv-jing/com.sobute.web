<template>
  <div>
    <el-divider content-position="left">修改密码</el-divider>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="mt20"
    >
      <el-form-item label="原始密码" prop="oldPassword">
        <el-input v-model="ruleForm.oldPassword" type="password" placeholder="请输入原始密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
          placeholder="请输入新密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPassword">
        <el-input
          type="password"
          v-model="ruleForm.checkPassword"
          autocomplete="off"
          placeholder="请确认密码"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :offset="3" :span="16">
        <el-button type="primary" class="w-100" @click="submitForm('ruleForm')">确 定</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable */
import Cookies from "js-cookie";
import { updataUserPassword } from "@/service/user";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPassword !== "") {
          this.$refs.ruleForm.validateField("checkPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请确认密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        oldPassword: "",
        password: "",
        checkPassword: ""
      },
      breadcrumbList: [],
      rules: {
        oldPassword: [
          { required: true, message: "请输入原始密码", trigger: "blur" }
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        checkPassword: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const { guid } = Cookies.getJSON("userInfo");
          const params = {
            oldPassword: this.ruleForm.oldPassword,
            password: this.ruleForm.password,
            guid
          };
          this.updataUserPassword(params, formName);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async updataUserPassword(params, formName) {
      const { code } = await updataUserPassword({ ...params });
      if (code === 1) {
        Cookies.remove("token");
        Cookies.remove("userInfo");
        Cookies.remove("currentGuid");
        this.$store.dispatch("setUserInfo", null);
        this.$router.push({ name: "login" });
        this.$message({
          type: "success",
          message: "修改成功,请重新登录"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>