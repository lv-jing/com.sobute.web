<template>
  <div>
    <el-button @click="exportExcelBtn" icon="iconfont sbt_download" type="primary">导出</el-button>
  </div>
</template>

<script>
/*eslint-disable*/
const { export_json_to_excel } = require("./js/Export2Excel");
import { cutValue } from '@/utils/tools'
export default {
  props: {
    // 数据展示的名称和对用的key
    columnsList:{
      type:Object,
      default:()=>{}
    },
    //数据源
    resourceList:{
       type:Array,
      default:()=>[]
    },
    //导出展示的表格名称
    excelName:[String]
  },
  watch:{
    resourceList(n){
      this.exportExcel(n)
    }
  },
  methods: {
    exportExcelBtn(){
      this.$emit('export-excel',true)
    },
    //excel导出
    exportExcel(resourceList) {
      this.downloadLoading = true;
      require.ensure([], () => {
        const {tHeaderName,tHeaderValue} = cutValue(this.columnsList);
        const data = this.formatJson(tHeaderValue, resourceList);
        export_json_to_excel(tHeaderName, data, this.excelName);
        this.downloadLoading = false;
      });
    },
    formatJson(tHeaderValue, jsonData) {
      return jsonData.map(v => tHeaderValue.map(j => v[j]));
    }
  }
};
</script>

<style lang="scss" scoped>
</style>