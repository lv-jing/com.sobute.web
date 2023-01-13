<template>
  <div>
    <el-col :span="24">
      <common-title title="期刊论文"  class="md10" />
      <div class="user-form-table">
        <el-table
                class="mt10"
                :data="tableData_qk"
                stripe
                highlight-current-row
                style="width: 100%"
                :header-cell-style="{background:'#f3f3f3'}"
                size="small"
        >
          <el-table-column prop="name"  label="论文题目"></el-table-column>
          <el-table-column prop="certificate" width="400" label="全部作者"></el-table-column>
          <el-table-column prop="source" label="刊物名称"></el-table-column>
          <el-table-column prop="confirmDate" width="100" label="发表时间"></el-table-column>
          <el-table-column prop="register" width="100" label="卷期"></el-table-column>
          <el-table-column prop="page" width="100" label="页码"></el-table-column>
          <el-table-column prop="employ" width="100" label="收录情况"></el-table-column>
        </el-table>
      </div>
    </el-col>
    <el-col :span="24">
      <common-title title="会议论文"  class="md10" />
      <div class="user-form-table">
        <el-table
                class="mt10"
                :data="tableData_hy"
                stripe
                highlight-current-row
                style="width: 100%"
                :header-cell-style="{background:'#f3f3f3'}"
                size="small"
        >
          <el-table-column prop="name"  label="论文题目"></el-table-column>
          <el-table-column prop="certificate" width="300" label="全部作者"></el-table-column>
          <el-table-column prop="source" label="会议名称"></el-table-column>
          <el-table-column prop="register" width="100" label="会议地点"></el-table-column>
          <el-table-column prop="confirmDate" width="100" label="会议时间"></el-table-column>
        </el-table>
      </div>
    </el-col>
    <el-col :span="24">
      <common-title title="专利" class="md10 mt30"  />
      <div class="user-form-table">
        <el-table
                class="mt10"
                :data="tableData_zl"
                stripe
                highlight-current-row
                style="width: 100%"
                :header-cell-style="{background:'#f3f3f3'}"
                size="small"
        >
          <el-table-column prop="organization"  label="发明人"></el-table-column>
          <el-table-column prop="name" width="400" label="专利名称"></el-table-column>
          <el-table-column prop="employ" label="申请类型"></el-table-column>
          <el-table-column prop="source" width="200" label="申请国家/地区"></el-table-column>
          <el-table-column prop="doi" width="200" label="申请号或授权号"></el-table-column>
        </el-table>
      </div>
    </el-col>
    <el-col :span="24">
      <common-title title="软件著作权" class="md10 mt30"  />
      <div class="user-form-table">
        <el-table
                class="mt10"
                :data="tableData_rz"
                stripe
                highlight-current-row
                style="width: 100%"
                :header-cell-style="{background:'#f3f3f3'}"
                size="small"
        >
          <el-table-column prop="author"  label="著作权人"></el-table-column>
          <el-table-column prop="name" width="400" label="成果名称"></el-table-column>
          <el-table-column prop="organization" label="登记号"></el-table-column>
          <el-table-column prop="applyDate" width="100" label="登记日期"></el-table-column>
        </el-table>
      </div>
    </el-col>
    <el-col :span="24">
      <common-title title="标准规范" class="md10 mt30"  />
      <div class="user-form-table">
        <el-table
                class="mt10"
                :data="tableData_bz"
                stripe
                highlight-current-row
                style="width: 100%"
                :header-cell-style="{background:'#f3f3f3'}"
                size="small"
        >
          <el-table-column prop="organization"  label="全部起草人"></el-table-column>
          <el-table-column prop="name" width="400" label="标准名称"></el-table-column>
          <el-table-column prop="certificate" label="标准号"></el-table-column>
          <el-table-column prop="source" label="类别"></el-table-column>
          <el-table-column prop="confirmDate" width="100" label="发布日期"></el-table-column>
          <el-table-column prop="doi" width="100" label="发布部门"></el-table-column>
        </el-table>
      </div>
    </el-col>
    <el-col :span="24">
      <common-title title="学术专著" class="md10 mt30"  />
      <div class="user-form-table">
      <el-table
              class="mt10"
              :data="tableData_xz"
              stripe
              highlight-current-row
              style="width: 100%"
              :header-cell-style="{background:'#f3f3f3'}"
              size="small"
      >
        <el-table-column prop="author"  label="全部作者"></el-table-column>
        <el-table-column prop="name" width="400" label="书名"></el-table-column>
        <el-table-column prop="party" label="出版社"></el-table-column>
        <el-table-column prop="confirmDate" label="出版日期"></el-table-column>
      </el-table>
    </div>
    </el-col>
    <el-col :span="24">
      <common-title title="应用证明" class="md10 mt30"  />
      <div class="user-form-table">
        <el-table
                class="mt10"
                :data="tableData_zm"
                stripe
                highlight-current-row
                style="width: 100%"
                :header-cell-style="{background:'#f3f3f3'}"
                size="small"
        >
          <el-table-column prop="name" width="400" label="成果名称"></el-table-column>
          <el-table-column prop="organization" label="工程名称"></el-table-column>
          <el-table-column prop="confirmDate" label="应用日期"></el-table-column>
          <el-table-column prop="party" label="应用单位"></el-table-column>
        </el-table>
      </div>
    </el-col>
    <el-col :span="24">
      <common-title title="成果鉴定" class="md10 mt30"  />
      <div class="user-form-table">
        <el-table
                class="mt10"
                :data="tableData_cg"
                stripe
                highlight-current-row
                style="width: 100%"
                :header-cell-style="{background:'#f3f3f3'}"
                size="small"
        >
          <el-table-column prop="name" width="400" label="成果名称"></el-table-column>
          <el-table-column prop="employ" label="成果水平"></el-table-column>
          <el-table-column prop="register" label="鉴定单位"></el-table-column>
          <el-table-column prop="confirmDate" label="鉴定时间"></el-table-column>
          <el-table-column prop="certificate" label="证书编号"></el-table-column>
        </el-table>
      </div>
    </el-col>
  </div>
</template>

<script>
/* eslint-disable */
import {getAchievementInfo} from "@/service/projectQuery";
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
      tableData_qk:[],
      tableData_hy:[],
      tableData_zl:[],
      tableData_rz:[],
      tableData_bz:[],
      tableData_xz:[],
      tableData_zm:[],
      tableData_cg:[],
    };
  },
  mounted() {

  },

  watch:{
    baseObj(val){
      this.getAchievementInfo(val.id);
    }
  },
  methods: {
    async getAchievementInfo(val){
      const { code, data } = await getAchievementInfo({ id: val });
      for(let i=0;i<data.length;i++){
        if(data[i].type==="期刊论文"){
          this.tableData_qk.push(data[i])
        }
        if(data[i].type==="会议论文"){
          this.tableData_hy.push(data[i])
        }
        if(data[i].type==="专利"){
          this.tableData_zl.push(data[i])
        }
        if(data[i].type==="软件著作权"){
          this.tableData_rz.push(data[i])
        }
        if(data[i].type==="标准规范"){
          this.tableData_bz.push(data[i])
        }
        if(data[i].type==="学术专著"){
          this.tableData_xz.push(data[i])
        }
        if(data[i].type==="应用证明"){
          this.tableData_zm.push(data[i])
        }
        if(data[i].type==="成果鉴定"){
          this.tableData_cg.push(data[i])
        }
      }
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