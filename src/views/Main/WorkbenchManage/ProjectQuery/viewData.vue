<template>
    <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix flex flex-center-between">
            <span>项目查询</span>
        </div>
        <div>
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="基本信息" name="1">
                    <basic-information ref="infor" :baseObj="baseObj" />
                </el-tab-pane>
                <el-tab-pane label="参与人员" name="2">
                    <participant ref="partic" :member-lists="memberList" />
                </el-tab-pane>
                <!--<el-tab-pane label="项目背景" name="3">-->
                    <!--<project-background ref="backgr" :baseObj="baseObj" />-->
                <!--</el-tab-pane>-->
                <el-tab-pane label="内容与目标" name="4">
                    <content-target
                            ref="target"
                            :baseObj="baseObj"
                            :acceptLists="acceptLists"
                            :mileLists="mileLists"
                            :node-lists="nodeLists"
                    />
                </el-tab-pane>
                <el-tab-pane label="经费及预算" name="5">
                    <funds-budget ref="budget" :baseObj="baseObj"/>
                </el-tab-pane>
                <el-tab-pane label="项目成果" name="6">
                    <achievement ref="achievement" :baseObj="baseObj"/>
                </el-tab-pane>
                <el-tab-pane label="相关文档" name="7">
                    <documents ref="documents" :baseObj="baseObj"/>
                </el-tab-pane>
                <!--<el-tab-pane label="相关单位信息" name="6">-->
                    <!--<related-units ref="units" :companyList="companyList" />-->
                <!--</el-tab-pane>-->
                <!--<el-tab-pane label="项目附件" name="7">-->
                    <!--&lt;!&ndash; 内部 &ndash;&gt;-->
                    <!--<common-type-upload-->
                            <!--:uploadParams="uploadParamsOne"-->
                            <!--@getUploadTable="getUploadTable"-->
                            <!--:attachedTable="attachedTable"-->
                    <!--/>-->
                    <!--<common-upload-->
                            <!--v-on:get-file-list="getFileList"-->
                            <!--:upload-params="uploadParams"-->
                            <!--:show-attached-list="showAttachedList"-->
                            <!--:isShowDownload="$route.query.type==='add'||$route.query.type==='edit'"-->
                            <!--:urlList="urlList"-->
                    <!--/>-->
                <!--</el-tab-pane>-->

            </el-tabs>
        </div>

    </el-card>
</template>

<script>
    import {
        getProDetail
    } from "@/service/approval";
    import BasicInformation from "./BasicInformation"; // 基本信息
    import Participant from "./Participant"; // 参与人员
    //import ProjectBackground from "./ProjectBackground"; // 项目背景
    import ContentTarget from "./ContentTarget"; // 内容与目标
    import FundsBudget from "./FundsBudget"; // 经费及预算
    //import RelatedUnits from "./RelatedUnits"; // 相关单位
    import Achievement from "./Achievement";
    import Documents from "./Documents";
    export default {
        name: "viewData",
        data() {
            return {
                loadingSubmit: false,
                loadingSave: false,
                processParam: {},
                base: {},
                baseObj: {}, // base
                memberList: [], // 参与人员
                companyList: [], // 相关单位
                acceptLists: [], // 项目验收指标
                mileLists: [], // 年度计划节点
                nodeLists: [], //里程碑
                activeName: "1",
                attachedList: [],
                approve: [],
                uploadParams: {
                    bizType: "项目立项", //业务分类
                    bizTypeCode: "2013102" //业务类型编码
                },
                uploadParamsOne: {
                    code: "", //业务类型编码
                    requiredCode: ""
                },
                uploadTableData: [], // 内部必传附件
                attachedTable: [], // 内部必传附件
                showAttachedList: [],
                selectRows: [], // 审批列表
                urlList: [
                    {
                        name: "开放基金任务书（合同）-模板 2020.doc",
                        url: "/static/excel/开放基金任务书（合同）-模板 2020.doc"
                    },
                    {
                        name: "立项模板---内部研发项目.docx",
                        url: "/static/excel/立项模板---内部研发项目.docx"
                    }
                ]
            };
        },
        components: {
            BasicInformation,
            Participant,
            //ProjectBackground,
            ContentTarget,
            FundsBudget,
            Achievement,
            Documents,
            //RelatedUnits,
        },
        mounted() {
            if (this.$route.query.type !== "add") {
                this.$nextTick(() => {
                    this.getProDetail();
                });
            }
        },
        methods:{
            /**
             * 获取立项详情页接口数据
             */
            async getProDetail() {
                const { id, type } = this.$route.query;
                const { code, data } = await getProDetail({ id: this.$route.query.id });
                if (code === 1) {
                    this.$nextTick(() => {
                        // 详情，审批，已审批得时候
                        if (
                            type === "view" ||
                            type === "auditing" ||
                            data?.base?.statusCode === "2005104"
                        ) {
                            this.processParam = { bizId: id };
                        }
                        this.uploadParamsOne = {
                            code: "2100600", //业务类型编码
                            requiredCode:
                                "CONFIRM_PROJECT_TYPE" + "_" + data.base.projectTypeCode,
                            type: "edit"
                        };
                        this.showAttachedList = data.attachedList || [];
                        this.attachedList = data.attachedList || []; //相关附件
                        this.selectRows = data.approve || []; // 审批列表
                        this.memberList =
                            (data.memberList &&
                                data.memberList.map(item => {
                                    item.uuid = this.$uuid();
                                    return item;
                                })) ||
                            []; // 参与人员
                        this.companyList = data.companyList || []; // 相关单位
                        this.baseObj = data.base; // 基本信息
                        this.acceptLists = data.acceptList || []; // 项目验收指标
                        this.mileLists = data.mileList || []; // 年度计划
                        this.nodeLists = data.nodeList || []; //里程碑
                        this.attachedTable = data.attachedTable || [];
                        this.loadingSave = false;
                        this.loadingSubmit = false;
                    });
                } else {
                    this.loadingSave = false;
                    this.loadingSubmit = false;
                }
            },
            handleClick() {
                let startDate = this.$refs.infor.searchFormModel.getValue("startDate");
                let endDate = this.$refs.infor.searchFormModel.getValue("endDate");
                if (startDate && endDate) {
                    let dateList = [startDate, endDate];
                    this.$store.dispatch("setDateList", dateList);
                } else if (startDate) {
                    this.$store.dispatch("setDateList", [startDate, ""]);
                } else if (endDate) {
                    this.$store.dispatch("setDateList", ["", endDate]);
                } else {
                    this.$store.dispatch("setDateList", []);
                }
            }
        }
    }
</script>

<style scoped>

</style>