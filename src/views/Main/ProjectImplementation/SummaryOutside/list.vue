<template>
  <div class="bg-white">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix flex flex-center-between">
        <span>项目总结-外部</span>
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
          stripe  highlight-current-row
          style="width: 100%"
          :header-cell-style="{background:'#f3f3f3'}"
          size="small"
        >
        <template v-for="(item,key) in tableColum">
          <el-table-column :prop="key" :label="item.label" :width="item.width" :key="key"></el-table-column>
        </template>
          <el-table-column prop label="操作"  align="center" width="200">
            <template v-slot="{row}">
              <common-operation
                :row="row"
                :deletUrl="deletUrl"
                :getPageList="getPlanList"
                pageUrlName="SummaryOutside"
                urlName="summary_outside"
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
import {deepCloneClear} from "@/utils/tools";
import { mapGetters } from "vuex";
import { searchFormRule } from "./rules";
import { getProjectList, deleteProjectItem } from "@/service/project";
export default {
  name: "apply",
  data() {
    return {
        deletUrl:deleteProjectItem,
      tableData: [],
      tableColum: {
        documentNumber: {
          label: "总结编号"
        },
        projectNumber: {
          label: "项目编号"
        },
        projectName: {
          label: "项目名称",
          width:'400'
        },
        type: {
          label: "报告类型"
        },
        year: {
          label: "总结年度"
        },
         submitDate: {
          label: "提交日期"
        },
        // fillDate: {
        //   label: "填报日期"
        // },
        status: {
          label: "报告状态"
        },
        createdByName: {
          label: "创建人",
          width:'100'
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
    this.getPlanList();
  },
  mounted() {
    this.initData();
  },
  methods: {
    /**
     * 新增按钮事件
     */
    addDeclaration() {
      this.$router.push({ name: "SummaryOutside", query: { type: "add" } });
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

      this.getPlanList();
    },
    /**
     * 重置
     */
    formResetMethod(self) {
      self.$f.resetFields();
      this.initData();
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
      this.getPlanList();
    },
    /**
     * 查询项目总结外部列表
     */
    async getPlanList() {
      const { code, data, total } = await getProjectList(
        {...this.searchForm,...this.getSearchParams},
        "summary_outside"
      );
      // console.log("!!!!!!!!!!!!")
      // console.log(data)
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