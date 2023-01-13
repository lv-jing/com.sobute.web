<template>
  <div class="bg-white">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix flex flex-center-between">
        <span>项目计划</span>
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
        <el-button v-if="!getAuthObj.flagAdd" type="primary" size="small" @click="addDeclaration"
                   icon="iconfont sbt_add">新增
        </el-button>
        <el-table
            class="mt10"
            :data="tableData"
            stripe highlight-current-row
            style="width: 100%"
            :header-cell-style="{background:'#f3f3f3'}"
            size="small"
        >
          <el-table-column prop="projectNumber" label="项目编号"></el-table-column>
          <el-table-column prop="projectName" width="300" label="项目名称"></el-table-column>
          <el-table-column prop="documentNumber" label="计划编号"></el-table-column>
          <el-table-column prop="year" label="年份"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column prop="createdByName" width="80" label="创建人"></el-table-column>
          <el-table-column prop width="200" label="操作" align="center">
            <template v-slot="{row}">
              <common-operation
                  :row="row"
                  :isDown=true
                  :downUrl="downUrl"
                  :deletUrl="deletUrl"
                  :getPageList="getPlanList"
                  pageUrlName="plan"
                  urlName="plan"
                  :isUserType="isUserType"
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
  import {mapGetters} from "vuex";
  import {searchFormRule} from "./rules";
  import {getProjectList, deleteProjectItem, getUserType} from "@/service/project";
  import {deepCloneClear} from "@/utils/tools";
  import {getDownPlan} from '@/service/common'

  export default {
    name: "apply",
    data() {
      return {
        downUrl: getDownPlan,
        isUserType: false,
        deletUrl: deleteProjectItem,
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
      ...mapGetters(["getProjectType", "getStatusCode", "getAuthObj","getSearchParams"])
    },
    created() {
      this.getUserType();
      this.$store.dispatch("setHeight", 100);
      this.getPlanList();
    },
    mounted() {
      this.initData();
    },
    methods: {
      /**
       *  判断当前用户是否是项目计划考核管理员
       */
      async getUserType() {
        const {code, data} = await getUserType()
        if (code === 1) {
          this.isUserType = data
        }
      },
      /**
       * 新增按钮事件
       */
      addDeclaration() {
        this.$router.push({name: "plan", query: {type: "add"}});
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
       * 查询项目申报列表
       */
      async getPlanList() {
        const {code, data, total} = await getProjectList({...this.searchForm,...this.getSearchParams}, 'plan');
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