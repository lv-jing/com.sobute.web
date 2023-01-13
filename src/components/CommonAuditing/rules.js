/**
 * 查询数据表单
 */

/* eslint-disable */

export const auditingFormRule = [
    {
        "type": "input", "field": "remarks", "title": "审批意见", "value": '',
        props: {
            placeholder: "请输入",
            type: "textarea",
            autosize: { minRows: 3 },
            showWordLimit: true,
            maxlength: 1333
        },
        col: {
            span: 24,
        },
        class: 'w-100',
        validate: [{ required: true, message: '审批意见不能为空', trigger: 'blur' },]

    },
    {
        type: "radio",
        title: "是否转发",
        field: "type",
        value: 1,
        options: [
            { "value": 1, 'label': "是" },
            { "value": 0, 'label': "否" },

        ],
        col: {
            span: 24,
        },
        control: [{
            handle(val) {
                return val === 1;
            },
            rule: [{
                type: "commonSingleSelect",
                field: "groupCodeList",
                title: "转发人员",
                value: '',
                options: [ ],
                props: {
                    placeholder: "请选择",
                    filterable: true,
                    transform: ["empolyeeName", "empolyeeNumber"],
                    request: {
                        interfaceName: '/service/project/hr/approve-list',
                        method: 'get',
                        params: {
                            params: {
                                name:'',
                                pageNum: 1,
                                pageSize: -1
                            }
                        }
                    },
                },
                class: 'w-100',
                col: {
                    span: 24,
                },
                validate: [{ required: true, message: '选择指定', trigger: 'blur' },]

            },
            ]
        }],
        validate: [{ required: true, message: '请选择象', trigger: 'blur' },]
        // emit: ['change'],
        // emitPrefix: 'send'
    },

    {
        type: "radio",
        title: "转发方向",
        field: "type1",
        value: 2,
        options: [
            { "value": 1, 'label': "上一层" },
            { "value": 2, 'label': "下一层" },

        ],
        col: {
            span: 24,
        },
    }

]
