<template>
  <div class="bg-white">

    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix flex flex-center-between">
        <span>项目成果</span>
      </div>
      <div class="user-form-search">
        <form-create
          v-model="searchFormModel"
          :rule="searchFormRule"
          @form-search-click="formSearchMethod"
          @form-reset-click="formResetMethod"
          :option="searchOption"/>
      </div>
      <div class="user-form-table mt20">
        <el-button type="primary" size="small" icon="iconfont sbt_add"
                   v-if="!getAuthObj.flagAdd"
                   @click="hanldeAddType">新增
        </el-button>
        <common-upload-excel :action="action" :urlList="urlList" v-on:get-file-list="getFileList"/>
        <el-table
          class="mt10"
          :data="tableData"
          stripe highlight-current-row
          style="width: 100%"
          :header-cell-style="{background:'#f3f3f3'}"
          size="small"
          tooltip-effect="dark"
        >
          <el-table-column prop="documentNumber" width="100" label="成果入库单号"></el-table-column>
          <el-table-column prop="type" width="150" label="成果类型"></el-table-column>
          <el-table-column prop="name" label="成果名称"></el-table-column>
          <el-table-column prop="creationDate" label="创建日期"></el-table-column>
          <el-table-column prop="confirmDate" label="日期"></el-table-column>
          <el-table-column prop="keyWords" label="技术关键词"></el-table-column>
          <el-table-column prop="createdByName" width="100" label="创建人"></el-table-column>
          <el-table-column prop="status" label="状态" width="100"></el-table-column>
          <el-table-column label="操作"  align="center" width="180">
            <template v-slot="{row}">
              <commonOperation
                :row="row"
                :deletUrl="deletUrl"
                :getPageList="getPageList"
                pageUrlName="results"
                :typeCode=true
                :isUserType="isUserType"
              />
            </template>
          </el-table-column>
        </el-table>
        <common-pagination v-on:handler-currentPage="handlerCurrentPage" :list="searchForm"></common-pagination>
      </div>
    </el-card>
    <el-dialog
      title="请选择新增类型"
      :visible.sync="dialogVisible"
      width="30%"
      :lock-scroll="false"
      :before-close="handleClose">
      <form-create
        v-model="searchModelType"
        :rule="searchFormType"
        :option="searchOption"/>
      <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="handleAddOk">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  /* eslint-disable */
  import {searchFormRule, searchFormType} from "./rules";
  import {getProjectList, deleteProList, getUserType} from "@/service/results"
  import CommonUploadExcel from '@/components/commonUploadExcel'
  import {getUpLoadExcel} from "@/service/common";
  import {mapGetters} from "vuex";
  import {deepCloneClear} from "@/utils/tools";

  export default {
    components: {
      CommonUploadExcel
    },
    name: "results",
    data() {
      return {
        isUserType: false,
        deletUrl: deleteProList,
        url: '/static/excel/项目成果模板.xlsx',
        dialogVisible: false,
        action: getUpLoadExcel,
        searchForm: {
          pageNum: 1,
          pageSize: 10,
          total: 0
        },
        tableData: [],
        searchFormModel: {},
        searchFormRule: searchFormRule,
        searchModelType: {},
        searchFormType: searchFormType,
        searchOption: {
          resetBtn: false,
          submitBtn: false,
          form: {
            size: "small"
          }
        },
        currentItem: {},
        total: 0,
        show: false,
        urlList: [
          {
            name: '项目成果-标准规范.xlsx',
            url: '/static/excel/项目成果-标准规范.xlsx'
          }, {
            name: '项目成果-学术专著.xlsx',
            url: '/static/excel/项目成果-学术专著.xlsx'
          } ,{
            name: '项目成果-软件著作权.xlsx',
            url: '/static/excel/项目成果-软件著作权.xlsx'
          },{
            name: '项目成果-人才资质奖励专利奖.xlsx',
            url: '/static/excel/项目成果-人才资质奖励专利奖.xlsx'
          },{
            name: '项目成果-期刊论文.xlsx',
            url: '/static/excel/项目成果-期刊论文.xlsx'
          },{
            name: '项目成果-会议论文.xlsx',
            url: '/static/excel/项目成果-会议论文.xlsx'
          },{
            name: '项目成果-成果鉴定.xlsx',
            url: '/static/excel/项目成果-成果鉴定.xlsx'
          },{
            name: '项目成果-应用证明.xlsx',
            url: '/static/excel/项目成果-应用证明.xlsx'
          },{
            name: '项目成果-专利.xlsx',
            url: '/static/excel/项目成果-专利.xlsx'
          }
        ]
      };
    },
    created() {
      this.getUserType();
      this.$store.dispatch("setHeight", 100);
      this.getPageList()
    },
    computed: {
      ...mapGetters(['getAuthObj','getSearchParams'])
    },
    mounted() {
      this.initData();
    },
    methods: {
      /**
       *  判断当前用户是否是立项变更考核管理员
       */
      async getUserType() {
        const {code, data} = await getUserType()
        if (code === 1) {
          this.isUserType = data
        }
      },
      /**
       *  新增类型
       */
      hanldeAddType() {
        this.dialogVisible = true
        this.$nextTick(() => {
          this.searchModelType.resetFields();
        })
      },
      /**
       * 弹窗确定
       */
      handleAddOk() {
        this.$nextTick(() => {
          this.searchModelType.submit((formData) => {
            this.$router.push({name: 'results', query: {type: 'add', typeCode: formData.typeCode}})
            this.searchModelType.resetFields();
          });
        })
      },
      /**
       * 关闭弹窗
       */
      handleClose() {
        this.dialogVisible = false
        this.searchModelType.resetFields();
      },
      /**
       *  表格数据
       */
      async getPageList() {
        const {code, data, total} = await getProjectList({
          ...this.searchForm,
          ...this.getSearchParams
        })
        if (code === 1) {
          this.tableData = data
          this.searchForm.total = total;
           this.$nextTick(() => {
          this.searchFormModel.setValue(this.getSearchParams);
        });
        }
      },
      /**
       *  列表查询
       */
      formSearchMethod(self,reset) {
        this.searchForm = {
          ...self.$f.formData(),
          pageNum: 1,
          pageSize: 10,
          total: 0
        };
        this.$saveSearchParam({searchForm:this.searchForm,reset})

        this.getPageList();
      },
      /**
       *  列表重置
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
       * 获取上传列表
       * @param val
       */
      getFileList(status) {
        if (status) {
          this.getPageList();
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
        this.getPageList();
      },
      /**
       *  修改
       * @param row
       */
      handleEditeClick(row) {
        console.log(row.typeCode);
        this.$router.push({name: 'results', query: {type: 'edit', typeCode: row.typeCode, id: row.id}})
      },
      /**
       *  查看
       * @param row
       */
      handleDetails(row) {
        this.$router.push({name: 'results', query: {type: 'view', typeCode: row.typeCode, id: row.id}})
      },
      /**
       *  删除数据
       * @param row
       */
      async handleDelete(row) {
        const {code, date} = await deleteProList({
          id: row.id
        })
        if (code === 1) {
          this.getPageList()
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
</style>