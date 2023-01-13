/**
 * 查询数据表单
 */

/* eslint-disable */


/**
 * 查询数据表单
 */
/* eslint-disable */
export const searchFormRule = [
  // {
  //   "type": "input", "field": "projectName", "title": "项目名称", "value": "",
  //   props: {
  //     placeholder: "请输入项目名称",
  //   },
  //   col: {
  //     span: 8,
  //     labelWidth: '100px'
  //   },
  //   class: 'w-100',
  //   options: []
  // },
  {
    "type": "commonSingleSelect", "field": "projectId", "title": "项目名称", "value": '',
    props: {
      isSplicing:false,
      placeholder: "请选择",
      filterable: true,
      transform: ["projectName", "id"],
      request: {
        interfaceName: 'service/project/confirm/list',
        method: 'get',
        params: {
          params: {
            applyType:0,
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
    // validate: [{required: true, message: '项目名称不能为空', trigger: 'blur'},]
  },
  // {
  //   "type": "input", "field": "projectNumber", "title": "项目编号", "value": "",
  //   props: {
  //     placeholder: "请输入项目编号",
  //   },
  //   col: {
  //     span: 8,
  //     labelWidth: '100px'
  //   }
  // },
  {
    "type": "select", "field": "taskType", "title": "任务类型", "value": "",
    props: {
      placeholder: "任务类型",
    },
    col: {
      span: 8,
      labelWidth: '100px'
    },
    options: [
      {
        label: '全部',
        value: ''
      },
      {
        label: '科研任务',
        value: '1'
      }, {
        label: '技术服务',
        value: '2'
      }, {
        label: '工程示范',
        value: '3'
      }],
    class: 'w-100',
  },
  {
    "type": "input", "field": "taskName", "title": "任务名称", "value": "",
    props: {
      placeholder: "请输入任务名称",
    },
    col: {
      span: 8,
      labelWidth: '100px'
    },
    class: 'w-100',
    options: []
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
    title: '状态',
    field: 'statusCode',
    value: '',
    props: {
      typeName: 'TASK_STATUS',
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
    "type": "input", "field": "level1", "title": "任务层级", "value": "",
    props: {
      type: "number",
      min: 1,
      max: 10,
      placeholder: "请输入整数任务层级",
    },
    col: {
      span: 8,
      labelWidth: '100px'
    },
    class: 'w-100',
  },
  {
    "type": "input", "field": "empolyeeName", "title": "责任人", "value": "",
    props: {
      placeholder: "请输入责任人",
    },
    col: {
      span: 8,
      labelWidth: '100px'
    },
    class: 'w-100',
  },
  {
    "type": "input", "field": "partakeEmpolyeeName", "title": "参与人", "value": "",
    props: {
      placeholder: "请输入参与人",
    },
    col: {
      span: 8,
      labelWidth: '100px'
    },
    class: 'w-100',
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
    class: 'md0'
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
    "type": "DatePicker", "field": "month", "title": "月份", "value": "",
    class: 'w-100',
    props: {
      type: "month",
      placeholder: "请选择月份",
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
      span: 8,
      labelWidth: '100px'
    },
    class: 'tr',
  },
]


/**
 * 抽屉表单
 */

export function addFormDrawerRule(_this) {


  return [
    {
      type: 'common-title',
      name: 'title',
      props: {
        title: '任务分解',
        content:"项目负责人作年度、季度、月度分解；项目参与人作年度和月度分解；总结完成时可修改任务状态为完成"
      },
    },
    {
      "type": "select", "field": "taskType", "title": "任务类型", "value": "1",
      props: {
        placeholder: "任务类型",
      },
      col: {
        span: 12,
        labelWidth: '120px'
      },
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
      class: 'w-100',
      emit: ['change'],
      emitPrefix: 'task',
      validate: [{required: true, message: '任务类型不能为空', whitespace: true, trigger: 'blur'},]
    },
    {
      type: "commonSelect",
      title: '计划类型',
      field: 'summaryType',
      value: '',
      props: {
        typeName: 'REPORT_TYPE',
        field: 'summaryType',
        onChanges(val){
          _this.summaryTypeChange(val)
        }
      },
      class: 'w-100',
      col: {
        span: 12,
        labelWidth: '120px'
      },
      validate: [{ required:true, message: '计划类型不能为空', whitespace: true, trigger: 'blur' },]
    },
    {
      title: "报告月份",
      type: "DatePicker",
      field: "month",
      value: '',
      props: {
        placeholder: "报告月份",
        type: "month"
      },
      col: {
        span: 24,
        labelWidth: "120px"
      },
      class: "w-100",
      // validate: [
      //   { required: true, message: "报告月份不能为空", trigger: "blur" }
      // ]
    },

    
    {
      type: "commonSelect",
      title: '节点类型',
      field: 'nodeType',
      value: '',
      props: {
        typeName: 'NODE_TYPE',
      },
      class: 'w-100',
      col: {
        span: 24,
        labelWidth: '120px'
      },
      validate: [{ required:true, message: '节点类型不能为空', whitespace: true, trigger: 'blur' },]
    },

    {
      "type": "input", "field": "taskName", "title": "任务名称", "value": "",
      props: {
        placeholder: "任务名称",
      },
      col: {
        span: 24,
        labelWidth: '120px'
      },
      validate: [{required: true, message: '任务名称不能为空', trigger: 'blur'},]

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
        checkStrictly:true
      },
      col: {
        span: 24,
        labelWidth: '120px'
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
        checkStrictly:true
      },
      col: {
        span: 24,
        labelWidth: '120px'
      },
      options: [],
      // validate: [{ required: true, message: '请选择项目来源', whitespace: true, trigger: 'blur' },]
    },
    {
      "type": "input", "field": "taskTarget", "title": "任务指标", "value": "",
      props: {
        type: 'textarea',
        placeholder: "任务指标",
        rows: 5,
        maxlength: 1333,
        showWordLimit:true

      },
      col: {
        span: 24,
        labelWidth: '120px'
      },
      validate: [{ required: true, message: '任务指标不能为空', trigger: 'blur' },]

    },
   
    {
      "type": "select", "field": "empolyeeCombobox", "title": "责任人", "value": '',
      props: {
        placeholder: "责任人",
        multiple: false,

      },
      col: {
        span: 24,
        labelWidth: '120px'
      },
      class: 'w-100',
      validate: [{ required: true, message: '责任人不能为空', trigger: 'blur' },]

    },
    {
      "type": "select", "field": "partakeEmpolyeeCombobox", "title": "参与人员", "value": [],
      props: {
        placeholder: "参与人员",
        multiple: true,

      },
      col: {
        span: 24,
        labelWidth: '120px'
      },
      class: 'w-100',
      validate: [{ required: true, message: '参与人员不能为空', trigger: 'blur' },]

    },
    {
      "type": "el-col",
      children: [
        {
          "type": "DatePicker",
          "field": "startDate",
          "title": "任务日期",
          "value": '',
          props: {
            placeholder: "开始时间",
            format: 'yyyy-MM-dd'
          },
          col: {
            span: 15,
            labelWidth: '120px'
          },
          class: 'w-100 md0',
          validate: [
            {required: true, message: '请选择任务开始时间', trigger: 'blur'},
            {
              trigger: 'blur',
              validator: (rule, value, callback)=>{
                let time1 = new Date(_this.addFormDrawerModel.getValue('startDate')).getTime();
                let time2 = new Date(_this.addFormDrawerModel.getValue('endDate')).getTime();
                if(time1-time2>0){
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
            span: 9,
          },
          class: 'w-100 ml5',
          validate: [
            {required: true, message: '请选择任务结束时间', trigger: 'blur'},
            {
              trigger: 'blur',
              validator: (rule, value, callback)=>{
                let time1 = new Date(_this.addFormDrawerModel.getValue('startDate')).getTime();
                let time2 = new Date(_this.addFormDrawerModel.getValue('endDate')).getTime();
                if(time1-time2>0){
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
        placeholder: "备注",
        type:'textarea',
        showWordLimit:true,
        maxlength:1333
      },
      col: {
        span: 24,
        labelWidth: '120px'
      },
      // validate: [{ required: true, message: '里程碑节点不能为空', trigger: 'blur' },]

    },
    {
      type: "switch",
      title: "是否末级",
      field: "finalFlag",
      value: true,
      props: {
        activeValue: false,
        inactiveValue: true,
      },
      col: {
        span: 12,
        labelWidth: '120px'
      }
    },
    {
      type: "commonSelect",
      title: "任务状态",
      field: "status",
      value: "打开⭐2049101",
      props: {
        "field": "status",
        typeName: 'TASK_STATUS',
      },
      options: [],
      col: {
        span: 12,
      },
      validate: [{required: true, message: '请选择任务状态', whitespace: true, trigger: 'blur'},]

    }, 
    // {
    //   "type": "commonSelect", "field": "milestoneNodeList", "title": "里程碑节点", "value": [],
    //   props: {
    //     placeholder: "里程碑节点",
    //     typeName: 'MILESTONE_NODE_RES',
    //     field: 'milestoneNodeList',
    //     multiple: true
    //   },
    //   col: {
    //     span: 24,
    //   },
    //   class: 'w-100',
    //   // validate: [{ required: true, message: '里程碑节点不能为空', trigger: 'blur' },]

    // },  {
    //   "type": "input", "field": "yearNode", "title": "年度关键节点", "value": "",
    //   props: {
    //     placeholder: "年度关键节点",
    //   },
    //   col: {
    //     span: 24,
    //     labelWidth: '120px'
    //   },
    //   // validate: [{ required: true, message: '里程碑节点不能为空', trigger: 'blur' },]

    // }
  ]
}


export function allType(params = {}) {
  return {
    "1": [{
      "type": "commonSingleSelect", "field": "projectList", "title": "关联项目名称", "value": [],
      props: {
        placeholder: "请选择",
        filterable: true,
        multiple: true,
        transform: ["projectName", "projectNumber", "id"],
        request: {
          interfaceName: 'service/project/confirm/checkbox',
          method: 'get',
          params: {
            params: {
              projectNumber:'PM2',
              statusCode: 2005104,
              pageNum: 1,
              pageSize: -1
            }
          }
        }
      },
      col: {
        span: 24
      },
      options: [],
      class: 'w-100',
      // validate: [{ required: true, message: '项目名称不能为空', trigger: 'blur' },]
    },],
    "2": [{
      "type": "input", "field": "customerName", "title": "工程/客户名称", "value": "",
      props: {
        placeholder: "工程/客户名称"
      },
      col: {
        span: 24,
      },
      // validate: [{ required: true, message: '里程碑节点不能为空', trigger: 'blur' },]

    }, {
      "type": "input", "field": "profile", "title": "工程/客户概况", "value": "",
      props: {
        placeholder: "工程/客户概况"
      },
      col: {
        span: 24,
      },
      // validate: [{ required: true, message: '里程碑节点不能为空', trigger: 'blur' },]

    }, 
    {
      "type": "commonSelect", "field": "industryTypeCode", "title": "行业", "value": "",
      props: {
        placeholder: "请选择行业",
        typeName: 'INDUSTRY_TYPE',
        isSplicing:false,
      },
      col: {
        span: 24
      },
      class: 'w-100'
      // validate: [{ required: true, message: '里程碑节点不能为空', trigger: 'blur' },]

    },
    {
      "type": "input", "field": "contact", "title": "联系人/联系方式", "value": "",
      props: {
        placeholder: "联系人/联系方式"
      },
      col: {
        span: 24
      },
      // validate: [{ required: true, message: '里程碑节点不能为空', trigger: 'blur' },]

    },

      {
        "type": "commonSelect", "field": "techDirectionList", "title": "技术需求(方向)", "value": [],
        props: {
          placeholder: "技术需求(方向)",
          typeName: 'TECHNOLOGY_DEMAND',
          field: 'techDirectionList',
          multiple: true
        },
        col: {
          span: 24
        },
        class: 'w-100'
        // validate: [{ required: true, message: '里程碑节点不能为空', trigger: 'blur' },]

      },
      {
        "type": "commonSelect", "field": "concreteMaterialList", "title": "混凝土/材料类别", "value": [],
        props: {
          placeholder: "混凝土/材料类别",
          typeName: 'CONCRETE_MATERIAL_TYPE',
          field: 'concreteMaterialList',
          multiple: true
        },
        col: {
          span: 24
        },
        class: 'w-100'
        // validate: [{ required: true, message: '里程碑节点不能为空', trigger: 'blur' },]

      },
      {
        "type": "commonSelect", "field": "applicationCategoryList", "title": "任务种类", "value": [],
        props: {
          placeholder: "任务种类",
          typeName: 'TASK_TYPE_TEC',
          field: 'applicationCategoryList',
          multiple: true
        },
        col: {
          span: 24
        },
        class: 'w-100'
        // validate: [{ required: true, message: '里程碑节点不能为空', trigger: 'blur' },]

      },

      {
        "type": "commonSelect", "field": "problemTypeList", "title": "问题种类", "value": [],
        props: {
          placeholder: "问题种类",
          typeName: 'QUESTIONS_TYPE',
          field: 'problemTypeList',
          multiple: true
        },
        col: {
          span: 24
        },
        class: 'w-100'
        // validate: [{ required: true, message: '里程碑节点不能为空', trigger: 'blur' },]

      },
      {
        "type": "commonSingleSelect", "field": "refTaskList", "title": "关联任务", "value": "",
        props: {
          placeholder: "关联任务",

          filterable: true,
          // multiple: true,
          transform: ["taskName", "id", "taskNumber"],
          request: {
            interfaceName: 'service/project/task/checkbox',
            method: 'get',
            params: {
              params: {
                statusCode: '2049101,2049102',
                pageNum: 1,
                pageSize: -1
              }
            }
          }

        },
        col: {
          span: 24
        },
        class: 'w-100'
        // validate: [{ required: true, message: '里程碑节点不能为空', trigger: 'blur' },]

      },
      {
        "type": "commonSelect", "field": "area", "title": "区域", "value": "",
        props: {
          placeholder: "区域",
          field: 'area',
          typeName: 'AREA_CLASSIFY'
        },
        col: {
          span: 24
        },
        class:'w-100'
        // validate: [{ required: true, message: '里程碑节点不能为空', trigger: 'blur' },]

      }, {
        "type": "input", "field": "district", "title": "地区", "value": "",
        props: {
          placeholder: "地区"
        },
        col: {
          span: 24
        },
        // validate: [{ required: true, message: '里程碑节点不能为空', trigger: 'blur' },]

      },


      {
        "type": "input", "field": "feedback", "title": "反馈意见", "value": "",
        props: {
          placeholder: "反馈意见",
          type:'textarea',
          maxlength:1333,
          showWordLimit:true
        },
        col: {
          span: 24
        },
        // validate: [{ required: true, message: '里程碑节点不能为空', trigger: 'blur' },]

      },
    ],

    "3": [{
      "type": "input", "field": "customerName", "title": "工程/客户名称", "value": "",
      props: {
        placeholder: "工程/客户名称"
      },
      col: {
        span: 24,
      },
      // validate: [{ required: true, message: '里程碑节点不能为空', trigger: 'blur' },]

    }, {
      "type": "input", "field": "profile", "title": "工程/客户概况", "value": "",
      props: {
        placeholder: "工程/客户概况"
      },
      col: {
        span: 24,
      },
      // validate: [{ required: true, message: '里程碑节点不能为空', trigger: 'blur' },]

    },
   
    
    
    
    {
      "type": "input", "field": "contact", "title": "联系人/联系方式", "value": "",
      props: {
        placeholder: "联系人/联系方式"
      },
      col: {
        span: 24
      },
      // validate: [{ required: true, message: '里程碑节点不能为空', trigger: 'blur' },]

    },
      {
        "type": "commonSelect", "field": "techDirectionList", "title": "技术需求(方向)", "value": [],
        props: {
          placeholder: "技术需求(方向)",
          typeName: 'TECHNOLOGY_DEMAND_ENG',
          field: 'techDirectionList',
          multiple: true
        },
        col: {
          span: 24
        },
        class: 'w-100'
        // validate: [{ required: true, message: '里程碑节点不能为空', trigger: 'blur' },]

      },
      {
        "type": "commonSelect", "field": "applicationClassficationList", "title": "应用分类", "value": [],
        props: {
          placeholder: "应用分类",
          typeName: 'ENG_APPLICATION_CLASSFICATION',
          field: 'applicationClassficationList',
          multiple: true
        },
        col: {
          span: 24
        },
        class: 'w-100'
        // validate: [{ required: true, message: '里程碑节点不能为空', trigger: 'blur' },]

      },
      {
        "type": "commonSelect", "field": "applicationCategoryList", "title": "任务种类", "value": [],
        props: {
          placeholder: "任务种类",
          typeName: 'TASK_TYPE_ENG',
          field: 'applicationCategoryList',
          multiple: true
        },
        col: {
          span: 24
        },
        class: 'w-100'
        // validate: [{ required: true, message: '里程碑节点不能为空', trigger: 'blur' },]

      },
      {
        "type": "hidden", "field": "productList", "title": "产品/材料", "value": [],
        props: {
          placeholder: "产品/材料",
          typeName: 'PRODUCT_CLASSIFICATION',
          field: "productList",
          multiple: true
        },
        col: {
          span: 24
        },
        class: 'w-100'
        // validate: [{ required: true, message: '里程碑节点不能为空', trigger: 'blur' },]

      },
      {
        "type": "commonSingleSelect", "field": "refTaskList", "title": "关联任务", "value": '',
        props: {
          placeholder: "关联任务",

          filterable: true,
          // multiple: true,
          transform: ["taskName", "id", "taskNumber"],
          request: {
            interfaceName: 'service/project/task/checkbox',
            method: 'get',
            params: {
              params: {
                statusCode: '2049101,2049102',
                pageNum: 1,
                pageSize: -1,
                level1: 0
              }
            }
          }

        },
        col: {
          span: 24
        },
        class: 'w-100'
        // validate: [{ required: true, message: '关联任务', trigger: 'blur' },]

      },
      {
        "type": "commonSelect", "field": "area", "title": "区域", "value": "",
        props: {
          placeholder: "区域",
          field: 'area',
          typeName: 'AREA_CLASSIFY'
        },
        col: {
          span: 24
        },
        class:'w-100'
        // validate: [{ required: true, message: '里程碑节点不能为空', trigger: 'blur' },]

      }, {
        "type": "input", "field": "district", "title": "地区", "value": "",
        props: {
          placeholder: "地区"
        },
        col: {
          span: 24
        },
        class:'w-100'
        // validate: [{ required: true, message: '里程碑节点不能为空', trigger: 'blur' },]

      },


      {
        "type": "inputNumber", "field": "unitPrice", "title": "单价", "value": "",
        props: {
          type:"number",
          placeholder: "单价（元/万元）",
          min: 0,
          controlsPosition:"right"
        },
        col: {
          span: 8
        },
        class:'w-100'
        // validate: [{ required: true, message: '里程碑节点不能为空', trigger: 'blur' },]

      }, 
      
       {
        "type": "commonSelect", "field": "unitPriceUnitTypeCode", "title": "", "value": "",
        props: {
          placeholder: "单位",
          typeName: 'UNIT',
          isSplicing:false

        },
        col: {
          span: 4
        },
        class:'ml10'
        // validate: [{ required: true, message: '里程碑节点不能为空', trigger: 'blur' },]

      },
      
      
      {
        "type": "inputNumber", "field": "quantity", "title": "数量", "value": "",
        props: {
          placeholder: "数量（个/平方米）",
          min: 0,
          controlsPosition:"right"
        },
        col: {
          span: 8
        },
        class:'w-100'
        // validate: [{ required: true, message: '里程碑节点不能为空', trigger: 'blur' },]

      }, 
      
      {
        "type": "commonSelect", "field": "quantityUnitTypeCode", "title": "", "value": "",
        props: {
          placeholder: "单位",
          typeName: 'UNIT',
          isSplicing:false

        },
        col: {
          span: 4
        },
        class:'ml10'
        // validate: [{ required: true, message: '里程碑节点不能为空', trigger: 'blur' },]

      },
      {
        "type": "inputNumber", "field": "thickness", "title": "厚度", "value": "",
        props: {
          placeholder: "厚度（cm/mm/um)",
          min: 0,
          controlsPosition:"right"
        },
        col: {
          span: 8
        },
        class:'w-100'
        // validate: [{ required: true, message: '里程碑节点不能为空', trigger: 'blur' },]

      },
      {
        "type": "commonSelect", "field": "thicknessUnitTypeCode", "title": "", "value": "",
        props: {
          placeholder: "单位",
          typeName: 'UNIT',
          isSplicing:false
        },
        col: {
          span: 4
        },
        class:'ml10'
        // validate: [{ required: true, message: '里程碑节点不能为空', trigger: 'blur' },]

      },
    ]
  }
}