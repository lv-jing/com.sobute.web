<!-- 内容与目标 -->
<template>
  <div>
    <form-create v-model="searchFormModel" :rule="searchFormRule" :option="searchOption"></form-create>
    <el-button
        v-if="$route.query.type!=='view'&& $route.query.type!=='auditing'"
        type="primary"
        size="small"
        icon="iconfont sbt_add"
        @click="handleAddList">新增
    </el-button>
    <el-table
        class="mt10"
        :data="acceptList"
        stripe highlight-current-row
        style="width: 100%"
        :header-cell-style="{background:'#f3f3f3'}"
        size="small"
    >
      <el-table-column prop="index" width="100" type="index" label="序号"></el-table-column>
      <el-table-column prop="taskName" width="200" label="研究内容"></el-table-column>
      <el-table-column prop="exam" label="考核指标"></el-table-column>
      <el-table-column prop="startDate" width="100" label="开始时间"></el-table-column>
      <el-table-column prop="endDate" width="100" label="结束时间"></el-table-column>
      <el-table-column label="操作" align="center" width="120"
                       v-if="$route.query.type!=='view'&& $route.query.type!=='auditing'">
        <template slot-scope="scope">
          <div class="tc">
            <el-button
                type="text"
                @click="handleEditeClick(scope.row,scope.$index)"
                size="mini"
                circle
            >编辑
            </el-button>
            <el-popconfirm
                title="确认删除该条记录吗?"
                @onConfirm="handleDeleteClick(scope)"
            >
              <el-button slot="reference" type="text" size="mini" circle>删除</el-button>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
        :visible.sync="show"
        direction="rtl"
        :wrapperClosable="false"
        size="50%"
        :before-close="handleClose"
    >
      <div slot="title" v-text="title"></div>
      <div class="p15">
        <form-create
            v-model="addEditFormModel"
            :rule="addEidtFormRule"
            :option="addEditOption"
        ></form-create>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  /* eslint-disable */
  import {searchFormRule, addFormRule} from "./rules";
  import {mapState} from "vuex";

  export default {
    name: "index",
    props: {
      acceptLists: {
        type: Array,
        delete: () => []
      },
      baseObj: {
        type: Object,
        default: () => {
        }
      }
    },
    watch: {
      baseObj(obj) {
        this.searchFormModel.setValue(obj)
      },
      acceptLists(val) {
        this.acceptList = val.map((item, index) => {
          return {
            ...item,
            index: index
          }
        })
      }
    },
    data() {
      return {
        acceptList: [],
        show: false,
        searchFormModel: {},
        searchFormRule: searchFormRule,
        title: '新增项目验收指标',
        addEditFormModel: {},
        addEidtFormRule: addFormRule(this),
        currentItem: {},
        editIndex: '',
        // 隐藏按钮form提交按钮
        searchOption: {
          resetBtn: false,
          submitBtn: false,
          form: {
            size: "small"
          }
        },
        addEditOption: {
          form: {
            labelPosition: 'top'
          },
          row: {
            gutter: 15
          },
          //表单提交事件
          onSubmit: formData => {
            //按钮进入提交状态
            this.$nextTick(() => {
              let index = this.editIndex;
              let isClone = this.title === '新增项目验收指标' ?
                this.acceptList.find(item => item.taskName === formData.taskName)
                : this.acceptList.find(item => item.taskName === formData.taskName && item.index !== index);
              if (isClone) {
                this.$message({
                  type: "error",
                  message: " 研究内容不能重复，请重新输入！"
                });
                return
              }
              if (this.title == '新增项目验收指标') {
                this.acceptList.push(formData)
              } else {
                this.currentItem = {...this.currentItem, ...formData};
                this.$set(this.acceptList, this.editIndex, this.currentItem);
                this.show = false
              }
              this.acceptList = this.acceptList.map((item, index) => {
                return {
                  ...item,
                  index: index
                }
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
            })
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
        }
      }
    },
    computed: {
      ...mapState({
        dateList: state => state.common.dateList
      })
    },
    mounted() {
      let type = this.$route.query.type;
      if (type === 'view' || type === 'auditing') {
        this.searchFormModel.disabled(true);
      } else {
        this.searchFormModel.disabled(false);
        if (type === 'add') {
          this.searchFormModel.setValue({
            researchContents: ""
          })
        }
      }
    },
    methods: {
      // async getProDetail() {
      //   const {code, data} = await getProDetail({id: this.$route.query.id})
      //   if (code === 1) {
      //     this.searchFormModel.setValue(data.base)
      //     this.acceptList = data.acceptList || []
      //   }
      // },
      /**
       *  增加
       * @param row
       */
      handleAddList() {
        this.show = true;
        this.title = '新增项目验收指标';
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
       *  表格修改
       * @param row
       */
      handleEditeClick(row, index) {
        this.currentItem = JSON.parse(JSON.stringify(row));
        this.show = true;
        this.editIndex = index;
        this.title = '编辑项目验收指标';
        this.$nextTick(() => {
          this.addEditFormModel.setValue({...this.currentItem});
        });
      },
      /**
       *  参与人员删除
       * @param row
       */
      handleDeleteClick(row) {
        this.acceptList.splice(row.$index, 1)
        this.acceptList = this.acceptList.map((item, index) => {
          return {
            ...item,
            index: index
          }
        });
      },
      /**
       *关闭抽屉
       */
      handleClose() {
        this.show = false;
        this.addEditFormModel.resetFields();
      },
    }
  }
</script>

<style scoped>

</style>