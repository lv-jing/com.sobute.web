<template>
  <el-card class="box-card" shadow="never">
    <div slot="header" class="clearfix flex flex-center-between">
      <span>项目验收{{$titleObj[$route.query.type]}}</span>
    </div>
    <el-tabs type="card">
      <el-tab-pane label="基本信息">
        <form-create v-model="addEditFormModel" :rule="addEidtFormRule" :option="addEditOption"></form-create>

        <div class="tasks-table">
          <el-table
            :data="list"
            style="width: 100%"
            class="mt10"
            :header-cell-style="{background:'#f3f3f3'}"
          >
            <el-table-column prop="taskName" label="研究内容"></el-table-column>
            <el-table-column prop="exam" label="考核指标"></el-table-column>
            <el-table-column prop="performance" label="完成情况">
              <template v-slot="{row}">
                <el-input
                  type="textarea"
                  :show-sord-limit="true"
                  :maxlength="1333"
                  autosize
                  v-model="row.performance"
                  :disabled="['auditing','view'].includes($route.query.type)"
                  placeholder="简要陈述主要完成情况，限500字。详细情况请在附件总结中详细说明"
                ></el-input>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <common-title title="计划外任务及完成情况" class="mt20" />
        <div>
          <el-button type="primary" size="mini" @click="taskItem(1)">新增</el-button>
        </div>
        <div class="tasks-table mt10">
          <el-table
            :data="cmpList"
            style="width: 100%"
            class="mt10"
            :header-cell-style="{background:'#f3f3f3'}"
          >
            <el-table-column prop="taskName" label="研究内容">
              <template v-slot="{row}">
                <el-input
                  v-model="row.taskName"
                  type="textarea"
                  show-sord-limit
                  :maxlength="1333"
                  autosize
                  :disabled="['auditing','view'].includes($route.query.type)"
                  placeholder="请输入研究内容"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="exam" label="考核指标">
              <template v-slot="{row}">
                <el-input
                  v-model="row.exam"
                  type="textarea"
                  show-sord-limit
                  :maxlength="1333"
                  autosize
                  :disabled="['auditing','view'].includes($route.query.type)"
                  placeholder="请输入考核指标"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="performance" label="完成情况">
              <template v-slot="{row}">
                <el-input
                  type="textarea"
                  :show-sord-limit="true"
                  :maxlength="1333"
                  autosize
                  v-model="row.performance"
                  :disabled="['auditing','view'].includes($route.query.type)"
                  placeholder="简要陈述主要完成情况，限500字。"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="150"
              align="center"
              v-if="['add','edit'].includes($route.query.type)"
            >
              <template v-slot="{$index}">
                <el-popconfirm title="确认删除该条记录吗?" @onConfirm="taskItem(2,$index)">
                  <el-button size="mini" slot="reference" type="text">删除</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 必传附件 -->
        <common-type-upload
          :uploadParams="uploadParamsOne"
          @getUploadTable="getUploadTable"
          :attachedTable="attachedTable"
        />
        <common-upload
          v-on:get-file-list="getFileList"
          :show-attached-list="showAttachedList"
          :upload-params="uploadParams"
          :isMultiple="true"
        ></common-upload>
      </el-tab-pane>
      <el-tab-pane label="审批列表">
        <div class="user-form-table">
          <common-auditing-view
            :process-param="processParam"
            :is-checked="$route.query.type==='view'"
            v-on:handle-selection-change="handleSelectionChange"
            :select-rows="selectRows"
            :loadingSubmit="loadingSubmit"
            :loadingSave="loadingSave"
             :status-code="currentItem.statusCode||'2005101'"
          ></common-auditing-view>
        </div>
      </el-tab-pane>
    </el-tabs>
    <common-footer
      :handleSubmit="handleSubmit"
      :handleSave="handleSave"
      :is-show-button="$route.query.type!=='view'"
    />
  </el-card>
</template>

<script>
/* eslint-disable */
import { mapState } from "vuex";
import CommonTypeUpload from "@/components/CommonTypeUpload";
import { addFormRule } from "./rules";
import {
  decomposeStringToJson,
  transformValueAndLabel,
  deepCloneClear,
  getStatus,
  findProjectByNumberItem
} from "@/utils/tools";
import {
  getProjectList,
  createProjectItem,
  updateProjectItem,
  getProjectDetails
} from "@/service/project";

import commonUpload from "@/components/CommonUpload";
import Cookies from "js-cookie";

const temp = {
  performance: "", //完成清空
  projectId: "",
  taskName: "",
  exam: "",
  id: "",
  taskId: ""
};
let _tempList = [];
export default {
  data() {
    return {
      loadingSubmit: false,
      loadingSave: false,

      processParam: {},
      approve: [], //审批列表
      list: [], //年度计划下面的一级任务列表
      cmpList: [],
      taskList: [],
      tableData: [],
      addEditFormModel: {},
      addEidtFormRule: addFormRule(this),
      addEditOption: {
        resetBtn: false,
        submitBtn: false,
        form: {
          size: "small"
        }
      },
      selectRows: [],
      uploadParams: {
        bizType: "项目验收", //业务分类
        bizTypeCode: "2013116" //业务类型编码
      },
      uploadParamsOne: {},
      uploadTableData: [], // 必传附件
      attachedTable: [], // 必传附件
      attachedList: [], //附件
      showAttachedList: [],
      currentItem: {},
      projectId: ""
    };
  },
  created() {
    Cookies.set("approvalType", "OUTER_AC_APPROVAL");
    // this.getProject();
    //this.getProject();
  },

  mounted() {
    const { id, type } = this.$route.query;
    //详细
    if (["edit", "view", "auditing"].includes(type) && id) {
      this.getProjectPlanDetails({ id, type });
    } else {
      this.initData();
    }
  },
  computed: {
    ...mapState({
      selectValue: state => state.common.selectValue,
      userInfo: state => state.common.userInfo
    })
  },
  methods: {
    /**
     * 项目名称change
     */
    async addDrawChange(val) {
      if (val) {
        let projectNumber = decomposeStringToJson(val, [
          "projectName",
          "id",
          "projectNumber"
        ]);

        let obj = await findProjectByNumberItem(projectNumber.projectNumber);
        
        if (obj) {
          this.$nextTick(() => {
            this.addEditFormModel.setValue(
              {
                customerName:obj.assumeCustomerName||'',
                keyWordsList: obj.keyWordsList||[],
                keyWordsProList: obj.keyWordsProList||[]
              },
              true
            );
            this.uploadParamsOne = {
              code: "2101500", //业务类型编码
              requiredCode: "ACCEPT_PROJECT_TYPE" + "_" + obj.projectTypeCode
            };
          });
        }
        const projectId = projectNumber.id;
        this.getTaskList(projectId);
      }
    },
    /**
     * 获取必传附件
     */
    getUploadTable(data) {
      this.uploadTableData = data;
    },
    /**
     * 初始化表单数据
     */
    initData() {
      const formData = this.addEditFormModel.formData();
      let clearFormData = deepCloneClear(formData);
      this.addEditFormModel.disabled(false);
      this.addEditFormModel.disabled(true, "documentNumber");
      let user = this.userInfo;
      clearFormData.employeeName = user
        ? user.idName + "⭐" + user.username
        : "";
      clearFormData.keyWordsList = [];
      clearFormData.keyWordsProList = [];
      this.addEditFormModel.setValue(clearFormData);
    },

    taskItem(type, index) {
      if (type === 1) {
        let bool = this.cmpList.some(item => {
          return item.taskName === "";
        });
        if (bool) {
          this.$message({
            type: "warning",
            message: "研究内容必须必填，请检查后新增"
          });
          return;
        }

        this.cmpList.push(Object.assign({}, temp));
      } else {
        this.cmpList.splice(index, 1);
      }
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
     * 查询任务考核列表/service/project/accept/list
     */
    async getTaskList(projectId) {
      const { code, data } = await getProjectList(
        {
          projectId,
          pageNum: 1,
          pageSize: -1
        },
        "accept"
      );
      if (code === 1) {
        //  this.taskList = data;

        this.list = data.map(item => {
          let obj = {
            performance: item.description || "", //完成清空
            projectId: item.projectId,
            taskName: item.taskName,
            exam: item.exam,
            taskId: item.id
          };
          return obj;
        });
      }
    },
    /**
     * 查询详细
     */
    async getProjectPlanDetails({ id, type }) {
      const { code, data } = await getProjectDetails({ id }, "check");
      if (code === 1) {
        if (data === null) {
          return;
        }
        const { approve, attachedList, list, check, cmpList } = data;

        this.projectId = check.projectId;
        // this.getTaskList(check.projectId);
        this.$nextTick(() => {
          if (type === "view" || type === "auditing") {
            this.addEditFormModel.disabled(true);
            this.processParam = {
              bizId: id,
              processDefineName: "project-apply"
            };
          } else {
            this.addEditFormModel.disabled(false);
          }
          this.currentItem = check;
          this.list = list.length > 0 ? list : [];
          this.cmpList =
            cmpList && cmpList.length > 0 ? cmpList : [Object.assign({}, temp)];
          this.attachedList = attachedList || [];
          check.type = `${check.type}⭐${check.typeCode}`;
          check.projectId = `${check.projectName}⭐${check.projectId}⭐${check.projectNumber}`;
          check.employeeName = `${check.employeeName}⭐${check.employeeNumber}`;
          this.selectRows = approve || [];
          this.showAttachedList = attachedList || [];
          this.addEditFormModel.setValue(check);
          this.attachedTable = data.attachedTable || [];
          this.uploadParamsOne = {
            code: "2101500", //业务类型编码
            requiredCode: "ACCEPT_PROJECT_TYPE" + "_" + check.projectTypeCode,
            type: "edit"
          };
          this.addEditFormModel.disabled(true, "documentNumber");
          this.loadingSave = false;
          this.loadingSubmit = false;
        });
      } else {
        this.loadingSave = false;
        this.loadingSubmit = false;
      }
    },
    /**
     * 项目申报新增
     */
    async addPlanItem(formData, btnStatus) {
      let arr = [];
      this.uploadTableData.forEach(item => {
        item.list &&
          item.list.forEach(items => {
            arr.push(items);
          });
      });
      const { code, data } = await createProjectItem(
        {
          cmpList: this.cmpList,
          check: formData,
          approve: this.approve,
          list: this.list,
          attachedList: [...arr, ...this.attachedList],
          attachedTypeCode: this.uploadParams.bizTypeCode
        },
        "check"
      );
      if (code === 1) {
        this.addEditFormModel.resetFields();

        this.selectRows = [];
        this.showAttachedList = [];
        this.approve = [];
        this.list = [];

        // this.$router.go(-1);

        if (btnStatus === 1) {
          this.$router.push({ name: "acceptManage" });
        } else {
          this.$router.push({
            name: "acceptManage",
            query: { id: data.id, type: "edit" }
          });
          setTimeout(() => {
            this.getProjectPlanDetails({
              id: data.id,
              type: "edit"
            });
          }, 500);
        }

        this.$message({
          type: "success",
          message: " 操作成功"
        });
        this.$store.dispatch("setselectValue", "");
      } else {
        this.loadingSave = false;
        this.loadingSubmit = false;
      }
    },

    /**
     * 项目编辑
     */
    async updatePlanItem(id, formData, btnStatus) {
      let arr = [];
      this.uploadTableData.forEach(item => {
        item.list &&
          item.list.forEach(items => {
            arr.push(items);
          });
      });
      const { code, data } = await updateProjectItem(
        {
          id,
          params: {
            cmpList: this.cmpList,
            check: formData,
            list: this.list,
            approve: this.approve,
            attachedList: [...arr, ...this.attachedList],
            attachedTypeCode: this.uploadParams.bizTypeCode
          }
        },
        "check"
      );
      if (code === 1) {
        this.$message({
          type: "success",
          message: " 操作成功"
        });

        if (btnStatus === 1) {
          this.$router.push({ name: "acceptManage" });
        }
        this.loadingSave = false;
        this.loadingSubmit = false;
        this.$store.dispatch("setselectValue", "");
      } else {
        this.loadingSave = false;
        this.loadingSubmit = false;
      }
    },
    /**
     * 提交和保存公共方法
     */
    saveAndSubmitData(status, btnStatus) {
      const { id, type } = this.$route.query;
      this.addEditFormModel.submit(async formData => {
        const projectName = decomposeStringToJson(formData.projectId, [
          "projectName",
          "projectId",
          "projectNumber"
        ]);
        const employeeName = decomposeStringToJson(formData.employeeName, [
          "employeeName",
          "employeeNumber"
        ]);
        const typeCode = decomposeStringToJson(formData.type, [
          "type",
          "typeCode"
        ]);
        // 技术关键词
        let keyWords = [],
          keyWordsCode = [];
        let _tempKeyWordList = [
          ...new Set((formData.keyWordsList || "").toString().split(","))
        ];

        if (_tempKeyWordList && _tempKeyWordList.length > 0) {
          _tempKeyWordList.map(item => {
            let temp = item.split("⭐");
            keyWords.push(temp[0]);
            keyWordsCode.push(temp[1]);
          });
        }
        formData.keyWords = keyWords.toString();
        formData.keyWordsCode = keyWordsCode.toString();
        // 产品关键词
        let keyWordsPro = [],
          keyWordsCodePro = [];
        let _tempKeyWordsProList = [
          ...new Set((formData.keyWordsProList || "").toString().split(","))
        ];

        if (_tempKeyWordsProList && _tempKeyWordsProList.length > 0) {
          _tempKeyWordsProList.map(item => {
            let temp = item.split("⭐");
            keyWordsPro.push(temp[0]);
            keyWordsCodePro.push(temp[1]);
          });
        }
        formData.keyWordsPro = keyWordsPro.toString();
        formData.keyWordsCodePro = keyWordsCodePro.toString();

        this.currentItem.id &&
          (formData = { ...this.currentItem, ...formData });
        const params = {
          ...formData,
          ...projectName,
          ...employeeName,
          ...typeCode,
          ...status
        };
        let list = this.list;
        let falg = list.find(item => item.taskName === "");
        if (falg) {
          this.$message({
            type: "error",
            message: "项目考核指标及完成情况不能空行,请填写或者删除空行！"
          });
          return;
        }
        if (btnStatus === 1 && !getStatus(this.uploadTableData)) {
          return;
        }
        if (btnStatus === 0) {
          this.loadingSave = true;
        } else {
          this.loadingSubmit = true;
        }
        // let _attachedList=this.attachedList.length>0?this.attachedList:this.showAttachedList
        if (type === "edit") {
          this.updatePlanItem(id, params, btnStatus);
        } else {
          this.addPlanItem(params, btnStatus);
        }
      });
    },
    /**
     * 保存
     */
    handleSave() {
      const { statusCode } = this.currentItem;
      let status = {
        status: statusCode === "2005105" ? "退回" : "新建",
        statusCode: statusCode === "2005105" ? "2005105" : "2005101"
      };
      this.saveAndSubmitData(status, 0);
    },
    /**
     * 提交
     */
    handleSubmit() {
      this.saveAndSubmitData(
        {
          status: "提交",
          statusCode: "2005102"
        },
        1
      );
    },
    handleClose() {
      this.addFormDrawerModel.resetFields();
      this.show = false;
      this.currentItem = {};
    }
  },
  components: {
    
    commonUpload,
    CommonTypeUpload
  }
};
</script>

<style lang="scss" scoped>
</style>