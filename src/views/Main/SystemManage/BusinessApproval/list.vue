<template>
  <el-card class="box-card" shadow="never" :body-style="{padding:'10px'}">
    <div slot="header" class="clearfix flex flex-center-between">
      <span>审批层次结构-业务</span>
    </div>
    <div class="flex flex-center-between">
      <common-title :title="'审批层次结构'" content="选择【审批层次结构列表】后， 请拖动【审批节点列表】进行添加" />
      <el-button type="primary" @click="handleSave" icon="iconfont sbt_save">保存</el-button>
    </div>
    <el-row :gutter="10" class="mt10">
      <el-col :span="4">
        <div class="approval—title">批层次结构列表</div>
        <div class="left_approval" style="height:60vh;overflow:auto">
          <template v-for="item of moduleNodeList">
            <div
              class="pointer left_item"
              :class="businessList.funcCode===item.funcCode?'active_func':''"
              @click="clickNodeList(item)"
              :key="item.funcCode"
            >{{item.funcName}}</div>
          </template>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="approval—title">
          审批节点
          <!-- <common-title :title="'审批节点'" content="拖动下面【审批层次结构列表】进行审批结构添加" /> -->
        </div>
        <div id="left_approval" class="left_approval" style="height:60vh;overflow:auto">
          <template v-for="(item,index) of nodeList">
            <div class="move left_item" :key="index">{{item.nodeName}}</div>
          </template>
        </div>
      </el-col>
      <el-col :span="16">
        <div>
          <!-- <draggable class="dragArea list-group" :list="businessList" group="people" @change="log"> -->
          <el-table
            id="right_approval"
            :data="businessList.busList"
            stripe
            row-key="uuid"
            empty-text="请拖动【审批节点列表】进行添加"
            highlight-current-row
            style="width:100%"
            height="65vh"
            :header-cell-style="{background:'#f3f3f3'}"
            size="small"
          >
            <el-table-column width="50" label class>
              <template>
                <span class="el-icon-rank handler-move-item"></span>
              </template>
            </el-table-column>
            <el-table-column type="index" label="序号"></el-table-column>
            <!-- <el-table-column prop="funcName" label="审批层次结构"></el-table-column> -->
            <el-table-column prop="nodeName" label="审批节点"></el-table-column>
            <el-table-column prop="specEmployeeName" label="指定人员">
              <template v-slot="{row,$index}">
                <el-select
                  filterable
                  v-if="row.show"
                  v-model="row.specEmployeeNumber"
                  @change="changeEmploy($event,$index)"
                  placeholder="请选择指定人员"
                >
                  <el-option
                    v-for="item in tableData"
                    :key="item.username"
                    :label="item.alias"
                    :value="item.username"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="description" width="280" label="备注">
              <template v-slot="{row}">
                <el-input
                  :disabled="disabled"
                  v-model="row.description"
                  type="textarea"
                  autosize
                  placeholder="备注"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop width="100" label="操作" align="center">
              <template v-slot="{row,$index}">
                <div class="flex flex-center">
                  <!-- <el-button type="text" @click="handleSave">保存</el-button> -->

                  <el-popconfirm
                    v-show="!disabled"
                    title="确认删除该条记录吗?"
                    @onConfirm="handleDelete(row,$index)"
                  >
                    <el-button slot="reference" type="text" size="mini">删除</el-button>
                  </el-popconfirm>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!-- </draggable> -->
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
/* eslint-disable */
import Cookies from "js-cookie";

import {
  getProjectList,
  deleteProjectItem,
  createProjectItem,
  updateProjectItem,
  getProjectDetails
} from "@/service/project";
import { mapGetters, mapState } from "vuex";
import { getDictionaryTypeName } from "@/service/system";
import { transformValueAndLabel } from "@/utils/tools";
import Sortable from "sortablejs";
import { getAllUserInfoList } from "@/service/user";
const _tempList = {
  description: "",
  // funcCode: "",
  // funcName: "",
  nodeCode: "",
  nodeName: "",
  specEmployeeName: "",
  specEmployeeNumber: "",
  show: false
};
export default {
  data() {
    return {
      funcName: "",
      loadingSubmit: false,
      loadingSave: false,
      disabled: false,
      moduleNodeList: [],
      currentDrag: {},
      businessList: {},
      tableData: [],
      nodeList: [],
      isShowEmployee: false,
      searchForm: {
        pageNum: 1,
        pageSize: -1,
        total: 0
      }
    };
  },
  created() {
    this.$store.dispatch("setHeight", 100);
    this.getDictionaryTypeName("APPROVED_MODULE_FLOW");
    this.getAllUserInfoList();
  },
  mounted() {
    this.dragType();
  },
  methods: {
    /**
     * 新增
     */
    async handleSave() {
      let bool = this.businessList.busList.some(
        item => this.isShowSelectBool(item.nodeCode) && !item.specEmployeeNumber
      );
      if (bool) {
        this.$message.error(`【项目管理员】必须指定相关人员，请检查后提交!`);
        return;
      }
      const { code, data } = await updateProjectItem(
        { params: this.businessList },
        "approve-bus"
      );
      if (code === 1) {
        this.getDeclarationList({ funcCode: data.funcCode });
        this.$message.success("操作成功");
      }
    },
    /**
     * 点击
     */
    clickNodeList(item) {
      let obj = {
        ...item,
        busList: []
      };
      if (item.funcCode === this.businessList.funcCode) return;
      this.businessList = obj;
      this.getDeclarationList({ funcCode: item.funcCode });
    },

    isShowSelectBool(nodeCode = "") {
      let charValue = nodeCode.toString(),
        show = /^(3|4|5|6)[\d]*$/.test(charValue.charAt());
      return show;
    },

    /**
     * 查询列表
     */
    async getDeclarationList(searchForm) {
      const { code, data, total } = await getProjectList(
        searchForm,
        "approve-bus"
      );
      if (code === 1) {
        const _tempList = data.map(item => {
          item.show = this.isShowSelectBool(item.nodeCode || "");
          item.uuid = this.$uuid();
          return item;
        });
        this.businessList = { ...this.businessList, busList: _tempList };
        this.getDictionaryTypeName("APPROVED_NODE");
      }
    },
    /**
     * 查询所有用户
     */
    async getAllUserInfoList() {
      const { code, data } = await getAllUserInfoList({
        pageNum: 1,
        pageSize: -1,
        type: 0
      });
      if (code === 1) {
        this.tableData = data;
      }
    },
    changeEmploy(e, index) {
      const { alias, username } = this.tableData.find(
          item => item.username == e
        ),
        obj = {
          ...this.businessList.busList[index],
          specEmployeeName: alias || "",
          specEmployeeNumber: username || ""
        };
      if (obj) {
        this.$set(this.businessList.busList, index, obj);
      }
    },
    /**
     * 删除
     */
    async handleDelete(row, index) {
      if (!row.id) {
        this.businessList.busList.splice(index, 1);
        return;
      }
      const { data, code } = await deleteProjectItem(
        { id: row.id },
        "approve-bus"
      );

      if (code === 1) {
        this.businessList.busList.splice(index, 1);
        this.getDeclarationList({ funcCode: this.businessList.funcCode });
      }
    },
    /**
     * 数据字典
     */
    async getDictionaryTypeName(typeName) {
      if (!typeName) return;
      const { code, data } = await getDictionaryTypeName({ typeName });
      if (code === 1) {
        if (typeName === "APPROVED_NODE") {
          let _temoBusiness = this.businessList.busList;
          this.nodeList = data.map(item => {
            return {
              nodeCode: item.code,
              nodeName: item.name
            };
          });
        } else {
          this.moduleNodeList = data.map(item => {
            return {
              funcCode: item.code,
              funcName: item.name
            };
          });
        }
      }
    },
    dragType() {
      const left_approval = document.querySelector("#left_approval"),
        right_approval = document.querySelector(
          "#right_approval .el-table__body> tbody"
        );

      new Sortable(left_approval, {
        group: {
          name: "left_approval",
          pull: "clone", // To clone: set pull to 'clone'
          put: false
        },
        chosenClass: "active_func",
        sort: false,
        onClone: (/**Event*/ evt) => {
          const index = evt.oldIndex;
          this.currentDrag = this.nodeList[index];
        },
        animation: 350
      });

      let right = new Sortable(right_approval, {
        group: {
          name: "right_approval",
          put: true
        },
        handle: ".handler-move-item",
        onAdd: (/**Event*/ evt) => {
          const itemEl = evt.item,
            value = this.currentDrag.nodeCode || "",
            obj = Object.assign({}, _tempList, this.currentDrag, {
              uuid: this.$uuid(),
              show: this.isShowSelectBool(value)
            }),
            cObj = this.businessList.busList.find(
              item => item.nodeCode === obj.nodeCode
            );
          this.removeNode(itemEl);

          if (cObj) {
            this.$message.warning(
              `已经存在【${cObj.nodeName}】审批节点,请选择其他审批节点！`
            );
            return;
          }

          this.businessList.busList.splice(evt.newIndex, 0, obj);
        },
        onEnd: ({ newIndex, oldIndex }) => {
          let currRow = this.businessList.busList.splice(oldIndex, 1)[0];
          this.businessList.busList.splice(newIndex, 0, currRow);
        },
        animation: 350
      });
    },
    removeNode(node) {
      if (node.parentElement !== null) {
        node.parentElement.removeChild(node);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.approval—title {
  background: #f3f3f3;
  padding: 7px;
  border: 1px solid #f3f3f3;
}
.active_func {
  background: $color-blue !important;
  color: #fff;
}
.move {
  cursor: move;
}
.pointer {
  cursor: pointer;
}
.left_approval {
  border: 1px solid #f3f3f3;
  border-radius: 0 0 5px 5px;
  position: relative;
  .left_item {
    padding: 10px 2%;
    background: #fffdfd;
    border-bottom: 1px solid #f3f3f3;
    width: 96%;
    font-size: 13px;
  }
  :last-child {
    border-bottom: 0;
  }
}
</style>