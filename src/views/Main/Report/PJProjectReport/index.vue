<template>
    <div>
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix flex flex-center-between">
                <span>报表管理</span>
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

            <common-exports :columns-list="columnsList"
              class="mt20"
                            :excel-name="excelName"
                            v-on:export-excel="exportExcel"
                            :resource-list="resourceList">
            </common-exports>
            <div class="user-form-table mt20">
                <el-table
                        :data="tableData"
                        stripe1
                        height="600"
                        v-loading="listLoading"
                        style="width: 100%"
                        :header-cell-style="{background:'#f3f3f3'}"
                        size="small"
                >
                    <el-table-column prop="projectId" label="项目ID" width="100px"></el-table-column>
                    <el-table-column prop="projectNumber" label="项目编号" width="100px"></el-table-column>
                    <el-table-column prop="projectName" label="项目名称"></el-table-column>
                    <el-table-column prop="documentId" label="申报编号ID"></el-table-column>
                    <el-table-column prop="documentNumber" label="申报编号" width="100px"></el-table-column>
                    <el-table-column prop="status" label="项目状态"></el-table-column>
                    <el-table-column prop="statusCode" label="项目状态代码"></el-table-column>
                    <el-table-column prop="projectType" label="项目类型"></el-table-column>
                    <el-table-column prop="field" label="所属领域/研究方向"></el-table-column>
                    <el-table-column prop="source" label="项目来源"></el-table-column>
                    <el-table-column prop="customerName" label="来源单位名称/鉴定单位"></el-table-column>
                    <el-table-column prop="customerNum" label="来源单位编号"></el-table-column>
                    <el-table-column prop="startDate" label="执行开始时间"></el-table-column>
                    <el-table-column prop="endDate" label="执行结束时间"></el-table-column>
                    <el-table-column prop="extNumber" label="外部编号" width="100px"></el-table-column>
                    <el-table-column prop="engName" label="工程名称"></el-table-column>
                    <el-table-column prop="outcomes" label="预期成果" width="100px"></el-table-column>
                    <el-table-column prop="department" label="承担部门"></el-table-column>
                    <el-table-column prop="material" label="材料" width="100px"></el-table-column>
                    <el-table-column prop="description" label="项目概况/摘要" width="100px"></el-table-column>
                    <el-table-column prop="keyWords" label="技术关键词" width="100px"></el-table-column>
                    <el-table-column prop="appraisalCompany" label="鉴定单位"></el-table-column>
                    <el-table-column prop="awardName" label="奖励名称"></el-table-column>
                    <el-table-column prop="awardRank" label="奖励等级"></el-table-column>
                    <el-table-column prop="necNote" label="立项的必要性" width="200px"></el-table-column>
                    <el-table-column prop="intNote" label="知识产权现状" width="200px"></el-table-column>
                    <el-table-column prop="researchContents" label="项目研究内容" width="200px"></el-table-column>
                    <el-table-column prop="projectTarget" label="项目目标" width="300px"></el-table-column>
                    <el-table-column prop="patentClass" label="专利级别"></el-table-column>

                    <el-table-column prop="fundsType" label="经费来源-类型" width="100px"></el-table-column>
                    <el-table-column prop="fundsYear" label="经费来源-年份"></el-table-column>
                    <el-table-column prop="fundsAmount" label="经费来源-金额（万元）"></el-table-column>
                    <el-table-column prop="budgetType" label="经费预算-类型"></el-table-column>
                    <el-table-column prop="budgetYear" label="经费预算-年份"></el-table-column>
                    <el-table-column prop="budgetAmount" label="经费预算-金额（万元）"></el-table-column>
                </el-table>

                <common-pagination v-on:handler-currentPage="handlerCurrentPage" :list="searchForm"></common-pagination>

            </div>
        </el-card>

    </div>
</template>

<script>
    import {
        getList,
    } from "@/service/report/PJProjectReport";
    import { searchFormRule } from "./rules";
    export default {
        name: "index",
        data(){
            return{
                tableData: [],
                listLoading:false,
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
                },
                // 导出需要添加的
                columnsList:{},//表格的头部展示信息和对应的key 必须配置
                resourceList:[],// 数据源,
                pageIndexArray:[],//分页数据索引
                excelName:'项目立项报表',//数据导出名称
            }
        },
        created() {
            this.getReportList();
            this.columnsList={
                "projectNumber":"项目编号",
                "projectName":"项目名称",
                "documentId":"申报编号ID",
                "documentNumber":"申报编号",
                "status":"项目状态",
                "statusCode":"项目状态代码",
                "projectType":"项目类型",
                "field":"所属领域/研究方向",
                "source":"项目来源",
                "customerName":"来源单位名称/鉴定单位",
                "customerNum":"来源单位编号",
                "startDate":"执行开始时间",
                "endDate":"执行结束时间",
                "extNumber":"外部编号",
                "engName":"工程名称",
                "outcomes":"预期成果",
                "department":"承担部门",
                "material":"材料",
                "description":"项目概况/摘要",
                "keyWords":"技术关键词",
                "appraisalCompany":"鉴定单位",
                "awardName":"奖励名称",
                "awardRank":"奖励等级",
                "necNote":"立项的必要性",
                "intNote":"知识产权现状",
                "researchContents":"项目研究内容",
                "projectTarget":"项目目标",
                "patentClass":"专利级别",
                "fundsType":"经费来源-类型",
                "fundsYear":"经费来源-年份",
                "fundsAmount":"经费来源-金额（万元）",
                "budgetType":"经费预算-类型",
                "budgetYear":"经费预算-年份",
                "budgetAmount":"经费预算-金额（万元）"
            }
        },
        methods:{
            /**
             * 导出数据事件
             */
            exportExcel() {
                this.getReportList(true);
            },
            /**
             * 查询
             */
            formSearchMethod(self) {
                this.searchForm = {
                    ...self.$f.formData(),
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                };
                this.getReportList();
            },
            /**
             * 重置
             */
            formResetMethod(self) {
                self.$f.resetFields();
                this.formSearchMethod(self);
            },
            /**
             * 分页查询
             */
            handlerCurrentPage(list) {
                this.searchForm = {
                    ...this.searchForm,
                    ...list
                };
                this.getReportList();
            },
            /**
             * 获取报表信息
             */
            getReportList(bool){
                let params = {};
                if (bool) {
                    params = {
                        ...this.searchForm,
                        pageNum: 1,
                        pageSize: 100000
                    };
                } else {
                    params = this.searchForm;
                }
                this.listLoading  = true;
	
             
                getList(params).then(res=>{
                     
                    if (bool) {
                        this.resourceList = res.data.data.list;
                        this.listLoading = false
                    } else {
                        this.searchForm.total = res.data.data.total;
                        this.tableData = res.data.data.list;
                        this.listLoading = false
                    }

                }) 
            }
        }
    }
</script>

<style scoped>

</style>