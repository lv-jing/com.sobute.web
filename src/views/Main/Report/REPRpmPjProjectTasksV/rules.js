/**
 * 查询数据表单
 */

/* eslint-disable */



/**
 * 查询数据表单
 */
import Cookies from 'js-cookie'
/* eslint-disable */


const userProfile = Cookies.getJSON("userInfo");
export const searchFormRule = [

    {
        "type": "input", "field": "projectNumber", "title": "项目编号", "value": "",
        props: {
            placeholder: "项目编号",
        },
        col: {
            span: 8,
            labelWidth: '100px'
        }
    },
    {
        "type": "input", "field": "projectName", "title": "项目名称", "value": "",
        props: {
            placeholder: "项目名称",
        },
        col: {
            span: 8,
            labelWidth: '100px'
        }
    },
    {
        "type": "commonSelect", "field": "statusCode", "title": "状态", "value": "",
        props: {
            placeholder: "请选择",
            typeName: 'PROJECT_STATUS',
            isSplicing: false,
            field: 'statusCode',
        },
        class: 'w-100',
        options: [],
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
                span: 12,
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
                span: 12,
                labelWidth: '100px'
            },
            emit: [{ name: 'click', inject: true }],
            emitPrefix: 'form-reset',
        }],
        col: {
            span: 16,
            labelWidth: '100px'
        },
        class: 'tr',
    },
]


