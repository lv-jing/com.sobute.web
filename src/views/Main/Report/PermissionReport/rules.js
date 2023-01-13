/**
 * 查询数据表单
 */

export const searchFormRule= [

        {
            "type": "input", "field": "username", "title": "用户名", "value": "",
            props: {
                placeholder: "请输入用户名",
            },
            col: {
                span: 8,
                labelWidth: '100px'
            }
        },
        {
            "type": "input", "field": "name", "title": "权限", "value": "",
            props: {
                placeholder: "请输入权限",
            },
            col: {
                span: 8,
                labelWidth: '100px'
            },

        },
        {
            "type": "select", "field": "confined", "title": "受限", "value": "",
            props: {
                placeholder: "请选择是否受限",
            },
            col: {
                span: 8,
                labelWidth: '100px'
            },
            options: [
                { "value": '', "label": "全部" },
                { "value": 0, "label": "否" },
                { "value": 1, "label": "是", },
            ],

        },
        {
            "type": "select", "field": "type", "title": "类型", "value": "",
            props: {
                placeholder: "请输入选择",
            },
            class: 'w-100',
            options: [
                { "value": '', "label": "全部" },
                { "value": 0, "label": "内部" },
                { "value": 1, "label": "外部", },
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
            class: 'tr'
        },

    ];

