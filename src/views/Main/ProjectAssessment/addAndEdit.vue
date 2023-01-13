<template>
  <el-card class="box-card" shadow="never">
    <div slot="header" class="clearfix flex flex-center-between">
      <span>项目考核{{$titleObj[$route.query.type]}}</span>
    </div>
    <form-create
      v-model="addEditFormModel"
      :rule="addEidtFormRule"
      :option="addEditOption"
      @date-year-change="dateYearChange"
    ></form-create>
    <el-table
      class="mt10"
      :data="tableData"
      stripe
      highlight-current-row
      style="width: 100%"
      :header-cell-style="{background:'#f3f3f3'}"
    >
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="taskName" width="120" label="考核内容"></el-table-column>
      <el-table-column prop="taskTarget" label="考核指标"></el-table-column>
      <el-table-column prop="weight" width="50" label="预计权重"></el-table-column>
      <el-table-column prop="actualWeight" width="50" label="实际权重"></el-table-column>
      <el-table-column prop="partakeEmpolyeeName" width="150" label="参与人员">
        <!-- <template v-slot="{row}">{{row.empolyeeName||row.employeeName}}</template> -->
      </el-table-column>
      <el-table-column prop="selfReview" label="自评总结"></el-table-column>
      <el-table-column prop="preReview" label="预评意见"></el-table-column>
      <el-table-column prop="comprehensiveLevel" width="50" label="预评等级"></el-table-column>

      <el-table-column label="操作" align="center" width="120" >
        <template slot-scope="scope">
          <div class="tc">
            <el-button type="text" v-if="!disabled" @click="handleEditeClick(scope,'edit')" size="mini" circle>编辑</el-button>
            <el-button type="text" v-else @click="handleEditeClick(scope,'view')" size="mini" circle>查看</el-button>
           
            <!-- <el-popconfirm
              v-show="$route.query.type != 'view'"
              title="确认删除该条记录吗?"
              @onConfirm="handleDelete(scope)"
            >
              <el-button slot="reference" type="text" size="mini" circle>删除</el-button>
            </el-popconfirm>-->
          </div>
        </template>
      </el-table-column>
    </el-table>

    <common-title
      title="计划外任务及完成情况"
      content="添加计划外任务及完成情况，必须选择项目后进行添加！实际权重系数必须和第一个表格实际权重相加为100才能进行提交"
      class="mt20"
    />
    <div v-if="!disabled">
      <el-button type="primary" size="mini" @click="handleDelete('add')">新增</el-button>
    </div>
    <el-table
      class="mt10"
      :data="cmpList"
      stripe
      highlight-current-row
      style="width: 100%"
      :header-cell-style="{background:'#f3f3f3'}"
    >
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="taskName" width="250" label="考核内容">
        <template v-slot="{row}">
          <el-input :disabled="disabled" v-model="row.taskName" placeholder="考核内容"></el-input>
        </template>
      </el-table-column>
      <el-table-column width="250" label="考核指标">
        <template v-slot="{row}">
          <el-input :disabled="disabled" v-model="row.exam" placeholder="考核指标"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="weight" width="200" label="预计权重">
        <template v-slot="{row}">
          <el-input-number
            v-model="row.weight"
            :min="0"
            :max="100"
            :disabled="disabled"
            controls-position="right"
            placeholder="预计权重"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column prop="actualWeight" width="200" label="实际权重">
        <template v-slot="{row}">
          <el-input-number
            v-model="row.actualWeight"
            :min="0"
            :max="100"
            :disabled="disabled"
            controls-position="right"
            placeholder="实际权重"
          ></el-input-number>
        </template>
      </el-table-column>
    
      <el-table-column prop="partakeEmpolyeeCombobox" width="180" label="参与人员">
        <template v-slot="{row,$index}">
          <el-select
            v-model="row.partakeEmpolyeeCombobox"
            multiple
            :disabled="disabled"
            @change="changeJoinPerson($event,$index)"
            placeholder="请选择参与人"
          >
            <el-option
              v-for="item in projectJoinList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="selfReview" width="350" label="自评总结">
        <template v-slot="{row}">
          <el-input
            :disabled="disabled"
            v-model="row.selfReview"
            type="textarea"
            autosize
            placeholder="自评总结"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="preReview" width="350" label="预评意见">
        <template v-slot="{row}">
          <el-input
            :disabled="disabled"
            v-model="row.preReview"
            type="textarea"
            autosize
            placeholder="预评意见"
          ></el-input>
        </template>
      </el-table-column>
        <el-table-column prop="comprehensiveLevel" width="150" label="预评等级">
        <template v-slot="{row}">
          <common-select
            :disabled="disabled"
            v-model="row.comprehensiveLevel"
            placeholder="请选择"
            type-name="COMPREHENSIVE_GRADE"
            :transform="['name']"
            :is-splicing="true"
            :clearable="true"
          ></common-select>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        align="center"
        width="120"
        v-if="$route.query.type!=='view'"
      >
        <template v-slot="{row,$index}">
          <div class="tc">
            <el-popconfirm
              v-show="!disabled"
              title="确认删除该条记录吗?"
              @onConfirm="handleDelete('del',$index)"
            >
              <el-button slot="reference" type="text" size="mini">删除</el-button>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 必传附件 -->
    <common-required-upload
      :uploadShow="true"
      :uploadParams="uploadParamsOne"
      @getUploadTable="getUploadTable"
      :attachedTable="attachedTable"
    />
    <!-- 相关附件 -->
    <common-upload
      v-on:get-file-list="getFileListSum"
      :show-attached-list="showAttachedList1"
      :upload-params="uploadParams1"
    ></common-upload>
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
        <form-create
          v-model="addEditDrawerModel"
          :rule="addEidtDrawerRule"
          :option="addEditDrawerOption"
        ></form-create>
        <common-upload
          v-on:get-file-list="getFileList"
          :show-attached-list="showAttachedList"
          :upload-params="uploadParams"
        ></common-upload>
        <div v-if="!disabled">
          <el-col :span="8" :offset="4">
            <el-button type="primary" class="w-100 md20 mt20" @click="handleSub">保存</el-button>
          </el-col>
          <el-col :span="8" :offset="4">
            <el-button class="w-100 md20 mt20" @click="handleClose">取消</el-button>
          </el-col>
        </div>
      </div>
    </el-drawer>
  </el-card>
</template>

<script>
/* eslint-disable */
import { addDrawerRule, addFormRule } from "./rules";
import commonUpload from "@/components/CommonUpload";
import CommonRequiredUpload from "@/components/CommonRequiredUpload";
import {
  decomposeStringToJson,
  transformValueAndLabel,
  getStatus
} from "@/utils/tools";
import {
  addExamineItem,
  getExamineDetails,
  getIsUsers,
  getTaskList,
  updateExamineItem
} from "@/service/assess";
import Cookies from "js-cookie";
import { mapState } from "vuex";
import { getProjectParamsItems } from "@/service/project";
export default {
  components: {
    commonUpload,
    CommonRequiredUpload
  },
  data() {
    return {
      disabled: false,
      projectNumber: "",
      loadingSubmit: false,
      loadingSave: false,
      userShow: false,
      drawerTitle: "",
      drawerIndex: "",
      projectId: "",
      currentItemL: {},
      examine: {},
      show: false,
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
      addEditDrawerModel: {},
      addEidtDrawerRule: [],
      addEditDrawerOption: {
        form: {
          labelPosition: "top"
        },
        row: {
          gutter: 15
        },
        //表单提交事件
        onSubmit: formData => {},
        submitBtn: false,
        resetBtn: false
      },
      uploadParams: {
        bizType: "项目考核行", //表格业务分类
        bizTypeCode: "2013124" //表格业务类型编码
      },
      attachedList: [], //表格附件
      showAttachedList: [], // 表格附件回显
      uploadParams1: {
        bizType: "项目考核", //总业务分类
        bizTypeCode: "2013123" //总业务类型编码
      },
      attachedList1: [], //总附件
      showAttachedList1: [], // 总附件回显
      uploadParamsOne: {
        bizType: "新建阶段", //业务分类
        bizTypeCode: "2103000", //业务类型编码
        bizSubType: "",
        bizSubTypeCode: "" //业务类型编码
      },
      uploadTableData: [], // 必传附件上传列表
      attachedTable: [], // 必传附件上传列表
      options: [],
      options1: [],
      cmpList: [],
      projectJoinList: [],
      _tempExamine:{}
    };
  },
  created() {
    this.getIsUser();
  },
  computed: {
    ...mapState({
      selectValue: state => state.common.selectValue,
      userProfile:state => state.common.userInfo,
    })
  },
  watch: {
    selectValue: {
      handler(newValue) {
        this.selectProjectAndYear(newValue,'year')
      }
    }
  },
  mounted() {
    const { type } = this.$route.query;
    if (["auditing", "view",].includes(type)) {
      this.disabled = true;
      this.getPilotDetails();
      this.addEditFormModel.disabled(true);
    } else {
      this.disabled = false;
      this.addEditFormModel.disabled(false);
      this.addEditFormModel.disabled(true, [
        "documentNumber",
        "projectNumber",
        "status"
      ]);
      if (type === "add") {
        this.initData();
      } else {
        this.getPilotDetails();
      }
    }
    //详细
  },
  methods: {
    /**
     * 必须项目和日期同时才能
     */

    selectProjectAndYear(newValue,type) {
      console.log(newValue,'----',type);
      const routep=this.$route.query
      let year = this.addEditFormModel.getValue(type);
      let decome=type==='year'?newValue:year;
      if (decome && decome.length > 0 && year) {
        let projectName = decomposeStringToJson(decome, [
          "projectName",
          "projectNumber",
          "projectId"
        ]);
        this.cmpList = [];
        this.tableData = [];
        this.projectId = projectName.projectId;
        this.getDutyPersonList(projectName.projectId);
        this.getTaskList(projectName.projectId);
       
      } else {
       routep.type==='add'&&this.$message.warning(`请选择${type==='year'?'年份':'项目'}`);
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
        this.projectJoinList = options;
      }
    },
    /**
     * 获取必传附件
     */
    getUploadTable(data) {
      this.uploadTableData = data;
    },
    /**
     * 判断是否是专利管理员
     */
    async getIsUser() {
      const { code, data } = await getIsUsers();
      if (code === 1) {
        this.userShow = data;
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
     * 详情
     */
    async getPilotDetails() {
      const { code, data } = await getExamineDetails({
        id: this.$route.query.id
      });
      if (code === 1) {
        this.$nextTick(() => {
          let obj = {
            projectName:
              data.examine.projectName +
              "⭐" +
              data.examine.projectNumber +
              "⭐" +
              data.examine.projectId,
            managerName:
              data.examine.managerName && data.examine.managerName
                ? data.examine.managerName + "⭐" + data.examine.managerNum
                : ""
          };
          this.projectId = data.examine.projectId;
          this.getDutyPersonList(data.examine.projectId);

          let newCmpList = data.cmpList.map(item => {
            item.partakeEmpolyeeCombobox = JSON.parse(
              item.partakeEmpolyeeCombobox || "[]"
            );
            return item;
          });
          this.cmpList = newCmpList;
          this._tempExamine=data.examine||{}
          this.addEditFormModel.setValue({ ...data.examine, ...obj });
          this.tableData =
            (data.list &&
              data.list.map((item, index) => {
                return {
                  ...item,
                  index: index
                };
              })) ||
            [];
          this.attachedList1 = data.attachedList || [];
          this.showAttachedList1 = data.attachedList || [];
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
     *  获取考核内容
     */
    async getTaskList(projectId) {
      let year = this.addEditFormModel.getValue("year");
      const { code, data } = await getTaskList({ projectId, level1: 0, year });
      if (code === 1) {
        this.tableData = data.map(item => {
          item.taskId = item.id;
          return item;
        });
      }
    },
    dateYearChange(val) {
      let newValue = new Date(val).getFullYear().toString();
      this.selectProjectAndYear(newValue,'projectName')
      
    },
    /**
     * 新增项目考核列表
     */
    handleAddList() {
      if (this.projectId) {
        this.addEidtDrawerRule = addDrawerRule(this);
        this.show = true;
        this.getTaskList();
        this.$nextTick(() => {
          this.drawerTitle = "新增考核";
          this.addEditDrawerModel.resetFields();
        });
      } else {
        this.$message.error("请选择项目名称进行新增");
      }
    },

    /**
     *  c抽屉关闭
     */
    handleClose() {
      this.show = false;
      this.attachedList = [];
      this.showAttachedList = [];
      this.addEditDrawerModel.resetFields();
    },
    /**
     * 行获取上传列表
     */
    getFileList(list) {
      this.attachedList = list;
    },
    /**
     * 总获取上传列表
     */
    getFileListSum(list) {
      this.attachedList1 = list;
    },
    /**
     * 抽屉保存
     */
    handleSub() {
      this.addEditDrawerModel.validate(valid => {
        if (valid) {
          this.addEditDrawerModel.submit(formData => {
            //按钮进入提交状态

            let attachedList = this.attachedList;
            if (this.drawerTitle == "新增考核") {
              //  this.tableData.push({...formData, ...taskName, attachedList});
            } else {
              this.currentItem = {
                ...this.currentItem,
                ...formData,
                attachedList
              };
              this.$set(this.tableData, this.drawerIndex, this.currentItem);
              this.show = false;
            }
            this.addEditDrawerModel.resetFields();
            this.$message({
              type: "success",
              message: " 操作成功"
            });

            this.attachedList = [];
            this.showAttachedList = [];
          });
        }
      });
    },
    /**
     *  表格修改
     */
    handleEditeClick(scope,type) {
      this.getIsUser();
      this.currentItem = JSON.parse(JSON.stringify(scope.row));
      this.drawerTitle = "编辑考核";
      this.addEidtDrawerRule = addDrawerRule(this);
      this.show = true;
      // this.getTaskList();
      this.drawerIndex = scope.$index;
      this.$nextTick(() => {
        this.currentItem.managerName = this.currentItem.managerName
          ? this.currentItem.managerName + "⭐" + this.currentItem.managerNum
          : "";
        this.addEditDrawerModel.setValue({ ...this.currentItem });
        this.attachedList = scope.row.attachedList;
        this.showAttachedList = scope.row.attachedList;

         if(["auditing", "view"].includes(type)){
        this.addEditDrawerModel.disabled(true)
      }else{
         this.addEditDrawerModel.disabled(false)
      }
      });
     
    },
    /**
     * 格式化选择的参与员数据
     */
    changeJoinPerson(val, index) {
      let { partakeEmpolyeeName, partakeEmpolyeeNum } = this.splitEmpolyee(
        val,
        ["partakeEmpolyeeName", "partakeEmpolyeeNum"]
      );
      this.cmpList[index] = Object.assign(this.cmpList[index], {
        partakeEmpolyeeName,
        partakeEmpolyeeNum
      });
    },
    /**
     * 分解参与人
     */
    splitEmpolyee(arr, _key) {
      let name = [],
        name1 = [];
      arr.map(item => {
        let n = item.split("⭐");
        name.push(n[0]);
        name1.push(n[1]);
      });
      // return name.toString();
      return {
        [_key[0]]: name.toString(),
        [_key[1]]: name1.toString()
      };
    },
    /**
     *  表格删除
     */
    handleDelete(type, index) {
      if (!this.projectId) {
        this.$message.warning("请选择项目名称进行新增");
        return;
      }
      if (type === "add") {
        this.cmpList.push({
          taskName: "",
          exam: "",
          weight: "",
          actualWeight: "",
          comprehensiveLevel: "",
          partakeEmpolyeeCombobox: "",
          selfReview: "",
          preReview: ""
        });
      } else {
        this.cmpList.splice(index, 1);
      }
    },
    /**
     *  获取相关参数
     */
    getParams(val) {
      this.addEditFormModel.submit(formData => {
        //按钮进入提交状态
        let managerName = decomposeStringToJson(formData.managerName, [
          "managerName",
          "managerNum"
        ]);
        let projectName = decomposeStringToJson(formData.projectName, [
          "projectName",
          "projectNumber",
          "projectId"
        ]);
        // 技术关键词
        let memberName = [],
          memberNum = [];
        if (formData.membersList && formData.membersList.length > 0) {
          formData.membersList.map(item => {
            let temp = item.split("⭐");
            memberName.push(temp[0]);
            memberNum.push(temp[1]);
          });
        }
        formData.memberName = memberName.toString();
        formData.memberNum = memberNum.toString();
        delete formData.membersList;
        this.examine = {
          ...formData,
          ...projectName,
          ...managerName
        };
      });
      const { statuCode } = this.$route.query;
      if (statuCode && this.userProfile.username === this.examine.managerNum) {
        if (statuCode === "2005102") {
          var status = {
            status: val == 1 ? "已预评" : "提交",
            statusCode: val == 1 ? "2005108" : "2005102"
          };
        } else if (statuCode === "2005108") {
          var status = {
            status: "已预评",
            statusCode: "2005108"
          };
        } else {
          // 判断保存或者提交
          var status = {
            status: val == 1 ? "提交" : "新建",
            statusCode: val == 1 ? "2005102" : "2005101"
          };
        }
      } else if (statuCode && statuCode === "2005102") {
        var status = {
          status: "提交",
          statusCode: "2005102"
        };
      } else if (statuCode && statuCode === "2005108") {
        var status = {
          status: val == 1 ? "已完成" : "已预评",
          statusCode: val == 1 ? "2005104" : "2005108"
        };
      } else {
        // 判断保存或者提交
        var status = {
          status: val == 1 ? "提交" : "新建",
          statusCode: val == 1 ? "2005102" : "2005101"
        };
      }
      let arr = [];
      this.uploadTableData.forEach(item => {
        item.list &&
          item.list.forEach(items => {
            arr.push(items);
          });
      });

      //改变新加的参与人
     let tempCmpList=JSON.parse(JSON.stringify(this.cmpList))
      let newCmpList = tempCmpList.map(item => {
        item.partakeEmpolyeeCombobox = JSON.stringify(
          item.partakeEmpolyeeCombobox || []
        );
        return item;
      });

      return {
        id: this.$route.query.type === "edit" ? this.$route.query.id : "",
        examine: { ...this.examine, ...status },
        list: this.tableData,
        cmpList: newCmpList,
        attachedList: [...this.attachedList1, ...arr]
      };
    },
    /**
     *  添加项目考核
     */
    async postAdddProject(params, num) {
      const { code, data } = await addExamineItem(params);
      if (code === 1) {
        if (num === 1) {
          this.$router.push({ name: "assessment" });
        } else {
          this.$router.push({
            name: "assessment",
            query: { type: "edit", id: data.id }
          });
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
      const { code } = await updateExamineItem(params);
      if (code === 1) {
        this.loadingSave = false;
        this.loadingSubmit = false;
        if (num === 1) {
          this.$router.push({ name: "assessment" });
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
     * 实际权重相加
     */
    getNumber(list, secondList) {
      let firstTotal = list.reduce(
        (aggregated, obj) => aggregated + Number(obj.actualWeight),
        0
      );
      let secondTotal = secondList.reduce(
        (aggregated, obj) => aggregated + Number(obj.actualWeight),
        0
      );
      console.log(firstTotal, secondTotal);
      return firstTotal + secondTotal;
    },
    /**
     * 提交
     */
    handleSubmit() {
      // 审批列表
      this.addEditFormModel.validate(valid => {
        if (valid) {
          let _params=this.getParams(1);
          let managerName=this.addEditFormModel.getValue('managerName');
          let _managerName = decomposeStringToJson(managerName, [
          "managerName",
          "managerNum"
        ]);
      
          let total = this.getNumber(this.tableData, this.cmpList);
          if (_managerName?.managerNum===this.userProfile.username&&this._tempExamine.statuCode!=='2005101'&&total !== 100) {
            this.$message.error(
              `列表实际权重相加必须等于100,目前总的权重为【${total}】`
            );
            return;
          }
          if (!getStatus(this.uploadTableData)) {
            return;
          }
          this.loadingSubmit = true;
          if (this.$route.query.type == "add") {
            this.postAdddProject(_params, 1);
          } else {
            this.updateProject(_params, 1);
          }
        }
      });
    },
    /**
     *  保存
     */
    handleSave() {
      // 审批列表
      this.addEditFormModel.validate(valid => {
        if (valid) {
          this.loadingSave = true;
          if (this.$route.query.type == "add") {
            this.postAdddProject(this.getParams(2));
          } else {
            this.updateProject(this.getParams(2));
          }
        }
      });
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