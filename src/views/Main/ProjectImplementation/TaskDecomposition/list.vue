<template>
  <div class="bg-white">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix flex flex-center-between">
        <span>任务分解-树</span>
        <!-- <el-button size="small" type="primary" icon="el-icon-plus" @click="showModel">{{title}}</el-button> -->
      </div>
      <!-- {{getUserInfo}} -->
      <div class="user-form-search">
        <form-create
          v-model="searchFormModel"
          @form-search-click="formSearchMethod"
          @form-reset-click="formResetMethod"
          :rule="searchFormRule"
          :option="searchOption"
        ></form-create>
      </div>
      <div class="user-form-table mt20">
        <vxe-table
          border="inner"
          :header-cell-style="{background:'#f3f3f3'}"
          :row-key="true"
          row-id="id"
          show-overflow
          ref="xTree"
          size="small"
          highlight-current-row
          highlight-hover-row
          :tree-config="{lazy: getUserInfo&&getUserInfo.confined === 1 ? false : true,
          iconOpen: 'el-icon-remove',
          iconClose: 'el-icon-circle-plus',
          line: true,
          children: 'children',
          hasChild: 'finalFlag',
          loadMethod: load
    }"
          :tooltip-config="{enterable:true}"
          :data="tableData"
        >
          <vxe-table-column field="taskNumber" title="任务编号" width="200" tree-node></vxe-table-column>
          <vxe-table-column field="taskName" title="任务名称" width="200"></vxe-table-column>
          <vxe-table-column field="taskTarget" title="任务指标" min-width="300"></vxe-table-column>
          <vxe-table-column field="empolyeeName" title="责任人" width="100"></vxe-table-column>
          <vxe-table-column field="year" title="年度" width="100"></vxe-table-column>
          <vxe-table-column field="summaryType" title="计划类型" width="100"></vxe-table-column>
          <vxe-table-column field="nodeType" title="节点类型" width="100"></vxe-table-column>


          <!-- <vxe-table-column field="startDate" title="开始日期" width="100"></vxe-table-column>
          <vxe-table-column field="endDate" title="结束日期" width="100"></vxe-table-column>-->
          <vxe-table-column field="performance" title="主要完成情况" width="150"></vxe-table-column>
          <vxe-table-column field="status" title="状态" width="50"></vxe-table-column>
          <vxe-table-column field="performance" fixed="right" width="200" title="操作" align="center">
            <template v-slot="{row}">
              <el-button
                type="text"
                v-if="row.finalFlag&&row.projectStatusCode!=='2005106'&&row.statusCode==='2049101'&&row.nodeTypeCode!=='316001'"
                @click="opeationDeclaration(row,'add')"
              >新增子任务</el-button>

              <el-button
                type="text"
                v-if="row.parentId&&row.projectStatusCode!=='2005106'"
                @click="opeationDeclaration(row,'edit')"
              >编辑</el-button>
              <el-button
                type="text"
                class="ml10"
                @click="opeationDeclaration(row,'view')"
                v-if="row.parentId"
              >查看</el-button>
              <el-popconfirm title="确认删除该条记录吗?" @onConfirm="opeationDeclaration(row,'delete')">
                <el-button
                  slot="reference"
                  class="ml10"
                  type="text"
                  size="mini"
                  v-if="row.parentId&&row.projectStatusCode!=='2005106'&&(getUserInfo&&getUserInfo.username===row.createdBy)&&row.statusCode!=='2049103'"
                >删除</el-button>
              </el-popconfirm>
            </template>
          </vxe-table-column>
        </vxe-table>
        <common-pagination v-on:handler-currentPage="handlerCurrentPage" :list="searchForm"></common-pagination>
      </div>
    </el-card>

    <el-drawer :visible.sync="show" size="50%" :before-close="handleClose" :wrapperClosable="false">
      <span slot="title">{{title}}</span>
      <div class="p10">
        <form-create
          @task-change="taskTypeChange"
          v-model="addFormDrawerModel"
          :rule="addFormDrawerRule"
          :option="addFormDrawerOptions"
        ></form-create>
        <!-- <div v-show="taskType!==''">
          <common-upload
            v-on:get-file-list="getFileList"
            :show-type="type"
            :show-attached-list="showAttachedList"
            :upload-params="uploadParams[taskType]"
          ></common-upload>
        </div> -->
        <el-row :gutter="20" class="mt30 md20" v-if="['edit','add'].includes(type)">
          <el-col :span="8" :offset="3">
            <el-button type="primary" class="w-100" @click="submitDramedData">提交</el-button>
          </el-col>
          <el-col :span="8" :offset="3">
            <el-button class="w-100" @click="handleClose">取消</el-button>
          </el-col>
        </el-row>
      </div>
    </el-drawer>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from "vuex";
import { searchFormRule, addFormDrawerRule, allType } from "./rules";
import { deepCloneClear, getMonthFirst, getMonthLast } from "@/utils/tools";
import {
  globalMessage,
  transformValueAndLabel,
  decomposeStringToJson
} from "@/utils/tools";
import {
  // getTaskList,
  // getDeleteTaskItem,
  // addTaskItem,
  // updateTaskItem,
  // getProjectTaskDetails
  getProjectList,
  deleteProjectItem,
  createProjectItem,
  getProjectDetails,
  updateProjectItem,
  getProjectParamsItems
} from "@/service/project";
import commonUpload from "@/components/CommonUpload";
import XEUtils from "xe-utils";
export default {
  name: "apply",
  components: { commonUpload },
  data() {
    return {
      taskObj: ["", "scientificTask", "technologyTask", "engineeringTask"],
      title: "新增任务",
      taskType: "",
      show: false,

      statusCode: {
        2005101: true,
        2005102: false,
        2005105: true
      },
      tableData: [],
      taskDrameProject: [],
      searchFormModel: {},
      searchFormRule: searchFormRule,
      searchOption: {
        resetBtn: false,
        submitBtn: false
      },
      taskId: "",
      addFormDrawerModel: {},
      addFormDrawerRule: addFormDrawerRule(this),
      addFormDrawerOptions: {
        //表单提交事件
        resetBtn: false,
        submitBtn: false
      },
      searchForm: {
        parentId: "",
        pageNum: 1,
        pageSize: 10,
        total: 0,
        dataType: 2
      },
      currentItem: {},
      showAttachedList: [],
      uploadParams: {
        "1": {
          bizType: "科研任务", //业务分类
          bizTypeCode: "2013107" //业务类型编码
        },
        "2": {
          bizType: "技术服务任务", //业务分类
          bizTypeCode: "2013108" //业务类型编码
        },
        "3": {
          bizType: "工程示范任务", //业务分类
          bizTypeCode: "2013109" //业务类型编码
        }
      },
      attachedList: [],
      type: "",
      tempCurrentItem: {},
      expandRowKeys: []
    };
  },
  created() {
    this.$store.dispatch("setHeight", 100);
    this.getTaskList();
  },
  computed: {
    ...mapGetters(["getAuthObj", "getUserInfo"])
  },
  mounted() {
    this.initData();
  },
  methods: {
    submitDramedData() {
      this.addFormDrawerModel.submit(formData => {
        //按钮进入提交状态
        this.addFormDrawerModel.submitBtnProps({ loading: true });
        this.submitTaskItem(formData);
      });
    },
    /**
     * 删除行
     */
    removeEvent(row) {
      let xTree = this.$refs.xTree;
      let matchObj = XEUtils.findTree(this.tableData, item => item === row);
      if (matchObj) {
        let { items, index } = matchObj;
        // 从树节点中移除
        let restRow = items.splice(index, 1)[0];
      }
      xTree.syncData();
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
     *切换添加科研 | 工程 |技术 任务
     */
    async taskTypeChange(val = "") {
      this.taskType = val;
      if (val) {
        const taskObj = JSON.parse(JSON.stringify(allType()[val]));
        this.addFormDrawerModel.reload([
          ...addFormDrawerRule(this),
          ...taskObj
        ]);
        // if (["2", "3"].includes(val)) {
        //   this.getTaskList({ level1: 0, pageNum: 1, pageSize: -1 });
        // }
        this.$nextTick(() => {
          this.addFormDrawerModel.setValue("taskType", val);
        });
        this.getDutyPersonList(this.taskId);
      }
      this.addFormDrawerModel.refresh(true);
      //切换赋值
      if (this.type === "add") {
        this.setValueDrawerModel(this.currentItem);
      }
    },
    /**
     * 改变计划类型---出现年份
     */
    summaryTypeChange(val) {
      const d = (val && val.split("⭐")[1]) || "";
      const bool = ["2018002", "2018003"].includes(d);
      this.$nextTick(() => {
        this.addFormDrawerModel.hidden(bool, "month");
        if (bool) {
          this.addFormDrawerModel.setValue("month", "");
        }
        // this.addFormDrawerModel.updateRule("month", {
        //   validate: [
        //     { required: !bool, message: "报告月份不能为空", trigger: "blur" }
        //   ]
        // });
      });
    },
    /**
     * 获取上传列表
     */
    getFileList(list) {
      this.attachedList = list;
    },

    /**
     * 编辑和删除
     * @param {*} obj d当前操作数据
     * @param string type 类型 eidt | delete
     */
    async opeationDeclaration(obj, type) {
      this.tempCurrentItem = obj;
      this.currentItem = obj;
      this.type = type;
      this.taskId = obj.id;
      if (type !== "delete") {
        this.getDutyPersonList(obj.id);
      }
      switch (type) {
        case "edit":
          this.show = true;
          this.getProjectTaskDetails(obj.id);
          break;
        case "delete":
          const { code, data } = await deleteProjectItem(
            {
              id: obj.id
            },
            "task"
          );
          if (code === 1) {
            //删除查询操作
            this.removeEvent(obj);
            //  this.getTaskList({ pageNum: this.searchForm.pageNum });
            this.$message({
              type: "success",
              message: "操作成功"
            });
          }

          break;
        case "add":
          this.show = true;
          this.taskType = "";
          this.$nextTick(() => {
            this.taskTypeChange("1");
            this.addFormDrawerModel.disabled(false);
            this.addFormDrawerModel.disabled(true, "taskNumber");
            const formData = this.addFormDrawerModel.formData();
            let clearFormData = deepCloneClear(formData);
            this.addFormDrawerModel.setValue(clearFormData);
            //切换赋值
            this.setValueDrawerModel(obj);
          });
          break;
        case "view":
          this.show = true;
          this.getProjectTaskDetails(obj.id);

          break;
        default:
          break;
      }
    },

    /**
     * 切换赋值
     */
    setValueDrawerModel(obj) {
      setTimeout(() => {
        this.addFormDrawerModel.setValue({
          nodeType: "无⭐316004",
          status: "打开⭐2049101",
          empolyeeCombobox: obj.empolyeeCombobox,
          partakeEmpolyeeCombobox: JSON.parse(
            obj.partakeEmpolyeeCombobox || "[]"
          ),
          keyWordsList: obj.keyWordsList || [],
          keyWordsProList: obj.keyWordsProList || []
        });
      }, 300);
    },
    /**
     *  查询责任人（一级任务的责任人只能选择项目成员里的人员。 子级任务的责任人只能选择父级任务里的责任人）
     * @param {*} params
     */
    async getDutyPersonList(taskId) {
      const { code, data } = await getProjectParamsItems(
        { taskId },
        "duty-person",
        "project/hr/"
      );

      if (code === 1) {
        let options = await transformValueAndLabel(data, [
          "empolyeeName",
          "empolyeeNumber"
        ]);
        this.addFormDrawerModel.updateRules(
          {
            empolyeeCombobox: {
              options
            },
            partakeEmpolyeeCombobox: {
              options
            }
          },

          true
        );
      }
    },

    /**
     * 查询
     */
    formSearchMethod(self) {
      let formData = self.$f.formData();
      formData.level1 =
        formData.level1 && formData.level1 > 0 ? formData.level1 - 1 : "";
      this.searchForm = {
        ...this.searchForm,
        ...formData,
        pageNum: 1,
        pageSize: 10,
        total: 0
      };
      console.log(this.searchForm)
      this.getTaskList();
    },
    /**
     * 重置
     */
    formResetMethod(self) {
      self.$f.resetFields();
      this.initData();
      this.formSearchMethod(self);
    },
    /**
     * 初始化查询数据
     */
    initData() {
      const formData = this.searchFormModel.formData();
      let clearFormData = deepCloneClear(formData);
      this.searchFormModel.setValue(clearFormData);
    },
    /**
     * 分页查询
     */
    handlerCurrentPage(list) {
      this.searchForm = {
        ...this.searchForm,
        ...list
      };
      this.getTaskList();
    },
    /**
     * 查询任务分解列表
     */
    async getTaskList(params = {}) {
      const { code, data, total } = await getProjectList(
        {
          ...this.searchForm,
          ...params
        },

        "task"
      );
      if (code === 1) {
        const newData = arr => {
          return arr.map(item => {
            if (item.children && item.children.length > 0) {
              newData(item.children);
            }
            item.id = item.id + "";
            return item;
          });
        };
        const newNodeData = newData(data||[]);

        this.tableData = newNodeData;

        this.searchForm.total = total;
      }
    },
    async load({ row }) {
      const { code, data, total } = await getProjectList(
        {
          parentId: row.id,
          level1: parseInt(row.level1) + 1
        },
        "task"
      );

      return data;
      //resolve(data)
    },
    //表单提交事件
    submitTaskItem(formData) {
      // this.addFormDrawerModel.submit(formData => {
      //按钮进入提交状态
      formData.taskType = parseInt(formData.taskType);
      let tempPartakeEmpolyee = formData.partakeEmpolyeeCombobox.slice();

      const {
        empolyeeName,
        empolyeeNum
      } = decomposeStringToJson(formData.empolyeeCombobox, [
        "empolyeeName",
        "empolyeeNum"
      ]);

      formData.empolyeeName = empolyeeName;
      formData.empolyeeNum = empolyeeNum;

      formData.partakeEmpolyeeName = this.splitEmpolyee(tempPartakeEmpolyee)[0];
      formData.partakeEmpolyeeNum = this.splitEmpolyee(tempPartakeEmpolyee)[1];
      formData.partakeEmpolyeeCombobox = JSON.stringify(
        formData.partakeEmpolyeeCombobox
      );

      let status = decomposeStringToJson(formData.status, [
        "status",
        "statusCode"
      ]);

      let { nodeType, nodeTypeCode } = decomposeStringToJson(
        formData.nodeType,
        ["nodeType", "nodeTypeCode"]
      );
      formData.nodeType = nodeType;
      formData.nodeTypeCode = nodeTypeCode;

      // 技术关键词
      const _tempKeyWordsList = [
        ...new Set((formData.keyWordsList || "").toString().split(","))
      ]; //技术关键词
      formData.keyWords = this.splitEmpolyee(_tempKeyWordsList)[0] || "";
      formData.keyWordsCode = this.splitEmpolyee(_tempKeyWordsList)[1] || "";
      //产品关键词
      const _tempKeyWordsProList = [
        ...new Set((formData.keyWordsProList || "").toString().split(","))
      ]; //产品关键词
      formData.keyWordsPro = this.splitEmpolyee(_tempKeyWordsProList)[0] || "";
      formData.keyWordsCodePro =
        this.splitEmpolyee(_tempKeyWordsProList)[1] || "";
      //里程碑节点
      const _tempMilestoneNode = formData.milestoneNodeList || []; //混凝土/材料类别
      formData.milestoneNode = this.splitEmpolyee(_tempMilestoneNode)[0] || "";
      formData.milestoneNodeCode =
        this.splitEmpolyee(_tempMilestoneNode)[1] || "";
      // return
      // console.log(formData);
      // return;
      if ([2, 3].includes(formData.taskType)) {
        const _tempTechDirection = formData.techDirectionList || []; //技术需求 方向
        formData.techDirection =
          this.splitEmpolyee(_tempTechDirection)[0] || "";
        formData.techDirectionCode =
          this.splitEmpolyee(_tempTechDirection)[1] || "";

        const _tempApplicationCategory = formData.applicationCategoryList || []; //任务种类
        formData.applicationCategory =
          this.splitEmpolyee(_tempApplicationCategory)[0] || "";
        formData.applicationCategoryCode =
          this.splitEmpolyee(_tempApplicationCategory)[1] || "";

        //区域
        let area = decomposeStringToJson(formData.area, ["area", "areaCode"]);
        formData = { ...formData, ...area };

        //关联任务
        let { refTaskId, refTaskNumber } =
          (formData.refTaskList &&
            decomposeStringToJson(formData.refTaskList, [
              "taskName",
              "refTaskId",
              "refTaskNumber"
            ])) ||
          {};

        formData.refTaskId = refTaskId || "";
        formData.refTaskNumber = refTaskNumber || "";

        delete formData["refTaskList"];
      }
      const {
        summaryType,
        summaryTypeCode
      } = decomposeStringToJson(formData.summaryType, [
        "summaryType",
        "summaryTypeCode"
      ]);
      formData.summaryTypeCode = summaryTypeCode;
      formData.summaryType = summaryType;
      // console.log(formData);

      // 以上是公共参数
      // 1 科研
      if (formData.taskType === 1) {
        let _tempProjectList = formData.projectList || [];
        let _refProjectNumber = [],
          _refProjectId = [];

        _tempProjectList.map(item => {
          const _tempItem = item.split("⭐");
          _refProjectNumber.push(_tempItem[1]);
          _refProjectId.push(_tempItem[2]);
        });

        formData.refProjectId = _refProjectId.toString();
        formData.refProjectNumber = _refProjectNumber.toString();
      } else if (formData.taskType === 2) {
        // 2技术

        const _tempConcreteMaterial = formData.concreteMaterialList || []; //混凝土/材料类别
        formData.concreteMaterial =
          this.splitEmpolyee(_tempConcreteMaterial)[0] || "";
        formData.concreteMaterialCode =
          this.splitEmpolyee(_tempConcreteMaterial)[1] || "";

        const _tempProblemType = formData.problemTypeList || []; //问题种类
        formData.problemsTypes = this.splitEmpolyee(_tempProblemType)[0] || "";
        formData.problemsTypesCode =
          this.splitEmpolyee(_tempProblemType)[1] || "";
      } else if (formData.taskType === 3) {
        //3 工程

        const _tempApplicationClassfication =
          formData.applicationClassficationList || []; //应用分类
        formData.applicationClassfication =
          this.splitEmpolyee(_tempApplicationClassfication)[0] || "";
        formData.applicationClassficationCode =
          this.splitEmpolyee(_tempApplicationClassfication)[1] || "";

        const _tempProduct = formData.productList || []; //产品/材料
        formData.product = this.splitEmpolyee(_tempProduct)[0] || "";
        formData.productCode = this.splitEmpolyee(_tempProduct)[1] || "";
      }

      let params = {};
      params[this.taskObj[formData.taskType]] = {
        ...formData,
        ...status
      };

      params.attachedList = this.attachedList;
      params.attachedTypeCode = this.uploadParams[
        formData.taskType
      ].bizTypeCode;
      params.taskType = formData.taskType; //任务【1-科研，2-技术服务，3-工程】
      if (this.type === "edit") {
        //从任务中带出的参数
        params[this.taskObj[formData.taskType]] = {
          ...this.currentItem,
          ...params[this.taskObj[formData.taskType]]
        };
        //深拷贝参数文件，后续合并到列表数据中

        this.editTask(this.currentItem.id, params);
      } else if ((this.type = "add")) {
        const { headerId, year, projectId, id, level1 } = this.currentItem;
        let lv = parseInt(level1) + 1;

        params[this.taskObj[formData.taskType]] = {
          ...params[this.taskObj[formData.taskType]],
          parentId: id,
          headerId,
          projectId,
          year,
          level1: lv
        };
        //深拷贝参数文件，后续合并到列表数据中

        this.addTask(params);
      }
      // });
    },
    /**
     * 新增任务
     */
    async addTask(formData) {
      const { code, data } = await createProjectItem(formData, "task");
      if (code === 1) {
        if (!Array.isArray(this.tempCurrentItem.children)) {
          this.tempCurrentItem.children = [];
          this.tempCurrentItem.children.push(data);
        } else {
          this.tempCurrentItem.children.push(data);
        }
        this.$nextTick(() => {
          Object.assign(this.currentItem, this.tempCurrentItem);
          let expandArr = this.$refs.xTree.getTreeExpandRecords();
          let bool = expandArr.find(item => item.id == data.parentId);

          if (!bool) {
            this.$refs.xTree.toggleTreeExpansion(this.tempCurrentItem); //toggleRowExpansion   //treeExpandeds
          }
        });

        this.handleClose();
        this.$message({
          type: "success",
          message: " 操作成功"
        });
        this.addFormDrawerModel.submitBtnProps({ loading: false });
      } else {
        this.addFormDrawerModel.submitBtnProps({ loading: false });
      }
    },
    /**
     * 修改任务
     */
    async editTask(id, formData) {
      const { code, data } = await updateProjectItem(
        {
          id,
          params: formData
        },
        "task"
      );
      if (code === 1) {
        this.handleClose();

        this.$nextTick(() => {
          // this.tempCurrentItem = { ...data };
          data.children = this.tempCurrentItem.children;
          Object.assign(this.tempCurrentItem, data);
        });
        this.$message({
          type: "success",
          message: " 操作成功"
        });
        this.addFormDrawerModel.submitBtnProps({ loading: false });
      } else {
        this.addFormDrawerModel.submitBtnProps({ loading: false });
      }
    },
    /**
     * 查询详情
     */
    async getProjectTaskDetails(id) {
      const { code, data } = await getProjectDetails({ id }, "task");
      if (code === 1) {
        if (!data) return;
        let { task, attachedList } = data;
        this.$nextTick(() => {
          //追加报告月份

          this.currentItem = task;

          task.taskType = (task.taskType && task.taskType.toString()) || "";
          task.partakeEmpolyeeCombobox = JSON.parse(
            task.partakeEmpolyeeCombobox || "[]"
          );
          task.nodeType =
            (task.nodeType && task.nodeType + "⭐" + task.nodeTypeCode) || "";
          this.showAttachedList = attachedList;
          this.attachedList = attachedList || [];
          this.taskType = task.taskType;
          task.refTaskList = task.refTaskList && task.refTaskList.toString();
          this.taskTypeChange(task.taskType);
          task.status =
            (task.status && task.status + "⭐" + task.statusCode) || "";
          task.summaryType =
            (task.summaryType &&
              task.summaryType + "⭐" + task.summaryTypeCode) ||
            "";

          this.addFormDrawerModel.setValue(task);

          if (this.type === "view") {
            this.addFormDrawerModel.disabled(true);
          } else if (this.type === "add") {
            this.addFormDrawerModel.disabled(false, ["taskType","nodeType"]);
          } else {
            this.addFormDrawerModel.disabled(false);
            if(task.refNodeId){
              this.addFormDrawerModel.disabled(true, "nodeType");
            }else{
              this.addFormDrawerModel.disabled(false, "nodeType");
            }
            this.addFormDrawerModel.disabled(true, "taskType");
          }

          this.addFormDrawerModel.disabled(true, "taskNumber");
          const bool = ["2018002", "2018003"].includes(task.summaryTypeCode);
          this.addFormDrawerModel.hidden(bool, "month");
        });
      }
    },
    handleClose() {
      this.addFormDrawerModel.resetFields();
      this.currentItem = {};
      this.attachedList = [];
      this.showAttachedList = [];
      this.type = "";
      this.taskType = "";
      this.show = false;
      const formData = this.addFormDrawerModel.formData();
      let clearFormData = deepCloneClear(formData);
      clearFormData.keyWordsList=[];
      clearFormData.keyWordsProList=[]
      this.addFormDrawerModel.setValue(clearFormData);

    }
  }
};
</script>

<style lang="scss" scoped>
</style>