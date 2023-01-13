// import { checkEmail } from "@/utils/tools";
/**
 * 新增和编辑数据表单
 */
export const addFormRule = [
    {
        "type": "input", "field": "customerName", "title": "单位名称", "value": "",
        props: {
            placeholder: "请输入",
        },
        col: {
            span: 12,
            labelWidth: '100px'
        },
        validate: [{required: true, message: '请输入单位名称', trigger: 'blur'},]
    },
    {
        "type": "commonSelect", "field": "type", "title": "单位类型", "value": "",
        props: {
            placeholder: "请选择",
            typeName: "COMPANY_TYPE",
            field: "type"
        },
        class: 'w-100',
        col: {
            span: 12,
            labelWidth: '100px'
        },
        options: [],
        validate: [{required: true, message: '请选择单位类型', trigger: 'blur'},]
    },
    {
        "type": "commonSelect", "field": "customerNature", "title": "单位性质", "value": "",
        props: {
            placeholder: "请选择",
            typeName: "UNIT_PROPERTY",
            field: "customerNature"
        },
        class: 'w-100',
        col: {
            span: 12,
            labelWidth: '100px'
        },
        options: [],
        validate: [{required: true, message: '请选择单位性质', trigger: 'blur'},]
    },
    {
        "type": "input", "field": "organizationCode", "title": "组织代码", "value": "",
        props: {
            placeholder: "请输入",
        },
        col: {
            span: 12,
            labelWidth: '100px'
        },
        validate: [{required: true, message: '请输入组织代码', trigger: 'blur'},]
    },
    {
        "type": "input", "field": "contacts", "title": "联系人", "value": "",
        props: {
            placeholder: "请输入",
        },
        col: {
            span: 12,
            labelWidth: '100px'
        },
        // validate: [{required: true, message: '请输入联系人', trigger: 'blur'},]
    },
    {
        "type": "input", "field": "telephone", "title": "电话", "value": "",
        props: {
            placeholder: "请输入",
        },
        col: {
            span: 12,
            labelWidth: '100px'
        },
        // validate: [
        //   {required: true, message: '请输入电话', trigger: 'blur'},
        //     // {
        //     //     trigger: 'blur',
        //     //     validator: (rule, value, callback)=>checkPhone(rule, value, callback)
        //     // }
        // ]

    },
    {
        "type": "input", "field": "email", "title": "邮箱", "value": "",
        props: {
            placeholder: "请输入",
        },
        col: {
            span: 12,
            labelWidth: '100px'
        },
        // validate: [
        //     {required: true, message: '请输入邮箱', trigger: 'blur'},
        //     // {
        //     //     trigger: 'blur',
        //     //     validator: (rule, value, callback) => checkEmail(rule, value, callback)
        //     // }
        // ]
    }
]