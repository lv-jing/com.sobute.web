/**
 * 查询数据表单
 */

/* eslint-disable */


/**
 * 查询数据表单
 */
import moment from 'moment'

/* eslint-disable */
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
    "type": "DatePicker", "field": "year", "title": "年份", "value": "",
    class: 'w-100',
    props: {
      type: "year",
      placeholder: "请选择年份",
    },
    col: {
      span: 8,
      labelWidth: '100px'
    },
  },
  {
    "type": "input", "field": "documentNumber", "title": "计划编号", "value": "",
    props: {
      placeholder: "请输入考核编号",
    },
    col: {
      span: 8,
      labelWidth: '100px'
    },
    class: 'w-100',
    options: []
  },

  {
    type: "commonSelect",
    title: '状态',
    field: 'statusCode',
    value: '',
    props: {
      typeName: 'PLAN_STATUS',
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
      span: 16,
      labelWidth: '100px'
    },
    class: 'tr',
  },
]

// 基本信息
export const addFormRule = (_this) => [
  {
    type: 'common-title',
    name: 'title',
    props: {
      title: '项目基本信息'
    },
  },

  {
    "type": "input", "field": "documentNumber", "title": "计划编号", "value": "",
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
    "type": "commonSingleSelect", "field": "projectList", "title": "项目名称", "value": '',
    props: {
      placeholder: "请选择",
      filterable: true,
      returnObj: "file_project",
      transform: ["projectName", "projectNumber", "id"],
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
      },
      onChanges: (val, soucre) => _this.selectProjectAndYear(val, 'year', soucre)
    },
    col: {
      span: 8,
      labelWidth: '100px'
    },

    options: [],
    class: 'w-100',
    validate: [{ required: true, message: '项目名称不能为空', trigger: 'blur' },]
  },
  // {
  //     "type": "input", "field": "bonusAmount", "title": "项目奖金基数", "value": "",
  //     class: 'w-100',
  //     props: {
  //         placeholder: "请输入项目奖金基数",
  //     },
  //     col: {
  //         span: 8,
  //         labelWidth: '100px'
  //     },
  //     validate: [{ required: true, message: '项目奖金基数不能为空', whitespace: true, trigger: 'blur' },]

  // },

  {
    "type": "DatePicker", "field": "year", "title": "年份", "value": "",
    props: {
      placeholder: "选择年份",
      type: "year",
    },
    col: {
      span: 8,
      labelWidth: '100px'
    },
    class: 'w-100',
    emit: ['change'],
    emitPrefix: 'year',
    validate: [{ required: true, message: '选择年份', trigger: 'blur' },]

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
      title: '项目总体进展（限1000字）'
    },
  },
  {
    "type": "input", "field": "description", "title": "", "value": "",
    props: {
      type: 'textarea',
      placeholder: "回顾项目目前进展情况及已取得的主要成效，限1000字",
      rows: 5,
      maxlength: 1333,
      showWordLimit: true
    },
    col: {
      span: 24,
      labelWidth: '0px'
    }
  },

]
// 项目考核指标
export function addFormDrawerRule(_this) {

  return [
    {
      "type": "select", "field": "taskType", "title": "任务类型", "value": 1,
      props: {
        placeholder: "任务类型",
      },
      col: {
        span: 24,
        labelWidth: '110px'
      },
      options: [{
        label: '科研任务',
        value: 1
      }, {
        label: '技术服务',
        value: 2
      }, {
        label: '工程示范',
        value: 3
      }],
      class: 'w-100',
      emit: ['change'],
      emitPrefix: 'task',
      validate: [{ required: true, message: '任务类型不能为空', trigger: 'blur' },]
    },

    {
      "type": "input", "field": "taskName", "title": "任务名称", "value": "",
      props: {
        placeholder: "任务名称",
        type: 'textarea',
        rows: 6,
        maxlength: 1330
      },
      col: {
        span: 24,
        labelWidth: '110px'
      },
      validate: [{ required: true, message: '任务名称不能为空', trigger: 'blur' },]

    }, {
      "type": "input", "field": "taskTarget", "title": "考核指标", "value": "",
      props: {
        type: "textarea",
        autosize: { minRows: 3 },
        placeholder: "考核指标",
        showWordLimit: true,
        maxlength: 1333
      },
      col: {
        span: 24,
        labelWidth: '110px'
      },
      validate: [{ required: true, message: '考核指标不能为空', trigger: 'blur' },]

    },

    {
      "type": "commonSingleSelect", "field": "empolyeeCombobox", "title": "责任人", "value": '',
      props: {
        placeholder: "请选择",
        multiple: false,
        filterable: true,
        transform: ["empolyeeName", "empolyeeNumber"],
        request: {
          interfaceName: 'service/project/hr/duty-person',
          method: 'get',
          params: {
            params: {
              projectId: _this.projectId
            }
          }
        }
      },
      col: {
        span: 24,
        labelWidth: '110px'
      },
      class: 'w-100',
      validate: [{ required: true, message: '责任人不能为空', trigger: 'blur' },]

    },

    {
      "type": "commonSingleSelect", "field": "partakeEmpolyeeCombobox", "title": "参与人", "value": [],
      props: {
        placeholder: "请选择",
        multiple: true,
        filterable: true,
        transform: ["empolyeeName", "empolyeeNumber"],
        request: {
          interfaceName: 'service/project/hr/duty-person',
          method: 'get',
          params: {
            params: {
              projectId: _this.projectId
            }
          }
        }
      },
      col: {
        span: 24,
        labelWidth: '110px'
      },
      class: 'w-100',
      validate: [{ required: true, message: '参与人不能为空', trigger: 'blur' },]

    }, {
      "type": "inputNumber", "field": "weight", "title": "预计权重", "value": "",
      props: {
        placeholder: "预计权重",
        min: 0,
        max: 100
      },
      col: {
        span: 24,
        labelWidth: '110px'
      },
      class: 'w-100',
      validate: [{ required: true, message: '预计权重不能为空', trigger: 'blur' },]
    },
    {
      "type": "el-col",
      children: [
        {
          "type": "DatePicker",
          "field": "startDate",
          "title": "项目时间",
          "value": '',
          props: {
            placeholder: "开始时间",
            format: 'yyyy-MM-dd'
          },
          col: {
            span: 14,
            labelWidth: '110px'
          },
          class: 'w-97 md0',
          validate: [
            { required: true, message: '请选择项目开始时间', trigger: 'blur' },
            {
              trigger: 'blur',
              validator: (rule, value, callback) => {
                const {startDate,endDate} =_this.currentItemProject,
                  endTime = _this.addFormDrawerModel.getValue('endDate'),
                  _endTime = moment(endTime).format('YYYY-MM-DD'),
                  startTime=moment(value).format('YYYY-MM-DD');
                if (moment(startTime) > moment(endDate)) {
                  callback(new Error(`开始日期不能大于执行结束日期【${endDate}】`))
                } else if (moment(startTime) < moment(startDate)) {
                  callback(new Error(`开始日期不能小于执行开始日期【${startDate}】`))
                } else if (moment(startTime) > moment(_endTime)) {
                  callback(new Error('开始日期不能大于结束日期'))
                } else {
                  callback()
                }
              }
            }
          ]
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
            span: 10,
          },
          class: 'w-100 md0',
          validate: [
            { required: true, message: '请选择项目结束时间', trigger: 'blur' },
            {
              trigger: 'blur',
              validator: (rule, value, callback) => {
                const {startDate,endDate} =_this.currentItemProject,
                startTime = _this.addFormDrawerModel.getValue('startDate'),
                _startTime = moment(startTime).format('YYYY-MM-DD'),
                endTime=moment(value).format('YYYY-MM-DD');
              
                if (moment(endTime) < moment(startDate)) {
                  callback(new Error(`结束日期不能小于执行开始日期【${startDate}】`))
                } else if (moment(endTime) > moment(endDate)) {
                  callback(new Error(`结束日期不能大于执行结束日期【${endDate}】`))
                } else if (moment(endTime) < moment(_startTime)) {
                  callback(new Error('结束日期不能小于开始日期'))
                } else {
                  callback()
                }
              }
            }
          ]
        },
      ],
      col: {
        span: 24,
        labelWidth: '0'
      },
      class: 'md0',
    },

    {
      "type": "input", "field": "description", "title": "备注", "value": "",
      props: {
        type: "textarea",
        autosize: { minRows: 3 },
        placeholder: "备注",
        showWordLimit: true,
        maxlength: 1333
      },
      col: {
        span: 24,
        labelWidth: '110px'
      }
    },
  ]
}

//参与人员名单
export const addDrawerRule = (_this) => [
  
  {
    "type": "commonSingleSelect", "field": "employeeName", "title": "参与人", "value": '',
    props: {
      placeholder: "请选择",
      multiple: false,
      filterable: true,
      transform: ["empolyeeName", "empolyeeNumber"],
      request: {
        interfaceName: 'service/project/hr/duty-person',
        method: 'get',
        params: {
          params: {
            projectId: _this.projectId
          }
        }
      }
    },
    col: {
      span: 24,
      labelWidth: '100px'
    },
    class: 'w-100',
    validate: [{ required: true, message: '参与人不能为空', trigger: 'blur' },]

  },
  
  {
    "type": "inputNumber", "field": "month", "title": "参与月份数", "value": "",
    class: 'w-100',
    props: {
      placeholder: "请输入参与月份数",
      min: 0
    },
    col: {
      span: 24,
      labelWidth: '100px'
    },
    validate: [{ required: true, message: '参与月份数不能为空', trigger: 'blur' },]

  },
  {
    "type": "input", "field": "taskName", "title": "任务名称", "value": "",
    class: 'w-100',
    props: {
      placeholder: "请输入任务名称"
    },
    col: {
      span: 24,
      labelWidth: '100px'
    },
    validate: [{ required: true, message: '任务名称不能为空', trigger: 'blur' },]

  },
  {
    "type": "input", "field": "taskTarget", "title": "考核指标", "value": "",
    class: 'w-100',
    props: {
      type: "textarea",
      placeholder: "请输入任务名称",
      rows: 5,
      maxlength: 1333,
      showWordLimit: true
    },
    col: {
      span: 24,
      labelWidth: '100px'
    },
    validate: [{ required: true, message: '考核指标不能为空', trigger: 'blur' },]

  },

  {
    "type": "input", "field": "comments", "title": "备注", "value": "",
    class: 'w-100',
    props: {
      placeholder: "请输入备注"
    },
    col: {
      span: 24,
      labelWidth: '100px'
    },
  },
];
// 里程碑
export function addkeyRule(projectId) {
  return [
    
    {
      "type": "select", "field": "taskType", "title": "任务类型", "value": 1,
      props: {
        placeholder: "任务类型",
      },
      col: {
        span: 24,
        labelWidth: '110px'
      },
      options: [{
        label: '科研任务',
        value: 1
      }, {
        label: '技术服务',
        value: 2
      }, {
        label: '工程示范',
        value: 3
      }],
      class: 'w-100',
      emit: ['change'],
      emitPrefix: 'task',
      validate: [{ required: true, message: '任务类型不能为空', trigger: 'blur' },]
    },

    {
      "type": "input", "field": "taskName", "title": "任务名称", "value": "",
      props: {
        placeholder: "任务名称",
        type: 'textarea',
        rows: 6,
        maxlength: 1330
      },
      col: {
        span: 24,
        labelWidth: '110px'
      },
      validate: [{ required: true, message: '任务名称不能为空', trigger: 'blur' },]

    }, {
      "type": "input", "field": "taskTarget", "title": "考核指标", "value": "",
      props: {
        type: "textarea",
        autosize: { minRows: 3 },
        placeholder: "考核指标",
        showWordLimit: true,
        maxlength: 1333
      },
      col: {
        span: 24,
        labelWidth: '110px'
      },
      validate: [{ required: true, message: '考核指标不能为空', trigger: 'blur' },]

    },


    {
      "type": "commonSingleSelect", "field": "empolyeeCombobox", "title": "责任人", "value": '',
      props: {
        placeholder: "请选择",
        multiple: false,
        filterable: true,
        transform: ["empolyeeName", "empolyeeNumber"],
        request: {
          interfaceName: 'service/project/hr/duty-person',
          method: 'get',
          params: {
            params: {
              projectId
            }
          }
        }
      },
      col: {
        span: 24,
        labelWidth: '110px'
      },
      class: 'w-100',
      validate: [{ required: true, message: '责任人不能为空', trigger: 'blur' },]

    },

    {
      "type": "commonSingleSelect", "field": "partakeEmpolyeeCombobox", "title": "参与人", "value": [],
      props: {
        placeholder: "请选择",
        multiple: true,
        filterable: true,
        transform: ["empolyeeName", "empolyeeNumber"],
        request: {
          interfaceName: 'service/project/hr/duty-person',
          method: 'get',
          params: {
            params: {
              projectId
            }
          }
        }
      },
      col: {
        span: 24,
        labelWidth: '110px'
      },
      class: 'w-100',
      validate: [{ required: true, message: '参与人不能为空', trigger: 'blur' },]

    },
    {
      title: '完成时间',
      "type": "DatePicker",
      "field": "endDate",
      "value": '',
      props: {
        placeholder: "完成时间",
        format: 'yyyy-MM-dd'
      },
      col: {
        span: 24,
        labelWidth: '110px'
      },
      class: 'w-100 md0',
      validate: [
        { required: true, message: '请选择项目完成时间', trigger: 'blur' }
      ]
    },
    {
      "type": "input", "field": "description", "title": "备注", "value": "",
      props: {
        type: "textarea",
        autosize: { minRows: 3 },
        placeholder: "备注",
        showWordLimit: true,
        maxlength: 1333
      },
      col: {
        span: 24,
        labelWidth: '110px'
      }
    },
  ]
}
