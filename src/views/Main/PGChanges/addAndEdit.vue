<template>
  <el-card class="box-card" shadow="never">
    <div slot="header" class="clearfix flex flex-center-between">
      <span>项目变更{{$titleObj[$route.query.type]}}</span>
    </div>
    <el-tabs type="card">
      <el-tab-pane label="基本信息">
        <form-create v-model="addEditFormModel" :rule="addEidtFormRule" :option="addEditOption"></form-create>
        <common-upload
          v-on:get-file-list="getFileList"
          :show-attached-list="showAttachedList"
          :upload-params="uploadParams"
        ></common-upload>
      </el-tab-pane>
      <el-tab-pane label="审批列表">
        <div class="user-form-table">
          <common-auditing-view
            :process-param="processParam"
            :is-checked="$route.query.type==='view'"
            v-on:handle-selection-change="handleSelectionChange"
            :select-rows="selectRows"
             :status-code="changes.statusCode||'2005101'"
          ></common-auditing-view>
        </div>
      </el-tab-pane>
    </el-tabs>
    <common-footer
      :handleSubmit="handleSubmit"
      :handleSave="handleSave"
      :loadingSubmit="loadingSubmit"
      :loadingSave="loadingSave"
    />
  </el-card>
</template>

<script>
/* eslint-disable */
import { addFormRule } from "./rules";
import { mapGetters } from "vuex";
import { decomposeStringToJson } from "@/utils/tools";
import {
  addProjectChanges,
  getProjectChangesDetails,
  updateProjectChanges
} from "@/service/changes";

import commonUpload from "@/components/CommonUpload";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      changes:{},
      loadingSubmit: false,
      loadingSave: false,
      processParam: {},
      show: false,
      approve: [], //审批列表
      tableData: [],
      addEditFormModel: {},
      addEidtFormRule: addFormRule,
      addEditOption: {
        resetBtn: false,
        submitBtn: false,
        form: {
          size: "small"
        }
      },
      selectRows: [],
      uploadParams: {
        bizType: "项目变更", //业务分类
        bizTypeCode: "2013101" //业务类型编码
      },
      attachedList: [], //附件
      showAttachedList: []
    };
  },
  created() {
    Cookies.set("approvalType", "OUTER_CHANGES_APPROVAL");
  },

  mounted() {
    const { id, type } = this.$route.query;

    //详细
    if (["edit", "view", "auditing"].includes(type) && id) {
      this.getProjectChangesDetails({ id, type });
    } else {
      this.initData();
    }
  },
  methods: {
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
      this.addEditFormModel.disabled(false);
      this.addEditFormModel.disabled(true, "documentNumber");
      this.addEditFormModel.setValue(formData);
    },
    /**
     * 获取审批列表人员
     */
    handleSelectionChange(val) {
      this.approve = val;
    },
    /**
     * 获取上传列表
     */
    getFileList(list) {
      this.attachedList = list;
    },
    /**
     * 提交和保存公共方法
     */
    saveAndSubmitData(status,btnStatus) {
      const { id, type } = this.$route.query;
      this.addEditFormModel.submit(async formData => {
        if (status.statusCode === "2005101") {
          this.loadingSave = true;
        } else {
          this.loadingSubmit = true;
        }
        let tempprojectType = decomposeStringToJson(formData.typeCode, [
          "type",
          "typeCode"
        ]);

        //项目名称
         let sourceFullName = decomposeStringToJson(formData.sourceFullName, [
          "sourceName",
          "sourceNum",
          "sourceId"
        ]);
        formData={...formData,...sourceFullName}

        if (id && type === "edit") {
          this.editProjectChange({
            id,
            formData,
            status,
            //  tempfield,
            //  tempsource,
            tempprojectType
          },btnStatus);
        } else {
          this.addProjectChanges({
            formData,
            status,
            // tempfield,
            // tempsource,
            tempprojectType
          },btnStatus);
        }
      });
    },
    /**
     * 查询变更详细
     */
    async getProjectChangesDetails({ id, type }) {
      const { code, data } = await getProjectChangesDetails({ id });
      if (code === 1) {
        const { changes, approve, attachedList } = data;
        this.$nextTick(() => {
          if (type === "view" || type === "auditing") {
            this.addEditFormModel.disabled(true);
            this.processParam = {
              bizId: id,
              processDefineName: "project-change"
            };
          } else {
            this.addEditFormModel.disabled(false);
          }
          this.addEditFormModel.disabled(true, "documentNumber");

          //changes.source = changes.subject + "⭐" + changes.source;
          changes.typeCode = changes.type + "⭐" + changes.typeCode;
          this.approve = approve;
          this.attachedList = attachedList || [];
          this.selectRows = approve || [];
          this.showAttachedList = attachedList || [];
          this.addEditFormModel.setValue(changes);
          this.loadingSave = false;
          this.loadingSubmit = false;
          this.changes=changes;
        });
      } else {
        this.loadingSave = false;
        this.loadingSubmit = false;
      }
    },
    /**
     * 项目变更新增
     */
    async addProjectChanges({
      formData,
      status,
      // tempfield,
      // tempsource,
      tempprojectType
    },btnStatus) {
      const { code, data } = await addProjectChanges({
        changes: {
          ...formData,
          ...status,
          // ...tempfield,
          // ...tempsource,
          ...tempprojectType
        },
        approve: this.approve,
        attachedList: this.attachedList,
        attachedTypeCode: this.uploadParams.bizTypeCode
      });
      if (code === 1) {
        this.addEditFormModel.resetFields();
        this.attachedList = [];
        this.selectRows = [];
        this.showAttachedList = [];
        if (btnStatus === 1) {
          this.$router.push({ name: "changes" });
        } else {
          this.$router.push({
            name: "changes",
            query: { id: data.id, type: "edit" }
          });
          setTimeout(() => {
            this.getProjectChangesDetails({
              id: data.id,
              type: "edit"
            });
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
     * 项目变更编辑
     */
    async editProjectChange({
      id,
      formData,
      status,
      // tempfield,
      // tempsource,
      tempprojectType
    },btnStatus) {
      const { code, data } = await updateProjectChanges({
        id,
        params: {
          changes: {
            ...formData,
            ...status,
            // ...tempfield,
            // ...tempsource,
            ...tempprojectType
          },
          approve: this.approve,
          attachedList: this.attachedList,
          attachedTypeCode: this.uploadParams.bizTypeCode
        }
      });
      if (code === 1) {
        this.loadingSave = false;
        this.loadingSubmit = false;
        // this.$router.go(-1);

        if (btnStatus === 1) {
          this.$router.push({ name: "changes" });
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
     * 保存
     */
    handleSave() {
      const { statusCode } = this.changes;
      let status = {
        status: statusCode === "2005105" ? "退回" : "新建",
        statusCode: statusCode === "2005105" ? "2005105" : "2005101"
      };
      this.saveAndSubmitData(status,0);
    },
    /**
     * 提交
     */
    handleSubmit() {
      this.saveAndSubmitData({
        status: "提交",
        statusCode: "2005102"
      },1);
    }
  },
  components: {
    
    commonUpload
  }
};
</script>

<style lang="scss" scoped>
</style>