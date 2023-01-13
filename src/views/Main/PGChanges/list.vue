<template>
  <div class="bg-white">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix flex flex-center-between">
        <span>项目变更</span>
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
        <el-button v-if="!getAuthObj.flagAdd" type="primary" size="small" @click="addChanges" icon="iconfont sbt_add">
          新增
        </el-button>
        <el-table
          class="mt10"
          :data="tableData"
          stripe highlight-current-row
          style="width: 100%"
          :header-cell-style="{background:'#f3f3f3'}"
          size="small"
        >
          <el-table-column prop="documentNumber" label="变更单号"></el-table-column>

          <el-table-column prop="type" label="变更类型"></el-table-column>
          <el-table-column prop="subject" label="主题"></el-table-column>
          <el-table-column prop="createdByName" label="创建人"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column prop label="操作"  align="center">
            <template v-slot="{row}">
              <common-operation
                :row="row"
                :deletUrl="deletUrl"
                :getPageList="getChangesList"
                pageUrlName="changes"
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
  import {searchFormRule} from "./rules";
  import {deepCloneClear} from "@/utils/tools";
  import {
    getChangesList,
    deleteProjectChanges
  } from "@/service/changes";
  import {mapGetters} from "vuex";

  export default {
    name: "changes",
    data() {
      return {
        deletUrl: deleteProjectChanges,
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
      ...mapGetters(['getAuthObj','getSearchParams'])
    },
    created() {
      this.$store.dispatch("setHeight", 100);
      this.getChangesList();


    },
    mounted() {
      this.initData();
    },
    methods: {
      /**
       * 新增按钮事件
       */
      addChanges() {
        this.$router.push({name: "changes", query: {type: "add"}});
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

        this.getChangesList();
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
        this.getChangesList();
      },
      /**
       * 查询项目变更列表
       */
      async getChangesList() {
        const {code, data, total} = await getChangesList({...this.searchForm,...this.getSearchParams});
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