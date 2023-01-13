<template>
  <div class="bg-white">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix flex flex-center-between">
        <span>个人总结</span>
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
        <el-button v-if="!getAuthObj.flagAdd" type="primary" size="small" @click="addDeclaration" icon="iconfont sbt_add">新增</el-button>
        <el-table
          class="mt10"
          :data="tableData"
          stripe
          style="width: 100%"
          :header-cell-style="{background:'#f3f3f3'}"
          size="small"
        >
        <template v-for="(item,key) in tableColum">
          <el-table-column :prop="key" :label="item.label" :width="item.width" :key="key"></el-table-column>
        </template>
          <el-table-column prop label="操作"  align="center">
            <template v-slot="{row}">
              <common-operation
                :row="row"
                :deletUrl="deletUrl"
                :getPageList="getPSList"
                pageUrlName="PersonalSummary"
                urlName="person_summary"
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
import { mapGetters } from "vuex";
  import {deepCloneClear} from "@/utils/tools";

import { searchFormRule } from "./rules";
import { getPersonalSummaryList, deletePSItem } from "@/service/assess/personalSummary";
export default {
  name: "apply",
  data() {
    return {
        deletUrl:deletePSItem,
      tableData: [],
      tableColum: {
        documentNumber: {
          label: "总结编号",
          width:"100"
        },
        type: {
          label: "报告类型",
          width:"100"
        },
        fillDate: {
          label: "填报日期"
        },
        status: {
          label: "报告状态"
        },
        createdByName: {
          label: "创建人",
          width:"100"
        },

      },
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
    ...mapGetters(["getProjectType", "getStatusCode","getAuthObj","getSearchParams"])
  },
  created() {
    this.$store.dispatch("setHeight", 100);
    this.getPSList();
  },

  methods: {
    /**
     * 新增按钮事件
     */
    addDeclaration() {
      this.$router.push({ name: "PersonalSummary", query: { type: "add" } });
    },
    /**
     * 查询
     */
    formSearchMethod(self,reset) {
      let formData = self.$f.formData();
      this.searchForm = {
        ...formData,
        pageNum: 1,
        pageSize: 10,
        total: 0
      };
        this.$saveSearchParam({searchForm:this.searchForm,reset})

      this.getPSList();
    },
    /**
     * 重置
     */
    formResetMethod(self) {
      self.$f.resetFields();
      this.initData()
      this.formSearchMethod(self,'reset');
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
      this.getPSList();
    },
    /**
     * 查询个人总结列表
     */
    async getPSList() {
      const { code, data, total } = await getPersonalSummaryList(
       {...this.searchForm,
       ...this.getSearchParams},
        "person_summary"
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