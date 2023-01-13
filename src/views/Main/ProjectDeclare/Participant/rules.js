/**
 * 查询数据表单
 */

/* eslint-disable */

/**
 * 新增和编辑数据表单
 */
export function addFormRule(_this){
    return [
        {
            "type": "input", "field": "empolyeeName", "title": "姓名", "value": "",
            props: {
                placeholder: "请输入姓名"
            },
            col: {
                span: 12,
                labelWidth: '100px'
            },
            validate: [{required: true, message: '请输入姓名', trigger: 'blur'},]
        },
        {
            "type": "commonSelect", "field": "role", "title": "项目角色", "value": "",
            props: {
                placeholder: "请选择项目角色",
                typeName: "PROJECT_ROLE",
                field: "role"
            },
            class: 'w-100',
            col: {
                span: 12,
                labelWidth: '100px'
            },
            options: [],
            validate: [{required: true, message: '请选择项目角色', trigger: 'blur'},]
        },
        {
            type: "DatePicker", field: "startDate", title: "开始期限", value: '',
            class: 'w-100',
            props: {
                placeholder: "开始期限",
            },
            col: {
                span: 12,
                labelWidth: '100px'
            },
            validate: [
              {required: true, message: '请输入开始期限', trigger: 'blur'},
                {
                    trigger: 'blur',
                    validator: (rule, value, callback)=>{
                        let time1 = new Date(_this.addEditFormModel.getValue('startDate')).getTime();
                        let time2 = new Date(_this.addEditFormModel.getValue('endDate')).getTime();
                        if(time1-time2>0){
                            callback(new Error('开始日期不能大于结束日期'))
                        } else {
                            callback()
                        }
                    }
                }
              ]
        },
        {
            type: "DatePicker", field: "endDate", title: "结束期限", value: '',
            class: 'w-100',
            props: {
                placeholder: "结束期限",
            },
            col: {
                span: 12,
                labelWidth: '100px'
            },
            validate: [
              {required: true, message: '请输入结束期限', trigger: 'blur'},
                {
                    trigger: 'blur',
                    validator: (rule, value, callback)=>{
                        let time1 = new Date(_this.addEditFormModel.getValue('startDate')).getTime();
                        let time2 = new Date(_this.addEditFormModel.getValue('endDate')).getTime();
                        if(time1-time2>0){
                            callback(new Error('结束日期不能小于开始日期'))
                        } else {
                            callback()
                        }
                    }
                }
            ]
        },
        {
            "type": "input", "field": "telephone", "title": "电话", "value": "",
            props: {
                placeholder: "请输入电话"
            },
            col: {
                span: 12,
                labelWidth: '100px'
            },
            validate: [
                {required: true, message: '请输入电话', trigger: 'blur'},
            ]
        },
        {
            "type": "input", "field": "email", "title": "邮箱", "value": "",
            props: {
                placeholder: "请输入邮箱",
            },
            col: {
                span: 12,
                labelWidth: '100px'
            },
            validate: [
                {required: true, message: '请输入邮箱', trigger: 'blur'},
            ]
        },
        {
            "type": "select", "field": "gender", "title": "性别", "value":null,
            props: {
                placeholder: "请选择",
            },
            class: 'w-100',
            col: {
                span: 12,
                labelWidth: '100px'
            },
            options: [
                {
                    value: 1,
                    label: '男'
                },
                {
                    value: 2,
                    label: '女'
                }
            ],
            validate: [{required: true, message: '请选择性别', trigger: 'blur'},]
        },
        {
            "type": "DatePicker", "field": "birthDate", "title": "出生年月", "value": "",
            props: {
                type:"month",
                placeholder: "请输入出生年月",
            },
            col: {
                span: 12,
                labelWidth: '100px'
            },
            class: 'w-100',
            validate: [{required: true, message: '请输入出生年月', trigger: 'blur'},]
        },
        {
            "type": "input", "field": "title", "title": "职称", "value": "",
            props: {
                placeholder: "请输入职称",
            },
            class: 'w-100',
            col: {
                span: 12,
                labelWidth: '100px'
            },
            options: [],
            validate: [{required: true, message: '请输入职称', trigger: 'blur'},]
        },
        {
            "type": "input", "field": "position", "title": "职务", "value": "",
            props: {
                placeholder: "请输入职务",
            },
            col: {
                span: 12,
                labelWidth: '100px'
            },
            // validate: [{required: true, message: '请输入职务', trigger: 'blur'},]
        },
        {
            "type": "input", "field": "major", "title": "从事专业", "value": "",
            props: {
                placeholder: "请输入从事专业",
            },
            col: {
                span: 12,
                labelWidth: '100px'
            },
            validate: [{required: true, message: '请输入从事专业', trigger: 'blur'},]
        },
        {
            "type": "input", "field": "department", "title": "所属部门", "value": "",
            props: {
                placeholder: "请输入所属部门",
            },
            col: {
                span: 12,
                labelWidth: '100px'
            },
            // validate: [{required: true, message: '请输入所属部门', trigger: 'blur'},]
        },
        {
            "type": "input", "field": "degree", "title": "最高学位", "value": "",
            props: {
                placeholder: "请输入最高学位",
            },
            col: {
                span: 12,
                labelWidth: '100px'
            },
            validate: [{required: true, message: '请输入最高学位', trigger: 'blur'},]
        },
        {
            "type": "input", "field": "company", "title": "所在单位", "value": "苏博特研究院",
            props: {
                placeholder: "请输入所在单位",
            },
            col: {
                span: 12,
                labelWidth: '100px'
            },
            validate: [{required: true, message: '请输入所在单位', trigger: 'blur'},]
        },
        {
            type:"radio", title:"项目负责人", field:"queryFlag", value:'1',
            options:[
                {value:"0",label:"是"},
                {value:"1",label:"否"},
            ],
            col: {
                span: 12,
                labelWidth: '100px'
            },
            // validate: [{required: true, message: '请选择', trigger: 'blur'},]
        }
    ]
}

