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
                        v-loading="listLoading"
                        style="width: 100%"
                        :header-cell-style="{background:'#f3f3f3'}"
                        size="small"
                >
                    <el-table-column prop="alias" label="昵称" width="90px"></el-table-column>
                    <el-table-column prop="username" label="用户名"></el-table-column>
                    <el-table-column prop="phone" label="手机号码" width="130px"></el-table-column>
                    <el-table-column prop="idCard" label="身份证" width="150px"></el-table-column>
                    <el-table-column prop="sex" label="性别" width="50px"></el-table-column>
                    <!-- <el-table-column prop="sex" label="性别">
                      <template slot-scope="scope">{{sexText[scope.row.sex]}}</template>
                    </el-table-column>-->
                    <el-table-column prop="name" label="权限" width="130px"></el-table-column>
                    <el-table-column prop="menuSub" label="目录权限"></el-table-column>
                    <el-table-column prop="mname" label="菜单权限" width="130px"></el-table-column>
                    <el-table-column prop="confined" label="受限"></el-table-column>
                    <el-table-column prop="email" label="电子邮件" width="150px"></el-table-column>
                    <el-table-column prop="type" label="类型"></el-table-column>
                </el-table>

                <common-pagination v-on:handler-currentPage="handlerCurrentPage" :list="searchForm"></common-pagination>

            </div>
        </el-card>

    </div>
</template>

<script>
    import {
        getList,
    } from "@/service/report/PermissionReport";
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
                excelName:'用户权限报表',//数据导出名称
            }
        },
        created() {
            this.getReportList();
            this.columnsList={
                "alias": "昵称",
                "username": "用户名",
                "phone": "手机号码",
                "idCard": "身份证",
                "sex": "性别",
                "name": "权限",
                "menuSub": "目录权限",
                "mname": "菜单权限",
                "confined": "受限",
                "email":"电子邮件",
                "type":"类型"
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
                //console.log(this.searchForm);
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