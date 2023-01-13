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
    "type": "commonSelect", "field": "typeCode", "title": "中试/试生产类型", "value": "",
    props: {
      placeholder: "请选择类型",
      typeName: "PILOT_RUN_TYPE",
      isSplicing: false,
      field: "typeCode"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    class: 'w-100',
    options: [],
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
      "type": "input", "field": "documentNumber", "title": "中试/试生产编号", "value": "",
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
      "type": "select", "field": "organizationId", "title": "基地", "value": "",
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
      "type": "commonAuto", "field": "respEmployeeNumber", "title": "项目负责人", "value": '',
      props: {
        placeholder: "责任人",
        multiple: false,
        filterable: true,
        collapseTags: false,
        field: 'respEmployeeNumber',
        remote: true,
      },
      col: {
        span: 8,
        labelWidth: '130px'
      },
      class: 'w-100',
      validate: [{required: true, message: '项目负责人不能为空', trigger: 'blur'},]
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
    // {
    //   "type": "commonSelect", "field": "productName", "title": "产品名称", "value": "",
    //   props: {
    //     placeholder: "请选择产品名称",
    //     typeName: "PRODUCT_CLASSIFICATION",
    //     field: "productName"
    //   },
    //   col: {
    //     span: 8,
    //     labelWidth: '130px'
    //   },
    //   class: 'w-100',
    //   options: [],
    // },
    {
      "type": "common-cascader",
      "field": "productClassificationList",
      "title": "产品名称",
      "value": [],
      props: {
        placeholder: "请选择产品名称",
        typeName: "PRODUCT_CLASSIFICATION",
      },
      col: {
        span: 8,
        labelWidth: '130px'
      },
      options: [],
      class: 'w-100',
      validate: [{required: true, message: '产品名称不能为空', trigger: 'blur'},]
    
    },
    {
      "type": "commonSelect", "field": "typeCode", "title": "中试/试生产类型", "value": "",
      props: {
        placeholder: "请选择类型",
        typeName: "PILOT_RUN_TYPE",
        field: "typeCode",
        // onChanges:(val)=>_this.onChanges(val)
      },
      col: {
        span: 8,
        labelWidth: '130px'
      },
      class: 'w-100',
      options: [],
      // validate: [{ required: true, message: '请选择', trigger: 'blur' },]
    },
    // {
    //   "type": "commonSelect", "field": "code", "title": "关联中试编号", "value": "",
    //   props: {
    //     placeholder: "请选择关联中试编号",
    //     typeName: "PRODUCT_CLASSIFICATION",
    //     field: "code"
    //   },
    //   col: {
    //     span: 8,
    //     labelWidth: '130px'
    //   },
    //   class: 'w-100',
    //   options: [],
    //   validate: [{required: false, message: '关联中试编号不能为空', trigger: 'blur'},]
    // },
    {
      "type": "select", "field": "taskId", "title": "相关任务", "value": "",
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
          _this.addEditFormModel.updateRule("taskId", {
            options
          }, true);
        }
      },
      col: {
        span: 8,
        labelWidth: '130px'
      },
      on: {
        clear: () => {
          _this.addEditFormModel.updateRule("taskId", {
            options: _this.options2
          }, true);
        }
      },
      class: 'w-100',
      validate: [{required: true, message: '请选择', trigger: 'blur'},]
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
        title: '中试/试生产目标'
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
