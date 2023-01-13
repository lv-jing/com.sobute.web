<template>
  <el-card class="box-card" shadow="never">
    <div slot="header" class="clearfix flex flex-center-between">
      <span>项目计划{{$titleObj[$route.query.type]}}</span>
    </div>
    <el-tabs type="card">
      <el-tab-pane label="基本信息">
        <form-create
          v-model="addEditFormModel"
          @year-change="dateYearChange"
          :rule="addEidtFormRule"
          :option="addEditOption"
        ></form-create>
        <!-- 项目考核指标 -->

        <common-title title="原年度计划" class="md20 mt30" />
        <div class="tasks-table">
          <el-table
            :data="projectTasks"
            style="width: 100%"
            class="mt10"
            highlight-current-row
            :header-cell-style="{background:'#f3f3f3'}"
          >
            <el-table-column type="index" width="50" label="序号"></el-table-column>
            <el-table-column prop="taskName" width="320" label="原任务名称"></el-table-column>
            <el-table-column prop="taskTarget" label="原考核指标"></el-table-column>
            <el-table-column prop="year" width="100" label="年份"></el-table-column>
            <el-table-column prop="startDate" width="100" label="开始日期"></el-table-column>
            <el-table-column prop="endDate" width="100" label="结束日期"></el-table-column>
          </el-table>
        </div>

        <common-title title="项目考核指标" :is-clone="true" class="md20 mt30" />
        <div class="tasks-table">
          <el-button
            icon="iconfont sbt_add"
            type="primary"
            v-if="['add','edit'].includes($route.query.type)"
            @click="addPlan()"
          >新增</el-button>
          <el-table
            :data="tasks"
            style="width: 100%"
            class="mt10"
            highlight-current-row
            :header-cell-style="{background:'#f3f3f3'}"
          >
            <el-table-column prop="taskNumber" width="120" label="任务编号"></el-table-column>

            <el-table-column prop="taskName" width="250" label="任务名称"></el-table-column>
            <el-table-column prop="taskTarget" label="考核指标"></el-table-column>
            <el-table-column prop="empolyeeName" width="100" label="责任人"></el-table-column>
            <el-table-column prop="partakeEmpolyeeName" width="100" label="参与人"></el-table-column>
            <el-table-column prop="weight" width="70" label="预计权重"></el-table-column>
            <el-table-column label="操作" align="center" width="100">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  v-if="['add','edit'].includes($route.query.type)"
                  @click="annualClick(scope.row,scope.$index,'edit')"
                >编辑</el-button>
                <el-button
                  type="text"
                  v-if="['view','auditing'].includes($route.query.type)"
                  @click="annualClick(scope.row,scope.$index,'view')"
                >查看</el-button>
                <el-popconfirm
                  title="确认删除该条记录吗?"
                  v-if="(['add','edit'].includes($route.query.type) && planItem.statusCode!=='2005104')"
                  @onConfirm="annualClick(scope.row,scope.$index,'delete')"
                >
                  <el-button slot="reference" type="text" size="mini" circle>删除</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-drawer
            :visible.sync="show"
            size="50%"
            :before-close="handleClose"
            :wrapperClosable="false"
          >
            <span slot="title">{{title}}</span>
            <div class="p10">
              <form-create
                v-model="addFormDrawerModel"
                :rule="addFormDrawerRule"
                :option="addFormDrawerOptions"
              ></form-create>
            </div>
          </el-drawer>
        </div>

        <!--年度关键节点-->
        <common-title :title="'里程碑节点'" class="md20 mt30" />
        <div class="tasks-table">
          <el-button
            icon="iconfont sbt_add"
            type="primary"
            v-if="['add','edit'].includes($route.query.type)"
            @click="addkeyList()"
          >新增</el-button>
          <el-table
            :data="planNodeList"
            style="width: 100%"
            class="mt10"
            highlight-current-row
            :header-cell-style="{background:'#f3f3f3'}"
          >
            <el-table-column prop="taskNumber" width="120" label="任务编号"></el-table-column>
            <el-table-column prop="taskName" width="250" label="任务名称"></el-table-column>
            <el-table-column prop="taskTarget" label="考核指标"></el-table-column>
            <el-table-column prop="endDate" width="100" label="完成时间"></el-table-column>
            <el-table-column prop="empolyeeName" width="100" label="责任人"></el-table-column>
            <el-table-column prop="partakeEmpolyeeName" width="100" label="参与人员"></el-table-column>
            <!-- <el-table-column prop="comments" width="200" label="备注"></el-table-column> -->
            <el-table-column label="操作" width="100" align="center">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  v-if="['view','auditing'].includes($route.query.type)"
                  @click="handleEditkeyList(scope,'view')"
                >查看</el-button>
                <el-button
                  type="text"
                  v-if="['add','edit'].includes($route.query.type)"
                  @click="handleEditkeyList(scope,'edit')"
                >编辑</el-button>
                <el-popconfirm
                  v-if="(['add','edit'].includes($route.query.type) && planItem.statusCode!=='2005104')"
                  title="确认删除该条记录吗?"
                  @onConfirm="handleDeletekeyList(scope)"
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

            <div style="width:85%;margin:10px auto">
              <common-title title="里程碑任务名称" content="里程碑任务不能修改任务名称考核指标，如需新增新的里程碑，请清除下拉框数据后，进行操作" />
            </div>
            <div class="flex" style="width:85%;margin:10px auto" v-if="drawerType==='add'">
              <span class>里程碑任务名称：</span>
              <el-select
                class="flex-3"
                v-model="selectTaskId"
                :disabled="['view','auditing'].includes($route.query.type)"
                placeholder="请选择"
                filterable
                clearable
                @change="changeSelectTask"
              >
                <el-option
                  v-for="item in tempSelectMileList"
                  :key="item.id"
                  :label="item.taskName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>

            <div class="p15">
              <form-create
                v-model="addDrawerKeyModel"
                :rule="addDrawerKeyRule"
                :option="addDrawerKeyOptions"
              ></form-create>
            </div>
          </el-drawer>
        </div>

        <!-- 参与人员名单 -->
        <common-title :title="'参与人员名单'" class="md20 mt30" />
        <div class="tasks-table">
          <el-button
            icon="iconfont sbt_add"
            type="primary"
            v-if="['add','edit'].includes($route.query.type)"
            @click="addMembersList()"
          >新增</el-button>
          <el-table
            :data="membersList"
            style="width: 100%"
            class="mt10"
            highlight-current-row
            :header-cell-style="{background:'#f3f3f3'}"
          >
            <el-table-column prop="employeeName" label="参与人员"></el-table-column>
            <el-table-column prop="month" label="参与月份数"></el-table-column>
            <el-table-column prop="taskName" label="任务名称"></el-table-column>
            <el-table-column prop="taskTarget" label="考核指标"></el-table-column>
            <el-table-column prop="comments" label="备注"></el-table-column>
            <el-table-column
              label="操作"
              width="100"
              align="center"
              v-if="['add','edit'].includes($route.query.type)"
            >
              <template slot-scope="scope">
                <el-button type="text" @click="handleEdit(scope)">编辑</el-button>
                <el-popconfirm title="确认删除该条记录吗?" @onConfirm="handleDelete(scope)">
                  <el-button slot="reference" type="text" size="mini" circle>删除</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-drawer
            :visible.sync="showMeber"
            size="50%"
            :before-close="handleClose1"
            :wrapperClosable="false"
          >
            <span slot="title">{{txt}}</span>
            <div class="p10">
              <form-create
                v-model="addDrawerModel"
                :rule="addDrawerRule"
                :option="addDrawerOptions"
              ></form-create>
            </div>
          </el-drawer>
        </div>

        <!--年度经费预算-->
        <common-title :title="'年度经费预算'" class="md20 mt30" />
        <div class="tasks-table">
          <el-button
            icon="iconfont sbt_add"
            type="primary"
            v-if="['add','edit'].includes($route.query.type)"
            @click="addBudgetList()"
          >新增</el-button>
          <el-table
            class="mt10 mun-right"
            :data="budgetList"
            stripe
            highlight-current-row
            style="width: 100%"
            show-summary
            :summary-method="getSummaries"
            :header-cell-style="{background:'#f3f3f3'}"
            size="small"
          >
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="type" width="200" label="类型">
              <template v-slot="{row}">
                <el-select
                  v-model="row.type"
                  :disabled="['view','auditing'].includes($route.query.type)"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="amount" label="金额(万元)">
              <template v-slot="{row}">
                <el-input-number
                  v-model="row.amount"
                  :disabled="['view','auditing'].includes($route.query.type)"
                  placeholder="请输入"
                  :controls="false"
                  :min="0"
                  style="width: 100%;"
                  class="txt-right"
                />
              </template>
            </el-table-column>
            <el-table-column prop="comments" label="备注">
              <template v-slot="{row}">
                <el-input
                  v-model="row.comments"
                  :disabled="['view','auditing'].includes($route.query.type)"
                  placeholder="请输入"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="80"
              align="center"
              v-if="this.$route.query.type!=='view'&& $route.query.type!=='auditing'"
            >
              <template slot-scope="scope">
                <div class="tc">
                  <el-popconfirm
                    title="确认删除该条记录吗?"
                    @onConfirm="handleDeleteBudgetList(scope.$index)"
                  >
                    <el-button slot="reference" type="text" size="mini" circle>删除</el-button>
                  </el-popconfirm>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!--相关附件 -->
        <common-upload
          v-on:get-file-list="getFileList"
          :show-attached-list="showAttachedList"
          :upload-params="uploadParams"
        ></common-upload>
      </el-tab-pane>
      <el-tab-pane label="审批列表">
        <div class="user-form-table">
          <common-auditing-view
            v-on:handle-selection-change="handleSelectionChange"
            :select-rows="selectRows"
            :process-param="processParam"
            :status-code="planItem.statusCode||'2005101'"
          ></common-auditing-view>
        </div>
      </el-tab-pane>
    </el-tabs>
    <common-footer
      :handleSubmit="handleSubmit"
      :handleSave="handleSave"
      :is-show-button="$route.query.type!=='view'"
      :loadingSubmit="loadingSubmit"
      :loadingSave="loadingSave"
    />
  </el-card>
</template>

<script>
/* eslint-disable */
const btnFrom = {
  submitBtn: { icon: "", col: { span: 8, offset: 4 } },
  resetBtn: { icon: "", show: true, col: { span: 8, offset: 4 } }
};
import { mapState } from "vuex";
import { getDictionaryTypeName } from "@/service/system";
import {
  addFormRule,
  addFormDrawerRule,
  addDrawerRule,
  addkeyRule
} from "./rules";
import {
  decomposeStringToJson,
  transformValueAndLabel,
  deepCloneClear,
  changeMoreListWord
} from "@/utils/tools";

import {
  getProjectList,
  createProjectItem,
  getProjectDetails,
  updateProjectItem,
  getProjectParamsItems
} from "@/service/project";

import commonUpload from "@/components/CommonUpload";

export default {
  components: {
    
    commonUpload
  },
  data() {
    return {
      selectTaskId: "",
      options: [],
      loadingSubmit: false,
      loadingSave: false,
      title: "新增任务",
      show: false,
      approve: [], //审批列表
      projectTasks: [],
      tasks: [], //年度计划下面的一级任务列表
      tableData: [],
      addEditFormModel: {},
      addEidtFormRule: addFormRule(this),
      processParam: {},
      addEditOption: {
        resetBtn: false,
        submitBtn: false
      },
      addFormDrawerModel: {},
      addFormDrawerRule: [],
      addFormDrawerOptions: {
        //表单提交事件
        onSubmit: formData => {
          //按钮进入提交状态
          let summaryType = {
            summaryType: "年度",
            summaryTypeCode: "2018003"
          };
          let empolyeeName = decomposeStringToJson(formData.empolyeeCombobox, [
            "empolyeeName",
            "empolyeeNum"
          ]);
          let temp = formData.partakeEmpolyeeCombobox.slice();
          formData.partakeEmpolyeeName = this.splitEmpolyee(temp)[0];
          formData.partakeEmpolyeeNum = this.splitEmpolyee(temp)[1];
          formData.level1 = 0;
          formData.partakeEmpolyeeCombobox = JSON.stringify(
            formData.partakeEmpolyeeCombobox
          );
          //查找原任务名称
          let resObje = this.tempSelectMileList.find(
            item => item.refMilepostId == formData.refMilepostId
          );

          if (this.currentItem.uuid) {
            let tasksIndex = this.tasks.findIndex(
              item => item.uuid === this.currentItem.uuid
            );
            let newObj = Object.assign({}, this.currentItem, {
              ...formData,
              ...summaryType,
              ...empolyeeName
            });

            this.$set(this.tasks, tasksIndex, newObj);
            this.handleClose();
          } else {
            formData.uuid = this.$uuid();
            this.tasks.push({
              ...formData,
              ...summaryType,
              ...empolyeeName
            });
            this.addFormDrawerModel.resetFields();

            this.$message({
              type: "success",
              message: "操作成功"
            });
          }
        },
        ...btnFrom
      },
      selectRows: [],
      uploadParams: {
        bizType: "年度计划目标", //业务分类
        bizTypeCode: "2013106" //业务类型编码
      },
      attachedList: [], //附件
      showAttachedList: [],
      currentItem: {},
      projectId: "",
      planItem: {},
      membersList: [],
      showMeber: false,
      txt: "新增参与人员",
      addDrawerModel: {},
      addDrawerRule: [],
      addDrawerOptions: {
        //表单提交事件
        onSubmit: formData => {
          //按钮进入提交状态
          const employeeName = decomposeStringToJson(formData.employeeName, [
              "employeeName",
              "employeeNumber"
            ]),
            summaryType = { summaryType: "年度", summaryTypeCode: "2018003" };
          if (this.txt === "新增参与人员") {
            this.membersList.push({
              ...formData,
              ...employeeName,
              ...summaryType
            });
            this.addDrawerModel.resetFields();
          } else {
            this.currentItemMeber = {
              ...this.currentItemMeber,
              ...formData,
              ...employeeName,
              ...summaryType
            };
            this.$set(this.membersList, this.editIndex, this.currentItemMeber);
            this.showMeber = false;
          }

          this.$message({
            type: "success",
            message: " 操作成功"
          });
        },
        ...btnFrom
      },
      currentItemMeber: {},
      editIndex: "",
      // 年度关键节点
      planNodeList: [],
      showKeyList: false,
      txtKey: "新增里程碑节点",
      currentItemKey: {},
      editKeyIndex: "",
      addDrawerKeyModel: {},
      addDrawerKeyRule: [],
      addDrawerKeyOptions: {
        ...btnFrom,
        //表单提交事件
        onSubmit: formData => {
          let summaryType = {
            summaryType: "年度",
            summaryTypeCode: "2018003"
          };
          let empolyeeName = decomposeStringToJson(formData.empolyeeCombobox, [
            "empolyeeName",
            "empolyeeNum"
          ]);

          let temp = formData.partakeEmpolyeeCombobox.slice();
          formData.partakeEmpolyeeName = this.splitEmpolyee(temp)[0];
          formData.partakeEmpolyeeNum = this.splitEmpolyee(temp)[1];
          formData.partakeEmpolyeeCombobox = JSON.stringify(
            formData.partakeEmpolyeeCombobox
          );
          formData.level1 = 0;

          if (this.txtKey === "新增里程碑节点") {
            this.planNodeList.push({
              ...formData,
              ...empolyeeName,
              refNodeId: this.refNodeId
            });
            this.selectTaskId = "";
            this.addDrawerKeyModel.resetFields();

            this.addDrawerKeyModel.disabled(false, ["taskName", "taskTarget"]);
            this.refNodeId = "";
          } else {
            this.currentItemKey = {
              ...this.currentItemKey,
              ...formData,
              ...empolyeeName
            };
            this.$set(
              this.planNodeList,
              this.editKeyIndex,
              this.currentItemKey
            );
            this.handleKeyClose();
          }
          this.$message({
            type: "success",
            message: " 操作成功"
          });
        }
      },
      // 年度经费预算
      budgetList: [],
      tempSelectMileList: [],
      soucreList: [],
      drawerType: "add",
      currentItemProject: {}, //选择项目，当条数据
      refNodeId: "" //选择的里程碑的id
    };
  },
  mounted() {
    const { id, type } = this.$route.query;
    //详细
    if (["edit", "view", "auditing"].includes(type) && id) {
      this.getProjectPlanDetails();
    } else {
      this.initData();
    }
    this.getBudgetList();
  },

  methods: {
    /**
     * 里程碑 切换项目
     */
    changeSelectTask(val) {
      let bool = val ? true : false;
      let obj = this.tempSelectMileList.find(item => item.id == val);
      this.$nextTick(() => {
        this.addDrawerKeyModel.disabled(bool, ["taskName", "taskTarget"]);
        // if(obj){
        //refNodeId
        this.refNodeId = val;
        this.addDrawerKeyModel.setValue("taskName", obj?.taskName || "");
        this.addDrawerKeyModel.setValue("taskTarget", obj?.taskTarget || "");
        this.addDrawerKeyModel.setValue("endDate", obj?.endDate || "");
        // }
      });
    },
    /**
     * 切换月份
     */
    dateYearChange(val) {
      let newValue = new Date(val).getFullYear().toString();

      this.selectProjectAndYear(newValue, "projectList");
    },
    /**
     * 必须项目和日期同时才能
     */

    selectProjectAndYear(newValue, type, soucre = {}) {
      const routep = this.$route.query;
      let val = this.addEditFormModel.getValue(type),
        year = type === "projectList" ? newValue : val;

      if ("file_project" in soucre) {
        this.soucreList = soucre.file_project;
      }

      let decome = type === "year" ? newValue : val;
      if (decome && decome.length > 0 && year) {
        //切换项目后 情况全部数据
        this.tasks = [];
        this.planNodeList = [];
        this.membersList = [];
        let projectNumber = decomposeStringToJson(decome, [
          "projectName",
          "projectNumber",
          "id"
        ]);
        this.projectId = projectNumber.id;
        let obj = this.soucreList.find(
          item => item.projectNumber === projectNumber.projectNumber
        );
        this.currentItemProject = obj;
        this.getTargetAndMilesNodeList(projectNumber.id, year, true);
        if (obj) {
          this.$nextTick(() => {
            this.addEditFormModel.setValue(
              {
                keyWordsList: obj.keyWordsList,
                keyWordsProList: obj.keyWordsProList
              },
              true
            );
          });
        }
      } else {
        routep.type === "add" &&
          this.$message.warning(`请选择${type === "year" ? "年份" : "项目"}`);
      }
    },
    /**
     * 根据项目名称和年份获取 项目考核指标 和里程碑节点 数据
     */
    async getTargetAndMilesNodeList(projectId, year, isChange) {
      const { code, data } = await getProjectParamsItems(
        {
          projectId,
          year
        },
        "plan/confirm-node"
      );
      if (code === 1) {
        this.projectTasks = data.tasks || [];
        this.tempSelectMileList = data.planNodeList || [];
      }
    },
    /**
     * 分解责任人名称
     */
    splitEmpolyee(arr) {
      let name = [],
        name1 = [];
      arr.map(item => {
        let n = item.split("⭐");
        name.push(n[0]);
        name1.push(n[1]);
      });
      // return name.toString();
      return [name.toString(), name1.toString()];
    },
    /**
     * 新增按钮事件
     */
    async addPlan(obj = {}, t) {
      const { id, type } = this.$route.query;
      if (!this.projectId) {
        this.$message({
          type: "error",
          message: "请选择项目名称后，进行新增操作"
        });
        return;
      }
      this.show = true;

      this.$nextTick(async () => {
        this.addFormDrawerModel.reload(addFormDrawerRule(this));
        switch (t) {
          case "edit":
            this.title = "修改任务";
            if (this.currentItem.hasOwnProperty("uuid")) {
              this.addFormDrawerModel.setValue(obj);
              this.addFormDrawerModel.disabled(false);
              this.$showDrawerButton(this.addFormDrawerModel, true);
            }
            break;
          case "view":
            this.title = "查看任务";
            this.addFormDrawerModel.setValue(obj);
            this.addFormDrawerModel.disabled(true);
            this.$showDrawerButton(this.addFormDrawerModel, false);

            break;
          default:
            this.addFormDrawerModel.disabled(false);
            break;
        }
      });
    },
    /**
     *  更新计划下拉框的值
     */
    async updataPlan() {
      let options = await transformValueAndLabel(
        this.tempSelectMileList,
        ["refMilepostName", "refMilepostId"],
        false
      );
      this.addFormDrawerModel.updateRule("refMilepostId", {
        options
      });
    },

    /**
     * 初始化表单数据
     */
    initData() {
      const formData = this.addEditFormModel.formData();
      let clearFormData = deepCloneClear(formData);
      this.addEditFormModel.disabled(false);
      this.addEditFormModel.disabled(true, "documentNumber");
      clearFormData.keyWordsProList = [];
      clearFormData.keyWordsList = [];
      this.addEditFormModel.setValue(clearFormData);
    },

    /**
     *@param {*} obj 获取当条数据
     *@param Number 表格索引
     *@param String  类型 |edit| view | delete
     */
    annualClick(obj, index, type) {
      switch (type) {
        case "edit":
        case "view":
          let newObj = Object.assign({}, obj);
          newObj.partakeEmpolyeeCombobox = JSON.parse(
            newObj.partakeEmpolyeeCombobox || "[]"
          );
          this.currentItem = newObj;
          this.addPlan(newObj, type);
          break;
        case "delete":
          this.tasks.splice(index, 1);
          break;
        default:
          break;
      }
    },
    /**
     * 新增参与人员
     */
    async addMembersList() {
      if (!this.projectId) {
        this.$message({
          type: "error",
          message: "请选择项目名称后，进行新增操作"
        });
        return;
      }
      this.txt = "新增参与人员";
      this.showMeber = true;
      this.$nextTick(() => {
        this.addDrawerModel.reload(addDrawerRule(this));
      });
    },
    /**
     * 编辑参与人员
     */
    async handleEdit(scope) {
      if (!this.projectId) {
        this.$message({
          type: "error",
          message: "请选择项目名称后，进行新增操作"
        });
        return;
      }
      this.currentItemMeber = scope.row;
      this.editIndex = scope.$index;
      this.txt = "编辑参与人员";
      this.showMeber = true;
      this.$nextTick(() => {
        this.addDrawerModel.reload(addDrawerRule(this));
        this.currentItemMeber.empolyeeName =
          this.currentItemMeber.empolyeeName +
          "⭐" +
          this.currentItemMeber.empolyeeNum;
        this.addDrawerModel.setValue({ ...this.currentItemMeber });
      });
    },
    /**
     * 删除参与人员
     */
    handleDelete(scope) {
      this.membersList.splice(scope.$index, 1);
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
     * 重置格式
     */
    getRederList(list) {
      var data = [];
      list.map(item => {
        data.push({
          ...item,
          ...decomposeStringToJson(item.type, ["type", "typeCode"])
        });
      });
      return data;
    },
    /**
     * 预计权重相加
     */
    getNumber(list) {
      return list.reduce(
        (aggregated, obj) => aggregated + Number(obj.weight),
        0
      );
    },
    /**
     * 提交和保存公共方法
     */
    saveAndSubmitData(status, btnStatus) {
      const { id, type } = this.$route.query;
      this.addEditFormModel.submit(async formData => {
        if (btnStatus === 1 && this.tasks.length === 0) {
          this.$message({
            type: "error",
            message: "请添加项目考核指标"
          });
          return;
        }
        if (btnStatus === 1 && this.getNumber(this.tasks) !== 100) {
          this.$message.error("列表预计权重相加必须等于100");
          return;
        }

      let flag = this.budgetList.some(item => {
          return Number(item.amount) !== NaN && !item.type;
        });
        if (flag) {
          this.$message.error("【年度经费预算】有未完成项，请先完善信息！");
          return
        }
        formData.projectList = [formData.projectList];
        let d = changeMoreListWord(formData);

        d.projectList = d.projectList.toString();

        //查找考核指标里面是否存在已有数据
        // let _refMilepostArr = this.tasks.map(i => i.refMilepostId);
        // const _refMilepost = arr =>
        //   arr.filter(i => {
        //     if (
        //       i !== "" &&
        //       _refMilepostArr.indexOf(i) !== _refMilepostArr.lastIndexOf(i)
        //     ) {
        //       return i;
        //     }
        //   });

        // const _tempt = _refMilepost(_refMilepostArr);
        // // console.log(_tempt, _refMilepostArr);

        // if (_tempt.length > 0) {
        //   this.$message({
        //     type: "error",
        //     message: `原任务名称存在重复数据，请检查后保存或者提交.`
        //   });
        //   return;
        // }

        // formData.projectId = projectId;
        // formData.projectList = [formData.projectList];
        // delete formData["projectList"];
        let allParams = {
          plan: {
            ...formData,
            ...status,
            ...d
          },
          approve: this.approve,
          tasks: this.tasks,
          planNodeList: this.planNodeList,
          budgetList: this.getRederList(this.budgetList),
          membersList: this.membersList,
          attachedList: this.attachedList,
          attachedTypeCode: this.uploadParams.bizTypeCode
        };
        if (btnStatus === 0) {
          this.loadingSave = true;
        } else {
          this.loadingSubmit = true;
        }
        if (id && type === "edit") {
          this.updatePlanItem(id, allParams, btnStatus);
        } else {
          this.addPlanItem(allParams, btnStatus);
        }
      });
    },
    /**
     * 查询申报详细
     */
    async getProjectPlanDetails() {
      const { id, type } = this.$route.query;
      const { code, data } = await getProjectDetails({ id }, "plan");
      if (code === 1) {
        if (data === null) return;
        this.showAttachedList = [];
        this.attachedList = [];
        const {
          plan,
          approve,
          attachedList,
          tasks,
          membersList,
          planNodeList,
          budgetList,
          project
        } = data;
        this.$nextTick(() => {
          if (
            type === "view" ||
            type === "auditing" ||
            plan.statusCode === "2005104"
          ) {
            this.processParam = { bizId: id };
          }
          if (type === "view" || type === "auditing") {
            this.addEditFormModel.disabled(true);
          } else {
            this.addEditFormModel.disabled(false);
          }
          this.tasks =
            (tasks &&
              tasks.map(item => {
                item.refMilepostId =
                  (item.refMilepostId && item.refMilepostId.toString()) || "";
                return { ...item, uuid: this.$uuid() };
              })) ||
            [];

          this.getTargetAndMilesNodeList(plan.projectId, plan.year);
          this.membersList = membersList || [];
          this.planItem = plan;
          this.projectId = plan.projectId + "";
          // plan.projectList = plan.projectList;
          this.currentItemProject = project || {};
          this.selectRows = approve || [];
          this.showAttachedList = attachedList || [];
          this.attachedList = attachedList || [];
          this.planNodeList = planNodeList || [];
          this.budgetList = budgetList || [];
          this.addEditFormModel.setValue(plan);
          this.addEditFormModel.disabled(true, "documentNumber");
          this.loadingSubmit = false;
          this.loadingSave = false;
        });
      } else {
        this.loadingSubmit = false;
        this.loadingSave = false;
      }
    },
    /**
     * 项目申报新增
     */
    async addPlanItem(param, btnStatus) {
      const { code, data } = await createProjectItem(param, "plan");
      if (code === 1) {
        this.selectRows = [];
        this.showAttachedList = [];
        this.approve = [];
        this.tasks = [];

        if (btnStatus === 1) {
          this.$router.push({ name: "plan" });
        } else {
          this.$router.push({
            name: "plan",
            query: { id: data.id, type: "edit" }
          });
          setTimeout(() => {
            this.getProjectPlanDetails();
          }, 500);
        }
        this.$message({
          type: "success",
          message: " 操作成功"
        });
      } else {
        this.loadingSubmit = false;
        this.loadingSave = false;
      }
    },

    /**
     * 项目编辑
     */
    async updatePlanItem(id, params, btnStatus) {
      const { code, data } = await updateProjectItem({ id, params }, "plan");
      if (code === 1) {
        if (btnStatus === 1) {
          this.$router.push({ name: "plan" });
        }
        this.getProjectPlanDetails();

        this.$message({
          type: "success",
          message: " 操作成功"
        });
        this.loadingSubmit = false;
        this.loadingSave = false;
      } else {
        this.loadingSubmit = false;
        this.loadingSave = false;
      }
    },

    /**
     * 保存
     */
    handleSave() {
      const { statusCode } = this.planItem;
      
      if (statusCode === "2005104") {
        var status = {
          status: "已审批",
          statusCode: "2005104"
        };
      } else {
        var status = {
          status: statusCode === "2005105" ? "退回" : "新建",
          statusCode: statusCode === "2005105" ? "2005105" : "2005101"
        };
      }
      this.saveAndSubmitData(status, 0);
    },
    /**
     * 提交
     */
    handleSubmit() {
      // const { codeType } = this.$route.query;
      const { statusCode } = this.planItem;

      if (statusCode === "2005104") {
        var status = {
          status: "已审批",
          statusCode: "2005104"
        };
      } else {
        var status = {
          status: "提交",
          statusCode: "2005102"
        };
      }
      this.saveAndSubmitData(status, 1);
    },
    /**
     *  关闭项目考核指标抽屉
     */
    handleClose() {
      this.addFormDrawerModel.resetFields();
      this.show = false;
      this.currentItem = {};
    },
    /**
     * 关闭参与人员抽屉
     */
    handleClose1() {
      this.addDrawerModel.resetFields();
      this.showMeber = false;
    },
    /**
     * 年度关键节点新增
     */
    addkeyList() {
      if (!this.projectId) {
        this.$message({
          type: "error",
          message: "请选择项目名称后，进行新增操作"
        });
        return;
      }
      this.drawerType = "add";
      this.showKeyList = true;
      this.txtKey = "新增里程碑节点";
      this.$nextTick(() => {
        this.addDrawerKeyModel.reload(addkeyRule(this.projectId));
      });
    },
    /**
     * 年度关键节点编辑
     */
    handleEditkeyList(scope, type) {
      const data = JSON.parse(JSON.stringify(scope.row));
      this.showKeyList = true;
      this.editKeyIndex = scope.$index;
      this.txtKey = "编辑里程碑节点";
      this.drawerType = type;
      data.partakeEmpolyeeCombobox = JSON.parse(data.partakeEmpolyeeCombobox);
      this.currentItemKey = data;
      this.$nextTick(() => {
        this.addDrawerKeyModel.reload(addkeyRule(this.projectId));
        this.addDrawerKeyModel.setValue({ ...this.currentItemKey });
        if (type === "view") {
          this.addDrawerKeyModel.disabled(true);
          this.$showDrawerButton(this.addDrawerKeyModel, false);
          return;
        }
        if (data.refNodeId) {
          this.addDrawerKeyModel.disabled(true, ["taskName", "taskTarget"]);
        }
      });
    },
    /**
     * 年度关键节点删除
     */
    handleDeletekeyList(scope) {
      this.planNodeList.splice(scope.row.$index, 1);
    },
    /**
     * 关闭关键节点
     */
    handleKeyClose() {
      this.selectTaskId = "";
      this.showKeyList = false;
      this.addDrawerKeyModel.resetFields();
    },
    /**
     * 新增的时候默认经费来源表格数据
     */
    async getBudgetList() {
      const { type } = this.$route.query;
      const { code, data } = await getDictionaryTypeName({
        typeName: "BUDGET_TYPE"
      });
      if (code === 1) {
        const options = await transformValueAndLabel(data, ["name", "code"]);
        this.options = options;
        if (type === "add") {
          options.map(item => {
            this.budgetList.push({
              type: item.value,
              amount: 0,
              comments: ""
            });
          });
        }
      }
    },
    /**
     * 年度经费预算新增
     */
    addBudgetList() {
      let temp = {
        amount: 0,
        comments: ""
      };
      if (this.budgetList.length > 0) {
        let flag = this.budgetList.some(item => {
          return Number(item.amount) !== NaN && !item.type;
        });
        if (!flag) {
          this.budgetList.unshift(Object.assign({}, temp));
        } else {
          this.$message.error("类型，金额，必填，请先完善信息再进行添加！");
        }
      } else {
        this.budgetList.unshift(temp);
      }
    },
    /**
     *年度经费预算删除
     */
    handleDeleteBudgetList(index) {
      this.budgetList.splice(index, 1);
    },
    /**
     * 项目来源合计
     * @param val
     */
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      let num = 0;
      let num1 = 0;
      let num2 = 0;
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        data.map(item => {
          if (column.property == "specialAmount") {
            let amount = Number(item.specialAmount || 0);
            sums[index] = num += amount;
          } else if (column.property == "amount") {
            let amount = Number(item.amount || 0);
            sums[index] = num1 += amount;
          } else if (column.property == "otherAmount") {
            let amount = Number(item.otherAmount || 0);
            sums[index] = num2 += amount;
          } else {
            sums[index] = "";
          }
        });
      });
      sums[2] = sums[2] ? sums[2].toFixed(2) + "万元" : "";
      sums[3] = sums[3] ? sums[3].toFixed(2) + "万元" : "";
      sums[4] = sums[4] ? sums[4].toFixed(2) + "万元" : "";
      return sums;
    }
  }
};
</script>

<style lang="scss">
.txt-right {
  .el-input__inner {
    text-align: right;
  }
}

.mun-right {
  .el-table__footer-wrapper {
    .has-gutter {
      .is-leaf {
        text-align: right;
      }
    }
  }
}
</style>