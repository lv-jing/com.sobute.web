<template>
  <div>
    <el-divider content-position="left">修改个人信息</el-divider>
    <form-create v-model="addEditFormModel" :rule="addEidtFormRule" :option="addEditOption"></form-create>
  </div>
</template>

<script>
/* eslint-disable */
import Cookies from "js-cookie";
import { getUserDetails, getUpdateSelfInfo } from "@/service/user";
import { addFormRule } from "./rules";
import { downloadUrl } from "@/service/common";
export default {
  data() {
    return {
      downloadUrl: downloadUrl,
      addEditFormModel: {},
      addEidtFormRule: addFormRule,
      addEditOption: {
        //表单提交事件
        onSubmit: formData => {
          //按钮进入提交状态
          this.getUpdateSelfInfo({ ...this.profile, ...formData });
        },
        global: {
          upload: {
            props: {
              onSuccess: (res, file) => {
                const { guid, fileUrl } = res.data;
                file.url = this.downloadUrl + res.data.fileUrl;
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
            offset: 4
          }
        },
        resetBtn: false
      },
      profile: {}
    };
  },
  created() {
    this.getUserDetails();
  },
  mounted() {},
  methods: {
    async getUserDetails() {
      const { guid } = Cookies.getJSON("userInfo");
      const { code, data } = await getUserDetails({ guid });
      this.$nextTick(() => {
        console.log(data)
        this.addEditFormModel.setValue(data);
        this.profile = data;
      });
    },
    async getUpdateSelfInfo(params) {
      const guid = params.guid;
      delete params["guid"];
      const { code, data } = await getUpdateSelfInfo({
        guid,
        params: params,
        bizType: "用户头像", //业务分类
        bizTypeCode: "2013100" //业务类型编码
      });
      if (code === 1) {
        this.$message({
          type: "success",
          message: "修改成功"
        });
        Cookies.set("userInfo", { guid, ...params });
        this.$store.dispatch("setUserInfo", { guid, ...params });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>