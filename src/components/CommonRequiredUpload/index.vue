<template>
  <div v-if="uploadShow">
    <common-title :isClone=true title="必传相关文档"/>
    <el-table
        class="mt10"
        :data="tableData"
        stripe highlight-current-row
        style="width: 100%"
        :header-cell-style="{background:'#f3f3f3'}"
    >
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <!--      <el-table-column prop="preName" label="父级类型"></el-table-column>-->
      <el-table-column prop="bizSubType" label="类型"></el-table-column>
      <el-table-column label="文件名">
        <template slot-scope="scope">
              <div
                  class="file-name"
                  v-for="(item,index) in scope.row.list"
                  :key="index"
              >{{item.fileName}}</div>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="scope">
          <div class="tc">
            <el-button type="text" @click="addUpload(scope)" size="mini"
                       circle>{{!['view','auditing'].includes($route.query.type)?'上传':'查看'}}
            </el-button>
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
      <div slot="title" v-text="uploadTitle"></div>
      <div class="p15">
        <div>
          <common-upload
              :title="'相关附件'"
              v-on:get-file-list="getFileList"
              :show-attached-list="showAttachedList"
              :upload-params="uploadParamsObj"
          ></common-upload>
          <div v-show="!['view','auditing'].includes($route.query.type)">
            <el-col :span="8" :offset="4" class="mt30">
              <el-button type="primary" class="w-100" @click="uploadOk">确认</el-button>
            </el-col>
            <el-col :span="8" :offset="4" class="mt30">
              <el-button class="w-100" @click="cancel">取消</el-button>
            </el-col>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  /* eslint-disable */
  import {getDictList} from "@/service/pilot";
  import commonUpload from "@/components/CommonUpload";

  export default {
    components: {
      commonUpload
    },
    name: "index",
    props: {
      // 编辑 查看 审批 回填上传列表数据
      attachedTable: {
        type: Array,
        default: () => []
      },
      // 附件类型
      uploadParams: {
        type: Object,
        default: () => {
        }
      },
      // 已审批附件类型
      uploadParamsTwo: {
        type: Object,
        default: () => {
        }
      },
      // 是否显示必传表格
      uploadShow: {
        type: Boolean,
        default: () => false
      }
    },
    data() {
      return {
        show: false,
        tableData: [],
        uploadTitle: '',
        editIndex: '',
        uploadParamsObj: {},
        currentItem: {},
        attachedList: [],
        showAttachedList: []
      }
    },
    watch: {
      // 编辑时候回填表格
      async attachedTable(val) {
        const {type, codeType} = this.$route.query;
        // 新增得时候请求返回一级必传父级
        let arr = await this.getDictList(this.uploadParams.bizTypeCode);
        if(['view','auditing'].includes(type)){
          this.tableData = val;
        } else {
          if (val) {// 有第二阶段 已审批2005104 ，已入库2005107的时候处理合并
            if (this.uploadParamsTwo && (codeType === '2005104' || codeType === '2005107')) {
              // 新增得时候请求默认二级必传父级
              let list = await this.getDictList(this.uploadParamsTwo.bizTypeCode);
              let sumList = [...arr, ...list];
              if (val.length < sumList.length) {
                this.tableData = this.getUplodFileList(sumList, val)
              } else {
                this.tableData = val;
              }
            } else { // 只有一阶段得时候
              if (val.length === arr.length) {
                this.tableData = val;
              } else {
                this.tableData = this.getUplodFileList(arr, val)
              }
            }
          } else {
            this.getDictList(this.uploadParams.bizTypeCode, 'one')
          }
        }

        // 返回回去，提交的时候没有上传附件 提示错误
        this.$emit('getUploadTable', this.tableData)
      }
    },
    mounted() {
      this.$nextTick(() => {
        const {type} = this.$route.query;
        if (type === 'add') {
          // 新增得时候请求默认一级必传父级
          this.getDictList(this.uploadParams.bizTypeCode, 'one')
        }
      })
    },
    methods: {
      /**
       * 必传附件去重
       * souceList 源数据字典附件必传数据，
       * uploadList 已上传数据字典
       */
      getUplodFileList(souceList, uploadList) {
        return souceList.map(item => {
          uploadList.map(items => {
            if (item.bizSubTypeCode == items.bizSubTypeCode) {
              item = Object.assign({}, {...item, ...items})
            }
          })
          return item;
        });
      },
      /**
       * @ typeCode 父级code
       * type 新增/编辑页面类型
       */
      async getDictList(typeCode, type) {
        console.log(typeCode,type);
        const {code, data} = await getDictList({
          code: typeCode
        });
        if (code === 1) {
          const list = data.map(item => {
           return {
              bizSubType: item.name,
              bizSubTypeCode: item.code,
              bizType: item.preName,
              bizTypeCode: item.preCode
            };
          });
          if (type === 'one') {
            this.tableData = list;
            this.$emit('getUploadTable', list)
          } else {
            return list;
          }
        }
      },
      /**
       * 添加上传附件
       */
      addUpload(scope) {
        this.show = true;
        this.uploadTitle = "上传/编辑附件";
        this.editIndex = scope.$index;
        this.currentItem = scope.row;
        this.uploadParams.bizSubType = scope.row.bizSubType;
        this.uploadParams.bizSubTypeCode = scope.row.bizSubTypeCode;
        if (!scope.row.list) {
          this.attachedList = []
        }
        this.$nextTick(() => {
          this.uploadParamsObj = {
            bizSubType: scope.row.bizSubType,
            bizSubTypeCode: scope.row.bizSubTypeCode,
            bizType: scope.row.bizType,
            bizTypeCode: scope.row.bizTypeCode
          }
          this.showAttachedList = scope.row.list;
        });
      },
      /**
       *关闭抽屉
       */
      handleClose() {
        this.show = false;
        this.showAttachedList = [];
      },
      /**
       * 获取上传列表
       */
      getFileList(list) {
        console.log(list)
        this.attachedList = list;
      },
      /**
       * 确认添加上传附件
       */
      uploadOk() {
        this.$set(this.tableData, this.editIndex, {
          ...this.currentItem,
          list: this.attachedList
        });
        this.show = false;
        this.showAttachedList = [];
        this.$emit('getUploadTable', this.tableData)
      },
      /**
       * 取消上传附件
       */
      cancel() {
        this.show = false;
        this.showAttachedList = [];
      },
    }
  }
</script>

<style scoped>
  .file-name {
    margin-right: 10px;
    cursor: pointer;
    color: #0070c1;
  }
</style>