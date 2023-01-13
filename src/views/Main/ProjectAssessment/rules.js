/**
 * 查询数据表单
 */

/* eslint-disable */
export const searchFormRule = [
  {
    "type": "input", "field": "documentNumber", "title": "考核编号", "value": "",
    props: {
      placeholder: "请输入考核编号"
    },
    col: {
      span: 8,
      labelWidth: '110px'
    }
  },
  {
    "type": "input", "field": "projectName", "title": "项目名称", "value": "",
    props: {
      placeholder: "请输入项目名称",
    },
    col: {
      span: 8,
      labelWidth: '110px'
    }
  },
  {
    "type": "DatePicker", "field": "year", "title": "年份", "value": "",
    props: {
      type: 'year',
      placeholder: "请选择年份",
    },
    class: 'w-100',
    col: {
      span: 8,
      labelWidth: '110px'
    },
    
  },
  {
    "type": "input", "field": "managerName", "title": "预评组长", "value": "",
    props: {
      placeholder: "请输入预评组长",
    },
    col: {
      span: 8,
      labelWidth: '110px'
    }
  },
  {
    "type": "commonSelect", "field": "statusCode", "title": "状态", "value": "",
    props: {
      placeholder: "请选择状态",
      typeName: "ASSESSMENT-STATUS",
      isSplicing: false,
      field: "statusCode"
    },
    col: {
      span: 8,
      labelWidth: '110px'
    },
    class: 'w-100',
    options: [],
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
        labelWidth: '110px'
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
        labelWidth: '110px'
      },
      emit: [{name: 'click', inject: true}],
      emitPrefix: 'form-reset',
    }],
    col: {
      span: 8,
      labelWidth: '110px'
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
      labelWidth: '110px'
    }
  },
  {
    "type": "commonSingleSelect", "field": "projectName", "title": "项目名称", "value": "",
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
      span: 8,
      labelWidth: '110px'
    },
    options: [],
    class: 'w-100',
    validate: [{required: true, message: '项目名称不能为空', trigger: 'blur'},]
  },
  {
    "type": "input", "field": "projectNumber", "title": "项目编号", "value": "",
    props: {
      placeholder: "",
      disabled: true
    },
    col: {
      span: 8,
      labelWidth: '110px'
    },
    // validate: [{required: true, message: '请选择项目编号', trigger: 'blur'},]
  },
  {
    "type": "DatePicker", "field": "year", "title": "年份", "value": "",
    props: {
      type: 'year',
      placeholder: "请选择"
    },
    col: {
      span: 8,
      labelWidth: '110px'
    },
    class: 'w-100',
    validate: [{required: true, message: '请选择年份', trigger: 'blur'},],
    emit: [{name: 'change'}],
    emitPrefix: 'date-year',
  },
  {
    "type": "input", "field": "bonusAmount", "title": "项目奖金基数", "value": "",
    props: {
      type: 'number',
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '110px'
    },
    // validate: [{required: true, message: '请输入', trigger: 'blur'},]
  },
  {
    "type": "input", "field": "score", "title": "项目考核系数", "value": "",
    props: {
      type: 'number',
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '110px'
    },
    // validate: [{required: true, message: '请输入', trigger: 'blur'},]
  },
  {
    "type": "commonSelect", "field": "managerName", "title": "预评组长", "value": "",
    props: {
      placeholder: "请选择",
      typeName: "PREASSESSMENT_PERSON",
      field: "managerName"
    },
    col: {
      span: 8,
      labelWidth: '110px'
    },
    class: 'w-100',
    options: [],
  },
  {
    "type": "commonSelect", "field": "membersList", "title": "预评组员", "value": "",
    props: {
      placeholder: "请选择",
      multiple: true,
      typeName: "PREASSESSMENT_PERSON",
      field: "membersList"
    },
    col: {
      span: 8,
      labelWidth: '110px'
    },
    class: 'w-100',
    options: [],
  },
  {
    "type": "input", "field": "status", "title": "状态", "value": "",
    props: {
      placeholder: "",
      disabled: true
    },
    col: {
      span: 8,
      labelWidth: '110px'
    },
    // validate: [{required: true, message: '请输入', trigger: 'blur'},]
  },
  {
    "type": "input", "field": "preReview", "title": "项目预评意见", "value": "",
    props: {
      type: "textarea",
      placeholder: "请输入",
      autosize: {minRows: 3},
      showWordLimit: true,
      maxlength: 1333
    },
    col: {
      span: 24,
      labelWidth: '110px'
    },
    // validate: [{ required: true, message: '请输入', trigger: 'blur' },]
  },
]

export function addDrawerRule(_this) {
  return [
    // {
    //   "type": "select", "field": "taskName", "title": "考核内容", "value": "",
    //   props: {
    //     placeholder: "请选择",
    //     filterable: true,
    //     clearable: true,
    //     filterMethod: (val) => {
    //       if (val) {
    //         //同时筛选Lable与value的值
    //         var options = _this.options1.filter(item => {
    //           if (
    //             !!~item.label.indexOf(val) ||
    //             !!~item.label.toUpperCase().indexOf(val.toUpperCase()) ||
    //             !!~item.value.indexOf(val) ||
    //             !!~item.value.toUpperCase().indexOf(val.toUpperCase())
    //           ) {
    //             return true;
    //           }
    //         });
    //       } else {
    //         //赋值还原
    //         var options = _this.options;
    //       }
    //       _this.addEditDrawerModel.updateRule("taskName", {
    //         options
    //       }, true);
    //     }
    //   },
    //   col: {
    //     span: 24,
    //     labelWidth: '100px'
    //   },
    //   on: {
    //     clear: () => {
    //       _this.addEditDrawerModel.updateRule("taskName", {
    //         options: _this.options
    //       }, true);
    //       _this.addEditDrawerModel.setValue(
    //         {'exam': ""},
    //         {'weight': ""},
    //         {'employeeName': ""},
    //       )
    //     },
    //     change: (val) => _this.handleDrawerChange(val)
    //   },
    //   class: 'w-100',
    //   validate: [{required: true, message: '请选择考核内容', trigger: 'blur'},]
    // },
    // {
    //   "type": "input", "field": "taskTarget", "title": "考核指标", "value": "",
    //   props: {
    //     type: "textarea",
    //     autosize: {minRows: 3},
    //     placeholder: "自动带出",
    //     disabled: true
    //   },
    //   col: {
    //     span: 24,
    //     labelWidth: '100px'
    //   },
    //   // validate: [{ required: true, message: '请输入', trigger: 'blur' },]
    // },
    // {
    //   "type": "input", "field": "weight", "title": "预计权重", "value": "",
    //   props: {
    //     placeholder: "自动带出",
    //     disabled: true
    //   },
    //   col: {
    //     span: 12,
    //     labelWidth: '100px'
    //   },
    //   // validate: [{ required: true, message: '请输入', trigger: 'blur' },]
    // },
    // {
    //   "type": "input", "field": "employeeName", "title": "参与人员", "value": "",
    //   props: {
    //     placeholder: "自动带出",
    //     disabled: true
    //   },
    //   col: {
    //     span: 12,
    //     labelWidth: '100px'
    //   },
    //   // validate: [{ required: true, message: '请输入', trigger: 'blur' },]
    // },
    {
      "type": "input", "field": "selfReview", "title": "自评总结", "value": "",
      props: {
        type: "textarea",
        placeholder: "请输入",
        autosize: {minRows: 3},
        showWordLimit: true,
        maxlength: 1333
      },
      col: {
        span: 24,
        labelWidth: '100px'
      },
      // validate: [{ required: true, message: '请输入', trigger: 'blur' },]
    },
    {
      "type": "commonSelect", "field": "comprehensiveLevel", "title": "预评等级", "value": "",
      props: {
        placeholder: "请选择",
        typeName: "COMPREHENSIVE_GRADE",
        transform: ["name"],
        isSplicing: true,
        clearable: true,
        field: "comprehensiveLevel"
      },
      col: {
        span: 12,
        labelWidth: '130px'
      },
      class: 'w-100',
      options: [],
    },
    {
      "type": "input", "field": "actualWeight", "title": "实际权重", "value": "",
      props: {
        type: "number",
        placeholder: "请输入"
      },
      col: {
        span: 12,
        labelWidth: '100px'
      },
      // validate: [{ required: true, message: '请输入', trigger: 'blur' },]
    },
    {
      "type": "input", "field": "preReview", "title": "预评意见", "value": "",
      props: {
        type: "textarea",
        placeholder: "请输入",
        autosize: {minRows: 3},
        showWordLimit: true,
        maxlength: 1333
      },
      col: {
        span: 24,
        labelWidth: '100px'
      },
      // validate: [{ required: true, message: '请输入', trigger: 'blur' },]
    },

  ]
}
