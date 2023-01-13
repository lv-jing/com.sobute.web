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
    title: '总结类型',
    field: 'pgSummaryTypeCode',
    value: '',
    props: {
      typeName: 'SUMMARY_TYPE',
      field: 'type',
      isSplicing:false
      //  onChanges: (val) => _this.typeChange(val)
    },
    class: 'w-100',
    col: {
      span: 8,
      labelWidth: '100px'
    },

    // validate: [{ required: true, message: '总结类型不能为空', whitespace: true, trigger: 'blur' },]
  },
  {
    "type": "input", "field": "taskName", "title": "任务名称", "value": "",
    props: {
      placeholder: "请输入任务名称",
    },
    col: {
      span: 8,
      labelWidth: '100px'
    }
  },
  {
    "type": "input", "field": "taskNumber", "title": "任务编号", "value": "",
    props: {
      placeholder: "请输入任务编号",
    },
    col: {
      span: 8,
      labelWidth: '100px'
    }
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
    "type": "el-col",
    "title": "提交日期",
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
    "type": "input", "field": "createdByName", "title": "创建人", "value": "",
    class: 'w-100',
    props: {
      type: "year",
      placeholder: "请输入创建人",
    },
    col: {
      span: 8,
      labelWidth: '100px'
    },
  },
  {
    "type": "DatePicker", "field": "month", "title": "年月", "value": "",
    class: 'w-100',
    props: {
      type: "month",
      placeholder: "请选择年月",
    },
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
      emit: [{ name: 'click', inject: true }],
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
      emit: [{ name: 'click', inject: true }],
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
        labelWidth: '100px'
      },
      options: [],
      class: 'w-100',
      validate: [{ required: true, message: '请选择', trigger: 'blur' }]
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
      }
    },
    {
      type: "commonSelect",
      title: '计划类型',
      field: 'type',
      value: '',
      props: {
        transform:["name", "code","reservedField1"],
        typeName: 'REPORT_TYPE',
        field: 'type',
         onChanges: (val) => _this.typeChange(val)
      },
      class: 'w-100',
      col: {
        span: 8,
        labelWidth: '100px'
      },

      validate: [{ required: true, message: '计划类型不能为空', whitespace: true, trigger: 'blur' },]
    },
    {
      type: "DatePicker",
      title: "年月",
      field: "month",
      value: "",
      col: {
        span: 8,
        labelWidth: "100px"
      },
      props: {
        type: "month",
        placeholder: `请选择年月`,
      },
      class: "w-100",
      on: {
        change: () => {
          _this.list = [];
          _this.linesTaskList = [];
          _this.typeChange(_this.addEditFormModel.getValue('type'))
        }
      },
      validate: [
        {
          required: true,
          message: `年月不能为空`,
          trigger: "blur"
        }
      ]
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
        disabled: true
      },
      col: {
        span: 8,
        labelWidth: '100px'
      },
      class: 'w-100',
      validate: [{ required: true, message: '责任人', trigger: 'blur' },]
    },
    // {
    //   "type": "hidden", "field": "fillDate", "title": "填报日期", "value": "",
    //   props: {
    //     placeholder: "选择填报日期",
    //     type: "date",
    //   },
    //   col: {
    //     span: 8,
    //     labelWidth: '100px'
    //   },
    //   class: 'w-100',
    //   validate: [{ required: true, message: '选择填报日期', trigger: 'blur' },],
    //   emit: [{ name: 'change', inject: true }],
    //   emitPrefix: 'form',
    // },
    {
      type: "commonSelect",
      title: '总结类型',
      field: 'pgSummaryType',
      value: '',
      props: {
        typeName: 'SUMMARY_TYPE',
        field: 'type',
        //  onChanges: (val) => _this.typeChange(val)
      },
      class: 'w-100',
      col: {
        span: 8,
        labelWidth: '100px'
      },

      validate: [{ required: true, message: '总结类型不能为空', whitespace: true, trigger: 'blur' },]
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
        maxlength: 1330

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
        title: '项目计划完成情况',
        content: "任务名称可选项限制在操作人作为责任人，相关任务打开，任务与项目年份相同；如需缩小可选范围需把已完成的任务在任务分解行上把状态变为完成或关闭"
      },
    },

  ]
}
/**
 * 抽屉表单
 */
export function addDrawerRule(_this) {
  return [

    {
      "type": "commonSingleSelect", "field": "taskName", "title": "任务名称", "value": "",
      props: {
        placeholder: "请选择",
        filterable: true,
        transform: ["taskName", "taskNumber", "taskId", "taskTarget", "source"],
        request: {
          interfaceName: 'service/project/plan-target-view/list',
          method: 'get',
          params: {
            params: {
              ..._this.searchTaskParams,
              statusCode: '2005104',
              pageNum: 1,
              pageSize: -1
            }
          }
        },
        onChanges: (val) => _this.addDrawChange1(val, 1)
      },

      col: {
        span: 24,
        labelWidth: '100px'
      },
      options: [],
      class: 'w-100',
      validate: [{ required: true, message: '请选择任务名称', whitespace: true, trigger: 'blur' },]

    },
    {
      "type": "input", "field": "taskNumber", "title": "任务编号", "value": "",
      props: {
        placeholder: "自动带出",
        disabled: true
      },
      col: {
        span: 24,
        labelWidth: '100px'
      }
    },
    {
      "type": "input", "field": "taskTarget", "title": "任务指标", "value": "",
      props: {
        type: "textarea",
        placeholder: "自动带出",
        disabled: true,
        autosize: { minRows: 3 },
        showWordLimit: true,
        maxlength: 1333
      },
      col: {
        span: 24,
        labelWidth: '100px'
      }
    },
    {
      "type": "el-input-number", "field": "percentage", "title": "任务权重", "value": "",
      props: {
        placeholder: "",
        max: 100,
        min: 0
      },
      col: {
        span: 24,
        labelWidth: '100px'
      },
      class: 'w-100'
    },
    {
      "type": "el-input-number", "field": "completePercentage", "title": "完成百分比", "value": "",
      props: {
        placeholder: "请输入完成百分比",
        max: 100,
        min: 0
      },
      col: {
        span: 24,
        labelWidth: '100px'
      },
      class: 'w-100'
    },
    {
      "type": "input", "field": "performance", "title": "主要完成情况（限500字）", "value": "",
      props: {
        placeholder: "简要陈述主要完成情况，限500字。详细情况请在附件总结中详细说明",
        type: "textarea",
        rows: 6,
        showWordLimit: true,
        maxlength: 1333
      },
      col: {
        span: 24,
        labelWidth: '100px'
      },
    },
  ]
}
// 下月
export function addkeyRule(_this) {
  return [

    {
      "type": "commonSingleSelect", "field": "refTaskName", "title": "原任务名称", "value": "",
      props: {
        placeholder: "请选择",
        filterable: true,
        transform: ["taskName",  "taskNumber","id"],
        request: {
          interfaceName: 'service/project/task/selectlist',
          method: 'get',
          params: {
            params: {
              ..._this.searchTaskParams,
              
            }
          }
        },
        onClears:()=>_this.changeClearDate(false),
        onChanges: (val) => _this.addDrawChange1(val)
      },

      col: {
        span: 12,
        labelWidth: '100px'
      },
      options: [],
      class: 'w-100',
      // validate: [{ required: true, message: '请选择项目名称',  trigger: 'blur' },]

    },



    // {
    //   "type": "select", "field": "refTaskName", "title": "原任务名称", "value": "",
    //   props: {
    //     placeholder: "请选择",
    //     filterable: true,
    //     clearable: true,
    //     filterMethod: (val) => {
    //       if (val) {
    //         //同时筛选Lable与value的值
    //         var options = _this.options5.filter(item => {
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
    //         var options = _this.options6;
    //       }
    //       _this.addDrawerKeyModel.updateRule("refTaskName", {
    //         options
    //       }, true);
    //     }
    //   },
    //   col: {
    //     span: 12,
    //     labelWidth: '100px'
    //   },
    //   on: {
    //     clear: () => {
    //       _this.addDrawerKeyModel.updateRule("refTaskName", {
    //         options: _this.options6
    //       }, true);
    //       _this.changeClearDate(false)
    //     },
    //     change: (val) => _this.addDrawChange1(val)
    //   },
    //   class: 'w-100',
    //   // validate: [{ required: true, message: '请选择原任务名称', trigger: 'blur' },]
    // },
    {
      "type": "input", "field": "refTaskNumber", "title": "原任务编号", "value": "",
      props: {
        placeholder: "自动带出",
        disabled: true
      },
      col: {
        span: 12,
        labelWidth: '100px'
      }
    },
    {
      "type": "input", "field": "taskName", "title": "任务名称", "value": "",
      props: {
        placeholder: "请输入",
      },
      col: {
        span: 24,
        labelWidth: '100px'
      },
      validate: [{ required: true, message: '请输入任务名称', trigger: 'blur' },]
    },
    {
      "type": "input", "field": "taskTarget", "title": "任务指标", "value": "",
      props: {
        placeholder: "请输入",
        type: "textarea",
        autosize: { minRows: 3 },
        showWordLimit: true,
        maxlength: 1333
      },
      col: {
        span: 24,
        labelWidth: '100px'
      },
      validate: [{ required: true, message: '请输入任务指标', trigger: 'blur' },]
    },
    {
      "type": "select", "field": "taskType", "title": "任务类型", "value": "",
      props: {
        placeholder: "请选择类型",
      },
      col: {
        span: 12,
        labelWidth: '140px'
      },
      class: 'w-100',
      options: [{
        label: '科研任务',
        value: '1'
      }, {
        label: '技术服务',
        value: '2'
      }, {
        label: '工程示范',
        value: '3'
      }],
      validate: [{ required: true, message: '请选择任务类型', trigger: 'blur' },]
    },
    {
      "type": "select", "field": "employeeName", "title": "责任人", "value": '',
      props: {
        placeholder: "责任人",
        multiple: false
      },
      col: {
        span: 12,
        labelWidth: '110px'
      },
      class: 'w-100',
      validate: [{ required: true, message: '责任人不能为空', trigger: 'blur' },]

    },
    {
      "type": "DatePicker", "field": "startDate", "title": "开始时间", "value": "",
      props: {
        placeholder: "开始日期",
        format: 'yyyy-MM-dd'
      },
      col: {
        span: 12
      },
      class: 'w-100',
      // validate: [
      //   { required: true, message: '请选择开始时间', trigger: 'blur' },
      //   {
      //     trigger: 'blur',
      //     validator: (rule, value, callback) => {
      //       let time1 = new Date(_this.addDrawerKeyModel.getValue('startDate')).getTime();
      //       let time2 = new Date(_this.addDrawerKeyModel.getValue('endDate')).getTime();
      //       if (time1 - time2 > 0) {
      //         callback(new Error('开始日期不能大于结束日期'))
      //       } else {
      //         callback()
      //       }
      //     }
      //   }
      // ]
    },
    {
      "type": "DatePicker", "field": "endDate", "title": "结束时间", "value": "",
      props: {
        placeholder: "结束日期",
        format: 'yyyy-MM-dd'
      },
      col: {
        span: 12
      },
      class: 'w-100',

    },
  ]
}