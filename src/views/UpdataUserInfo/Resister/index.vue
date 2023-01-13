<template>
  <div>
    <el-divider content-position="left">注册个人信息</el-divider>
    <form-create v-model="addEditFormModel" :rule="addEidtFormRule" :option="addEditOption"></form-create>
  </div>
</template>

<script>
/* eslint-disable */
import { getUserIdCardInfo, userRegister } from "@/service/user";
import { addFormRule } from "./rules";
import { downloadUrl} from "@/service/common";
export default {
  data() {
    return {
      downloadUrl:downloadUrl,
      profile: {},
      addEditFormModel: {},
      addEidtFormRule: addFormRule(this),
      addEditOption: {
        //表单提交事件
        onSubmit: formData => {
          //按钮进入提交状态
          this.userRegister(formData);
        },
        global: {
          upload: {
            props: {
              onSuccess: (res, file) => {
                const { guid, fileUrl } = res.data;
                file.url = this.downloadUrl + fileUrl;
                this.profile.avatarUriGuid = guid;
                this.profile.avatarUri = fileUrl;
              },
              onError: function(r) {
                alert("上传失败");
              }
            }
          }
        },
        submitBtn: {
          icon: "",
          col: {
            span: 18,
            offset: 3
          }
        },
        resetBtn: false
      }
    };
  },
  methods: {
    /**
     * 注册
     */
    async userRegister(params) {
      const { code, data } = await userRegister({
        ...params,
        ...this.profile,
        bizType: "用户头像", //业务分类
        bizTypeCode: "2013100" //业务类型编码
      });
      if (code === 1) {
        this.$message({
          type: "success",
          message: "注册成功,系统正在为您跳转..."
        });
        //   const loading = this.$loading({
        //   lock: true,
        //   text: '',
        //   spinner: 'el-icon-loading',
        //   background: 'rgba(0, 0, 0, 0.2)'
        // });
        setTimeout(() => {
          this.$router.push({ name: "login" });
          // loading.close()
        }, 2000);
      }
    },
    validatePass(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        const checkPassword = this.addEditFormModel.getValue("checkPassword");
        if (checkPassword !== "") {
          this.addEditFormModel.validateField("checkPassword");
        }
        callback();
      }
    },
    validatePass2(rule, value, callback) {
      const password = this.addEditFormModel.getValue("password");
      if (value === "") {
        callback(new Error("请确认密码"));
      } else if (value !== password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    },
    /**
     * 检查身份证是否正确
     */
    async idCardValidator(rule, value, callback) {
      if (!value || value.length < 15) {
        return callback(new Error("请输入身份证号码。"));
      } else {
        const { code, data } = await getUserIdCardInfo({ idCard: value });
        if (!data) {
          return callback(new Error("您的身份证号码错误。"));
        } else {
          return callback();
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>