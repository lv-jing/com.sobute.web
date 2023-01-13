<template>
  <div class="bg-white">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix flex flex-center-between">
        <span>个人考核查询</span>
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
        <el-button type="primary" icon="iconfont sbt_add" v-if="!getAuthObj.flagAdd"
                   @click="$router.push({name:'personal',query:{type:'add'}})">新增
        </el-button>
        <div style="float: right;display: flex;" v-if="this.userShow">
          <el-button size="small" icon="iconfont sbt_download" style="margin-right: 10px;" @click="hanldeUpload('out')">
            Excel导出
          </el-button>
          <el-upload
            :action="action"
            name="excelFile"
            :show-file-list="false"
            :on-success="handleSuccess"
            :headers="headers"
          >
            <el-button size="small" type="primary" icon="iconfont sbt_uploading" @click="hanldeUpload('in')">Excel导入
            </el-button>
          </el-upload>
        </div>
        <el-table
          class="mt10"
          :data="tableData"
          stripe highlight-current-row
          style="width: 100%"
          :header-cell-style="{background:'#f3f3f3'}"
        >
          <el-table-column prop="documentNumber" width="100" label="个人考核编号"></el-table-column>
          <el-table-column prop="year" width="100" label="考核年份"></el-table-column>
          <el-table-column prop="employeeName" label="被考核人"></el-table-column>
          <el-table-column prop="proportionAverage" label="月平均系数"></el-table-column>
          <el-table-column prop="coefficientComprehensive" label="综合素养系数"></el-table-column>
          <el-table-column prop="coefficientData" label="资料提交系数"></el-table-column>
          <el-table-column prop="coefficientAnnual" label="年度业绩系数"></el-table-column>
          <el-table-column prop="createdByName" label="创建人"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column label="操作"  align="center" width="180">
            <template v-slot="{row}">
              <div class="tc">
                <!-- <el-button
                  v-show="!getAuthObj.flagAdd && statusCode[row.statusCode]&&!userShow"
                  type="text"
                  @click="handleEditeClick(row)"
                  size="mini"
                  circle
                >编辑
                </el-button> -->
                <el-button
                   v-if="(row.operateFlag||'').indexOf('W')>-1"
                  type="text"
                  @click="handleEditeClick(row)"
                  size="mini"
                  circle
                >编辑
                </el-button>
                <el-button
                  slot="reference"
                  type="text"
                  size="mini"
                  circle
                  @click="handleDetails(row)"
                >查看
                </el-button>
<!--                v-if="!getAuthObj.flagAdd && statusCode[row.statusCode]&&!userShow"-->
                <el-popconfirm
                v-if="(row.operateFlag||'').indexOf('D')>-1"
                  title="确认删除该条记录吗?"
                  @onConfirm="handleDelete(row)"
                >
                  <el-button slot="reference" type="text" size="mini" circle>删除</el-button>
                </el-popconfirm>
                <el-button v-if="!getAuthObj.flagAdd" type="text" @click="exportFile(row)">导出</el-button>
<!--                <el-popconfirm-->
<!--                  v-if="!getAuthObj.flagAdd && row.statusCode!=='2005104' && userShow"-->
<!--                  title="确认删除该条记录吗?"-->
<!--                  @onConfirm="handleDelete(row)"-->
<!--                >-->
<!--                  <el-button slot="reference" type="text" size="mini" circle>删除</el-button>-->
<!--                </el-popconfirm>-->
              </div>
            </template>
          </el-table-column>
        </el-table>
        <common-pagination v-on:handler-currentPage="handlerCurrentPage" :list="searchForm"></common-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
  /* eslint-disable */
  import {getPersonList, getPersonDelete, getIsUser} from "@/service/assess";
  import {searchFormRule} from "./rules";
  import {mapGetters} from "vuex";
  import Cookies from "js-cookie";
  import {getDownAssExcel,getUpLoadAssExcel,getDownLoadWordsPersonAssess} from "@/service/common";
  import {deepCloneClear} from "@/utils/tools";
  import {exportFile} from "@/utils/tools";

  export default {
    data() {
      return {
        downUrl:getDownAssExcel,
        downDocUrl:getDownLoadWordsPersonAssess,
        action: getUpLoadAssExcel,
        headers: {
          Authorization: Cookies.get('token')
        },
        statusCode: {
          2005101: true,
          2005102: false,
          2005105: true
        },
        userShow: false,
        tableData: [],
        searchFormModel: {},
        searchFormRule: searchFormRule,
        searchOption: {
          resetBtn: false,
          submitBtn: false,
          form: {
            size: "small"
          }
        },
        searchForm: {
          pageNum: 1,
          pageSize: 10,
          total: 0
        }
      };
    },
    computed: {
      ...mapGetters(['getAuthObj','getSearchParams'])
    },
    created() {
      this.$store.dispatch("setHeight", 100);
      this.getPilotList();
      this.getIsUser();
    },
    watch: {
      userShow: {
        handler(newValue) {
          this.userShow = newValue
        },
        immediate: true,//关键
        deep: true
      }
    },
    mounted() {
      this.initData();
    },
    methods: {
      /**
       * 导出
       */
      exportFile(row) {
        //console.log(row)
        exportFile(`${this.downDocUrl}${row.id}`, "", `个人考核-`+`${row.employeeName}.doc`);
      },
      /**
       * 个人考核导出导入
       */
      hanldeUpload(status) {
        // 导出
        if (status === 'out') {
          let params = {
            documentNumber: this.searchForm.documentNumber,
            employeeName: this.searchForm.employeeName,
            year: this.searchForm.year
          };
          if(this.tableData.length>0){
            exportFile(`${this.downUrl}`,params, '个人考核.xls')
          } else {
            this.$message.error({
              message:'个人考核无数据，不能导出'
            })
          }
        } else { // 导入

        }
      },
      /**
       * 文件列表上传成功时的钩子
       * @param file
       */
      handleSuccess(response, file, fileList) {
        if (response.code === 1) {
          this.$message({
            type: 'success',
            message: '导入成功'
          });
          this.getPilotList();
        } else {
          this.$message({
            type: 'error',
            message: response.message
          });
        }
      },
      /**
       * 判断是否是专利管理员
       */
      async getIsUser() {
        const {code, data} = await getIsUser();
        if (code === 1) {
          this.userShow = data;
        }
      },
      /**
       * 查询项目申报列表
       */
      async getPilotList() {
        const {code, data, total} = await getPersonList({...this.searchForm,
        ...this.getSearchParams});
        if (code === 1) {
          this.tableData = data;
          this.searchForm.total = total;
           this.$nextTick(() => {
          this.searchFormModel.setValue(this.getSearchParams);
        });
        }
      },
      /**
       *  修改
       * @param row
       */
      handleEditeClick(row) {
        this.$router.push({name: 'personal', query: {type: 'edit', id: row.id}})
      },
      /**
       *  查看
       * @param row
       */
      handleDetails(row) {
        this.$router.push({name: 'personal', query: {type: 'view', id: row.id}})
      },
      /**
       *  删除数据
       * @param row
       */
      async handleDelete(row) {
        const {code, date} = await getPersonDelete({
          id: row.id
        });
        if (code === 1) {
          this.getPilotList();
          this.$message({
            type: "success",
            message: " 操作成功"
          });
        }
      },
      /**
       * 查询
       */
      formSearchMethod(self,reset) {
        let formData = self.$f.formData();
        this.searchForm = {
          ...formData,
          pageNum: 1,
          pageSize: 10,
          total: 0
        };
        this.$saveSearchParam({searchForm:this.searchForm,reset})

        this.getPilotList();
      },
      /**
       * 重置
       */
      formResetMethod(self) {
        self.$f.resetFields();
        this.initData();
        this.formSearchMethod(self,'reset');
      },
      /**
       * 初始化查询数据
       */
      initData() {
        const formData = this.searchFormModel.formData();
        let clearFormData = deepCloneClear(formData);
        this.searchFormModel.setValue(clearFormData);
      },
      /**
       * 分页查询
       */
      handlerCurrentPage(list) {
        this.searchForm = {
          ...this.searchForm,
          ...list
        };
        this.getPilotList();
      },
    }
  };
</script>

<style lang="scss" scoped>
</style>