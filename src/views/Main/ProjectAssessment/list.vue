<template>
  <div class="bg-white">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix flex flex-center-between">
        <span>项目考核查询</span>
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
          @click="$router.push({name:'assessment',query:{type:'add'}})"
        >新增</el-button>
        <el-table
          class="mt10"
          :data="tableData"
          stripe
          highlight-current-row
          style="width: 100%"
          :header-cell-style="{background:'#f3f3f3'}"
        >
          <el-table-column prop="documentNumber" width="80" label="考核编号"></el-table-column>
          <el-table-column prop="projectNumber" width="100" label="项目编号"></el-table-column>
          <el-table-column prop="projectName" width="300" label="项目名称"></el-table-column>
          <el-table-column prop="managerName" label="预评组长"></el-table-column>
          <el-table-column prop="createdByName" label="创建人"></el-table-column>
          <el-table-column prop="year" width="100" label="年份"></el-table-column>
          <el-table-column prop="status" width="100" label="状态"></el-table-column>
          <el-table-column label="操作" align="center" width="200">
            <template v-slot="{row}">
              <div class="tc">
                <!-- 正常情况 非受限 -->
                <el-button
                  v-show="!getAuthObj.flagAdd && statusCode[row.statusCode]&&!userShow && username!==row.managerNum"
                  type="text"
                  @click="handleEditeClick(row)"
                  size="mini"
                  circle
                >编辑</el-button>
                <!-- 菜单不是只读，不是已完成状态，是管理员，非受限人员，不是预评组长 -->
                <el-button
                  v-show="!getAuthObj.flagAdd && row.statusCode!=='2005104'
                  && userShow && username!==row.managerNum"
                  type="text"
                  @click="handleEditeClick(row)"
                  size="mini"
                  circle
                >编辑</el-button>
                <!-- 不是菜单只读，不是已完成状态，是预评组长，不是已预评状态 -->
                <el-button
                  v-show="!getAuthObj.flagAdd && row.statusCode!=='2005104'&& username===row.managerNum&&row.statusCode!=='2005108'"
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
                <!--              v-if="!getAuthObj.flagAdd && statusCode[row.statusCode]&&!userShow-->
                <el-popconfirm
                  v-if="!getAuthObj.flagAdd && row.statusCode==='2005101'|| row.statusCode==='2005105'"
                  title="确认删除该条记录吗?"
                  @onConfirm="handleDelete(row)"
                >
                  <el-button slot="reference" type="text" size="mini" circle>删除</el-button>
                </el-popconfirm>
                <el-button
                  v-show="!getAuthObj.flagAdd&&userShow"
                  type="text"
                  @click="handleDown(row)"
                  size="mini"
                  circle
                >导出</el-button>
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
import { getExamineList, getExamineDelete, getIsUsers } from "@/service/assess";
import { searchFormRule } from "./rules";
import { mapGetters } from "vuex";
import Cookies from "js-cookie";
import { deepCloneClear, exportFile } from "@/utils/tools";
import { getAssessUrl } from "@/service/common";
export default {
  data() {
    return {
      downUrl: getAssessUrl,
      userProfile: {},
      username: "",
      userShow: false,
      statusCode: {
        2005101: true,
        2005102: false,
        2005105: true
      },
      deletUrl: getExamineDelete,
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
    ...mapGetters(["getAuthObj", "getSearchParams"])
  },
  created() {
    this.userProfile = Cookies.getJSON("userInfo");
    this.username = this.userProfile.username;
    console.log(this.userProfile.username);
    this.$store.dispatch("setHeight", 100);
    this.getPilotList();
    this.getIsUser();
  },
  watch: {
    userShow: {
      handler(newValue) {
        this.userShow = newValue;
      },
      immediate: true, //关键
      deep: true
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    /**
     * 判断是否是专利管理员
     */
    async getIsUser() {
      const { code, data } = await getIsUsers();
      if (code === 1) {
        this.userShow = data;
      }
    },
    /**
     * 查询项目申报列表
     */
    async getPilotList() {
      const { code, data, total } = await getExamineList({
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
        name: "assessment",
        query: { type: "edit", id: row.id, statuCode: row.statusCode }
      });
    },
    /**
     *  查看
     * @param row
     */
    handleDetails(row) {
      this.$router.push({
        name: "assessment",
        query: { type: "view", id: row.id }
      });
    },
    /**
     *  删除数据
     * @param row
     */
    async handleDelete(row) {
      const { code, date } = await getExamineDelete({
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
     * 导出
     */
    handleDown(row) {
      exportFile(`${this.downUrl}${row.id}`, "", `${row.projectName}.doc`);
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

      this.getPilotList();
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
      this.getPilotList();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>