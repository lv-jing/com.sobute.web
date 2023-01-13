/**
 * 查询数据表单
 */

/* eslint-disable */
export const searchFormRule= [
       
        {
            "type": "input", "field": "nameEn", "title": "角色英文名", "value": "",
            props: {
                placeholder: "请输入角色英文名",
            },
            col: {
                span: 8,
                labelWidth: '100px'
            },

        },
        {
            "type": "input", "field": "name", "title": "角色名", "value": "",
            props: {
                placeholder: "请输入昵称",
            },
            col: {
                span: 8,
                labelWidth: '100px'
            }
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
            "type": "input", "field": "remarks", "title": "备注", "value": "",
            props: {
                placeholder: "请输入描述",
            },
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
                emit:[{name:'click',inject:true}],
                emitPrefix:'form-search',
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
                emit:[{name:'click',inject:true}],
                emitPrefix:'form-reset',
            }],
            col: {
                span: 16,
                labelWidth: '100px'
            },
            class:'tr',
        },

    ]
/**
 * 新增和编辑数据表单
 */
export const addFormRule=[
            {
                "type": "input", "field": "nameEn", "title": "角色英文名", "value": "",
                props: {
                    placeholder: "请输入角色英文名",
                },
                col: {
                    // span: 8,
                    labelWidth: '100px'
                },
                validate: [{ required: true, message: '请输入角色英文名', trigger: 'blur' },]
            },
            {
                "type": "input", "field": "name", "title": "角色名", "value": "",
                props: {
                    placeholder: "请输入角色名",
                },
                col: {
                    // span: 8,
                    labelWidth: '100px'
                },
                validate: [{ required: true, message: '请输入用户名', trigger: 'blur' },]
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
