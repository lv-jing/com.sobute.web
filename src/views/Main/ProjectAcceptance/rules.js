/**
 * 查询数据表单
 */

/* eslint-disable */


/**
 * 查询数据表单
 */

export const searchFormRule = [

  {
    "type": "input", "field": "projectName", "title": "项目名称", "value": "",
    props: {
      placeholder: "请输入项目名称",
    },
    col: {
      span: 8,
      labelWidth: '100px'
    }
  },
  {
    "type": "input", "field": "employeeName", "title": "责任人", "value": "",
    props: {
      placeholder: "请输入责任人",
    },
    col: {
      span: 8,
      labelWidth: '100px'
    }
  },
  {
    type: "commonSelect",
    title: '验收类型',
    field: 'typeCode',
    value: '',
    props: {
      typeName: 'CHECK_TYPE',
      isSplicing: false,
      field: 'typeCode',
    },

    class: 'w-100',
    col: {
      span: 8,
      labelWidth: '100px'
    },

  },
  {
    "type": "input", "field": "documentNumber", "title": "验收编号", "value": "",
    class: 'w-100',
    props: {
      placeholder: "请输入验收编号"
    },
    col: {
      span: 8,
      labelWidth: '100px'
    },
    //  validate: [{ required: true, message: '考核编号不能为空', whitespace: true, trigger: 'blur' },]

  },
  {
    "type": "el-col",
    "title": "验收日期",
    children: [
      {
        "type": "DatePicker", "field": "startDate", "value": '',
        props: {
          placeholder: "开始时间",
          format: 'yyyy-MM-dd'
        },
        col: {
          span: 12,
        },
        class: 'w-97 md0',
      },
      {
        "type": "DatePicker", "field": "endDate", "value": '',
        props: {
          placeholder: "结束时间",
          format: 'yyyy-MM-dd'
        },
        col: {
          span: 12,
        },
        class: 'w-100',
      },
    ],
    col: {
      span: 8,
      labelWidth: '100px'
    },
    class: 'md0'
  },
  {
    type: "commonSelect",
    title: '状态',
    field: 'statusCode',
    value: '',
    props: {
      typeName: 'APPLY_STATUS',
      isSplicing: false,
      field: 'statusCode',
    },

    class: 'w-100',
    col: {
      span: 8,
      labelWidth: '100px'
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
      span: 24,
      labelWidth: '100px'
    },
    class: 'tr',
  },
]


export function addFormRule(_this) {
  return [
    {
      type: 'common-title',
      name: 'title',
      props: {
        title: '项目基本信息'
      },
    },

    {
      "type": "input", "field": "documentNumber", "title": "验收编号", "value": "",
      class: 'w-100',
      props: {
        placeholder: "请输入验收编号",
        disabled: true
      },
      col: {
        span: 8,
        labelWidth: '100px'
      },
      //  validate: [{ required: true, message: '考核编号不能为空', whitespace: true, trigger: 'blur' },]

    },
    {
      "type": "commonSingleSelect", "field": "projectId", "title": "项目名称", "value": '',
      props: {
        placeholder: "请选择",
        filterable: true,
        transform: ["projectName", "id", "projectNumber"],
        onChanges: (val) => _this.addDrawChange(val),
        request: {
          interfaceName: 'service/project/confirm/list',
          method: 'get',
          params: {
            params: {
              statusCode: 2005104,
              pageNum: 1,
              pageSize: -1
            }
          }
        }
      },
      col: {
        span: 8,
        labelWidth: '100px'
      },

      options: [],
      // emit: ['change'],
      // emitPrefix: 'fields',
      class: 'w-100',
      validate: [{required: true, message: '项目名称不能为空', trigger: 'blur'},]
    },
    {
      "type": "DatePicker", "field": "fillDate", "title": "验收日期", "value": "",
      props: {
        placeholder: "选择验收日期",
        type: "date",
        format: 'yyyy-MM-dd'
      },
      col: {
        span: 8,
        labelWidth: '100px'
      },
      class: 'w-100',
      validate: [{required: true, message: '选择验收日期', trigger: 'blur'}],

    },
    {
      "type": "input", "field": "customerName", "title": "项目承担单位", "value": "",
      class: 'w-100',
      props: {
        placeholder: "请输入项目承担单位"
      },
      col: {
        span: 8,
        labelWidth: '100px'
      },
      //  validate: [{ required: true, message: '考核编号不能为空', whitespace: true, trigger: 'blur' },]

    },
    {
      "type": "commonAuto", "field": "employeeName", "title": "责任人", "value": '',
      props: {
        placeholder: "请选择责任人",
        multiple: false,
        filterable: true,
        collapseTags: false,
        field: 'employeeName',
        remote: true,
      },
      col: {
        span: 8,
        labelWidth: '100px'
      },
      class: 'w-100',
      validate: [{required: true, message: '责任人不能为空', trigger: 'blur'},]

    },

    {
      type: "commonSelect",
      title: '验收类型',
      field: 'type',
      value: '',
      props: {
        typeName: 'CHECK_TYPE',
        field: 'type',
      },

      class: 'w-100',
      col: {
        span: 8,
        labelWidth: '100px'
      },
      validate: [{required: true, message: '验收类型', trigger: 'blur'},]
    },
    {
      "type": "common-cascader",
      "field": "keyWordsList",
      "title": "技术关键词",
      "value": [],
      class: 'w-100',
      props: {
        placeholder: "请选择",
        typeName: "KEY_WORDS",
        "field": "keyWordsList",
        multiple: true,
        checkStrictly: true
      },
      col: {
        span: 8,
        labelWidth: '100px'
      },
      options: [],
      validate: [{ required: true, message: '请选择技术关键词',  trigger: 'blur' },]
    },
    {
      "type": "common-cascader",
      "field": "keyWordsProList",
      "title": "产品关键词",
      "value": [],
      class: 'w-100',
      props: {
        placeholder: "请选择",
        typeName: "PRODUCT_CLASSIFICATION",
        "field": "keyWordsProList",
        multiple: true,
        checkStrictly: true
      },
      col: {
        span: 8,
        labelWidth: '100px'
      },
      options: [],
      // validate: [{ required: true, message: '请选择项目来源', whitespace: true, trigger: 'blur' },]
    },
    {
      type: 'common-title',
      name: 'title',
      props: {
        title: '项目考核指标及完成情况',
        isClone: true
      },
    }

  ]
}


/**
 * 抽屉表单
 */

export const addFormDrawerRule = [
  {
    "type": "commonAuto", "field": "empolyeeCombobox", "title": "责任人", "value": [],
    props: {
      placeholder: "责任人",
      multiple: true,
      filterable: true,
      collapseTags: false,
      field: 'empolyeeCombobox',
      remote: true,
    },
    col: {
      span: 24,
    },
    class: 'w-100',
    validate: [{required: true, message: '责任人不能为空', trigger: 'blur'},]

  }, {
    "type": "input", "field": "taskName", "title": "考核内容", "value": "",
    props: {
      placeholder: "考核内容",
    },
    col: {
      span: 24,
    },
    validate: [{required: true, message: '考核内容不能为空', trigger: 'blur'},]

  }, {
    "type": "input", "field": "exam", "title": "年度考核指标", "value": "",
    props: {
      placeholder: "年度考核指标",
    },
    col: {
      span: 24,
    },
    validate: [{required: true, message: '年度考核指标不能为空', trigger: 'blur'},]

  }, {
    "type": "inputNumber", "field": "weight", "title": "预计权重", "value": "",
    props: {
      placeholder: "预计权重",
      min: 0
    },
    col: {
      span: 24,
    },
    class: 'w-100',
    validate: [{required: true, message: '预计权重不能为空', trigger: 'blur'},]
  },
  {
    "type": "DatePicker", "field": "dataRange", "title": "项目时间", "value": [],
    props: {
      placeholder: "请输入选择",
      type: 'daterange',
      rangeSeparator: '至',
      startPlaceholder: "开始日期",
      endPlaceholder: "结束日期",
      align: 'center',
      format: 'yyyy-MM-dd'
    },
    col: {
      span: 24
    },
    class: 'w-100',
    validate: [{required: true, message: '请选择项目时间', trigger: 'blur'},]

  },]
