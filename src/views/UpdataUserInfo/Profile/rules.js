/**
 * 查询数据表单
 */

/* eslint-disable */
import {getAvatarUploadUrl} from "@/service/common";
/**
 * 新增和编辑数据表单
 */
export const addFormRule=
     [
        {
            type: "upload",
            field: "avatarUri",
            title: "头像",
            value: '',
            props: {
                "type":"select",
                "uploadType":"image",
                "action": getAvatarUploadUrl,
                "name":"upfile",
                "multiple": false,
                "accept":"image\/*",
                "format":["jpg","jpeg","png","gif"],
                "limit": 1,
                data:{
                    bizType: "用户头像", //业务分类
                    bizTypeCode: "2013100" //业务类型编码
                }
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
            }
        },
        {
            "type": "input", "field": "alias", "title": "姓名", "value": "",
            props: {
                placeholder: "请输入姓名",
            },
            col: {
                // span: 8,
                labelWidth: '100px'
            }
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
        // {
        //     "type": "input", "field": "email", "title": "电子邮件", "value": "",
        //     props: {
        //         placeholder: "请输入电子邮件",
        //     },
        //     col: {
        //         // span: 8,
        //         labelWidth: '100px'
        //     },
        //     validate: [{ required: true, message: '请输入电子邮件', trigger: 'blur' },]
        // },
        {
            "type": "input", "field": "company", "title": "单位", "value": "",
            props: {
                placeholder: "请输入单位名称",
            },
            col: {
                // span: 8,
                labelWidth: '100px'
            },
            validate: [{ required: true, message: '请输单位名称', trigger: 'blur' }]

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

