/**
 * 查询数据表单
 */

/* eslint-disable */

export const auditingFormRule = [
    {
        type: "commonSingleSelect",
        field: "addApproveName",
        title: "转发至",
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
        validate: [{ required: true, message: '选择指定转发给_', trigger: 'blur' },]

    },

    {
        type: "radio",
        title: "转发方向",
        field: "position",
        value: 2,
        options: [
            { "value": 1, 'label': "上一级" },
            { "value": 2, 'label': "下一级" },

        ],
        col: {
            span: 24,
        },
    }

]
