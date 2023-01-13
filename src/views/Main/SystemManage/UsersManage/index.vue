<template>
  <div>
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix flex flex-center-between">
        <span>用户管理</span>
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
          v-if="!getAuthObj.flagAdd"
          icon="iconfont sbt_add"
          @click="showModel"
        >添加用户</el-button>

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
          <el-table-column prop="phone" label="手机号码"></el-table-column>
          <!-- <el-table-column prop="sex" label="性别">
            <template slot-scope="scope">{{sexText[scope.row.sex]}}</template>
          </el-table-column>-->
          <el-table-column label="受限">
            <template slot-scope="scope">{{['否','是'][scope.row.confined]}}</template>
          </el-table-column>
          <el-table-column prop="email" label="电子邮件"></el-table-column>
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
              <div class="tc" v-if="scope.row.fixed!==1">
                <el-button type="text" @click="handleEditeClick(scope.row)" size="mini">编辑</el-button>
                <el-popconfirm
                  title="确认删除该条记录吗?"
                  @onConfirm="handleDeleteClick(scope.row,scope.$index)"
                >
                  <el-button class="ml10" slot="reference" type="text" size="mini">删除</el-button>
                </el-popconfirm>
              </div>
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
         <el-row>
           <el-col :span="20" :offset="4">
             <el-select
            v-model="chooseUser"
            placeholder="请输入姓名或者用户名进行查询"
            filterable
            remote
            :remote-method="remoteMethod"
            :loading="loading"
            class="w-100"
            @change="selectUser"
            clearable
            :disabled="title === '编辑用户'"
          >
            <el-option
              v-for="item in options"
              :key="item.username"
              :label="item.idName"
              :value="item.username"
            ></el-option>
          </el-select>
           </el-col>
         </el-row>
         <div class="mt10">
           <el-divider content-position="left">用户信息</el-divider>
        <form-create v-model="addEditFormModel" :rule="addEidtFormRule" :option="addEditOption"></form-create>
     </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
/* eslint-disable */
import {
  getAllUserList,
  addUserInfo,
  updateUserInfo,
  openOrStopUserStutas,
  deleteUserInfo
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
      title: "添加用户",
      searchFormModel: {},
      searchFormRule: searchFormRule,
      searchOption: {
        resetBtn: false,
        submitBtn: false,
        form: {
          size: "small"
        }
      },
      addEditFormModel: {},
      addEidtFormRule: addFormRule,
      addEditOption: {
        //表单提交事件
        onSubmit: formData => {
          //按钮进入提交状态
          this.addEditFormModel.submitBtnProps({ loading: true });
          formData.beginTime = formData.section_day[0];
          formData.endTime = formData.section_day[1];
          delete formData["section_day"];
          formData.roleGuids = [formData.roleGuids];
          if (this.currentItem.guid) {
            this.handleEditeInterface({ ...this.currentItem, ...formData });
          } else {
            this.handleAddClick(formData);
          }
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
      currentItem: {},
      searchForm: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },

      show: false,
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
    this.getAllUserList();
  },
  methods: {
   async remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
      //  setTimeout(async () => {//
          this.loading = false;
          let userNameOrIdName = query.toLowerCase();
          const { data } = await allNarmalInterface(
            { params: { userNameOrIdName } },
            "service/user/waiting-add",
            "get"
          );
          this.options=data
      //  }, 200);
      } else {
        this.options = [];
      }
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
      this.getAllUserList();
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
    async getAllUserList() {
      const { code, data, total } = await getAllUserList(this.searchForm);
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
      this.getAllUserList();
    },
    /**
     *   打开弹框
     */
    showModel() {
      this.show = true;
      this.$nextTick(() => {
        // this.addEditFormModel.disabled(false, "username");
        // this.addEditFormModel.disabled(false, "email");
        this.addEditFormModel.disabled(false, "confined");
        this.getRolesList();
      });
    },
    /**
     * 添加用户
     */
    async handleAddClick(params) {
      const { code, data } = await addUserInfo(params);
      if (code === 1) {
        this.handleClose();
        this.$message({
          type: "success",
          message: "操作成功"
        });
        this.addEditFormModel.submitBtnProps({ loading: false });
      } else {
        this.addEditFormModel.submitBtnProps({ loading: false });
      }

    },

    /**
     * 编辑打开弹框
     */
    handleEditeClick(item) {
      this.show = true;
      this.title = "编辑用户";
      this.$nextTick(() => {
        let section_day = [item.beginTime || "", item.endTime || ""];
        this.addEditFormModel.setValue({ ...item, section_day });
        // this.addEditFormModel.disabled(true, "username");
        // this.addEditFormModel.disabled(true, "email");

        if (item.type == 1) {
          this.addEditFormModel.disabled(true, "confined");
        } else {
          this.addEditFormModel.disabled(false, "confined");
        }
        this.currentItem = item;
        this.getRolesList(item.guid);
      });
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
     * 编辑接口
     */
    async handleEditeInterface(item) {
      const { code, data } = await updateUserInfo(item);
      if (code === 1) {
        // this.addEditFormModel.btn.disabled();
        this.handleClose();
        this.currentItem = {};
        this.$message({
          type: "success",
          message: "操作成功"
        });
        this.addEditFormModel.submitBtnProps({ loading: false });
      } else {
        this.addEditFormModel.submitBtnProps({ loading: false });
      }

    },
    /**
     * 删除
     */
    async handleDeleteClick({ guid }, index) {
      const { code, data } = await deleteUserInfo({ guid });
      if (code === 1) {
        this.tableData.splice(index, 1);
        this.$message({
          type: "success",
          message: "操作成功"
        });
      }
    },
    /**
     *关闭抽屉
     */
    handleClose() {
      this.show = false;
      this.addEditFormModel.resetFields();
      this.getAllUserList();
      this.title = "添加用户";
       this.chooseUser=''
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
