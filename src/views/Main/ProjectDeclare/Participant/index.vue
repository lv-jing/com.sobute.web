<!-- 参与人员 -->
<template>
  <div>
    <common-title title="主要参与人员" class="md10" />
    <el-button
      v-if="$route.query.type!=='view'&& $route.query.type!=='auditing'"
      type="primary"
      size="small"
      icon="iconfont sbt_add"
      @click="handleAddList"
    >新增</el-button>
    <el-button
      v-if="$route.query.type!=='view'&& $route.query.type!=='auditing'"
      size="small"
      type="default"
      icon="iconfont sbt_uploading"
      @click="importUserAddList"
    >
      导入
      <input
        type="file"
        id="fileXLS"
        @change="impotEvent"
        accept=".xls, .xlsx"
        style="display:none"
      />
    </el-button>
    <el-button
      v-if="$route.query.type!=='view'&& $route.query.type!=='auditing'"
      size="small"
      type="default"
      icon="iconfont sbt_download"
    >
      <a href="/static/excel/参与人员导入规范-申请.xlsx">下载模板</a>
    </el-button>
    <div class="user-form-table">
      <el-table
        tooltip-effect="dark"
        class="mt10"
        :data="memberList"
        row-key="uuid"
        id="domMember"
        ref="domMember"        
        style="width: 100%"
        size="small"
      >
        <el-table-column width="50" label class>
          <template>
            <span class="el-icon-rank handler-move-item"></span>
          </template>
        </el-table-column>      
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="role" label="项目角色" width="100"></el-table-column>
        <el-table-column label="项目负责人">
          <template v-slot="{row}">
            <span>{{row.queryFlag?'否':'是'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="empolyeeName" label="姓名" width="100"></el-table-column>
        <el-table-column prop="startDate" label="开始时间" width="100"></el-table-column>
        <el-table-column prop="endDate" label="结束时间" width="100"></el-table-column>
        <el-table-column prop="telephone" label="电话" width="100"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="150"></el-table-column>
        <el-table-column label="性别" width="50">
          <template slot-scope="scope">
            <span>{{scope.row.gender=='1'?'男':(scope.row.gender=='2'?'女':'')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="birthDate" label="出生日期" width="100"></el-table-column>
        <el-table-column prop="title" label="职称" width="100"></el-table-column>
        <el-table-column prop="position" label="职务" width="100"></el-table-column>
        <el-table-column prop="major" label="从事专业" width="100"></el-table-column>
        <el-table-column prop="department" label="所属部门" width="150"></el-table-column>
        <el-table-column prop="degree" label="最高学位" width="100"></el-table-column>
        <el-table-column prop="company" label="所在单位" width="150"></el-table-column>
        <el-table-column
          label="操作"
          width="120"
          fixed="right"
          align="center"
          v-if="$route.query.type!=='view'&& $route.query.type!=='auditing'"
        >
          <template slot-scope="scope">
            <div class="tc">
              <el-button
                type="text"
                @click="handleEditeClick(scope.row,scope.$index)"
                size="mini"
                circle
              >编辑</el-button>
              <el-popconfirm title="确认删除该条记录吗?" @onConfirm="handleDeleteClick(scope)">
                <el-button slot="reference" type="text" size="mini" circle>删除</el-button>
              </el-popconfirm>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-drawer
      :visible.sync="show"
      direction="rtl"
      :wrapperClosable="false"
      size="35%"
      :before-close="handleClose"
    >
      <div slot="title" v-text="title"></div>
      <el-row>
        <el-col :span="23">
          <el-autocomplete
            style="width:100%;margin-left:15px;margin-top: 10px;"
            v-model="name"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入姓名查询添加"
            @select="handleSelect"
          >
           <template slot-scope="{ item }">
            <div class="name">{{ item.value }}&nbsp;<small style="font-size: 12px;color: #b4b4b4;">({{ item.memberType }})</small></div>
          </template>
          </el-autocomplete>

        </el-col>
      </el-row>
      <div class="p15">
        <form-create v-model="addEditFormModel" :rule="addEidtFormRule" :option="addEditOption"></form-create>
      </div>
    </el-drawer>
  </div>
</template>

<script>
/* eslint-disable */
import { addFormRule } from "./rules";
import { getHrListName } from "@/service/declare";
import { decomposeStringToJson,rowDrop } from "@/utils/tools";
import { mapState, mapGetters } from "vuex";
import { getDictionaryTypeName } from "@/service/system";
import moment from 'moment'
export default {
  name: "index",
  props: {
    memberLists: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isType:"add",
      memberList:[],
      roleList: [],
      empolyeeNumber: "",
      currentItem: {},
      editIndex: "",
      restaurants: [],
      name: "", // 搜索姓名
      timeout: null,
      show: false,
      title: "新增参与人员",
      addEditFormModel: {},
      addEidtFormRule: addFormRule(this),
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
          let role = decomposeStringToJson(formData.role, ["role", "roleCode"]);
          let empolyeeNumber = {
            empolyeeNumber: this.empolyeeNumber
          };
          if (formData.queryFlag === "1") {
            formData.queryFlag = true;
          } else {
            formData.queryFlag = false;
          }

          let objEmpolyee = this.memberList.find(num => {
            return (
              num.empolyeeName === formData.empolyeeName &&
              num.email === formData.email &&
              num.role === formData.role.split("⭐")[0]
            );
          });
          if ((objEmpolyee && "empolyeeName" in objEmpolyee)&&this.isType==='add') {
            this.$message({
              type: "warning",
              message: `已存在参与人【${objEmpolyee.role}--${objEmpolyee.empolyeeName}】！`
            });
            return;
          }

          this.$nextTick(() => {
            let bigStartDate = new Date(this.dateList[0]).getTime();
            let bigEndDate = new Date(this.dateList[1]).getTime();
            let smallStartDate = new Date(formData.startDate).getTime();
            let smallEndDate = new Date(formData.endDate).getTime();
            if (
              bigStartDate - smallStartDate <= 0 &&
              bigEndDate - smallEndDate >= 0
            ) {
              if (this.title == "新增参与人员") {
                this.memberList.push({
                  ...formData,
                  ...role,
                  ...empolyeeNumber,
                   uuid: this.$uuid()
                });
                this.addEditFormModel.resetFields();
                this.addEditFormModel.setValue({
                  startDate: this.dateList[0],
                  endDate: this.dateList[1]
                });
              } else {
                this.currentItem = {
                  ...this.currentItem,
                  ...formData,
                  ...role,
                  ...empolyeeNumber
                };
                this.$set(this.memberList, this.editIndex, this.currentItem);
                this.show = false;
                this.addEditFormModel.resetFields();
              }
              this.name = "";
              this.$message({
                type: "success",
                message: " 操作成功"
              });
            } else {
              this.$message({
                type: "error",
                duration: 5000,
                message:
                  " 参与人员的限制期限应限制在立项基本信息的执行期限 " +
                  this.dateList[0] +
                  "至" +
                  this.dateList[1] +
                  " 内"
              });
            }
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
      tableColumn: [
        { field: "role", title: "项目角色" },
        { field: "queryFlag", title: "项目负责人" },
        { field: "empolyeeName", title: "姓名" },
        { field: "startDate", title: "开始时间" },
        { field: "endDate", title: "结束时间" },
        { field: "telephone", title: "电话" },
        { field: "email", title: "邮箱" },
        { field: "gender", title: "性别" },
        { field: "birthDate", title: "出生日期" },
        { field: "title", title: "职称" },
        { field: "position", title: "职务" },
        { field: "major", title: "从事专业" },
        { field: "department", title: "所属部门" },
        { field: "degree", title: "所在单位" },
        { field: "company", title: "所在单位" }
      ]
    };
  },
  watch: {
    memberLists(val) {
      this.memberList = val;
       let domMember = this.$refs.domMember;
      rowDrop("domMember", domMember, this.memberList, this);
    }
  },  
  computed: {
    ...mapState({
      dateList: state => state.common.dateList
    }),
    ...mapGetters(["getUserInfo"])
  },
  created() {
    this.dictionaryTypeName();
  },
  methods: {
    //下载模板

    importUserAddList() {
      if (this.dateList && this.dateList.length > 0) {
        document.querySelector("#fileXLS").click();
      } else {
        this.$message({
          type: "warning",
          message: " 请先添加基本信息的执行期间"
        });
      }
    },
    impotEvent(evnt) {
      let files = evnt.target.files;
      let reg = /^.*(\.xhtml|\.xlsm|\.xlsx|\.xltx|\.xlsb)$/;
      const isXLSX = reg.test(files[0].name.toLowerCase());
      if (!isXLSX) {
        this.$message.error("上传文件格式只能是xhtml、xlsm、xlsx、xltx、xlsb");
        return false;
      }
      let fileReader = new FileReader();
      fileReader.onload = async ev => {
        let data = ev.target.result;
        let workbook = XLSX.read(data, { type: "binary" });

        let csvData = XLSX.utils.sheet_to_csv(workbook.Sheets.Sheet1);
        // 解析数据
        let xlsArrayData = csvData.split("\n").splice(1);
        xlsArrayData=xlsArrayData.splice(0,xlsArrayData.length-2)

        if (xlsArrayData.length === 0) {
          return;
        }
        let tableData = [];
        await new Promise(async (resolve, reject) => {
          let bool = false,
            index = 0;

          const d = await xlsArrayData.map(async (vRow, rIndex) => {
            if (vRow) {
              let vCols = vRow.split(","),
                tableDataArr = [];

              if (rIndex === 0) {
              }

              const { data } = await this.loopXLSXColumnData(vCols);

              if (data.isBool) {
                bool = true;
                if (index === 0) {
                  this.$message({
                    type: "error",
                    message: data.message
                  });
                }
                evnt.target.value = "";
                index++;
              }
              let len =
                xlsArrayData[xlsArrayData.length - 1] === ""
                  ? xlsArrayData.length - 2
                  : xlsArrayData.length - 1;
              if (rIndex === len && !bool) {
                evnt.target.value = "";
                this.$message({
                  type: "success",
                  message: "导入成功！"
                });
              }
              tableData.push({...data,uuid:this.$uuid()});
            }
          });

          if (bool) {
            tableData = [];
            resolve();
          } else {
            evnt.target.value = "";
            resolve();
          }
        });
        this.memberList.splice(this.memberList.length, 0, ...tableData);
      };
      fileReader.readAsBinaryString(files[0]);
    },
    /**
     * 循环添加的数据
     */
    loopXLSXColumnData(column) {
      return new Promise(resolve => {
        let boolObj = {
            message: ""
          },
          item = {},
          isBool = false;
        column.map((val, index) => {
          let column = this.tableColumn[index] || {};

          switch (column.field) {
            case "role":
              let objRole = this.roleList.find(role => role.name === val);
              if (objRole) {
                item["roleCode"] = `${objRole.code || ""}`;
                item[column.field] = val || "";
              } else {
                isBool = true;
                boolObj["message"] += `${column.title}数据格式错误,`;
              }
              break;
            case "queryFlag":
              const data = {
                是: false,
                否: true
              };
              if (data[val] !== undefined) {
                item[column.field] = data[val];
              } else {
                isBool = true;
                boolObj["message"] += `${column.title}数据格式错误,`;
              }

              break;
            case "empolyeeName":
              if (val === "") {
                isBool = true;
                boolObj["message"] += `${column.title}数据格式错误,`;
              } else {
                item[column.field] = val;
              }
              break;
            case "email":
              let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
              if (!reg.test(val)) {
                isBool = true;
                boolObj["message"] += `${column.title}数据格式错误,`;
              } else {
                item[column.field] = val;
              }
              break;
            case "gender":
              const gender = {
                男: 1,
                女: 2
              };
              if (gender[val] !== undefined) {
                item[column.field] = gender[val];
              } else {
                isBool = true;
                boolObj["message"] += `${column.title}数据格式错误,`;
              }
              break;
            default:
              item[column.field] = val;
              break;
          }
        });

        if (!isBool) {
          resolve({ data: item });
        } else {
          resolve({ data: { ...boolObj, isBool: true } });
        }
      });
    },
    /**
     * 获取项目角色
     */
    async dictionaryTypeName() {
      const { code, data } = await getDictionaryTypeName({
        typeName: "PROJECT_ROLE"
      });
      if (code === 1) {
        this.roleList = data;
      }
    },
    /**
     * 姓名搜索
     */
    async querySearchAsync(queryString, cb) {
      const { code, data } = await getHrListName({
        name: queryString,
        pageSize: -1
      });
      if (code == 1) {
        if (data && data.length > 0) {
          for (let item of data) {
            item.value = item.empolyeeName;
          }
        }
      }
      let restaurants = data || [];
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 2000 * Math.random());
    },
    createStateFilter(queryString) {
      return state => {
        return (
          (state.value &&
            state.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
              0) ||
          (state.empolyeeNumber &&
            state.empolyeeNumber
              .toLowerCase()
              .indexOf(queryString.toLowerCase()) === 0)
        );
      };
    },
    handleSelect(item) {
      if (this.getUserInfo.username === item.empolyeeNumber) {
        item.queryFlag = "0";
      } else {
        item.queryFlag = "1";
      }
      item.birthDate=moment(item.birthDate).format('YYYY-MM')
      this.empolyeeNumber = item.empolyeeNumber;
      this.addEditFormModel.setValue(item);
    },
    /**
     *  参与人员增加
     * @param row
     */
    handleAddList() {
      if (this.dateList && this.dateList.length > 0) {
        this.show = true;
        this.title = "新增参与人员";
        this.name = "";
        this.isType="add";
        this.$nextTick(() => {
          this.addEditFormModel.resetFields();
          this.addEditFormModel.setValue({
            startDate: this.dateList[0],
            endDate: this.dateList[1]
          });
        });
      } else {
        this.$message({
          type: "warning",
          message: " 请先添加基本信息的执行期间"
        });
      }
    },
    /**
     *关闭抽屉
     */
    handleClose() {
      this.name = "";
      this.show = false;
      this.empolyeeNumber = "";
      this.addEditFormModel.resetFields();
    },
    /**
     *  参与人员删除
     * @param row
     */
    handleDeleteClick(scope) {
      this.memberList.splice(scope.$index, 1);
    },
    /**
     *  表格修改
     * @param row
     */
    handleEditeClick(row, index) {
      this.currentItem = JSON.parse(JSON.stringify(row));
      this.editIndex = index;
      this.show = true;
      this.title = "编辑参与人员";
      this.isType="edit";
      this.name = "";
      this.$nextTick(() => {
        if (this.currentItem.queryFlag) {
          this.currentItem.queryFlag = "1";
        } else {
          this.currentItem.queryFlag = "0";
        }
        this.currentItem.role =
          this.currentItem.role + "⭐" + this.currentItem.roleCode;
        this.empolyeeNumber = this.currentItem.empolyeeNumber;
        this.addEditFormModel.setValue({ ...this.currentItem });
      });
    }
  }
};
</script>

<style>
</style>