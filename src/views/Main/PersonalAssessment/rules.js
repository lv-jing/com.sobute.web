/**
 * 查询数据表单
 */

/* eslint-disable */
export const searchFormRule = [
  {
    "type": "input", "field": "documentNumber", "title": "个人考核编号", "value": "",
    props: {
      placeholder: "请输入个人考核编号"
    },
    col: {
      span: 8,
      labelWidth: '110px'
    }
  },
  {
    "type": "input", "field": "employeeName", "title": "被考核人", "value": "",
    props: {
      placeholder: "请输入被考核人",
    },
    col: {
      span: 8,
      labelWidth: '110px'
    }
  },
  {
    "type": "DatePicker", "field": "year", "title": "考核年份", "value": "",
    props: {
      type: 'year',
      placeholder: "请选择考核年份",
    },
    class: 'w-100',
    col: {
      span: 8,
      labelWidth: '110px'
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
      span: 24,
      labelWidth: '100px'
    }
  },
]

export const addFormRule = [
  {
    "type": "input", "field": "documentNumber", "title": "考核编号", "value": "",
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
    "type": "commonAuto", "field": "employeeName", "title": "被考核人", "value": '',
    props: {
      placeholder: "请选择",
      multiple: false,
      filterable: true,
      collapseTags: false,
      transform: ["empolyeeName", "empolyeeNumber"],
      field: 'employeeName',
      remote: true,
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    class: 'w-100',
    validate: [{required: true, message: '被考核人不能为空', trigger: 'blur'},]
  },
  {
    "type": "DatePicker", "field": "year", "title": "考核年份", "value": "",
    props: {
      type: 'year',
      placeholder: "请选择"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    class: 'w-100',
    validate: [{required: true, message: '请选择考核年份', trigger: 'blur'},]
  },
  {
    "type": "input", "field": "proportionMonth", "title": "月考核平均比重", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    // validate: [{required: true, message: '请选择项目编号', trigger: 'blur'},]
  },
  {
    "type": "input", "field": "proportionAnnual", "title": "年度业绩比重", "value": "",
    props: {
      type: 'number',
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    // validate: [{required: true, message: '请输入', trigger: 'blur'},]
  },
  {
    "type": "input", "field": "proportionData", "title": "资料提交比重", "value": "",
    props: {
      type: 'number',
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    // validate: [{required: true, message: '请输入', trigger: 'blur'},]
  },
  {
    "type": "input", "field": "proportionComprehensive", "title": "综合素养比重", "value": "",
    props: {
      type: 'number',
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    // validate: [{required: true, message: '请输入', trigger: 'blur'},]
  },
  {
    "type": "input", "field": "coefficientAnnual", "title": "年度业绩系数", "value": "",
    props: {
      type: 'number',
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    // validate: [{required: true, message: '请输入', trigger: 'blur'},]
  },
  {
    "type": "input", "field": "coefficientData", "title": "资料提交系数", "value": "",
    props: {
      type: 'number',
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    // validate: [{required: true, message: '请输入', trigger: 'blur'},]
  },
  {
    "type": "input", "field": "coefficientComprehensive", "title": "综合素养系数", "value": "",
    props: {
      type: 'number',
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    // validate: [{required: true, message: '请输入', trigger: 'blur'},]
  },
  {
    "type": "input", "field": "wage", "title": "计薪基数", "value": "",
    props: {
      type: 'number',
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    // validate: [{required: true, message: '请输入', trigger: 'blur'},]
  },
  {
    "type": "input", "field": "proportionAverage", "title": "月平均系数", "value": "",
    props: {
      type: 'number',
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    // validate: [{required: true, message: '请输入', trigger: 'blur'},]
  },
  {
    "type": "input", "field": "rate", "title": "个人最终考核系数", "value": "",
    props: {
      type: 'number',
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    // validate: [{required: true, message: '请输入', trigger: 'blur'},]
  },
  {
    "type": "input", "field": "annualSalaryAssessment", "title": "考核年薪", "value": "",
    props: {
      type: 'number',
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    // validate: [{required: true, message: '请输入', trigger: 'blur'},]
  },
  {
    "type": "input", "field": "projectBonus", "title": "项目奖金", "value": "",
    props: {
      type: 'number',
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    // validate: [{required: true, message: '请输入', trigger: 'blur'},]
  },
  {
    "type": "input", "field": "otherBonus", "title": "其他奖励", "value": "",
    props: {
      type: 'number',
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    // validate: [{required: true, message: '请输入', trigger: 'blur'},]
  },
  {
    "type": "input", "field": "status", "title": "状态", "value": "",
    props: {
      placeholder: "",
      disabled: true
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    // validate: [{required: true, message: '请输入', trigger: 'blur'},]
  },
  {
    type: 'common-title',
    name: 'title',
    props: {
      title: '个人工作内容、主要贡献总结',
      isClone:false
    },
  },
  {
    "type": "input", "field": "description", "title": "", "value": "",
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

export const addDrawerRule = [
  {
    "type": "input", "field": "personalContent", "title": "个人年度考核内容", "value": "",
    props: {
      placeholder: "请输入",
    },
    col: {
      span: 24,
      labelWidth: '140px'
    },
    validate: [{required: true, message: '请输入', trigger: 'blur'},]
  },
  {
    "type": "input", "field": "annualAssessment", "title": "个人年度考核指标", "value": "",
    props: {
      placeholder: "请输入",
    },
    col: {
      span: 24,
      labelWidth: '140px'
    },
    validate: [{required: true, message: '请输入', trigger: 'blur'},]
  },
  // {
  //     "type": "select", "field": "projectName", "title": "参与项目名称", "value": "",
  //     props: {
  //         placeholder: "请输入",
  //         filterable: true
  //     },
  //     col: {
  //         span: 24,
  //         labelWidth: '140px'
  //     },
  //     class: 'w-100',
  //     options:[],
  //     validate: [{ required: true, message: '请输入', trigger: 'blur' },]
  // },
  {
    "type": "commonSingleSelect", "field": "projectName", "title": "参与项目名称", "value": "",
    props: {
      placeholder: "请选择",
      filterable: true,
      transform: ["projectName", "projectNumber", "id"],
      request: {
        interfaceName: '/service/project/confirm/list',
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
      span: 24,
      labelWidth: '140px'
    },
    options: [],
    class: 'w-100' 
    //validate: [{required: true, message: '参与项目名称不能为空', trigger: 'blur'},]
  },
  {
    "type": "input", "field": "selfReview", "title": "个人年度自评总结", "value": "",
    props: {
      placeholder: "请输入",
      type: "textarea",
      autosize:{ minRows: 3},
      showWordLimit:true,
      maxlength:1333
    },
    col: {
      span: 24,
      labelWidth: '140px'
    },
    validate: [{required: true, message: '请输入', trigger: 'blur'},]
  },
]