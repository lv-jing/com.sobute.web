<template>
    <div>
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix flex flex-center-between">
                <span>专利费用信息报表</span>
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
                        v-loading="listLoading"
                        style="width: 100%"
                        :header-cell-style="{background:'#f3f3f3'}"
                        size="small"
                >
                    <el-table-column prop="documentNumber" label="成果入库单号" width="100px"></el-table-column>
                    <el-table-column prop="type" label="成果类型"></el-table-column>
                    <el-table-column prop="patentName" label="专利名称"></el-table-column>
                    <el-table-column prop="proposalDate" label="提案日期" width="100px"></el-table-column>
                    <el-table-column prop="proposalDepartment" label="提案部门"></el-table-column>
                    <el-table-column prop="proposer" label="提案人"></el-table-column>
                    <el-table-column prop="inventor" label="发明人"></el-table-column>
                    <el-table-column prop="applicant" label="申请人"></el-table-column>
                    <el-table-column prop="applicationType" label="申请类型"></el-table-column>
                    <el-table-column prop="region" label="申请国家/地区"></el-table-column>
                    <el-table-column prop="relatedCases" label="关联案"></el-table-column>
                    <el-table-column prop="status" label="单据状态"></el-table-column>

                    <el-table-column prop="applicationNumber" label="申请号"></el-table-column>
                    <el-table-column prop="applicationDate" label="申请日" width="100px"></el-table-column>
                    <el-table-column prop="priorityNumber" label="优先权号"></el-table-column>
                    <el-table-column prop="priorityDate" label="优先权日" width="100px"></el-table-column>
                    <el-table-column prop="publicationNumber" label="公开号"></el-table-column>
                    <el-table-column prop="publicationDate" label="公开日" width="100px"></el-table-column>
                    <el-table-column prop="examinationDate" label="进入实审日" width="100px"></el-table-column>
                    <el-table-column prop="authorizationDate" label="授权办登日" width="100px"></el-table-column>
                    <el-table-column prop="legalStatus" label="法律状态"></el-table-column>
                    <el-table-column prop="projectNumber" label="关联项目编号"></el-table-column>
                    <el-table-column prop="technicalClassification" label="技术分类"></el-table-column>
                    <el-table-column prop="productClassification" label="产品名称"></el-table-column>
                    <el-table-column prop="applicationSituationCode" label="应用情况"></el-table-column>
                    <el-table-column prop="patentFlag" label="专利包名称"></el-table-column>
                    <el-table-column prop="patentLevel" label="专利类别"></el-table-column>
                    <el-table-column prop="patentClass" label="专利级别"></el-table-column>
                    <el-table-column prop="commissionDate" label="委托日期" width="100px"></el-table-column>
                    <el-table-column prop="agency" label="代理机构"></el-table-column>
                    <el-table-column prop="awardYear" label="获奖年份"></el-table-column>
                    <el-table-column prop="awardType" label="获奖类别"></el-table-column>

                    <el-table-column prop="patentAssignee" label="运营信息-专利受让人"></el-table-column>
                    <el-table-column prop="assignmentDate" label="运营信息-专利受让日" width="100px"></el-table-column>
                    <el-table-column prop="assignedAmount" label="运营信息-受让金额"></el-table-column>
                    <el-table-column prop="patentPledgee" label="运营信息-专利质权人"></el-table-column>
                    <el-table-column prop="contractDate" label="运营信息-质押合同登记日" width="100px"></el-table-column>
                    <el-table-column prop="pledgeAmount" label="运营信息-质押金额"></el-table-column>
                    <el-table-column prop="patentLicensee" label="运营信息-专利被许可人"></el-table-column>
                    <el-table-column prop="licenseContractDate" label="运营信息-专利许可合同备案日期" width="100px"></el-table-column>
                    <el-table-column prop="patentLicenseType" label="运营信息-专利许可类型"></el-table-column>
                    <el-table-column prop="licenseAmount" label="运营信息-许可金额"></el-table-column>

                    <el-table-column prop="expenseType" label="缴费类型"></el-table-column>
                    <el-table-column prop="amount" label="缴费金额"></el-table-column>
                    <el-table-column prop="deadline" label="缴费期限" width="100px"></el-table-column>
                    <el-table-column prop="expenseStatus" label="缴费状态"></el-table-column>
                    <el-table-column prop="paymentDate" label="缴费日" width="100px"></el-table-column>
                    <el-table-column prop="entity" label="缴费主体"></el-table-column>

                </el-table>

                <common-pagination v-on:handler-currentPage="handlerCurrentPage" :list="searchForm"></common-pagination>

            </div>
        </el-card>

    </div>
</template>

<script>
    import {
        getList,
    } from "@/service/report/ExpenseReport";
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
                excelName:'专利期限信息报表',//数据导出名称
            }
        },
        created() {
            this.getReportList();
            this.columnsList={
                "documentNumber" :"成果入库单号",
                "type" :"成果类型",
                "patentName" :"专利名称",
                "proposalDate" :"提案日期",
                "proposalDepartment" :"提案部门",
                "proposer" :"提案人",
                "inventor" :"发明人",
                "applicant" :"申请人",
                "applicationType" :"申请类型",
                "region" :"申请国家/地区",
                "relatedCases" :"关联案",
                "status" :"单据状态",
                "applicationNumber" :"申请号",
                "applicationDate" :"申请日",
                "priorityNumber" :"优先权号",
                "priorityDate" :"优先权日",
                "publicationNumber" :"公开号",
                "publicationDate" :"公开日" ,
                "examinationDate" :"进入实审日" ,
                "authorizationDate" :"授权办登日",
                "legalStatus" :"法律状态",
                "projectNumber" :"关联项目编号",
                "technicalClassification" :"技术分类",
                "productClassification" :"产品名称",
                "applicationSituationCode" :"应用情况",
                "patentFlag" :"专利包名称",
                "patentLevel" :"专利类别",
                "patentClass" :"专利级别",
                "commissionDate" :"委托日期",
                "agency" :"代理机构",
                "awardYear" :"获奖年份",
                "awardType" :"获奖类别",
                "patentAssignee":"运营信息-专利受让人",
                "assignmentDate":"运营信息-专利受让日",
                "assignedAmount":"运营信息-受让金额",
                "patentPledgee":"运营信息-专利质权人",
                "contractDate":"运营信息-质押合同登记日",
                "pledgeAmount":"运营信息-质押金额",
                "patentLicensee":"运营信息-专利被许可人",
                "licenseContractDate":"运营信息-专利许可合同备案日期",
                "patentLicenseType":"运营信息-专利许可类型",
                "licenseAmount":"运营信息-许可金额",
                "expenseType" :"缴费类型",
                "amount" :"缴费金额",
                "deadline" :"缴费期限",
                "expenseStatus" :"缴费状态",
                "paymentDate" :"缴费日",
                "entity" :"缴费主体",
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
                        pageSize: -1
                    };
                } else {
                    params = this.searchForm;
                }
                this.listLoading  = true;
                getList(params).then(res=>{
                    if (bool) {
                        this.resourceList = res.data.data;
                        this.listLoading = false
                    } else {
                        this.searchForm.total = res.data.total;
                        this.tableData = res.data.data;
                        this.listLoading = false
                    }

                })
            }
        }
    }
</script>

<style scoped>

</style>