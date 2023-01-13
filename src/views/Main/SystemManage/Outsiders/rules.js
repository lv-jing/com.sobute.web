/**
 * 查询数据表单
 */

/* eslint-disable */
import moment from 'moment';
import { idCardValidator } from '@/utils/tools'
export const searchFormRule = [

    {
        "type": "input", "field": "empolyeeName", "title": "员工姓名", "value": "",
        props: {
            placeholder: "请输入员工姓名",
        },
        col: {
            span: 8,
            labelWidth: '100px'
        },

    },
    {
        "type": "input", "field": "telephone", "title": "手机号码", "value": "",
        props: {
            placeholder: "请输入手机号码",
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
            span: 24,
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
        "type": "input", "field": "id", "title": "序号", "value": "",
        props: {
            disabled:true
        },
        col: {
            labelWidth: '100px'
        },
    },
    {
        "type": "input", "field": "empolyeeName", "title": "员工姓名", "value": "",
        props: {
            placeholder: "请输入员工姓名",
            disabled:true
        },
        col: {
            // span: 8,
            labelWidth: '100px'
        },
        validate: [{ required: true, message: '请输入员工姓名', trigger: 'blur' },]
    },
    {
        "type": "input", "field": "telephone", "title": "手机号码", "value": "",
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
        "type": "radio", "field": "gender", "title": "性别", "value": 1,
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
    },
    // {
    //     "type": "select", "field": "status", "title": "状态", "value": 1,
    //     props: {
    //         placeholder: "请输入选择",
    //     },
    //     class: 'w-100',
    //     options: [
    //         { "value": 0, "label": "停用" },
    //         { "value": 1, "label": "启用", },
    //     ],
    //     col: {
    //         // span: 8,
    //         labelWidth: '100px'
    //     },
    //
    // },
    {
        "type": "input", "field": "company", "title": "所在单位", "value": "",
        props: {
            placeholder: "请输入所在单位",
        },
        col: {
            // span: 8,
            labelWidth: '100px'
        },
    },
    {
        "type": "input", "field": "title", "title": "职称", "value": "",
        props: {
            placeholder: "请输入职称",
        },
        col: {
            // span: 8,
            labelWidth: '100px'
        },
    },
    {
        "type": "input", "field": "position", "title": "职务", "value": "",
        props: {
            placeholder: "请输入职务",
        },
        col: {
            // span: 8,
            labelWidth: '100px'
        },
    },
    {
        "type": "input", "field": "major", "title": "从事专业", "value": "",
        props: {
            placeholder: "请输入从事专业",
        },
        col: {
            // span: 8,
            labelWidth: '100px'
        },
    },
    {
        "type": "input", "field": "department", "title": "部门", "value": "",
        props: {
            placeholder: "请输入部门",
        },
        col: {
            // span: 8,
            labelWidth: '100px'
        },
    },
    {
        "type": "input", "field": "degree", "title": "学历", "value": "",
        props: {
            placeholder: "请输入学历",
        },
        col: {
            // span: 8,
            labelWidth: '100px'
        },
    },

    // {
    //     type: "DatePicker",
    //     field: "section_day",
    //     title: "有效期",
    //     value: [],
    //     //input值, type为daterange,datetimerange value为数组 [start_value,end_value]
    //     props: {
    //         "type": "daterange",
    //         //显示类型，可选值为 date、daterange、datetime、datetimerange、year、month
    //         "format": "yyyy-MM-dd",
    //         //展示的日期格式
    //         "placement": "bottom-start",
    //         //	日期选择器出现的位置，可选值为toptop-starttop-endbottombottom-startbottom-endleftleft-startleft-endrightright-startright-end
    //         rangeSeparator:"至",
    //         startPlaceholder: "开始日期",
    //         endPlaceholder: "结束日期"
    //
    //     },
    //     class: 'w-100',
    //     col: {
    //         // span: 8,
    //         labelWidth: '100px'
    //     },
    //     validate: [{ required: true, message: '请选择获有效期时间', trigger: 'blur' },]
    // },

]

