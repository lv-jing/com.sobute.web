<template>
  <div class="common-auditing">
    <form-create
      v-model="auditingFormModel"
      :rule="auditingFormRule"
      :option="auditingOption"
    ></form-create>

     <common-upload
        :is-replenish="true"
        v-on:get-file-list="getFileList"
        :upload-params="uploadCode[$route.query.bizType]"
      ></common-upload>
  </div>
</template>

<script>
/*eslint-disable*/
import { updateAoorove } from "@/service/common";
import commonUpload from "@/components/CommonUpload";
import { auditingFormRule } from './rules'
import { uploadCode } from "@/utils/uploadCode";
export default {
  name: "commonFooter",
  components: {
    commonUpload
  },
  data() {
    return {
      auditingFormModel: {},
      auditingFormRule: auditingFormRule,
      auditingOption: {
       form:{
          labelPosition:"top"
       }
      },
      remarks: "",
      score: "",
      loadingOk: false,
      loadingClose: false,
      dialogUploadVisible: false,
      attachedList: [],
      uploadCode
    };
  },
  props: {
    // 提交
    handleSubmit: Function,
    // 保存
    handleSave: Function,
    // 提交按钮文案  针对于成果入库文案
    butTitle: {
      type: String,
      default: () => "提交"
    },
    // 分数默认隐藏
    scoreShow: {
      type: Boolean,
      default: () => false
    },
    // 提交loading
    loadingSubmit: {
      type: Boolean,
      default: () => false
    },
    // 保存loading
    loadingSave: {
      type: Boolean,
      default: () => false
    }
  },
  created() {
    if (this.$route.query.type === "auditing") {
      this.$store.dispatch("setHeight", 0);
    } else {
      this.$store.dispatch("setHeight", 160);
    }
  },
  methods: {
    /**
     * 保存上传附件
     */
    saveUploadFile() {
      if (this.attachedList.length === 0) {
        this.$message.error("请上传附件后进行保存!");
        return;
      } else {
        this.dialogUploadVisible = false;
      }
    },
    /**
     * 文件上传
     */
    getFileList(list) {
      this.attachedList = list;
    },
    /**
     * 上传附件
     */
    handleClickUpload() {
      this.dialogUploadVisible = true;
    },
    handleGoBack() {
      this.$router.push({ name: this.$route.name });
    },
    /**
     *  拒绝
     */
    handleRefuse() {
      if (this.remarks) {
        this.updateAoorove(this.getParams(0));
      } else {
        this.$message({
          type: "error",
          message: "审批意见必填"
        });
      }
    },
    /**
     *  同意
     */
    handleOk() {
      if (this.remarks) {
        this.loadingOk = true;
        this.updateAoorove(this.getParams(1));
      } else {
        this.$message({
          type: "error",
          message: "审批意见必填"
        });
      }
    },
    getParams(val) {
      let route = this.$route.query;
      return {
        remarks: this.remarks,
        score: this.score,
        result: val,
        taskId: route.taskId,
        bizType: route.bizType,
        bizId: route.id,
        attachedList: this.attachedList
      };
    },
    async updateAoorove(params) {
      const { code, data } = await updateAoorove(params);
      if (code === 1) {
        this.loadingOk = false;
        this.$router.go(-1);
        this.$message({
          type: "success",
          message: " 操作成功"
        });
      }
    }
  }
};
</script>

<style lang="scss">
.common-auditing {
  width: 92%;
  padding: 12px 2% 12px 6%;
  background: $color-white;
  box-shadow: 0 -4px 8px 0 rgba(0, 0, 0, 0.1);
}
</style>