<!-- 内容与目标 -->
<template>
  <div>
    <form-create v-model="searchFormModel" :rule="searchFormRule" :option="searchOption"></form-create>
    <el-table
      class="mt10"
      :data="acceptList"
      stripe
      highlight-current-row
      style="width: 100%"
      :header-cell-style="{background:'#f3f3f3'}"
      size="small"
    >
      <el-table-column prop="index" width="50" type="index" label="序号"></el-table-column>
      <el-table-column prop="taskName" width="200" label="研究内容"></el-table-column>
      <el-table-column prop="exam" label="考核指标"></el-table-column>
      <el-table-column prop="startDate" width="100" label="开始时间"></el-table-column>
      <el-table-column prop="endDate" width="100" label="结束时间"></el-table-column>
    </el-table>

    <!--<common-title title="年度计划" :is-clone="true" class="md10 mt30" />-->
    <!--<el-table-->
      <!--class="mt10"-->
      <!--:data="mileList"-->
      <!--stripe-->
      <!--highlight-current-row-->
      <!--style="width: 100%"-->
      <!--:header-cell-style="{background:'#f3f3f3'}"-->
      <!--size="small"-->
      <!--@row-click="showRow"-->
    <!--&gt;-->
      <!--&lt;!&ndash; <el-table-column prop="index" type="index" label="序号"></el-table-column> &ndash;&gt;-->
      <!--<el-table-column label="序号" type="index" width="50" >-->
        <!--&lt;!&ndash; <template v-slot="{row,$index}">-->
          <!--<el-radio class="radio" v-model="isChooseRow" :label="row">{{$index+1}}</el-radio>-->
        <!--</template>&ndash;&gt;-->
      <!--</el-table-column>-->
      <!--<el-table-column prop="name" width="200" label="任务名称"></el-table-column>-->
      <!--<el-table-column prop="year" width="50" label="年份"></el-table-column>-->
      <!--<el-table-column prop="startDate" width="100" label="开始时间"></el-table-column>-->
      <!--<el-table-column prop="endDate" width="100" label="结束时间"></el-table-column>-->
      <!--<el-table-column prop="target" min-width="200" label="考核指标"></el-table-column>-->

      <!--&lt;!&ndash; <el-table-column prop="comments" label="备注"></el-table-column> &ndash;&gt;-->
      <!--<el-table-column-->
        <!--label="操作"-->
        <!--align="center"-->
        <!--width="120"-->
        <!--v-if="!['view','auditing'].includes($route.query.type)"-->
      <!--&gt;-->
        <!--<template slot-scope="scope">-->
          <!--<div class="tc">-->
            <!--<el-button-->
              <!--type="text"-->
              <!--@click.stop="handleEditeMileList(scope.row,scope.$index)"-->
              <!--size="mini"-->
              <!--circle-->
            <!--&gt;编辑</el-button>-->
            <!--<el-popconfirm title="确认删除该条记录吗?" @onConfirm="handleDeleteMileList(scope)">-->
              <!--<el-button slot="reference" type="text" size="mini">删除</el-button>-->
            <!--</el-popconfirm>-->
          <!--</div>-->
        <!--</template>-->
      <!--</el-table-column>-->
    <!--</el-table>-->

    <!--<common-title title="里程碑节点" class="md10 mt30" />-->
    <!--<el-table-->
      <!--class="mt10"-->
      <!--:data="nodeList"-->
      <!--stripe-->
      <!--highlight-current-row-->
      <!--style="width: 100%"-->
      <!--:header-cell-style="{background:'#f3f3f3'}"-->
      <!--size="small"-->
    <!--&gt;-->
      <!--<el-table-column width="50" type="index" label="序号"></el-table-column>-->

      <!--<el-table-column prop="taskName" label="任务名称">-->
        <!--<template v-slot="{row}">-->
          <!--<el-input-->
            <!--placeholder="请输入节点名称"-->
            <!--:disabled="['view','auditing'].includes($route.query.type)"-->
            <!--v-model="row.taskName"-->
            <!--type="text"-->
          <!--&gt;</el-input>-->
        <!--</template>-->
      <!--</el-table-column>-->

      <!--<el-table-column prop="target" label="考核指标">-->
        <!--<template v-slot="{row}">-->
          <!--<el-input-->
            <!--placeholder="请输入考核指标"-->
            <!--v-model="row.target"-->
            <!--:disabled="['view','auditing'].includes($route.query.type)"-->
            <!--type="textarea"-->
            <!--autosize-->
            <!--show-word-limit-->
            <!--:max-length="1333"-->
          <!--&gt;</el-input>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column prop="endDate" width="150" label="完成时间">-->
        <!--<template v-slot="{row}">-->
          <!--<el-date-picker-->
            <!--size="mini"-->
            <!--v-model="row.endDate"-->
            <!--:disabled="['view','auditing'].includes($route.query.type)"-->
            <!--value-format="yyyy-MM-dd"-->
            <!--format="yyyy-MM-dd"-->
            <!--type="date"-->
            <!--placeholder="选择日期"-->
            <!--@change="validateEndDate($event,row)"-->
          <!--&gt;</el-date-picker>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column prop="comments" label="备注">-->
        <!--<template v-slot="{row}">-->
          <!--<el-input-->
            <!--placeholder="请输入备注"-->
            <!--v-model="row.comments"-->
            <!--:disabled="['view','auditing'].includes($route.query.type)"-->
            <!--type="textarea"-->
            <!--autosize-->
            <!--show-word-limit-->
            <!--:max-length="1333"-->
          <!--&gt;</el-input>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--label="操作"-->
        <!--align="center"-->
        <!--width="120"-->
        <!--v-if="!['view','auditing'].includes($route.query.type)"-->
      <!--&gt;-->
        <!--<template slot-scope="scope">-->
          <!--<div class="tc">-->
            <!--&lt;!&ndash; <el-button-->
              <!--type="text"-->
              <!--@click="handleEditeMileList(scope.row,scope.$index)"-->
              <!--size="mini"-->
              <!--circle-->
            <!--&gt;编辑</el-button>&ndash;&gt;-->
            <!--<el-popconfirm title="确认删除该条记录吗?" @onConfirm="handleDeleteMileList(scope,'lichengbei')">-->
              <!--<el-button slot="reference" type="text" size="mini" circle>删除</el-button>-->
            <!--</el-popconfirm>-->
          <!--</div>-->
        <!--</template>-->
      <!--</el-table-column>-->
    <!--</el-table>-->

    <el-drawer
      :visible.sync="showMileList"
      direction="rtl"
      :wrapperClosable="false"
      size="50%"
      :before-close="handleCloseMile"
    >
      <div slot="title" v-text="titleMileList"></div>
      <div class="p15">
        <form-create
          v-model="addEditMileListModel"
          :rule="addEidtMileListRule"
          :option="addEditMileListOption"
        ></form-create>
      </div>
    </el-drawer>
  </div>
</template>

<script>
/* eslint-disable */
import { searchFormRule, addFormRule, addFormMileRule } from "./rules";
import { mapState } from "vuex";
import moment from "moment";

export default {
  name: "index",
  props: {
    acceptLists: {
      type: Array,
      delete: () => []
    },
    mileLists: {
      type: Array,
      delete: () => []
    },
    nodeLists: {
      type: Array,
      delete: () => []
    },
    baseObj: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    baseObj(obj) {
      this.searchFormModel.setValue(obj);
    },
    acceptLists(val) {
      this.acceptList = val.map((item, index) => {
        return {
          ...item,
          index: index
        };
      });
    },
    mileLists(val) {
      this.mileList = val;
    },
    nodeLists(val) {
      this.nodeList = val;
    }
  },
  data() {
    return {
      searchFormModel: {},
      searchFormRule: searchFormRule,
      // 隐藏按钮form提交按钮
      searchOption: {
        resetBtn: false,
        submitBtn: false,
        form: {
          size: "small"
        }
      },
      // 验收指标
      acceptList: [],
      show: false,
      title: "新增项目验收指标",
      currentItem: {},
      editIndex: "",
      addEditFormModel: {},
      addEidtFormRule: addFormRule(this),
      searchMileListRule: searchFormRule,
      //验收提交
      addEditOption: {
        form: {
          labelPosition: "top"
        },
        row: {
          gutter: 15
        },
        //表单提交事件
        onSubmit: formData => {
          //按钮进入提交状态
          this.$nextTick(() => {
            let index = this.editIndex;
            let isClone =
              this.title === "新增项目验收指标"
                ? this.acceptList.find(
                    item => item.taskName === formData.taskName
                  )
                : this.acceptList.find(
                    item =>
                      item.taskName === formData.taskName &&
                      item.index !== index
                  );
            if (isClone) {
              this.$message({
                type: "error",
                message: " 研究内容不能重复，请重新输入！"
              });
              return;
            }
            if (this.title == "新增项目验收指标") {
              this.acceptList.push(formData);
            } else {
              this.currentItem = { ...this.currentItem, ...formData };
              this.$set(this.acceptList, this.editIndex, this.currentItem);
              this.show = false;
            }
            this.acceptList = this.acceptList.map((item, index) => {
              return {
                ...item,
                index: index
              };
            });
            this.addEditFormModel.resetFields();
            this.addEditFormModel.setValue({
              startDate: this.dateList[0],
              endDate: this.dateList[1]
            });
            this.$message({
              type: "success",
              message: " 操作成功"
            });
          });
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
      //年度接话
      mileList: [],
      showMileList: false,
      titleMileList: "新增年度计划",
      addEditMileListModel: {},
      addEidtMileListRule: addFormMileRule(this),
      currentMileItem: {},
      nodeList: [],
      editMileIndex: "",
      // 里程碑节点提交
      addEditMileListOption: {
        form: {
          labelPosition: "top"
        },
        row: {
          gutter: 15
        },
        //表单提交事件
        onSubmit: formData => {
          //按钮进入提交状态
          this.$nextTick(() => {
            if (this.titleMileList == "新增年度计划") {
              this.mileList.push(formData);
            } else {
              this.currentMileItem = { ...this.currentMileItem, ...formData };
              let _temp = this.$set(
                this.mileList,
                this.editMileIndex,
                this.currentMileItem
              );
              this.showMileList = false;
            }
            this.addEditMileListModel.resetFields();
            this.$message({
              type: "success",
              message: " 操作成功"
            });
          });
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
      isChooseRow: {}
    };
  },
  computed: {
    ...mapState({
      dateList: state => state.common.dateList
    })
  },
  mounted() {
    let type = this.$route.query.type;
    if (type === "view" || type === "auditing") {
      this.searchFormModel.disabled(true);
    } else {
      this.searchFormModel.disabled(false);
      if (type === "add") {
        this.searchFormModel.setValue({
          researchContents: ""
        });
      }
    }
  },
  methods: {
    /**
     * 切换日期验证
     */
    validateEndDate(value, row) {
      let time = this.dateList,
        message = "";
      if (moment(value) < moment(time[0])) {
        message = "结束日期不能小于执行开始日期";
        row.endDate = "";
      } else if (moment(value) > moment(time[1])) {
        message = "结束日期不能大于执行结束日期";
        row.endDate = "";
      } else {
        message = "";
      }
      message && this.$message.error(message);
    },
    showRow(row) {
      this.isChooseRow = row;
    },
    /**
     *  增加
     * @param row
     */
    handleAddList() {
      this.show = true;
      this.title = "新增项目验收指标";
      this.currentItem = {};
      this.$nextTick(() => {
        this.addEditFormModel.resetFields();
        this.addEditFormModel.setValue({
          startDate: this.dateList[0],
          endDate: this.dateList[1]
        });
      });
    },
    /**
     * 新增节点
     */
    handleAddMileNodeList() {
      this.nodeList.push({
        taskName: "",
        endDate: "",
        target: "",
        comments: ""
      });
    },
    /**
     *  验收表格修改
     * @param row
     */
    handleEditeClick(row, index) {
      this.currentItem = JSON.parse(JSON.stringify(row));
      this.show = true;
      this.editIndex = index;
      this.title = "编辑项目验收指标";
      this.$nextTick(() => {
        this.addEditFormModel.setValue({ ...this.currentItem });
      });
    },
    /**
     *  删除
     * @param row
     */
    handleDeleteClick(row) {
      this.acceptList.splice(row.$index, 1);
      this.acceptList = this.acceptList.map((item, index) => {
        return {
          ...item,
          index: index
        };
      });
    },
    /**
     *关闭抽屉
     */
    handleClose() {
      this.show = false;
      this.addEditFormModel.resetFields();
    },
    /**
     * 新增年度计划
     */
    handleAddMileList() {
      if (this.dateList && this.dateList.length > 0) {
        this.showMileList = true;
        this.titleMileList = "新增年度计划";
        this.$nextTick(() => {
          this.addEditMileListModel.resetFields();
        });
      } else {
        this.$message({
          type: "warning",
          message: " 请先选择基本信息中的执行期限后在进行次操作！"
        });
      }
    },
    /**
     *  里程碑表格修改
     * @param row
     */
    handleEditeMileList(row, index) {
      this.currentMileItem = JSON.parse(JSON.stringify(row));
      this.showMileList = true;
      this.editMileIndex = index;
      this.titleMileList = "编辑年度计划";
      this.$nextTick(() => {
        this.addEditMileListModel.setValue({ ...this.currentMileItem });
      });
    },
    /**
     *   里程碑删除
     * @param row
     */
    handleDeleteMileList(row, type) {
      if (type === "lichengbei") {
        this.nodeList.splice(row.$index, 1);
      } else {
        this.mileList.splice(row.$index, 1);
      }
    },
    /***
     * 关闭里程碑抽屉
     */
    handleCloseMile() {
      this.showMileList = false;
      this.addEditMileListModel.resetFields();
    }
  }
};
</script>

<style scoped>
</style>