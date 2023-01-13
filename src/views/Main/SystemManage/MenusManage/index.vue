<template>
  <div class>
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix flex flex-center-between">
        <span>菜单管理</span>

        <el-button size="small" type="primary" icon="iconfont sbt_add" @click="addMenus">添加菜单</el-button>
      </div>

      <el-row class="bg-white">
        <el-row :gutter="20">
          <el-col :span="5">
            <el-tree
              :data="treeData"
              node-key="guid"
              highlight-current
              accordion
              :props="defaultProps"
              @node-click="handleNodeClick"
              :default-expanded-keys="[' ']"
            ></el-tree>
          </el-col>
          <el-col :span="19">
            <el-table :data="childrenList" style="width: 99%" :highlight-current-row="true">
              <el-table-column type="index" width="60" label="序号"></el-table-column>
              <el-table-column prop="name" label="菜单中文名" width="180"></el-table-column>
              <el-table-column prop="nameEn" label="菜单别名" width="180"></el-table-column>
              <el-table-column prop="link" label="菜单路由"></el-table-column>
              <el-table-column prop="icon" label="菜单图标" width="100"></el-table-column>
              <el-table-column prop label="状态" width="100"></el-table-column>
              <el-table-column label="操作"  align="center" width="100" v-if="!getAuthObj.flagAdd">
                <template slot-scope="scope">
                  <div class="tc">
                    <el-button type="text" @click="handleEditeClick(scope.row)" size="mini">编辑</el-button>
                    <el-popconfirm
                      title="确认删除该菜单吗?"
                      @onConfirm="handleDeleteClick(scope.row,scope.$index)"
                    >
                      <el-button class="ml10" slot="reference" type="text" size="mini">删除</el-button>
                    </el-popconfirm>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-row>
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
    </el-card>
  </div>
</template>

<script>
/* eslint-disable */
import {
  getResourceMenuAllList,
  addResourceMenu,
  updateResourceMenu,
  deleteResourceMenu
} from "@/service/system";
import { addFormRule } from "./rules";
import {mapGetters} from "vuex";
import {decomposeStringToJson  } from '@/utils/tools'
export default {
  data() {
    return {
      treeData: [],
      title: "添加菜单",
      show: false,
      childrenList: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      addEditFormModel: {},
      addEidtFormRule: addFormRule,
      addEditOption: {
        //表单提交事件
        onSubmit: formData => {
          //按钮进入提交状态
          this.addEditFormModel.submitBtnProps({ loading: true });
         
          const sysName=decomposeStringToJson(formData.sysName,['sysName','sysCode'])
          const functionType=decomposeStringToJson(formData.functionType,['functionType','functionTypeCode'])
          if (this.currentMenu.guid) {
            this.handleEditeInterface({ ...this.currentMenu, ...formData,...sysName,...functionType });
          } else {
            this.handleAddClick({ ...this.paramsMenu, ...formData,...sysName,...functionType });
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

      currentMenu: {},
      paramsMenu: {
        type: 0,
        preGuid: ""
      },
      currentParentMenu: {}
    };
  },
    computed: {
        ...mapGetters(['getAuthObj'])
    },
  created() {
    this.getResourceMenuAllList();
  },

  methods: {
    /**
     * 添加菜单
     */
    addMenus() {
      this.show = true;
      this.$nextTick(() => {
        this.$set(this.paramsMenu, "preGuid", this.currentParentMenu.guid);
        if (this.currentParentMenu.guid) {
          this.$set(this.paramsMenu, "type", this.currentParentMenu.type + 1);
        }
      });
    },

    /**
     * 获取全部树菜单
     */
    async getResourceMenuAllList() {
      const { code, data } = await getResourceMenuAllList({
        sysNameEn: 2000101
      });
      if (code === 1) {
        let allTreeData = [
          {
            name: "所有菜单",
            guid: "",
            children: data
          }
        ];
        this.treeData = allTreeData;
        this.childrenList = data;
      }
    },

    /**
     * 添加用户
     */
    async handleAddClick(params) {
      const { code, data } = await addResourceMenu(params);
      if (code === 1) {
        this.handleClose();
        this.$message({
            type:'success',
            message:'操作成功'
          })
          this.addEditFormModel.submitBtnProps({ loading: false });
  this.getResourceMenuAllList();
      }
    },
    /**
     * 编辑接口
     */
    async handleEditeInterface(item) {
      const { code, data } = await updateResourceMenu(item);
      if (code === 1) {
        this.handleClose();
        this.currentItem = {};
        this.$message({
            type:'success',
            message:'操作成功'
          })
          this.addEditFormModel.submitBtnProps({ loading: false });
  this.getResourceMenuAllList();
      }
    },
    /**
     * 点击树展示数据
     */
    handleNodeClick(data) {
      this.currentParentMenu = data;
      this.childrenList = data.children;
    },
    /**
     * 删除菜单
     */
    async handleDeleteClick({ guid }, index) {
      const { code } = await deleteResourceMenu({ guid });
      if (code === 1) {
        this.childrenList.splice(index, 1);
        this.$message({
            type:'success',
            message:'操作成功'
          })
      }
    },
    /**
     * 编辑打开弹框
     */
    handleEditeClick(it) {
      let item=Object.assign({},it);
      this.show = true;
      this.title = "编辑菜单";
      this.$nextTick(() => {
        item.sysName=`${item.sysName}⭐${item.sysCode}`;
        item.functionType=`${item.functionType}⭐${item.functionTypeCode}`;

        this.addEditFormModel.setValue(item);
        this.currentMenu = item;
      });
    },
    /**
     *关闭抽屉
     */
    handleClose() {
      this.show = false;
      this.addEditFormModel.resetFields();
      this.currentMenu = {};
      this.currentParentMenu = {};
    
      this.title = "添加菜单";
    }
  }
};
</script>

<style lang="scss" scoped>
</style>