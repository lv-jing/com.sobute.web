<template>
  <div class="bg-white">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix flex flex-center-between">
        <span>中试查询</span>
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
      <div class="user-form-table mt20">
        <el-button
          type="primary"
          icon="iconfont sbt_add"
          v-if="!getAuthObj.flagAdd"
          @click="$router.push({name:'pilotTest',query:{type:'add'}})"
        >新增</el-button>
        <el-table
          class="mt10"
          :data="tableData"
          stripe
          highlight-current-row
          style="width: 100%"
          :header-cell-style="{background:'#f3f3f3'}"
        >
          <el-table-column prop="documentNumber" width="80" label="编号"></el-table-column>
          <el-table-column prop="employeeName" label="申请人"></el-table-column>
          <el-table-column prop="applyDate" label="申请日期"></el-table-column>
          <el-table-column prop="respEmployeeName" label="项目负责人"></el-table-column>
          <el-table-column prop="productName" label="中试产品名称"></el-table-column>
          <el-table-column prop="organizationName" label="生产基地"></el-table-column>
          <el-table-column prop="createdByName" label="创建人"></el-table-column>
          <el-table-column prop="status" width="60" label="状态"></el-table-column>
          <el-table-column label="操作" align="center" width="220">
            <template v-slot="{row}">
              <common-operation
                :row="row"
                :deletUrl="deletUrl"
                :getPageList="getPilotTestList"
                pageUrlName="pilotTest"
                :isUserType="isUserType"
                applyTitle="生成试生产"
              />
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
import { getPilotTestList, getPilotTestDelete } from "@/service/pilot";
import { searchFormRule } from "./rules";
import { mapGetters } from "vuex";
import { deepCloneClear } from "@/utils/tools";

export default {
  name: "apply",
  data() {
    return {
      isUserType: false,
      deletUrl: getPilotTestDelete,
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
  created() {
    this.$store.dispatch("setHeight", 100);
    this.getPilotTestList();
  },
  computed: {
    ...mapGetters(["getAuthObj","getSearchParams"])
  },
  mounted() {
    this.initData();
  },
  methods: {
    /**
     * 查询中试列表
     */
    async getPilotTestList() {
      const { code, data, total } = await getPilotTestList({
        ...this.searchForm,
        ...this.getSearchParams
      });
      if (code === 1) {
        this.tableData = data;
        this.searchForm.total = total;
        this.$nextTick(() => {
          this.searchFormModel.setValue(this.getSearchParams);
        });
      }
    },
    /**
     * 查询
     */
    formSearchMethod(self, reset) {
      let formData = self.$f.formData();
      this.searchForm = {
        ...formData,
        pageNum: 1,
        pageSize: 10,
        total: 0
      };
      this.$saveSearchParam({ searchForm: this.searchForm, reset });

      this.getPilotTestList();
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
      this.getPilotTestList();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>