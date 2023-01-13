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
    "type": "input", "field": "number", "title": "总结编号", "value": "",
    props: {
      placeholder: "请输入总结编号",
    },
    col: {
      span: 8,
      labelWidth: '100px'
    }
  },

  {
    type: "commonSelect",
    title: '报告类型',
    field: 'typeCode',
    value: '',
    props: {
      typeName: 'REPORT_TYPE_OUT',
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
      labelWidth: '100px'
    },

  },
  {
    type: "DatePicker", field: "startDate", title: "提交日期", value: "",
    class: 'w-96',
    props: {
      valueFormat: "yyyy-MM-dd",
      placeholder: "开始期限",
    },
    col: {
      span: 5,
      labelWidth: '100px'
    },
  },
  {
    type: "DatePicker", field: "endDate", title: "-", value: "",
    class: 'w-97',
    props: {
      valueFormat: "yyyy-MM-dd",
      placeholder: "结束期限",
    },
    col: {
      span: 3,
      labelWidth: '8px'
    },
  },
  {
    "type": "input", "field": "createdByName", "title": "创建人", "value": "",
    props: {
      placeholder: "请输入创建人",
    },
    col: {
      span: 8,
      labelWidth: '100px'
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
      "type": "input", "field": "documentNumber", "title": "总结编号", "value": "",
      class: 'w-100',
      props: {
        placeholder: "请输入考核编号",
        disabled: true
      },
      col: {
        span: 8,
        labelWidth: '100px'
      },
      //  validate: [{ required: true, message: '考核编号不能为空', whitespace: true, trigger: 'blur' },]

    },
    {
      "type": "select", "field": "projectName", "title": "项目名称", "value": "",
      props: {
        placeholder: "请选择",
        filterable: true,
        clearable: true,
        filterMethod: (val) => {
          if (val) {
            //同时筛选Lable与value的值
            var options = _this.options1.filter(item => {
              if (
                !!~item.label.indexOf(val) ||
                !!~item.label.toUpperCase().indexOf(val.toUpperCase()) ||
                !!~item.value.indexOf(val) ||
                !!~item.value.toUpperCase().indexOf(val.toUpperCase())
              ) {
                return true;
              }
            });
          } else {
            //赋值还原
            var options = _this.options2;
          }
          _this.addEditFormModel.updateRule("projectName", {
            options
          }, true);
        }
      },
      col: {
        span: 8,
        labelWidth: '100px'
      },
      on: {
        clear: () => {
          _this.addEditFormModel.updateRule("projectName", {
            options: _this.options2
          }, true);
        },
        change: (val) => _this.addDrawChange(val)
      },
      class: 'w-100',
      validate: [{required: true, message: '请选择项目名称', trigger: 'blur'},]
    },
    {
      "type": "input", "field": "projectNumber", "title": "项目编号", "value": "",
      props: {
        placeholder: "自动带出",
        disabled: true
      },
      col: {
        span: 8,
        labelWidth: '100px'
      },
    },
    {
      type: "commonSelect",
      title: '报告类型',
      field: 'type',
      value: '',
      props: {
        typeName: 'REPORT_TYPE_OUT',
        field: 'type',
      },
      class: 'w-100',
      col: {
        span: 8,
        labelWidth: '100px'
      },
      validate: [{required: true, message: '报告类型不能为空', whitespace: true, trigger: 'blur'},]
    },
    {
      "type": "commonAuto", "field": "employeeName", "title": "责任人", "value": '',
      props: {
        placeholder: "责任人",
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
      validate: [{required: true, message: '责任人', trigger: 'blur'},]

    },
    {
      "type": "DatePicker", "field": "year", "title": "年度", "value": "",
      props: {
        placeholder: "选择年度",
        type: "year",
      },
      col: {
        span: 8,
        labelWidth: '100px'
      },
      class: 'w-100',
      validate: [{required: true, message: '选择年度', trigger: 'blur'},],
      emit: [{name: 'change', inject: true}],
      emitPrefix: 'form',
    },
    {
      type: 'common-title',
      name: 'title',
      props: {
        title: '重大进展（限500字）'
      },
    },
    {
      "type": "input", "field": "significance", "title": "", "value": "",
      props: {
        type: 'textarea',
        placeholder: "简要说明项目重大的进展与突破，限500字",
        rows: 5,
        maxlength: 500,
        showWordLimit: true

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
}

/**
 * 抽屉表单
 */

export function addDrawerRule(_this) {
  return [
    // {
    //     "type": "select", "field": "projectName", "title": "项目名称", "value": "",
    //     props: {
    //         placeholder: "请选择",
    //         filterable:true,
    //         clearable:true,
    //         filterMethod:(val)=>{
    //             if (val) {
    //                 //同时筛选Lable与value的值
    //                 var options = _this.options1.filter(item => {
    //                     if (
    //                         !!~item.label.indexOf(val) ||
    //                         !!~item.label.toUpperCase().indexOf(val.toUpperCase()) ||
    //                         !!~item.value.indexOf(val) ||
    //                         !!~item.value.toUpperCase().indexOf(val.toUpperCase())
    //                     ) {
    //                         return true;
    //                     }
    //                 });
    //             } else {
    //                 //赋值还原
    //                 var  options = _this.options2;
    //             }
    //             _this.addEditDrawerModel.updateRule("projectName", {
    //                 options
    //             }, true);
    //         }
    //     },
    //     col: {
    //         span: 24,
    //         labelWidth: '100px'
    //     },
    //     on:{
    //         clear:()=>{
    //             _this.addEditDrawerModel.updateRule("projectName", {
    //                 options:_this.options2
    //             }, true);
    //         },
    //         change: (val)=>_this.addDrawChange(val)
    //     },
    //     class: 'w-100',
    //     validate: [{ required: true, message: '请选择', trigger: 'blur' },]
    // },
    // {
    //     "type": "input", "field": "projectNumber", "title": "项目编号", "value": "",
    //     props: {
    //         placeholder: "",
    //         disabled: true
    //     },
    //     col: {
    //         span: 24,
    //         labelWidth: '100px'
    //     }
    // },
    {
      "type": "input", "field": "expectTarget", "title": "预期目标", "value": "",
      props: {
        placeholder: "请输入预期目标",
        type: "textarea",
        autosize: {minRows: 3},
        showWordLimit: true,
        maxlength: 1333
      },
      col: {
        span: 24,
        labelWidth: '100px'
      },
    },
    {
      "type": "input", "field": "performance", "title": "完成情况（限500字）", "value": "",
      props: {
        placeholder: "简要陈述主要完成情况，限500字。详细情况请在附件总结中详细说明",
        type: "textarea",
          autosize:{ minRows: 3},
        showWordLimit: true,
        maxlength: 500
      },
      col: {
        span: 24,
        labelWidth: '100px'
      },
    },
  ]
}
