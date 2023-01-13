<template>
  <div class="bg-white">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix flex flex-center-between">
        <span>项目文档查询</span>
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
        <el-table
          class="mt10"
          :data="tableData"
          stripe  highlight-current-row
          style="width: 100%"
          :header-cell-style="{background:'#f3f3f3'}"
        >
          <el-table-column prop="bizType" label="文件分类"></el-table-column>
          <el-table-column prop="fileName" label="文件名"></el-table-column>
          <el-table-column prop="fileSize" label="文件大小（kb）"></el-table-column>
          <el-table-column label="操作"  align="center" width="100">
            <template slot-scope="scope">
              <div class="tc">
                <a :href="(downloadUrl+scope.row.fileUrl)||'javascript:;'">下载</a>
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
  import {getDocumentList, downloadUrl} from "@/service/common";
  import {searchFormRule} from "./rules";

  export default {
    data() {
      return {
        downloadUrl: downloadUrl,
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
      this.getPilotList()
    },
    methods: {
      /**
       * 查询项目申报列表
       */
      async getPilotList() {
        const {code, data, total} = await getDocumentList(this.searchForm);
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
        this.getPilotList();
      },
    }
  };
</script>

<style lang="scss" scoped>
</style>