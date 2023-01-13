/**
 * 查询数据表单
 */

/* eslint-disable */
/**
 * 新增和编辑数据表单
 */
export const addFormRule = [
    {
        "type": "commonSelect", "field": "accountName", "title": "类型", "value": "",
        props: {
            placeholder: "请选择",
            typeName: "FUNDS_TYPE",
            field: "accountName"
        },
        col: {
            // span: 8,
            labelWidth: '100px'
        },
        class: 'w-100',
        options: [],
        validate: [{required: true, message: '请选择类型', trigger: 'blur'},]
    },
    {
        "type": "DatePicker", "field": "year", "title": "年份", "value": "",
        props: {
            type: 'year',
            placeholder: "请选择年份",
        },
        class: 'w-100',
        col: {
            // span: 8,
            labelWidth: '100px'
        },
        validate: [{required: true, message: '请选择类型', trigger: 'blur'},]
    },
    {
        "type": "input", "field": "amount", "title": "金额(万元)", "value": "",
        props: {
            type: 'number',
            placeholder: "请输入",
        },
        col: {
            // span: 8,
            labelWidth: '100px'
        },
        validate: [{required: true, message: '请选择类型', trigger: 'blur'},]
    },
    {
        "type": "input", "field": "comments", "title": "备注", "value": "",
        props: {
            placeholder: "请输入",
            type: "textarea",
            autosize:{ minRows: 3},
            maxlength: 1333,
            showWordLimit:true
        },
        class: 'w-100',
        col: {
            // span: 18,
            labelWidth: '100px'
        },
    }
]
export const addFormRule1 = [
    {
        "type": "commonSelect", "field": "accountName", "title": "类型", "value": "",
        props: {
            placeholder: "请选择",
            typeName: "BUDGET_TYPE",
            field: "accountName"
        },
        col: {
            // span: 8,
            labelWidth: '100px'
        },
        class: 'w-100',
        options: [],
        validate: [{required: true, message: '请选择类型', trigger: 'blur'},]
    },
    {
        "type": "DatePicker", "field": "year", "title": "年份", "value": "",
        props: {
            type: 'year',
            placeholder: "请选择年份",
        },
        class: 'w-100',
        col: {
            // span: 8,
            labelWidth: '100px'
        },
        validate: [{required: true, message: '请选择年份', trigger: 'blur'},]
    },
    {
        "type": "input", "field": "amount", "title": "金额(万元)", "value": "",
        props: {
            type: 'number',
            placeholder: "请输入",
        },
        col: {
            // span: 8,
            labelWidth: '100px'
        },
        validate: [{required: true, message: '请输入金额', trigger: 'blur'},]
    },
    {
        "type": "input", "field": "comments", "title": "备注", "value": "",
        props: {
            placeholder: "请输入",
            type: "textarea",
            autosize:{ minRows: 3},
            maxlength: 1333,
            showWordLimit:true
        },
        class: 'w-100',
        col: {
            // span: 18,
            labelWidth: '100px'
        },
    }
]