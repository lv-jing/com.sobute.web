<template>
  <el-card class="box-card" shadow="never">
    <div slot="header" class="clearfix flex flex-center-between">
      <span>项目建议{{$titleObj[$route.query.type]}}</span>
    </div>
    <el-tabs type="card">
      <el-tab-pane label="基本信息">
        <form-create
            v-model="addEditFormModel"
            :rule="addEidtFormRule"
            :option="addEditOption"
            @apply-change="applyChange"
        ></form-create>
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
        ></common-upload>
      </el-tab-pane>
      <el-tab-pane label="审批列表">
        <div class="user-form-table">
          <common-auditing-view
              :process-param="processParam"
              :is-checked="$route.query.type==='view'||$route.query.type==='auditing'"
              v-on:handle-selection-change="handleSelectionChange"
              :select-rows="selectRows"
              :status-code="apply.statusCode||'2005101'"
          ></common-auditing-view>
        </div>
      </el-tab-pane>
    </el-tabs>
    <common-footer
        :handle-submit="handleSubmit"
        :is-show-button="$route.query.type!=='view'"
        :handle-save="handleSave"
        :loadingSubmit="loadingSubmit"
        :loadingSave="loadingSave"
    />
  </el-card>
</template>

<script>
  /* eslint-disable */
  import {addFormRule} from "./rules";
  import CommonTypeUpload from '@/components/CommonTypeUpload'
  import {mapGetters} from "vuex";
  import {decomposeStringToJson, getStatus} from "@/utils/tools";
  import Cookies from "js-cookie";
  import {
    createProjectItem,
    updateProjectItem,
    getProjectDetails
  } from "@/service/project";
  
  import commonUpload from "@/components/CommonUpload";
  import {mapState} from "vuex";

  export default {
    props: ["userProfile"],
    data() {
      return {
        apply:{},
        loadingSubmit: false,
        loadingSave: false,
        processParam: {},
        show: false,
        approve: [], //审批列表
        tableData: [],
        addEditFormModel: {},
        addEidtFormRule: [],
        addEditOption: {
          resetBtn: false,
          submitBtn: false,
          form: {
            size: "small"
          }
        },
        selectRows: [],
        uploadParams: {
          bizType: "项目建议", //业务分类
          bizTypeCode: "2013101" //业务类型编码
        },
        uploadParamsOne: {},
        uploadShow: false,// 必传附件显示隐藏
        attachedTable: [],// 必传附件
        uploadTableData: [],// 必传附件
        attachedList: [], //附件
        showAttachedList: [],
        apply: {}
      };
    },
    created() {
      Cookies.set("approvalType", "OUTER_APPLY_APPROVAL");
    },
    computed: {
      ...mapState({
        userInfo: state => state.common.userInfo
      })
    },
    mounted() {
      if (this.userInfo.type === 1) {
        this.uploadShow = false
      } else {
        this.uploadShow = true
      }
      const {id, type} = this.$route.query;
      //详细
      if (["edit", "view", "auditing"].includes(type) && id) {
        this.getProjectDeclarationDetails();
      } else {
        this.initData();
        this.addEditFormModel.reload(
          addFormRule(this, this.userInfo.type, this.userInfo.type)
        );
      }
    },
    methods: {
      /**
       *改变项目类型下拉框，展示界面
       */
      projectTypeChange(val){
        if(val){
          let typeCode = val.split('⭐')[1];
          this.uploadParamsOne = {
            code: "2100300", //业务类型编码
            requiredCode: "ADVISE_PROJECT_TYPE" + "_" + typeCode
          }
        }
      },
      /**
       * 获取必传附件
       */
      getUploadTable(data) {
        this.uploadTableData = data;
      },
      /**
       * 改变下拉框，展示界面
       */
      applyChange(val) {
        this.addEditFormModel.reload(addFormRule(this, val, this.userInfo.type));
        if (val === '1') {
          this.uploadShow = false
        } else {
          this.uploadShow = true
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
        this.addEditFormModel.disabled(false);
        this.addEditFormModel.disabled(true, ["documentNumber"]);
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

      killCodeAndName(list, key) {
        let keyWords = [],
          keyWordsCode = [];
        for (let item of list) {
          const _split = item.split("⭐");
          keyWords.push(_split[0]);
          keyWordsCode.push(_split[1]);
        }
        return {[key]: keyWords, [key + "Code"]: keyWordsCode};
      },
      /**
       * 获取formData数据
       */
      getFormData(formData,status) {
        //项目来源c
        const dd =(formData.sourceList&&formData.sourceList.length>0)?formData.sourceList[formData.sourceList.length-1].toString():''
        let tempsource = decomposeStringToJson(dd, ["source", "sourceCode"]);
        //项目类型
        let tempprojectType = decomposeStringToJson(formData.projectType, [
          "projectType",
          "projectTypeCode"
        ]);
        //单位名称
        let partyNameObj = decomposeStringToJson(formData.partyName, [
          "partyName",
          "partyCode"
        ]);
        //承担角色
        let roleNameObj = decomposeStringToJson(formData.roleName, [
          "roleName",
          "roleCode"
        ]);
        let tempfield = {};
        
        let _tempKeyWordList=[...new Set((formData.keyWordsList||'').toString().split(','))]
        const {keyWords, keyWordsCode} = this.killCodeAndName(
          _tempKeyWordList || [],
          "keyWords"
        );
        if (formData.applyType == 0) {
          const {field, fieldCode} = this.killCodeAndName(
            formData.fieldList || [],
            "field"
          );
          formData.field = (field && field.toString()) || "";
          formData.fieldCode = (fieldCode && fieldCode.toString()) || "";
        } else {
          tempfield = decomposeStringToJson(formData.field, [
            "field",
            "fieldCode"
          ]);
        }
        // 技术关键词
        formData.keyWords = keyWords.toString();
        formData.keyWordsCode = keyWordsCode.toString();
        // 产品关键词


      let _tempKeyWordsProList=[...new Set((formData.keyWordsProList||'').toString().split(','))]
        const {keyWordsPro, keyWordsProCode} = this.killCodeAndName(
          _tempKeyWordsProList || [],
          "keyWordsPro"
        );

        formData.keyWordsPro = keyWordsPro.toString();
        formData.keyWordsCodePro = keyWordsProCode.toString();
        // delete formData.keyWordsList;
        // delete formData.keyWordsProList;
        //关键字keyWordsList


        this.apply = {
          ...formData,
          ...status,
          ...tempfield,
          ...tempsource,
          ...tempprojectType,
          ...partyNameObj,
          ...roleNameObj
        };
      },
      /**
       * 提交和保存公共方法
       */
      saveAndSubmitData(status, btnStatus) {
        const {id, type} = this.$route.query;
        // 基本信息
        this.addEditFormModel.submit(async (formData, api) => {
          this.getFormData(formData,status);
        }, (api) => {
          this.addEditFormModel.clearValidateState();
          this.getFormData(api.formData(),status);
        });

        if (btnStatus === 1 && this.uploadShow && !getStatus(this.uploadTableData)) {
          return
        }
        if (btnStatus === 0) {
          this.loadingSave = true;
        } else {
          this.loadingSubmit = true;
        }
        let arr = [];
        console.log( this.uploadTableData);
        
        this.uploadTableData.forEach(item => {
          item.list && item.list.forEach(items => {
            arr.push(items);
          });
        });
        let allParams = {
          apply: this.apply,
          approve: this.approve,
          attachedList: [...arr, ...this.attachedList],
          attachedTypeCode: this.uploadParams.bizTypeCode
        };
        if (id && type === "edit") {
          this.editProjectDeclaration(id, allParams, btnStatus);
        } else {
          this.addProjectDeclaration(allParams, btnStatus);
        }
      },
      /**
       * 查询申报详细
       */
      async getProjectDeclarationDetails(did = "", dType = "") {
        let {id, type} = this.$route.query;

        if (did && dType) {
          id = did;
          type = dType;
        }
        // return
        const {code, data} = await getProjectDetails(
          {id: id || did},
          "apply"
        );
        if (code === 1) {
          const {apply, approve, attachedList} = data;
          this.addEditFormModel.reload(
            addFormRule(this, apply.applyType, this.userInfo.type)
          );

          this.$nextTick(() => {
            if (["view", "auditing"].includes(type)) {
              this.addEditFormModel.disabled(true);
              this.processParam = {
                bizId: id,
                processDefineName: "project-apply"
              };
            } else {
              this.addEditFormModel.disabled(false);
            }
            this.addEditFormModel.disabled(true, ["applyType","documentNumber"]);
            if (apply.documentNumber) {
              this.addEditFormModel.disabled(true, [ 'projectType',]);
            }

            if (apply.applyType == 1) {
              apply.field =
                (apply.field && apply.field + "⭐" + apply.fieldCode) || "";
            }

            apply.source =
              (apply.source && apply.source + "⭐" + apply.sourceCode) || "";
            apply.projectType =
              (apply.projectType &&
                apply.projectType + "⭐" + apply.projectTypeCode) ||
              "";
            apply.roleName =
              (apply.roleName && apply.roleName + "⭐" + apply.roleCode) || "";
            apply.partyName =
              (apply.partyName && apply.partyName + "⭐" + apply.partyCode) || "";
            this.approve = approve;
            this.selectRows = approve || [];
            this.attachedList = attachedList || [];
            this.showAttachedList = attachedList || [];
            this.attachedTable = data.attachedTable || [];
            this.addEditFormModel.setValue(apply);
            this.apply=apply;
            this.uploadParamsOne = {
              code: "2100300", //业务类型编码
              requiredCode: "ADVISE_PROJECT_TYPE" + "_" + apply.projectTypeCode,
              type:'edit'
            }
            if (apply.applyType === '1') {
              this.uploadShow = false
            } else {
              this.uploadShow = true
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
       * 项目建议新增
       */
      async addProjectDeclaration(apply, btnStatus) {
        const {code, data} = await createProjectItem(apply, "apply");
        if (code === 1) {
          this.addEditFormModel.resetFields();
          // this.$router.go(-1);

          if (btnStatus === 1) {
            this.$router.push({name: "declaration"});
          } else {
            this.$router.push({
              name: "declaration",
              query: {id: data.id, type: "edit"}
            });
            this.selectRows = [];
            this.attachedList = [];
            this.showAttachedList = [];
            setTimeout(() => {
              this.getProjectDeclarationDetails(data.id, "edit");
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
      async editProjectDeclaration(id, apply, btnStatus) {
        const {code, data} = await updateProjectItem(
          {
            id,
            params: apply
          },
          "apply"
        );
        if (code === 1) {
          if (btnStatus === 1) {
            this.$router.push({name: "declaration"});
          }else{
              setTimeout(() => {
              this.getProjectDeclarationDetails(id, "edit");
            }, 500);
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
       * 保存
       */
      handleSave() {
        const {statusCode} = this.apply;
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
        this.addEditFormModel.validate((valid) => {
          if(valid){
            this.saveAndSubmitData(
              {
                status: "提交",
                statusCode: "2005102"
              },
              1
            );
          }
        })
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