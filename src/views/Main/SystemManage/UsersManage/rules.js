/**
 * 查询数据表单
 */

/* eslint-disable */
import moment from 'moment';
import { idCardValidator } from '@/utils/tools'
export const searchFormRule = [

    {
        "type": "input", "field": "alias", "title": "姓名", "value": "",
        props: {
            placeholder: "请输入姓名",
        },
        col: {
            span: 8,
            labelWidth: '100px'
        }
    },
    {
        "type": "input", "field": "username", "title": "用户名", "value": "",
        props: {
            placeholder: "请输入用户名",
        },
        col: {
            span: 8,
            labelWidth: '100px'
        },

    },
    {
        "type": "input", "field": "phone", "title": "手机号码", "value": "",
        props: {
            placeholder: "请输入用户手机号码",
        },
        col: {
            span: 8,
            labelWidth: '100px'
        },

    },
    {
        "type": "input", "field": "email", "title": "电子邮件", "value": "",
        props: {
            placeholder: "请输入电子邮件",
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
                icon: 'iconfont sbt_reset'
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

]

/**
 * 新增和编辑数据表单
 */
export const addFormRule = [
    {
        "type": "select", "field": "roleGuids", "title": "用户角色", "value": '',
        props: {
            placeholder: "请选择角色",
            // multiple: true,
            valueKey: 'guid',
            // collapseTags:true,
        },
        class: 'w-100',
        col: {
            labelWidth: '100px'
        }
    },
  
    {
        "type": "input", "field": "alias", "title": "姓名", "value": "",
        props: {
            placeholder: "请输入姓名",
            disabled:true
        },
        col: {
            // span: 8,
            labelWidth: '100px'
        }
    },
    {
        "type": "input", "field": "username", "title": "用户名", "value": "",
        props: {
            placeholder: "请输入用户名",
            disabled:true
        },
        col: {
            // span: 8,
            labelWidth: '100px'
        },
        validate: [{ required: true, message: '请输入用户名', trigger: 'blur' },]
    },
    {
        "type": "input", "field": "idCard", "title": "身份证号码", "value": "",
        props: {
            placeholder: "请输入身份证号码",
            maxlength: 18,
        },
        col: {
            // span: 8,
            labelWidth: '100px'
        },
        validate: [
            //  { required: true, message: '请输入身份证号码', trigger: 'blur' },
            { required: true, validator: idCardValidator, trigger: 'blur' },
            //  { required: true, pattern:/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,message: '请输入15位或者18位身份证号码', trigger: 'blur' }
        ]
    },
    {
        "type": "input", "field": "phone", "title": "手机号码", "value": "",
        props: {
            placeholder: "请输入用户手机号码",
            maxlength: 11,
        },
        col: {
            // span: 18,
            labelWidth: '100px'
        },

    },
    {
        "type": "radio", "field": "confined", "title": "受限", "value": 1,
        props: {
            placeholder: "请选择",
        },
        options: [
            { "value": 1, "label": "是", },
            { "value": 0, "label": "否", },
        ],
        col: {
            // span: 8,
            labelWidth: '100px'
        },
        validate: [{ required: true, message: '请选择是否受限', trigger: 'blur' },]
    },
    {
        "type": "radio", "field": "type", "title": "类型", "value": 0,
        props: {
            placeholder: "请选择",
            disabled:true
        },
        options: [
            { "value": 0, "label": "内部人员", },
            { "value": 1, "label": "外部人员", },
        ],
        col: {
            // span: 8,
            labelWidth: '100px'
        },

    },
    {
        "type": "radio", "field": "sex", "title": "性别", "value": 1,
        props: {
            placeholder: "请选择",
        },
        options: [
            { "value": 1, "label": "男" },
            { "value": 2, "label": "女", },
            // { "value": 3, "label": "保密", },
        ],
        col: {
            // span: 8,
            labelWidth: '100px'
        },

    },


    {
        "type": "input", "field": "email", "title": "电子邮件", "value": "",
        props: {
            placeholder: "请输入电子邮件",
        },
        col: {
            // span: 8,
            labelWidth: '100px'
        },
        validate: [{ required: true, message: '请输入电子邮件', trigger: 'blur' },]
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
        type: "DatePicker",
        field: "section_day",
        title: "有效期",
        value: [],
        //input值, type为daterange,datetimerange value为数组 [start_value,end_value]
        props: {
            "type": "daterange",
            //显示类型，可选值为 date、daterange、datetime、datetimerange、year、month
            "format": "yyyy-MM-dd",
            //展示的日期格式
            "placement": "bottom-start",
            //	日期选择器出现的位置，可选值为toptop-starttop-endbottombottom-startbottom-endleftleft-startleft-endrightright-startright-end
            rangeSeparator:"至",
            startPlaceholder: "开始日期",
            endPlaceholder: "结束日期"

        },
        class: 'w-100',
        col: {
            // span: 8,
            labelWidth: '100px'
        },
        validate: [{ required: true, message: '请选择获有效期时间', trigger: 'blur' },]
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

