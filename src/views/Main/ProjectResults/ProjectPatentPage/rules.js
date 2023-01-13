/**
 * 查询数据表单
 */

/* eslint-disable */
/**
 * 新增和编辑数据表单
 */
export const addFormRule=(type) => [
    {
        type: 'common-title',
        name: 'title',
        props: {
            title: '基本信息'
        },
    },
    {
        "type": "input", "field": "documentNumber", "title": "入库单号", "value": "",
        props: {
            placeholder: "请输入",
            disabled: true
        },
        col: {
            span: 8,
            labelWidth: '110px'
        }
    },
    {
        "type": "input", "field": "name", "title": "专利名称", "value": "",
        props: {
            placeholder: "请输入"
        },
        col: {
            span: 8,
            labelWidth: '110px'
        },
        validate: [{ required: true, message: '请输入专利名称', trigger: 'blur' },]
    },
    {
        "type": "input", "field": "doi", "title": "申请号", "value": "",
        props: {
            placeholder: "请输入"
        },
        col: {
            span: 8,
            labelWidth: '110px'
        },
        validate: [{ required: true, message: '请输入申请号', trigger: 'blur' },]
    },
    {
        "type": "DatePicker", "field": "confirmDate", "title": "申请日", "value": "",
        props: {
            placeholder: "请选择申请日"
        },
        col: {
            span: 8,
            labelWidth: '110px'
        },
        class: "w-100",
        validate: [{ required: true, message: '请输入申请日', trigger: 'blur' },]
    },
    {
        "type": "commonSelect", "field": "employ", "title": "申请类型", "value": "",
        props: {
            placeholder: "请选择申请类型",
            typeName: "APPLICATION_TYPE",
            field: "employ",
            size: 'default',
        },
        col: {
            span: 8,
            labelWidth: '110px'
        },
        class: 'w-100',
        options: [],
        validate: [{ required: true, message: '请选择申请类型', trigger: 'blur' },]
    },
    {
        "type": "input", "field": "source", "title": "申请国家/地区", "value": "",
        props: {
            placeholder: "请输入"
        },
        col: {
            span: 8,
            labelWidth: '110px'
        }
    },
    {
        "type": "input", "field": "organization", "title": "发明人", "value": "",
        props: {
            placeholder: "请输入"
        },
        col: {
            span: 8,
            labelWidth: '110px'
        }
    },
    {
        "type": "input", "field": "author", "title": "申请人", "value": "",
        props: {
            placeholder: "请输入"
        },
        col: {
            span: 8,
            labelWidth: '110px'
        }
    },
    
    // {
    //     "type": "commonAuto", "field": "organization", "title": "发明人", "value": '',
    //     props: {
    //         placeholder: "发明人",
    //         multiple: true,
    //         filterable: true,
    //         collapseTags: false,
    //         field: 'organization',
    //         remote: true,
    //     },
    //     col: {
    //         span: 8,
    //         labelWidth: '110px'
    //     },
    //     class: 'w-100',
    //     validate: [{required: true, message: '发明人不能为空', trigger: 'blur'},]
    // },
    // {
    //     "type": "commonSelect", "field": "author", "title": "申请人", "value": "",
    //     props: {
    //         placeholder: "请选择",
    //         typeName: "APPLY_PARTY",
    //         field: "author",
    //         multiple: true,
    //         size: 'default'
    //     },
    //     col: {
    //         span: 8,
    //         labelWidth: '110px'
    //     },
    //     class: 'w-100',
    //     options: [],
    //     validate: [{required: true, message: '请选择申请人', trigger: 'blur'},]
    // },
    {
        "type": "input", "field": "certificate", "title": "授权公告号", "value": "",
        props: {
            placeholder: "请输入"
        },
        col: {
            span: 8,
            labelWidth: '110px'
        },
        // validate: [{ required: true, message: '请输入申请号', trigger: 'blur' },]
    },
    {
        "type": "DatePicker", "field": "applyDate", "title": "授权公告日", "value": "",
        props: {
            placeholder: "请选择授权公告日"
        },
        col: {
            span: 8,
            labelWidth: '110px'
        },
        class: "w-100",
        // validate: [{ required: true, message: '请输入授权公告日', trigger: 'blur' },]
    },
    {
        "type": "commonSelect", "field": "register", "title": "法律状态", "value": "",
        props: {
            placeholder: "请选择",
            typeName: "LEGAL_STATUS",
            field: "register",
            size: 'default'
        },
        col: {
            span: 8,
            labelWidth: '110px'
        },
        class: 'w-100',
        options: [],
        validate: [{required: true, message: '请选择法律状态', trigger: 'blur'},]
    },
    // {
    //     "type": "commonSingleSelect", "field": "projectList", "title": "关联外部项目", "value": [],
    //     props: {
    //         placeholder: "请选择",
    //         filterable: true,
    //         multiple: true,
    //         transform: ["projectName", "projectNumber", "id"],
    //         request: {
    //             interfaceName:type==0?'/service/project/confirm/checkbox':'/service/project/confirm/list',
    //             method: 'get',
    //             params: {
    //                 params: {
    //                     // projectNumberPrefix:'PM1,PM2',
    //                     statusCode: 2005104,
    //                     projectNumber:type==0?'PM2':'PM3',
    //                     pageNum: 1,
    //                     pageSize: -1
    //                 }
    //             }
    //         }
    //     },
    //     col: {
    //         span: 8,
    //         labelWidth: '100px'
    //     },
    //     options: [],
    //     class: 'w-100',
    // },
    // {
    //     "type":type==0?"commonSingleSelect":"hidden", "field": "projectInString", "title": "关联内部项目", "value": "",
    //     props: {
    //         placeholder: "请选择",
    //         filterable: true,
    //         transform: ["projectName", "projectNumber", "id"],
    //         request: {
    //             interfaceName: '/service/project/confirm/list',
    //             method: 'get',
    //             params: {
    //                 params: {
    //                     statusCode: 2005104,
    //                     projectNumber:'PM1',
    //                     pageNum: 1,
    //                     pageSize: -1
    //                 }
    //             }
    //         }
    //     },
    //     col: {
    //         span: 8,
    //         labelWidth: '100px'
    //     },
    //     options: [],
    //     class: 'w-100',
    // },
    {
        "type": "input", "field": "party", "title": "代理机构", "value": "",
        props: {
            placeholder: "请输入代理机构"
        },
        col: {
            span: 8,
            labelWidth: '110px'
        },
    },
    {
        "type": "input", "field": "description", "title": "备注", "value": "",
        props: {
            placeholder: "请输入",
            type: "textarea",
            autosize:{ minRows: 2},
            showWordLimit: true,
            maxlength: 1333
        },
        col: {
            span: 24,
            labelWidth: '110px'
        }
    },
    {
        "type": "input", "field": "comments", "title": "摘要", "value": "",
        props: {
            placeholder: "请输入",
            type: "textarea",
            autosize:{ minRows: 3},
            showWordLimit: true,
            maxlength: 1333
        },
        col: {
            span: 24,
            labelWidth: '110px'
        }
    },
    // {
    //     "type": "common-cascader",
    //     "field": "keyWordsList",
    //     "title": "技术关键词",
    //     "value": [],
    //     class: 'w-100',
    //     props: {
    //       placeholder: "请选择",
    //       typeName: "KEY_WORDS",
    //       "field": "keyWordsList",
    //       multiple: true,
    //       checkStrictly:true
    //     },
    //     col: {
    //       span: 24,
    //       labelWidth: '100px'
    //     },
    //     options: [],
    //     // validate: [{ required: true, message: '请选择项目来源', whitespace: true, trigger: 'blur' },]
    //   },
]