import {checkPhone} from "@/utils/tools";
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
    "type": "input", "field": "projectPersonName", "title": "项目负责人", "value": "",
    props: {
      placeholder: "请输入项目负责人",
    },
    col: {
      span: 8,
      labelWidth: '130px'
    }
  },
  {
    "type": "el-col",
    "title": "申请期限",
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
      labelWidth: '130px'
    },
    class: 'md0'
  },
  {
    "type": "commonSelect", "field": "productNameCode", "title": "产品名称", "value": "",
    props: {
      placeholder: "请选择产品名称",
      typeName: "PRODUCT_CLASSIFICATION",
      isSplicing: false,
      field: "productNameCode"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    class: 'w-100',
    options: [],
  },
  {
    "type": "input", "field": "organizationName", "title": "基地", "value": "",
    props: {
      placeholder: "请输入基地",
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
      "type": "input", "field": "documentNumber", "title": "中试编号", "value": "",
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
      "type": "commonSelect", "field": "department", "title": "承担部门", "value": "",
      props: {
        placeholder: "请选择",
        typeName: "COMMITMENT_DEPARTMENT",
        field: "department"
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
      "type": "input", "field": "telephone", "title": "联系电话", "value": "",
      props: {
        placeholder: "请输入"
      },
      col: {
        span: 8,
        labelWidth: '130px'
      },
      validate: [
        {required: true, message: '请输入联系电话', trigger: 'blur'},
        {
          trigger: 'blur',
          validator: (rule, value, callback) => checkPhone(rule, value, callback)
        }
      ]
    },
    {
      "type": "select", "field": "organizationId", "title": "生产基地", "value": "",
      props: {
        placeholder: "请选择",
      },
      col: {
        span: 8,
        labelWidth: '130px'
      },
      class: 'w-100',
      validate: [{required: true, message: '请选择', trigger: 'blur'},]
    },
    {
      "type": "commonSelect", "field": "pilotDirection", "title": "中试方向", "value": "",
      props: {
        placeholder: "请选择",
        typeName: "Pilot_Direction",
        field: "pilotDirection"
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
        labelWidth: '130px'
      },
      options: [],
      // validate: [{ required: true, message: '请选择项目来源', whitespace: true, trigger: 'blur' },]
    },
    {
      "type": "input", "field": "productName", "title": "产品名称", "value": "",
      props: {
        placeholder: "请输入"
      },
      col: {
        span: 8,
        labelWidth: '130px'
      },
      validate: [
        {required: true, message: '请输入产品名称', trigger: 'blur'},
      ]
    },

    {
      "type": "select", "field": "projectNode", "title": "里程碑节点", "value": "",
      props: {
        placeholder: "请选择",
      },
      col: {
        span: 8,
        labelWidth: '130px'
      },
      class: 'w-100',
      //validate: [{required: true, message: '请选择', trigger: 'blur'},],
      //options: [],
    },

    {
      "type": "el-input-number", "field": "planQuantity", "title": "计划产品数量(吨)", "value": "",
      props: {
        placeholder: "请输入",
        min: 0
      },
      col: {
        span: 8,
        labelWidth: '130px'
      },
      class: 'w-100'
      // validate: [{ required: true, message: '请输入', trigger: 'blur' },]
    },
    {
      "type": "el-col",
      children: [
        {
          "type": "DatePicker",
          "field": "planDate",
          "title": "计划实施时间",
          "value": '',
          props: {
            placeholder: "开始时间",
            format: 'yyyy-MM-dd'
          },
          col: {
            span: 16,
            labelWidth: '130px'
          },
          class: 'w-97 md0',
          validate: [
            // {required: true, message: '请选择开始时间', trigger: 'blur'},
            {
              trigger: 'blur',
              validator: (rule, value, callback)=>{
                let time1 = new Date(_this.addEditFormModel.getValue('planDate')).getTime();
                let time2 = new Date(_this.addEditFormModel.getValue('planEndDate')).getTime();
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
          "field": "planEndDate",
          "value": '',
          props: {
            placeholder: "结束时间",
            format: 'yyyy-MM-dd'
          },
          col: {
            span: 8,
          },
          class: 'w-100 md0',
          validate: [
            // {required: true, message: '请选择结束时间', trigger: 'blur'},
            {
              trigger: 'blur',
              validator: (rule, value, callback)=>{
                let time1 = new Date(_this.addEditFormModel.getValue('planDate')).getTime();
                let time2 = new Date(_this.addEditFormModel.getValue('planEndDate')).getTime();
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
        span: 8,
        labelWidth: '0'
      },
      class: 'md0',
    },
    {
      "type": "el-input-number", "field": "planCount", "title": "生产计划实施次数", "value": "",
      props: {
        placeholder: "请输入",
        min: 0
      },
      col: {
        span: 8,
        labelWidth: '130px'
      },
      class: 'w-100'
      // validate: [{ required: true, message: '请输入', trigger: 'blur' },]
    },

    {
      type: 'common-title',
      name: 'title',
      props: {
        title: '中试目标',
        isClone:true
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
      validate: [{required: true, message: '请输入中试目标', trigger: 'blur'},],
    },

    {
      type: 'common-title',
      name: 'title',
      props: {
        title: '中试设备及场地需求',
        isClone:true
      },
    },
    {
      "type": "input", "field": "equipRequirements", "title": "", "value": "",
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
      validate: [{required: true, message: '请输入中试设备及场地需求', trigger: 'blur'},],
    },


    {
      type: 'common-title',
      name: 'title',
      props: {
        title: '中试人员需求',
        isClone:true
      },
    },
    {
      "type": "input", "field": "personRequirements", "title": "", "value": "",
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
      validate: [{required: true, message: '请输入中试人员需求', trigger: 'blur'},],
    },


    {
      type: 'common-title',
      name: 'title',
      props: {
        title: '新增原材料说明',
        isClone:true
      },
    },
    {
      "type": "input", "field": "newMaterialsDes", "title": "", "value": "",
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
      validate: [{required: true, message: '请输入新增原材料说明', trigger: 'blur'},],
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


    {
      type: 'common-title',
      name: 'title',
      props: {
        title: '相关说明'
      },
    },
    {
      type: 'common-desc',
      name: 'title',
      props: {
        content: `1. 申请人：提出申请时，必传“小试总结报告”、“中试工艺文件（含工艺流程、操作步骤、安全注意事项、检验方法等）”、“安环评估及注意事项”；中试结束后，必传“中试总结报告”
            <br>2. 总工：组织线下评审
            <br>3. 配方管理：提供新增物料和配方的编码和名称（EBS中创建和分配）
            <br>4. 基地负责人：组织实施，并指定实施负责人；中试结束后，反馈新增原材料与中试产品是否能处理？`
      },
    },
    // {
    //   type: 'common-title',
    //   name: 'title',
    //   props: {
    //     title: '相关附件',
    //     isClone: true
    //   },
    // },
  ]
}
