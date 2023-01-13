<template>
  <div>
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix flex flex-center-between">
        <span>字典管理</span>
        <!-- <el-button size="small" type="primary" icon="iconfont sbt_add" @click="showModel">{{title}}</el-button> -->
      </div>

      <el-row :gutter="30">
        <el-col :span="5">
          <div v-if="!getAuthObj.flagAdd">
            <el-button type="primary" icon="iconfont sbt_add" @click="showModel('dialog')">添加值集</el-button>
            <el-dropdown class="ml20" trigger="click" @command="handleCommand">
              <el-button type="default">
                更多操作
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="edit">编辑值集</el-dropdown-item>
                <el-dropdown-item command="delete">删除值集</el-dropdown-item>
                <el-dropdown-item command="refresh">刷新值集</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

          <div class="mt20">
            <el-input placeholder="输入关键字进行过滤" v-model="filterText" suffix-icon="el-icon-search"></el-input>
            <div style="height:calc(100vh - 250px);overflow:auto">
              <vue-scroll :ops="ops">
                <el-tree
                  @current-change="currentChangeTree"
                  class="filter-tree mt10"
                  :data="dicTypeList"
                  :props="defaultProps"
                  :highlight-current="true"
                  :filter-node-method="filterNode"
                  ref="tree"
                ></el-tree>
              </vue-scroll>
            </div>
          </div>
        </el-col>
        <el-col :span="19">
          <!-- {{typeList}} -->
          <div class="user-form-search">
            <form-create
              v-model="searchFormModel"
              @form-search-click="formSearchMethod"
              @form-reset-click="formResetMethod"
              :rule="searchFormRule"
              :option="searchOption"
            ></form-create>
          </div>
          <div v-if="!getAuthObj.flagAdd">
            <el-button
              size="small"
              type="primary"
              icon="iconfont sbt_add"
              @click="showModel"
            >{{title}}</el-button>
            <el-button size="small" icon="el-icon-refresh" @click="getDictionaryList">刷新</el-button>
          </div>
          <div class="user-form-table mt10" id="table-content">
            <el-table
              :data="tableData"
              stripe
              highlight-current-row
              style="width: 100%"
              :header-cell-style="{background:'#f3f3f3'}"
              size="small"
            >
              <el-table-column width="150" prop="code" label="值代码"></el-table-column>
              <el-table-column prop="name"  label="值名称"></el-table-column>
              <el-table-column prop="remarks" label="备注"></el-table-column>

              <!-- <el-table-column prop="type" label="值集代码"></el-table-column>
              <el-table-column prop="typeAlias" label="值集名称"></el-table-column>-->
              <el-table-column prop="preCode" label="父级值代码"></el-table-column>
              <el-table-column prop="preName" label="父级值名称"></el-table-column>
               <el-table-column prop="status" width="50" label="状态">
                 <template v-slot="{row}">
                   {{["停用","启用"][row.status]}}
                 </template>

               </el-table-column>
              <el-table-column label="操作"  align="center" width="120" v-if="!getAuthObj.flagAdd">
                <template slot-scope="scope">
                  <div class="tc" v-if="scope.row.fixed!==1">
                    <el-button
                      type="text"
                      @click="handleEditeClick(scope.row)"
                      size="mini"
                      circle
                    >编辑</el-button>
                    <el-popconfirm
                      title="确认删除该条记录吗?"
                      @onConfirm="handleDeleteClick(scope.row,scope.$index)"
                    >
                      <el-button slot="reference" type="text" size="mini" circle>删除</el-button>
                    </el-popconfirm>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <common-pagination v-on:handler-currentPage="handlerCurrentPage" :list="searchForm"></common-pagination>
          </div>
        </el-col>
      </el-row>
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
      <!-- <el-row>
        <el-col :span="8" :offset="4">
          <el-button type="primary" @click="onSubmit" class="w-100">提交</el-button>
        </el-col>
        <el-col :span="8" :offset="3">
          <el-button @click="onReset" class="w-100">重置</el-button>
        </el-col>
      </el-row>-->
    </el-drawer>

    <el-dialog title="值集" :visible.sync="dialogDic" :lock-scroll="false" width="40%">
      <form-create
        v-model="addDicTypeFormModel"
        :rule="addDicTypeFormRule"
        :option="addDicTypeOption"
      ></form-create>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose('dialog')">取 消</el-button>
        <el-button type="primary" @click="addParentDictType">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import {
  getDictionaryList,
  addDictionary,
  updateDdictionary,
  deleteDdictionary
} from "@/service/system";

import {
  getProjectList,
  deleteProjectItem,
  createProjectItem,
  updateProjectItem,
  getProjectParamsItems
} from "@/service/project";
import { transformValueAndLabel, decomposeStringToJson } from "@/utils/tools";
import { searchFormRule, addFormRule, addDicType } from "./rules";
import { mapGetters } from "vuex";

export default {
  name: "users",
  data() {
    return {
      ops: {
        rail: {
          opacity: "0.2",
          background: "#000",
          border: "1px solid #cecece",
          size: "6px"
        },
        bar: {
          background: "#fff",
          keepShow: false,
          size: "5px",
          minSize: 0.1
        },
        scrollButton: {
          enable: false,
          background: "#666"
        },
        scrollPanel: {
          easing: "easeInQuad",
          speed: 300
        }
      },
      typeList: [],
      oldTypeList: [],
      tableData: [],
      statusText: ["停用", "启用"],
      sexText: ["", "男", "女", "保密"],
      title: "添加值",
      searchFormModel: {},
      searchFormRule: searchFormRule,
      searchOption: {
        resetBtn: false,
        submitBtn: false,
        form: {
          size: "small"
        }
      },
      dialogDic: false,
      addDicTypeFormModel: {},
      addDicTypeFormRule: addDicType,
      addDicTypeOption: {
        resetBtn: false,
        submitBtn: false
      },

      addEditFormModel: {},
      addEidtFormRule: addFormRule,
      addEditOption: {
        //表单提交事件
        onSubmit: formData => {
          //按钮进入提交状态
          this.onSubmit(formData);
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
        //表单提交事件
      },
      currentItem: {},
      searchForm: {
        type: "",
        name: "",
        status: "",
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      show: false,

      filterText: "",
      dicTypeList: [],
      defaultProps: {
        children: "children",
        label: "typeAlias"
      },
      currentParentItem: {},
      isEdit: false
    };
  },
  computed: {
    ...mapGetters(["getAuthObj"])
  },
  created() {
    //监控查询查询

    this.getProjectListLevelDic();
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    onSubmit(formData) {
      this.addEditFormModel.submitBtnProps({ loading: true });
      if (this.currentItem.guid) {
        this.handleEditeInterface({ ...this.currentItem, ...formData });
      } else {
        if(this.oldTypeList.length>0){
          const { name, code } = this.oldTypeList.find(
            item => item.guid === formData.preGuid
          );
          formData.preName = name||'';
          formData.preCode = code||'';
        }
        this.handleAddClick({ ...formData });
      }
    },
    onReset() {
      this.addEditFormModel.resetFields();
      this.showModel();
    },
    /**
     * 添加父级字典类型
     */
    addParentDictType() {
      this.addDicTypeFormModel.submit(async formData => {
        let result = null;
        if (this.currentParentItem.guid && this.isEdit) {
          result = await updateProjectItem(
            {
              id: this.currentParentItem.guid,
              params: { ...this.currentParentItem, ...formData }
            },
            "dictionary-group",
            ""
          );
          this.$set(this.currentParentItem, "typeAlias", formData.typeAlias);
        } else {
          result = await createProjectItem(
            { ...formData, preGuid: this.currentParentItem.guid || "" },
            "dictionary-group",
            ""
          );
          if ("guid" in this.currentParentItem) {
            if (!Array.isArray(this.currentParentItem.children)) {
              this.currentParentItem.children = [];
            }
            this.currentParentItem.children.push(result.data);
          } else {
            this.dicTypeList.push(result.data);
          }
        }

        if (result.code === 1) {
          this.addDicTypeFormModel.resetFields();
          this.dialogDic = false;
          this.$message({
            type: "success",
            message: "操作成功"
          });
          // this.currentParentItem={}
          // this.getProjectListLevelDic();
        }
      });
    },
    /**
     * 编辑父级字典类型
     */
    editParentDictType() {},
    /**
     * 删除父级字典类型
     */
    deleteParentDictType() {},
    //选中树的树
    currentChangeTree(item) {
      this.currentParentItem = item;
      this.$set(this.searchForm, "type", item.type);
      this.$set(this.searchForm, "pageNum", 1); // 选择树分页设置为第一页
      this.getProjectListDic(item.type);
      this.getDictionaryList();
    },
    //更多操作的数据
    handleCommand(command) {
      if (command === "refresh") {
        this.getProjectListLevelDic();
        this.tableData = [];
        this.currentParentItem = {};
        this.isEdit = false;
        return;
      }
      if (!("guid" in this.currentParentItem)) {
        this.$message({
          type: "warning",
          message: "请选择字典类型后进行操作"
        });
        return;
      }
      switch (command) {
        case "edit":
          this.dialogDic = true;
          this.isEdit = true;
          this.$nextTick(() => {
            this.addDicTypeFormModel.disabled(true, "type");
            this.addDicTypeFormModel.setValue(this.currentParentItem);
          });
          break;

        case "delete":
          this.$confirm("您确定要删除该条数据吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(async () => {
              const { code, data } = await deleteProjectItem(
                {
                  id: this.currentParentItem.guid
                },
                "",
                "dictionary-group"
              );
              if (code === 1) {
                this.getProjectListLevelDic();
                this.$message({ type: "success", message: "删除成功" });
              }
            })
            .catch(() => {});

          break;
        default:
          break;
      }
    },
    /**
     * 数据过滤查询
     */
    filterNode(value, data) {
      if (!value) return true;
      return data.typeAlias.indexOf(value) !== -1;
    },
    /**
     * 获取字典类型有层级
     */
    async getProjectListLevelDic() {
      const { code, data } = await getProjectParamsItems(
        {},
        "level-list",
        "dictionary-group/"
      );
      if (code === 1) {
        this.dicTypeList = data;
      }
    },
    /**
     * 获取父类下面的所有数据字典
     */
    async getProjectListDic(type) {
      const { code, data } = await getProjectParamsItems(
        {
          type
        },
        "parent",
        "dictionary/"
      );
      if (code === 1) {
        this.oldTypeList = data;
        this.typeList = await transformValueAndLabel(
          data,
          ["name", "guid"],
          false
        );
      }
    },
    /**
     * 查询
     */
    formSearchMethod(self) {
      this.searchForm = {
        ...this.searchForm,
        ...self.$f.formData(),
        pageNum: 1,
        pageSize: 10,
        total: 0
      };
      if (this.searchForm.type == "") {
        this.$message({
          type: "error",
          message: "请选择左边类型进行查询"
        });
        return;
      }
      this.getDictionaryList();
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
    async getDictionaryList() {
      const { code, data, total } = await getDictionaryList({
        ...this.searchForm
      });
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
      this.getDictionaryList();
    },

    /**
     *   打开弹框
     */
    showModel(type) {
      if (type == "dialog") {
        this.dialogDic = true;
        this.isEdit = false;
        this.$nextTick(() => {
          this.addDicTypeFormModel.disabled(false, "type");
        });
      } else {
        this.show = true;
        this.$nextTick(() => {
          if ("guid" in this.currentParentItem) {
            const { typeAlias, type, guid } = this.currentParentItem;
            this.addEditFormModel.setValue("typeAlias", typeAlias);
            this.addEditFormModel.setValue("type", type);
            this.addEditFormModel.disabled(false, "code");
          }
          const loop = this.currentParentItem.preGuid ? true : false;

          this.addEditFormModel.updateRule(
            "preGuid",
            {
              options: this.typeList,
              validate: [{ required: loop, message: "请选择", trigger: "blur" }]
            },
            true
          );
        });
      }
    },
    /**
     * 添加
     */
    async handleAddClick(params) {
      const { code, data } = await addDictionary(params);
      if (code === 1) {
        this.$nextTick(() => {
          this.tableData.push(data);
        });
        this.$message({
          type: "success",
          message: "操作成功"
        });
        this.addEditFormModel.resetFields();

        const { typeAlias, type, guid } = this.currentParentItem;
        this.addEditFormModel.setValue("typeAlias", typeAlias);
        this.addEditFormModel.setValue("type", type);
        this.addEditFormModel.disabled(false, "code");

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
      this.title = "编辑值";
      this.$nextTick(() => {
        this.addEditFormModel.updateRule(
          "preGuid",
          {
            options: this.typeList
          },
          true
        );
        this.addEditFormModel.disabled(true, "code");
        this.addEditFormModel.setValue(item);
        this.currentItem = item;
      });
    },
    /**
     * 编辑接口
     */
    async handleEditeInterface(item) {
      const { code, data } = await updateDdictionary(item);
      if (code === 1) {
        this.handleClose();
        this.$nextTick(() => {
          let index = this.tableData.findIndex(it => it.guid === item.guid);
          this.$set(this.tableData, index, item);
        });
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
      const { code, data } = await deleteDdictionary({ guid });
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
    handleClose(type) {
      if (type == "dialog") {
        this.dialogDic = false;
        this.addDicTypeFormModel.resetFields();
        this.currentParentItem = {};
        this.isEdit = false;
      } else {
        this.show = false;
        this.title = "添加值";
        this.addEditFormModel.resetFields();
        this.currentItem = {};
      }
      // this.getProjectListLevelDic();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>