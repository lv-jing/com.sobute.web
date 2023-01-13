<template>
  <div v-if="getUserInfo&&getUserInfo.type!==1">
    <!-- <div
      v-if="!userShow && $route.query.codeType!=='2005104' && ['add','edit'].includes($route.query.type)"
    >
      <common-title title="审批列表" class="md20" />

      <el-table
        ref="multipleTableRow"
        :data="approvePserson"
        stripe
        highlight-current-row
        style="width: 100%;margin-top:10px;"
        :header-cell-style="{background:'#f3f3f3'}"
      >
        <el-table-column type="index" label="顺序"></el-table-column>
        <el-table-column prop="employeeNum" label="员工编号"></el-table-column>
        <el-table-column prop="employeeName" label="审批人"></el-table-column>
      </el-table>
      <div style="margin-top: 20px"></div>
    </div>-->
    <div class="timeline-style">
      <common-title title="审批记录" class="md20" />
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :type="activity.result==0?'danger':'primary'"
          size="large"
          :color="color[activity.result]"
          :timestamp="activity.endTime"
        >
          <span>{{activity.assigneeName}}</span>
          <span class="ml10">{{activity.name}}</span>
          <span
            :style="{color:color[activity.result]}"
            class="ml20"
          >【{{statusName[activity.result]}}】</span>
          <span class="ml20">{{activity.remarks}}</span>
          <span class="ml20">{{activity.score&&'考核系数：'+activity.score+''||""}}</span>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import { mapGetters } from "vuex";
import { getHrList, allNarmalInterface } from "@/service/common";
import { getApprovedHistoryList } from "@/service/rpm";

export default {
  props: {
    type: [String, ""],
    selectRows: {
      type: Array,
      default: () => []
    },
    processParam: {
      type: Object,
      default: () => {}
    },
    userShow: {
      type: Boolean,
      default: () => false
    },
    statusCode: {
      type: [Number, String],
      default: () => "2005101"
    }
  },

  data() {
    return {
      _statusCode: "",
      employeeName: "",
      options: [],
      approvePserson: [],
      oldSort: [],
      className: [
        "text-danger",
        "text-success",
        "text-color-999",
        "text-success"
      ],
      activities: [],
      statusName: ["已拒绝", "已同意", "待处理", "已提交", "已撤回", "已转发"],
      color: ["#FF5252", "#86BC25", "#999999", "#0070C1", "#E6A23C", "#3282B8"]
    };
  },

  computed: {
    ...mapGetters(["getUserInfo", "getHandlerSave"])
  },
  watch: {
    deep:true,
    getHandlerSave(val) {
      console.log(val,'----');
      
      setTimeout(() => {
        const { id } = this.$route.query;
        this.initData({ id });
      }, 1000);
    },
    statusCode(val) {
      this._statusCode = val;
      this.initData();
    },
    processParam(val) {
      this.initData(val);
    }
  },
  mounted() {
    setTimeout(() => {
      this.initData();
    }, 500);
  },
  methods: {
    initData(val = {}) {
      let { id } = this.$route.query;
      let type = this.getUserInfo && this.getUserInfo.type;
      let statusCode = this.statusCode || this._statusCode;
      if (statusCode === "2005101" && id && type == 0) {
        this.getApprovedTableList();
      } else {
        if (id) {
          this.getApprovedHistoryList({
            bizId: id,
            ...val
          });
        }
      }
    },
    /**
     * 查询审核人员审批状态
     */
    async getApprovedHistoryList(arg) {
      const { code, data } = await getApprovedHistoryList({
        ...arg,
        processDefineName: "project-approve"
      });
      if (code === 1) {
        this.activities = data;
      }
    },
    async getApprovedTableList() {
      let { id } = this.$route.query;
      const { code, data } = await allNarmalInterface(
        {
          params: { bizId: id }
        },
        "service/project/wf/approved-list",
        "get"
      );
      if (code === 1) {
        this.activities = data;
      }
    }
  }
};
</script>
<style lang="scss">
.timeline-style {
  background: #f5f7fa;
  padding: 10px 20px;
}
</style>