<!--  操作组件 -->
<template>
  <div class="tc">
    <el-button
      type="text"
      v-if="!getAuthObj.flagAdd && row.statusCode==='2005104'&&row.applyFlag===1"
      @click="handleApprova(row)"
    >{{applyTitle}}</el-button>

    <el-button type="text" size="mini" circle @click="handleDetails(row)">查看</el-button>

    <template
      v-if="['changes','approval','projectdeclare','declaration','plan','summary','SummaryOutside','acceptManage','PersonalSummary'].includes(pageUrlName)"
    >
      <el-button
        v-if="(row.operateFlag||'').indexOf('W')>-1"
        type="text"
        @click="handleEditeClick(row)"
        size="mini"
        circle
      >编辑</el-button>
      <el-popconfirm
        v-if="(row.operateFlag||'').indexOf('D')>-1"
        title="确认删除该条记录吗?"
        @onConfirm="handleDelete(row)"
      >
        <el-button slot="reference" type="text" size="mini" circle>删除</el-button>
      </el-popconfirm>
    </template>

    <template v-else>
      <el-button
        v-if="!getAuthObj.flagAdd && statusCode[row.statusCode]"
        type="text"
        @click="handleEditeClick(row)"
        size="mini"
        circle
      >编辑</el-button>
      <el-popconfirm
        v-if="!getAuthObj.flagAdd && row.statusCode==='2005101'|| row.statusCode==='2005105'"
        title="确认删除该条记录吗?"
        @onConfirm="handleDelete(row)"
      >
        <el-button slot="reference" type="text" size="mini" circle>删除</el-button>
      </el-popconfirm>
    </template>

    <el-button v-if="isDown && !getAuthObj.flagAdd" type="text" @click="exportFile(row)">导出</el-button>

    <el-button
      size="mini"
      class="ml10"
      type="text"
      @click="recallApply(row)"
      v-if="row.statusCode==='2005103'&&row.createdBy===getUserInfo.username"
    >撤回</el-button>
  </div>
</template>

<script>
/* eslint-disable */
import { exportFile, recallApplyCommon } from "@/utils/tools";
import {
  createProjectItem,
  createPilotProductionItem
} from "@/service/project";
import { mapGetters } from "vuex";

export default {
  name: "common-operation",
  props: {
    applyTitle: {
      type: String,
      default: () => "生成申请"
    },
    // 表格数据
    row: {
      type: Object,
      default: () => {}
    },
    // 详情接口封装name
    urlName: {
      type: String,
      default: () => ""
    },
    // 页面跳转路由名称
    pageUrlName: {
      type: String,
      default: () => ""
    },
    // 下载接口
    downUrl: {
      type: String,
      default: () => ""
    },
    // 删除接口地址
    deletUrl: {
      type: Function,
      default: res => {
        return res;
      }
    },
    // 列表请求数据接口方法
    getPageList: {
      type: Function,
      default: res => {
        return res;
      }
    },
    // 是否显示导出按钮
    isDown: {
      type: Boolean,
      default: () => false
    },
    // 成果需要传typeCode
    typeCode: {
      type: Boolean,
      default: () => false
    },
    // 成果需要传typeCode
    isUserType: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      userProfile: {},
      statusCode: {
        2005101: true,
        2005102: false,
        // 成果已审批编辑入库为不受限人员 || 立项，中试。计划 管理员可操作已审批
        2005104: this.typeCode || this.isUserType,
        2005105: true,
        // 立项管理员关闭状态能编辑
        2005106: this.isUserType,
        // 成果入库
        2005107: this.typeCode && this.isUserType
      }
    };
  },
  computed: {
    ...mapGetters(["getAuthObj","getUserInfo"])
  },
  watch: {
    isUserType: {
      handler(newValue) {
        this.isUserType = newValue;
      },
      immediate: true, //关键
      deep: true
    }
  },
  methods: {
    /**
     * 撤回
     */
    async recallApply(row) {
      this.$confirm(`确定撤回该申请吗？`, "系统提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        lockScroll: false,
        type: "warning"
      })
        .then(async () => {
          const bool = await recallApplyCommon(row.id, this.$route.name);
          if (bool) {
            this.$message.success('操作成功');
            this.getPageList();
          }
        })
        .catch(() => {});
    },
    /**
     *  修改
     * @param row
     */
    handleEditeClick(row) {
      this.$router.push({
        name: this.pageUrlName,
        query: {
          type: "edit",
          id: row.id,
          typeCode: row.typeCode,
          codeType: row.statusCode
        }
      });
    },
    /**
     *  查看
     * @param row
     */
    handleDetails(row) {
      // console.log("查看");
      // console.log(row);
      if (this.typeCode) {
        this.$router.push({
          name: this.pageUrlName,
          query: { type: "view", id: row.id, typeCode: row.typeCode }
        });
      } else {
        this.$router.push({
          name: this.pageUrlName,
          query: { type: "view", id: row.id }
        });
      }
    },
    /**
     *  删除数据
     * @param row
     */
    async handleDelete(row) {
      const { code } = await this.deletUrl(
        {
          id: row.id
        },
        this.urlName
      );
      if (code === 1) {
        this.getPageList();
        this.$message({
          type: "success",
          message: " 操作成功"
        });
      }
    },
    /**
     * 导出
     */
    exportFile(row) {
      exportFile(`${this.downUrl}${row.id}`, "", `${row.projectName}.doc`);
    },
    /**
     * 生成申报
     */
    handleApprova(row) {
      this.createApproval(row);
    },
    async createApproval(obj) {
      if (this.applyTitle === "生成申请") {
        const { code, data } = await createProjectItem(
          {},
          `confirm-apply/apply/${obj.id}`
        );
        if (code === 1) {
          this.$router.push({
            name: "projectdeclare",
            query: { type: "edit", id: data.id }
          });
        }
      } else if (this.applyTitle === "生成试生产") {
        const { code, data } = await createPilotProductionItem(
          {},
          `pilotProduction/apply/${obj.id}`
        );
        if (code === 1) {
          this.$router.push({
            name: "pilotProduction",
            query: { type: "edit", id: data.id }
          });
        }
      } else {
        const { code, data } = await createProjectItem(
          {},
          `confirm/apply/${obj.id}`
        );
        if (code === 1) {
          this.$router.push({
            name: "approval",
            query: { type: "edit", id: data.id }
          });
        }
      }
    }
  }
};
</script>

<style scoped>
</style>