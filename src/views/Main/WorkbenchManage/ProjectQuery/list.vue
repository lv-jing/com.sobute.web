<template>
    <div class="bg-white">
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix flex flex-center-between">
                <span>项目查询</span>
            </div>
            <div class="user-form-search">
                <form-create
                        ref="box"
                        v-model="searchFormModel"
                        :rule="searchFormRule"
                        @form-search-click="formSearchMethod"
                        @form-reset-click="formResetMethod"
                        @apply-change="applyChange"
                        :option="searchOption"
                />
            </div>
            <div class="user-form-table mt20">
                <el-table
                        class="mt10"
                        :data="tableData"
                        stripe
                        highlight-current-row
                        style="width: 100%"
                        :header-cell-style="{background:'#f3f3f3'}"
                        size="small"
                >
                    <el-table-column prop="projectNumber" width="90" label="项目编号"></el-table-column>
                    <el-table-column prop="projectName" width="300" label="项目名称"></el-table-column>
                    <el-table-column prop="documentNumber" label="申请编号"></el-table-column>
                    <el-table-column prop="projectType" label="项目类型"></el-table-column>
                    <el-table-column prop="createdByName" width="80" label="创建人"></el-table-column>
                    <el-table-column label="执行期间">
                        <template slot-scope="scope">
                            <div>{{scope.row.startDate+' 至 '+scope.row.endDate }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" width="60" label="状态"></el-table-column>
                    <el-table-column label="操作" width="200" align="center">
                        <template v-slot="{row}">
                            <commonOnlyQuery
                                    :row="row"
                                    :getPageList="getPageList"
                                    pageUrlName="projectQuery"
                            />
                        </template>
                    </el-table-column>
                </el-table>
                <common-pagination v-on:handler-currentPage="handlerCurrentPage" :list="searchForm"></common-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
    import { searchFormRule } from "./rules";
    import {getProjectQueryList} from "@/service/projectQuery";
    import { transformValueAndLabel, deepCloneClear } from "@/utils/tools";
    import { getDictionaryTypeName } from "@/service/system";
    export default {
        name: "index.vue",
        data() {
            return {
                isUserType: false,
                //downUrl: getDownLoadWords,
                //deletUrl: deleteProList,
                searchForm: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                tableData: [],
                searchFormModel: {},
                searchFormRule: searchFormRule,
                searchOption: {
                    resetBtn: false,
                    submitBtn: false,
                    form: {}
                },
                currentItem: {},
                show: false
            };
        },
        created() {
            this.$store.dispatch("setHeight", 100);
            this.getPageList();
        },
        methods: {
            /**
             *  表格数据接口
             */
            async getPageList() {
                const { code, data, total } = await getProjectQueryList({
                    ...this.searchForm,
                    ...this.getSearchParams
                });
                if (code === 1) {
                    this.tableData = data;
                    this.searchForm.total = total;
                    this.$nextTick(() => {
                        this.searchFormModel.setValue(this.getSearchParams);
                    });
                }
            },
            /**
             *  列表重置
             */
            formResetMethod(self) {
                self.$f.resetFields();
                this.initData();
                this.formSearchMethod(self, "reset");
            },
            /**
             * 初始化查询数据
             */
            initData() {
                const formData = this.searchFormModel.formData();
                let clearFormData = deepCloneClear(formData);
                //this.searchFormModel.disabled(true, "projectTypeCode");
                this.searchFormModel.setValue("projectTypeCode", "", true);
                this.searchFormModel.setValue(clearFormData);
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
             *  选择用户类型 change事件 动态隐藏需要项
             */
            applyChange(val) {
                this.searchFormModel.setValue('projectTypeCode', '', true)

                this.searchFormModel.disabled(false, 'projectTypeCode')
                if (val == '0') {
                    this.getDictionaryTypeName('PROJECT_TYPE')
                } else {
                    this.getDictionaryTypeName('PROJECT_TYPE_OUT')
                }

            },
            /**
             * 项目类型下拉选择接口
             */
            async getDictionaryTypeName(typeName) {
                if (!typeName) return;
                const { code, data } = await getDictionaryTypeName({ typeName });
                if (code === 1) {
                    const options = await transformValueAndLabel(
                        data,
                        ["name", "code"],
                        false
                    );
                    this.searchFormModel.updateRule(
                        "projectTypeCode",
                        {
                            options: options
                        },
                        true
                    );
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
                this.$saveSearchParam({ searchForm: this.searchForm, reset });
                this.getPageList();
            },
        }
    }
</script>

<style scoped>

</style>