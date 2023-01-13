<template>
  <div >
    <el-steps :active="step" simple>
      <el-step title="用户信息" description icon="el-icon-user"></el-step>
      <el-step title="重置密码" description icon="el-icon-unlock"></el-step>
    </el-steps>

    <div class="change-step">
      <el-form :model="ruleForm" :rules="rules" label-width="100px" ref="ruleForm">
        <el-row v-if="step===1">
          <el-form-item label="用户名" prop="username">
            <el-col>
              <el-input v-model="ruleForm.username" placeholder="请输入用户名">
                <i slot="prefix" class="ml5 el-input__icon sbt_yonghuming"></i>
              </el-input>
            </el-col>
          </el-form-item>

          <!-- <el-form-item label="验证码" prop="inputCode">
            <el-col :span="18">
              <el-input v-model="ruleForm.inputCode" placeholder="请输入验证码">
                <i slot="prefix" class="ml5 el-input__icon sbt_yanzhengma"></i>
              </el-input>
            </el-col>
            <el-col :span="4">
              <img :src="codeImg" alt srcset height="40" class="ml10" @click="getVerifyCode" />
            </el-col>
          </el-form-item> -->
          <el-form-item label>
            <el-button type="primary" class="w-100" @click="getUserEmailInfo('ruleForm')">下一步</el-button>
          </el-form-item>
        </el-row>

        <el-row v-else>
          <el-form-item label="邮箱地址" prop="email">
            <el-col>
              <el-input v-model="ruleForm.email" placeholder disabled>
                <i slot="prefix" class="ml5 el-input__icon sbt_yonghuming"></i>
              </el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="邮箱验证码" prop="emailCode">
            <el-col :span="15">
              <el-input v-model="ruleForm.emailCode" placeholder="请输入验证码">
                <i slot="prefix" class="ml5 el-input__icon sbt_yanzhengma"></i>
              </el-input>
            </el-col>
            <el-col :span="8">
              <el-button
                class="ml10 w-100"
                :disabled="disabled"
                @click="sendEmailCode"
              >{{code_text}}</el-button>
            </el-col>
          </el-form-item>

          <el-form-item label="新密码" prop="newPassword">
            <el-col>
              <el-input v-model="ruleForm.newPassword" type="password" placeholder="请输入新密码">
                <i slot="prefix" class="ml5 el-input__icon sbt_mima"></i>
              </el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="确认密码" prop="checkPassword">
            <el-col>
              <el-input v-model="ruleForm.checkPassword" type="password" placeholder="请确认密码">
                <i slot="prefix" class="ml5 el-input__icon sbt_mima"></i>
              </el-input>
            </el-col>
          </el-form-item>

          <el-form-item label>
            <el-button type="primary" class="w-100" @click="getUserResetPassword('ruleForm')">确定</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import {
  getVerifyCode,
  getUserEmailInfo,
  getUserSendEmail,
  getUserResetPassword
} from "@/service/user";
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
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        flag: "",
        inputCode: "",
        emailCode: "",
        newPassword: "",
        email: "",
        checkPassword: ""
      },
      time: 10,
      disabled: false,
      step: 1,
      code_text: "获取验证码",
      codeImg: "",
      rules: {
        newPassword: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        checkPassword: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        emailCode: [
          { required: true, message: "验证码不能为空",trigger: "blur" }
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        inputCode: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    // this.getVerifyCode();
  },
  methods: {
    /**
     * 获取验证码
     */
    async getVerifyCode() {
      const { code, data } = await getVerifyCode({ flag: this.ruleForm.flag });
      if (code === 1) {
        this.$set(this.ruleForm, "flag", data.flag);
        this.codeImg = data.img;
      }
    },
    /**
     * 获取邮箱
     */
    getUserEmailInfo(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const { flag, inputCode, username } = this.ruleForm;
          const { code, data } = await getUserEmailInfo({
            flag,
            inputCode,
            username
          });
          if (code === 1) {
            this.ruleForm.email = data;
            this.step = 2;
          }else{
              // this.getVerifyCode();
          }
        
        }
      });
    },
    async sendEmailCode() {
      const { code, data } = await getUserSendEmail({
        emailAddress: this.ruleForm.email
      });
      if (code === 1) {
        this.$message({
          type: "success",
          message: "验证码已下发至您邮箱，请注意查收"
        });
        this.downTimeCode();
      }
    },
    getUserResetPassword(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const { emailCode, newPassword, username } = this.ruleForm;
          const { code, data } = await getUserResetPassword({
            emailCode,
            newPassword,
            username
          });
          if (code === 1) {
            this.$confirm("密码重置成功，是否进行登录?", "系统提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              lockScroll: false,
              type: "warning"
            })
              .then(() => {
                this.$router.push({ name: "login" });
              })
              .catch(() => {});
          }
        }
      });
    },
    /**
     * 倒计时
     */
    downTimeCode() {
      this.timer = setTimeout(() => {
        if (this.time === 0) {
          clearTimeout(this.timer);
          (this.code_text = "重新发送"),
            (this.time = 60),
            (this.disabled = false);
        } else {
          let tempTime = this.time;
          tempTime--;
          (this.disabled = true),
            (this.time = tempTime),
            (this.code_text = tempTime + "s"),
            this.downTimeCode();
        }
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.sobute-password {
  width: 80%;
  margin: 0 auto;
}
.change-step {
  padding: 50px 0;

}
</style>