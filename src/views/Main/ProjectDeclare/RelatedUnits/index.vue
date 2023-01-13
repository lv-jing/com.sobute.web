<!-- 相关单位信息 -->
<template>
  <div>
    <common-title title="相关单位信息" class="md10"/>
    <el-button
      v-if="this.$route.query.type!=='view'&& $route.query.type!=='auditing'"
      type="primary"
      size="small"
      icon="iconfont sbt_add"
      @click="handleAddList">新增
    </el-button>
    <div class="user-form-table">
      <el-table
        class="mt10"
        :data="companyList"
        stripe highlight-current-row
        style="width: 100%"
        :header-cell-style="{background:'#f3f3f3'}"
        tooltip-effect="dark"
        size="small"
      >
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="type" label="单位类型"></el-table-column>
        <el-table-column prop="customerName" label="单位名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="customerNature" label="单位性质"></el-table-column>
        <el-table-column prop="organizationCode" label="组织代码"></el-table-column>
        <el-table-column prop="contacts" label="联系人"></el-table-column>
        <el-table-column prop="telephone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column label="操作" width="120" align="center" v-if="this.$route.query.type!=='view'&& $route.query.type!=='auditing'">
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
    </div>
    <el-drawer
      :visible.sync="show"
      direction="rtl"
      :wrapperClosable="false"
      size="50%"
      :before-close="handleClose"
    >
      <div slot="title" v-text="title"></div>
      <el-row>
        <el-col :span="23">
          <el-autocomplete
            style="width:100%;margin-left:15px;"
            v-model="name"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入单位名称查询添加"
            @select="handleSelect"
          />
        </el-col>
      </el-row>
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
  import {getcCooprateList} from '@/service/declare'
  import {addFormRule} from "./rules";
  import {decomposeStringToJson} from "@/utils/tools";

  export default {
    name: "index",
    props: {
      companyList: Array,
      default: () => []
    },
    data() {
      return {
        eidtIndex: '',
        currentItem: {},
        name: '',
        show: false,
        title: '添加相关单位',
        addEditFormModel: {},
        addEidtFormRule: addFormRule,
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
            let type = decomposeStringToJson(formData.type, [
              "type",
              "typeCode"
            ]);        //按钮进入提交状态
            let customerNature = decomposeStringToJson(formData.customerNature, [
              "customerNature",
              "customerNatureCode"
            ]);
            this.$nextTick(() => {
              if (this.title === '新增相关单位') {
                this.companyList.push({...formData, ...type, ...customerNature})
              } else {
                this.currentItem = {...this.currentItem, ...formData, ...type, ...customerNature}
                this.companyList.splice(this.eidtIndex, 1, this.currentItem)
                this.show = false
              }
              this.name = ''
              this.addEditFormModel.resetFields();
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

    methods: {
      /**
       *  相关单位信息添加
       * @param row
       */
      handleAddList() {
        this.show = true
        this.name = ''
        this.title = '新增相关单位'
        this.$nextTick(() => {
          this.addEditFormModel.resetFields();
        });
      },
      async querySearchAsync(queryString, cb) {
        const {code, data} = await getcCooprateList({pageSize: 200})
        if (code === 1) {
          for (let item of data) {
            item.value = item.customerName
          }
          var restaurants = data
        }
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        this.addEditFormModel.setValue(item);
      },
      /**
       *关闭抽屉
       */
      handleClose() {
        this.name = ''
        this.show = false;
        this.addEditFormModel.resetFields();
      },
      /**
       *  相关单位信息删除
       * @param scope
       */
      handleDeleteClick(scope) {
        this.companyList.splice(scope.$index, 1)
      },
      /**
       *  表格编辑
       * @param row
       */
      handleEditeClick(row, index) {
        this.currentItem = JSON.parse(JSON.stringify(row));
        this.eidtIndex = index;
        this.show = true;
        this.title = '编辑相关单位';
        this.name = '';
        this.$nextTick(() => {
          this.currentItem.type = this.currentItem.type + '⭐' + this.currentItem.typeCode
          this.addEditFormModel.setValue({...this.currentItem})
        });

      }
    }
  }
</script>

<style scoped>
  .bt-content {
    text-align: right;
  }
</style>