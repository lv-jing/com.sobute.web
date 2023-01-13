/**
 * 查询数据表单
 */

export const searchFormRule= [

        {
            "type": "input", "field": "projectNumber", "title": "项目编号", "value": "",
            props: {
                placeholder: "请输入项目编号",
            },
            col: {
                span: 8,
                labelWidth: '100px'
            }
        },
        {
            "type": "input", "field": "projectName", "title": "项目名称", "value": "",
            props: {
                placeholder: "请输入项目名称",
            },
            col: {
                span: 8,
                labelWidth: '100px'
            }
        },
        {
            "type": "DatePicker", "field": "startDate", "title": "执行开始时间", "value": "",
            props: {
                placeholder: "请输入"
            },
            col: {
                span: 8,
                labelWidth: '100px'
            },
            class: "w-100"
        },
        {
            "type": "DatePicker", "field": "endDate", "title": "执行结束时间", "value": "",
            props: {
                placeholder: "请输入"
            },
            col: {
                span: 8,
                labelWidth: '100px'
            },
            class: "w-100"
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

