/**
 * 查询数据表单
 */

/* eslint-disable */
export const searchFormRule=[
        {
            "type": "input", "field": "paramKey", "title": "参数key", "value": "",
            props: {
                placeholder: "请输入参数key",
            },
            col: {
                span: 8,
                labelWidth: '100px'
            }
        },
        {
            "type": "input", "field": "type", "title": "参数类型", "value": "",
            props: {
                placeholder: "请输入参数类型",
            },
            col: {
                span: 8,
                labelWidth: '100px'
            },

        },
        {
            "type": "input", "field": "typeCode", "title": "类型编码", "value": "",
            props: {
                placeholder: "请输入参数类型",
            },
            col: {
                span: 8,
                labelWidth: '100px'
            },

        },
        {
            "type": "input", "field": "remarks", "title": "备注", "value": "",
            props: {
                placeholder: "请输入参数描述",
            },
            col: {
                span: 8,
                labelWidth: '100px'
            },

        },

        {
            "type": "select", "field": "status", "title": "状态", "value": "",
            props: {
                placeholder: "请输入选择",
            },
            class: 'w-100',
            options: [
                { "value": '', "label": "全部" },
                { "value": 0, "label": "停用" },
                { "value": 1, "label": "启用", },
            ],
            col: {
                span: 8,
                labelWidth: '100px'
            },

        },
        {
            "type": "el-col",
            children: [{
                "type": "el-button", "title": "", name: "btn",
                props: {
                    type: 'primary',
                    icon: 'iconfont sbt_search'
                },
                children: ['查询'],
                col: {
                    span: 4,
                    labelWidth: '100px'
                },
                emit: [{ name: 'click', inject: true }],
                emitPrefix: 'form-search',
            }, {
                "type": "el-button", "title": "", name: "btn",
                props: {
                    type: 'default',
                    icon:'iconfont sbt_reset'
                },
                children: ['重置'],
                col: {
                    span: 4,
                    labelWidth: '100px'
                },
                emit: [{ name: 'click', inject: true }],
                emitPrefix: 'form-reset',
            }],
            col: {
                span: 8,
                labelWidth: '100px'
            },
            class: 'tr',
        },

    ]
/**
 * 新增和编辑数据表单
 */
export const addFormRule= [
        {
            "type": "input", "field": "paramKey", "title": "参数key", "value": "",
            props: {
                placeholder: "请输入参数key",
            },
            col: {
                // span: 8,
                labelWidth: '100px'
            },
            validate: [{ required: true, message: '请输入参数key', trigger: 'blur' },]
        },
        {
            "type": "input", "field": "paramValue", "title": "参数值", "value": "",
            props: {
                placeholder: "请输入参数值",
            },
            col: {
                // span: 8,
                labelWidth: '100px'
            }
        },
        {
            "type": "select", "field": "type", "title": "参数类型", "value": "",
            props: {
                placeholder: "请输入参数类型",
            },
            class: 'w-100',
            col: {
                // span: 8,
                labelWidth: '100px'
            },
            validate: [{ required: true, message: '请输入参数类型', trigger: 'blur' },]
        },
        {
            "type": "input", "field": "typeCode", "title": "类型编码", "value": "",
            props: {
                placeholder: "请输入参数类型编码",
            },
            col: {
                // span: 18,
                labelWidth: '100px'
            },
            validate: [{ required: true, message: '请输入参数类型编码', trigger: 'blur' },]
        },
        {
            "type": "select", "field": "status", "title": "状态", "value": 1,
            props: {
                placeholder: "请输入选择",
            },
            class: 'w-100',
            options: [
                { "value": 0, "label": "停用" },
                { "value": 1, "label": "启用", },
            ],
            col: {
                // span: 8,
                labelWidth: '100px'
            },

        },
        {
            "type": "input", "field": "remarks", "title": "备注", "value": "",
            props: {
                type: 'textarea',
                placeholder: "请输入备注",
                maxlength: 1333,
                showWordLimit:true
            },
            class: 'w-100',

            col: {
                // span: 8,
                labelWidth: '100px'
            },

        },

    ]
