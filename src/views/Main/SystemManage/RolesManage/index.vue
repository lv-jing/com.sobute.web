<template>
  <div>
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix flex flex-center-between">
        <span>角色管理</span>
        <el-button size="small" type="primary" icon="iconfont sbt_add" @click="showModel">{{title}}</el-button>
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
          stripe  highlight-current-row
          style="width: 100%"
          :header-cell-style="{background:'#f3f3f3'}"
          size="small"
        >
          <el-table-column prop="nameEn" label="角色英文名"></el-table-column>
          <el-table-column prop="name" label="角色名"></el-table-column>
          <el-table-column prop="remarks" label="备注"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">{{statusText[scope.row.status]}}</template>
          </el-table-column>
          <el-table-column label="操作"  align="center" width="150" v-if="!getAuthObj.flagAdd">
            <template slot-scope="scope">
              <div class="flex flex-center-around">
                <el-button
                  title="配置权限"
                  @click="roleConfigModal(scope.row)"
                  slot="reference"
                  type="text"
                  size="mini"
                >配置权限</el-button>
                <el-button
                  title="编辑"
                  type="text"
                  @click="handleEditeClick(scope.row)"
                  size="mini"
                >编辑</el-button>
                <el-popconfirm
                  title="确认删除该条记录吗?"
                  @onConfirm="handleDeleteClick(scope.row,scope.$index)"
                >
                  <el-button slot="reference" type="text" size="mini">删除</el-button>
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
      <div class="p15">
        <form-create v-model="addEditFormModel" :rule="addEidtFormRule" :option="addEditOption"></form-create>
      </div>
    </el-drawer>

    <el-dialog title="配置权限" :lock-scroll="false" :visible.sync="dialogVisible" width="30%">
      <div style="min-height:200px">
        <el-tree
          ref="tree"
          :data="treeData"
          show-checkbox
          highlight-current
          node-key="guid"
          :props="defaultProps"
        >
          <span class="custom-tree-node" slot-scope="{ node,data }">
            <span>{{ node.label }}</span>
            <span v-if="!data.children">
              <el-checkbox v-model="data.flagAdd">只读</el-checkbox>
            </span>
          </span>
        </el-tree>
      </div>

      <div class="tr" slot="footer">
        <el-button type="primary" @click="handleCheckChange">确定</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import {
  getResourceMenuAllList,
  getResourceRoleConfig,
  addRolesConfig,
  getRolesList,
  addRoles,
  updateRoles,
  deleteRoles
} from "@/service/system";
import Cookies from "js-cookie";
import { searchFormRule, addFormRule } from "./rules";
import {mapGetters} from "vuex";
export default {
  name: "users",
  data() {
    return {
      tableData: [],
      resGuids: [],
      treeData: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      statusText: ["停用", "启用"],
      sexText: ["", "男", "女", "保密"],
      title: "添加角色",
      dialogVisible: false,
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
      show: false
    };
  },
    computed: {
        ...mapGetters(['getAuthObj'])
    },
  created() {
    this.getRolesList();
    this.getMenuAllList();
  },
  methods: {
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
      this.getRolesList();
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
    async getRolesList() {
      const { code, data, total } = await getRolesList(this.searchForm);
      if (code === 1) {
        this.tableData = data;
        this.searchForm.total = total;
      }
    },
    /**
     * 获取全部树菜单
     */
    async getMenuAllList() {
      const { code, data } = await getResourceMenuAllList({
        sysNameEn: 2000101
      });
      if (code === 1) {
        this.treeData = data;
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
      this.getRolesList();
    },
    /**
     *   打开弹框
     */
    showModel() {
      this.show = true;
    },
    /**
     * 添加
     */
    async handleAddClick(params) {
      const { code, data } = await addRoles(params);
      if (code === 1) {
        this.handleClose();
        this.$message({
            type:'success',
            message:'操作成功'
          })
          this.addEditFormModel.submitBtnProps({ loading: false });

      }
    },
    /**
     * 编辑打开弹框
     */
    handleEditeClick(item) {
      this.show = true;
      this.title = "编辑角色";
      this.$nextTick(() => {
        this.addEditFormModel.setValue(item);
        this.currentItem = item;
      });
    },
    /**
     * 编辑接口
     */
    async handleEditeInterface(item) {
      const { code, data } = await updateRoles(item);
      if (code === 1) {
        this.handleClose();
        this.currentItem = {};
        this.$message({
            type:'success',
            message:'操作成功'
          })
          this.addEditFormModel.submitBtnProps({ loading: false });

      }
    },
    /**
     * 删除
     */
    async handleDeleteClick({ guid }, index) {
      const { code, data } = await deleteRoles({ guid });
      if (code === 1) {
        this.tableData.splice(index, 1);
        this.$message({
            type:'success',
            message:'操作成功'
          })
      }
    },
    /**
     * 获取角色配置权限
     */
    async roleConfigModal(item) {
      const { code, data } = await getResourceRoleConfig({ guid: item.guid });
      if (code === 1) {
        let list = data.filter(item => item.type !== 0);
        let temp = this.treeData.slice();
        let treeDataConcat = arr => {
          for (let item of arr) {
            if (item.children && item.children.length > 0) {
              treeDataConcat(item.children);
            }
            list.map(ch => {
              if (item.guid === ch.guid) {
                this.$set(item, "flagAdd", ch.flagAdd);
                this.$set(item, "flagDel", ch.flagDel);
                this.$set(item, "flagQuery", ch.flagQuery);
                this.$set(item, "flagUpdate", ch.flagUpdate);
              }
            });
            // return item;
          }
        };
        treeDataConcat(this.treeData);
        this.dialogVisible = true;
        this.$nextTick(() => {
          this.$refs.tree.setCheckedNodes(list);
        });
        this.currentItem = item;
      }
    },
    /**
     * 设置角色配置权限
     */
    async handleCheckChange(e) {
      let resGuids = this.$refs.tree.getCheckedKeys();
      let halfNode = this.$refs.tree.getHalfCheckedKeys();
      for (let item of halfNode) {
        if (!resGuids.includes(item)) {
          resGuids.push(item);
        }
      }
      let resList = await this.loopTreeDataToRoles(resGuids);
      const { code, data } = await addRolesConfig({
        guid: this.currentItem.guid,
        resList
      });
      if (code === 1) {
        this.handleClose("dialog");
         const usrInfo = Cookies.getJSON("userInfo");
      this.$store.dispatch("setAuthoMenuList", { guid: usrInfo.guid });
       this.$message({
            type:'success',
            message:'操作成功'
          })
     
      }
    },
    /**
     * 递归树形结构
     */
    loopTreeDataToRoles(resGuids) {
      return new Promise(resolve => {
        let resourceGuids = [];

        let tempTree = arr => {
          for (let item of arr) {
            if (item.children && item.children.length > 0) {
              tempTree(item.children);
            }
            for (let guid of resGuids) {
              if (item.guid === guid) {
                resourceGuids.push({
                  flagAdd: item.flagAdd,
                  flagDel: item.flagAdd,
                  flagQuery: false,
                  flagUpdate: item.flagAdd,
                  resourceGuid: guid
                });
              }
            }
          }
        };
        tempTree(this.treeData);

        resolve(resourceGuids);
      });
    },

    /**
     *关闭抽屉
     */
    handleClose(type = "") {
      if (type === "dialog") {
        this.dialogVisible = false;
        return;
      }
      this.show = false;
      this.addEditFormModel.resetFields();
      this.getRolesList();
      this.title = "添加角色";
    }
  }
};
</script>

<style lang="scss" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>