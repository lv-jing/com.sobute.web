<!-- 相关单位信息 -->
<template>
  <div class="bg-white">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix flex flex-center-between">
        <span>相关单位</span>
      </div>
      <div class="user-form-search">
        <form-create
          v-model="searchFormModel"
          @form-search-click="formSearchMethod"
          @form-reset-click="formResetMethod"
          :rule="searchFormRule"
          :option="searchOption"
        ></form-create>
      </div>
   
      <div class="user-form-table mt20 md20">
           <el-button
        v-if="this.$route.query.type!=='view'&& $route.query.type!=='auditing'"
        type="primary"
        icon="iconfont sbt_add"
        @click="handleAddList">新增
      </el-button>
        <common-upload-excel :action="action" :url="url" v-on:get-file-list="getFileList"/>
        <el-table
          class="mt10"
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{background:'#f3f3f3'}"
          size="small"
        >
          <el-table-column prop="type" width="100" label="单位类型"></el-table-column>
          <el-table-column prop="customerName" label="单位名称"></el-table-column>
          <el-table-column prop="customerNature" width="100" label="单位性质"></el-table-column>
          <el-table-column prop="organizationCode" label="组织代码"></el-table-column>
          <el-table-column prop="contacts" width="100" label="联系人"></el-table-column>
          <el-table-column prop="telephone" width="100" label="电话"></el-table-column>
          <el-table-column prop="email" width="150" label="邮箱"></el-table-column>
          <el-table-column label="操作" width="120" align="center"
                           v-if="this.$route.query.type!=='view'&& $route.query.type!=='auditing'">
            <template slot-scope="scope">
              <div class="tc">
                <el-button
                  type="text"
                  @click="handleEditeClick(scope.row,scope.$index)"
                  size="mini"
                  circle
                >编辑
                </el-button>
                <el-popconfirm
                  title="确认删除该条记录吗?"
                  @onConfirm="handleDeleteClick(scope)"
                >
                  <el-button slot="reference" type="text" size="mini" circle>删除</el-button>
                </el-popconfirm>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <common-pagination v-on:handler-currentPage="handlerCurrentPage" :list="searchForm"></common-pagination>
      </div>
      <el-drawer
        :visible.sync="show"
        direction="rtl"
        :wrapperClosable="false"
        size="50%"
        :before-close="handleClose"
      >
        <div slot="title" v-text="title"></div>
        <div class="p15">
          <form-create
            v-model="addEditFormModel"
            :rule="addEidtFormRule"
            :option="addEditOption"
          ></form-create>
        </div>
      </el-drawer>
    </el-card>
  </div>
</template>

<script>
  /* eslint-disable */
  import {getcCooprateList, postAddUnit, updateUnit, deleteUnit} from '@/service/approval'
  import {searchFormRule, addFormRule} from "./rules";
  import {decomposeStringToJson, deepCloneClear} from "@/utils/tools";
  import CommonUploadExcel from '@/components/commonUploadExcel'
  import {getCustomerExcel} from "@/service/common";
  export default {
    components:{
      CommonUploadExcel
    },
    data() {
      return {
        url: '/static/excel/相关单位导入模板.xlsx',
        action: getCustomerExcel,
        tableData: [],
        searchFormModel: {},
        searchFormRule: searchFormRule,
        searchOption: {
          resetBtn: false,
          submitBtn: false,
          form: {
            size: "small"
          }
        },
        searchForm: {
          pageNum: 1,
          pageSize: 10,
          total: 0
        },
        eidtIndex: '',
        currentItem: {},
        show: false,
        title: '添加相关单位',
        addEditFormModel: {},
        addEidtFormRule: addFormRule,
        addEditOption: {
          form: {
            labelPosition: 'top'
          },
          row: {
            gutter: 15
          },
          //表单提交事件
          onSubmit: formData => {
            //按钮进入提交状态
            let type = decomposeStringToJson(formData.type, [
              "type",
              "typeCode"
            ]);        //按钮进入提交状态
            let customerNature = decomposeStringToJson(formData.customerNature, [
              "customerNature",
              "customerNatureCode"
            ]);
            this.addEditFormModel.submitBtnProps({ loading: true });
            this.$nextTick(() => {
              if (this.title === '新增相关单位') {
                let params = {...formData, ...type, ...customerNature};
                this.postAddUnit(params)
              } else {
                let params = {...this.currentItem, ...formData, ...type, ...customerNature,}
                this.updateUnit(params);
                this.show = false
              }
            })
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
      }
    },
    created() {
      this.getPilotList();
    },
    methods: {
      /**
       * 获取上传列表
       * @param val
       */
      getFileList(status) {
        if (status) {
          this.getPilotList();
        }
      },
      async getPilotList() {
        const {code, data, total} = await getcCooprateList(this.searchForm);
        if (code === 1) {
          this.tableData = data;
          this.searchForm.total = total;
        }
      },
      /**
       * 查询
       */
      formSearchMethod(self) {
        let formData = self.$f.formData();
        this.searchForm = {
          ...formData,
          pageNum: 1,
          pageSize: 10,
          total: 0
        };
        this.getPilotList();
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
        this.getPilotList();
      },
      /**
       *  相关单位信息添加
       * @param row
       */
      handleAddList() {
        this.show = true;
        this.title = '新增相关单位'
        this.$nextTick(() => {
          this.addEditFormModel.resetFields();
        });
      },
      /**
       * 相关单位新增接口
       */
      async postAddUnit(params){
        const {code} = await postAddUnit(params);
        if (code === 1) {
          this.addEditFormModel.resetFields();
          this.addEditFormModel.submitBtnProps({ loading: false });
          this.getPilotList();
          this.$message({
            type: "success",
            message: " 操作成功"
          });
        } else {
          this.addEditFormModel.submitBtnProps({ loading: false });
        }
      },
      /**
       * 相关单位编辑接口
       */
      async updateUnit(params){
        const {code} = await updateUnit(params);
        if (code === 1) {
          this.addEditFormModel.resetFields();
          this.addEditFormModel.submitBtnProps({ loading: false });
          this.getPilotList();
          this.$message({
            type: "success",
            message: " 操作成功"
          });
        } else {
          this.addEditFormModel.submitBtnProps({ loading: false });
        }
      },
      /**
       *关闭抽屉
       */
      handleClose() {
        this.show = false;
        this.addEditFormModel.resetFields();
      },
      /**
       *  相关单位信息删除
       * @param scope
       */
      async handleDeleteClick(scope) {
        const {code, date} = await deleteUnit({
          id: scope.row.id
        });
        if (code === 1) {
          this.getPilotList();
          this.$message({
            type: "success",
            message: " 操作成功"
          });
        }
      },
      /**
       *  表格编辑
       * @param row
       */
      handleEditeClick(row, index) {
        this.currentItem = JSON.parse(JSON.stringify(row));
        this.eidtIndex = index;
        this.show = true;
        this.title = '编辑相关单位';
        this.$nextTick(() => {
          this.currentItem.type = this.currentItem.type + '⭐' + this.currentItem.typeCode
          this.addEditFormModel.setValue({...this.currentItem})
        });

      }
    }
  }
</script>

<style scoped>
  .bt-content {
    text-align: right;
  }
</style>