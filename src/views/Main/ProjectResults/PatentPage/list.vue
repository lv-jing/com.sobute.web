<template>
  <div class="bg-white">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix flex flex-center-between">
        <span>知识产权查询</span>
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
          @click="$router.push({name:'patentpage',query:{type:'add'}})"
        >新增</el-button>
        <common-upload-excel :action="action" :url="url" v-on:get-file-list="getFileList" />
        <el-table
          tooltip-effect="dark"
          class="mt10"
          :data="tableData"
          stripe
          highlight-current-row
          style="width: 100%"
          :header-cell-style="{background:'#f3f3f3'}"
        >
          <el-table-column prop="documentNumber" width="100" label="成果入库单号"></el-table-column>
          <el-table-column prop="patentName" width="220" show-overflow-tooltip label="专利名称"></el-table-column>
          <el-table-column prop="inventor" width="200" label="发明人"></el-table-column>
          <el-table-column prop="applicant" width="250" label="申请人"></el-table-column>
          <el-table-column prop="applicationDate" width="100" label="申请日"></el-table-column>
          <el-table-column prop="applicationNumber" width="100" label="申请号"></el-table-column>
          <el-table-column prop="publicationDate" width="100" label="公开日"></el-table-column>
          <el-table-column prop="publicationNumber" width="100" label="公开号"></el-table-column>
          <el-table-column prop="publicationPatentDate" width="100" label="公告日"></el-table-column>
          <el-table-column prop="publicationPatentNumber" width="100" label="公告号"></el-table-column>
          <el-table-column prop="region" width="100" label="国家/地区"></el-table-column>
          <el-table-column prop="legalStatus" width="100" label="法律状态"></el-table-column>
          <el-table-column prop="createdByName" width="100" label="创建人"></el-table-column>
          <el-table-column prop="status" label="状态" width="100"></el-table-column>
          <el-table-column label="操作" width="200" align="center" fixed="right">
            <template v-slot="{row}">
              <div class="tc">
              
                <el-button
                  v-if="!getAuthObj.flagAdd && (userShow || (['2005101','2005105'].includes(row.statusCode) &&row.isOwner))"
                  type="text"
                  @click="handleEditeClick(row)"
                  size="mini"
                  circle
                >编辑</el-button>
                <el-button
                  slot="reference"
                  type="text"
                  size="mini"
                  circle
                  @click="handleDetails(row)"
                >查看</el-button>
                <!--                v-if="!getAuthObj.flagAdd && statusCode[row.statusCode]||userShow"-->
                <el-popconfirm
                  v-if="!getAuthObj.flagAdd && (userShow || (['2005101','2005105'].includes(row.statusCode) &&row.isOwner))"
                
                  title="确认删除该条记录吗?"
                  @onConfirm="handleDelete(row)"
                >
                  <el-button slot="reference" type="text" size="mini" circle>删除</el-button>
                </el-popconfirm>
                  <el-button
      size="mini"
      class="ml10"
      type="text"
      @click="recallApply(row)"
      v-if="row.statusCode==='2005103'&&row.createdBy===getUserInfo.username"
    >撤回</el-button>
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
import { getRpmList, deleteRpm } from "@/service/results";
import { searchFormRule } from "./rules";
import CommonUploadExcel from "@/components/commonUploadExcel";
import { getPatentExcel } from "@/service/common";
import { mapGetters } from "vuex";
import { getIsUser } from "@/service/results";
import { deepCloneClear ,recallApplyCommon} from "@/utils/tools";

export default {
  components: {
    CommonUploadExcel
  },
  data() {
    return {
      userShow: false,
      statusCode: {
        2005101: true,
        2005102: false,
        2005105: true
      },
      url: "/static/excel/专利模板.xlsx",
      action: getPatentExcel,
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
    ...mapGetters(["getAuthObj","getSearchParams",'getUserInfo'])
  },
  created() {
    this.$store.dispatch("setHeight", 100);
    this.getPilotList();
    this.getIsUser();
  },
 
  mounted() {
    this.initData();
  },
  methods: {
     /**
     * 撤回
     */
    async recallApply(row) {
      this.$confirm(`确定撤回【${row.patentName}】申请`, "系统提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        lockScroll: false,
        type: "warning"
      })
        .then(async () => {
          const bool = await recallApplyCommon(row.id, this.$route.name);
          if (bool) {
            this.$message.success('操作成功');
            this.getPilotList();
          }
        })
        .catch(() => {});
    },
    /**
     * 判断是否是专利管理员
     */
    async getIsUser() {
      const { code, data } = await getIsUser();
      if (code === 1) {
        this.userShow = data;
      }
    },
    /**
     * 查询项目申报列表
     */
    async getPilotList() {
      const { code, data, total } = await getRpmList({
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
     *  修改
     * @param row
     */
    handleEditeClick(row) {
      this.$router.push({
        name: "patentpage",
        query: { type: "edit", id: row.id, statusCode: row.statusCode }
      });
    },
    /**
     *  查看
     * @param row
     */
    handleDetails(row) {
      this.$router.push({
        name: "patentpage",
        query: { type: "view", id: row.id, statusCode: row.statusCode }
      });
    },
    /**
     *  删除数据
     * @param row
     */
    async handleDelete(row) {
      const { code, date } = await deleteRpm({
        id: row.id
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

      this.getPilotList();
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
     * 获取上传列表
     * @param val
     */
    getFileList(status) {
      if (status) {
        this.getPilotList();
      }
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
    }
  }
};
</script>

<style>
</style>