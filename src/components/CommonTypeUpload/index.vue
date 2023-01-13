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
      <el-table-column type="index" label="序号" width="50"></el-table-column>
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
      <!-- <el-table-column prop="createdByName" label="创建人" width="100"></el-table-column> -->

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
  import commonUpload from "@/components/CommonUpload";
  import {getTypeUpload} from "@/service/common"

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
      uploadParams: {
        type: Object,
        default: () => {
        }
      }
    },
    data() {
      return {
        show: false,
        uploadShow: false,
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
        let arr = await this.getTypeUpload(this.uploadParams)
        this.tableData = this.getUplodFileList(arr, val)
        console.log(val,arr)
      
        this.$emit('getUploadTable', this.tableData)
      },
      uploadParams(val) {
        // 只有参数不为编辑得时候执行
        if (val && val.type !== 'edit') {
          this.getTypeUpload(val, 1)
        }
      }
    },
    methods: {
      /**
       * 获取必传附件接口
       */
      async getTypeUpload(params, num) {
        const {code, data} = await getTypeUpload(params);
        if (code === 1) {
          let list = [];
          if (data && data.length > 0) {
           list= data.map(item => {
              return{
                bizSubType: item.name,
                bizSubTypeCode: item.code,
                bizType: item.preName,
                bizTypeCode: item.preCode,
                createdByName:item.createdByName
              };
            });
            if (num === 1) {
              this.tableData = list;
              this.$emit('getUploadTable', list)
              this.uploadShow = true
            } else {
              this.uploadShow = true
              return list
            }
          } else {
            this.uploadShow = false
            this.$emit('getUploadTable', [])
          }
        } else {
          this.uploadShow = false
        }
      },
      /**
       * 必传附件去重
       * souceList 源数据字典附件必传数据，
       * uploadList 已上传数据字典
       */
      getUplodFileList(souceList, uploadList) {
        if (souceList) {
          return souceList.map(item => {
            uploadList.map(items => {
              if (item.bizSubTypeCode == items.bizSubTypeCode) {
                item = Object.assign({}, {...items, ...item})
              }
            })
            return item;
          });
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