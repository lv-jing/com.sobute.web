<template>
  <el-card class="box-card" shadow="never">
    <div slot="header" class="clearfix flex flex-center-between">
      <span>项目申请{{$titleObj[$route.query.type]}}</span>
    </div>
    <div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="1">
          <basic-infomation ref="infor" :baseObj="baseObj" />
        </el-tab-pane>
        <el-tab-pane label="参与人员" name="2">
          <participant ref="partic" :member-lists="memberList" />
        </el-tab-pane>
        <el-tab-pane label="项目背景" name="3">
          <project-background ref="backgr" :baseObj="baseObj" />
        </el-tab-pane>
        <el-tab-pane label="内容与目标" name="4">
          <content-target ref="target" :baseObj="baseObj" :acceptLists="acceptLists" />
        </el-tab-pane>
        <el-tab-pane label="经费及预算" name="5">
          <funds-budget ref="budget" />
        </el-tab-pane>
        <el-tab-pane label="相关单位信息" name="6">
          <related-units ref="units" :companyList="companyList" />
        </el-tab-pane>
        <el-tab-pane label="项目附件" name="7">
          <!-- 内部 -->
          <common-required-upload
            :uploadShow="showIn"
            :uploadParams="uploadParamsIn"
            @getUploadTable="getUploadTable"
            :attachedTable="attachedTable"
          />
          <!-- 外部 -->
          <common-required-upload
            :uploadShow="showOut"
            :uploadParams="uploadParamsOut"
            @getUploadTable="getUploadTable1"
            :attachedTable="attachedTable"
          />
          <common-upload
            v-on:get-file-list="getFileList"
            :upload-params="uploadParams"
            :show-attached-list="showAttachedList"
            :isShowDownload="$route.query.type==='add'||$route.query.type==='edit'"
            :urlList="urlList"
          />
        </el-tab-pane>
        <el-tab-pane label="审批列表" name="8">
          <common-auditing-view
            v-on:handle-selection-change="handleSelectionChange"
            :process-param="processParam"
            :status-code="baseObj.statusCode||'2005101'"
            :select-rows="selectRows"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
    <common-footer
      :handleSubmit="handleSubmit"
      :handleSave="handleSave"
      :loadingSubmit="loadingSubmit"
      :loadingSave="loadingSave"
    ></common-footer>
  </el-card>
</template>

<script>
/* eslint-disable */
import {
  getProDetail,
  postAdddProject,
  updateProject
} from "@/service/declare";
import {
  decomposeStringToJson,
  getStatus,
  deepCloneClear
} from "@/utils/tools";
import BasicInfomation from "./BasicInformation"; // 基本信息
import Participant from "./Participant"; // 参与人员
import ProjectBackground from "./ProjectBackground"; // 项目背景
import ContentTarget from "./ContentTarget"; // 内容与目标
import FundsBudget from "./FundsBudget"; // 经费及预算
import RelatedUnits from "./RelatedUnits"; // 相关单位
import CommonUpload from "@/components/CommonUpload";
import CommonRequiredUpload from "@/components/CommonRequiredUpload";
import EidtTable from "@/components/EidtTable";
import Cookies from "js-cookie";
import { mapState } from "vuex"; // 审批列表
export default {
  components: {
    BasicInfomation,
    Participant,
    ProjectBackground,
    ContentTarget,
    FundsBudget,
    RelatedUnits,
    CommonUpload,
    EidtTable,
    CommonRequiredUpload
  },
  computed: {
    ...mapState({
      userInfo: state => state.common.userInfo
    })
  },
  created() {
    Cookies.set("approvalType", "OUTER_PROJECTS_APPROVAL");
  },
  data() {
    return {
      showIn: false,
      showOut: false,
      loadingSubmit: false,
      loadingSave: false,
      processParam: {},
      base: {},
      baseObj: {}, // base
      memberList: [], // 参与人员
      companyList: [], // 相关单位
      acceptLists: [], // 项目验收指标
      activeName: "1",
      attachedList: [],
      approve: [],
      uploadParams: {
        bizType: "项目立项", //业务分类
        bizTypeCode: "2013102" //业务类型编码
      },
      uploadParamsIn: {
        bizType: "内部申请新建阶段", //业务分类
        bizTypeCode: "2100400", //业务类型编码
        bizSubType: "",
        bizSubTypeCode: "" //业务类型编码
      },
      uploadParamsOut: {
        bizType: "外部申请新建阶段", //业务分类
        bizTypeCode: "2100500", //业务类型编码
        bizSubType: "",
        bizSubTypeCode: "" //业务类型编码
      },
      uploadTableData: [], // 内部必传附件
      uploadTableData1: [], // 外部必传附件
      attachedTable: [], // 外部必传附件
      addEditOption: {
        //表单提交事件
        onSubmit: formData => {
          //按钮进入提交状态
          if (this.currentItem.guid) {
          } else {
          }
        },
        submitBtn: {
          icon: "",
          col: {
            span: 8,
            offset: 4
          }
        },
        resetBtn: {
          icon: "",
          show: true,
          col: {
            span: 8,
            offset: 4
          }
        }
      },
      showAttachedList: [],
      selectRows: [], // 审批列表
      urlList: [
        {
          name: "开放基金任务书（合同）-模板 2020.doc",
          url: "/static/excel/开放基金任务书（合同）-模板 2020.doc"
        },
        {
          name: "立项模板---内部研发项目.docx",
          url: "/static/excel/立项模板---内部研发项目.docx"
        }
      ]
    };
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$route.query.type !== "add") {
        this.getProDetail();
      } else {
        const formData = this.$refs.target.searchFormModel.formData();
        let clearFormData = deepCloneClear(formData);
        this.$refs.target.searchFormModel.setValue(clearFormData);
      }
    });
  },
  methods: {
    /**
     * 内部获取必传附件
     */
    getUploadTable(data) {
      this.uploadTableData = data;
    },
    /**
     * 外部获取必传附件
     */
    getUploadTable1(data) {
      this.uploadTableData1 = data;
    },
    /**
     * 获取立项详情页接口数据
     */
    async getProDetail() {
      const { id, type } = this.$route.query;
      const { code, data } = await getProDetail({ id });
      if (code === 1) {
        this.$nextTick(() => {
          // 详情，审批，已审批得时候
          if (
            type === "view" ||
            type === "auditing" ||
            data?.base?.statusCode === "2005104"
          ) {
            this.processParam = { bizId: id };
          }
          this.showAttachedList = data.attachedList || [];
          this.attachedList = data.attachedList || []; //相关附件
          this.selectRows = data.approve || []; // 审批列表
          this.memberList =
            (data.memberList &&
              data.memberList.map(item => {
                item.uuid = this.$uuid();
                return item;
              })) ||
            []; // 参与人员
          this.companyList = data.companyList || []; // 相关单位
          this.baseObj = data.base; // 基本信息
          this.acceptLists = data.acceptList || []; // 项目验收指标
          if (data.base.applyType === "0") {
            this.attachedTable = data.attachedTable || [];
          } else {
            this.attachedTable = data.attachedTable || [];
          }
          this.loadingSave = false;
          this.loadingSubmit = false;
        });
      } else {
        this.loadingSave = false;
        this.loadingSubmit = false;
      }
    },
    /**
     * 获取审批列表
     * @param val
     */
    handleSelectionChange(val) {
      this.approve = val;
    },
    /**
     * 获取上传列表
     * @param list 上传列表
     */
    getFileList(list) {
      this.attachedList = list;
    },
    /**
     * 获取所有参数
     */
    getFormBaseData(formData, val) {
      let { statusCode } = this.baseObj;
      let tempsource = decomposeStringToJson(
        formData.sourceList &&
          formData.sourceList[formData.sourceList.length - 1],
        ["source", "sourceCode"]
      );
      let projectType = decomposeStringToJson(formData.projectType, [
        "projectType",
        "projectTypeCode"
      ]);
      let department = decomposeStringToJson(formData.department, [
        "department",
        "departmentCode"
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
      if (formData.fieldList) {
        let field = [],
          fieldCode = [];
        if (formData.fieldList && formData.fieldList.length > 0) {
          formData.fieldList.map(item => {
            let temp = item.split("⭐");
            field.push(temp[0]);
            fieldCode.push(temp[1]);
          });
        }
        formData.field = field.toString();
        formData.fieldCode = fieldCode.toString();
        delete formData.fieldList;
      } else {
        var field = decomposeStringToJson(formData.field, [
          "field",
          "fieldCode"
        ]);
      }
      if (statusCode === "2005104" || statusCode === "2005106") {
        var status = {
          status: formData.status === "已审批" ? "已审批" : "关闭",
          statusCode: formData.status === "已审批" ? "2005104" : "2005106"
        };
      } else {
        // 判断保存或者提交
        var status = {
          status:
            val == 1 ? "提交" : statusCode === "2005105" ? "退回" : "新建",
          statusCode:
            val == 1
              ? "2005102"
              : statusCode === "2005105"
              ? "2005105"
              : "2005101"
        };
      }
      this.base = {
        ...this.base,
        ...tempsource,
        ...formData,
        ...projectType,
        ...department,
        ...status,
        ...field,
        ...status
      };
    },
    /**
     * 获取保存提交
     */
    getParams(val) {
      // 基本信息
      this.$refs.infor.searchFormModel.submit(
        (formData, api) => {
          this.getFormBaseData(formData, val);
        },
        api => {
          this.$refs.infor.searchFormModel.clearValidateState();
          this.getFormBaseData(api.formData(), val);
        }
      );
      // 项目背景
      this.$refs.backgr.searchFormModel.submit(formData => {
        this.base = { ...this.base, ...formData };
      });
      // 目标内容
      this.$refs.target.searchFormModel.submit(formData => {
        this.base = { ...this.base, ...formData };
      });
      // 参与人员
      let memberList = this.$refs.partic.memberList;
      // 项目验收指标
      let acceptList = this.$refs.target.acceptList;
      // 经费预算
      let budgetTable = this.getRederList(this.$refs.budget.tableData);
      let budgetTable1 = this.getRederList(this.$refs.budget.tableData1);
      // 经费及预算
      let budgetList = [...budgetTable, ...budgetTable1];
      // 相关单位
      let companyList = this.$refs.units.companyList;
      var arr = [];
      if (this.base.applyType === "0") {
        this.uploadTableData.forEach(item => {
          item.list &&
            item.list.forEach(items => {
              arr.push(items);
            });
        });
      } else {
        this.uploadTableData1.forEach(item => {
          item.list &&
            item.list.forEach(items => {
              arr.push(items);
            });
        });
      }
      return {
        id: this.$route.query.type === "edit" ? this.$route.query.id : "",
        base: this.base,
        memberList,
        budgetList,
        companyList,
        acceptList,
        approve: this.approve,
        attachedList: [...arr, ...this.attachedList],
        attachedTypeCode: "2013102"
      };
    },
    /**
     * 重置格式
     */
    getRederList(list) {
      var data = [];
      list.map(item => {
        data.push({
          ...item,
          ...decomposeStringToJson(item.accountName, [
            "accountName",
            "accountCode"
          ])
        });
      });
      return data;
    },
    /**
     * 新增
     * @param params
     * @returns {Promise<void>}
     */
    async postAdddProject(params, num) {
      const { code, data } = await postAdddProject(params);
      if (code === 1) {
        if (num === 1) {
          this.$router.push({ name: "projectdeclare" });
        } else {
          this.$router.push({
            name: "projectdeclare",
            query: { type: "edit", id: data.id }
          });
          this.attachedList = [];
          this.showAttachedList = [];
          setTimeout(() => {
            this.getProDetail();
            this.activeName = "1";
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
      const { code } = await updateProject(params);
      if (code === 1) {
        this.loadingSave = false;
        this.loadingSubmit = false;
        if (num === 1) {
          this.$router.push({ name: "projectdeclare" });
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
     * 提交
     */
    handleSubmit() {
      // 审批列表
      this.$refs.infor.searchFormModel.validate(valid => {
        if (!valid) {
          this.activeName = "1";
        } else {
          let applyType = this.$refs.infor.searchFormModel.getValue(
            "applyType"
          );
          if (applyType === "0" && !getStatus(this.uploadTableData)) {
            this.activeName = "7";
            return;
          }
          if (applyType === "1" && !getStatus(this.uploadTableData1)) {
            this.activeName = "7";
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
      this.loadingSave = true;
      if (this.$route.query.type == "add") {
        this.postAdddProject(this.getParams(2));
      } else {
        this.updateProject(this.getParams(2));
      }
    },
    handleClick() {
      let startDate = this.$refs.infor.searchFormModel.getValue("startDate");
      let endDate = this.$refs.infor.searchFormModel.getValue("endDate");
      if (startDate && endDate) {
        let dateList = [startDate, endDate];
        this.$store.dispatch("setDateList", dateList);
      } else {
        this.$store.dispatch("setDateList", []);
      }
      // 判断用户类型展示内外部必传附件列表
      let applyType = this.$refs.infor.searchFormModel.getValue("applyType");
      if (applyType === "0") {
        this.showIn = true;
        this.showOut = false;
      } else {
        this.showOut = true;
        this.showIn = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>