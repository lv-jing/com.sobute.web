/**
 * 查询数据表单
 */

/* eslint-disable */
import {getAvatarUploadUrl} from "@/service/common";
/**
 * 新增和编辑数据表单
 */
export function addFormRule(_this) {
    return [
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
                maxlength:32
            },
            col: {
                // span: 8,
                labelWidth: '100px'
            },
            validate: [{ required: true, message: '请输入用户名', trigger: 'blur' },
            { required: true, pattern:/^[a-zA-Z0-9_-]{0,32}$/, message: '输入的用户名存在特殊字符,仅包含数字、字母、下划线、短横线', trigger: 'blur' }
        ]
        },
        {
            "type": "input", "field": "password", "title": "密码", "value": "",
            props: {
                placeholder: "请输入密码",
                type:'password',
                maxlength:20
            },
            col: {
                // span: 8,
                labelWidth: '100px'
            },
            validate: [{ required: true,pattern:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, message: '请输入6-20位数字和字母组成的密码', trigger: 'blur' },
            { required: true, validator: _this.validatePass, trigger: "blur" }
        ]
        },
        {
            "type": "input", "field": "checkPassword", "title": "确认密码", "value": "",
            props: {
                placeholder: "请确认密码",
                type:'password',
                maxlength:20
            },
            col: {
                // span: 8,
                labelWidth: '100px'
            },
            validate: [{ required: true, message: '请输入密码', trigger: 'blur' },
            { required: true, validator: _this.validatePass2, trigger: "blur" }
        ]
        },
        {
            "type": "input", "field": "alias", "title": "姓名", "value": "",
            props: {
                placeholder: "请输入姓名",
            },
            col: {
                // span: 8,
                labelWidth: '100px'
            },
            validate: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
        },
        {
            "type": "input", "field": "idCard", "title": "身份证号", "value": "",
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
                {  required: true,validator: _this.idCardValidator, trigger: 'blur' },
                //  { required: true, pattern:/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,message: '请输入15位或者18位身份证号码', trigger: 'blur' }
            ]
        },
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
}
