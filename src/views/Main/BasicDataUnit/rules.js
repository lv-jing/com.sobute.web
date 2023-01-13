// import { checkEmail } from "@/utils/tools";

export const searchFormRule = [
  {
    "type": "commonSelect", "field": "typeCode", "title": "单位类型", "value": "",
    props: {
      placeholder: "请选择",
      typeName: "COMPANY_TYPE",
      field: "typeCode",
      isSplicing:false
    },
    class: 'w-100',
    col: {
      span: 8,
      labelWidth: '100px'
    },
    options: [],
  },
  {
    "type": "input", "field": "customerName", "title": "单位名称", "value": "",
    props: {
      placeholder: "请输入单位名称"
    },
    col: {
      span: 8,
      labelWidth: '110px'
    }
  },
  {
    "type": "commonSelect", "field": "customerNatureCode", "title": "单位性质", "value": "",
    props: {
      placeholder: "请选择",
      typeName: "UNIT_PROPERTY",
      field: "customerNatureCode",
      isSplicing:false
    },
    class: 'w-100',
    col: {
      span: 8,
      labelWidth: '100px'
    },
    options: [],
  },
  {
    "type": "input", "field": "organizationCode", "title": "组织代码", "value": "",
    props: {
      placeholder: "请输入组织代码",
    },
    col: {
      span: 8,
      labelWidth: '100px'
    }
  },
  {
    "type": "el-col",
    class: 'tr',
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
      emit: [{name: 'click', inject: true}],
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
      emit: [{name: 'click', inject: true}],
      emitPrefix: 'form-reset',
    }],
    col: {
      span: 16,
      labelWidth: '100px'
    }
  },
]
/**
 * 新增和编辑数据表单
 */
export const addFormRule = [
  {
    "type": "input", "field": "customerName", "title": "单位名称", "value": "",
    props: {
      placeholder: "请输入",
    },
    col: {
      span: 12,
      labelWidth: '100px'
    },
    validate: [{required: true, message: '请输入单位名称', trigger: 'blur'},]
  },
  {
    "type": "commonSelect", "field": "type", "title": "单位类型", "value": "",
    props: {
      placeholder: "请选择",
      typeName: "COMPANY_TYPE",
      field: "type"
    },
    class: 'w-100',
    col: {
      span: 12,
      labelWidth: '100px'
    },
    options: [],
    validate: [{required: true, message: '请选择单位类型', trigger: 'blur'},]
  },
  {
    "type": "commonSelect", "field": "customerNature", "title": "单位性质", "value": "",
    props: {
      placeholder: "请选择",
      typeName: "UNIT_PROPERTY",
      field: "customerNature"
    },
    class: 'w-100',
    col: {
      span: 12,
      labelWidth: '100px'
    },
    options: [],
    validate: [{required: true, message: '请选择单位性质', trigger: 'blur'},]
  },
  {
    "type": "input", "field": "organizationCode", "title": "组织代码", "value": "",
    props: {
      placeholder: "请输入",
    },
    col: {
      span: 12,
      labelWidth: '100px'
    },
    validate: [{required: true, message: '请输入组织代码', trigger: 'blur'},]
  },
  {
    "type": "input", "field": "contacts", "title": "联系人", "value": "",
    props: {
      placeholder: "请输入",
    },
    col: {
      span: 12,
      labelWidth: '100px'
    },
    // validate: [{required: true, message: '请输入联系人', trigger: 'blur'},]
  },
  {
    "type": "input", "field": "telephone", "title": "电话", "value": "",
    props: {
      placeholder: "请输入",
    },
    col: {
      span: 12,
      labelWidth: '100px'
    },
    validate: [
      // {required: true, message: '请输入电话', trigger: 'blur'},
      // {
      //     trigger: 'blur',
      //     validator: (rule, value, callback)=>checkPhone(rule, value, callback)
      // }
    ]

  },
  {
    "type": "input", "field": "email", "title": "邮箱", "value": "",
    props: {
      placeholder: "请输入",
    },
    col: {
      span: 12,
      labelWidth: '100px'
    },
    // validate: [
    //   {required: true, message: '请输入邮箱', trigger: 'blur'},
    //   {
    //     trigger: 'blur',
    //     validator: (rule, value, callback) => checkEmail(rule, value, callback)
    //   }
    // ]
  }
]