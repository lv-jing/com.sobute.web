<template>
  <el-card class="box-card" shadow="never" :body-style="{padding:'10px'}">
    <div slot="header" class="clearfix flex flex-center-between">
      <span>审批层次结构-业务-{{$titleObj[$route.query.type]}}</span>
    </div>
    <div class="flex flex-center-between">
      <common-title :title="'审批层次结构'" content="拖动下面【审批层次结构列表】进行审批结构添加" />
      <!-- <el-button type="primary">提交</el-button> -->
    </div>
    <el-row :gutter="15">
      <el-col :span="24"></el-col>
      <el-col :span="4" class="mt20">
        <div class="approval—title">
          <i class="el-icon-tickets"></i> 审批层次结构列表
        </div>
        <dl id="left_approval" class="left_approval">
          <template v-for="item of moduleNodeList">
            <dd :key="item.funcCode">{{item.funcName}}</dd>
          </template>
        </dl>
      </el-col>
      <el-col :span="20" class="mt20">
        <div>
          <!-- <draggable class="dragArea list-group" :list="businessList" group="people" @change="log"> -->
          <el-table
            id="right_approval"
            :data="businessList"
            stripe
            row-key="uuid"
            empty-text="请拖动【审批结构列表】进行添加"
            highlight-current-row
            :header-cell-style="{background:'#f3f3f3'}"
            size="small"
          >
            <el-table-column width="50" label class>
              <template>
                <span class="el-icon-rank handler-move-item"></span>
              </template>
            </el-table-column>
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="funcName" label="审批层次结构"></el-table-column>
            <el-table-column prop="nodeName" label="审批节点">
              <template v-slot="{row,$index}">
                <common-select
                  v-model="row.nodeCode"
                  placeholder="请选择"
                  type-name="APPROVED_NODE"
                  :transform="['name','code']"
                  :sort-index="$index"
                  :is-splicing="false"
                  :clearable="true"
                  v-on:obj-value="onChanges"
                ></common-select>
              </template>
            </el-table-column>
            <el-table-column prop="specEmployeeName" width="150" label="指定人员">
              <template v-slot="{row,$index}">
                <el-select
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
                  placeholder="自评总结"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop width="100" label="操作" align="center">
              <template v-slot="{$index}">
                <div class="flex flex-center">
                  <el-popconfirm
                    v-show="!disabled"
                    title="确认删除该条记录吗?"
                    @onConfirm="handleDelete($index)"
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
    <common-footer
      :handle-save="handleSave"
      :score-show="true"
      :loading-submit="loadingSubmit"
      :loading-save="loadingSave"
    />
  </el-card>
</template>

<script>
/* eslint-disable */
import Cookies from "js-cookie";
import {
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
  funcCode: "",
  funcName: "",
  nodeCode: "",
  nodeName: "",
  specEmployeeName: "",
  specEmployeeNumber: "",
  show: false
};
export default {
  data() {
    return {
      loadingSubmit: false,
      loadingSave: false,
      disabled: false,
      moduleNodeList: [],
      currentDrag: {},
      businessList: [],
      tableData: [],
      isShowEmployee: false
    };
  },
  created() {
    this.getDictionaryTypeName("APPROVED_MODULE_FLOW");
    this.getAllUserInfoList();
  },
  mounted() {
    this.dragType();
  },
  methods: {
    handleSave() {},
    onChanges(e) {
      const { value='', label, index } = e,
        charValue=value.toString(),
        show = /^(3|4)[\d]$/.test(charValue.charAt()),
        obj = {
          ...this.businessList[index],
          nodeCode: value,
          nodeName: label,
          show
        };
      this.$set(this.businessList, index, obj);
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
      const { alias, username } = this.tableData.find(item=>item.username == e),
        obj = {
          ...this.businessList[index],
          specEmployeeName: alias||'',
          specEmployeeNumber: username||''
        };
      if (obj) {
        this.$set(this.businessList, index, obj);
      }
    },
    /**
     * 删除
     */
    handleDelete(index) {
      this.businessList.splice(index, 1);
    },
    /**
     * 数据字典
     */
    async getDictionaryTypeName(typeName) {
      if (!typeName) return;
      const { code, data } = await getDictionaryTypeName({ typeName });
      if (code === 1) {
        this.moduleNodeList = data.map(item => {
          return {
            funcCode: item.code,
            funcName: item.name
          };
        });
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
        sort: false,
        onClone: (/**Event*/ evt) => {
          const index = evt.oldIndex;
          this.currentDrag = this.moduleNodeList[index];
        },
        onStart: (/**Event*/ evt) => {
          // 拖拽
          var itemEl = evt.item;
          right_approval.style.height = 200 + "px";
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
          var itemEl = evt.item;
          this.removeNode(itemEl);
          let obj = Object.assign({}, _tempList, this.currentDrag, {
            uuid: this.$uuid()
          });
          this.businessList.splice(evt.newIndex, 0, obj);
        },
        onEnd: ({ newIndex, oldIndex }) => {
          let currRow = this.businessList.splice(oldIndex, 1)[0];
          this.businessList.splice(newIndex, 0, currRow);
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

.left_approval {
  border: 1px solid #f3f3f3;
  border-radius: 0 0 5px 5px;
  dd {
    padding: 10px;
    background: #fffdfd;
    border-bottom: 1px solid #f3f3f3;
    cursor: move;
    font-size: 13px;
  }
  :last-child {
    border-bottom: 0;
  }
}
</style>