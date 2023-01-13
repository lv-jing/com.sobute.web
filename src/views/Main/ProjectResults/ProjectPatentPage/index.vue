<template>
  <el-card class="box-card" shadow="never">
    <div slot="header" class="clearfix flex flex-center-between">
      <span>专利{{$titleObj[$route.query.type]}}</span>
    </div>
    <el-tabs type="card">
      <el-tab-pane label="基本信息">
        <form-create v-model="addEditFormModel" :rule="addEidtFormRule" :option="addEditOption"></form-create>
        <common-required-upload
          :uploadShow="true"
          :uploadParams="uploadParamsOne"
          @getUploadTable="getUploadTable"
          :attachedTable="attachedTable"
        />
        <common-upload
          v-on:get-file-list="getFileList"
          :upload-params="uploadParams"
          :show-attached-list="showAttachedList"
        />
      </el-tab-pane>
      <el-tab-pane label="审批列表">
        <div class="user-form-table">
          <common-auditing-view
            v-on:handle-selection-change="handleSelectionChange"
            :select-rows="selectRows"
            :process-param="processParam"
            :status-code="rpmRtAchievement.statusCode||'2005101'"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
    <common-footer
      :handleSubmit="handleSubmit"
      :handleSave="handleSave"
      :butTitle="butTitle"
      :loadingSubmit="loadingSubmit"
      :loadingSave="loadingSave"
    />
  </el-card>
</template>

<script>
/* eslint-disable */
import { addFormRule } from "./rules";
import CommonUpload from "@/components/CommonUpload"; // 上传
import EidtTable from "@/components/EidtTable";
import {
  postAddPatent,
  getPatentDetail,
  updatePatent
} from "@/service/results";
import {
  decomposeStringToJson,
  getStatus,
  changeMoreListWord
} from "@/utils/tools";
import Cookies from "js-cookie";
import CommonRequiredUpload from "@/components/CommonRequiredUpload";
import { commonRule } from "../commonRule";

export default {
  props: ["userInfo"],
  data() {
    return {
      loadingSubmit: false,
      loadingSave: false,
      butTitle: "",
      addEditFormModel: {},
      addEidtFormRule: [],
      addEditOption: {
        resetBtn: false,
        submitBtn: false,
        form: {
          size: "small"
        }
      },
      type: {
        type: "专利", // 项目类型
        typeCode: "2014111" // 项目类型code
      },
      uploadParams: {
        bizType: "专利", //上传项目类型
        bizTypeCode: "2013121" //附件类型编码
      },
      uploadParamsOne: {
        bizType: "新建阶段", //业务分类
        bizTypeCode: "2102800", //业务类型编码
        bizSubType: "",
        bizSubTypeCode: "" //业务类型编码
      },
      uploadTableData: [],
      attachedTable: [],
      processParam: {}, // 审批记录请求参数
      selectRows: [], // 审批列表回填
      approve: [], // 审批列表列表
      showAttachedList: [], // 上传列表回填
      attachedList: [], // 上传列表
      rpmRtAchievement: {} // 基本信息
    };
  },
  components: {
    CommonUpload,
    EidtTable,
    CommonRequiredUpload
  },
  created() {
    Cookies.set("approvalType", "OUTER_ACHIEVEMENT_APPROVAL");
  },
  mounted() {
    this.init();
  },
  methods: {
    /**
     * 获取必传附件表格数据
     */
    getUploadTable(data) {
      this.uploadTableData = data;
    },
    /**
     *  初始化页面
     */
    init() {
      this.addEditFormModel.reload([
        ...addFormRule(this.userInfo.type),
        ...commonRule(this.userInfo.type, 110)
      ]);
      let { statusCode } = this.rpmRtAchievement;

      let { type } = this.$route.query;
      if (statusCode === "2005104" || statusCode === "2005107") {
        this.butTitle = "入库";
      } else {
        this.butTitle = "提交";
      }
      if (type === "view" || type === "auditing") {
        this.getProjectDetail();
        this.addEditFormModel.disabled(true);
      } else {
        if (type === "edit") {
          this.getProjectDetail();
        } else {
          this.initData();
        }
        this.addEditFormModel.disabled(false);
        this.addEditFormModel.disabled(true, ["documentNumber"]);
      }
    },
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
      this.$nextTick(() => {
        this.addEditFormModel.setValue(formData);
      });
    },
    /**
     *  查询详情
     */
    async getProjectDetail() {
      const { id, type } = this.$route.query;
      const { code, data } = await getPatentDetail({
        id: this.$route.query.id
      });
      if (code === 1) {
        this.$nextTick(() => {
          let rpmRtAchievement = data.rpmRtAchievement || {};
          if (
            type === "view" ||
            type === "auditing" ||
            rpmRtAchievement.statusCode === "2005104"
          ) {
            this.processParam = {
              bizId: id
            };
          }

          rpmRtAchievement.employ = rpmRtAchievement.employ
            ? rpmRtAchievement.employ + "⭐" + rpmRtAchievement.employCode
            : "";
          rpmRtAchievement.register = rpmRtAchievement.register
            ? rpmRtAchievement.register + "⭐" + rpmRtAchievement.registerCode
            : "";
          this.rpmRtAchievement = rpmRtAchievement;
          this.addEditFormModel.setValue(rpmRtAchievement);
          this.showAttachedList = data.attachedList || [];
          this.attachedList = data.attachedList || [];
          this.selectRows = data.approve || [];
          this.attachedTable = data.attachedTable || [];
          this.loadingSave = false;
          this.loadingSubmit = false;
        });
      } else {
        this.loadingSave = false;
        this.loadingSubmit = false;
      }
    },
    /**
     * 所以参数
     * @param val 判断提交还是报存
     */
    getParams(val) {
      // const { codeType } = this.$route.query;
      let { statusCode } = this.rpmRtAchievement;
      let rpmRtAchievement = {};

      this.addEditFormModel.submit(formData => {
        if (statusCode === "2005104" || statusCode === "2005107") {
          var status = {
            status:
              val === 1
                ? statusCode === "2005104"
                  ? "已入库"
                  : "已入库"
                : statusCode === "2005104"
                ? "已审批"
                : "已入库",
            statusCode:
              val === 1
                ? statusCode === "2005104"
                  ? "2005107"
                  : "2005107"
                : statusCode === "2005104"
                ? "2005104"
                : "2005107"
          };
        } else {
          var status = {
            status:
              val === 1 ? "提交" : statusCode === "2005105" ? "退回" : "新建",
            statusCode:
              val === 1
                ? "2005102"
                : statusCode === "2005105"
                ? "2005105"
                : "2005101"
          };
        }
        let employ = decomposeStringToJson(formData.employ, [
          "employ",
          "employCode"
        ]);
        let register = decomposeStringToJson(formData.register, [
          "register",
          "registerCode"
        ]);

        let d = changeMoreListWord(formData);

        rpmRtAchievement = {
          ...formData,
          ...status,
          ...this.type,
          ...employ,
          ...register,
          ...d
        };
      });
      let arr = [];
      // 分出必传表格附件
      this.uploadTableData.forEach(item => {
        item.list &&
          item.list.forEach(items => {
            arr.push(items);
          });
      });
      return {
        id: this.$route.query.type === "edit" ? this.$route.query.id : "",
        approve: this.approve,
        attachedList: [...this.attachedList, ...arr],
        rpmRtAchievement,
        attachedTypeCode: this.uploadParams.bizTypeCode
      };
    },
    /**
     * 新增
     * @param params
     * @param num
     * @returns {Promise<void>}
     */
    async postAddProject(params, num) {
      const { code, data } = await postAddPatent(params);
      if (code === 1) {
        if (num === 1) {
          this.$router.push({ name: "results" });
        } else {
          this.$router.push({
            name: "results",
            query: { type: "edit", id: data.id, typeCode: data.typeCode }
          });
          this.showAttachedList = [];
          this.attachedList = [];
          setTimeout(() => {
            this.getProjectDetail();
          }, 500);
        }
        this.$message({
          type: "success",
          message: " 操作成功"
        });
      } else {
        this.loadingSave = false;
        this.loadingSubmit = false;
      }
    },
    /**
     * 修改
     */
    async updateProject(params, num) {
      const { code, data } = await updatePatent(params);
      if (code == 1) {
        this.loadingSave = false;
        this.loadingSubmit = false;
        if (num === 1) {
          this.$router.push({ name: "results" });
        }
        this.$message({
          type: "success",
          message: " 操作成功"
        });
      } else {
        this.loadingSave = false;
        this.loadingSubmit = false;
      }
    },
    /**
     *  提交
     */
    handleSubmit() {
      this.addEditFormModel.validate(valid => {
        if (valid) {
          if (!getStatus(this.uploadTableData)) {
            return;
          }
          this.loadingSubmit = true;
          if (this.$route.query.type == "add") {
            this.postAddProject(this.getParams(1), 1);
          } else {
            this.updateProject(this.getParams(1), 1);
          }
        }
      });
    },
    /**
     *  保存
     */
    handleSave() {
      this.addEditFormModel.validate(valid => {
        if (valid) {
          this.loadingSave = true;
          if (this.$route.query.type == "add") {
            this.postAddProject(this.getParams(2));
          } else {
            this.updateProject(this.getParams(2));
          }
        }
      });
    },
    /**
     * 获取上传列表
     * @param val
     */
    getFileList(list) {
      this.attachedList = list;
    },
    /**
     * 获取审批列表
     * @param val
     */
    handleSelectionChange(val) {
      this.approve = val;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>