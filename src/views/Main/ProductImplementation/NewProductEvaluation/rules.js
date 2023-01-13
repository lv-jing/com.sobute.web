/**
 * 查询数据表单
 */
/* eslint-disable */

export const searchFormRule = [
  {
    "type": "input", "field": "applicantName", "title": "申请人", "value": "",
    props: {
      placeholder: "请输入申请人",
    },
    col: {
      span: 8,
      labelWidth: '130px'
    }
  },
  {
    "type": "input", "field": "productName", "title": "产品名称", "value": "",
    props: {
      placeholder: "请输入产品名称",
    },
    col: {
      span: 8,
      labelWidth: '130px'
    }
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
    },
    class: 'tr',
  },
]


/**
 * 抽屉表单
 */
export function addFormRule(_this) {
  return [
    {
      type: 'common-title',
      name: 'title',
      props: {
        title: '基本信息'
      },
    },
    {
      "type": "input", "field": "evaluationNumber", "title": "新产品评价编号", "value": "",
      props: {
        placeholder: "",
        disabled: true
      },
      col: {
        span: 8,
        labelWidth: '130px'
      }
    },
    {
      "type": "commonSingleSelect", "field": "documentNumber", "title": "中试编号", "value": "",
      props: {
        placeholder: "请选择",
        filterable: true,
        transform: ["documentNumber", "id"],
        request: {
          interfaceName: '/service/project/pilotTest/list',
          method: 'get',
          params: {
            params: {
              statusCode: 2005104,
              pageNum: 1,
              pageSize: -1
            }
          }
        },
        // onChanges: (val) => _this.addDrawChange(val),
        // onClears: (val) => _this.addDrawChange(val),
      },
      col: {
        span: 8,
        labelWidth: '130px'
      },
      options: [],
      class: 'w-100'
    },
    {
      "type": "commonSingleSelect", "field": "productionNumber", "title": "试生产编号", "value": "",
      props: {
        placeholder: "请选择",
        filterable: true,
        transform: ["productionNumber", "id"],
        request: {
          interfaceName: '/service/project/pilotProduction/list',
          method: 'get',
          params: {
            params: {
              statusCode: 2005104,
              pageNum: 1,
              pageSize: -1
            }
          }
        },
        // onChanges: (val) => _this.addDrawChange(val),
        // onClears: (val) => _this.addDrawChange(val),
      },
      col: {
        span: 8,
        labelWidth: '130px'
      },
      options: [],
      class: 'w-100'
    },
    {
      "type": "commonAuto", "field": "employeeNumber", "title": "申请人", "value": '',
      props: {
        placeholder: "责任人",
        multiple: false,
        filterable: true,
        collapseTags: false,
        field: 'employeeNumber',
        remote: true,
      },
      col: {
        span: 8,
        labelWidth: '130px'
      },
      class: 'w-100',
      validate: [{required: true, message: '申请人不能为空', trigger: 'blur'},]
    },
    {
      "type": "DatePicker", "field": "applyDate", "title": "申请时间", "value": "",
      props: {
        placeholder: "请选择"
      },
      col: {
        span: 8,
        labelWidth: '130px'
      },
      class: 'w-100',
      validate: [{required: true, message: '请选择', trigger: 'blur'},],
      emit: [{name: 'change', inject: true}],
      emitPrefix: 'form-change',
    },
    {
      "type": "commonSingleSelect", "field": "projectName", "title": "关联项目", "value": "",
      props: {
        placeholder: "请选择",
        filterable: true,
        transform: ["projectName", "projectNumber", "id"],
        request: {
          interfaceName: '/service/project/confirm/list',
          method: 'get',
          params: {
            params: {
              projectNumber:'PM1',
              statusCode: 2005104,
              pageNum: 1,
              pageSize: -1
            }
          }
        },
        onChanges: (val) => _this.addDrawChange(val),
        onClears: (val) => _this.addDrawChange(val),
      },
      col: {
        span: 8,
        labelWidth: '130px'
      },
      options: [],
      class: 'w-100',
      validate: [{ required: true, message: '请选择', trigger: 'blur' }]
    },
    {
      "type": "input", "field": "respEmployeeName", "title": "项目负责人", "value": "",
      props: {
        placeholder: "自动带出",
        disabled: true
      },
      col: {
        span: 8,
        labelWidth: '130px'
      },
      //validate: [{required: true, message: '项目负责人不能为空', trigger: 'blur'},]
    },
    {
      "type": "input", "field": "productNumber", "title": "产品编号", "value": "",
      props: {
        placeholder: "",
      },
      col: {
        span: 8,
        labelWidth: '130px'
      },
      validate: [{required: true, message: '请输入产品编号', trigger: 'blur'},],
    },
    {
      "type": "input", "field": "productName", "title": "产品名称", "value": "",
      props: {
        placeholder: "",
      },
      col: {
        span: 8,
        labelWidth: '130px'
      },
      validate: [{required: true, message: '请输入产品名称', trigger: 'blur'},],
    },
    {
      "type": "input", "field": "standards", "title": "执行标准", "value": "",
      props: {
        placeholder: "",
      },
      col: {
        span: 8,
        labelWidth: '130px'
      },
      validate: [{required: true, message: '请输入执行标准', trigger: 'blur'},],
    },
    {
      "type": "commonSelect", "field": "evaluationType", "title": "评价类型", "value": "",
      props: {
        placeholder: "请选择",
        typeName: "EVALUATION_TYPE",
        field: "evaluationType"
      },
      col: {
        span: 8,
        labelWidth: '130px'
      },
      class: 'w-100',
      validate: [{required: true, message: '请选择', trigger: 'blur'},],
      options: [],
    },
    {
      "type": "commonSelect", "field": "evaluationDepartment", "title": "评价部门", "value": "",
      props: {
        placeholder: "请选择",
        typeName: "EVALUATION_DEPARTMENT",
        field: "evaluationDepartment"
      },
      col: {
        span: 8,
        labelWidth: '130px'
      },
      class: 'w-100',
      validate: [{required: true, message: '请选择', trigger: 'blur'},],
      options: [],
    },
    {
      type: 'common-title',
      name: 'title',
      props: {
        title: '预期目标',
        isClone: true
      },
    },
    {
      "type": "input", "field": "target", "title": "", "value": "",
      props: {
        placeholder: "请输入",
        type: "textarea",
        autosize:{ minRows: 3},
        showWordLimit:true,
        maxlength:1333
      },
      col: {
        span: 24,
      },
      validate: [{required: true, message: '请输入预期目标', trigger: 'blur'},],
    },
    {
      type: 'common-title',
      name: 'title',
      props: {
        title: '备注'
      },
    },
    {
      "type": "input", "field": "remarks", "title": "", "value": "",
      props: {
        placeholder: "请输入",
        type: "textarea",
        autosize:{ minRows: 3},
        showWordLimit:true,
        maxlength:1333
      },
      col: {
        span: 24,
      },
    },

  ]
}
