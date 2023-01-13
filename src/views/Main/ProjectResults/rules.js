/**
 /**
 * 查询数据表单
 */

/* eslint-disable */
export const searchFormType = [
  {
    "type": "commonSelect", "field": "typeCode", "title": "成果类型", "value": "",
    props: {
      placeholder: "请选择成果类型",
      typeName: "OUTCOMES_TYPE",
      field: "typeCode",
      isSplicing: false
    },
    col: {
      labelWidth: '100px'
    },
    class: 'w-100',
    options: [],
    validate: [{required: true, message: '请选择成果类型', trigger: 'blur'},]
  }
]
export const searchFormRule = [
  {
    "type": "input", "field": "documentNumber", "title": "成果入库单号", "value": "",
    props: {
      placeholder: "请输入成果入库单号"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    }
  },
  {
    "type": "commonSelect", "field": "typeCode", "title": "成果类型", "value": "",
    props: {
      placeholder: "请选择成果类型",
      typeName: "OUTCOMES_TYPE",
      field: "typeCode",
      isSplicing: false
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    class: 'w-100',
    options: []
  },
  {
    "type": "input", "field": "name", "title": "成果名称", "value": "",
    props: {
      placeholder: "请输入成果名称",
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
  },
  {
    "type": "input", "field": "projectNameIn", "title": "关联内部项目名称", "value": "",
    props: {
      placeholder: "请输入关联内部项目名称",
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
  },
  {
    "type": "input", "field": "projectName", "title": "关联外部项目名称", "value": "",
    props: {
      placeholder: "请输入关联外部项目名称",
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
  },
  {
    "type": "input", "field": "author", "title": "所有者", "value": "",
    props: {
      placeholder: "请输入所有者",
    },
    col: {
      span: 8,
      labelWidth: '130px'
    }
  },
  {
    "type": "input", "field": "keyWords", "title": "技术关键词", "value": "",
    props: {
      placeholder: "请输入技术关键词",
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
  },
  {
    "type": "input", "field": "party", "title": "单位", "value": "",
    props: {
      placeholder: "请输入单位",
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
  },
  {
    title:"开始时间",
    "type": "DatePicker", "field": "confirmDateStart", "value": '',
    props: {
      placeholder: "开始时间",
      format: 'yyyy-MM-dd'
    },
    col: {
      span: 8,
       labelWidth: '130px'
    },
    class: 'w-100',
  },
  {
    title:"结束时间",
    "type": "DatePicker", "field": "confirmDateEnd", "value": '',
    props: {
      placeholder: "结束时间",
      format: 'yyyy-MM-dd'
    },
    col: {
      span: 8,
       labelWidth: '130px'
    },
    class: 'w-100',
  },
  {
    "type": "input", "field": "createdByName", "title": "创建人", "value": "",
    props: {
      placeholder: "请输入创建人",
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
  },
  {
    "type": "input", "field": "organization", "title": "奖励名称", "value": "",
    props: {
      placeholder: "请输入奖励名称",
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
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
        labelWidth: '130px'
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
        labelWidth: '130px'
      },
      emit: [{name: 'click', inject: true}],
      emitPrefix: 'form-reset',
    }],
    col: {
      span: 24,
      labelWidth: '130px'
    }
  },

]
/**
 * 新增和编辑数据表单
 */
export const addFormRule = [
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
    "type": "input", "field": "name", "title": "论文题目", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '100px'
    }
  },
  {
    "type": "input", "field": "author", "title": "第一作者", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '100px'
    }
  },
  {
    "type": "input", "field": "organization", "title": "通讯作者", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '100px'
    }
  },
  {
    "type": "DatePicker", "field": "confirmDate", "title": "发表日期", "value": "",
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
    "type": "input", "field": "party", "title": "作者单位", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '100px'
    }
  },
  {
    "type": "input", "field": "certificate", "title": "其他作者", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '100px'
    }
  },
  {
    "type": "input", "field": "source", "title": "期刊名称", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '100px'
    }
  },
  {
    "type": "input", "field": "register", "title": "卷（期）", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '100px'
    }
  },
  {
    "type": "input", "field": "page", "title": "页码", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '100px'
    }
  },
  {
    "type": "select", "field": "employ", "title": "收录情况", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '100px'
    },
    class: 'w-100',
    options: []
  },
  {
    "type": "input", "field": "doi", "title": "DOI", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '100px'
    }
  },
  {
    "type": "select", "field": "projectList", "title": "关联项目", "value": "",
    props: {
      placeholder: "请输入",
      multiple: true,
      filterable: true
    },
    col: {
      span: 8,
      labelWidth: '100px'
    },
    class: 'w-100',
    options: []
  },
  {
    "type": "input", "field": "keywords", "title": "技术关键词", "value": "",
    props: {
      placeholder: "请输入",
    },
    col: {
      span: 8,
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