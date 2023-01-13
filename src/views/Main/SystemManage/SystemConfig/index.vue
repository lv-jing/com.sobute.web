<template>
  <div>
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix flex flex-center-between">
        <span>系统参数</span>
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
          <el-table-column prop="paramKey" label="参数key"></el-table-column>
          <el-table-column prop="paramValue" label="参数值"></el-table-column>
          <el-table-column prop="type" label="参数类型"></el-table-column>
          <el-table-column prop="typeCode" label="参数编码"></el-table-column>

          <el-table-column prop="remarks" label="备注"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">{{statusText[scope.row.status]}}</template>
          </el-table-column>
          <el-table-column label="操作"  align="center" width="100" v-if="!getAuthObj.flagAdd">
            <template slot-scope="scope">
              <div class="tc">
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
      <div class="p15">
        <form-create v-model="addEditFormModel" :rule="addEidtFormRule" :option="addEditOption"></form-create>
      </div>
    </el-drawer>
  </div>
</template>

<script>
/* eslint-disable */
import {
  getParamConfigList,
  addParamConfig,
  updateParamConfig,
  deleteParamConfig,
  getDictionaryTypeName
} from "@/service/system";
import { searchFormRule, addFormRule } from "./rules";
import { mapGetters } from "vuex";
export default {
  name: "users",
  data() {
    return {
      tableData: [],
      statusText: ["停用", "启用"],
      sexText: ["", "男", "女", "保密"],
      title: "添加系统参数",
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
    ...mapGetters(["getAuthObj"])
  },
  created() {
    this.getParamConfigList();
    //监控查询查询
    this.$on("searchForm", params => {
      this.searchForm = {
        ...this.searchForm,
        ...params
      };
      this.getParamConfigList();
    });
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
      this.getParamConfigList();
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
    async getParamConfigList() {
      const { code, data, total } = await getParamConfigList(this.searchForm);
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
      this.getParamConfigList();
    },
    /**
     *   打开弹框
     */
    showModel() {
      this.show = true;
      this.$nextTick(() => {
        this.getDictionaryTypeCode();
      });
    },
    /**
     * 添加用户
     */
    async handleAddClick(params) {
      const { code, data } = await addParamConfig(params);
      if (code === 1) {
        this.handleClose();
        this.$message({
          type: "success",
          message: "操作成功"
        });
        this.addEditFormModel.submitBtnProps({ loading: false });
      }
    },
    /**
     * 编辑打开弹框
     */
    handleEditeClick(item) {
      this.show = true;
      this.title = "编辑系统参数";
      this.$nextTick(() => {
        this.addEditFormModel.setValue(item);
        this.currentItem = item;
        this.getDictionaryTypeCode();
      });
    },
    /**
     * 编辑接口
     */
    async handleEditeInterface(item) {
      const { code, data } = await updateParamConfig(item);
      if (code === 1) {
        this.handleClose();
        this.currentItem = {};
        this.$message({
          type: "success",
          message: "操作成功"
        });
        this.addEditFormModel.submitBtnProps({ loading: false });
      }
    },
    /**
     * 删除
     */
    async handleDeleteClick({ guid }, index) {
      const { code, data } = await deleteParamConfig({ guid });
      if (code === 1) {
        this.tableData.splice(index, 1);
        this.$message({
          type: "success",
          message: " 操作成功"
        });
      }
    },
    /**
     *关闭抽屉
     */
    handleClose() {
      this.show = false;
      this.addEditFormModel.resetFields();
      this.getParamConfigList();
      this.title = "添加系统参数";
    },
    /**
     * 获取类型列表
     */
    async getDictionaryTypeCode() {
      const { code, data } = await getDictionaryTypeName({
        typeName: "LOG_TYPE"
      });
      if (code === 1) {
        let list = [];

        for (let item of data) {
          list.push({
            label: item.name,
            value: item.code
          });
        }

        this.addEditFormModel.updateRule("type", {
          options: list
        });
        // this.typeCodeList=data;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>