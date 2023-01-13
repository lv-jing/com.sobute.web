<template>
  <div class="bg-white">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix flex flex-center-between">
        <span>项目建议</span>
        <!-- <el-button size="small" type="primary" icon="el-icon-plus" @click="showModel">{{title}}</el-button> -->
      </div>
      <div class="user-form-search">
        <form-create
          v-model="searchFormModel"
          @form-search-click="formSearchMethod"
          @form-reset-click="formResetMethod"
          :rule="searchFormRule"
          :option="searchOption"
          @apply-change="applyChange"
        ></form-create>
      </div>
      <div class="user-form-table mt20">
        <el-button
          type="primary"
          v-if="!getAuthObj.flagAdd"
          size="small"
          @click="addDeclaration"
          icon="iconfont sbt_add"
        >新增</el-button>
        <el-table
          class="mt10"
          :data="tableData"
          stripe
          highlight-current-row
          style="width: 100%"
          :header-cell-style="{background:'#f3f3f3'}"
          size="small"
        >
          <el-table-column prop="documentNumber" width="90" label="建议编号"></el-table-column>
          <!-- <el-table-column prop width="70" label="用户类型">
            <template v-slot="{row}">{{['内部','外部'][row.applyType]}}</template>
          </el-table-column> -->
          <el-table-column prop="projectName" label="建议名称"></el-table-column>
          <el-table-column prop="projectType" width="140" label="项目类型"></el-table-column>
          <el-table-column prop="status" width="60" label="状态"></el-table-column>
          <el-table-column prop="startDate" width="180" label="执行期限">
            <template slot-scope="scope">
              <p>{{scope.row.startDate}}至{{scope.row.endDate}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="creationDate" width="150" label="创建时间"></el-table-column>
          <el-table-column prop="createdByName" width="80" label="创建人"></el-table-column>
          <el-table-column prop width="200" label="操作" align="center">
            <template v-slot="{row}">
              <div class="flex flex-center">
                <common-operation
                  :row="row"
                  :isDown="true"
                  :downUrl="downUrl"
                  :deletUrl="deletUrl"
                  :getPageList="getDeclarationList"
                  pageUrlName="declaration"
                  urlName="apply"
                />
           
              </div>
            </template>
          </el-table-column>
        </el-table>
        <common-pagination v-on:handler-currentPage="handlerCurrentPage" :list="searchForm"></common-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
/* eslint-disable */
import { searchFormRule } from "./rules";

import { exportFile,saveSearchParam } from "@/utils/tools";
import { getProjectList, deleteProjectItem } from "@/service/project";
import { getDownLoadWord } from "@/service/common";
import { mapGetters } from "vuex";
import { getDictionaryTypeName } from "@/service/system";
import {
  transformValueAndLabel,
  deepCloneClear,
} from "@/utils/tools";

export default {
  name: "apply",
  data() {
    return {
      downUrl: getDownLoadWord, // 下载地址
      deletUrl: deleteProjectItem, // 删除地址
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
      }
    };
  },
  computed: {
    ...mapGetters(["getAuthObj", "getSearchParams","getUserInfo"])
  },
  created() {
    this.$store.dispatch("setHeight", 100);
    this.getDeclarationList();
  },
  mounted() {
    this.initData();
    this.applyChange(this.getUserInfo.type);
  },
  methods: { 
  

      applyChange(val) {
        console.log(val);
        
        this.searchFormModel.setValue('projectTypeCode', '', true)
        
          this.searchFormModel.disabled(false, 'projectTypeCode')
          if (val == '0') {
            this.getDictionaryTypeName('PROJECT_TYPE')
          } else {
            this.getDictionaryTypeName('PROJECT_TYPE_OUT')
          }
        
      },
    async getDictionaryTypeName(typeName) {
      if (!typeName) return;
      const { code, data } = await getDictionaryTypeName({ typeName });
      if (code === 1) {
        const options = await transformValueAndLabel(
          data,
          ["name", "code"],
          false
        );
        this.searchFormModel.updateRule(
          "projectTypeCode",
          {
            options: options
          },
          true
        );
      }
    },
    /**
     * 导出
     */
    exportFile(item) {
      exportFile(`${getDownLoadWord}${item.id}`, "", `${item.projectName}.doc`);
    },
    /**
     * 新增按钮事件
     */
    addDeclaration() {
      this.$router.push({ name: "declaration", query: { type: "add" } });
    },
    /**
     * 查询
     */
    formSearchMethod(self, reset) {
      this.searchFormModel.submit(() => {
        let formData = self.$f.formData();
        this.searchForm = {
          ...formData,
          pageNum: 1,
          pageSize: 10,
          total: 0
        };
        this.$saveSearchParam({searchForm:this.searchForm,reset})
        this.getDeclarationList();
      });
    },
    /**
     * 重置
     */
    formResetMethod(self) {
      self.$f.resetFields();
      this.initData();
      this.formSearchMethod(self, "reset");
    },
    /**
     * 初始化表单数据
     */
    initData() {
      const formData = this.searchFormModel.formData();
      let clearFormData = deepCloneClear(formData);
      //this.searchFormModel.disabled(true, "projectTypeCode");
      this.searchFormModel.setValue("projectTypeCode", "", true);
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
      this.getDeclarationList();
    },
    /**
     * 查询项目建议列表
     */
    async getDeclarationList() {
      const { code, data, total } = await getProjectList(
        { ...this.searchForm, ...this.getSearchParams },
        "apply"
      );
      if (code === 1) {
        this.tableData = data;
        this.searchForm.total = total;
        this.$nextTick(() => {
          this.searchFormModel.setValue(this.getSearchParams);
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>