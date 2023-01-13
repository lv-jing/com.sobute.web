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
    "type": "input", "field": "author", "title": "著作权人", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '100px'
    }
  },
  {
    "type": "input", "field": "party", "title": "权利取得方式", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '100px'
    }
  },
  {
    "type": "DatePicker", "field": "confirmDate", "title": "开发完成时间", "value": "",
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
    "type": "DatePicker", "field": "applyDate", "title": "登记日期", "value": "",
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
    "type": "input", "field": "organization", "title": "登记号", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '100px'
    }
  },
  {
    "type": "input", "field": "certificate", "title": "权利范围", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '100px'
    }
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
//   {
//     "type": "input", "field": "keyWords", "title": "技术关键词", "value": "",
//     props: {
//       placeholder: "请输入"
//     },
//     col: {
//       span: 8,
//       labelWidth: '100px'
//     }
//   },
  {
    "type": "input", "field": "source", "title": "首次发表日期", "value": "",
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
      autosize: {minRows: 2},
      showWordLimit: true,
      maxlength: 1333
    },
    col: {
      span:24,
      labelWidth: '100px'
    }
  },
  {
    "type": "input", "field": "comments", "title": "摘要", "value": "",
    props: {
      placeholder: "请输入",
      type: "textarea",
      autosize: {minRows: 3},
      showWordLimit: true,
      maxlength: 1333
    },
    col: {
      span: 24,
      labelWidth: '100px'
    }
  }
]