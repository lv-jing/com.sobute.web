
/* eslint-disable */
export const TransFormRule = [
  {
    "type": "input", "field": "employee", "title": "出让人", "value": "",
    props: {
      placeholder: "请输入出让人",
    },
    col: {
      span: 12,
      labelWidth: '100px'
    },
    validate: [{required: true, message: '出让人', trigger: 'blur'},]

  },
  {
    "type": "input", "field": "personal", "title": "受让人", "value": "",
    props: {
      placeholder: "请输入受让人",
    },
    col: {
      span: 12,
      labelWidth: '100px'
    },
    validate: [{required: true, message: '受让人', trigger: 'blur'},]

  },
  {
    title: "转让生效日",
    "type": "DatePicker",
    "field": "confirmDate",
    "value": '',
    props: {
      placeholder: "转让生效日",
      format: 'yyyy-MM-dd'
    },
    col: {
      span: 12,
    },
    class: 'w-100',
  },
  {
    "type": "input", "field": "amount", "title": "转让金额", "value": "",
    props: {
      placeholder: "请输入转让金额",
    },
    col: {
      span: 12,
      labelWidth: '100px'
    }
  },
]

export const PermitFormRule = [
  {
    "type": "input", "field": "employee", "title": "许可人", "value": "",
    props: {
      placeholder: "请输入许可人",
    },
    col: {
      span: 12,
      labelWidth: '100px'
    },
    validate: [{required: true, message: '许可人', trigger: 'blur'},]

  },
  {
    "type": "input", "field": "personal", "title": "被许可人", "value": "",
    props: {
      placeholder: "请输入被许可人",
    },
    col: {
      span: 12,
      labelWidth: '100px'
    },
    validate: [{required: true, message: '被许可人', trigger: 'blur'},]

  },
  {
    "type": "input", "field": "permitType", "title": "许可类型", "value": "",
    props: {
      placeholder: "请输入许可类型",
    },
    col: {
      span: 12,
      labelWidth: '100px'
    }
  },
  {
    "type": "input", "field": "period", "title": "许可期限", "value": "",
    props: {
      placeholder: "请输入许可期限",
    },
    col: {
      span: 12,
      labelWidth: '100px'
    }
  },
  {
    "type": "input", "field": "sourceNumber", "title": "许可合同备案号", "value": "",
    props: {
      placeholder: "请输入许可合同备案号",
    },
    col: {
      span: 12,
      labelWidth: '100px'
    }
  },
  {
    title: "许可备案日",
    "type": "DatePicker",
    "field": "confirmDate",
    "value": '',
    props: {
      placeholder: "许可备案日",
      format: 'yyyy-MM-dd'
    },
    col: {
      span: 12,
    },
    class: 'w-100',
  },
  {
    "type": "input", "field": "amount", "title": "许可金额", "value": "",
    props: {
      placeholder: "请输入许可金额",
    },
    col: {
      span: 12,
      labelWidth: '100px'
    }
  },
]
export const PledgeFormRule = [
  {
    "type": "input", "field": "employee", "title": "出质人", "value": "",
    props: {
      placeholder: "请输入出质人",
    },
    col: {
      span: 12,
      labelWidth: '100px'
    },
    validate: [{required: true, message: '出质人', trigger: 'blur'},]

  },
  {
    "type": "input", "field": "personal", "title": "质权人", "value": "",
    props: {
      placeholder: "请输入质权人",
    },
    col: {
      span: 12,
      labelWidth: '100px'
    },
    validate: [{required: true, message: '质权人', trigger: 'blur'},]

  },
  {
    "type": "input", "field": "period", "title": "质押期限", "value": "",
    props: {
      placeholder: "请输入质押期限",
    },
    col: {
      span: 12,
      labelWidth: '100px'
    }
  },
  {
    "type": "input", "field": "sourceNumber", "title": "登记号", "value": "",
    props: {
      placeholder: "请输入登记号",
    },
    col: {
      span: 12,
      labelWidth: '100px'
    }
  },
  {
    title: "质押登记日",
    "type": "DatePicker",
    "field": "confirmDate",
    "value": '',
    props: {
      placeholder: "质押登记日",
      format: 'yyyy-MM-dd'
    },
    col: {
      span: 12,
    },
    class: 'w-100',
  },
  {
    "type": "commonSelect", "field": "stage", "title": "备案阶段", "value": "",
    props: {
      placeholder: "请选择",
      typeName: "PATENT_STAGE",
    },
    col: {
      span: 12,
      labelWidth: '100px'
    },
    class: 'w-100',
    options: []
  },
  {
    "type": "input", "field": "amount", "title": "质押金额", "value": "",
    props: {
      placeholder: "请输入质押金额",
    },
    col: {
      span: 12,
      labelWidth: '100px'
    }
  },
]

export const ChangeFormRule = [
  {
    "type": "input", "field": "changeType", "title": "变更类型", "value": "",
    props: {
      placeholder: "请输入变更类型",
    },
    col: {
      span: 12,
      labelWidth: '100px'
    },
    validate: [{required: true, message: '请输入变更类型', trigger: 'blur'},]

  },
  {
    "type": "input", "field": "changeBefore", "title": "变更前", "value": "",
    props: {
      placeholder: "请输入变更前",
    },
    col: {
      span: 12,
      labelWidth: '100px'
    },
    validate: [{required: true, message: '变更前', trigger: 'blur'},]

  },
  {
    "type": "input", "field": "changeAfger", "title": "变更后", "value": "",
    props: {
      placeholder: "请输入变更后",
    },
    col: {
      span: 12,
      labelWidth: '100px'
    },
    validate: [{required: true, message: '变更后', trigger: 'blur'},]

  },
]

export const ExpenseFormRule = [
  {
    "type": "input", "field": "type", "title": "缴费类型", "value": "",
    props: {
      placeholder: "请输入",
    },
    col: {
      span: 12,
      labelWidth: '100px'
    },
  },
  {
    "type": "input", "field": "amount", "title": "缴费金额", "value": "",
    props: {
      placeholder: "请输入",
      type: "number"
    },
    col: {
      span: 12,
      labelWidth: '100px'
    },
    validate: [{ required: true, message: '请输入', trigger: 'blur' },]
  },
  {
    "type": "DatePicker", "field": "deadline", "title": "缴费期限", "value": "",
    props: {
      placeholder: "请选择"
    },
    col: {
      span: 12,
      labelWidth: '100px'
    },
    class: 'w-100',
    // validate: [{required: true, message: '请选择', trigger: 'blur'},]
  },
  {
    "type": "commonSelect", "field": "status", "title": "缴费状态", "value": "",
    props: {
      placeholder: "请选择",
      typeName: "PAYMENT_STATUS",
      field: "status",
      size: 'default'
    },
    col: {
      span: 12,
      labelWidth: '100px'
    },
    class: 'w-100',
    options: []
  },
  {
    "type": "DatePicker", "field": "paymentDate", "title": "缴费日", "value": "",
    props: {
      placeholder: "请选择"
    },
    col: {
      span: 12,
      labelWidth: '100px'
    },
    class: 'w-100',
    // validate: [{required: true, message: '请选择', trigger: 'blur'},]
  },
  {
    "type": "commonSelect", "field": "entity", "title": "缴费主体", "value": "",
    props: {
      placeholder: "请选择",
      typeName: "APPLY_PARTY",
      field: "entity",
    },
    col: {
      span: 12,
      labelWidth: '100px'
    },
    class: 'w-100',
    options: [],
    validate: [{ required: false, message: '请选择缴费主体', trigger: 'blur' },]
  },
]
export const AllotteFormRule = [
  {
    "type": "input", "field": "name", "title": "来文名称", "value": "",
    props: {
      placeholder: "请输入",
    },
    col: {
      span: 12,
      labelWidth: '100px'
    },
    validate: [{ required: true, message: '请输入', trigger: 'blur' },]
  },
  {
    "type": "DatePicker", "field": "documentDate", "title": "发文日期", "value": "",
    props: {
      placeholder: "请选择"
    },
    col: {
      span: 12,
      labelWidth: '100px'
    },
    class: 'w-100',
    // validate: [{required: true, message: '请选择', trigger: 'blur'},]
  },
  {
    "type": "input", "field": "toDo", "title": "待办事项", "value": "",
    props: {
      placeholder: "请输入",
    },
    col: {
      span: 12,
      labelWidth: '100px'
    },
    validate: [{ required: true, message: '请输入', trigger: 'blur' },]
  },
  {
    "type": "DatePicker", "field": "deadline", "title": "处理期限", "value": "",
    props: {
      placeholder: "请选择"
    },
    col: {
      span: 12,
      labelWidth: '100px'
    },
    class: 'w-100',
    // validate: [{required: true, message: '请选择', trigger: 'blur'},]
  },
  {
    "type": "commonSelect", "field": "status", "title": "处理状态", "value": "",
    props: {
      placeholder: "请选择",
      typeName: "PROCESSING_STATE",
      field: "status",
      size: 'default'
    },
    col: {
      span: 12,
      labelWidth: '100px'
    },
    class: 'w-100',
    options: []
  },
  {
    "type": "commonAuto", "field": "handler", "title": "处理人", "value": '',
    props: {
      placeholder: "处理人",
      multiple: false,
      filterable: true,
      collapseTags: false,
      field: 'handler',
      remote: true,
    },
    col: {
      span: 12,
      labelWidth: '100px'
    },
    class: 'w-100',
    validate: [{ required: true, message: '处理人不能为空', trigger: 'blur' },]
  },
]