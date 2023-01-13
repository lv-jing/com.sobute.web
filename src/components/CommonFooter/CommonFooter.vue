<template>
  <div class="common-footer">
    <div style="margin-left: 12%;width: 1000px;display: flex;align-items: center;">
      <slot name="left" v-if="$route.query.type==='auditing'&& $route.query.status!=='2005105'">
        <span style="margin-right: 5px;">审批意见</span>
        <el-input
          style="width: 50%"
          type="textarea"
          show-word-limit
          :maxlength="1330"
          :autosize="{ minRows: 5, maxRows: 5}"
          v-model="remarks"
          placeholder="请输入审批意见"
        ></el-input>
        <el-input
          v-if="scoreShow"
          type="number"
          style="width: 15%;margin-left: 5px"
          v-model="score"
          placeholder="请输入考核系数"
        ></el-input>
        <el-button
          class="ml20"
          type="success"
          icon="el-icon-upload"
          :loading="loadingClose||loadingOk"
          @click="handleClickUpload"
        >审批附件</el-button>
      </slot>
    </div>
    <div class="button-content">
      <slot name="right" v-if="$route.query.type==='add'||$route.query.type==='edit'">
        <el-button
          v-if="$route.query.statusCode!=='2005104'&&handleSubmit"
          type="primary"
          size="small"
          icon="iconfont sbt_elected"
          :loading="loadingSubmit || loadingSave"
          @click="handlerButton('submit')"
        >{{butTitle}}</el-button>
        <el-button
          type="success"
          size="small"
          icon="iconfont sbt_save"
          :loading="loadingSave || loadingSubmit"
          @click="handlerButton('save')"
        >保存</el-button>
      </slot>
      <slot name="right" v-if="$route.query.type==='auditing'&& $route.query.codeType!=='2005105'">
        <el-button
          type="danger"
          icon="el-icon-close"
          :loading="loadingClose||loadingOk"
          @click="handleRefuse"
        >拒绝</el-button>
        <el-button
          type="warning"
          icon="el-icon-paperclip"
          :loading="loadingClose||loadingOk"
          @click="handleTrunAround"
        >转发</el-button>
        <el-button
          type="primary"
          icon="el-icon-check"
          :loading="loadingOk||loadingClose"
          @click="handleOk"
        >同意</el-button>
      </slot>
      <el-button size="small" icon="el-icon-refresh-left" @click="handleGoBack">返回</el-button>
    </div>

    <el-dialog
      :show-close="false"
      :close-on-click-modal="false"
      title="上传附件"
      width="40%"
      :modal="false"
      :lock-scroll="false"
      :visible.sync="dialogUploadVisible"
      :before-close="dialogTrunAuditing"
    >
      <common-upload
        :is-replenish="true"
        v-on:get-file-list="getFileList"
        :upload-params="uploadCode[$route.query.bizType]"
      ></common-upload>
      <div slot="footer">
        <el-button type="primary" @click="saveUploadFile">确定</el-button>
        <el-button @click="dialogUploadVisible=false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :show-close="false"
      :close-on-click-modal="false"
      title="转发"
      width="40%"
      :modal="false"
      :lock-scroll="false"
      :before-close="dialogTrunAuditing"
      :visible.sync="dialogAuditingVisible"
    >
      <form-create v-model="auditingFormModel" :rule="auditingFormRule" :option="auditingOption"></form-create>
      <div slot="footer">
        <el-button type="primary" @click="saveTrunAuditing">确定</el-button>
        <el-button @click="dialogTrunAuditing">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/*eslint-disable*/
import { updateAoorove } from "@/service/common";
import commonUpload from "@/components/CommonUpload";
import { auditingFormRule } from "./rules";
import { uploadCode } from "@/utils/uploadCode";
import { decomposeStringToJson } from "@/utils/tools";

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
        form: {
          // labelPosition: "top"
        },
        submitBtn: false,
        resetBtn: false
      },
      remarks: "",
      score: "",
      loadingOk: false,
      loadingClose: false,
      dialogUploadVisible: false,
      dialogAuditingVisible: false,
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
      this.$store.dispatch("setHeight", 245);
    } else {
      this.$store.dispatch("setHeight", 160);
    }
  },
  methods: {
    handlerButton(type) {
      switch (type) {
        case "submit":
        this.handleSubmit()
          break;
        case "save":
          this.$store.dispatch('setHandlerSave',{
            type:'save',
            times:Math.random()
          })
          this.handleSave()
          break;
      }
    },
    handleTrunAround() {
      if (!this.remarks) {
        this.$message({
          type: "error",
          message: "审批意见必填"
        });
        return;
      }
      this.dialogAuditingVisible = true;
    },

    /**
     * 确定转发
     */
    saveTrunAuditing() {
      this.auditingFormModel.submit(formData => {
        let addApproveName = decomposeStringToJson(formData.addApproveName, [
          "addApproveName",
          "addApproveNumber"
        ]);
        this.handleOk({ ...formData, ...addApproveName });
      });
    },
    /**
     * 关闭
     */
    dialogTrunAuditing() {
      this.$nextTick(() => {
        this.dialogAuditingVisible && this.auditingFormModel.resetFields();
        this.dialogAuditingVisible = false;
        this.dialogUploadVisible = false;
        this.attachedList = [];
      });
    },

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
    handleOk(params = {}) {
      if (this.remarks) {
        this.loadingOk = true;
        let p = this.getParams(1);
        this.updateAoorove({ ...p, ...params });
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
        approveIndex: route.approveIndex,
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

        this.dialogTrunAuditing();
      }
    }
  }
};
</script>

<style lang="scss">
.common-footer {
  display: flex;
  justify-content: space-between;
  width: 96%;
  position: fixed;
  bottom: 0;
  left: 0;
  background: $color-white;
  align-items: center;
  padding: 12px 2%;
  background: $color-white;
  box-shadow: 0 -4px 8px 0 rgba(0, 0, 0, 0.1);
  z-index: 10;
}
.button-content {
  display: flex;
}
</style>