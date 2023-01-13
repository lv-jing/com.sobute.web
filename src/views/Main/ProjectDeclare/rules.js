/**
 * 查询数据表单
 */

/* eslint-disable */
export const searchFormRule = [
  {
    "type": "input", "field": "projectNumber", "title": "申请编号", "value": "",
    props: {
      placeholder: "请输入申请编号"
    },
    col: {
      span: 8,
      labelWidth: '100px'
    }
  },
  {
    "type": "hidden", "field": "applyType", "title": "用户类型", "value": "",
    props: {
      placeholder: "请选择用户类型",
    },
    col: {
      span: 8,
      labelWidth: '100px'
    },
    class: "w-100",
    options: [
      {value: "0", label: "内部"},
      {value: "1", label: "外部"}
    ],
    emit: ['change'],
    emitPrefix: 'apply',
  },
  {
    "type": "select", "field": "projectTypeCode", "title": "项目类型", "value": "",
    props: {
      placeholder: "请选择项目类型"
      //disabled: false
    },
    col: {
      span: 8,
      labelWidth: '100px'
    },
    class: 'w-100',
    options: []
  },
  {
    "type": "input", "field": "source", "title": "项目来源", "value": "",
    class: 'w-100',
    props: {
      placeholder: "请输入项目来源",
    },
    col: {
      span: 8,
      labelWidth: '100px'
    },
  },
  {
    "type": "input", "field": "projectName", "title": "申请名称", "value": "",
    props: {
      placeholder: "请输入申请名称",
    },
    col: {
      span: 8,
      labelWidth: '100px'
    }
  },
  {
    "type": "input", "field": "documentNumber", "title": "建议编号", "value": "",
    props: {
      placeholder: "请输入申报编号",
    },
    col: {
      span: 8,
      labelWidth: '100px'
    },
  },
  {
    "type": "commonSelect", "field": "statusCode", "title": "项目状态", "value": "",
    props: {
      placeholder: "请选择项目状态",
      typeName: "CONFIRM_STATUS",
      isSplicing: false,
      field: "statusCode"
    },
    col: {
      span: 8,
      labelWidth: '100px'
    },
    class: 'w-100',
    options: [],
  },
  {
    "type": "el-col",
    "title": "执行期限",
    children: [
      {
        "type": "DatePicker",
        "field": "startDate",
        "value": '',
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
        "type": "DatePicker",
        "field": "endDate",
        "value": '',
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
    class:'md0'
  },
  {
    "type": "input", "field": "keyWords", "title": "技术关键词", "value": "",
    class: 'w-100',
    props: {
      placeholder: "请输入技术关键词",
    },
    col: {
      span: 8,
      labelWidth: '100px'
    },
  },
  {
    "type": "input", "field": "projectLeaderName", "title": "项目负责人", "value": "",
    class: 'w-100',
    props: {
      placeholder: "请输入项目负责人",
    },
    col: {
      span: 8,
      labelWidth: '100px'
    },
  },
  {
    "type": "input", "field": "memberName", "title": "参与人", "value": "",
    class: 'w-100',
    props: {
      placeholder: "请输入参与人",
    },
    col: {
      span: 8,
      labelWidth: '100px'
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