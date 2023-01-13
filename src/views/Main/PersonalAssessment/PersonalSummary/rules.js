/**
 * 查询数据表单
 */

/* eslint-disable */


/**
 * 查询数据表单
 */

export const searchFormRule = [

  {
    "type": "input", "field": "DocumentNumber", "title": "个人总结编号", "value": "",
    props: {
      placeholder: "个人总结编号",
    },
    col: {
      span: 8,
      labelWidth: '150px'
    }
  },

  {
    type: "commonSelect",
    title: '个人报告类型',
    field: 'typeCode',
    value: '',
    props: {
      typeName: 'PERSONAL_SUMMARY_TYPE',
      isSplicing: false,
      field: 'typeCode',
    },

    class: 'w-100',
    col: {
      span: 8,
      labelWidth: '150px'
    },

  },
  {
    type: "commonSelect",
    title: '报告状态',
    field: 'statusCode',
    value: '',
    props: {
      typeName: 'SUMMARY_STATUS',
      isSplicing: false,
      field: 'statusCode',
    },

    class: 'w-100',
    col: {
      span: 8,
      labelWidth: '150px'
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
        labelWidth: '150px'
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
        labelWidth: '150px'
      },
      emit: [{name: 'click', inject: true}],
      emitPrefix: 'form-reset',
    }],
    col: {
      span: 24,
      labelWidth: '150px'
    },
    class: 'tr',
  },
]


export const addFormRule = [
  {
    type: 'common-title',
    name: 'title',
    props: {
      title: '个人总结基本信息'
    },
  },
  {
    "type": "input", "field": "documentNumber", "title": "个人总结编号", "value": "",
    class: 'w-100',
    props: {
      placeholder: "请输入个人总结编号",
      disabled: true
    },
    col: {
      span: 8,
      labelWidth: '150px'
    },

  },
  {
    type: "commonSelect",
    title: '个人报告类型:',
    field: 'type',
    value: '',
    props: {
      typeName: 'PERSONAL_SUMMARY_TYPE',
      field: 'type',
    },

    class: 'w-100',
    col: {
      span: 8,
      labelWidth: '150px'
    },
    validate: [{required: true, message: '请选择个人报告类型', trigger: 'blur'},]
  },
  {
    "type": "commonAuto", "field": "employeeName", "title": "报告人", "value": "",
    props: {
      placeholder: "请输入报告人",
      multiple: false,
      filterable: true,
      collapseTags: false,
      field: 'employeeName',
      remote: true,
    },
    col: {
      span: 8,
      labelWidth: '150px'
    },
    validate: [{required: true, message: '报告人', trigger: 'blur'},]

  },
  {
    "type": "DatePicker", "field": "fillDate", "title": "填报日期", "value": "",
    props: {
      placeholder: "选择填报日期",
      type: "date",
    },
    col: {
      span: 8,
      labelWidth: '150px'
    },
    class: 'w-100',
    validate: [{required: true, message: '选择填报日期', trigger: 'blur'},]

  },
  {
    "type": "input", "field": "department", "title": "所属部门", "value": "",
    props: {
      placeholder: "请输入所属部门",
      disabled: true
    },
    col: {
      span: 8,
      labelWidth: '150px'
    }
  },
  {
    type: 'common-title',
    name: 'title',
    props: {
      title: '重大进展'
    },
  },
  {
    "type": "input", "field": "significance", "title": "", "value": "",
    props: {
      type: 'textarea',
      placeholder: "请输入重大进展",
      rows: 5,
      showWordLimit:true,
      maxlength: 1333

    },
    col: {
      span: 24,
      labelWidth: '0px'
    }
  },


  {
    type: 'common-title',
    name: 'title',
    props: {
      title: '项目计划完成情况'
    },
  },

]

/**
 * 抽屉表单
 */

export function addDrawerRule(_this) {
  return [
    // {
    //   "type": "select", "field": "projectName", "title": "项目名称", "value": "",
    //   props: {
    //     placeholder: "请选择",
    //     filterable:true,
    //     clearable:true,
    //     filterMethod:(val)=>{
    //       if (val) {
    //         //同时筛选Lable与value的值
    //         var options = _this.options1.filter(item => {
    //           if (
    //               !!~item.label.indexOf(val) ||
    //               !!~item.label.toUpperCase().indexOf(val.toUpperCase()) ||
    //               !!~item.value.indexOf(val) ||
    //               !!~item.value.toUpperCase().indexOf(val.toUpperCase())
    //           ) {
    //             return true;
    //           }
    //         });
    //       } else {
    //         //赋值还原
    //         var  options = _this.options2;
    //       }
    //       _this.addEditDrawerModel.updateRule("projectName", {
    //         options
    //       }, true);
    //     }
    //   },
    //   col: {
    //     span: 24,
    //     labelWidth: '100px'
    //   },
    //   on:{
    //     clear:()=>{
    //       _this.addEditDrawerModel.updateRule("projectName", {
    //         options:_this.options2
    //       }, true);
    //     },
    //     change: (val)=>_this.addDrawChange(val)
    //   },
    //   class: 'w-100',
    //   //validate: [{ required: true, message: '请选择', trigger: 'blur' },]
    // },
    // {
    //   "type": "input", "field": "projectNumber", "title": "项目编号", "value": "",
    //   props: {
    //     placeholder: "自动带出",
    //     disabled: true
    //   },
    //   col: {
    //     span: 24,
    //     labelWidth: '100px'
    //   }
    // },
    // {
    //   "type": "select", "field": "taskName", "title": "任务名称", "value": "",
    //   props: {
    //     placeholder: "请选择",
    //     filterable:true,
    //     clearable:true,
    //     filterMethod:(val)=>{
    //       console.log(_this.options3, _this.options4);
    //       if (val) {
    //         //同时筛选Lable与value的值
    //         var options = _this.options3.filter(item => {
    //           if (
    //               !!~item.label.indexOf(val) ||
    //               !!~item.label.toUpperCase().indexOf(val.toUpperCase()) ||
    //               !!~item.value.indexOf(val) ||
    //               !!~item.value.toUpperCase().indexOf(val.toUpperCase())
    //           ) {
    //             return true;
    //           }
    //         });
    //       } else {
    //         //赋值还原
    //         var  options = _this.options4;
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
    //   on:{
    //     clear:()=>{
    //       _this.addEditDrawerModel.updateRule("taskName", {
    //         options:_this.options4
    //       }, true);
    //     },
    //     change: (val)=>_this.addDrawChange1(val)
    //   },
    //   class: 'w-100',
    //   // validate: [{ required: true, message: '请选择', trigger: 'blur' },]
    // },
    // {
    //   "type": "input", "field": "taskNumber", "title": "任务编号", "value": "",
    //   props: {
    //     placeholder: "自动带出",
    //     disabled: true
    //   },
    //   col: {
    //     span: 24,
    //     labelWidth: '100px'
    //   }
    // },
    // {
    //   "type": "input", "field": "taskTarget", "title": "任务指标", "value": "",
    //   props: {
    //     placeholder: "自动带出",
    //     disabled: true
    //   },
    //   col: {
    //     span: 24,
    //     labelWidth: '100px'
    //   }
    // },
    // {
    //   "type": "el-input-number", "field": "percentage", "title": "完成百分比", "value": "",
    //   props: {
    //     placeholder: ""
    //   },
    //   col: {
    //     span: 24,
    //     labelWidth: '100px'
    //   },
    //   class: 'w-100'
    // },
    {
      "type": "input", "field": "expectTarget", "title": "预期目标", "value": "",
      props: {
        placeholder: "请输入预期目标",
        type: "textarea",
        rows: 8,
        showWordLimit:true,
        maxlength:1333
      },
      col: {
        span: 24,
        labelWidth: '100px'
      },
    },
    {
      "type": "input", "field": "performance", "title": "主要完成情况", "value": "",
      props: {
        placeholder: "请输入完成情况",
        type: "textarea",
        rows: 10,
        showWordLimit:true,
        maxlength:1333
      },
      col: {
        span: 24,
        labelWidth: '100px'
      },
    },
  ]
}
