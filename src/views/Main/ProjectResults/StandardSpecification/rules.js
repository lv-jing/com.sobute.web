/**
 * 查询数据表单
 */

/* eslint-disable */
/**
 * 新增和编辑数据表单
 */
export const addFormRule=(type) => [
  {
    type: 'common-title',
    name: 'title',
    props: {
      title: '基本信息'
    },
  },
  {
    "type": "input", "field": "documentNumber", "title": "入库单号:", "value": "",
    props: {
      placeholder: "请输入",
      disabled: true
    },
    col: {
      span: 8,
      labelWidth: '100px'
    }
  },
  {
    "type": "input", "field": "name", "title": "成果名称", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '100px'
    },
    validate: [{required: true, message: '请输入成果名称', trigger: 'blur'},]
  },
  {
    "type": "input", "field": "organization", "title": "主编单位", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '100px'
    }
  },
  {
    "type": "DatePicker", "field": "confirmDate", "title": "发布日期", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '100px'
    },
    class: "w-100"
  },
  {
    "type": "DatePicker", "field": "applyDate", "title": "实施日期", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '100px'
    },
    class: "w-100"
  },
  {
    "type": "commonSelect", "field": "source", "title": "类别", "value": "",
    props: {
      placeholder: "请选择",
      typeName: "STANDARD",
      field: "source",
    },
    col: {
      span: 8,
      labelWidth: '100px'
    },
    class: 'w-100',
    options: [],
  },
//   {
//     "type": "commonSingleSelect", "field": "projectList", "title": "关联外部项目", "value": [],
//     props: {
//         placeholder: "请选择",
//         filterable: true,
//         multiple: true,
//         transform: ["projectName", "projectNumber", "id"],
//         request: {
//             interfaceName:type==0?'/service/project/confirm/checkbox':'/service/project/confirm/list',
//             method: 'get',
//             params: {
//                 params: {
//                     // projectNumberPrefix:'PM1,PM2',
//                     statusCode: 2005104,
//                     projectNumber:type==0?'PM2':'PM3',
//                     pageNum: 1,
//                     pageSize: -1
//                 }
//             }
//         }
//     },
//     col: {
//         span: 8,
//         labelWidth: '100px'
//     },
//     options: [],
//     class: 'w-100',
// },
// {
//     "type":type==0?"commonSingleSelect":"hidden", "field": "projectInString", "title": "关联内部项目", "value": "",
//     props: {
//         placeholder: "请选择",
//         filterable: true,
//         transform: ["projectName", "projectNumber", "id"],
//         request: {
//             interfaceName: '/service/project/confirm/list',
//             method: 'get',
//             params: {
//                 params: {
//                     statusCode: 2005104,
//                     projectNumber:'PM1',
//                     pageNum: 1,
//                     pageSize: -1
//                 }
//             }
//         }
//     },
//     col: {
//         span: 8,
//         labelWidth: '100px'
//     },
//     options: [],
//     class: 'w-100',
// },
  
  {
    "type": "input", "field": "certificate", "title": "标准号", "value": "",
    props: {
      placeholder: "请输入",
    },
    col: {
      span: 8,
      labelWidth: '100px'
    }
  },
  {
    "type": "input", "field": "register", "title": "修订日期", "value": "",
    props: {
      placeholder: "请输入",
    },
    col: {
      span: 8,
      labelWidth: '100px'
    }
  },
  {
    "type": "input", "field": "doi", "title": "发布部门", "value": "",
    props: {
      placeholder: "请输入",
    },
    col: {
      span: 8,
      labelWidth: '100px'
    }
  },
  {
    "type": "input", "field": "description", "title": "备注", "value": "",
    props: {
      placeholder: "请输入",
      type: "textarea",
      autosize:{ minRows: 2},
      showWordLimit:true,
      maxlength:1333
    },
    col: {
      span: 24,
      labelWidth: '100px'
    }
  },
  {
    "type": "input", "field": "author", "title": "全部起草人", "value": "",
    props: {
      placeholder: "按顺序录入全部起草人，以中文输入、“，”分隔",
      type: "textarea",
      autosize:{ minRows: 3},
      showWordLimit:true,
      maxlength:1333
    },
    col: {
      span: 24,
      labelWidth: '100px'
    }
  },
  {
    "type": "input", "field": "party", "title": "全部起草单位", "value": "",
    props: {
      placeholder: "按顺序录入全部起草单位，以中文输入、“，”分隔" ,
      type: "textarea",
      autosize:{ minRows: 3},
      showWordLimit:true,
      maxlength:1333
    },
    col: {
      span: 24,
      labelWidth: '100px'
    }
  },
  {
    "type": "input", "field": "comments", "title": "摘要", "value": "",
    props: {
      placeholder: "请输入",
      type: "textarea",
      autosize:{ minRows: 3},
      showWordLimit:true,
        maxlength:1333
    },
    col: {
      span: 24,
      labelWidth: '100px'
    }
  },
  // {
  //   "type": "common-cascader",
  //   "field": "keyWordsList",
  //   "title": "技术关键词",
  //   "value": [],
  //   class: 'w-100',
  //   props: {
  //     placeholder: "请选择",
  //     typeName: "KEY_WORDS",
  //     "field": "keyWordsList",
  //     multiple: true,
  //     checkStrictly:true
  //   },
  //   col: {
  //     span: 24,
  //     labelWidth: '100px'
  //   },
  //   options: [],
  //   // validate: [{ required: true, message: '请选择项目来源', whitespace: true, trigger: 'blur' },]
  // },
]