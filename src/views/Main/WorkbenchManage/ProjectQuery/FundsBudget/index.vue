<template>
  <div>
    <el-col :span="24">
      <common-title title="项目经费来源" class="md10" />
      <div class="user-form-table">
        <el-table
                class="mt10"
                :data="tableData_ly"
                stripe
                highlight-current-row
                style="width: 1000px"
                :header-cell-style="{background:'#f3f3f3'}"
                size="small"
        >
          <!--<el-table-column type="index" label="序号" width="50"></el-table-column>-->
          <el-table-column prop="contractAmt" width="500" label="合同金额（万元）">
          </el-table-column>
          <el-table-column prop="erpRecAmt" width="500" label="已到账金额（万元）">
          </el-table-column>
        </el-table>
      </div>
    </el-col>
    <el-col :span="24">
      <common-title title="经费预实支出对照表" class="md10 mt30" />
      <div class="user-form-table">
        <el-table
                class="mt10"
                :data="tableData_zc"
                stripe
                highlight-current-row
                style="width: 100%"
                :header-cell-style="{background:'#f3f3f3'}"
                size="small"
        >
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="projectName" width="300" label="项目名称">
          </el-table-column>
          <el-table-column prop="projectType" label="项目类型">
          </el-table-column>
          <el-table-column prop="department" label="承担部门">
          </el-table-column>
          <el-table-column prop="projectRespName" label="项目负责人">
          </el-table-column>
          <el-table-column prop="accountName" label="费用科目">
          </el-table-column>
          <el-table-column prop="specialAmount" label="预算支出-专项">
          </el-table-column>
          <el-table-column prop="perAmount" label="预算支出-自筹">
          </el-table-column>
          <el-table-column prop="acExpSpecialAmt" label="实际支出-专项">
          </el-table-column>
          <el-table-column prop="acExpPerAmt" label="实际支出-自筹">
          </el-table-column>
          <el-table-column label="结余-专项">
            <template slot-scope="scope">
              <div>{{scope.row.specialAmount-scope.row.acExpSpecialAmt}}</div>
            </template>
          </el-table-column>
          <el-table-column label="结余-自筹">
            <template slot-scope="scope">
              <div>{{scope.row.perAmount-scope.row.acExpPerAmt}}</div>
            </template>
          </el-table-column>
          <el-table-column label="总预算">
            <template slot-scope="scope">
              <div>{{scope.row.specialAmount+scope.row.perAmount}}</div>
            </template>
          </el-table-column>
          <el-table-column label="总实际支出">
          <template slot-scope="scope">
            <div>{{scope.row.acExpSpecialAmt+scope.row.acExpPerAmt}}</div>
          </template>
        </el-table-column>
          <el-table-column label="总结余">
            <template slot-scope="scope">
              <div>{{scope.row.specialAmount+scope.row.perAmount-scope.row.acExpSpecialAmt-scope.row.acExpPerAmt}}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-col>
  </div>
</template>

<script>
/* eslint-disable */
import { transformValueAndLabel, rowDrop } from "@/utils/tools";
import { getProDetail } from "@/service/approval";
import { getDictionaryTypeName } from "@/service/system";
import { getBudgetInfo,getFundsSource} from "@/service/projectQuery";
import { mapState } from "vuex";

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
      tableData_zc:[],
      tableData_ly:[],
    };
  },
  mounted() {

  },
  computed: {

  },
  watch: {
    baseObj(val){
      //console.log(val);
      this.getBudgetInfo(val.projectNumber);
      this.getFundsSource(val.projectNumber);
    }
  },
  methods: {
    async getBudgetInfo(val){
      const { code, data } = await getBudgetInfo({ projectNumber: val });
      console.log(data)
      this.tableData_zc = data;
    },

    async getFundsSource(val){
      const { code, data } = await getFundsSource({ projectNumber: val });
      //console.log(data);
      this.tableData_ly = data;
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