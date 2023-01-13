<template>
  <div>
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix flex flex-center-between">
        <span>外部人员</span>
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
        <!--<el-button-->
          <!--type="primary"-->
          <!--v-if="!getAuthObj.flagAdd"-->
          <!--icon="iconfont sbt_add"-->
          <!--@click="showModel"-->
        <!--&gt;添加用户</el-button>-->

        <el-table
          :data="tableData"
          class="mt10"
          stripe
          highlight-current-row
          style="width: 100%"
          :header-cell-style="{background:'#f3f3f3'}"
          size="small"
        >

          <el-table-column prop="empolyeeName" label="员工姓名"></el-table-column>
          <el-table-column prop="telephone" label="手机号码" width="120px"></el-table-column>
          <el-table-column prop="gender" label="性别">
            <template slot-scope="scope">{{sexText[scope.row.gender]}}</template>
          </el-table-column>
          <!--<el-table-column label="受限">-->
            <!--<template slot-scope="scope">{{['否','是'][scope.row.confined]}}</template>-->
          <!--</el-table-column>-->
          <el-table-column prop="email" label="电子邮件" width="150px"></el-table-column>
          <el-table-column prop="company" label="所在单位" width="200px"></el-table-column>
          <el-table-column prop="title" label="职称"></el-table-column>
          <el-table-column prop="position" label="职务"></el-table-column>
          <el-table-column prop="major" label="从事专业"></el-table-column>
          <el-table-column prop="department" label="部门" width="200px"></el-table-column>
          <el-table-column prop="degree" label="学历"></el-table-column>

          <!--<el-table-column prop="status" label="有效时间" width="200">-->
            <!--<template slot-scope="scope">-->
              <!--<p>-->
                <!--{{scope.row.beginTime||'-'}}&nbsp;-->
                <!--<span>至</span>-->
                <!--&nbsp;-->
                <!--{{scope.row.endTime||'-'}}-->
              <!--</p>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column label="操作"  fixed="right" align="center" width="100" v-if="!getAuthObj.flagAdd">
            <template slot-scope="scope">
              <div class="tc" v-if="scope.row.fixed!==1">
                <el-button type="text" @click="handleEditeClick(scope.row)" size="mini">编辑</el-button>
                <el-popconfirm
                  title="确认删除该条记录吗?"
                  @onConfirm="handleDeleteClick(scope.row.id)"
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
         <div class="mt10">
          <form-create v-model="addEditFormModel" :rule="addEidtFormRule" :option="addEditOption"></form-create>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
/* eslint-disable */
import {
  getAllOutsidersList,
  addUserInfo,
  updateOutsiderInfo,
  openOrStopUserStutas,
  deleteOutsiderInfo
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
          if(this.title === '编辑用户'){
            this.handleEditeInterface(formData);
          }else {
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
    this.getAllOutsidersList();
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
      this.getAllOutsidersList();
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
    async getAllOutsidersList() {
      const { code, data, total } = await getAllOutsidersList(this.searchForm);
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
      this.getAllOutsidersList();
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
      //   let section_day = [item.beginTime || "", item.endTime || ""];
         this.addEditFormModel.setValue({ ...item});
      //   // this.addEditFormModel.disabled(true, "username");
      //   // this.addEditFormModel.disabled(true, "email");
      //
      //   if (item.type == 1) {
      //     this.addEditFormModel.disabled(true, "confined");
      //   } else {
      //     this.addEditFormModel.disabled(false, "confined");
      //   }
      //   this.currentItem = item;
      //   this.getRolesList(item.guid);
      });
    },

    /**
     * 编辑接口
     */
    async handleEditeInterface(item) {
      const { code, data } = await updateOutsiderInfo(item);
      if (code === 1) {
        this.handleClose();
        this.$message({
          type: "success",
          message: "操作成功"
        });
      }
      
    },
    /**
     * 删除
     */
    async handleDeleteClick(id) {
      const { code, data } = await deleteOutsiderInfo(id);
      if (code === 1) {
        this.$message({
          type: "success",
          message: "操作成功"
        });
        this.getAllOutsidersList();
      }

    },
    /**
     *关闭抽屉
     */
    handleClose() {
      this.show = false;
      this.addEditFormModel.resetFields();
      this.getAllOutsidersList();
      this.title = "添加用户";
    }
  }
};
</script>

<style lang="scss" scoped>
</style>