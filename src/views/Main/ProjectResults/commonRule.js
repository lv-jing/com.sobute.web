
export const commonRule = (type, width = 100) => [{
    "type": type == 1 ? 'hidden' : "commonSelect",
    "field": 'fieldList',
    "title": `研究方向`,
    "value": [],
    class: 'w-100',
    props: {
        placeholder: "请选择",
        typeName: 'PROJECT_DIRECTION',
        multiple: true,

    },
    col: {
        span: 12,
        labelWidth: `${width}px`
    },
    options: [],
    // validate: [{ required: true, message: '请选择研究方向', trigger: 'blur' },]

}, {
    "type": "commonSingleSelect", "field": "projectList", "title": "关联外部项目", "value": [],
    props: {
        placeholder: "请选择",
        filterable: true,
        multiple: true,
        transform: ["projectName", "projectNumber", "id"],
        request: {
            interfaceName: type == 0 ? '/service/project/confirm/checkbox' : '/service/project/confirm/list',
            method: 'get',
            params: {
                params: {
                    // projectNumberPrefix:'PM1,PM2',
                    statusCode: 2005104,
                    projectNumber: type == 0 ? 'PM2' : 'PM3',
                    pageNum: 1,
                    pageSize: -1
                }
            }
        }
    },
    col: {
        span: 12,
        labelWidth: `${width}px`
    },
    options: [],
    class: 'w-100',
},
{
    "type": type == 0 ? "commonSingleSelect" : "hidden", "field": "projectInString", "title": "关联内部项目", "value": "",
    props: {
        placeholder: "请选择",
        filterable: true,
        transform: ["projectName", "projectNumber", "id"],
        request: {
            interfaceName: '/service/project/confirm/list',
            method: 'get',
            params: {
                params: {
                    statusCode: 2005104,
                    projectNumber: 'PM1',
                    pageNum: 1,
                    pageSize: -1
                }
            }
        }
    },
    col: {
        span: 12,
        labelWidth: `${width}px`
    },
    options: [],
    class: 'w-100',
    // validate: [{required: true, message: '请选择关联内部项目', trigger: 'blur'},]

},
{
    "type": type == 0 ? "common-cascader" : "hidden",
    "field": "keyWordsList",
    "title": "技术关键词",
    "value": [],
    class: 'w-100',
    props: {
        placeholder: "请选择",
        typeName: "KEY_WORDS",
        "field": "keyWordsList",
        multiple: true,
        checkStrictly: true
    },
    col: {
        span: 12,
        labelWidth: `${width}px`
    },
    options: [],
}, {
    "type": type == 1 ? 'hidden' : "common-cascader",
    "field": "keyWordsProList",
    "title": "产品关键词",
    "value": [],
    class: 'w-100',
    props: {
        placeholder: "请选择",
        typeName: "PRODUCT_CLASSIFICATION",
        "field": "keyWordsProList",
        multiple: true,
        checkStrictly: true
    },
    col: {
        span: 12,
        labelWidth: `${width}px`
    },
    options: [],
},]