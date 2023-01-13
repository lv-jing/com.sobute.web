<template>
  <el-card class="box-card" shadow="never">
    <div slot="header" class="clearfix flex flex-center-between">
      <span>新产品评价{{$titleObj[$route.query.type]}}</span>
    </div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="基本信息" name="1">
        <form-create
            v-model="addEditFormModel"
            :rule="addEidtFormRule"
            :option="addEditOption"
        ></form-create>
        <common-required-upload
            :uploadShow=true
            :uploadParams="uploadParamsOne"
            @getUploadTable="getUploadTable"
            :attachedTable="attachedTable"
        />
        <common-upload
            :urlList="urlList"
            :title="'其他附件'"
            v-on:get-file-list="getFileList"
            :show-attached-list="showAttachedList"
            :upload-params="uploadParams"
            :isShowDownload="$route.query.type==='add'||$route.query.type==='edit'"
        ></common-upload>
      </el-tab-pane>
      <el-tab-pane label="审核列表" name="2">
        <div class="user-form-table">
          <common-auditing-view
              :is-checked="$route.query.type==='view'"
              v-on:handle-selection-change="handleSelectionChange"
              :select-rows="selectRows"
              :process-param="processParam"
              :status-code="evaluation.statusCode||'2005101'"
          ></common-auditing-view>
        </div>
      </el-tab-pane>
    </el-tabs>
    <common-footer
        :handleSubmit="handleSubmit"
        :handleSave="handleSave"
        :loadingSubmit="loadingSubmit"
        :loadingSave="loadingSave"
    >
    </common-footer>
  </el-card>
</template>

<script>
  /* eslint-disable */
  import {addFormRule} from "./rules";
  import {transformValueAndLabel, decomposeStringToJson, getMonthLast, getStatus,findProjectMembersByNumberItem} from "@/utils/tools";
  import {
    getOrganList,
    addEvaluationItem,
    updateEvaluationItem,
    getEvaluationDetails
  } from "@/service/pilot";
  
  import commonUpload from "@/components/CommonUpload";
  import CommonRequiredUpload from "@/components/CommonRequiredUpload";
  import {mapState} from "vuex";

  export default {
    data() {
      return {
        evaluation:{},
        options1: [],
        options2: [],
        loadingSubmit: false,
        loadingSave: false,
        processParam: {},// 审批记录参数
        options: [],
        activeName: "1",
        approve: [], //审批列表
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
          bizType: "新产品评价", //业务分类
          bizTypeCode: "2013123" //业务类型编码
        },
        uploadParamsOne: {
          bizType: "新产品评价", //业务分类
          bizTypeCode: "2013123", //业务类型编码
          bizSubType: "",
          bizSubTypeCode: "" //业务类型编码
        },
        attachedTable: [],// 必传附件上传列表
        attachedList: [], //附件
        showAttachedList: [],
        batch: {}, // 基本信息
        urlList: [
          {
            name: '中试生产附件模板.doc',
            url: '/static/excel/中试生产附件模板.doc'
          }, {
            name: '产品试生产附件模板.doc',
            url: '/static/excel/产品试生产附件模板.doc'
          }, {
            name: '新产品性能评价报告模板.docx',
            url: '/static/excel/新产品性能评价报告模板.docx'
          }
        ]
      };
    },
    computed: {
      ...mapState({
        userInfo: state => state.common.userInfo
      })
    },
    created() {
      this.getOrganList(); // 基地
    },
    mounted() {
      const {id, type} = this.$route.query;
      if (type === "view" || type === 'auditing') {
        this.getEvaluationDetails();
        this.addEditFormModel.disabled(true);
      } else {
        this.addEditFormModel.disabled(false);
        this.addEditFormModel.disabled(true, ["evaluationNumber"]);
        this.addEditFormModel.disabled(true, ["respEmployeeName"]);
        this.addEditFormModel.disabled(true, ["employeeNumber"]);
        this.addEditFormModel.disabled(true, ["applyDate"]);
        if (type === "add") {
          this.initData();
        } else {
          this.getEvaluationDetails();
        }
      }
      //详细
    },
    methods: {
      /**
       * 项目名称change
       */
      async addDrawChange(val) {
        //console.log("项目名称change")
        //console.log(val)
        if (val) {
          let productName = decomposeStringToJson(val, [
            "projectName",
            "projectNumber",
            "projectId"
          ]);
          //匹配projectNumber 的数据
          //let obj = await findProjectByNumberItem(productName.projectNumber);
          let obj = await findProjectMembersByNumberItem(productName.projectId);

          //判断当前登录用户是否是项目负责人
          //this.checkUserCreateByName(productName.projectId);
          if (obj) {
            this.$nextTick(() => {
              this.addEditFormModel.setValue(
                      {
                        respEmployeeName: obj.empolyeeName+ "⭐" + obj.empolyeeNumber,
                      },
                      true
              );
            });
          }
        } else {
          this.addEditFormModel.setValue("respEmployeeName", "");
        }
        //this.list = [];
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
        for (let item in formData) {
          if (Array.isArray(formData[item])) {
            formData[item] = [];
          } else {
            formData[item] = "";
          }
        }
        this.$nextTick(() => {
          let user = this.userInfo;
          formData.employeeNumber = user
            ? user.idName + "⭐" + user.username
            : "";
          formData.applyDate = getMonthLast();
          this.addEditFormModel.setValue(formData);
        });
      },
      /**
       *  获取详情数据
       * @returns {Promise<void>}
       */
      async getEvaluationDetails() {
        const {id, type} = this.$route.query;
        const {code, data} = await getEvaluationDetails({
          id: this.$route.query.id
        });
        if (code === 1) {
          let batch = data.evaluation;
          let obj = {
            employeeNumber: (batch.employeeName && batch.employeeName + "⭐" + batch.employeeNumber) || '',
            respEmployeeNumber: (batch.respEmployeeName && batch.respEmployeeName + "⭐" + batch.respEmployeeNumber) || '',
            productName: (batch.productName) || ''
          };
          this.$nextTick(() => {
            if (type === "view" || type === "auditing" || batch.statusCode === '2005104') {
              this.processParam = {bizId: id};
            }
            this.showAttachedList = data.attachedList || [];
            this.attachedList = data.attachedList || [];
            this.selectRows = data.approve || [];
            this.attachedTable = data.attachedTable || [];
            this.addEditFormModel.setValue({...batch, ...obj});
            this.evaluation=batch
            this.loadingSubmit = false;
            this.loadingSave = false;
          });
        } else {
          this.loadingSubmit = false;
          this.loadingSave = false;
        }
      },
      /**
       * 获取基地列表
       */
      async getOrganList(name = "") {
        const {code, data} = await getOrganList({
          pageSize: 1000,
          name
        });
        if (code === 1) {
          const options = await transformValueAndLabel(data, ["name", "id"]);
          this.addEditFormModel.updateRule("organizationId", {
            options
          });
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
       */
      getFileList(list) {
        this.attachedList = list;
      },
      /**
       *  获取相关参数
       */
      getParams(val) {
        let {statusCode} = this.evaluation;
        this.addEditFormModel.submit(formData => {
          //console.log("--")
          //console.log(formData)
          let employeeNumber = decomposeStringToJson(formData.employeeNumber, ["employeeName", "employeeNumber"]);
          let respEmployeeName = decomposeStringToJson(formData.respEmployeeName, ["respEmployeeName", "respEmployeeNumber"]);
          let projectName = decomposeStringToJson(formData.projectName, ["projectName", "projectNumber","projectId"]);
          // let productName = decomposeStringToJson(formData.productName, ["productName", "productNameCode"]);
          let documentNumber = decomposeStringToJson(formData.documentNumber,["documentNumber","documentId"]);
          let productionNumber = decomposeStringToJson(formData.productionNumber,["productionNumber","productionId"]);
          let evaluationType = decomposeStringToJson(formData.evaluationType, ["evaluationType", "evaluationTypeCode"]);
          let evaluationDepartment = decomposeStringToJson(formData.evaluationDepartment, ["evaluationDepartment", "evaluationDepartmentCode"]);
       this.batch = {
            ...this.batch,
            ...formData,
            ...employeeNumber,
            ...projectName,
            ...documentNumber,
            ...productionNumber,
            ...evaluationType,
            ...evaluationDepartment,
            ...respEmployeeName,
          };
        });

        if (statusCode === '2005104') {
          // 判断保存或者提交
          var status = {
            status: "已审批",
            statusCode: "2005104"
          };
        } else {
          // 判断保存或者提交
          var status = {
            status: val == 1 ? "提交" : (statusCode === '2005105' ? '退回' : "新建"),
            statusCode: val == 1 ? "2005102" : (statusCode === '2005105' ? '2005105' : '2005101')
          };
        }

        let arr = [];
        this.uploadTableData.forEach(item => {
          item.list && item.list.forEach(items => {
            arr.push(items);
          });
        });
        
        return {
          id: this.$route.query.type === "edit" ? this.$route.query.id : "",
          evaluation: {...this.batch, ...status},
          approve: this.approve,
          attachedList: [...arr, ...this.attachedList],
          attachedTypeCode: "2013123"
        };
      },
      /**
       *  添加
       */
      async postAdddProject(params, num) {
        //console.log("上传参数")
        //console.log(params)
        const {code, data} = await addEvaluationItem(params);
        if (code === 1) {
          if (num === 1) {
            this.$router.push({name: "newProductEvaluation"});
          } else {
            this.$router.push({
              name: 'newProductEvaluation',
              query: {type: 'edit', id: data.id}
            });
            this.showAttachedList = [];
            this.attachedList = [];
            setTimeout(() => {
              this.getEvaluationDetails();
            }, 500)
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
       *  更新中试/试生产
       */
      async updateProject(params, num) {
        const {code} = await updateEvaluationItem(params);
        if (code === 1) {
          this.loadingSave = false;
          this.loadingSubmit = false;
          if (num === 1) {
            this.$router.push({name: "newProductEvaluation"});
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
        this.addEditFormModel.validate(valid => {
          if (!valid) {
            this.activeName = "1";
          } else {
            if (!getStatus(this.uploadTableData)) {
              return
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
        this.addEditFormModel.validate(valid => {
          if (!valid) {
            this.activeName = "1";
          } else {
            this.loadingSave = true;
            if (this.$route.query.type == "add") {
              this.postAdddProject(this.getParams(2));
            } else {
              this.updateProject(this.getParams(2));
            }
          }
        });
      }
    },
    components: {
      
      commonUpload,
      CommonRequiredUpload
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