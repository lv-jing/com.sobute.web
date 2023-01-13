<template>
  <el-card class="box-card" shadow="never">
    <div slot="header" class="clearfix flex flex-center-between">
      <span>知识产权{{$titleObj[$route.query.type]}}</span>
    </div>
    <el-tabs type="card" v-model="activeName">
      <el-tab-pane label="基本信息" name="1">
        <form-create v-model="addEditFormModel" :rule="addEidtFormRule" :option="addEditOption"></form-create>
        <div v-show="apploveTableCode.statusCode==='2005104'">
          <form-create
            v-model="addEditFormModel1"
            :rule="addEidtFormRule1"
            :option="addEditOption1"
          ></form-create>
          <!-- 费用信息  -->

          <template v-for="(table,index) of allTableList">
            <div class="md20" :key="index">
              <common-title :title="table.title" class="md10" />
              <el-button
                v-show="userShow"
                type="primary"
                icon="iconfont sbt_add"
                @click="handleDrawerList(table.type)"
              >新增</el-button>
              <el-table
                class="mt10"
                :data="tableList[`patent${table.type}List`]"
                stripe
                highlight-current-row
                style="width: 100%"
                :header-cell-style="{background:'#f3f3f3'}"
              >
                <template v-for="(item,_index) of table.list">
                  <el-table-column
                    :type="item.type"
                    :prop="item.prop"
                    :label="item.label"
                    :key="_index"
                  ></el-table-column>
                </template>

                <el-table-column label="操作" align="center" width="120" v-if="userShow">
                  <template slot-scope="scope">
                    <div class="tc">
                      <el-button
                        type="text"
                        @click="handleEditeClick(scope,table.type)"
                        size="mini"
                        circle
                      >编辑</el-button>
                      <el-popconfirm
                        title="确认删除该条记录吗?"
                        @onConfirm="handleDelete(scope.$index,table.type)"
                      >
                        <el-button slot="reference" type="text" size="mini" circle>删除</el-button>
                      </el-popconfirm>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </template>
        </div>
        <common-required-upload
          :uploadShow="true"
          :uploadParams="uploadParamsOne"
          @getUploadTable="getUploadTable"
          :attachedTable="attachedTable"
        />
        <!-- 相关附件 -->
        <common-upload
          v-on:get-file-list="getFileList"
          :upload-params="uploadParams"
          :show-attached-list="showAttachedList"
        />
      </el-tab-pane>
      <el-tab-pane label="审批列表" name="2">
        <div class="user-form-table">
          <common-auditing-view
            v-on:handle-selection-change="handleSelectionChange"
            :select-rows="selectRows"
            :process-param="processParam"
            :userShow="userShow"
            :status-code="apploveTableCode.statusCode||'2005101'"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
    <common-footer
      :handleSubmit="handleSubmit"
      :handleSave="handleSave"
      :loadingSubmit="loadingSubmit"
      :loadingSave="loadingSave"
    />
    <el-drawer
      :visible.sync="show"
      direction="rtl"
      :wrapperClosable="false"
      size="50%"
      :before-close="handleClose"
    >
      <div slot="title" v-text="drawerTitle"></div>
      <div class="p15">
        <drawer-component
          :is-type="isType"
          :rule-type="componentsForm"
          :edit-data="currentItem"
          :all-patent-table-list="allPatentTableList"
          v-on:drawer-data="drawerBackData"
        ></drawer-component>
      </div>
    </el-drawer>
  </el-card>
</template>

<script>
/* eslint-disable */
import { allTableList } from "./component/tableRow";
import { addFormRule, addFormRule1 } from "./rules";
import CommonUpload from "@/components/CommonUpload";
import EidtTable from "@/components/EidtTable";
import { decomposeStringToJson, getStatus } from "@/utils/tools";
import {
  postAddRpm,
  updateRpm,
  getRpmDetail,
  getIsUser
} from "@/service/results";
import { mapState } from "vuex";
import Cookies from "js-cookie";
import CommonRequiredUpload from "@/components/CommonRequiredUpload";
import drawerComponent from "./component/drawer-component";

export default {
  components: {
    CommonUpload,
    EidtTable,
    CommonRequiredUpload,
    drawerComponent
  },
  data() {
    return {
      allTableList: allTableList,
      apploveTableCode: {},
      loadingSubmit: false,
      loadingSave: false,
      userShow: false, // 是否是管理员
      activeName: "1",
      // 费用抽屉
      drawerTitle: "",
      drawerIndex: "",
      projectId: "",
      currentItem: {},
      patentBaseInfo: {},
      patentOtherInfo: {},
      show: false,
      // 期限抽屉
      showTwo: false,
      drawerTwoTitle: "",
      drawerTwoIndex: "",
      currentTwoItem: {},
      attachedList: [],
      showAttachedList: [],
      processParam: {}, // 审批记录请求参数
      selectRows: [], // 审批列表回填
      approve: [], // 审批列表列表
      uploadParams: {
        bizType: "知识产权", //业务分类
        bizTypeCode: "2013118" //业务类型编码
      },
      uploadParamsOne: {
        bizType: "新建阶段", //业务分类
        bizTypeCode: "2102900", //业务类型编码
        bizSubType: "",
        bizSubTypeCode: "" //业务类型编码
      },
      uploadTableData: [],
      attachedTable: [],
      isShow: this.$route.query.type == "view" ? false : true, // 上传组件是否可以上传
      addEditFormModel: {},
      addEidtFormRule: addFormRule(this),
      addEditOption: {
        resetBtn: false,
        submitBtn: false,
        form: {
          size: "small"
        }
      },

      addEditFormModel1: {},
      addEidtFormRule1: addFormRule1,
      addEditOption1: {
        resetBtn: false,
        submitBtn: false,
        form: {
          size: "small"
        }
      },
      componentsForm: "",
      isType: "add",
      tableList: {
        patentExpenseList: [],
        patentAllotteList: [], //// 期限信息表格
        patentChangeList: [],
        patentPermitList: [],
        patentPledgeList: [],
        patentTransList: []
      },
      allPatentTableList: []
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.common.userInfo
    })
  },
  created() {
    const { statusCode } = this.$route.query;
    if (statusCode === "2005104") {
      this.getIsUser();
    }
    Cookies.set("approvalType", "");
  },
  mounted() {
    const { type } = this.$route.query;
    if (type === "view" || type === "auditing") {
      this.getPilotDetails();
      this.addEditFormModel.disabled(true);
      this.addEditFormModel1.disabled(true);
    } else {
      this.addEditFormModel.disabled(false);
      this.addEditFormModel1.disabled(false);
      this.addEditFormModel.disabled(true, ["documentNumber", "status"]);
      if (type === "add") {
        this.initData();
      } else {
        this.getPilotDetails();
      }
    }

    //详细
  },
  methods: {
    onChangesLeavel(val) {
      const char = val.split("⭐")[0];
      let required = ["A", "B"].includes(char);
      this.addEditFormModel.updateRule("patentFlag", {
        validate: [{ required, message: "请选择专利包名称", trigger: "blur" }]
      });
    },
    /**
     * 抽屉回传值
     */
    drawerBackData({ type, list }) {
      // console.log(data);
      this.tableList[type] = list;
    },

    /**
     * 获取必传附件表格数据
     */
    getUploadTable(data) {
      this.uploadTableData = data;
    },
    /**
     * 判断是否是专利管理员
     */
    async getIsUser() {
      const { type } = this.$route.query;
      const { code, data } = await getIsUser();
      if (code === 1) {
        this.userShow = data;
        if (data && type === "edit") {
          this.addEditFormModel.disabled(false);
          this.addEditFormModel.disabled(true, ["documentNumber", "status"]);
        }
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
        let user = this.userInfo;
        (formData.proposer = user ? user.idName + "⭐" + user.username : ""),
          this.addEditFormModel.setValue(formData);
      });
    },
    /**
     * 详情
     */
    async getPilotDetails() {
      const { code, data } = await getRpmDetail({
        id: this.$route.query.id
      });
      if (code === 1) {
        this.$nextTick(() => {
          const { id, type } = this.$route.query;
          if (["view", "auditing"].includes(type)) {
            this.processParam = {
              bizId: id
            };
          }
          if (type === "edit" && this.userShow) {
            this.processParam = {
              bizId: id
            };
          }
          let patentBaseInfo = data.patentBaseInfo || {};
          let patentOtherInfo = data.patentOtherInfo || {};
          this.tableList.patentChangeList = data.patentChangeList || []; //著录项目变更信息
          this.tableList.patentPermitList = data.patentPermitList || []; //许可信息
          this.tableList.patentPledgeList = data.patentPledgeList || []; //质押信息
          this.tableList.patentTransList = data.patentTransList || []; //转让信息

          this.apploveTableCode = patentBaseInfo;
          let obj = {
            proposalDepartment: patentBaseInfo.proposalDepartment
              ? patentBaseInfo.proposalDepartment +
                "⭐" +
                patentBaseInfo.proposalDepartmentCode
              : "",
            proposer: patentBaseInfo.proposer
              ? patentBaseInfo.proposer + "⭐" + patentBaseInfo.proposerNumber
              : "",
            applicant: patentBaseInfo.applicant
              ? patentBaseInfo.applicant + "⭐" + patentBaseInfo.applicantCode
              : "",
            applicationTypeCode: patentBaseInfo.applicationTypeCode.split(","),
            patentLevel: patentBaseInfo.patentLevel
              ? patentBaseInfo.patentLevel +
                "⭐" +
                patentBaseInfo.patentLevelCode
              : "",
            patentFlag: patentBaseInfo.patentFlag
              ? patentBaseInfo.patentFlag + "⭐" + patentBaseInfo.patentFlagCode
              : ""
          };
          if (this.userShow) {
            let obj1 = {
              patentClass: patentOtherInfo.patentClass
                ? patentOtherInfo.patentClass +
                  "⭐" +
                  patentOtherInfo.patentClassCode
                : "",
              legalStatus: patentOtherInfo.legalStatus
                ? patentOtherInfo.legalStatus +
                  "⭐" +
                  patentOtherInfo.legalStatusCode
                : ""
            };
            this.addEditFormModel1.setValue({ ...patentOtherInfo, ...obj1 });
          }
          this.addEditFormModel.setValue({ ...patentBaseInfo, ...obj });
          this.tableList.patentExpenseList = data.patentExpenseList || [];
          this.tableList.patentAllotteList = data.patentAllotteList || [];
          this.attachedList = data.attachedList;
          this.showAttachedList = data.attachedList;
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
     * 新增费用信息
     */
    handleDrawerList(type) {
      this.show = true;

      this.$nextTick(() => {
        this.isType = "add";
        this.componentsForm = type;
        this.currentItem = {};
        this.drawerTitle = "新增";
      });
    },

    /**
     *  表格修改
     */
    handleEditeClick(scope, type) {
      const currentItem = JSON.parse(JSON.stringify(scope.row));
      this.drawerTitle = "编辑";
      this.show = true;
      this.isType = "edit";
      this.drawerIndex = scope.$index;
      this.$nextTick(() => {
        this.componentsForm = type;
        this.allPatentTableList = this.tableList[`patent${type}List`];
        currentItem.entity = currentItem.entity
          ? currentItem.entity + "⭐" + currentItem.entityCode
          : "";
        currentItem.status = currentItem.status
          ? currentItem.status + "⭐" + currentItem.statusCode
          : "";
        currentItem.handler = currentItem.handler
          ? currentItem.handler + "⭐" + currentItem.handlerNumber
          : "";
        //  this.addEditDrawerModel.setValue({ ...this.currentItem });
        this.currentItem = currentItem;
      });
    },
    /**
     *  c抽屉关闭
     */
    handleClose() {
      this.show = false;
      // this.addEditDrawerModel.resetFields();
    },
    /**
     *  表格删除
     */
    handleDelete(index, type) {
      this.tableList[`patent${type}List`].splice(index, 1);
    },
    /**
     *  表格修改
     */
    handleEditeTwoClick(scope) {
      this.currentItem = JSON.parse(JSON.stringify(scope.row));
      this.drawerTitle = "编辑期限信息";
      this.showTwo = true;
      this.drawerIndex = scope.$index;
      this.$nextTick(() => {
        this.currentItem.status = this.currentItem.status
          ? this.currentItem.status + "⭐" + this.currentItem.statusCode
          : "";
        this.currentItem.handler = this.currentItem.handler
          ? this.currentItem.handler + "⭐" + this.currentItem.handlerNumber
          : "";
        // this.addEditDrawerTwoModel.setValue({ ...this.currentTwoItem });
      });
    },

    /**
     * 转换基本信息
     */
    getPatentBaseInfo(formData) {
      let projectId = [],
        projectNumber = [];
      if (formData.projectList && formData.projectList.length > 0) {
        formData.projectList.map(item => {
          let temp = item.split("⭐");
          projectNumber.push(temp[1]);
          projectId.push(temp[2]);
        });
      }
      formData.projectId = projectId.toString();
      formData.projectNumber = projectNumber.toString();
      delete formData.projectList;
      const dd =
        formData.productClassificationList &&
        formData.productClassificationList.length > 0
          ? formData.productClassificationList[
              formData.productClassificationList.length - 1
            ].toString()
          : "";

      formData.applicationTypeCode = formData.applicationTypeCode.toString();
      let productClassification = decomposeStringToJson(dd, [
        "productClassification",
        "productClassificationCode"
      ]);

      let patentLevel = decomposeStringToJson(formData.patentLevel, [
        "patentLevel",
        "patentLevelCode"
      ]);
      let patentFlag = decomposeStringToJson(formData.patentFlag, [
        "patentFlag",
        "patentFlagCode"
      ]);
      let proposalDepartment = decomposeStringToJson(
        formData.proposalDepartment,
        ["proposalDepartment", "proposalDepartmentCode"]
      );
      let proposer = decomposeStringToJson(formData.proposer, [
        "proposer",
        "proposerNumber"
      ]);
      // let applicationType = decomposeStringToJson(formData.applicationType, [
      //   "applicationType",
      //   "applicationTypeCode"
      // ]);
      let projectNameIn = decomposeStringToJson(formData.projectInString, [
        "projectNameIn",
        "projectNumberIn",
        "projectIdIn"
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

      // 申请人
      let applicant = [],
        applicantCode = [];
      if (formData.applicantList && formData.applicantList.length > 0) {
        formData.applicantList.map(item => {
          let temp = item.split("⭐");
          applicant.push(temp[0]);
          applicantCode.push(temp[1]);
        });
      }
      formData.applicant = applicant.toString();
      formData.applicantCode = applicantCode.toString();
      delete formData.applicantList;
      this.patentBaseInfo = {
        ...formData,
        ...proposalDepartment,
        ...proposer,
        ...applicant,
        ...productClassification,
        ...patentLevel,
        ...patentFlag,
        ...projectNameIn
      };
    },
    /**
     * 转换授权信息
     */
    getPatentOtherInfo(formData) {
      let patentClass = decomposeStringToJson(formData.patentClass, [
        "patentClass",
        "patentClassCode"
      ]);
      let legalStatus = decomposeStringToJson(formData.legalStatus, [
        "legalStatus",
        "legalStatusCode"
      ]);
      this.patentOtherInfo = {
        ...formData,
        ...legalStatus,
        ...patentClass
      };
    },
    /**
     *  获取相关参数
     */
    getParams(val) {
      // const { codeType } = this.$route.query;
      const { statusCode } = this.apploveTableCode;
      this.addEditFormModel.submit(
        (formData, api) => {
          this.getPatentBaseInfo(formData);
        },
        api => {
          this.addEditFormModel.clearValidateState();
          this.getPatentBaseInfo(api.formData());
        }
      );
      if (this.userShow) {
        this.addEditFormModel1.submit(
          (formData, api) => {
            this.getPatentOtherInfo(formData);
          },
          api => {
            this.addEditFormModel1.clearValidateState();
            this.getPatentOtherInfo(api.formData());
          }
        );
      }
      if (this.userShow && this.$route.query.statusCode === "2005104") {
        // 判断保存或者提交
        var status = {
          status: "已审批",
          statusCode: "2005104"
        };
      } else {
        // 判断保存或者提交
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
        patentBaseInfo: { ...this.patentBaseInfo, ...status },
        patentOtherInfo: this.userShow ? { ...this.patentOtherInfo } : {},
        patentExpenseList: this.patentExpenseList,
        patentAllotteList: this.patentAllotteList,
        attachedList: [...this.attachedList, ...arr],
        approve: this.approve,
        attachedTypeCode: "2013118",
        ...this.tableList
      };
    },
    /**
     *  添加项目考核
     */
    async postAdddProject(params, num) {
      const { code, data } = await postAddRpm(params);
      if (code === 1) {
        if (num === 1) {
          this.$router.push({ name: "patentpage" });
        } else {
          this.$router.push({
            name: "patentpage",
            query: { type: "edit", id: data.patentBaseInfo.id }
          });
          this.showAttachedList = [];
          this.attachedList = [];
          setTimeout(() => {
            this.getPilotDetails();
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
     *  更新项目考核
     */
    async updateProject(params, num) {
      const { code } = await updateRpm(params);
      if (code === 1) {
        this.loadingSave = false;
        this.loadingSubmit = false;
        if (num === 1) {
          this.$router.push({ name: "patentpage" });
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
     * 获取上传列表
     * @param val
     */
    getFileList(list) {
      this.attachedList = list;
    },
    /**
     * 提交
     */
    handleSubmit() {
      this.addEditFormModel.validate(valid => {
        if (valid) {
          if (!getStatus(this.uploadTableData)) {
            return;
          }
          this.loadingSubmit = true;
          if (this.$route.query.type == "add") {
            this.postAdddProject(this.getParams(1), 1);
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
      // 审批列表
      this.loadingSave = true;
      if (this.$route.query.type == "add") {
        this.postAdddProject(this.getParams(2));
      } else {
        this.updateProject(this.getParams(2));
      }
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
.file-name {
  margin-right: 10px;
  cursor: pointer;
  color: #0070c1;
}
</style>