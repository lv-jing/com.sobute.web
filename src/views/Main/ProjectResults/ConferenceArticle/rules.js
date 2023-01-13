/**
 * 查询数据表单
 */

/* eslint-disable */
/**
 * 新增和编辑数据表单
 */
export const addFormRule=(type) =>  [
  {
    type: 'common-title',
    name: 'title',
    props: {
      title: '基本信息'
    },
  },
  {
    "type": "input", "field": "documentNumber", "title": "入库单号", "value": "",
    props: {
      placeholder: "请输入",
      disabled: true
    },
    col: {
      span: 8,
      labelWidth: '130px'
    }
  },
  {
    "type": "input", "field": "source", "title": "会议名称", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    validate: [{ required: true, message: '请输入会议名称', trigger: 'blur' },]
  },
  {
    "type": "input", "field": "name", "title": "论文题目", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    }
  },
  {
    "type": "input", "field": "unit", "title": "通讯单位", "value": "",
    props: {
      placeholder: "中国单位请用中文输入"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    }
  },
  {
    "type": "input", "field": "organization", "title": "通讯作者", "value": "",
    props: {
      placeholder: "本单位人员请用中文输入"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    }
  },
  {
    "type": "DatePicker", "field": "confirmDate", "title": "会议日期", "value": "",
    props: {
      type: 'month',
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    class: "w-100",
    // validate: [{ required: true, message: '请选择会议日期', trigger: 'blur' },]
  },
  {
    "type": "input", "field": "author", "title": "第一作者", "value": "",
    props: {
      placeholder: "本单位人员请用中文输入"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    }
  },
  {
    "type": "input", "field": "certificate", "title": "全部作者", "value": "",
    props: {
      placeholder: "按顺序录入全部作者（包括第一作者、通讯作者），以“，”分隔；本单位作者用中文输入"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    }
  },
  {
    "type": "input", "field": "party", "title": "全部作者单位", "value": "",
    props: {
      placeholder: "按顺序录入全部单位，以“，”分隔；中国单位用中文输入"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    }
  },
  {
    "type": "input", "field": "register", "title": "会议地点", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    }
  },
  {
    "type": "select", "field": "doi", "title": "是否报告", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    class: 'w-100',
    options: [
      { "value": "是", "label": '是' },
      { "value": "否", "label": '否' }
    ]
  },
 
  {
    "type": "commonSelect", "field": "report", "title": "报告类型", "value": "",
    props: {
      placeholder: "请选择",
      typeName: "REPORT_TYPE_CONFERENCE",
      field: "report",
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    class: 'w-100',
    options: [],
  },
  {
    "type": "input", "field": "publication", "title": "收录刊物", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    }
  },
  {
    "type": "input", "field": "page", "title": "刊物卷(期):页码", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    }
  },
  {
    "type": "commonSelect", "field": "employ", "title": "收录情况", "value": "",
    props: {
      placeholder: "请输入",
      typeName: "INCLUDED_TYPE",
      field: "employ",
      transform: ["name"]
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    class: 'w-100',
    options: []
  },
  
  // {
  //   "type": "input", "field": "keyWords", "title": "技术关键词", "value": "",
  //   props: {
  //     placeholder: "请输入"
  //   },
  //   col: {
  //     span: 8,
  //     labelWidth: '130px'
  //   }
  // },
  {
    "type": "input", "field": "description", "title": "备注", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 24,
      labelWidth: '130px'
    }
  },
  {
    "type": "input", "field": "comments", "title": "摘要", "value": "",
    props: {
      placeholder: "请输入",
      type: "textarea",
      autosize: { minRows: 3 },
      size: "small",
      showWordLimit: true,
      maxlength: 1333
    },
    col: {
      span: 24,
      labelWidth: '130px'
    }
  }
]