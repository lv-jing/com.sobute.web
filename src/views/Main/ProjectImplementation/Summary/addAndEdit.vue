下月计划<template>
  <el-card class="box-card" shadow="never">
    <div slot="header" class="clearfix flex flex-center-between">
      <span>项目总结-自主{{$titleObj[$route.query.type]}}</span>
    </div>
    <el-tabs type="card">
      <el-tab-pane label="基本信息">
        <form-create v-model="addEditFormModel" :rule="addEidtFormRule" :option="addEditOption"></form-create>
        <el-button
          v-if="$route.query.type!=='view'&& $route.query.type!=='auditing'"
          type="primary"
          size="small"
          icon="iconfont sbt_add"
          @click="handleAddList"
        >新增</el-button>
        <div class="tasks-table">
          <el-table
            :data="list"
            style="width: 100%"
            class="mt10"
            row-key="uuid"
            id="domMember"
            ref="domMember"
            :header-cell-style="{background:'#f3f3f3'}"
          >
            <el-table-column width="50" label v-if="list.length>0">
              <template>
                <span class="el-icon-rank handler-move-item"></span>
              </template>
            </el-table-column>
            <el-table-column type="index" width="50" label="序号"></el-table-column>
            <el-table-column prop="taskName" width="150" label="任务名称"></el-table-column>
            <el-table-column prop="taskNumber" width="150" label="任务编号"></el-table-column>
            <el-table-column prop="taskTarget" label="任务指标"></el-table-column>
            <el-table-column prop="performance" label="主要完成情况"></el-table-column>
            <el-table-column prop="completePercentage" width="90" label="完成百分比"></el-table-column>
            <el-table-column prop="percentage" width="70" label="任务权重"></el-table-column>
            <el-table-column label="操作" width="120" align="center">
              <template v-slot="{row,$index}">
                <div class="tc">
                  <el-button
                    v-if="['edit','add'].includes($route.query.type)"
                    type="text"
                    @click="handleEditeClick(row,'edit',$index)"
                    size="mini"
                    circle
                  >编辑</el-button>
                  <el-button
                    v-if="['view','auditing'].includes($route.query.type)"
                    type="text"
                    @click="handleEditeClick(row,'view',$index)"
                    size="mini"
                    circle
                  >查看</el-button>
                  <el-popconfirm
                    v-if="['edit','add'].includes($route.query.type)"
                    title="确认删除该条记录吗?"
                    @onConfirm="handleDelete($index)"
                  >
                    <el-button slot="reference" type="text" size="mini" circle>删除</el-button>
                  </el-popconfirm>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 存在问题 -->
        <common-title title="存在问题" class="mt20" />
        <div>
          <el-button
            icon="iconfont sbt_add"
            type="primary"
            v-if="['add','edit'].includes($route.query.type)"
            @click="taskItem(1)"
          >新增</el-button>
        </div>
        <div class="tasks-table mt10">
          <el-table
            :data="problemList"
            style="width: 100%"
            class="mt10"
            :header-cell-style="{background:'#f3f3f3'}"
          >
             <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="problem" label="问题描述">
              <template v-slot="{row}">
                <el-input
                  v-model="row.problem"
                  type="textarea"
                  show-sord-limit
                  :maxlength="1333"
                  autosize
                  :disabled="['auditing','view'].includes($route.query.type)"
                  placeholder="请输入问题描述"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="suggest" label="解决方案或建议">
              <template v-slot="{row}">
                <el-input
                  v-model="row.suggest"
                  type="textarea"
                  show-sord-limit
                  :maxlength="1333"
                  autosize
                  :disabled="['auditing','view'].includes($route.query.type)"
                  placeholder="请输入解决方案或建议"
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
        <!-- 下月计划 -->
        <common-title
          :title="'下月计划'"
          content="操作用户为非项目负责人，且包含在项目责任人和参与人员中的同年度且非末级打开任务作为原任务名称可选项；新增任务名称会作为原任务名称的下级任务可反写至任务分解"
          class="md20 mt30"
        />
        <div class="tasks-table">
          <el-button
            icon="iconfont sbt_add"
            type="primary"
            v-if="['add','edit'].includes($route.query.type)"
            @click="addkeyList()"
          >新增</el-button>
          <el-table
            :data="linesTaskList"
            style="width: 100%"
            class="mt10"
            row-key="uuid"
            id="domMembertask"
            ref="domMembertask"
            :header-cell-style="{background:'#f3f3f3'}"
          >
            <el-table-column width="50" label v-if="linesTaskList.length>0">
              <template>
                <span class="el-icon-rank handler-move-item"></span>
              </template>
            </el-table-column>
            <el-table-column prop="index" width="50" type="index" label="序号"></el-table-column>
            <el-table-column prop="refTaskName" label="原任务名称"></el-table-column>
            <el-table-column prop="refTaskNumber" label="原任务编号"></el-table-column>
            <el-table-column prop="taskName" label="任务名称"></el-table-column>
            <el-table-column prop="taskType" width="100" label="任务类型">
              <template slot-scope="scope">
                <span>{{scope.row.taskType==1?"科研任务":(scope.row.taskType==2?"技术服务":(scope.row.taskType==3?"工程示范":''))}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="taskTarget" label="任务指标"></el-table-column>
            <el-table-column prop="employeeName" label="责任人"></el-table-column>
            <el-table-column prop="startDate" width="100" label="开始时间"></el-table-column>
            <el-table-column prop="endDate" width="100" label="结束时间"></el-table-column>
            <el-table-column label="操作" width="100" align="center">
              <template v-slot="{row,$index}">
                <el-button
                  type="text"
                  @click="handleEditkeyList(row,'edit',$index)"
                  v-if="['add','edit'].includes($route.query.type)"
                >编辑</el-button>
                <el-button
                  v-if="['view','auditing'].includes($route.query.type)"
                  type="text"
                  @click="handleEditkeyList(row,'view',$index)"
                  size="mini"
                  circle
                >查看</el-button>
                <el-popconfirm
                  title="确认删除该条记录吗?"
                  @onConfirm="handleDeletekeyList($index)"
                  v-if="['add','edit'].includes($route.query.type)"
                >
                  <el-button slot="reference" type="text" size="mini" circle>删除</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-drawer
            :visible.sync="showKeyList"
            direction="rtl"
            :wrapperClosable="false"
            size="50%"
            :before-close="handleKeyClose"
          >
            <div slot="title" v-text="txtKey"></div>
            <div class="p15">
              <form-create
                v-model="addDrawerKeyModel"
                :rule="addDrawerKeyRule"
                :option="addDrawerKeyOptions"
              ></form-create>
            </div>
          </el-drawer>
        </div>
        <!-- 必传附件 -->
        <common-type-upload
          :uploadParams="uploadParamsOne"
          @getUploadTable="getUploadTable"
          :attachedTable="attachedTable"
        />
        <!-- 相关附件 -->
        <common-upload
          v-on:get-file-list="getFileList"
          :show-attached-list="showAttachedList"
          :upload-params="uploadParams"
          :isShowDownload="$route.query.type==='add'||$route.query.type==='edit'"
          :urlList="urlList"
        ></common-upload>
        <el-drawer
          :visible.sync="show"
          direction="rtl"
          :wrapperClosable="false"
          size="50%"
          :before-close="handleClose"
        >
          <div slot="title" v-text="text"></div>
          <div class="p15">
            <form-create
              v-model="addEditDrawerModel"
              :rule="addEidtDrawerRule"
              :option="addEditDrawerOption"
            ></form-create>
            <common-upload
              v-on:get-file-list="getFileList1"
              :show-attached-list="showAttachedList1"
              :upload-params="uploadParams1"
            ></common-upload>
            <div v-if="['edit','add'].includes($route.query.type)">
              <el-col :span="8" :offset="4">
                <el-button type="primary" class="w-100 md20 mt20" @click="handleSub">提交</el-button>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-button class="w-100 md20 mt20" @click="handleClose">取消</el-button>
              </el-col>
            </div>
          </div>
        </el-drawer>
      </el-tab-pane>
      <el-tab-pane label="审批列表">
        <div class="user-form-table">
          <common-auditing-view
            :is-checked="$route.query.type==='view'"
            v-on:handle-selection-change="handleSelectionChange"
            :select-rows="selectRows"
            :process-param="processParam"
            :status-code="currentItem.statusCode||'2005101'"
          ></common-auditing-view>
        </div>
      </el-tab-pane>
    </el-tabs>
    <common-footer
      :handleSubmit="handleSubmit"
      :handleSave="handleSave"
      :is-show-button="$route.query.type!=='view'"
      :scoreShow="true"
      :loadingSubmit="loadingSubmit"
      :loadingSave="loadingSave"
    />
  </el-card>
</template>

<script>
/* eslint-disable */
import { addFormRule, addDrawerRule, addkeyRule } from "./rules";
import {
  decomposeStringToJson,
  transformValueAndLabel,
  deepCloneClear,
  getMonthLast,
  getStatus,
  rowDrop,
  selectNotDataOption,
  findProjectByNumberItem
} from "@/utils/tools";
import {
  getProjectList,
  createProjectItem,
  updateProjectItem,
  getProjectDetails,
  getProjectParamsItems
} from "@/service/project";
import { allNarmalInterface } from "@/service/common";
import { getTaskList } from "@/service/pilot";

import commonUpload from "@/components/CommonUpload";
import Cookies from "js-cookie";
import { mapState } from "vuex";
import CommonTypeUpload from "@/components/CommonTypeUpload";
import moment from "moment";

const temp = {
  problem: "",
  suggest: "",
  id: ""
};
export default {
  data() {
    return {
      show: false,
      text: "新增计划完成情况",
      loadingSubmit: false,
      loadingSave: false,
      processParam: {},
      approve: [], //审批列表
      list: [], //年度计划下面的一级任务列表
      planList: [],
      tableData: [],
      problemList: [],
      addEditFormModel: {},
      addEidtFormRule: addFormRule(this),
      addEditOption: {
        resetBtn: false,
        submitBtn: false,
        form: {
          size: "small"
        }
      },
      addEditDrawerModel: {},
      addEidtDrawerRule: [],
      addEditDrawerOption: {
        submitBtn: false,
        resetBtn: false
      },
      selectRows: [],
      uploadParams: {
        bizType: "项目总结", //业务分类
        bizTypeCode: "2013119" //业务类型编码
      },
      uploadParams1: {
        bizType: "项目总结-计划", //业务分类
        bizTypeCode: "2013132" //业务类型编码
      },
      uploadParamsOne: {},
      uploadTableData: [],
      attachedTable: [],
      attachedList: [], //附件
      showAttachedList: [], // 附件回显
      attachedList1: [], //计划列表附件
      showAttachedList1: [], // 计划列表回显
      currentItem: {},
      currentItems: {},
      editIndex: "",
      urlList: [
        {
          name: "开放基金课题成果简报-模板(1).docx",
          url: "/static/excel/开放基金课题成果简报-模板(1).docx"
        },
        {
          name: "开放基金项目研究总报告-模板 2020.docx",
          url: "/static/excel/开放基金项目研究总报告-模板2020.docx"
        },
        {
          name: "总结模板---内部月度工作总结.docx",
          url: "/static/excel/总结模板---内部月度工作总结.docx"
        },
        {
          name: "总结模板---内部项目年度总结.docx",
          url: "/static/excel/总结模板---内部项目年度总结.docx"
        }
      ],
      // 下月计划
      linesTaskList: [],
      showKeyList: false,
      txtKey: "新增下月计划",
      currentItemKey: {},
      editKeyIndex: "",
      addDrawerKeyModel: {},
      addDrawerKeyRule: [],
      addDrawerKeyOptions: {
        form: {
          labelPosition: "top"
        },
        row: {
          gutter: 15
        },
        //表单提交事件
        onSubmit: formData => {
          const {
            employeeName,
            employeeNum
          } = decomposeStringToJson(formData.employeeName, [
            "employeeName",
            "employeeNum"
          ]);
          formData.employeeName = employeeName.toString();
          formData.employeeNum = employeeNum.toString();
          let bigStartDate = new Date(this.taskDate[0]).getTime();
          let bigEndDate = new Date(this.taskDate[1]).getTime();
          let smallStartDate = new Date(formData.startDate).getTime();
          let smallEndDate = new Date(formData.endDate).getTime();
          if (formData.refTaskName) {
            if (
              bigStartDate - smallStartDate <= 0 &&
              bigEndDate - smallEndDate >= 0
            ) {
              this.getAddTaskList(formData);
            } else {
              this.$message({
                type: "error",
                duration: 5000,
                message: `开始结束时间必须在${this.taskDate[0]}至${this.taskDate[1]}内，请重新选择时间！`
              });
            }
          } else {
            this.getAddTaskList(formData);
          }
        },
        submitBtn: {
          icon: "",
          show: ["add", "edit"].includes(this.$route.query.type),
          col: {
            span: 8,
            offset: 4
          }
        },
        resetBtn: {
          icon: "",
          show: ["add", "edit"].includes(this.$route.query.type),
          col: {
            span: 8,
            offset: 4
          },
          click: () => {
            this.addDrawerKeyModel.resetFields();
            this.changeClearDate();
          }
        }
      },
      taskList: [],
      taskDate: [],
      isValidateTaskName: false,
      searchTaskParams: {}
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.common.userInfo
    })
  },
  created() {
    Cookies.set("approvalType", "OUTER_PG_APPROVAL");
  },
  mounted() {
    const { id, type } = this.$route.query;
    //详细
    if (["edit", "view", "auditing"].includes(type) && id) {
      this.getProjectPlanDetails({ id, type });
    } else {
      this.initData();
    }
    setTimeout(() => {
      let domMember = this.$refs.domMember;
      rowDrop("domMember", domMember, this.list, this);

      let domMembertask = this.$refs.domMembertask;
      rowDrop("domMembertask", domMembertask, this.linesTaskList, this);
    }, 500);
  },

  methods: {
    /**
     * 计划类型 切换
     */
    typeChange(val) {
      let arrV = val.split("⭐")[1];
      if (["2018002", "2018003"].includes(arrV)) {
        this.planTargetView();
      }else{
        console.log(val)
        this.list=[]
      }
    },

    getFormParams() {
      let { projectId } = decomposeStringToJson(
        this.addEditFormModel.getValue("projectName"),
        ["projectName", "projectNumber", "projectId"]
      );
      name = this.addEditFormModel.getValue("employeeName").split("⭐")[1];

      return {
        projectId,
        name
      };
    },

    async planTargetView() {
      const {projectId,name}=this.getFormParams()
      let params = this.getDrawParams({
        projectId,
        employeeNumber: name //this.userInfo.username
      });

     
      
      const {code, data } = await getProjectParamsItems(params, "plan-target-view/list");
      if(code==1){
        this.list=data
      }
    },
    taskItem(type, index) {
      if (type === 1) {
        console.log( this.problemList)
        let bool = this.problemList.some(item => {
          return item.problem === "";
        });
        if (bool) {
          this.$message({
            type: "warning",
            message: "问题描述必须必填，请检查后新增"
          });
          return;
        }

        this.problemList.push(Object.assign({}, temp));
      } else {
        this.problemList.splice(index, 1);
        console.log(this.problemList);
      }
    },
    /**
     * 下月新增编辑数据
     */
    getAddTaskList(formData) {
      let refTaskName = decomposeStringToJson(formData.refTaskName, [
        "refTaskName",
        "refTaskNumber",
        "refTaskId"
      ]);
      if (this.txtKey === "新增下月计划") {
        this.linesTaskList.push({
          ...formData,
          ...refTaskName,
          uuid: this.$uuid()
        });
      } else {
        this.currentItemKey = {
          ...this.currentItemKey,
          ...formData,
          ...refTaskName
        };
        this.$set(this.linesTaskList, this.editKeyIndex, this.currentItemKey);
        this.showKeyList = false;
      }
      this.addDrawerKeyModel.resetFields();
      this.changeClearDate();
      this.$message({
        type: "success",
        message: " 操作成功"
      });
    },
    /**
     * 获取必传附件表格数据
     */
    getUploadTable(data) {
      this.uploadTableData = data;
    },
    /**
     * 新增项目计划
     */
    handleAddList() {
      const d = this.addEditFormModel.getValue("projectNumber"),
        c = this.addEditFormModel.getValue("type"),
        m = this.addEditFormModel.getValue("month");
      if (d && c && m) {
        this.text = "新增计划完成情况";
        this.show = true;
        this.editIndex = "";
        const {projectId,name}=this.getFormParams()
        this.$nextTick(() => {
          this.searchTaskParams = this.getDrawParams({
            projectId,
            employeeNumber: name //this.userInfo.username

          });
          this.addEidtDrawerRule = addDrawerRule(this);
        });
      } else {
        this.$message({
          type: "error",
          message: "项目名称、计划类型和月份必填!"
        });
      }
    },
    /**
     * 请求任务参数
     */
    getDrawParams(val = {}) {
      const type = this.addEditFormModel.getValue("type");
      const { reservedField1 = "", typeCode } = decomposeStringToJson(type, [
          "type",
          "typeCode",
          "reservedField1"
        ]),
        month = this.addEditFormModel.getValue("month"),
        year = (month && month.split("-")[0]) || "";
       let projectNumber=this.addEditFormModel.getValue("projectNumber")
      console.log(projectNumber);
      return {
        projectNumber,
        statusCode: "2005104",
        summaryTypeCode: val.finalFlag === 1 ? typeCode : reservedField1, //val === 1 ? 2018003 : typeCode
        ...val,
        year
      };
    },
    /**
     * 项目名称change
     */
    async addDrawChange(val) {
      if (val) {
        let productName = decomposeStringToJson(val, [
          "projectName",
          "projectNumber",
          "projectId"
        ]);
        this.typeChange(this.addEditFormModel.getValue('type'))
        //匹配projectNumber 的数据
        let obj = await findProjectByNumberItem(productName.projectNumber);
        //判断当前登录用户是否是项目负责人
        //this.checkUserCreateByName(productName.projectId);
        if (obj) {
          this.$nextTick(() => {
            this.addEditFormModel.setValue(
              {
                keyWordsList: obj.keyWordsList,
                keyWordsProList: obj.keyWordsProList,
                projectNumber: productName.projectNumber
              },
              true
            );
            this.uploadParamsOne = {
              code: "2100900", //业务类型编码
              requiredCode: "SUM_PROJECT_TYPE" + "_" + obj.projectTypeCode
            };
          });
        }
      } else {
        this.addEditFormModel.setValue("projectNumber", "");
      }
      this.linesTaskList = [];
    },
    /**
     * （目前未启用）
     * 判断当前登录用户是否是项目负责人
     * 如果是，在添加下月计划的时候，就必须选择原任务名称
     */
    async checkUserCreateByName(projectId) {
      const { code, data } = await getProjectParamsItems(
        { projectId },
        "summary/check-user"
      );

      if (code === 1) {
        this.isValidateTaskName = data;
      }
    },

    /**
     * 任务名称change
     */
    addDrawChange1(val, num) {
      if (val) {
        const { taskNumber, taskTarget } = decomposeStringToJson(val, [
          "taskName",
          "taskNumber",
          "taskId",
          "taskTarget"
        ]);
        if (num === 1) {
          this.addEditDrawerModel.setValue({
            taskNumber,
            taskTarget
          });
        } else {
          //  let date = this.taskList.find(item => item.taskNumber === taskNumber);
          this.getTaskList(taskNumber);
          //   this.taskDate = (date && [date.startDate, date.endDate]) || [];
          this.addDrawerKeyModel.setValue({ refTaskNumber: taskNumber });
          this.changeClearDate(true);
        }
      } else {
        if (num === 1) {
          this.addEditDrawerModel.setValue({ taskNumber: "", taskTarget: "" });
          this.currentItems.taskId = "";
        } else {
          this.addDrawerKeyModel.setValue("refTaskNumber", "");
          this.currentItemKey.taskId = "";
        }
      }
    },
    /**
     * 判断时间是否必填
     */
    changeClearDate(bool = false) {
      let validate = {
        validate: [
          { required: bool, message: "请选择时间", trigger: "blur" },
          {
            trigger: "blur",
            validator: (rule, value, callback) => {
              let time1 = new Date(
                this.addDrawerKeyModel.getValue("startDate")
              ).getTime();
              let time2 = new Date(
                this.addDrawerKeyModel.getValue("endDate")
              ).getTime();
              if (time1 - time2 > 0) {
                callback(new Error("结束日期不能小于开始日期"));
              } else {
                callback();
              }
            }
          }
        ]
      };

      this.$nextTick(() => {
        this.addDrawerKeyModel.updateRules({
          startDate: {
            ...validate
          },
          endDate: {
            ...validate
          }
        });
      });
    },

    /**
     * 编辑
     */
    handleEditeClick(row, val, index) {
      this.text = "编辑计划完成情况";
      const {
        employeeName,
        employeeNum,
        source,
        taskId,
        taskName,
        taskNumber,
        taskTarget
      } = row;
      this.list = this.list.map((item, _index) => {
        return {
          ...item,
          index: _index
        };
      });

      row.taskName = `${taskName}⭐${taskNumber}⭐${taskId}⭐${taskTarget}⭐${source}`;
      row.employeeName = `${employeeName}⭐${employeeNum}`;
      // this.addEditFormModel.getValue('employeeName')
      this.currentItems = JSON.parse(JSON.stringify(row));
      this.editIndex = index;
      this.show = true;
      let { projectId } = decomposeStringToJson(
        this.addEditFormModel.getValue("projectName"),
        ["projectName", "projectNumber", "projectId"]
      );
      const name = this.addEditFormModel
        .getValue("employeeName")
        .split("⭐")[1];
      this.searchTaskParams = this.getDrawParams({
        projectId,
        employeeNumber: name
      });
      // this.searchTaskParams = {
      //   summaryTypeCode,
      //   year,

      // };
      this.addEidtDrawerRule = addDrawerRule(this);

      this.$nextTick(() => {
        if (val === "view") {
          this.addEditDrawerModel.disabled(true);
        }
        let taskName = this.addEditDrawerModel.setValue({
          ...this.currentItems
        });
        this.attachedList1 = row.attachedList;
        this.showAttachedList1 = row.attachedList;
      });
    },
    /**
     * 删除
     */
    handleDelete(index) {
      this.list.splice(index, 1);
    },
    /**
     * 计划完成抽屉提交
     */
    handleSub() {
      this.addEditDrawerModel.validate(valid => {
        if (valid) {
          this.addEditDrawerModel.submit(formData => {
            let taskName = decomposeStringToJson(formData.taskName, [
              "taskName",
              "taskNumber",
              "taskId",
              "taskTarget",
              "source"
            ]);
            let taskNumber = taskName ? taskName.taskNumber : "";
            let flag = this.list.find(item => {
              return (
                item.taskNumber === taskNumber && item.index !== this.editIndex
              );
            });
            if (flag) {
              this.$message({
                type: "error",
                message: "任务名重复，请重新添加！"
              });
              return;
            }
            let attachedList = this.attachedList1;
            if (this.text == "新增计划完成情况") {
              this.list.push({
                ...formData,
                ...taskName,
                attachedList,
                uuid: this.$uuid(),
                attachedTypeCode: this.uploadParams.bizTypeCode
              });
            } else {
              this.currentItems = {
                ...this.currentItems,
                ...formData,
                ...taskName,
                attachedList,
                attachedTypeCode: this.uploadParams.bizTypeCode
              };
              this.$set(this.list, this.editIndex, this.currentItems);
              this.show = false;
            }
            this.list = this.list.map((item, index) => {
              return {
                ...item,
                index
              };
            });
            this.addEditDrawerModel.resetFields();
            this.$message({
              type: "success",
              message: " 操作成功"
            });
            this.attachedList1 = [];
            this.showAttachedList1 = [];
          });
        }
      });
    },
    /**
     *关闭抽屉
     */
    handleClose() {
      this.show = false;
      this.attachedList1 = [];
      this.showAttachedList1 = [];
      this.searchTaskParams = {};
      this.addEditDrawerModel.resetFields();
    },
    /**
     * 初始化表单数据
     */
    initData() {
      const formData = this.addEditFormModel.formData();
      let clearFormData = deepCloneClear(formData);
      this.addEditFormModel.disabled(false);
      this.addEditFormModel.disabled(true, ["documentNumber", "projectNumber",'employeeName']);
      let user = this.userInfo;
      clearFormData.employeeName = user
        ? user.idName + "⭐" + user.username
        : "";
      clearFormData.fillDate = getMonthLast();

      this.addEditFormModel.setValue(clearFormData);
    },
    /**
     * 下月计划新增
     */
    addkeyList() {
      const name = this.addEditFormModel
        .getValue("employeeName")
        .split("⭐")[1];

      if (
        this.addEditFormModel.getValue("projectNumber") &&
        this.addEditFormModel.getValue("type")
      ) {
        let productName = decomposeStringToJson(
          this.addEditFormModel.getValue("projectName"),
          ["projectName", "projectNumber", "projectId"]
        );
        this.showKeyList = true;
        this.txtKey = "新增下月计划";
        this.searchTaskParams = this.getDrawParams({
          empolyeeOrPartakeNum: name,
          finalFlag: 1
        });

        // console.log(this.searchTaskParams);

        this.$nextTick(() => {
          this.addDrawerKeyRule = addkeyRule(this);
          this.addDrawerKeyModel.resetFields();
          this.getDutyPersonList(productName.projectId);
        });
      } else {
        this.$message({
          type: "error",
          message: "项目名称和计划类型必填!"
        });
      }
    },
    /**
     * 下月计划编辑
     */
    handleEditkeyList(row, type, index) {
      let productName = decomposeStringToJson(
          this.addEditFormModel.getValue("projectName"),
          ["projectName", "projectNumber", "projectId"]
        ),
        name = this.addEditFormModel.getValue("employeeName").split("⭐")[1];

      this.currentItemKey = Object.assign({}, row);
      this.showKeyList = true;
      this.editKeyIndex = index;
      this.txtKey = "编辑下月计划";

      this.searchTaskParams = this.getDrawParams({
        empolyeeOrPartakeNum: name,
        finalFlag: 1
      });
      this.addDrawerKeyRule = addkeyRule(this);
      this.$nextTick(() => {
        this.getTaskList(row.refTaskNumber);
        this.currentItemKey.refTaskName = `${this.currentItemKey.refTaskName}⭐${this.currentItemKey.refTaskNumber}⭐${this.currentItemKey.refTaskId}`;
        this.currentItemKey.employeeName = `${this.currentItemKey.employeeName}⭐${this.currentItemKey.employeeNum}`;
        this.getDutyPersonList(productName.projectId);
        this.addDrawerKeyModel.setValue({ ...this.currentItemKey });
        if (type === "view") {
          this.addDrawerKeyModel.disabled(true);
        }
      });
    },
    /**
     * 下月计划删除
     */
    handleDeletekeyList(index) {
      this.linesTaskList.splice(index, 1);
    },
    /**
     * 关闭关键节点
     */
    handleKeyClose() {
      this.showKeyList = false;
      this.addDrawerKeyModel.resetFields();
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
     * 获取计划完成列表上传列表
     */
    getFileList1(list) {
      this.attachedList1 = list;
    },

    /**
     * 查询任务列表
     */
    async getTaskList(refTaskNumber) {
      const { code, data } = await getTaskList({ ...this.searchTaskParams });
      if (code === 1) {
        const date = data.find(i => i.taskNumber === refTaskNumber);
        this.taskDate = (date && [date.startDate, date.endDate]) || [];
      }
    },
    /**
     *  查询责任人（一级任务的责任人只能选择项目成员里的人员。 子级任务的责任人只能选择父级任务里的责任人）
     * @param {*} params
     */
    async getDutyPersonList(projectId) {
      const { code, data } = await getProjectParamsItems(
        { projectId },
        "duty-person",
        "project/hr/"
      );
      if (code === 1) {
        let options = await transformValueAndLabel(data, [
          "empolyeeName",
          "empolyeeNumber"
        ]);
        this.addDrawerKeyModel.updateRule("employeeName", { options });
      }
    },
    /**
     * 查询详细
     */
    async getProjectPlanDetails({ id, type }) {
      const { code, data } = await getProjectDetails({ id }, "summary");
      console.log("details");
      console.log(data);
      if (code === 1) {
        if (data === null) {
          return;
        }
        const {
          approve,
          list,
          summary,
          attachedList,
          linesTaskList,
          linesProblemList
        } = data;
        this.$nextTick(() => {
          if (["view", "auditing"].includes(type)) {
            this.addEditFormModel.disabled(true);
            this.processParam = { bizId: id };
          } else {
            this.addEditFormModel.disabled(false);
          }
          this.currentItem = summary;
          this.list =
            (list &&
              list.map((item, index) => {
                return {
                  ...item,
                  index,
                  uuid: this.$uuid()
                };
              })) ||
            [];
          summary.type = `${summary.type}⭐${summary.typeCode}⭐${summary.typeCodeQuery}`;
          summary.employeeName = `${summary.employeeName}⭐${summary.employeeNumber}`;
          summary.projectName =
            summary.projectName &&
            `${summary.projectName}⭐${summary.projectNumber}⭐${summary.projectId}`;
          this.selectRows = approve || [];
          this.problemList = linesProblemList||[];
          this.linesTaskList =
            (linesTaskList &&
              linesTaskList.map(i => {
                i.uuid = this.$uuid();
                return i;
              })) ||
            [];
          this.attachedList = attachedList || [];
          this.showAttachedList = attachedList || [];
          this.attachedTable = data.attachedTable || [];
          // this.updateRuleYearAndMonth(summary.typeCode);

          this.uploadParamsOne = {
            code: "2100900", //业务类型编码
            requiredCode: "SUM_PROJECT_TYPE" + "_" + summary.projectTypeCode,
            type: "edit"
          };
          setTimeout(() => {
            this.addEditFormModel.setValue(summary);
          }, 200);
          this.addEditFormModel.disabled(true, [
            "documentNumber",
            "projectNumber"
          ]);
          this.loadingSave = false;
          this.loadingSubmit = false;
        });
      } else {
        this.loadingSave = false;
        this.loadingSubmit = false;
      }
    },
    /**
     * 新增
     */
    async addPlanItem(formData, btnStatus) {
      const newList = this.list.map(item => {
        delete item["taskList"];
        return item;
      });
      let arr = [];
      // 分出必传表格附件
      this.uploadTableData.forEach(item => {
        item.list &&
          item.list.forEach(items => {
            arr.push(items);
          });
      });
      const { code, data } = await createProjectItem(
        {
          summary: formData,
          approve: this.approve,
          list: newList,
          linesProblemList: this.problemList,
          linesTaskList: this.linesTaskList,
          attachedList: [...this.attachedList, ...arr],
          attachedTypeCode: this.uploadParams.bizTypeCode
        },
        "summary"
      );
      if (code === 1) {
        this.addEditFormModel.resetFields();
        this.selectRows = [];
        this.approve = [];
        this.list = [];
        this.showAttachedList = [];
        this.showAttachedList1 = [];
        if (btnStatus === 1) {
          this.$router.push({ name: "summary" });
        } else {
          this.$router.push({
            name: "summary",
            query: { id: data.id, type: "edit" }
          });
          setTimeout(() => {
            this.getProjectPlanDetails({ id: data.id, type: "edit" });
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
     * 项目编辑
     */
    async updatePlanItem(id, formData, btnStatus) {
      const newList = this.list.map(item => {
        delete item["taskList"];
        return item;
      });
      let arr = [];
      // 分出必传表格附件
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
            summary: formData,
            list: newList,
            linesProblemList: this.problemList,
            linesTaskList: this.linesTaskList,
            attachedList: [...this.attachedList, ...arr],
            approve: this.approve,
            attachedTypeCode: this.uploadParams.bizTypeCode
          }
        },
        "summary"
      );
      if (code === 1) {
        if (btnStatus === 1) {
          this.$router.push({ name: "summary" });
        } else {
          const { id, type } = this.$route.query;
          this.getProjectPlanDetails({ id, type });
        }

        this.$message({
          type: "success",
          message: " 操作成功"
        });
        this.loadingSave = false;
        this.loadingSubmit = false;
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
        const employeeName = decomposeStringToJson(formData.employeeName, [
          "employeeName",
          "employeeNumber"
        ]);
        const typeCode = decomposeStringToJson(formData.type, [
          "type",
          "typeCode",
          "typeCodeQuery"
        ]);
        const pgSummaryType = decomposeStringToJson(formData.pgSummaryType, [
          "pgSummaryType",
          "pgSummaryTypeCode"
        ]);
        let productName = decomposeStringToJson(formData.projectName, [
          "projectName",
          "projectNumber",
          "projectId"
        ]);
        this.currentItem.id &&
          (formData = { ...this.currentItem, ...formData });
        const params = {
          ...formData,
          ...employeeName,
          ...typeCode,
          ...productName,
          ...status,
          ...pgSummaryType,
          pgType: "0"
        };

        if (btnStatus === 1 && !getStatus(this.uploadTableData)) {
          return;
        }
        if (btnStatus === 0) {
          this.loadingSave = true;
        } else {
          this.loadingSubmit = true;
        }

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
      // const { codeType } = this.$route.query;
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