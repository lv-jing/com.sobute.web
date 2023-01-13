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
        "type": "input", "field": "documentNumber", "title": "变更单号", "value": "",
        props: {
            placeholder: "变更单号",
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
            typeName: 'CHANGE_STATUS',
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
        "type": "commonSelect", "field": "typeCode", "title": "变更类型", "value": "",
        props: {
            placeholder: "请选择",
            typeName: 'PG_CHANGE_TYPE',
            isSplicing: false,
            field: 'typeCode',
        },
        class: 'w-100',
        options: [],
        col: {
            span: 8,
            labelWidth: '100px'
        },

    },
    {
        "type": "input", "field": "subject", "title": "主题", "value": "",
        props: {
            placeholder: "变更主题",
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


export const addFormRule = [
    {
        type: 'common-title',
        name: 'title',
        props: {
            title: '项目变更信息'
        },
    },
    {
        "type": "input", "field": "documentNumber", "title": "变更单号", "value": "",
        props: {
            placeholder: "变更单号",
            disabled: true
        },
        col: {
            span: 8,
            labelWidth: '100px'
        }
    },
    {
        "type": "commonSingleSelect", "field": "sourceFullName", "title": "项目名称", "value": "",
        props: {
          placeholder: "请选择",
          filterable: true,
          transform: ["sourceName", "sourceNum", "sourceId"],
          request: {
            interfaceName: 'service/project/changes-source/list',
            method: 'get',
            params: {
              params: {
                pageNum: 1,
                pageSize: -1
              }
            }
          }
        },
        col: {
          span: 8,
          labelWidth: '130px'
        },
        options: [],
        class: 'w-100',
        validate: [{ required: true, message: '请选择项目名称', whitespace: true, trigger: 'blur' },]

      },
    {
        "type": "commonSelect", "field": "typeCode", "title": "变更类型", "value": "",
        props: {
            placeholder: "请选择",
            typeName: 'PG_CHANGE_TYPE',
            field: 'typeCode',
        },
        class: 'w-100',
        options: [],
        col: {
            span: 8,
            labelWidth: '100px'
        },
        validate: [{ required: true, message: '变更类型不能为空', whitespace: true, trigger: 'blur' },]
    },
    {
        "type": "input", "field": "subject", "title": "主题", "value": "",
        class: 'w-100',
        props: {
            placeholder: "请输入",
        },
        col: {
            span: 8,
            labelWidth: '100px'
        },
        validate: [{ required: true, message: '主题不能为空', whitespace: true, trigger: 'blur' },]

    },
    {
        type: 'common-title',
        name: 'title',
        props: {
            title: '变更内容及原因说明'
        },
    },
    {
        "type": (userProfile.type === 1 ? 'hidden' : 'input'), "field": "content", "title": "", "value": "",
        props: {
            type: 'textarea',
            placeholder: "说明变更原因，原内容及变更后内容",
            rows: 10,
            maxlength: 1330

        },
        col: {
            span: 24,
            labelWidth: '0px'
        }
    },
]

