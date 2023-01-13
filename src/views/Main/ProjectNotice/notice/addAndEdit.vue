<template>
  <el-card class="box-card" shadow="never">
    <div slot="header" class="clearfix flex flex-center-between">
      <span>发布公告{{$titleObj[$route.query.type]}}</span>
    </div>

    <form-create
      v-model="addEditFormModel"
      :rule="addEidtFormRule"
      :option="addEditOption"
      @send-change="sendChangePerson"
    ></form-create>

<div  class="common-footer ">
  <div style="width:30%;" class="flex">


        <el-button type="primary" @click="functionNotice('publish')" class="w-100">发布</el-button>
        <el-button type="success" @click="functionNotice('preview')" class="w-100">预览</el-button>
        <el-button class="w-100" @click="$router.go(-1)">返回</el-button>
      </div>

</div>
  

    <el-dialog title="预览" :visible.sync="previewShow" :fullscreen="true" :lock-scroll="false">
      <h3 class="tc">{{details.title}}</h3>
      <el-divider content-position="left"></el-divider>
      <div class="flex flex-center p10" style="background:#f3f3f3">
        <span>创建人:{{details.createdByName}}</span>
        <span class="ml20">创建时间:{{details.creationDate}}</span>
      </div>
      <div class="mt10 fs12 notice-summary">【摘要】: {{details.summary}}</div>
      <div class="mt20 ql-container ql-snow ql-editor" style="border:0" v-html="details.content"></div>
    </el-dialog>
  </el-card>
</template>

<script>
/* eslint-disable */
import { addFormRule } from "./rules";
import { mapGetters } from "vuex";
import { decomposeStringToJson } from "@/utils/tools";
import preview from "./preview";
import Cookies from "js-cookie";
import { downloadUrl, allNarmalInterface } from "@/service/common";
import {
  // addProjectDeclaration,
  // getProjectDeclarationDetails,
  // updateProjectDeclaration

  createProjectItem,
  updateProjectItem,
  getProjectDetails
} from "@/service/project";
import { mapState } from "vuex";
export default {
  props: ["userProfile"],
  data() {
    return {
      previewShow: false,
      addEditFormModel: {},
      addEidtFormRule: addFormRule,
      addEditOption: {
        global: {
          upload: {
            props: {
              onSuccess: (res, file) => {
                const { guid, fileUrl } = res.data;
                file.url = downloadUrl + res.data.fileUrl;
                this.details.thumbnailGuid = guid;
              },
              onError: function(r) {
                alert("上传失败");
              }
            }
          }
        },
        resetBtn: false,
        submitBtn: false
      },

      uploadParams: {
        bizType: "公告封面", //业务分类
        bizTypeCode: "2013130" //业务类型编码
      },
      details: {}
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.common.userInfo
    })
  },
  mounted() {
    const { id, type } = this.$route.query;
this.$store.dispatch("setHeight", 160);
    //详细
    if (["edit", "view", "auditing"].includes(type) && id) {
      this.getProjectDeclarationDetails();
    } else {
      this.initData();
    }
  },
  methods: {
    /**
     * 发送对象展示
     */
    sendChangePerson(e) {
      console.log(e);
    },
    /**
     * 改变下拉框，展示界面
     */

    /**
     * 初始化表单数据
     */
    initData() {
      const formData = this.addEditFormModel.formData();
      for (let item in formData) {
        if (Array.isArray(formData[item])) {
          formData[item] = [];
        } else {
          formData[item] = "";
        }
      }
      formData.type = 1;
      formData.status = 1;
      this.addEditFormModel.setValue(formData);
    },
    functionNotice(it) {
      this.addEditFormModel.submit(formData => {
        const { id, type } = this.$route.query;
        const params = { ...this.details, ...formData, };
        if (it === "publish") {
          if (["view", "edit"].includes(type)&&id) {
            this.editProjectDeclaration(params);
          } else {
            this.saveAndSubmitData(params);
          }
        } else {
          this.previewNotice(params);
        }
      });
    },
    /**
     * 提交和保存公共方法
     */
    async saveAndSubmitData(params) {
      const {code, data } = await allNarmalInterface(
        { sysNotice: params },
        "service/base/sysNotice"
      );
      
      if(code===1){
       this.$message({
          type: "success",
          message: "修改成功"
        });
      }
    },
    async getProjectDeclarationDetails() {
      const { id } = this.$route.query;
      const {code, data } = await allNarmalInterface(
        {},
        `service/base/sysNotice/details/${id}`,
        "get"
      );
      if (code===1&&data!==null) {
        this.details = data.sysNotice;
        this.$nextTick(() => {
          this.addEditFormModel.setValue(data.sysNotice);
        });
      }
    },
    /**
     * 预览
     */
    async previewNotice(formData) {
      this.previewShow = true;
      this.$nextTick(() => {
        this.details = formData;
      });
    },
    /**
     * 申报新增
     */
    async addProjectDeclaration(apply) {},

    /**
     * 项目编辑
     */
    async editProjectDeclaration(params) {
        const { code,data } = await allNarmalInterface(
        { sysNotice: params },
        `service/base/sysNotice/${params.guid}`,
        'put'
      );

      if(code===1){
       this.$message({
          type: "success",
          message: "修改成功"
        });
      }


    }
  },
  components: {
    preview
  }
};
</script>

<style lang="scss" scope>

 .common-footer {
    display: flex;
    justify-content: flex-end;
    width: 96%;
    position: fixed;
    bottom: 0;
    left: 0;
    background: $color-white;
    align-items: center;
    padding: 12px 2%;
    background: $color-white;
    box-shadow: 0 -4px 8px 0 rgba(0, 0, 0, 0.10);
    z-index: 10;
  }
</style>