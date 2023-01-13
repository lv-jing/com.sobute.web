/**
 * 查询数据表单
 */

/* eslint-disable */
/**
 * 新增和编辑数据表单
 */
export const addFormRule = (type) => [
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
      labelWidth: '120px'
    }
  },
  {
    "type": "input", "field": "name", "title": "成果名称", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '120px'
    },
    validate: [{ required: true, message: '请输入成果名称', trigger: 'blur' },]
  },
  {
    "type": "input", "field": "author", "title": "获奖人", "value": "",
    props: {
      placeholder: "按顺序录入全部获奖人，以中文输入、“，”分隔"
    },
    col: {
      span: 8,
      labelWidth: '120px'
    }
  },
  {
    "type": "input", "field": "organization", "title": "奖励名称", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '120px'
    }
  },
  {
    "type": "input", "field": "source", "title": "奖励等级", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '120px'
    }
  },
  {
    "type": "input", "field": "party", "title": "获奖单位", "value": "",
    props: {
      placeholder: "按顺序录入全部获奖单位，以中文输入、“，”分隔"
    },
    col: {
      span: 8,
      labelWidth: '120px'
    }
  },
  {
    "type": "input", "field": "certificate", "title": "证书编号", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '120px'
    }
  },
  {
    "type": "DatePicker", "field": "confirmDate", "title": "获奖日期", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '120px'
    },
    class: "w-100"
  },
  {
    "type": "input", "field": "register", "title": "授奖单位", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '120px'
    }
  },

  {
    "type": "input", "field": "description", "title": "备注", "value": "",
    props: {
      placeholder: "请输入",
      type: "textarea",
      autosize: { minRows: 2 },
      showWordLimit: true,
      maxlength: 1333
    },
    col: {
      span: 24,
      labelWidth: '120px'
    }
  },
  {
    "type": "input", "field": "comments", "title": "摘要", "value": "",
    props: {
      placeholder: "请输入",
      type: "textarea",
      autosize: { minRows: 3 },
      showWordLimit: true,
      maxlength: 1333
    },
    col: {
      span: 24,
      labelWidth: '120px'
    }
  },

  {
    "type": "commonSingleSelect", "field": "refRtAchievementId", "title": "关联成果", "value": [],
    props: {
      placeholder: "请选择",
      filterable: true,
      multiple: true,
      isSplicing:false,
      transform: ["name","id"],
      request: {
        interfaceName: '/service/project/achievement/comboBox',
        method: 'get',
        params: {
          params: {
            statusCode: 2005107,
            excludeTypeCode: 2014106
          }
        }
      }
    },
    col: {
      span: 12,
      labelWidth: '120px'
    },
    options: [],
    class: 'w-100',
  },





  {
    "type": "commonSingleSelect", "field": "refRtPatentId", "title": "关联知识产权", "value": [],
    props: {
      placeholder: "请选择",
      filterable: true,
      multiple: true,
      isSplicing:false,
      transform: ["patentName", "id"],
      request: {
        interfaceName: '/service/project/rpmRtPatentHeaders/comboBox',
        method: 'get',
        params: {
          params: {
            statusCode: 2005104
          }
        }
      }
    },
    col: {
      span: 12,
      labelWidth: '120px'
    },
    options: [],
    class: 'w-100',
  },
]