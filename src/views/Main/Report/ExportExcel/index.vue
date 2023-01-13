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
      <common-exports
        :columns-list="columnsList"
        :excel-name="excelName"
        v-on:export-excel="exportExcel"
        :resource-list="resourceList"
      ></common-exports>

      <div class="user-form-table mt20">
        <el-table
          :data="tableData"
          stripe1
          style="width: 100%"
          :header-cell-style="{background:'#f3f3f3'}"
          size="small"
        >
          <el-table-column prop="alias" label="昵称"></el-table-column>
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
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">{{statusText[scope.row.status]}}</template>
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
        <form-create v-model="addEditFormModel" :rule="addEidtFormRule" :option="addEditOption"></form-create>
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
import { getRolesList, getUserRoles } from "@/service/system";
import { searchFormRule, addFormRule } from "./rules";
import { mapGetters } from "vuex";
export default {
  name: "users",
  data() {
    return {
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
          formData.beginTime = formData.section_day[0];
          formData.endTime = formData.section_day[1];
          delete formData["section_day"];

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
      // 导出需要添加的
      columnsList: {}, //表格的头部展示信息和对应的key 必须配置
      resourceList: [], // 数据源,
      pageIndexArray: [], //分页数据索引
      excelName: "用户管理" //数据导出名称
    };
  },
  computed: {
    ...mapGetters(["getAuthObj"])
  },
  created() {
    this.getAllUserList();
    //必须配置
    this.columnsList = {
      guid: "id",
      username: "用户名",
      phone: "手机号码",
      idCard: "身份证号码",
      type: "用户类型",
      sex: "性别",
      avatarUri: "头像",
      email: "电子邮件",
      alias: "昵称",
      remarks: "备注",
      reservedField1: "自定义字段1",
      reservedField2: "自定义字段2",
      reservedField3: "自定义字段3",
      beginTime: "开始时间",
      endTime: "结束时间",
      createTime: "创建时间",
      updateTime: "更新时间",
      loginTime: "登录时间",
      fixed: "是否内置数据",
      status: "状态",
      confined: "是否受限"
    };
  },
  methods: {
    /**
     * 导出数据事件
     */
    exportExcel() {
      this.getAllUserList(true);
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
        this.getUserRoles(guid);
      }
    },
    /**
     * 查询所有用户
     */
    async getAllUserList(bool) {
      let params = {};
      if (bool) {
        params = {
          ...this.searchForm,
          pageNum: 1,
          pageSize: 100000
        };
      } else {
        params = this.searchForm;
      }

      const { code, data, total } = await getAllUserList(params);
      if (code === 1) {
        //翻页分页 必须添加
        if (bool) {
          this.resourceList = data;
        } else {
          this.tableData = data;
          this.searchForm.total = total;
        }
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
        this.addEditFormModel.disabled(false, "username");
        this.addEditFormModel.disabled(false, "email");
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
      }
    },

    /**
     * 编辑打开弹框
     */
    handleEditeClick(item) {
      this.show = true;
      this.$nextTick(() => {
        this.addEditFormModel.setValue(item);
        this.addEditFormModel.disabled(true, "username");
        this.addEditFormModel.disabled(true, "email");
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
        this.addEditFormModel.setValue("roleGuids", data);
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
      }
    },
    /**
     * 删除
     */
    async handleDeleteClick({ guid }, index) {
      const { code, data } = await deleteUserInfo({ guid });
      if (code === 1) {
        this.tableData.splice(index, 1);
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
    }
  }
};
</script>

<style lang="scss" scoped>
</style>