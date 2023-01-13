/**
 * 查询数据表单
 */

/* eslint-disable */
export const searchFormRule= [
        {
            "type": "input", "field": "fileName", "title": "文件名称", "value": "",
            props: {
                placeholder: "请输入"
            },
            col: {
                span: 8,
                labelWidth: '110px'
            }
        },
        {
            "type": "el-col",
            class:'tr',
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
            }
        },
    ]