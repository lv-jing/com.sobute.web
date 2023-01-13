<template>
  <div>
    <el-col :span="24">
      <common-title title="相关文档"  class="md10" />
      <div class="user-form-table">
        <el-table
                class="mt10"
                :data="tableData"
                stripe
                highlight-current-row
                style="width: 100%"
                :header-cell-style="{background:'#f3f3f3'}"
                size="small"
                :span-method="objectSpanMethod"
        >
          <el-table-column prop="tableType"  width="300" label="模块名称"></el-table-column>
          <el-table-column prop="fileName" width="655" label="文档名称"></el-table-column>
          <el-table-column width="700" label="链接">
            <template slot-scope="scope">
              <div style="color:blue;text-decoration:underline;cursor:pointer;" @click="downloadDoc(scope.row)">下载</div>
            </template>
          </el-table-column>
        </el-table>
        <common-pagination v-on:handler-currentPage="handlerCurrentPage" :list="searchForm"></common-pagination>
      </div>
    </el-col>

  </div>
</template>

<script>
/* eslint-disable */
import { getUploadUrl, downloadUrl } from "@/service/common";
import { mapState } from "vuex";
import {getDocumentList} from "@/service/projectQuery";
import { exportFile } from "@/utils/tools";

export default {
  name: "index",
  props:{
    baseObj:{
      type:Object,
      default:()=>{}
    }
  },
  data() {
    return {
      tableData:[],
      projectId:"",
      downloadUrl: downloadUrl,
      searchForm: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
    };
  },
  // created() {
  //   this.$store.dispatch("setHeight", 100);
  //   this.getPageList();
  // },
  computed: {

  },
  watch:{
    baseObj(val){
      this.projectId = val.id;
      this.getPageList(val.id);
      //this.getAchievementInfo(val.id);
    }
  },
  methods:{
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // console.log("==@@=")
      // console.log(row);
      // console.log(column);
      // console.log(rowIndex);
      // console.log(columnIndex);
      if(columnIndex === 0 ) {
        // this.tableData  修改
        const _row = (this.flitterData(this.tableData).one)[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }

    },
    flitterData(arr){
      // console.log("arr")
      // console.log(arr);
      let spanOneArr = []
      let concatOne = 0
      arr.forEach((item,index)=>{
        if(index === 0){
          spanOneArr.push(1);
        }else{
          //name 修改
          if(item.tableType === arr[index - 1].tableType){ //第一列需合并相同内容的判断条件
            spanOneArr[concatOne] += 1;
            spanOneArr.push(0);
          }else{
            spanOneArr.push(1);
            concatOne = index;
          };
        }
      });
      return  {
        one: spanOneArr,
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
     *  表格数据接口
     */
    async getPageList(val) {
      const { code, data, total } = await getDocumentList({
        ...this.searchForm,
        projectId:val
      });
      if (code === 1) {
        this.tableData = data;
        this.searchForm.total = total;
      }
    },

    downloadDoc(row){
        exportFile(
                `${downloadUrl}/service/attachment/download/${row.guid}`,
                {},
                row.fileName
        );
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