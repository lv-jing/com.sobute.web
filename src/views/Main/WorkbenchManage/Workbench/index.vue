  <template>
  <div class="sobute-workbench">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>我的工作台</span>
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
      <el-tabs v-model="activeName" @tab-click="clickWorks">
        <el-tab-pane label="待办事项" name="WAITING_TYPE"></el-tab-pane>
        <el-tab-pane label="已办事项" name="COMPLETE_TYPE"></el-tab-pane>
        <el-tab-pane label="我的事项" name="MESSAGE_TYPE"></el-tab-pane>
        <el-tab-pane label="我的通知" name="NOTICE_TYPE"></el-tab-pane>
      </el-tabs>

      <el-table
        :data="tableData"
        stripe
        highlight-current-row
        style="width: 100%"
        :header-cell-style="{background:'#f3f3f3'}"
      >
        <el-table-column type="index" label="NO"></el-table-column>
        <el-table-column prop="bizTypeName" width="110" label="类型"></el-table-column>
        <el-table-column prop="bizDocumentNumber" width="150" label="单据编号"></el-table-column>

        <el-table-column label="名称">
          <template v-slot="{row}">
            <!-- <span v-if="getAuthObj.flagAdd||isIndex==2" type="text">{{row.bizTitle}}</span> -->
            <el-button type="text" @click="applyRPM(row)">{{row.bizTitle}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="empolyeeName" label="提交人" width="100"></el-table-column>
        <el-table-column prop="createTime" label="处理时间" width="150"></el-table-column>
        <el-table-column prop="bizStatus" label="状态" width="100"></el-table-column>
      </el-table>
      <common-pagination v-on:handler-currentPage="handlerCurrentPage" :list="search"></common-pagination>
    </el-card>

    <!-- 个人信息 -->
    <el-dialog title="审核信息" width="40%" :lock-scroll="false" :visible.sync="dialogUserVisible">
      <table class="user-info_table">
        <tr>
          <td style="width:20%">姓名:</td>
          <td style="width:29%">{{userInfo.alias}}</td>
          <td style="width:20%">用户名:</td>
          <td style="width:29%">{{userInfo.username}}</td>
        </tr>
        <tr>
          <td>性别:</td>
          <td>{{sexText[userInfo.sex]}}</td>
          <td>用户类型:</td>
          <td>{{userInfo.type==0?'内部':'外部'}}</td>
        </tr>

        <tr>
          <td>手机号码:</td>
          <td>{{userInfo.phone}}</td>
          <td>电子邮件:</td>
          <td>{{userInfo.email}}</td>
        </tr>
        <tr>
          <td>身份证号:</td>
          <td colspan="3">{{userInfo.idCard}}</td>
        </tr>
        <tr>
          <td>单位名称:</td>
          <td colspan="3">{{userInfo.company}}</td>
        </tr>
        <tr>
          <td>备注:</td>
          <td colspan="3">{{userInfo.remarks}}</td>
        </tr>
      </table>

      <el-form :rules="rules" :model="form" ref="form" label-width="100" v-if="type==0">
        <el-form-item label="审核意见" prop="remarks">
          <el-input
            type="textarea"
            :show-sord-limit="true"
            :maxlength="1333"
            v-model="form.remarks"
            placeholder="请输入审核意见"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="type==0">
        <el-button @click="dialogUserVisible = false">取 消</el-button>
        <el-button icon="el-icon-close" type="danger" @click="handleRefuse('form')">拒绝</el-button>
        <el-button type="primary" icon="el-icon-check" @click="handleOk">同意</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import { searchFormRule } from "./rules";
import { routerJump ,deepCloneClear} from "@/utils/tools";

import { getUserDetails } from "@/service/user";
import { updateAoorove } from "@/service/common";
import { getProjectParamsItems } from "@/service/project";
import db from "@/assets/images/db.png";
import yb from "@/assets/images/yb.png";
import dy from "@/assets/images/dy.png";
import yy from "@/assets/images/yy.png";
import { mapGetters } from "vuex";
import Cookies from "js-cookie";
export default {
  name: "workbench",
  data() {
    return {
      activeName: "WAITING_TYPE",
      form: {
        remarks: ""
      },
      searchFormModel: {},
      searchFormRule: searchFormRule,
      searchOption: {
        submitBtn: false,
        resetBtn: false
      },
      rules: {
        remarks: [
          { required: true, message: "请输入审核意见", trigger: "blur" }
        ]
      },
      sexText: ["", "男", "女", "保密"],
      
      dialogUserVisible: false,
      userInfo: {},
      currentItem: {},
      tableData: [],
      search: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      
      type: 0
    };
  },
  computed: {
    ...mapGetters(["getAuthObj","getSearchParams"])
  },
  created() {
    this.$store.dispatch("setHeight", 100);
    // this.getWorksCount();

    const { type, activeName } = this.$route.query;
    if (type) {
      // this.type = type;
      this.activeName = activeName;
    }

    this.tableRequestDataType(activeName);
  },
  methods: {
       /**
     * 初始化表单数据
     */
    initData() {
      const formData = this.searchFormModel.formData();
      let clearFormData = deepCloneClear(formData);
      this.searchFormModel.setValue(clearFormData);
    },
    /**
     * 通知
     */
    async getNoticeList(pageNum = 1) {
      const userProfile = Cookies.getJSON("userInfo") || {};
      const { code, data, total } = await getProjectParamsItems(
        {
          pageNum,
          pageSize: 10,
          ...this.search,
          empolyeeNumber: userProfile.username,
          ...this.getSearchParams
        },
        "notice/list"
      );
      if (code === 1) {
        this.tableData = data;
        this.search.total = total;
      }
    },
    /**
     * 我的信息
     */
    async getMyMessageList(pageNum = 1) {
      const userProfile = Cookies.getJSON("userInfo") || {};
      const { code, data, total } = await getProjectParamsItems(
        {
          pageNum,
          pageSize: 10,
          ...this.search,
          empolyeeNumber: userProfile.username,
           ...this.getSearchParams
        },
        "message/list"
      );
      if (code === 1) {
        this.tableData = data;
        this.search.total = total;
      }
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
     * 查询
     */
    formSearchMethod(self,reset) {
      let formData = self.$f.formData();
      
      this.search = {
        ...formData,
        pageNum: 1,
        pageSize: 10,
        total: 0
      };
      this.$saveSearchParam({searchForm:this.search,reset})

      this.tableRequestDataType();
    },
    /**
     * 拒绝
     */
    handleRefuse(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.updateAoorove(0);
        }
      });
    },
    /**
     * 同意
     */
    handleOk() {
      this.updateAoorove(1);
    },

    async updateAoorove(val) {
      const { bizType, taskId } = this.currentItem;
      const params = {
        bizType,
        remarks: this.form.remarks,
        result: val,
        taskId
      };
      const { code, data } = await updateAoorove(params);
      if (code === 1) {
        this.dialogUserVisible = false;
        this.currentItem = {};
        this.remarks = "";
        this.getWorksList();
      }
    },
    applyRPM(item, index) {
      // console.log(item)
      // if(item.bizStatusCode!=='2005104'){
      if (item.bizType === "project-achievement") {
        this.getBizTypeCode(item);
      } else if (item.bizType === "register-out-user") {
        this.getUserDetails(item);
      } else {
        routerJump(item,{},this.activeName);
      }
      // }
    },
    /**
     * 用户详情
     */
    async getUserDetails(item) {
      const { code, data } = await getUserDetails({ guid: item.bizId });
      if (code === 1) {
        this.currentItem = item;
        this.dialogUserVisible = true;
        if (data) {
          this.$nextTick(() => {
            this.userInfo = data || {};
          });
        }
      }
    },
    clickWorks(tab, e) {
      this.activeName = tab.name;
      this.type = tab.index;
      this.$set(this.search, "pageNum", 1);
      this.tableRequestDataType(tab.name);
    },
    tableRequestDataType(activeName = this.activeName) {
      if (activeName === "NOTICE_TYPE") {
        this.getNoticeList();
      } else if (activeName === "MESSAGE_TYPE") {
        this.getMyMessageList();
      } else {
        this.getWorksList();
      }
    },
    /**
     * 获取 成果code
     */
    async getBizTypeCode(item) {
      const { code, data } = await getProjectParamsItems(
        {
          bizId: item.bizId,
          bizType: "project-achievement"
        },
        "wf/biz"
      );
      if (code === 1) {
        data && routerJump(item, { typeCode: data.typeCode },this.activeName);
      }
    },

    /**
     * 获取代办已办 数量
     */
    async getWorksCount() {
      const { code, data } = await getProjectParamsItems(
        {
          processDefineName: "project-approve"
        },
        "wf/count"
      );
      if (code === 1) {
        this.cardList[0].count = data.waitingCount;
        this.cardList[1].count = data.handledCount;
      }
    },
    /**
     * 获取列表数据
     */
    async getWorksList() {
      const { code, data, total } = await getProjectParamsItems(
        {
          ...this.search,
          processDefineName: "project-approve",
          type: this.type,
           ...this.getSearchParams
        },
        "wf/list"
      );
      if (code === 1) {
        this.tableData = data;
        this.search.total = total;
      }
    },
    /**
     * 分页查询
     */
    handlerCurrentPage(list) {
      //console.log(list)
      this.search = {
        ...this.search,
        ...list
      };

      this.tableRequestDataType(this.activeName);
    }
  }
};
</script>

<style lang="scss" scoped>
.workbench-card {
  dl {
    margin: 0 1%;
    dt {
      height: 90px;
      border: 1px solid $color-dddddd;
      border-radius: 4px 4px 0 0;
      font-family: ASNormal;
      padding: 0 5%;
    }
    dd {
      height: 50px;
      padding: 0 5%;
      color: $color-white;
      border-radius: 0 0 4px 4px;
    }
  }
}
.user-info_table {
  width: 100%;
  tr {
    :nth-child(1),
    :nth-child(3) {
      text-align: right;
      // background: rgb(218, 237, 245);
    }
    td {
      padding: 10px;
      border: 1px solid #ddd;
      font-size: 13px;
    }
  }
}
</style>