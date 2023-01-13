<template>
  <div>
    <el-col :span="24">
      <common-title title="项目经费来源" content="项目经费来源，可以通过拖动列表中最左侧图标进行相应的排序" class="md10" />
      <el-button
        v-if="this.$route.query.type!=='view'&& $route.query.type!=='auditing'"
        type="primary"
        size="small"
        icon="iconfont sbt_add"
        @click="handleAddList"
      >新增</el-button>
      <div class="user-form-table">
        <el-table
          class="mt10 mun-right"
          :data="tableData"
          stripe
          highlight-current-row
          row-key="uuid"
          ref="xTable"
          id="firstTable"
          style="width: 100%;"
          :header-cell-style="{background:'#f3f3f3'}"
          show-summary
          :summary-method="getSummaries"
        >
         <el-table-column width="50"  label=""  class="">
          <template>
            <span class="el-icon-rank handler-move-item"></span>
          </template>
        </el-table-column> 
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="accountName" width="200" label="类型">
            <template v-slot="{row}">
              <el-select
                v-model="row.accountName"
                :disabled="['view','auditing'].includes($route.query.type)"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <!-- <el-table-column width="120" label="年份">
            <template v-slot="{row}">
              <el-date-picker
                style="width: 100%"
                v-model="row.year"
                type="year"
                value-format="yyyy"
                :disabled="['view','auditing'].includes($route.query.type)"
                placeholder="选择年"
              ></el-date-picker>
            </template>
          </el-table-column> -->
          <el-table-column prop="amount" label="金额(万元)">
            <template v-slot="{row}">
              <el-input-number
                v-model="row.amount"
                :disabled="['view','auditing'].includes($route.query.type)"
                placeholder="请输入"
                :controls="false"
                :min="0"
                style="width: 100%;"
                class="txt-right"
              />
            </template>
          </el-table-column>
          <el-table-column prop="comments" label="备注">
            <template v-slot="{row}">
              <el-input
                v-model="row.comments"
                :disabled="['view','auditing'].includes($route.query.type)"
                placeholder="请输入"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="80"
            align="center"
            v-if="this.$route.query.type!=='view'&&$route.query.type!=='auditing'"
          >
            <template slot-scope="scope">
              <div class="tc">
                <!--                  <el-button slot="reference" type="text" size="mini" circle-->
                <!--                             @click="handleEidt(scope.row,scope.$index)">编辑-->
                <!--                  </el-button>-->
                <el-popconfirm title="确认删除该条记录吗?" @onConfirm="handleDeleteClick(scope.$index,1)">
                  <el-button slot="reference" type="text" size="mini" circle>删除</el-button>
                </el-popconfirm>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-col>
    <el-col :span="24">
      <common-title title="经费预算" class="md10 mt30" content="经费预算，可以通过拖动列表中最左侧图标进行相应的排序"/>
      <el-button
        v-if="this.$route.query.type!=='view'&&$route.query.type!=='auditing'"
        type="primary"
        size="small"
        icon="iconfont sbt_add"
        @click="handleAddList1"
      >新增</el-button>
      <div class="user-form-table">
        <el-table
          class="mt10 mun-right"
          :data="tableData1"
          stripe
          highlight-current-row
          style="width: 100%"
          row-key="uuid"
          ref="secondTable"
          id="secondTable"
          show-summary
          :summary-method="getSummaries"
          :header-cell-style="{background:'#f3f3f3'}"
          size="small"
        >
         <el-table-column width="50" label=""  class="handler-move-item">
         <template>
            <span class="el-icon-rank handler-move-item"></span>
          </template>
        </el-table-column>
        
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="accountName" width="200" label="类型">
            <template v-slot="{row}">
              <el-select
                v-model="row.accountName"
                :disabled="['view','auditing'].includes($route.query.type)"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <!--            <el-table-column prop="year" width="120" label="年份">-->
          <!--              <template v-slot="{row}">-->
          <!--                <el-date-picker-->
          <!--                  style="width: 100%"-->
          <!--                  v-model="row.year"-->
          <!--                  type="year"-->
          <!--                  value-format="yyyy"-->
          <!--                  placeholder="选择年">-->
          <!--                </el-date-picker>-->
          <!--              </template>-->
          <!--            </el-table-column>-->
          <el-table-column prop="specialAmount" label="专项金额(万元)">
            <template v-slot="{row}">
              <el-input-number
                v-model="row.specialAmount"
                placeholder="请输入"
                :controls="false"
                :min="0"
                style="width: 100%;"
                :disabled="['view','auditing'].includes($route.query.type)"
                class="txt-right"
              />
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="自筹金额(万元)">
            <template v-slot="{row}">
              <el-input-number
                v-model="row.amount"
                :disabled="['view','auditing'].includes($route.query.type)"
                placeholder="请输入"
                :controls="false"
                :min="0"
                style="width: 100%;"
                class="txt-right"
              />
            </template>
          </el-table-column>
          <el-table-column prop="otherAmount" label="其他金额(万元)">
            <template v-slot="{row}">
              <el-input-number
                v-model="row.otherAmount"
                :disabled="['view','auditing'].includes($route.query.type)"
                placeholder="请输入"
                :controls="false"
                :min="0"
                style="width: 100%;"
                class="txt-right"
              />
            </template>
          </el-table-column>
          <el-table-column prop="comments" label="备注">
            <template v-slot="{row}">
              <el-input
                v-model="row.comments"
                :disabled="['view','auditing'].includes($route.query.type)"
                placeholder="请输入"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="80"
            align="center"
            v-if="this.$route.query.type!=='view'&& $route.query.type!=='auditing'"
          >
            <template slot-scope="scope">
              <div class="tc">
                <el-popconfirm title="确认删除该条记录吗?" @onConfirm="handleDeleteClick(scope.$index,2)">
                  <el-button slot="reference" type="text" size="mini" circle>删除</el-button>
                </el-popconfirm>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-col>
  </div>
</template>

<script>
/* eslint-disable */
import { addFormRule, addFormRule1 } from "./rules";
import { decomposeStringToJson, transformValueAndLabel } from "@/utils/tools";
import { getProDetail } from "@/service/declare";
import { getDictionaryTypeName } from "@/service/system";
import Sortable from "sortablejs";

export default {
  name: "index",
  data() {
    return {
      options: [],
      options1: [],
      selectDate: [],
      show: false,
      addEditFormModel: {},
      addEidtFormRule: addFormRule,
      show1: false,
      addEditFormModel1: {},
      addEidtFormRule1: addFormRule1,
      tableData: [],
      tableData1: [],
      addEditOption: {
        //表单提交事件
        onSubmit: formData => {
          //按钮进入提交状态
          let accountName = decomposeStringToJson(formData.accountName, [
            "accountName",
            "accountCode"
          ]);
          let type = {
            type: "经费类型",
            typeCode: "2009"
          };
          this.$nextTick(() => {
            if (this.text == "新增经费来源") {
              this.tableData.push({
                ...formData,
                ...accountName,
                ...type,
                uuid: this.$uuid()
              });
            } else {
              this.currentItem = {
                ...this.currentItem,
                ...formData,
                ...accountName,
                ...type
              };
              this.$set(this.tableData, this.editIndex, this.currentItem);
              this.show = false;
            }
            this.addEditFormModel.resetFields();
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
      addEditOption1: {
        //表单提交事件
        onSubmit: formData => {
          //按钮进入提交状态
          let accountName = decomposeStringToJson(formData.accountName, [
            "accountName",
            "accountCode"
          ]);
          let type = {
            type: "预算类型",
            typeCode: "2010"
          };
          this.$nextTick(() => {
            if (this.text1 == "新增经费预算") {
              this.tableData1.push({
                ...formData,
                ...accountName,
                ...type,
                uuid: this.$uuid()
              });
            } else {
              this.currentItem1 = {
                ...this.currentItem1,
                ...formData,
                ...accountName,
                ...type
              };
              this.$set(this.tableData1, this.editIndex1, this.currentItem1);
              this.show1 = false;
            }
            this.addEditFormModel1.resetFields();
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
      text: "",
      currentItem: {},
      editIndex: "",
      text1: "",
      currentItem1: {},
      editIndex1: "",
      temp: {
        type: "经费来源",
        typeCode: "FUNDS_TYPE",
        accountName: "",
        amount: 0,
        year: new Date().getFullYear() + ""
      },
      temp1: {
        type: "经费预算",
        typeCode: "BUDGET_TYPE",
        accountName: "",
        specialAmount: 0,
        amount: 0,
        otherAmount: 0,
        year: new Date().getFullYear() + ""
      }
    };
  },
  mounted() {
    if (this.$route.query.type !== "add") {
      this.getProDetail();
    }
    this.getDictionaryTypeName();
    this.getBudctType();

    let firstTable = this.$refs.xTable;
    let secondTable = this.$refs.secondTable;
    this.rowDrop("firstTable", firstTable);
    this.rowDrop("secondTable", secondTable, 1);
  },
  methods: {
    /**
     * 拖动排序
     */
    rowDrop(id, xTable, sort) {
      const _this = this;
      this.$nextTick(() => {
        const el = xTable.$el.querySelector(`#${id} .el-table__body> tbody`);
        this.sortable = new Sortable(el, {
          animation: 350,
           handle: '.handler-move-item',
          onEnd: ({ newIndex, oldIndex }) => {
            let table = sort ? _this.tableData1 : _this.tableData;
            let currRow = table.splice(oldIndex, 1)[0];
            table.splice(newIndex, 0, currRow);
          },
          onStart: (/**Event*/ evt) => {
            evt.oldIndex; // element index within parent
          }
        });
      });
    },
    /**
     * 新增的时候默认经费来源表格数据
     */
    async getDictionaryTypeName() {
      const { type } = this.$route.query;
      const { code, data } = await getDictionaryTypeName({
        typeName: "FUNDS_TYPE"
      });
      if (code === 1) {
        const options = await transformValueAndLabel(data, ["name", "code"]);
        this.options = options;
        if (type === "add") {
          options.map(item => {
            this.tableData.push({
              uuid: this.$uuid(),
              type: "经费来源",
              typeCode: "FUNDS_TYPE",
              accountName: item.value,
              amount: 0,
              year: new Date().getFullYear() + ""
            });
          });
        }
      }
    },
    /**
     *
     * 新增的时候默认经费预算表格数据
     */
    async getBudctType() {
      const { type } = this.$route.query;
      const { code, data } = await getDictionaryTypeName({
        typeName: "BUDGET_TYPE"
      });
      if (code === 1) {
        const options = await transformValueAndLabel(data, ["name", "code"]);
        this.options1 = options;
        if (type === "add") {
          options.map(item => {
            this.tableData1.push({
              uuid: this.$uuid(),
              type: "经费预算",
              typeCode: "BUDGET_TYPE",
              accountName: item.value,
              specialAmount: 0,
              amount: 0,
              otherAmount: 0,
              year: new Date().getFullYear() + ""
            });
          });
        }
      }
    },

    /**
     * 获取详情
     */
    async getProDetail() {
      const { code, data } = await getProDetail({ id: this.$route.query.id });
      if (code === 1) {
        if (data.budgetList && data.budgetList.length > 0) {
          for (let item of data.budgetList) {
            item.year = item.year.toString();
            if (item.typeCode === "FUNDS_TYPE") {
              this.tableData.push({
                uuid: this.$uuid(),
                ...item,
                accountName:
                  (item.accountName &&
                    item.accountName + "⭐" + item.accountCode) ||
                  ""
              });
            } else if (item.typeCode === "BUDGET_TYPE") {
              this.tableData1.push({
                uuid: this.$uuid(),
                ...item,
                accountName:
                  (item.accountName &&
                    item.accountName + "⭐" + item.accountCode) ||
                  ""
              });
            }
          }
        }
      }
    },
    /**
     * 项目来源 增加
     * @param val
     */
    handleAddList() {
      if (this.tableData.length > 0) {
        let flag = this.tableData.find(item => {
          return item.amount === undefined || !item.accountName || !item.year;
        });
        if (!flag) {
          this.tableData.unshift(Object.assign({}, this.temp));
        } else {
          this.$message.error(
            "类型，年份，金额，必填，请先完善信息再进行添加！"
          );
        }
      } else {
        this.tableData.unshift(Object.assign({}, this.temp));
      }
    },
    /**
     * 项目预算 增加
     * @param val
     */
    handleAddList1() {
      // this.text1 = '新增经费预算'
      // this.show1 = true;
      // this.$nextTick(() => {
      //   this.addEditFormModel1.resetFields();
      // });
      if (this.tableData1.length > 0) {
        let flag = this.tableData1.find(item => {
          return (
            item.amount === undefined ||
            item.otherAmount === undefined ||
            item.specialAmount === undefined ||
            !item.accountName
          );
        });
        if (!flag) {
          this.tableData1.unshift(Object.assign({}, this.temp1));
        } else {
          this.$message.error("类型，金额，必填，请先完善信息再进行添加！");
        }
      } else {
        this.tableData1.unshift(Object.assign({}, this.temp1));
      }
    },
    /**
     * 项目来源合计
     * @param val
     */
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      let num = 0;
      let num1 = 0;
      let num2 = 0;
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        data.map(item => {
          if (column.property == "specialAmount") {
            let amount = Number(item.specialAmount || 0);
            sums[index] = num += amount;
          } else if (column.property == "amount") {
            let amount = Number(item.amount || 0);
            sums[index] = num1 += amount;
          } else if (column.property == "otherAmount") {
            let amount = Number(item.otherAmount || 0);
            sums[index] = num2 += amount;
          } else {
            sums[index] = "";
          }
        });
      });
      sums[2] = sums[2] ? sums[2].toFixed(2) + "万元" : "";
      sums[3] = sums[3] ? sums[3].toFixed(2) + "万元" : "";
      sums[4] = sums[4] ? sums[4].toFixed(2) + "万元" : "";
      return sums;
    },
    /**
     *关闭抽屉
     */
    handleClose() {
      this.show = false;
      this.addEditFormModel.resetFields();
    },
    /**
     *关闭抽屉
     */
    handleClose1() {
      this.show1 = false;
      this.addEditFormModel1.resetFields();
    },
    /**
     * 项目经费来源-编辑
     */
    handleEidt(row, index) {
      this.text = "编辑经费来源";
      this.show = true;
      this.currentItem = JSON.parse(JSON.stringify(row));
      this.editIndex = index;
      this.$nextTick(() => {
        this.currentItem.accountName =
          this.currentItem.accountName + "⭐" + this.currentItem.accountCode;
        this.addEditFormModel.setValue({ ...this.currentItem });
      });
    },
    /**
     * 编辑-经费预算
     */
    handleEidt1(row, index) {
      this.text1 = "编辑经费预算";
      this.show1 = true;
      this.currentItem1 = JSON.parse(JSON.stringify(row));
      this.editIndex1 = index;
      this.$nextTick(() => {
        this.currentItem1.accountName =
          this.currentItem1.accountName + "⭐" + this.currentItem1.accountCode;
        this.addEditFormModel1.setValue({ ...this.currentItem1 });
      });
    },
    /**
     *  删除
     * @param index 删除的index
     * @param num 第一个表格还是第二个表格
     */
    handleDeleteClick(index, num) {
      if (num == 1) {
        this.tableData.splice(index, 1);
      } else {
        this.tableData1.splice(index, 1);
      }
    }
  }
};
</script>

<style lang="scss">
.txt-right {
  .el-input__inner {
    text-align: right;
  }
}

.mun-right {
  .el-table__footer-wrapper {
    .has-gutter {
      .is-leaf {
        text-align: right;
      }
    }
  }
}
</style>