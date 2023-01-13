<template>
  <div>
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix flex flex-center-between">
        <span>人员信息</span>
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
          :data="tableData"
          class="mt10"
          stripe
          highlight-current-row
          style="width: 100%"
          :header-cell-style="{background:'#f3f3f3'}"
          size="small"
        >
          <el-table-column prop="alias" label="姓名"></el-table-column>
          <el-table-column prop="username" label="用户名"></el-table-column>
          <el-table-column prop="sex" label="性别">
            <template slot-scope="scope">{{sexText[scope.row.sex]}}</template>
          </el-table-column>
          <el-table-column prop="phone" label="手机号码" width="120px"></el-table-column>
          <el-table-column prop="idCard" label="身份证号码" width="180px"></el-table-column>
          <el-table-column prop="birthDate" label="生日" width="120px"></el-table-column>
          <el-table-column prop="company" label="所在单位" width="200px"></el-table-column>
          <el-table-column prop="title" label="职称"></el-table-column>
          <el-table-column prop="position" label="职务"></el-table-column>
          <el-table-column prop="major" label="从事专业"></el-table-column>
          <el-table-column prop="department" label="部门" width="200px"></el-table-column>
          <el-table-column prop="degree" label="学历"></el-table-column>
          <el-table-column label="受限">
            <template slot-scope="scope">{{['否','是'][scope.row.confined]}}</template>
          </el-table-column>
          <el-table-column prop="email" label="电子邮件" width="200px"></el-table-column>
          <el-table-column prop="type" label="类型">
            <template slot-scope="scope">{{scope.row.type===0?'内部人员':'外部人员'}}</template>
          </el-table-column>
          <el-table-column prop="status" label="有效时间" width="200">
            <template slot-scope="scope">
              <p>
                {{scope.row.beginTime||'-'}}&nbsp;
                <span>至</span>
                &nbsp;
                {{scope.row.endTime||'-'}}
              </p>
            </template>
          </el-table-column>
          <el-table-column label="操作"  align="center" width="100" v-if="!getAuthObj.flagAdd">
            <template slot-scope="scope">
                <el-button type="text" @click="handleEditeClick(scope.row)" size="mini">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>

        <common-pagination v-on:handler-currentPage="handlerCurrentPage" :list="searchForm"></common-pagination>
      </div>
    </el-card>
    <el-drawer
            :visible.sync="show"
            direction="rtl"
            :wrapperClosable="false"
            size="50%"
            :before-close="handleClose"
    >
      <div slot="title" v-text="title"></div>
      <div class="p15" style="overflow:auto;height:90vh">
        <div class="mt10">
          <el-divider content-position="left">人员信息</el-divider>
          <form-create v-model="addEditFormModel" :rule="addEidtFormRule" :option="addEditOption"></form-create>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
/* eslint-disable */
import {
  getAllUserInfoList,
  openOrStopUserStutas,
  editPersonInfo
} from "@/service/user";
import { allNarmalInterface } from "@/service/common";
import { getRolesList, getUserRoles } from "@/service/system";
import { searchFormRule, addFormRule } from "./rules";
import { mapGetters } from "vuex";
export default {
  name: "users",
  data() {
    return {
      chooseUser: "",
      tableData: [],
      statusText: ["停用", "启用"],
      sexText: ["", "男", "女", "保密"],
      searchFormModel: {},
      searchFormRule: searchFormRule,
      searchOption: {
        resetBtn: false,
        submitBtn: false,
        form: {
          size: "small"
        }
      },
      currentItem: {},
      searchForm: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      addEditFormModel: {},
      addEidtFormRule: addFormRule,
      addEditOption: {
        //表单提交事件
        onSubmit: formData => {
          //按钮进入提交状态
           //console.log(formData)
          // console.log(this.currentItem)
          this.addEditFormModel.submitBtnProps({ loading: true });
          this.handleEdit({ ...this.currentItem, ...formData });
        },
        submitBtn: {
          icon: "",
          col: {
            span: 8,
            offset: 4
          }
        },
        resetBtn: {
          icon: "",
          show: true,
          col: {
            span: 8,
            offset: 4
          }
        }
      },
      show: false,
      title:"",
      isIdCard: false,
      rolesData: [],
      options:[],
      loading:false
    };
  },
  computed: {
    ...mapGetters(["getAuthObj"])
  },
  created() {
    this.getAllUserInfoList();
  },
  methods: {
    /**
     * 编辑接口
     */
    async handleEdit(item) {
      const { code, data } = await editPersonInfo(item);
      if (code === 1) {
        this.handleClose();
        this.currentItem = {};
        this.$message({
          type: "success",
          message: "操作成功"
        });
        this.addEditFormModel.submitBtnProps({ loading: false });
        this.getAllUserInfoList();
      } else {
        this.addEditFormModel.submitBtnProps({ loading: false });
        this.getAllUserInfoList();
      }
    },
    /**
     * 编辑打开弹框
     */
    handleEditeClick(item) {
      this.show = true;
      this.title = "编辑人员信息";
      this.$nextTick(() => {
        this.addEditFormModel.setValue({ ...item });
        //item.department = item.department +"⭐" +item.departmentCode;
        this.currentItem = item;
      })
    },


    selectUser(el){
      const userInfo=this.options.find(item=>item.username===el);
      if(!userInfo)return
      this.$nextTick(()=>{
        this.addEditFormModel.setValue(userInfo)
      })
    },
    /**
     * 查询
     */
    formSearchMethod(self) {
      this.searchForm = {
        ...self.$f.formData(),
        pageNum: 1,
        pageSize: 10,
        total: 0
      };
      this.getAllUserInfoList();
    },
    /**
     * 重置
     */
    formResetMethod(self) {
      self.$f.resetFields();
      this.formSearchMethod(self);
    },
    /**
     * 查询所有列表
     */
    async getRolesList(guid) {
      const { code, data, total } = await getRolesList({
        pageNum: 1,
        pageSize: 1000
      });
      if (code === 1) {
        const list = [];
        data.map(item => {
          list.push({ value: item.guid, label: item.name });
        });
        this.addEditFormModel.updateRule("roleGuids", {
          options: list
        });
        guid && this.getUserRoles(guid);
      }
    },
    /**
     * 查询所有用户
     */
    async getAllUserInfoList() {
      const { code, data, total } = await getAllUserInfoList(this.searchForm);
      if (code === 1) {
        this.tableData = data;
        this.searchForm.total = total;
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
      this.getAllUserInfoList();
    },

    /**
     * 查询用户角色
     */
    async getUserRoles(guid) {
      const { code, data } = await getUserRoles({ guid });
      if (code === 1) {
        this.addEditFormModel.setValue("roleGuids", (data && data[0]) || "");
      }
    },
    /**
     *关闭抽屉
     */
    handleClose() {
      this.show = false;
      this.addEditFormModel.resetFields();
      // this.getAllUserList();
      // this.title = "添加用户";
      // this.chooseUser=''
    }
  }
};
</script>

<style lang="scss" scoped>
</style>