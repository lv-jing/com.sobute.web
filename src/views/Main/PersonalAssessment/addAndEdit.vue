<template>
  <el-card class="box-card" shadow="never">
    <div slot="header" class="clearfix flex flex-center-between">
      <span>个人考核{{$titleObj[$route.query.type]}}</span>
    </div>
    <form-create v-model="addEditFormModel" :rule="addEidtFormRule" :option="addEditOption"></form-create>
    <el-button
        v-show="$route.query.type !='view'"
        type="primary"
        icon="iconfont sbt_add"
        @click="handleAddList"
    >新增
    </el-button>
    <el-table
        class="mt10"
        :data="tableData"
        stripe highlight-current-row
        style="width: 100%"
        :header-cell-style="{background:'#f3f3f3'}"
    >
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="personalContent" label="个人年度考核内容"></el-table-column>
      <el-table-column prop="annualAssessment" label="个人年度考核指标"></el-table-column>
      <el-table-column prop="projectName" label="参与项目名称"></el-table-column>
      <el-table-column prop="selfReview" label="个人年度自评总结"></el-table-column>
      <el-table-column label="操作" align="center" width="120" v-if="this.$route.query.type!=='view'">
        <template slot-scope="scope">
          <div class="tc">
            <el-button
                v-show="$route.query.type != 'view'"
                type="text"
                @click="handleEditeClick(scope)"
                size="mini"
                circle
            >编辑
            </el-button>
            <el-popconfirm
                v-show="$route.query.type != 'view'"
                title="确认删除该条记录吗?"
                @onConfirm="handleDelete(scope)">
              <el-button slot="reference" type="text" size="mini" circle>删除</el-button>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <common-upload
        v-on:get-file-list="getFileList"
        :upload-params="uploadParams"
        :show-attached-list="showAttachedList"
        :userShow="userShow"
    />
    <common-footer
      v-if="$route.query.type!=='auditing'"
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
      </div>
    </el-drawer>
  </el-card>
</template>

<script>
  /* eslint-disable */
  import {addFormRule, addDrawerRule} from "./rules";
  import CommonUpload from "@/components/CommonUpload";
  import {transformValueAndLabel, decomposeStringToJson} from "@/utils/tools";
  import {
    addPersonItem,
    updatePersonItem,
    getPersonDetails,
    getIsUser
  } from "@/service/assess";
  import {mapState} from "vuex";

  export default {
    components: {
      CommonUpload
    },
    data() {
      return {
        loadingSubmit: false,
        loadingSave: false,
        isOk: false,
        userShow: false,
        drawerTitle: "",
        drawerIndex: "",
        projectId: "",
        currentItemL: {},
        examine: {},
        show: false,
        tableData: [],
        attachedList: [],
        showAttachedList: [],
        uploadParams: {
          bizType: "个人考核", //业务分类
          bizTypeCode: "2013117" //业务类型编码
        },
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
        addEidtDrawerRule: addDrawerRule,
        addEditDrawerOption: {
          //表单提交事件
          onSubmit: formData => {

            //按钮进入提交状态
            let projectName = decomposeStringToJson(formData.projectName, [
              "projectName",
              "projectNumber",
              "projectId"
            ]);
            if (this.drawerTitle == "新增个人考核") {
              this.tableData.push({...formData, ...projectName});
            } else {
              this.currentItem = {
                ...this.currentItem,
                ...formData,
                ...projectName
              };
              this.$set(this.tableData, this.drawerIndex, this.currentItem);
              this.show = false
            }
            this.addEditDrawerModel.resetFields();
            this.$message({
              type: "success",
              message: " 操作成功"
            });
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
        }
      };
    },
    computed: {
      ...mapState({
        userInfo: state => state.common.userInfo
      })
    },
    created() {
      console.log(this.userInfo);
      const {type} = this.$route.query;
      if (type === 'edit') {
        this.getIsUser()
      }
    },
    mounted() {
      const {type} = this.$route.query;
      if (type === "view") {
        this.getPilotDetails();
        this.addEditFormModel.disabled(true);
      } else {
        this.addEditFormModel.disabled(false);
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
      /**
       * 判断是否是专利管理员
       */
      async getIsUser() {
        const {code, data} = await getIsUser();
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
          formData.employeeName = this.userInfo
            ? this.userInfo.idName + "⭐" + this.userInfo.username
            : "";
          this.addEditFormModel.setValue(formData);
        });
      },
      /**
       * 详情
       */
      async getPilotDetails() {
        const {code, data} = await getPersonDetails({
          id: this.$route.query.id
        });
        if (code === 1) {
          this.$nextTick(() => {
            this.tableData = data.list || [];
            this.attachedList = data.attachedList || [];
            this.showAttachedList = data.attachedList || [];
            data.examine.employeeName =
              data.examine.employeeName +
              "⭐" +
              data.examine.employeeNum
            this.addEditFormModel.setValue({...data.examine});
            if (data.examine.statusCode === '2005102') {
              this.isOk = true
            } else {
              this.isOk = false
            }
            this.loadingSave = false;
            this.loadingSubmit = false;
          })
        } else {
          this.loadingSave = false;
          this.loadingSubmit = false;
        }
      },
      /**
       * 新增项目考核列表
       */
      handleAddList() {
        this.show = true;
        this.$nextTick(() => {
          this.drawerTitle = "新增个人考核";
          this.addEditDrawerModel.resetFields();
        });
      },
      /**
       *  表格修改
       */
      handleEditeClick(scope) {
        this.currentItem = JSON.parse(JSON.stringify(scope.row));
        this.drawerTitle = "编辑个人考核";
        this.show = true;
        this.drawerIndex = scope.$index;
        this.$nextTick(() => {
          this.currentItem.managerNum =
            this.currentItem.managerName + "⭐" + this.currentItem.managerNum;
          this.addEditDrawerModel.setValue({...this.currentItem});
        });
      },
      /**
       *  c抽屉关闭
       */
      handleClose() {
        this.show = false;
        this.addEditDrawerModel.resetFields();
      },
      /**
       *  表格删除
       */
      handleDelete(scope) {
        this.tableData.splice(scope.$index, 1);
      },
      /**
       *  获取相关参数
       */
      getParams(val) {
        this.addEditFormModel.submit(formData => {
          let employeeName = decomposeStringToJson(formData.employeeName, [
            "employeeName",
            "employeeNum",
          ]);
          this.examine = {
            ...formData,
            ...employeeName
          };
        });
        // 判断保存或者提交
        if (this.isOk) {
          var status = {
            status: val == 1 ? "已完成" : "提交",
            statusCode: val == 1 ? "2005104" : "2005102"
          };
        } else {
          var status = {
            status: val == 1 ? "提交" : "新建",
            statusCode: val == 1 ? "2005102" : "2005101"
          };
        }

        return {
          id: this.$route.query.type === "edit" ? this.$route.query.id : "",
          examine: {...this.examine, ...status},
          list: this.tableData,
          attachedList: this.attachedList,
          attachedTypeCode: "2013117"
        };
      },
      /**
       *  添加项目考核
       */
      async postAdddProject(params, num) {
        const {code, data} = await addPersonItem(params);
        if (code === 1) {
          if (num === 1) {
            this.$router.push({name: "personal"});
          } else {
            this.$router.push({
              name: 'personal',
              query: {type: 'edit', id: data.id}
            });
            this.showAttachedList = [];
            this.attachedList = [];
            setTimeout(() => {
              this.getPilotDetails();
            }, 500)
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
        const {code} = await updatePersonItem(params);
        if (code === 1) {
          this.loadingSave = false;
          this.loadingSubmit = false;
          if (num === 1) {
            this.$router.push({name: "personal"});
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