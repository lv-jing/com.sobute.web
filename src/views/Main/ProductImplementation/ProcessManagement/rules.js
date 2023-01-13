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
    "type": "commonSelect", "field": "processDirection", "title": "工艺方向", "value": "",
    props: {
      placeholder: "请选择",
      typeName: "Pilot_Direction",
      field: "processDirection"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    class: 'w-100',
    options: [],
  },
  {
    "type": "commonSelect", "field": "type", "title": "工艺类型", "value": "",
    props: {
      placeholder: "请选择",
      typeName: "Process_Type",
      field: "type"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    class: 'w-100',
    options: [],
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
      "type": "input", "field": "documentNumber", "title": "工艺编号", "value": "",
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
          "type": "commonSelect", "field": "processDirection", "title": "工艺方向", "value": "",
          props: {
              placeholder: "请选择",
              typeName: "Pilot_Direction",
              field: "processDirection"
          },
          col: {
              span: 8,
              labelWidth: '130px'
          },
          class: 'w-100',
          options: [],
          validate: [{required: true, message: '请选择', trigger: 'blur'},],
      },
      {
          "type": "commonSelect", "field": "processType", "title": "工艺类型", "value": "",
          props: {
              placeholder: "请选择",
              typeName: "Process_Type",
              field: "processType",
              onChanges:(val)=>_this.ChangeProcessType(val)
          },
          col: {
              span: 8,
              labelWidth: '130px'
          },
          class: 'w-100',
          options: [],
          validate: [{required: true, message: '请选择', trigger: 'blur'},],

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
          "type": "input", "field": "originalDocumentNumber", "title": "原工艺文件编号", "value": "",
          props: {
              placeholder: "",
          },
          col: {
              span: 8,
              labelWidth: '130px'
          },
          validate: [{required: false, message: '原工艺文件编号不能为空', trigger: 'blur'},]

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
      type: 'common-title',
      name: 'title',
      props: {
        title: '理由描述',
        isClone: true
      },
    },
    {
      "type": "input", "field": "reasonDescription", "title": "", "value": "",
      props: {
        placeholder: "请输入理由描述",
        type: "textarea",
        autosize:{ minRows: 3},
        showWordLimit:true,
        maxlength:1333
      },
      col: {
        span: 24,
      },
        validate: [{required: true, message: '请输入理由描述', trigger: 'blur'},],
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
