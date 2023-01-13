<template>
  <el-card class="box-card" shadow="never">
    <div slot="header" class="clearfix flex flex-center-between">
      <span>项目总结-外部{{$titleObj[$route.query.type]}}</span>
    </div>
    <el-tabs type="card">
      <el-tab-pane label="基本信息">
        <form-create v-model="addEditFormModel" :rule="addEidtFormRule" :option="addEditOption"
                     ></form-create>
        <el-button
                v-if="$route.query.type!=='view'&& $route.query.type!=='auditing'"
                type="primary"
                size="small"
                icon="iconfont sbt_add"
                @click="handleAddList">新增
        </el-button>
        <div class="tasks-table">
          <el-table
            :data="list"
            style="width: 100%"
            class="mt10"
            :header-cell-style="{background:'#f3f3f3'}"
          >
            <el-table-column type="index" label="序号" ></el-table-column>
            <!--<el-table-column prop="projectName" label="项目名称" width="200px"></el-table-column>-->
            <!--<el-table-column prop="projectNumber" label="项目编号" width="200px"></el-table-column>-->
            <el-table-column prop="expectTarget" label="预期目标"></el-table-column>
            <el-table-column prop="performance" label="完成情况"></el-table-column>
            <el-table-column
                    label="操作"
                    width="150"
                    align="center"
            >
              <template slot-scope="scope">
                <div class="tc">
                  <el-button
                          v-if="['edit','add'].includes($route.query.type)"
                          type="text"
                          @click="handleEditeClick(scope)"
                          size="mini"
                          circle
                  >编辑</el-button>
                  <el-button
                          v-if="['view','auditing'].includes($route.query.type)"
                          type="text"
                          @click="handleEditeClick(scope,'view')"
                          size="mini"
                          circle
                  >查看</el-button>
                  <el-popconfirm
                          v-if="['edit','add'].includes($route.query.type)"
                          title="确认删除该条记录吗?"
                          @onConfirm="handleDelete(scope)"
                  >
                    <el-button slot="reference" type="text" size="mini" circle>删除</el-button>
                  </el-popconfirm>
                </div>
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
                v-on:get-file-list="getFileList1"
                :show-attached-list="showAttachedList1"
                :upload-params="uploadParams1"
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
                    v-on:get-file-list="getFileList"
                    :show-attached-list="showAttachedList"
                    :upload-params="uploadParams"
                    :isShowDownload="$route.query.type==='add'||$route.query.type==='edit'"
                    :urlList="urlList"
            ></common-upload>
            <el-col :span="8" :offset="4" v-if="['edit','add'].includes($route.query.type)">
              <el-button type="primary" class="w-100 md20 mt20" @click="handleSub">提交</el-button>
            </el-col>
            <el-col :span="8" :offset="4" v-if="['edit','add'].includes($route.query.type)">
              <el-button class="w-100 md20 mt20" @click="handleClose">取消</el-button>
            </el-col>
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
import { addFormRule,addDrawerRule } from "./rules";
import {
  decomposeStringToJson,
  transformValueAndLabel,
  deepCloneClear,
  getMonthLast,
  getStatus
} from "@/utils/tools";
import {
  getProjectList,
  createProjectItem,
  updateProjectItem,
  getProjectDetails
} from "@/service/project";

import commonUpload from "@/components/CommonUpload";
import {mapState} from "vuex";
import Cookies from "js-cookie";
import CommonTypeUpload from "@/components/CommonTypeUpload";

export default {
  data() {
    return {
      show: false,
      text: '新增计划完成情况',
      loadingSubmit: false,
      loadingSave: false,
      processParam: {},
      approve: [], //审批列表
      list: [], //年度计划下面的一级任务列表
      planList: [],
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
      addEditDrawerModel: {},
      addEidtDrawerRule: [],
      addEditDrawerOption: {
        //表单提交事件
        onSubmit: formData => {

        },
        submitBtn: {
          icon: "",
          show: false,
          col: {
            span: 8,
            offset: 4
          }
        },
        resetBtn: {
          icon: "",
          show: false,
          col: {
            span: 8,
            offset: 4
          }
        }
      },
      year: '',
      options1: [],
      options2: [],
      options3: [],
      options4: [],
      selectRows: [],
      uploadParams: {
        bizType: "外部项目总结-计划", //业务分类
        bizTypeCode: "2013134" //业务类型编码
      },
      uploadParams1: {
        bizType: "外部项目总结", //业务分类
        bizTypeCode: "2013133" //业务类型编码
      },
      uploadParamsOne: {
        bizType: "外部总结阶段一", //业务分类
        bizTypeCode: "2101200", //业务类型编码
        bizSubType: "",
        bizSubTypeCode: "" //业务类型编码
      },
      proData: [],// 项目名称列表
      attachedTable: [],
      uploadTableData: [],
      attachedList: [], //项目计划附件（抽屉内）
      showAttachedList: [],
      attachedList1:[], //非抽屉内
      showAttachedList1: [],
      currentItem: {},
      currentItems: {},
      editIndex: '',
      productInfo:'',
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
  // watch: {
  //   year: {
  //     deep: true,
  //     handler(newVal, oldVal) {
  //       if (newVal && oldVal && newVal !== oldVal) {
  //         this.list = []
  //       }
  //     }
  //   }
  // },
  mounted() {
    const { id, type } = this.$route.query;
    //详细
    if (["edit", "view", "auditing"].includes(type) && id) {
      this.getProjectPlanDetails({id, type});
    } else {
      this.initData();
    }
    this.getPlanList();
  },

  methods: {
    /**
     * 获取必传附件表格数据
     */
    getUploadTable(data) {
      this.uploadTableData = data;
    },
    /**
     * change事件
     */
    projectNameChange(self) {
      //console.log("1111111111111")
      //console.log(self)
      // let year = self.self.value;
      // if (year) {
      //   this.year = year.split('-')[0]
      // } else {
      //   this.year = '';
      //   this.list = []
      // }
    },
    /**
     * 新增项目计划
     */
    handleAddList() {
      this.text = '新增计划完成情况';
      let year = this.addEditFormModel.getValue("year") || "";
      if (year) {
        //this.getPlanList();
        this.show = true;
        this.addEidtDrawerRule = addDrawerRule(this)
      } else {
        this.$message({
          type: "error",
          message: "请选择年度"
        });
      }
    },
    /**
     * 项目名称change
     */
    addDrawChange(val) {
        if (val) {
            let productName = decomposeStringToJson(val, [
                "projectName",
                "projectNumber",
                "projectId"
            ]);
          let obj = this.proData.find(
            item => item.projectNumber === productName.projectNumber
          );
          if(obj){
            this.uploadParamsOne = {
              code: "2100900", //业务类型编码
              requiredCode: "SUM_PROJECT_TYPE" + "_" + obj.projectTypeCode
            }
          }
            this.addEditFormModel.setValue(
                "projectNumber",
                productName.projectNumber
            );
        } else {
            this.addEditFormModel.setValue("projectNumber",'' );
            this.list = []
        }
      // if (val) {
      //   this.productInfo = decomposeStringToJson(val, ["projectName", "projectNumber", "projectId"]);
      //   this.addEditFormModel.setValue("projectNumber", this.productInfo.projectNumber);
      //   //console.log(this.addEditFormModel)
      // } else {
      //   this.addEditFormModel.setValue("projectNumber",'');
      //   // this.addEditFormModel.setValue("projectName",'');
      //   // this.addEditFormModel.setValue("projectId",'');
      //   this.list = []
      // }
    },
    /**
     * 任务名称change
     */
    addDrawChange1(val) {
      if (val) {
        const {taskNumber} = decomposeStringToJson(val, ["taskName", "taskNumber", "taskId"]);
        this.addEditDrawerModel.setValue('taskNumber', taskNumber);
      } else {
        this.addEditDrawerModel.setValue('taskNumber', '');
        this.currentItems.taskId = ''
      }
    },

    /**
     * 编辑
     */
    handleEditeClick(scope,val) {
        // console.log("=====================")
        // console.log(scope)
        // console.log(this.list)
        // console.log(this.addEditFormModel)
        // console.log(this.addEditDrawerModel)
      this.list = this.list.map((item, index) => {
        return {
          ...item,
          index
        }
      });
      this.text = '编辑计划完成情况';
      //let year = this.addEditFormModel.getValue("fillDate") || "";
      this.currentItems = JSON.parse(JSON.stringify(scope.row));
      this.editIndex = scope.$index;
      this.show = true;
      this.getPlanList();
      this.addEidtDrawerRule = addDrawerRule(this);
      this.$nextTick(() => {
        if(val==='view'){
          this.addEditDrawerModel.disabled(true);
        }
        // let params = {
        //   projectNumber: this.currentItems.projectNumber,
        //   empolyeeNum: this.userInfo.username,
        //   statusCode: "2049101",
        //   year: year.split("-")[0],
        //   needAllLevel:true,
        //   pageNum: 1,
        //   pageSize: -1
        // };
        //this.getTaskList(params);
        this.currentItems.projectName = this.currentItems.projectName + "⭐" + this.currentItems.projectNumber + "⭐" + this.currentItems.projectId;
        this.addEditDrawerModel.setValue({ ...this.currentItems });
        this.attachedList = scope.row.attachedList;
        this.showAttachedList = scope.row.attachedList;
      })
    },
    /**
     * 删除
     */
    handleDelete(scope) {
      this.list.splice(scope.$index, 1);
    },
    /**
     * 计划完成抽屉提交
     */
    handleSub(){
      this.addEditDrawerModel.validate((valid) => {
        if(valid){
          this.addEditDrawerModel.submit((formData)=>{
            // let productName = decomposeStringToJson(formData.projectName && formData.projectName, ["projectName", "projectNumber", "projectId"]);
            // let flag = '';
            // let txt = '';
            // flag = this.list.find(item => {
            //   if (item.projectNumber && item.projectNumber === productName.projectNumber) {
            //     txt = '项目名称不能相同';
            //     return item.projectNumber && item.projectNumber === productName.projectNumber && item.index!==this.editIndex
            //   }
            // });
            // if (flag) {
            //   this.$message({
            //     type: "error",
            //     message: txt
            //   });
            //   return
            // }
            // formData.projectName = this.productInfo.projectName;
            // formData.projectNumber = this.productInfo.projectNumber;
            // formData.projectId = this.productInfo.projectId;
            let attachedList = this.attachedList;
            if (this.text === '新增计划完成情况') {
              this.list.push({...formData,attachedList, attachedTypeCode: this.uploadParams.bizTypeCode})
            } else {
              this.currentItems = {
                ...this.currentItems,
                ...formData,
                attachedList:attachedList,
                attachedTypeCode: this.uploadParams.bizTypeCode};
              this.$set(this.list, this.editIndex, this.currentItems);
              this.show = false
            }
            this.list = this.list.map((item, index) => {
              return {
                ...item,
                index
              }
            });
            this.addEditDrawerModel.resetFields();
            this.$message({
              type: "success",
              message: " 操作成功"
            });
             this.attachedList = [];
             this.showAttachedList = [];
            //this.show = false;
          })
        }
      })
    },
    /**
     *关闭抽屉
     */
    handleClose() {
      this.show = false;
      this.attachedList = [];
      this.showAttachedList = [];
      this.addEditDrawerModel.resetFields();
    },
    /**
     * 初始化表单数据
     */
    initData() {
      const formData = this.addEditFormModel.formData();
      let clearFormData = deepCloneClear(formData);
      clearFormData.employeeName = this.$store.state.common.userInfo.alias;
      this.addEditFormModel.disabled(false);
      this.addEditFormModel.disabled(true, ["documentNumber","projectNumber","employeeName"]);
      clearFormData.fillDate=getMonthLast();
      this.addEditFormModel.setValue(clearFormData);
    },
    /**
     * 获取审批列表人员
     */
    handleSelectionChange(val) {
      this.approve = val;
    },

    /**
     * 获取抽屉内上传列表
     */
    getFileList(list) {
      this.attachedList = list;
    },

    /**
     * 获取上传列表
     */
    getFileList1(list) {
      this.attachedList1 = list;
    },
    /**
     * 查询项目名称
     */
    async getPlanList() {
      const {code, data} = await getProjectList({
        statusCode: 2005104,
        pageNum: 1,
        pageSize: -1,
        projectNumberPrefix:'PM2,PM3'
      }, "confirm");
      if (code === 1) {
        var options = await transformValueAndLabel(data, [
          "projectName",
          "projectNumber",
          "id"
        ]);
        this.proData = data||[];
        this.options1 = options;
        this.options2 = options;
        this.$nextTick(() => {
          this.addEditFormModel.updateRule(
                  "projectName",
                  {
                    options
                  },
                  true
          );
        });
      }
    },
    // /**
    //  * 查询任务列表
    //  */
    // getTaskList(projectNumber, year, index) {
    //   return new Promise(async resolve => {
    //     const { code, data } = await getProjectList(
    //       {
    //         projectNumber,
    //         year,
    //         pageNum: 1,
    //         pageSize: -1
    //       },
    //       "task"
    //     );
    //     if (code === 1) {
    //       resolve({ result: data });
    //     }
    //   });
    // },
    /**
     * 查询详细
     */
    async getProjectPlanDetails({id, type}) {
      const { code, data } = await getProjectDetails({ id }, "summary_outside");
      if (code === 1) {
        if (data === null) {
          return;
        }
        const { approve, attachedList, list, summary } = data;
        console.log("--------查询详情-----------")
        console.log(data)
        console.log(attachedList)
        this.$nextTick(() => {
          if (["view", "auditing"].includes(type)) {
            this.addEditFormModel.disabled(true);
            this.processParam = { bizId: id };
          } else {
            this.addEditFormModel.disabled(false);
          }

          this.currentItem = summary;
          this.list = list && list.map((item, index) => {
            return {
              ...item,
              index
            }
          }) || [];

          this.attachedList = attachedList || [];
          this.attachedList1 = attachedList || [];
          summary.type = `${summary.type}⭐${summary.typeCode}`;
          summary.employeeName = `${summary.employeeName}`;
          this.selectRows = approve || [];
          this.showAttachedList = attachedList || [];
          this.showAttachedList1 = attachedList || [];
          this.uploadParamsOne = {
            code: "2100900", //业务类型编码
            requiredCode: "SUM_PROJECT_TYPE" + "_" + summary.projectTypeCode,
            type: 'edit'
          }
          this.attachedTable = data.attachedTable || [];
          this.addEditFormModel.setValue(summary);
          // this.addEditFormModel.setValue("projectNumber",this.list[0].projectNumber);
          // this.addEditFormModel.setValue("projectName",this.list[0].projectName);
          // this.addEditFormModel.setValue("projectId",this.list[0].projectId);
          this.addEditFormModel.disabled(true, "documentNumber");
          this.addEditFormModel.disabled(true, "employeeName");
          this.loadingSave = false;
          this.loadingSubmit = false;
        });
      } else {
        this.loadingSave = false;
        this.loadingSubmit = false;
      }
    },
    /**
     * 总结新增
     */
    async addPlanItem(formData,num) {
      const newList = this.list.map(item => {
        delete item["taskList"];
        return item;
      });
      console.log("--------add-----------")
      console.log(formData)
      console.log(this.approve)
      let arr = [];
      // 分出必传表格附件
      this.uploadTableData.forEach(item => {
        item.list && item.list.forEach(items => {
          arr.push(items);
        });
      })
      const { code, data } = await createProjectItem(
        {
          summary: formData,
          approve: this.approve,
          list: newList,
          attachedList: [...this.attachedList1, ...arr],
          attachedTypeCode: this.uploadParams1.bizTypeCode
        },
        "summary_outside"
      );
      if (code === 1) {

        if(num === 0){
          this.showAttachedList1 = [];
          this.$router.push({
            name: 'SummaryOutside',
            query: {type: 'edit', id: data.id}
          });
           setTimeout(() => {
            this.getProjectPlanDetails({ id: data.id, type: "edit" });
          }, 500);
        }else {
          // this.$router.push({
          //   name: 'SummaryOutside',
          // });
        }
        // this.addEditFormModel.resetFields();
        //
        // this.selectRows = [];
        // this.showAttachedList = [];
        // this.approve = [];
        // this.list = [];

        //this.$router.go(-1);
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
     * 项目编辑
     */
    async updatePlanItem(id, formData,num) {
      const newList = this.list.map(item => {
        item.attachedTypeCode = this.uploadParams.bizTypeCode
        delete item["taskList"];
        return item;
      });
      // console.log("+++++编辑+++++")
      //   console.log(formData)
      //   console.log(newList)
      //   console.log(this.attachedList1)
      //   console.log( this.uploadParams1.bizTypeCode)
      let arr = [];
      // 分出必传表格附件
      this.uploadTableData.forEach(item => {
        item.list && item.list.forEach(items => {
          arr.push(items);
        });
      })
      const { code, data } = await updateProjectItem(
        {
          id,
          params: {
            summary: formData,
            list: newList,
            approve: this.approve,
            attachedList: [...this.attachedList, ...arr],
            attachedTypeCode: this.uploadParams1.bizTypeCode
          }
        },
        "summary_outside"
      );
      if (code === 1) {
        if(num === 0){
          this.$router.push({
            name: 'SummaryOutside',
            query: {type: 'edit', id: id}
          });
        }else {
          this.$router.push({
            name: 'SummaryOutside',
          });
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
    saveAndSubmitData(status, btnStatus,num) {
      const { id, type } = this.$route.query;
      this.addEditFormModel.submit(async formData => {
        // console.log("%%%%%%%%%%%%%")
        // console.log(formData)
        const employeeName = decomposeStringToJson(formData.employeeName, [
          "employeeName",
          "employeeNumber"
        ]);
        const typeCode = decomposeStringToJson(formData.type, [
          "type",
          "typeCode"
        ]);
          let productName = decomposeStringToJson(formData.projectName, [
              "projectName",
              "projectNumber",
              "projectId"
          ]);
        formData.attachedList = this.attachedList1
        formData.pgType = 1;
        this.currentItem.id &&
          (formData = { ...this.currentItem, ...formData });
        const params = {
          ...formData,
          ...employeeName,
          ...typeCode,
            ...productName,
          ...status
        };
        // console.log("保存信息：")
        // console.log(params)
        if (btnStatus===1 && !getStatus(this.uploadTableData)) {
          return
        }
        if (btnStatus === 0) {
          this.loadingSave = true;
        } else {
          this.loadingSubmit = true;
        }

        if (type === "edit") {
          this.updatePlanItem(id, params,num);
        } else {
          this.addPlanItem(params,num);
        }
      });
    },
    /**
     * 保存
     */
    handleSave() {
      // const { codeType } = this.$route.query;
     const {statusCode}= this.currentItem;
      let status = {
        status: statusCode === "2005105" ? "退回" : "新建",
        statusCode: statusCode === "2005105" ? "2005105" : "2005101"
      };
      //第二个0表示不跳转，显示在编辑页面
      this.saveAndSubmitData(status, 0,0);
    },
    /**
     * 提交
     */
    handleSubmit() {
      //第二个1表示跳转，显示在列表页面
      this.saveAndSubmitData(
        {
          status: "提交",
          statusCode: "2005102"
        },
        1,1
      );
    },
  },
  components: {
    
    commonUpload,
    CommonTypeUpload
  }
};
</script>

<style lang="scss" scoped>
</style>