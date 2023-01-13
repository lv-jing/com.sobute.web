<template>
  <div class="bg-white">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix flex flex-center-between">
        <span>项目任务详细信息</span>
        <!-- <el-button size="small" type="primary" icon="el-icon-plus" @click="showModel">{{title}}</el-button> -->
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

      <common-exports :columns-list="columnsList"
        class="mt20"
                      :excel-name="excelName"
                      v-on:export-excel="exportExcel"
                      :resource-list="resourceList">
      </common-exports>

      <div class="user-form-table mt20">
        <el-table
          class="mt10"
          :data="tableData"
          stripe  highlight-current-row
          style="width: 100%"
          :header-cell-style="{background:'#f3f3f3'}"
          size="small"
        >
          <el-table-column prop="projectNumber" label="项目编号"></el-table-column>
          <el-table-column prop="projectName" label="项目名称"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column prop="projectType" label="项目类型"></el-table-column>
          <el-table-column prop="field" label="指南方向"></el-table-column>
          <el-table-column prop="source" label="项目来源"></el-table-column>
          <el-table-column prop="startDate" label="开始时间"></el-table-column>
          <el-table-column prop="endDate" label="结束时间"></el-table-column>
          <el-table-column prop="taskNumber" label="任务编号"></el-table-column>
          <el-table-column prop="taskName" label="任务名称"></el-table-column>

        </el-table>
        <common-pagination v-on:handler-currentPage="handlerCurrentPage" :list="searchForm"></common-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
/* eslint-disable */
import { searchFormRule } from "./rules";
import {
  getChangesList
} from "@/service/report/REPRpmPjProjectTasksV";
import {mapGetters} from "vuex";
export default {
  name: "changes",
  data() {
    return {
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
      // 导出需要添加的
      columnsList:{},//表格的头部展示信息和对应的key 必须配置
      resourceList:[],// 数据源,
      pageIndexArray:[],//分页数据索引
      excelName:'项目任务详细表',//数据导出名称
    };
  },
    computed: {
        ...mapGetters(['getAuthObj'])
    },
  created() {
     this.$store.dispatch("setHeight", 100);
    this.getChangesList();
    //必须配置
    this.columnsList={
      "projectNumber": "项目编号",
      "projectName": "projectName",
      "status": "status",
      "projectType": "projectType",
      "field": "field",
      "source": "source",
      "startDate": "startDate",
      "endDate": "endDate",
      "taskNumber": "taskNumber"
    }

  },

  methods: {
    /**
     * 导出数据事件
     */
    exportExcel() {
      this.getChangesList(true);
    },
    /**
     * 新增按钮事件
     */
    addChanges() {
      this.$router.push({ name: "changes", query: { type: "add" } });
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
      this.getChangesList();
    },
    /**
     * 重置
     */
    formResetMethod(self) {
      self.$f.resetFields();
      this.formSearchMethod(self);
    },

    /**
     * 分页查询
     */
    handlerCurrentPage(list) {
      this.searchForm = {
        ...this.searchForm,
        ...list
      };
      this.getChangesList();
    },
    /**
     * 查询项目变更列表
     */
    async getChangesList(bool) {
      let params = {};
      if (bool) {
        params = {
          ...this.searchForm,
          pageNum: 1,
          pageSize: 100000
        };
      } else {
        params = this.searchForm;
      }
      const { code, data, total } = await getChangesList(params);
      if (code === 1) {
        //翻页分页 必须添加
        if (bool) {
          this.resourceList = data;
        } else {
          this.tableData = data;
          this.searchForm.total = total;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
