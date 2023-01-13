/**
 * 查询数据表单
 */

export const searchFormRule= [

        {
            "type": "input", "field": "documentNumber", "title": "成果入库单号", "value": "",
            props: {
                placeholder: "请输入成果入库单号",
            },
            col: {
                span: 8,
                labelWidth: '100px'
            }
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

