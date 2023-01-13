export const allTableList = [{
    title: "费用信息",
    type: "Expense",
    list: [{
        label: '序号',
        type: "index",
        width: 100
    }, {
        label: '缴费类型',
        prop: "type",
    }, {
        label: '缴费金额',
        prop: "amount"
    }, {
        label: '缴费期限',
        prop: "deadline"
    }, {
        label: '缴费状态',
        prop: "status"
    }, {
        label: '缴费日',
        prop: "paymentDate"
    }, {
        label: '缴费主体',
        prop: "entity"
    }],

}, {
    title: "期限信息",

    type: "Allotte",
    list: [{
        label: '序号',
        type: "index",
        width: 100
    }, {
        label: '来文名称',
        prop: "name",
    }, {
        label: '发文日期',
        prop: "documentDate"
    }, {
        label: '待办事项',
        prop: "toDo"
    }, {
        label: '处理期限',
        prop: "deadline"
    }, {
        label: '处理状态',
        prop: "status"
    }, {
        label: '处理人',
        prop: "handler"
    }],

}, {
    title: "转让信息",

    type: "Trans",
    list: [{
        label: '序号',
        type: "index",
        width: 100
    }, {
        label: '出让人',
        prop: "employee",
    }, {
        label: '受让人',
        prop: "personal"
    }, {
        label: '转让生效日',
        prop: "confirmDate"
    }, {
        label: '转让金额',
        prop: "amount"
    }],

}, {
    title: "许可信息",

    type: "Permit",
    list: [{
        label: '序号',
        type: "index",
        width: 100
    }, {
        label: '许可人',
        prop: "employee",
    }, {
        label: '被许可人',
        prop: "personal"
    }, {
        label: '许可类型',
        prop: "permitType"
    }, {
        label: '许可期限',
        prop: "period"
    }, {
        label: '许可合同备案号',
        prop: "sourceNumber"
    }, {
        label: '许可备案日',
        prop: "confirmDate"
    }, {
        label: '许可金额',
        prop: "amount"
    }],

}, {
    title: "质押信息",

    type: "Pledge",
    list: [{
        label: '序号',
        type: "index",
        width: 100
    }, {
        label: '出质人',
        prop: "employee",
    }, {
        label: '质权人',
        prop: "personal"
    }, {
        label: '质押期限',
        prop: "period"
    }, {
        label: '登记号',
        prop: "sourceNumber"
    }, {
        label: '质押登记日',
        prop: "confirmDate"
    }, {
        label: '备案阶段',
        prop: "stage"
    }, {
        label: '质押金额',
        prop: "amount"
    }]
}, {
    type: "Change",
    title: "著录项目变更信息",

    list: [{
        label: '序号',
        type: "index",
        width: 100
    }, {
        label: '变更类型',
        prop: "changeType",
    }, {
        label: '变更前',
        prop: "changeBefore"
    }, {
        label: '变更后',
        prop: "changeAfger"
    }],

},];