/**
 * 查询数据表单
 */

/* eslint-disable */
export const searchFormRule = [
  
    {
        "type": "input", "field": "name", "title": "名称", "value": "",
        props: {
            placeholder: "请输入中文名称",
        },
        col: {
            span: 8,
            labelWidth: '50px'
        },

    },
    // {
    //     "type": "select", "field": "type", "title": "类型", "value": "",
    //     props: {
    //         placeholder: "请输入类型",
    //     },
    //     class: 'w-100',
    //     col: {
    //         span: 8,
    //         labelWidth: '100px'
    //     },
    //     options: [
    //         { "value": '', "label": "全部" }
    //     ]
    // },
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
            labelWidth: '60px'
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
            // on: {
            //     click: () => {
            //         const $f = _this.searchFormModel
            //         //TODO 提交表单
            //         $f.resetFields();
            //         _this.getDictionaryList()
            //        // _this.$emit('searchForm', $f.formData())
            //     }
            // }
        }],
        col: {
            span: 8,
            labelWidth: '100px'
        },
        class: 'tr'
    },

]

/**
 * 新增字典类型
 */
export const addDicType = [ {
    "type": "input", "field": "type", "title": "值集代码", "value": "",
    props: {
        placeholder: "请输入中文值集代码",
    },
    col: {
    },
    validate: [{ required: true, message: '请输入中文值集代码', trigger: 'blur' },]

},{
    "type": "input", "field": "typeAlias", "title": "值集名称", "value": "",
    props: {
        placeholder: "请输入中文值集名称",
    },
    col: {
    },
    validate: [{ required: true, message: '请输入中文值集名称', trigger: 'blur' },]

}, {
    "type": "input", "field": "remarks", "title": "描述", "value": "",
    props: {
        placeholder: "请输入描述",
    },
    col: {

    },

}]

/**
 * 新增和编辑数据表单
 */
export const addFormRule = [
    {
        "type": "select", "field": "preGuid", "title": "父级值", "value": "",
        
        props:{
            filterable:true
        },
        col: {
            labelWidth: '100px'
        },
        class: 'w-100',
        options: [],
        // validate: [{ required: true, message: '请选择', trigger: 'blur' },]

    },
    {
        "type": "input", "field": "type", "title": "值集代码", "value": "",
        props: {
            placeholder: "请输入中文值集代码",
            disabled:true
        },
        col: {
            labelWidth: '100px'
        },
        class: 'w-100',
        validate: [{ required: true, message: '请输入值集代码', trigger: 'blur' },]

    },
    {
        "type": "input", "field": "typeAlias", "title": "值集名称", "value": "",
        props: {
            placeholder: "请输入值集名称",
            disabled:true
        },
        col: {
            labelWidth: '100px'
        },
        class: 'w-100',
        validate: [{ required: true, message: '请输入中文值集名称', trigger: 'blur' },]

    }, 

    {
        "type": "input", "field": "code", "title": "值代码", "value": "",
        props: {
            placeholder: "请输入值代码",
            maxlength: 30
        },
        col: {
            labelWidth: '100px'
        },
        validate: [{ required: true, message: '请输入值代码', trigger: 'blur' },]
    },
    {
        "type": "input", "field": "name", "title": "值名称", "value": "",
        props: {
            placeholder: "请输入值名称",
            maxlength: 30
        },
        col: {
            labelWidth: '100px'
        },
        validate: [{ required: true, message: '请输入值名称', trigger: 'blur' },]

    },
    
    {
        "type": "InputNumber", "field": "sort", "title": "排序值", "value": "",
        props: {
            placeholder: "请输入",
            min: 0,
            max: 1000
        },
        col: {
            labelWidth: '100px'
        },

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
      {
        "type": "input", "field": "reservedField1", "title": "扩展字段1", "value": "",
        props: {
            placeholder: "请输入扩展字段1",
        },
        col: {
            span: 24,
            labelWidth: '100px'
        }
    },
    {
        "type": "input", "field": "reservedField2", "title": "扩展字段2", "value": "",
        props: {
            placeholder: "请输入扩展字段2",
        },
        col: {
            span: 24,
            labelWidth: '100px'
        }
    },
    {
        "type": "input", "field": "reservedField3", "title": "扩展字段3", "value": "",
        props: {
            placeholder: "请输入扩展字段3",
        },
        col: {
            span: 24,
            labelWidth: '100px'
        }
    },
    {
        "type": "input", "field": "reservedField4", "title": "扩展字段4", "value": "",
        props: {
            placeholder: "请输入扩展字段4",
        },
        col: {
            span: 24,
            labelWidth: '100px'
        }
    },
    {
        "type": "input", "field": "reservedField5", "title": "扩展字段5", "value": "",
        props: {
            placeholder: "请输入扩展字段5",
        },
        col: {
            span: 24,
            labelWidth: '100px'
        }
    },

]

